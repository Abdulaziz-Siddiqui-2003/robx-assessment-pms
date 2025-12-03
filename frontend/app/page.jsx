"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Package, 
  Loader2 
} from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const res = await axios.get(`http://localhost:5000/api/products?search=${search}&page=${page}&limit=5`);
      
      // Handle the response (Check if backend sends pagination data or just array)
      if (res.data.pagination) {
        setProducts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        setTotalItems(res.data.pagination.total);
      } else {
        
        setProducts(Array.isArray(res.data) ? res.data : []);
      }
    } catch (error) {
      toast.error('Could not load products. Check backend connection.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); 
  }, [search]);


  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 400); 
    return () => clearTimeout(timer);
  }, [search, page]);

 
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success('Product deleted');
      fetchProducts(); 
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 font-sans text-gray-800">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto space-y-8">
        
 
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <Package className="text-blue-600" size={32} />
              Inventory
            </h1>
            <p className="text-gray-500 mt-1 ml-11">
              {loading ? 'Checking database...' : `Managing ${totalItems} total products`}
            </p>
          </div>
          
          <Link 
            href="/add" 
            className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> 
            <span className="font-medium">Add Product</span>
          </Link>
        </div>

  
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
          
         
          <div className="p-6 border-b border-gray-100">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products by name..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-400 text-gray-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          
          <div className="relative min-h-[400px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                <p className="text-gray-500 font-medium">Loading inventory data...</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr>
                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Product Details</th>
                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id} className="group hover:bg-blue-50/30 transition-colors duration-200">
                            <td className="p-6">
                              <div className="font-bold text-gray-900 text-lg">{product.name}</div>
                              <div className="text-xs text-gray-400 mt-1">ID: #{product.id}</div>
                            </td>
                            <td className="p-6">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                {product.category}
                              </span>
                            </td>
                            <td className="p-6 font-semibold text-gray-700 text-lg">
                              ${Number(product.price).toFixed(2)}
                            </td>
                            <td className="p-6">
                              <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                                <Link 
                                  href={`/edit/${product.id}`} 
                                  className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                  title="Edit Product"
                                >
                                  <Pencil size={18} />
                                </Link>
                                <button 
                                  onClick={() => handleDelete(product.id)} 
                                  className="p-2.5 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                                  title="Delete Product"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="p-20 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <Package size={64} strokeWidth={1} className="mb-4 text-gray-300" />
                              <p className="text-lg font-medium text-gray-500">No products found</p>
                              <p className="text-sm">Try adjusting your search or add a new product.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="border-t border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
                    <span className="text-sm text-gray-500">
                      Page <span className="font-bold text-gray-900">{page}</span> of {totalPages}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
                      >
                        <ChevronLeft size={16} /> Previous
                      </button>
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
                      >
                        Next <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}