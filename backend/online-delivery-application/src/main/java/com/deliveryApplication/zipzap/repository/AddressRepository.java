package com.deliveryApplication.zipzap.repository;
import com.deliveryApplication.zipzap.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {

}
