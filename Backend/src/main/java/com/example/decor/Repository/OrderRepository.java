package com.example.trek.Repository;

import com.example.trek.Entity.Product;
import com.example.trek.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    void deleteByProduct(Product product);
    // You can add custom query methods if needed
}
