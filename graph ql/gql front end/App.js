import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts($category: String) {
    products(category: $category) {
      id
      title
      price
      category
    }
    totalProducts
  }
`;

const GET_SINGLE_PRODUCT = gql`
  query GetSingleProduct($id: ID!) {
    product(id: $id) {
      id
      title
      price
      category
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($title: String!, $price: Int!, $category: String!) {
    addProduct(title: $title, price: $price, category: $category) {
      id
      title
    }
  }
`;

const UPDATE_PRODUCT_PRICE = gql`
  mutation UpdateProductPrice($id: ID!, $price: Int!) {
    updateProductPrice(id: $id, price: $price) {
      id
      price
    }
  }
    `;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

function App() {
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [singleProductId, setSingleProductId] = useState('');

  const [formAdd, setFormAdd] = useState({ title: '', price: '', category: '' });
  const [formUpdate, setFormUpdate] = useState({ id: '', price: '' });

  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { category: searchCategory || undefined }
  });

  const { data: singleData, refetch: fetchSingleProduct } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id: singleProductId },
    skip: !singleProductId
  });

  const [addProduct] = useMutation(ADD_PRODUCT, { onCompleted: () => refetch() });
  const [updateProductPrice] = useMutation(UPDATE_PRODUCT_PRICE, { onCompleted: () => refetch() });
  const [deleteProduct] = useMutation(DELETE_PRODUCT, { onCompleted: () => refetch() });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Product Management Dashboard</h1>
      <h3>Total Products: {data?.totalProducts}</h3>

      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by category..." 
          value={searchCategory} 
          onChange={(e) => setSearchCategory(e.target.value)} 
        />
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {data?.products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', width: '200px' }}>
            <h4>{product.title}</h4>
            <p>Price: ₹{product.price}</p>
            <p>Category: {product.category}</p>
            <button onClick={() => deleteProduct({ variables: { id: product.id } })}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid #eee', padding: '15px', marginBottom: '20px' }}>
        <h3>Get Single Product Details</h3>
        <input 
          type="text" 
          placeholder="Enter Product ID" 
          value={selectedId} 
          onChange={(e) => setSelectedId(e.target.value)} 
        />
        <button onClick={() => setSingleProductId(selectedId)}>Get Product Details</button>
        {singleData?.product && (
          <div style={{ marginTop: '10px', background: '#f9f9f9', padding: '10px' }}>
            <p><strong>Title:</strong> {singleData.product.title}</p>
            <p><strong>Price:</strong> ₹{singleData.product.price}</p>
            <p><strong>Category:</strong> {singleData.product.category}</p>
          </div>
        )}
      </div>

      <div style={{ border: '1px solid #eee', padding: '15px', marginBottom: '20px' }}>
        <h3>Add New Product</h3>
        <input 
          type="text" 
          placeholder="Title" 
          value={formAdd.title} 
          onChange={(e) => setFormAdd({ ...formAdd, title: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={formAdd.price} 
          onChange={(e) => setFormAdd({ ...formAdd, price: parseInt(e.target.value) || '' })} 
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={formAdd.category} 
          onChange={(e) => setFormAdd({ ...formAdd, category: e.target.value })} 
        />
        <button onClick={() => {
          addProduct({ variables: { ...formAdd } });
          setFormAdd({ title: '', price: '', category: '' });
        }}>Add Product</button>
      </div>

      <div style={{ border: '1px solid #eee', padding: '15px' }}>
        <h3>Update Product Price</h3>
        <input 
          type="text" 
          placeholder="Product ID" 
          value={formUpdate.id} 
          onChange={(e) => setFormUpdate({ ...formUpdate, id: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="New Price" 
          value={formUpdate.price} 
          onChange={(e) => setFormUpdate({ ...formUpdate, price: parseInt(e.target.value) || '' })} 
        />
        <button onClick={() => {
          updateProductPrice({ variables: { id: formUpdate.id, price: formUpdate.price } });
          setFormUpdate({ id: '', price: '' });
        }}>Update Price</button>
      </div>
    </div>
  );
}

export default App;