package com.deliveryApplication.zipzap.controller;

import com.deliveryApplication.zipzap.entity.Address;
import com.deliveryApplication.zipzap.entity.Customer;
import com.deliveryApplication.zipzap.entity.Product;
import com.deliveryApplication.zipzap.entity.ShopOwner;
import com.deliveryApplication.zipzap.service.ShopOwnerService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/shop-owners")
public class ShopOwnerController {
	@Autowired
    private  ShopOwnerService shopOwnerService;


    @GetMapping("/{email}")
    public ShopOwner getShopOwnerByEmail(@PathVariable String email) {
        return shopOwnerService.getShopOwnerByEmail(email);
    }
    
    @PostMapping("/create-product/{email}")
    public ResponseEntity<?> createProduct(@RequestBody Product product, @PathVariable String email) {
    	return shopOwnerService.createProduct(product, email);
    }
    
    @GetMapping("/get-product/{email}")
    public List<Product> getProducts(@PathVariable String email) {
    	return shopOwnerService.getProductsByShop(email);
    }
    
    @PostMapping("/add-address/{email}")
    public ShopOwner addAddress(@PathVariable String email,@RequestBody Address address) {
    	System.out.print("*");
    	return shopOwnerService.addDeliveryAddress(email, address);
    }
}
