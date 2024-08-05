import React, { useState, useEffect } from 'react';
import { addItem, updateItem } from '../lib/firestore';
import { TextField, Button } from '@mui/material';

interface PantryFormProps {
  currentId?: string;
  currentItem?: any;
  onSubmit: () => void;
}

const PantryForm: React.FC<PantryFormProps> = ({ currentId, currentItem, onSubmit }) => {
  const [item, setItem] = useState(currentItem || { name: '', quantity: '' });

  useEffect(() => {
    setItem(currentItem || { name: '', quantity: '' });
  }, [currentItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentId) {
      await updateItem(currentId, item);
    } else {
      await addItem(item);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={item.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {currentId ? 'Update' : 'Add'} Item
      </Button>
    </form>
  );
};

export default PantryForm;
