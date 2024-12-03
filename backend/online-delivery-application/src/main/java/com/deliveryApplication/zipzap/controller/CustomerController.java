package com.deliveryApplication.zipzap.controller;

import com.deliveryApplication.zipzap.entity.Address;
import com.deliveryApplication.zipzap.entity.Customer;
import com.deliveryApplication.zipzap.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin

@RequestMapping("/api/customers")
public class CustomerController {
	@Autowired
    private CustomerService customerService;

    @GetMapping("/{email}")
    public Customer getCustomerByEmail(@PathVariable String email) {
        return customerService.getCustomerByEmail(email);
    }
    
    @PostMapping("/add-address/{email}")
    public Customer addAddress(@PathVariable String email,@RequestBody Address address) {
    	return customerService.addDeliveryAddress(email, address);
    }
    
}

