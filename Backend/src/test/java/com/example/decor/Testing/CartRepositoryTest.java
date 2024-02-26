package com.example.decor.Testing;

import com.example.decor.Entity.Cart;
import com.example.decor.Entity.Product;
import com.example.decor.Entity.Users;
import com.example.decor.Repository.CartRepository;
import com.example.decor.Repository.ProductRepository;
import com.example.decor.Repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.math.BigDecimal;
import java.util.List;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CartRepositoryTest {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void addToCartTest() {
        // Create a user
        Users user = new Users();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user = userRepository.save(user);

        // Create a product
        Product product = new Product();
        product.setTitle("Test Product");
        product.setPrice(BigDecimal.valueOf(99.99));
        product.setDescription("This is a test product.");
        product = productRepository.save(product);

        // Add product to cart
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(1);
        cart.setTotal(product.getPrice());
        cart = cartRepository.save(cart);

        // Assert that cart is not null
        Assertions.assertThat(cart).isNotNull();
    }

    @Test
    @Order(2)
    public void findByUserAndProductTest() {
        // Retrieve user and product
        Users user = userRepository.findByUsernameOrEmail("testuser", "test@example.com").orElse(null);
        Product product = productRepository.findById(1l).orElse(null);

        // Find cart by user and product
        Cart cart = cartRepository.findByUserAndProduct(user, product);

        // Assert that cart is not null
        Assertions.assertThat(cart).isNotNull();
    }

    @Test
    @Order(3)
    public void findByUserTest() {
        // Retrieve user
        Users user = userRepository.findByUsernameOrEmail("testuser", "test@example.com").orElse(null);

        // Find carts by user
        List<Cart> carts = cartRepository.findByUser(user);

        // Assert that carts list is not empty
        Assertions.assertThat(carts).isNotEmpty();
    }

    }


