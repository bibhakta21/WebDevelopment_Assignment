package com.example.decor.Controller;

import com.example.decor.Entity.Product;
import com.example.decor.Entity.Cart;
import com.example.decor.Entity.Users;
import com.example.decor.Service.ProductService;
import com.example.decor.Service.CartService;
import com.example.decor.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v2/carts")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public CartController(CartService cartService, UserService userService, ProductService productService) {
        this.cartService = cartService;
        this.userService = userService;
        this.productService = productService;
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity<Object> addToCart(@RequestBody Map<String, Object> requestBody) {
        try {
            Long userId = null;
            if (requestBody.containsKey("userId") && requestBody.get("userId") != null) {
                userId = ((Number) requestBody.get("userId")).longValue();
            }

            Long productId = null;
            if (requestBody.containsKey("productId") && requestBody.get("productId") != null) {
                productId = ((Number) requestBody.get("productId")).longValue();
            }

            if (userId != null && productId != null) {
                Optional<Users> userOptional = userService.getUsersById(userId);
                Optional<Product> productOptional = productService.getProductById(productId);

                if (userOptional.isPresent() && productOptional.isPresent()) {
                    Users user = userOptional.get();
                    Product product = productOptional.get();

                    int quantity = (int) requestBody.get("quantity");
                    Cart cartItem = cartService.addToCart(user, product, quantity);

                    Map<String, Object> responseData = new HashMap<>();
                    responseData.put("cartId", cartItem.getCartId());
                    responseData.put("userId", user.getId());
                    responseData.put("productId", product.getProductId());
                    responseData.put("title", product.getTitle());
                    responseData.put("price", product.getPrice());
                    responseData.put("imagePath", product.getImagePath());
                    responseData.put("quantity", cartItem.getQuantity());
                    responseData.put("total", cartItem.getTotal());

                    return new ResponseEntity<>(responseData, HttpStatus.CREATED);
                } else {
                    String errorMessage = "User or product not found.";
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("message", errorMessage);
                    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
                }
            } else {
                String errorMessage = "User ID or Product ID is null or invalid.";
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", errorMessage);
                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
    }
    //get all cart in database
    @GetMapping("/get-all")
    public ResponseEntity<List<Map<String, Object>>> getAllCarts() {
        List<Map<String, Object>> cartsData = cartService.getAllCarts();

        return new ResponseEntity<>(cartsData, HttpStatus.OK);
    }
    //get all cart for a particular user
    @GetMapping("/get-by-user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getCartsByUserId(@PathVariable Long userId) {
        try {
            List<Map<String, Object>> cartsData = cartService.getCartsByUserId(userId);
            return new ResponseEntity<>(cartsData, HttpStatus.OK);
        } catch (Exception e) {
            // Handle exceptions or log errors
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PatchMapping("/update/{cartId}")
    public ResponseEntity<Object> updateCartQuantity(
            @PathVariable Long cartId,
            @RequestBody Map<String, Integer> requestBody
    ) {
        try {
            Integer newQuantity = requestBody.get("newQuantity");
            Cart updatedCart = cartService.updateCartQuantity(cartId, newQuantity);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Cart quantity updated successfully");
            response.put("cartId", updatedCart.getCartId());
            response.put("userId", updatedCart.getUser().getId());
            response.put("productId", updatedCart.getProduct().getProductId());
            response.put("title", updatedCart.getProduct().getTitle());
            response.put("price", updatedCart.getProduct().getPrice());
            response.put("imagePath", updatedCart.getProduct().getImagePath());
            response.put("quantity", updatedCart.getQuantity());
            response.put("total", updatedCart.getTotal());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<Object> deleteCart(@PathVariable Long cartId) {
        try {
            cartService.deleteCart(cartId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Cart deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/deleteByUserId/{userId}")
    public ResponseEntity<Object> deleteCartItemsByUserId(@PathVariable Long userId) {
       try{
           cartService.deleteCartItemsByUserId(userId);

           Map<String, Object> response = new HashMap<>();
           response.put("message", "Cart items for user with ID " + userId + " deleted successfully.");
           return ResponseEntity.ok(response);
       }catch (IllegalArgumentException e){
           String errorMessage = e.getMessage();
           Map<String, Object> errorResponse = new HashMap<>();
           errorResponse.put("message", errorMessage);
           return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
       }
    }
}
