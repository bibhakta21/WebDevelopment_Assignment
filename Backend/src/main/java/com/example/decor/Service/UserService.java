package com.example.decor.Service;

import com.example.decor.Entity.Users;
import com.example.decor.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

//forgot pass
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//yeta samma
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;


//forgot pass
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;

//forgot pass
//import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


//forgotpass
//import java.util.UUID;
//
//import java.security.SecureRandom;
//import java.util.Base64;
//
//
//
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;

//yeta


@Service
public class UserService{



    private final UserRepository userRepository;

    //forgot pass
//

    @Autowired
    // JavaMailSender javaMailSender
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

        //forgot
//        this.javaMailSender = javaMailSender;
    }

    public void createDefaultAdmin() {
        // Check if an admin user already exists
        if (!userRepository.existsByRoles(Users.Roles.admin)) {
            // Create the default admin user
            Users adminUser = new Users();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@gmail.com");
            adminUser.setSecurityCode("#admin9813056161#");
            adminUser.setPassword("admin12345"); // You should use a secure password hashing method in a real-world scenario
            adminUser.setRoles(Users.Roles.admin);

            userRepository.save(adminUser);
        }
    }

    // register service
    public Users createUser(Users users) {
        // Check if the username is already taken
        if (userRepository.existsByUsernameOrEmail(users.getUsername(), users.getEmail())) {
            throw new IllegalArgumentException("Username or email is already taken");
        }
        return userRepository.save(users);
    }

    public Users loginUser(String usernameOrEmail, String password) {
        System.out.println("Attempting login with usernameOrEmail: " + usernameOrEmail);

        Optional<Users> optionalUser = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();

            // Simple password check (without encryption)
            if (password.equals(user.getPassword())) {
                System.out.println("Login successful for user: " + user.getUsername());
                return user;
            }
        }

        // Either user not found or password doesn't match
        System.out.println("Invalid username or password");
        throw new IllegalArgumentException("Invalid username or password");
    }

    public Optional<Users> getUsersById(long id) {
        return userRepository.findById(id);
    }

    public Users putUser(Long userId, Users updatedUser) {
        Users existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Check if 'username' or 'email' is provided in the updatedUser, and throw an exception if they are
        if (updatedUser.getUsername() != null || updatedUser.getEmail() != null) {
            throw new IllegalArgumentException("Username or email cannot be updated");
        }

        // Copy the fields from updatedUser to existingUser
        existingUser.setName(updatedUser.getName());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setRoles(updatedUser.getRoles());
        existingUser.setImage(updatedUser.getImage());

        return userRepository.save(existingUser);
    }
    //get all users
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }


    // patch users
    public Users patchUser(Long userId, Map<String, Object> updates) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String field = entry.getKey();
            Object value = entry.getValue();

            // Exclude username and email from being updated
            if ("username".equals(field) || "email".equals(field)) {
                throw new IllegalArgumentException(field + " cannot be updated");
            }

            // Use the correct field names from your Users entity
            switch (field) {
                case "name":
                    user.setName((String) value);
                    break;

                case "image":
                    user.setImage((String) value);
                    break;
                // Add other fields as needed
                case "roles":
                    user.setRoles(Users.Roles.valueOf((String) value));
                    break;


                default:
                    throw new IllegalArgumentException("Invalid field for update: " + field);
            }
        }

        return userRepository.save(user);
    }

    // delete users
    public void deleteUser(Long userId) {
        Users existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userRepository.delete(existingUser);
    }



    public List<Users> getAllUsersss() {
        return userRepository.findAll();
    }

    public Users findUserByEmailAndUsername(String email, String username) {
        return userRepository.findByUsernameOrEmail(username, email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    // In UserService.java

    public boolean validateSecurityCode(String email, String securityCode) {
        // Find the user by email
        Optional<Users> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            // Get the stored security code for the user
            String storedSecurityCode = user.getSecurityCode();
            // Compare the provided security code with the stored one
            return securityCode.equals(storedSecurityCode);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public Users updatePasswordWithSecurityCode(String email, String newPassword) {
        // Find the user by email
        Optional<Users> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            // Update the password
            user.setPassword(newPassword);
            // Clear the security code after password update (optional)
            return userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }
}

