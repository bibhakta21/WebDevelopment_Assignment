package com.example.decor.Testing;




import com.example.decor.Entity.Product;
import com.example.decor.Repository.ProductRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.math.BigDecimal;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveProductTest() {
        // Create a new product
        Product product = new Product();
        product.setTitle("Test Product");
        product.setPrice(BigDecimal.valueOf(99.99));
        product.setDescription("This is a test product.");
        product.setImagePath("/path/to/image.jpg"); // Set image path
        // Set other fields as needed

        // Save the product using the repository
        Product savedProduct = productRepository.save(product);

        // Assert that the saved product has a valid ID
        Assertions.assertThat(savedProduct.getProductId()).isNotNull();
        // Assert other fields
        Assertions.assertThat(savedProduct.getTitle()).isEqualTo("Test Product");
        Assertions.assertThat(savedProduct.getPrice()).isEqualTo(BigDecimal.valueOf(99.99));
        Assertions.assertThat(savedProduct.getDescription()).isEqualTo("This is a test product.");
        Assertions.assertThat(savedProduct.getImagePath()).isEqualTo("/path/to/image.jpg");
        // Assert other fields as needed
    }


    @Test
    @Order(2)
    public void getProductByIdTest() {
        // Retrieve a product by ID
        Optional<Product> optionalProduct = productRepository.findById(1L);

        // Assert that the product is present
        Assertions.assertThat(optionalProduct).isPresent();

        // Get the product from Optional
        Product product = optionalProduct.get();

        // Assert that the retrieved product has the correct ID
        Assertions.assertThat(product.getProductId()).isEqualTo(1L);
    }

    @Test
    @Order(3)
    public void getAllProductsTest() {
        // Retrieve all products
        Iterable<Product> productList = productRepository.findAll();

        // Assert that the list is not empty
        Assertions.assertThat(productList).isNotEmpty();
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateProductTest() {
        // Retrieve a product by ID
        Optional<Product> optionalProduct = productRepository.findById(1L);

        // Assert that the product is present
        Assertions.assertThat(optionalProduct).isPresent();

        // Get the product from Optional
        Product product = optionalProduct.get();

        // Update the product details
        product.setTitle("Updated Title");
        product.setPrice(BigDecimal.valueOf(199.99));
        product.setDescription("This is an updated description.");

        // Save the updated product
        Product updatedProduct = productRepository.save(product);

        // Assert that the updated product has the same ID
        Assertions.assertThat(updatedProduct.getProductId()).isEqualTo(product.getProductId());

        // Assert that the updated product has the updated details
        Assertions.assertThat(updatedProduct.getTitle()).isEqualTo("Updated Title");
        Assertions.assertThat(updatedProduct.getPrice()).isEqualTo(BigDecimal.valueOf(199.99));
        Assertions.assertThat(updatedProduct.getDescription()).isEqualTo("This is an updated description.");
    }

    @Test
    @Order(5)
    public void deleteProductTest() {
        // Delete a product by ID
        productRepository.deleteById(1L);

        // Try to retrieve the deleted product
        Optional<Product> optionalProduct = productRepository.findById(1L);

        // Assert that the product is not present after deletion
        Assertions.assertThat(optionalProduct).isNotPresent();
    }
}
