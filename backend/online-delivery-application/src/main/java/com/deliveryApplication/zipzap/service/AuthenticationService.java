package com.deliveryApplication.zipzap.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.deliveryApplication.zipzap.dto.request.AuthenticationRequest;
import com.deliveryApplication.zipzap.dto.request.RegisterRequest;
import com.deliveryApplication.zipzap.dto.response.AuthenticationResponse;
import com.deliveryApplication.zipzap.entity.Customer;
import com.deliveryApplication.zipzap.entity.DeliveryPartner;
import com.deliveryApplication.zipzap.entity.ShopOwner;
import com.deliveryApplication.zipzap.entity.User;
import com.deliveryApplication.zipzap.repository.CustomerRepository;
import com.deliveryApplication.zipzap.repository.DeliveryPartnerRepository;
import com.deliveryApplication.zipzap.repository.ShopOwnerRepository;
import com.deliveryApplication.zipzap.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
    private  CustomerRepository customerRepository;
	@Autowired
    private  DeliveryPartnerRepository deliveryPartnerRepository;
	@Autowired
	private ShopOwnerRepository shopOwnerRepository;
	@Autowired
    private PasswordEncoder passwordEncoder;
	@Autowired
    private JwtService jwtService;
	@Autowired
    private  AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request) {
        var user = User
                .builder()
                .name(request.getName())
                .email(request.getEmail())
                .role(request.getRole())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if(!existing.isEmpty()) {
        	return AuthenticationResponse.builder()
                    .token("Email Already exists")
                    .build();
        }
        User savedUser =userRepository.save(user);
        if(request.getRole().equals("customer")) {
        	Customer customer = new Customer();
        	customer.setName(request.getName());
        	customer.setUser(savedUser);
        	customerRepository.save(customer);
        }else if(request.getRole().equals("deliveryPartner")) {
        	DeliveryPartner deliveryPartner = new DeliveryPartner();
        	deliveryPartner.setName(request.getName());
        	deliveryPartner.setUser(savedUser);
        	deliveryPartnerRepository.save(deliveryPartner);
        }else if(request.getRole().equals("shop")){
        	System.out.print(request);
        	ShopOwner shopOwner = new ShopOwner();
        	shopOwner.setName(request.getName());
        	shopOwner.setShopName(request.getShopName());
        	shopOwner.setUser(savedUser);
        	shopOwnerRepository.save(shopOwner);
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        if(!user.getRole().equals(request.getRole())) {
        	return AuthenticationResponse.builder()
                    .token("Invalid Email/Password")
                    .build();
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


}
