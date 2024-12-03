package com.deliveryApplication.zipzap.controller;

import com.deliveryApplication.zipzap.entity.DeliveryPartner;
import com.deliveryApplication.zipzap.service.DeliveryPartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/delivery-partners")
public class DeliveryPartnerController {
	@Autowired
    private DeliveryPartnerService deliveryPartnerService;
   
    @GetMapping("/{email}")
    public DeliveryPartner getDeliveryPartnerByEmail(@PathVariable String email) {
        return deliveryPartnerService.getDeliveryPartnerByEmail(email);
    }
}
