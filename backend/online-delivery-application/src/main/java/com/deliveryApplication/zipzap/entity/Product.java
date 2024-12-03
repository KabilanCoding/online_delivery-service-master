package com.deliveryApplication.zipzap.entity;

import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String description;
    private double quantity;
    private String category;
    private String imgURL;
    private Long shopId;
    private String todayDeal;
    
    @ManyToOne
    @JoinColumn(name = "shop_owner_id")
    private ShopOwner shopOwner;

    @ManyToMany(mappedBy = "products")
    private List<Order> orders;
}

