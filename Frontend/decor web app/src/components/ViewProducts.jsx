import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useProductContext } from "../context/ProductContext";
import { useAuthContext } from "../context/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import "../css/dashboard.css";

const ViewProducts = () => {
  const { products, fetchProducts, deleteProduct } = useProductContext();
  const { user } = useAuthContext();
  const userID = user ? user.id : null;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteProductId);
      toast.success("Product deleted successfully");
      fetchProducts(); // Refresh the product list after deletion
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const openDeleteDialog = (productId) => {
    setDeleteProductId(productId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-6 items-center justify-center mt-10 mb-10">
      {products.map((product) => (
        <div key={product.productId} className="w-64 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl py-6 ml-4">
          {product.base64Image ? (
            <Link to={`/products/${product.productId}`}>
              <img
                src={`data:image/png;base64, ${product.base64Image}`}
                alt="Product"
                className="h-48 w-64 object-cover rounded-t-xl"
              />
            </Link>
          ) : (
            <div className="h-48 w-64 bg-gray-200 flex items-center justify-center">
              Image Not Available
            </div>
          )}
          <div className="px-4 py-3 w-64">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {product.authorName}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {product.title}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                Rs{product.price.toFixed(2)}
              </p>
              <div className="ml-auto mt-2">
                <button
                  onClick={() => openDeleteDialog(product.productId)}
                  className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 focus:outline-none hover:bg-blue-600"
                >
                  <MdDeleteOutline size={20} color="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      <ToastContainer />
    </div>
  );
};

export default ViewProducts;
