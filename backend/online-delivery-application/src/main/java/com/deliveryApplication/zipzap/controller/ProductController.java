package com.deliveryApplication.zipzap.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deliveryApplication.zipzap.entity.Product;
import com.deliveryApplication.zipzap.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired
	public ProductService productService;
	
	@GetMapping
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
	}

	@GetMapping("/{category}")
	public List<Product> getProductByCategory(@PathVariable String category){
		return productService.getProductsByCategory(category);
	}
	
	@GetMapping("/today-deal")
	public List<Product> getProductByTodayDeal(){
		return productService.getProductsOnTodaysDeal();
	}
	
	@PutMapping("update-product")
	public String updateProduct(@RequestBody Product product) {
		return productService.updateProduct(product);
	}
	
	@DeleteMapping("/delete-product/{id}")
	public String deleteProduct(@PathVariable Long id) {
		return productService.deleteProductById(id);
	}
}
