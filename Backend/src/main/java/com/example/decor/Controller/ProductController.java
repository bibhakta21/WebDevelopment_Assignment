package com.example.decor.Controller;

import com.example.decor.Entity.Product;
import com.example.decor.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("api/v2/books")
@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("add")
    public ResponseEntity<Object> createProducts(@RequestParam("title") String title,
                                              @RequestParam("price") BigDecimal price,
                                              @RequestParam("description") String description,
                                              @RequestParam("image") MultipartFile image) {
        try {
            Product newProduct = new Product();
            newProduct.setTitle(title);
            newProduct.setPrice(price);
            newProduct.setDescription(description);

            // Save image to the specified directory
            String imagePath = saveImage(image);
            newProduct.setImagePath(imagePath);

            // Convert image to Base64
            String base64Image = convertImageToBase64(imagePath);

            Product createdProduct = productService.createProduct(newProduct);

            String successMessage = "New Product was added to the system.";
            Map<String, Object> response = new HashMap<>();
            response.put("message", successMessage);
            response.put("Products", createdProduct);
            response.put("base64Image", base64Image); // Include Base64 image in the response
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // Add a method to convert image to Base64
    private String convertImageToBase64(String imagePath) throws IOException {
        byte[] imageBytes = Files.readAllBytes(Paths.get(imagePath));
        return Base64.getEncoder().encodeToString(imageBytes);
    }


    private String saveImage(MultipartFile image) throws IOException {
        String uploadDirectory = "C:/Users/Bibhakta lamsal/Desktop/Web final project/Backend/src/main/java/com/example/decor/Productimg";

        // Append timestamp to the original filename
        String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename()));

        Path uploadPath = Paths.get(uploadDirectory);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = image.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            return filePath.toString();
        }
    }

    @GetMapping("getAll")
    public List<Product> getAllProducts(){
        //Should this api be present here?
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Object> getProductById(@PathVariable long productId) {
        try {
            // Your logic to get the book by ID
            Product product = productService.getProductById(productId).orElseThrow(() -> new RuntimeException("Product with id not found"));

            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("delete/{productId}")
    public ResponseEntity<Object> deleteProductById(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            //void method may produce illegal argument exception when findById fails
            Map<String, String> response = new HashMap<>();
            response.put("Message", "Product deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            //Catch error from service
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("Message", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("edit/{productId}")
    public ResponseEntity<Object> putProduct(@PathVariable Long productId,@RequestBody Product updatedProduct){
        try {
            Product changedProduct=productService.putProduct(productId,updatedProduct);
            //since optional<book> is returned by repository we need to catch error
            return new ResponseEntity<>(changedProduct,HttpStatus.OK);
        }catch (IllegalArgumentException e){
            Map<String,String> errorResponse=new HashMap<>();
            errorResponse.put("message",e.getMessage());
            return new ResponseEntity<>(errorResponse,HttpStatus.OK);
        }
    }

}
