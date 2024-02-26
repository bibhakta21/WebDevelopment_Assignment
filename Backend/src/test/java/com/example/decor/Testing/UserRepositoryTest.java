package com.example.decor.Testing;


import com.example.decor.Entity.Users;
import com.example.decor.Repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveUserTest() {
        // Create a new user
        Users user = new Users();
        user.setName("Test User");
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");

        // Save the user using the repository
        Users savedUser = userRepository.save(user);

        // Assert that the saved user has a valid ID
        Assertions.assertThat(savedUser.getId()).isNotNull();
    }

    @Test
    @Order(2)
    public void getUserByUsernameOrEmailTest() {
        // Retrieve a user by username or email
        Optional<Users> optionalUser = userRepository.findByUsernameOrEmail("testuser", "test@example.com");

        // Assert that the user is present
        Assertions.assertThat(optionalUser).isPresent();

        // Get the user from Optional
        Users user = optionalUser.get();

        // Assert that the retrieved user has the correct username and email
        Assertions.assertThat(user.getUsername()).isEqualTo("testuser");
        Assertions.assertThat(user.getEmail()).isEqualTo("test@example.com");
    }

    @Test
    @Order(3)
    public void existsByUsernameOrEmailTest() {
        // Check if a user exists by username or email
        boolean exists = userRepository.existsByUsernameOrEmail("testuser", "test@example.com");

        // Assert that the user exists
        Assertions.assertThat(exists).isTrue();
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateUserTest() {
        // Retrieve a user by ID
        Optional<Users> optionalUser = userRepository.findById(1L);

        // Assert that the user is present
        Assertions.assertThat(optionalUser).isPresent();

        // Get the user from Optional
        Users user = optionalUser.get();

        // Update the user details
        user.setName("Updated Test User");
        user.setEmail("updatedtest@example.com");

        // Save the updated user
        Users updatedUser = userRepository.save(user);

        // Assert that the updated user has the same ID
        Assertions.assertThat(updatedUser.getId()).isEqualTo(user.getId());

        // Assert that the updated user has the updated details
        Assertions.assertThat(updatedUser.getName()).isEqualTo("Updated Test User");
        Assertions.assertThat(updatedUser.getEmail()).isEqualTo("updatedtest@example.com");
    }

    @Test
    @Order(5)
    public void deleteUserTest() {
        // Delete a user by ID
        userRepository.deleteById(1L);

        // Try to retrieve the deleted user
        Optional<Users> optionalUser = userRepository.findById(1L);

        // Assert that the user is not present after deletion
        Assertions.assertThat(optionalUser).isNotPresent();
    }
}

