package com.deliveryApplication.zipzap.service;

import com.deliveryApplication.zipzap.entity.Address;
import com.deliveryApplication.zipzap.entity.Customer;
import com.deliveryApplication.zipzap.entity.Product;
import com.deliveryApplication.zipzap.entity.ShopOwner;
import com.deliveryApplication.zipzap.repository.ProductRepository;
import com.deliveryApplication.zipzap.repository.ShopOwnerRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ShopOwnerService {
	@Autowired
    private ShopOwnerRepository shopOwnerRepository;

	@Autowired
	private ProductRepository productRepository;
	
	
    public ShopOwner getShopOwnerByEmail(String email) {
    	System.out.print("*");
        return shopOwnerRepository.findByUserEmail(email);
    }
    
    public ResponseEntity<?> createProduct(Product product, String email) {
    	ShopOwner owner = shopOwnerRepository.findByUserEmail(email);
    	product.setShopId(owner.getId());
    	productRepository.save(product);
    	owner.getProducts().add(product);
    	return ResponseEntity.ok("Product created successfully");
    }
    
    public ShopOwner addAddress(String email,Address address) {
    	ShopOwner shopOwner = shopOwnerRepository.findByUserEmail(email);
    	shopOwner.setShopName(address.getShopName());
    	shopOwner.setAddress(address);
    	shopOwnerRepository.save(shopOwner);
    	return shopOwner;
    }
    
    public List<Product> getProductsByShop(String email) {
    	ShopOwner owner = shopOwnerRepository.findByUserEmail(email);
    	return productRepository.findByShopId(owner.getId());
    }
    
    
    public ShopOwner addDeliveryAddress(String email,Address address) {
    	ShopOwner shopOwner  = shopOwnerRepository.findByUserEmail(email);
    	shopOwner.setAddress(address);
    	shopOwner.setShopName(address.getShopName());
    	System.out.print(shopOwner);
    	return shopOwner;
    }
}
