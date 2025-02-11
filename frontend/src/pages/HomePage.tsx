import { useState } from 'react';
import { Package2, Shield, Loader2, Twitter, Hexagon, CheckCircle2, AlertCircle } from 'lucide-react';
import ProductForm from './ProductForm';
import NFTPreview from '../components/NFTPreview';

export default function HomePage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'twitter' | 'zkproof' | 'tokenization'>('twitter');
  const [previewData, setPreviewData] = useState<null | {
    productName: string;
    description: string;
    companyName: string;
  }>(null);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [showNFTPreview, setShowNFTPreview] = useState(false);

  const handleSubmit = async (productData: {
    twitterHandle: string;
    productName: string;
    productId: string;
    description: string;
    companyName: string;
  }) => {
    try {
      setIsProcessing(true);
      setShowNFTPreview(false);
      setPreviewData(productData);

      setCurrentStep('twitter');
      setTransactionStatus('pending');
      await new Promise(resolve => setTimeout(resolve, 2000));

      setCurrentStep('zkproof');
      await new Promise(resolve => setTimeout(resolve, 2000));

      setCurrentStep('tokenization');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setTransactionStatus('success');
      setShowNFTPreview(true);
    } catch (error) {
      console.error('Error processing product:', error);
      setTransactionStatus('error');
    } finally {
      setIsProcessing(false);
      setCurrentStep('twitter');
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
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-white/10
                            transform transition-all duration-500 hover:border-indigo-500/50">
                {/* Processing state content */}
                {/* ... Keep your existing processing state JSX ... */}
              </div>
            ) : (
              !showNFTPreview && <ProductForm onSubmit={handleSubmit} />
            )}
          </div>

          <div className="space-y-8">
            <div className={`transition-all duration-500 transform ${showNFTPreview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {showNFTPreview && <NFTPreview data={previewData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}