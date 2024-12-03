package com.deliveryApplication.zipzap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deliveryApplication.zipzap.entity.Customer;
import com.deliveryApplication.zipzap.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(Customer customer);
}
