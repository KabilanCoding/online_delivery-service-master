package com.deliveryApplication.zipzap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deliveryApplication.zipzap.entity.Cart;
import com.deliveryApplication.zipzap.entity.CartItem;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart(Cart cart);
}
