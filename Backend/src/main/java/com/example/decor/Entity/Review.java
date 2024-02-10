//package com.example.trek.Entity;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "reviews", uniqueConstraints = {
//        @UniqueConstraint(columnNames = { "user_id", "book_id" })
//})
//public class Review {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "review_id")
//    private long reviewId;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private Users user;
//    @ManyToOne
//    @JoinColumn(name = "book_id")
//    private Product book;
//    @Column(name = "review_text", columnDefinition = "TEXT")
//    private String reviewText;
//
//    public long getReviewId() {
//        return reviewId;
//    }
//
//    public void setReviewId(long reviewId) {
//        this.reviewId = reviewId;
//    }
//
//    public Users getUser() {
//        return user;
//    }
//
//    public void setUser(Users user) {
//        this.user = user;
//    }
//
//    public Product getBook() {
//        return book;
//    }
//
//    public void setBook(Product book) {
//        this.book = book;
//    }
//
//    public String getReviewText() {
//        return reviewText;
//    }
//
//    public void setReviewText(String reviewText) {
//        this.reviewText = reviewText;
//    }
//}
