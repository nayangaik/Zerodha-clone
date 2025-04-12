// dashboard/src/components/BuyStockModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

// Basic styling for the modal content
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4, // padding
  display: 'flex',
  flexDirection: 'column',
  gap: 2, // spacing between elements
};

const BuyStockModal = ({ open, onClose, stock, onConfirmBuy }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset quantity when modal opens for a new stock
  useEffect(() => {
    if (open) {
      setQuantity(1);
      setIsSubmitting(false);
      setError('');
    }
  }, [open]);

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    // Allow only positive integers
    if (/^\d*$/.test(value)) {
       setQuantity(value === '' ? '' : parseInt(value, 10));
    }
  };

  const handleBuyClick = async () => {
    if (!quantity || quantity <= 0) {
        setError('Please enter a valid quantity.');
        return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      // Call the confirmation function passed from parent
      await onConfirmBuy({
        name: stock.name,
        price: stock.price, // Use the price from the watchlist item
        quantity: quantity,
      });
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Buy order failed:", err);
      setError(err.message || 'Failed to place buy order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!stock) return null; // Don't render if no stock data

  return (
    <Modal
      open={open}
      onClose={onClose} // Allows closing by clicking outside
      aria-labelledby="buy-stock-modal-title"
      aria-describedby="buy-stock-modal-description"
    >
      <Box sx={style}>
        <Typography id="buy-stock-modal-title" variant="h6" component="h2">
          Buy {stock.name}
        </Typography>
        <Typography id="buy-stock-modal-description" sx={{ mt: 2 }}>
          Current Price: ₹{stock.price?.toFixed(2)}
        </Typography>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          variant="outlined"
          fullWidth
          inputProps={{ min: 1, step: 1 }} // Basic validation
          error={!!error} // Show error state on text field
          helperText={error} // Display error message
        />
        <Button
          variant="contained"
          color="success" // Green for buy
          onClick={handleBuyClick}
          disabled={isSubmitting || !quantity || quantity <= 0} // Disable while submitting or if quantity invalid
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Buy'}
        </Button>
        <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default BuyStockModal;
