package com.deliveryApplication.zipzap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deliveryApplication.zipzap.entity.ShopOwner;

public interface ShopOwnerRepository extends JpaRepository<ShopOwner, Long> {
    ShopOwner findByUserEmail(String email);
}
