import React, { useState } from 'react';
import axios from 'axios';
import "../css/dashboard.css";

const Addproduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const formData = new FormData();
      formData.append('title', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);

      await axios.post('http://localhost:8080/api/v2/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add any success handling code here
      setSuccessMessage('Product added successfully!');
      setErrorMessage('');
      
      // Clear the form after successful submission
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding product:', error);
      // Add error handling code here
      setErrorMessage('Failed to add product. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center ">
    <div className="w-full lg:w-1/2 xl:w-5/12 px-4 py-4">
      <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
            />
          </div>
          <div className="mb-6">
            <textarea
              rows="6"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary"
            ></textarea>
          </div>
          <div className="mb-6">
            <label>
              Product Image:
              <input type="file" name="image" onChange={handleImageChange} />
            </label>
          </div>

          {successMessage && (
            <div className="mb-4 text-green-600">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-600">{errorMessage}</div>
          )}

          <div>
            <button
              type="submit"
              className="w-full text-white bg-[#4460e6] rounded border border-primary p-3 transition hover:bg-opacity-90"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Addproduct;
