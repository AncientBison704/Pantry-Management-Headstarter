import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteItem } from '../lib/firestore';

interface PantryListProps {
  items: any[];
  onEdit: (id: string) => void;
  onDelete: () => void;
}

const PantryList: React.FC<PantryListProps> = ({ items, onEdit, onDelete }) => {
  const handleDelete = async (id: string) => {
    await deleteItem(id);
    onDelete();
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id} secondaryAction={
          <>
            <IconButton edge="end" onClick={() => onEdit(item.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(item.id)}>
              <Delete />
            </IconButton>
          </>
        }>
          <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default PantryList;
