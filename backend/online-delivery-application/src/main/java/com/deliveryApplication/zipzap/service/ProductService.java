package com.deliveryApplication.zipzap.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deliveryApplication.zipzap.entity.Product;
import com.deliveryApplication.zipzap.repository.CustomerRepository;
import com.deliveryApplication.zipzap.repository.ProductRepository;
import com.deliveryApplication.zipzap.repository.ShopOwnerRepository;


@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ShopOwnerRepository shopOwnerRepository;
	
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	
	public List<Product> getProductsByCategory(String category){
		return productRepository.findByCategory(category);
	}
	
	public List<Product> getProductsOnTodaysDeal(){
		return productRepository.findByTodayDeal("yes");
	}
	
	public List<Product> getProductsByShopOwner(String email){
		return shopOwnerRepository.findByUserEmail(email).getProducts();
	}

	public String deleteProductById(Long id) {
		productRepository.deleteById(id);
		return "Deleted SuccessFully";
	}

	public String updateProduct(Product product) {
		Optional<Product> existingProduct = productRepository.findById(product.getId());
		existingProduct.get().setCategory(product.getCategory());
		existingProduct.get().setDescription(product.getDescription());
		existingProduct.get().setImgURL(product.getImgURL());
		existingProduct.get().setName(product.getName());
		existingProduct.get().setOrders(product.getOrders());
		existingProduct.get().setPrice(product.getPrice());
		existingProduct.get().setQuantity(product.getQuantity());
		existingProduct.get().setTodayDeal(product.getTodayDeal());
		productRepository.save(existingProduct.get());
		return "Updated Successfully";
	}
	
}
