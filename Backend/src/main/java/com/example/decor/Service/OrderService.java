package com.example.decor.Service;

import com.example.decor.Entity.Product;
import com.example.decor.Entity.Order;
import com.example.decor.Entity.Users;
import com.example.decor.Repository.ProductRepository;
import com.example.decor.Repository.OrderRepository;
import com.example.decor.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public synchronized List<Map<String, Object>> createOrder(List<Map<String, Object>> cartItems, LocalDateTime orderDate, String contactNumber) {
        List<Map<String, Object>> result = new ArrayList<>();

        for (Map<String, Object> cartItem : cartItems) {
            // Convert userId and bookId to Long to avoid ClassCastException
            Long userId = ((Number) cartItem.get("userId")).longValue();
            Long productId = ((Number) cartItem.get("productId")).longValue();
            int quantity = (int) cartItem.get("quantity");

            // Convert total to BigDecimal safely
            BigDecimal total;
            if (cartItem.get("total") instanceof Double) {
                total = BigDecimal.valueOf((Double) cartItem.get("total"));
            } else if (cartItem.get("total") instanceof Integer) {
                total = BigDecimal.valueOf((Integer) cartItem.get("total"));
            } else {
                // Handle the case where total is not a valid numeric type
                result.add(Map.of("error", "Invalid 'total' value"));
                continue; // Skip to the next iteration of the loop
            }

            Optional<Users> optionalUser = userRepository.findById(userId);
            Optional<Product> optionalProduct = productRepository.findById(productId);

            if (optionalUser.isPresent() && optionalProduct.isPresent()) {
                Users user = optionalUser.get();
                Product product = optionalProduct.get();

                Order order = new Order();
                order.setUser(user);
                order.setProduct(product);
                order.setQuantity(quantity);
                order.setOrderDate(orderDate);
                order.setContactNumber(contactNumber);
                order.setTotalPrice(total);

                Order savedOrder = orderRepository.save(order);

                Map<String, Object> orderMap = new HashMap<>();
                orderMap.put("orderId", savedOrder.getOrderId());
                orderMap.put("productId", savedOrder.getProduct().getProductId());
                orderMap.put("productTitle", savedOrder.getProduct().getTitle());
                orderMap.put("productPrice", savedOrder.getProduct().getPrice());
                orderMap.put("productImage", savedOrder.getProduct().getImagePath());
                orderMap.put("userId", savedOrder.getUser().getId());
                orderMap.put("username", savedOrder.getUser().getUsername());
                orderMap.put("userEmail", savedOrder.getUser().getEmail());
                orderMap.put("quantity", savedOrder.getQuantity());
                orderMap.put("contactNumber", savedOrder.getContactNumber());
                orderMap.put("totalPrice", savedOrder.getTotalPrice());
                orderMap.put("status", savedOrder.getStatus());
                orderMap.put("orderDate", savedOrder.getOrderDate());

                result.add(orderMap);
            } else {
                // Handle the case where user or book is not found
                result.add(Map.of("error", "User or product not found"));
            }
        }

        return result;
    }

    public synchronized List<Map<String, Object>> getAllOrders() {
        List<Order> allOrders = orderRepository.findAll();

        return allOrders.stream()
                .map(order -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("orderId", order.getOrderId());
                    orderMap.put("productId", order.getProduct().getProductId());
                    orderMap.put("productTitle", order.getProduct().getTitle());
                    orderMap.put("productPrice", order.getProduct().getPrice());
                    orderMap.put("productImage", order.getProduct().getImagePath());
                    orderMap.put("userId", order.getUser().getId());
                    orderMap.put("username", order.getUser().getUsername());
                    orderMap.put("userEmail", order.getUser().getEmail());
                    orderMap.put("quantity", order.getQuantity());
                    orderMap.put("contactNumber", order.getContactNumber());
                    orderMap.put("totalPrice", order.getTotalPrice());
                    orderMap.put("status", order.getStatus());
                    orderMap.put("orderDate", order.getOrderDate());
                    return orderMap;
                })
                .collect(Collectors.toList());
    }
    public synchronized List<Map<String, Object>> getOrdersByUserId(Long userId) {
        List<Order> userOrders = orderRepository.findByUserId(userId);

        return userOrders.stream()
                .map(order -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("orderId", order.getOrderId());
                    orderMap.put("productId", order.getProduct().getProductId());
                    orderMap.put("productTitle", order.getProduct().getTitle());
                    orderMap.put("productPrice", order.getProduct().getPrice());
                    orderMap.put("productImage", order.getProduct().getImagePath());
                    orderMap.put("userId", order.getUser().getId());
                    orderMap.put("username", order.getUser().getUsername());
                    orderMap.put("userEmail", order.getUser().getEmail());
                    orderMap.put("quantity", order.getQuantity());
                    orderMap.put("contactNumber", order.getContactNumber());
                    orderMap.put("totalPrice", order.getTotalPrice());
                    orderMap.put("status", order.getStatus());
                    orderMap.put("orderDate", order.getOrderDate());
                    return orderMap;
                })
                .collect(Collectors.toList());
    }

    public synchronized void deleteOrder(Long orderId){
        Optional<Order> userOrder = orderRepository.findById(orderId);
        if(userOrder.isPresent())   {
            orderRepository.deleteById(orderId);
        }else{
            throw new IllegalArgumentException("Cart not found with ID: " + orderId);
        }
    }

    public synchronized Map<String, Object> patchOrder(Long orderId, Map<String, Object> patchData) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            // Update fields based on the patchData
            if (patchData.containsKey("contactNumber")) {
                order.setContactNumber((String) patchData.get("contactNumber"));
            }

            if (patchData.containsKey("quantity")) {
                int newQuantity = (int) patchData.get("quantity");
                order.setQuantity(newQuantity);

                // Recalculate total price based on the new quantity
                BigDecimal unitPrice = order.getProduct().getPrice();
                BigDecimal newTotalPrice = unitPrice.multiply(BigDecimal.valueOf(newQuantity));
                order.setTotalPrice(newTotalPrice);
            }
            if (patchData.containsKey("status")) {
                order.setStatus((boolean) patchData.get("status"));
            }
            // Add more fields to update as needed

            // Save the updated order
            Order updatedOrder = orderRepository.save(order);

            // Return the updated order details
            Map<String, Object> orderMap = new HashMap<>();
            orderMap.put("orderId", updatedOrder.getOrderId());
            orderMap.put("productId", updatedOrder.getProduct().getProductId());
            orderMap.put("productTitle", updatedOrder.getProduct().getTitle());
            orderMap.put("productPrice", updatedOrder.getProduct().getPrice());
            orderMap.put("productImage", updatedOrder.getProduct().getImagePath());
            orderMap.put("userId", updatedOrder.getUser().getId());
            orderMap.put("username", updatedOrder.getUser().getUsername());
            orderMap.put("userEmail", updatedOrder.getUser().getEmail());
            orderMap.put("quantity", updatedOrder.getQuantity());
            orderMap.put("contactNumber", updatedOrder.getContactNumber());
            orderMap.put("totalPrice", updatedOrder.getTotalPrice());
            orderMap.put("status", updatedOrder.getStatus());
            orderMap.put("orderDate", updatedOrder.getOrderDate());

            return orderMap;
        } else {
            // Handle the case where the order is not found
            throw new IllegalArgumentException("Order not found with ID: " + orderId);
        }
    }


}


