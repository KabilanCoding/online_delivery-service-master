package com.deliveryApplication.zipzap.service;

import com.deliveryApplication.zipzap.entity.DeliveryPartner;
import com.deliveryApplication.zipzap.repository.DeliveryPartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryPartnerService {
	@Autowired
    private DeliveryPartnerRepository deliveryPartnerRepository;

    public DeliveryPartner getDeliveryPartnerByEmail(String email) {
        return deliveryPartnerRepository.findByUserEmail(email);
    }
}
