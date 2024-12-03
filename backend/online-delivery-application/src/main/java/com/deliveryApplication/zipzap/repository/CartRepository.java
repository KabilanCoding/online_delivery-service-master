package com.deliveryApplication.zipzap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deliveryApplication.zipzap.entity.Cart;
import com.deliveryApplication.zipzap.entity.Customer;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByCustomer(Customer customer);
}
