// pages/index.tsx
import React, { useState, useEffect } from 'react';
import PantryForm from '../src/app/components/PantryForm';
import PantryList from '../src/app/components/PantryList';
import { getItems } from '../src/app/lib/firestore';
import { Container, Typography } from '@mui/material';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [currentItem, setCurrentItem] = useState<any | null>(null);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data || []); // Ensure setItems always receives an array
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (id: string) => {
    const item = items.find((item) => item.id === id);
    setCurrentId(id);
    setCurrentItem(item);
  };

  const handleFormSubmit = () => {
    fetchItems();
    setCurrentId(undefined);
    setCurrentItem(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pantry Management
      </Typography>
      <PantryForm currentId={currentId} currentItem={currentItem} onSubmit={handleFormSubmit} />
      <PantryList items={items} onEdit={handleEdit} onDelete={fetchItems} />
    </Container>
  );
}
