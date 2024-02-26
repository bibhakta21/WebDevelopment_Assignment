package com.example.decor.Testing;

import com.example.decor.Entity.Users;
import com.example.decor.Service.UserService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@ActiveProfiles("test")
@SpringBootTest
public class UserStepDefinitions {

    @Autowired
    private UserService userService;
    private Users registeredUser;
    private Users createdUser;

    @Given("a user with username {string} and password {string}")
    public void a_user_with_username_and_password(String username, String password) {
        registeredUser = new Users(username, password);
    }

    @When("the user registers")
    public void the_user_registers() {
        createdUser = userService.createUser(registeredUser);
    }

    @Then("the registration is successful")
    public void the_registration_is_successful() {
        assertNotNull(createdUser);
        // Add additional assertions based on your response structure
    }

}