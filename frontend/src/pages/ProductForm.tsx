import React, { useState } from 'react';
import { Package2, Twitter, Info } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (data: {
    twitterHandle: string;
    productName: string;
    productId: string;
    description: string;
    companyName: string;
  }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    twitterHandle: '',
    productName: '',
    productId: '',
    description: '',
    companyName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10
                                           transform transition-all duration-500 hover:border-indigo-500/50">
      <div className="space-y-8">
        <div className="bg-blue-500/5 rounded-xl p-6 border border-blue-500/10
                      transform transition-all duration-300 hover:border-blue-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Twitter className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Twitter Verification</h3>
          </div>
          <div>
            <label htmlFor="twitterHandle" className="block text-sm font-medium text-indigo-200">
              Twitter Handle
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-indigo-300">@</span>
              <input
                type="text"
                id="twitterHandle"
                name="twitterHandle"
                required
                value={formData.twitterHandle}
                onChange={handleChange}
                className="pl-8 block w-full rounded-lg border-indigo-500/20 bg-indigo-500/5 shadow-sm 
                         focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white
                         transition-colors duration-200"
                placeholder="username"
              />
            </div>
            <p className="mt-2 text-sm text-indigo-300/80 flex items-center">
              <Info className="w-4 h-4 mr-1" />
              Your Twitter account will be used for verification
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Product Details</h3>
          
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-indigo-200">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              required
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-indigo-500/20 bg-indigo-500/5 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white
                       transition-colors duration-200"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="productId" className="block text-sm font-medium text-indigo-200">
              Product ID
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              required
              value={formData.productId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-indigo-500/20 bg-indigo-500/5 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white
                       transition-colors duration-200"
              placeholder="Enter product ID"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-indigo-200">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-lg border-indigo-500/20 bg-indigo-500/5 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white
                       transition-colors duration-200"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-indigo-200">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-indigo-500/20 bg-indigo-500/5 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white
                       transition-colors duration-200"
              placeholder="Enter company name"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl
                     text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-indigo-500/25"
          >
            <Package2 className="w-5 h-5 mr-2" />
            Tokenize Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;