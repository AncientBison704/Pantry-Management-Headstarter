import { firestore } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const itemsCollection = collection(firestore, 'items');

export async function addItem(data: any) {
  try {
    const docRef = await addDoc(itemsCollection, data);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function getItems() {
  try {
    const querySnapshot = await getDocs(itemsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Error getting documents: ', e);
    return [];
  }
}

export async function updateItem(id: string, data: any) {
  try {
    const docRef = doc(firestore, 'items', id);
    await updateDoc(docRef, data);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
}

export async function deleteItem(id: string) {
  try {
    const docRef = doc(firestore, 'items', id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
}
