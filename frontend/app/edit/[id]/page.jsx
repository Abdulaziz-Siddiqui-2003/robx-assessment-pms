'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '../../components/ProductForm'; 

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // Next.js hook to get the dynamic ID
  const { id } = params;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) throw new Error('Product not found');
          throw new Error('Failed to fetch product details');
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  
  const updateProduct = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update product');
      }
      
      
      router.push('/');
      router.refresh(); 
      
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Inventory Management</h1>
      
      {error ? (
        <div className="max-w-2xl mx-auto mb-6 p-4 text-red-700 bg-red-100 rounded-lg border border-red-200 text-center">
            <p className="font-semibold">Error loading product</p>
            <p>{error}</p>
            <button 
              onClick={() => router.back()}
              className="mt-4 text-sm text-red-700 underline hover:text-red-900"
            >
              Go Back
            </button>
        </div>
      ) : (
       
        product && (
          <ProductForm 
            initialData={product} 
            onSubmit={updateProduct} 
            isSubmitting={isSubmitting} 
          />
        )
      )}
    </div>
  );
}