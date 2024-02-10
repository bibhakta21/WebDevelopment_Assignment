//// Product.java
//
//package com.example.trek.Entity;
//
//import jakarta.persistence.*;
//
//
//
//@Entity
//@Table(name = "products")
//public class Product {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "price")
//    private double price;
//
//    @Column(name = "description")
//    private String description;
//
//    @Column(name = "image_path")
//    private String imagePath;
//
//    @Transient
//    private String base64Image;
//
//
//    // Constructors
//    public Product() {
//        // Default constructor
//    }
//
//    public Product(String name, double price, String description, String imagePath) {
//        this.name = name;
//        this.price = price;
//        this.description = description;
//        this.imagePath = imagePath;
//    }
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public double getPrice() {
//        return price;
//    }
//    public void setPrice(double price) {
//        this.price = price;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public String getImagePath() {
//        return imagePath;
//    }
//
//    public void setImagePath(String imagePath) {
//        this.imagePath = imagePath;
//    }
//
//    public String getBase64Image() {
//        return base64Image;
//    }
//
//    // Setter for base64Image
//    public void setBase64Image(String base64Image) {
//        this.base64Image = base64Image;
//    }
//}
