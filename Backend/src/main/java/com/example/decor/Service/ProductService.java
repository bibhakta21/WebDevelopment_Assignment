package com.example.decor.Service;

import com.example.decor.Entity.Product;
import com.example.decor.Repository.ProductRepository;
import com.example.decor.Repository.CartRepository;
import com.example.decor.Repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import com.example.decor.util.ImagetoBase64;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    private final OrderRepository orderRepository;

    @Autowired
    private final ImagetoBase64 imageToBase64;

    @Autowired
    public ProductService(ProductRepository productRepository, CartRepository cartRepository,
                           OrderRepository orderRepository,
                          ImagetoBase64 imageToBase64) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.imageToBase64 = imageToBase64;
    }


    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/decor-image/product-image").toString();

    public synchronized Product createProduct(Product newProduct) {


        if (newProduct.getTitle() == null || newProduct.getTitle().isBlank()
                || newProduct.getPrice() == null

                || newProduct.getDescription() == null || newProduct.getDescription().isBlank()

                || newProduct.getImagePath() ==null || newProduct.getImagePath().isBlank()) {
            throw new IllegalArgumentException("Fields CANNOT BE Empty.");
        }

        return productRepository.save(newProduct);
    }

    public synchronized List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        products.forEach(product -> {
            String imagePath = product.getImagePath();
            if (imagePath != null && !imagePath.isBlank()) {
                try {
                    String base64Image = imageToBase64.convertImageToBase64(imagePath);
                    product.setBase64Image(base64Image);
                } catch (IOException e) {
                    // Handle the exception or log it
                    e.printStackTrace();
                }
            }
        });
        return products;
    }


    public synchronized Optional<Product> getProductById(long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        optionalProduct.ifPresent(product -> {
            String imagePath = product.getImagePath();
            if (imagePath != null && !imagePath.isBlank()) {
                try {
                    String base64Image = imageToBase64.convertImageToBase64(imagePath);
                    product.setBase64Image(base64Image);
                } catch (IOException e) {
                    // Handle the exception or log it
                    e.printStackTrace();
                }
            }
        });
        return optionalProduct;
    }

    public synchronized void deleteProduct(Long productId) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("product with the given ID does not exist"));

        // Then delete the
        cartRepository.deleteByProduct(existingProduct);
        orderRepository.deleteByProduct(existingProduct);
        productRepository.delete(existingProduct);

    }

    public synchronized Product putProduct(Long productId, Product updatedProduct) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("product does not exist"));
        if (updatedProduct.getTitle() == null || updatedProduct.getTitle().isBlank()
                || updatedProduct.getPrice() == null

                || updatedProduct.getDescription() == null || updatedProduct.getDescription().isBlank()

                || updatedProduct.getImagePath() ==null || updatedProduct.getImagePath().isBlank()) {
            throw new IllegalArgumentException("Fields CANNOT BE Empty.");
        }

        // Update the fields of the existing
        existingProduct.setTitle(updatedProduct.getTitle());

        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setDescription(updatedProduct.getDescription());

        existingProduct.setImagePath(updatedProduct.getImagePath());

        return productRepository.save(existingProduct);
    }
}
