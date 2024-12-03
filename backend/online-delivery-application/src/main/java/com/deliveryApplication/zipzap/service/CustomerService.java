package com.deliveryApplication.zipzap.service;

import com.deliveryApplication.zipzap.entity.Address;
import com.deliveryApplication.zipzap.entity.Customer;
import com.deliveryApplication.zipzap.repository.AddressRepository;
import com.deliveryApplication.zipzap.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
	@Autowired
    private CustomerRepository customerRepository;
	
	@Autowired
	private AddressRepository addressRepository;

    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByUserEmail(email);
    }
    
    public Customer addDeliveryAddress(String email,Address address) {
    	Customer customer = customerRepository.findByUserEmail(email);
    	address.setCustomer(customer);
    	Address newAddress = new Address();
    	newAddress.setDoorNo(address.getDoorNo());
    	newAddress.setContactNo(address.getContactNo());
    	newAddress.setLocality(address.getLocality());
    	newAddress.setStreet(address.getStreet());
    	newAddress.setCustomer(customer);
    	customer.setAddress(addressRepository.save(address));
//    	customer.setAddress(address);
    	return customer;
    }
}
