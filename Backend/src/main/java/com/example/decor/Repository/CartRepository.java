package com.example.trek.Repository;

import com.example.trek.Entity.Product;
import com.example.trek.Entity.Cart;
import com.example.trek.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserAndProduct(Users user, Product product);

    List<Cart> findByUser(Users user);

    List<Cart> findByUserId(Long userId);

    void deleteByProduct(Product product);
}
