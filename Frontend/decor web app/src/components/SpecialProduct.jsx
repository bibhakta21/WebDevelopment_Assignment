import { useState, useEffect } from "react";
import "../css/popular.css";
import { useProductContext } from "../context/ProductContext";

const SpecialProduct = () => {
  const { products, fetchProducts } = useProductContext();
  const [randomProductImages, setRandomProductImages] = useState([]);
  const [isImagesFetched, setIsImagesFetched] = useState(false);

  useEffect(() => {
    // Fetch  when the component mounts
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Fetch four random  images if not fetched yet
    if (!isImagesFetched && products.length > 3) {
      const randomIndices = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * products.length)
      );
      const randomProducts = randomIndices.map((index) => products[index]);
      const images = randomProducts.map((product) => product.base64Image);
      setRandomProductImages(images);
      setIsImagesFetched(true);
    }
  }, [products, isImagesFetched]);

  return (
    <section className="product">
      <div className="section__container product__container">
        <div className="section__header">
          <h3 className="section__title" style={{ fontFamily: "prata" }}>
            SPECIAL PRODUCT
          </h3>
          <div className="product__nav">
            <span>
              <i className="ri-arrow-left-s-line"></i>
            </span>
            <span>
              <i className="ri-arrow-right-s-line"></i>
            </span>
          </div>
        </div>
        <div className="product__grid">
          {randomProductImages.map((image, index) => (
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
