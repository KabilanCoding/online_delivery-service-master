package com.deliveryApplication.zipzap.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deliveryApplication.zipzap.entity.DeliveryPartner;


@Repository
public interface DeliveryPartnerRepository extends JpaRepository<DeliveryPartner, Long> {
	DeliveryPartner findByUserEmail(String email);
}

