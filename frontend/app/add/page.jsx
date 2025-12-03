'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '../components/ProductForm';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
    
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create product');
      }

      
      router.push('/');
      router.refresh(); 
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Inventory Management</h1>
      
      {error && (
        <div className="max-w-2xl mx-auto mb-6 p-4 text-red-700 bg-red-100 rounded-lg border border-red-200 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="font-semibold">Error:</span> {error}
            <p className="text-sm mt-1">Make sure your Express backend is running on port 5000.</p>
          </div>
        </div>
      )}

      
      <ProductForm onSubmit={createProduct} isSubmitting={isSubmitting} />
    </div>
  );
}