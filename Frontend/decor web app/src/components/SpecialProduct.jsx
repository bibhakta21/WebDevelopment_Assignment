import { useState, useEffect } from "react";
import "../css/popular.css";
import { useProductContext } from "../context/ProductContext";

const SpecialProduct = () => {
  const { products, fetchProducts } = useProductContext();
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products when the component mounts
        await fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [fetchProducts]);

  useEffect(() => {
    // Filter products based on specific product names
    const filteredProducts = products.filter((product) =>
      ["sofa", "table", "chair", "console table"].includes(product.title.toLowerCase())
    );

    // Map filtered products to images
    const images = filteredProducts.map((product) => product.base64Image);

    setProductImages(images);
  }, [products]);

  return (
    <section className="product">
      <div className="section__container product__container">
        <div className="section__header">
          <h3 className="section__title" style={{ fontFamily: "prata" }}>
            SPECIAL PRODUCT
          </h3>
          {/* Add navigation or other controls as needed */}
        </div>
        <div className="product__grid">
          {productImages.map((image, index) => (
            <div key={index} className="product__image">
              {image && (
                <img
                  src={`data:image/png;base64, ${image}`}
                  alt={`product-${index}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialProduct;
