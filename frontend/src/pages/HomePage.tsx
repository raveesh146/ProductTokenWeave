import React, { useState } from 'react';
import { Package2, Twitter, Hexagon,} from 'lucide-react';
import ProductForm from './ProductForm';
import ProcessingComponent from '../components/ProcessingComponent';
import NFTPreview from '../components/NFTPreview';

const HomePage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<null | {
    productName: string;
    description: string;
    companyName: string;
  }>(null);
  const [showNFTPreview, setShowNFTPreview] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      setIsProcessing(true);
      
      // Twitter data fetching
      const response = await fetch(`http://localhost:5002/api/twitter/${formData.twitterHandle}`);
      const responseData = await response.json();
      
      // Check for the nested data structure from backend
      const twitterData = responseData.data; // Backend now returns { data: {...} }
      
      if (!twitterData) {
        throw new Error('No data received from server');
      }
      
      // Create description with Twitter data
      const description = `Twitter Profile: ${twitterData.profile.name}\nBio: ${twitterData.profile.bio}\nFollowers: ${twitterData.profile.followers}\nRecent Tweets:\n${twitterData.tweets.join('\n')}`;
      
      // Set preview data with Twitter information
      setPreviewData({
        productName: formData.productName,
        description: description,
        companyName: formData.companyName
      });

      // Validate with backend
      const validateResponse = await fetch('http://localhost:5002/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, description }),
      });

      const validationData = await validateResponse.json();
      if (!validationData.success) {
        throw new Error(validationData.error || 'Validation failed');
      }

      // Show processing for 10 seconds
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      setIsProcessing(false);
      setShowNFTPreview(true);
      
    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);
      // Could add error state handling here
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c1d] bg-[radial-gradient(at_center,_#20205c_0%,_#0c0c1d_70%)] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative animate-float">
              <Hexagon className="w-20 h-20 text-indigo-400" strokeWidth={1.5} />
              <Package2 className="w-10 h-10 text-indigo-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 animate-pulse">
                <Twitter className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 animate-gradient">
            Product TokenWeave 
          </h1>
          <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto">
            Transform your new product launch into verifiable digital assets with ZK-proofs.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-8">
            {isProcessing ? (
              <ProcessingComponent />
            ) : !showNFTPreview ? (
              <ProductForm onSubmit={handleSubmit} />
            ) : (
              <NFTPreview data={previewData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;