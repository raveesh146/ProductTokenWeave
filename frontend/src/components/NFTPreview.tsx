import React from 'react';
import { Package2, Shield, Twitter } from 'lucide-react';
import type { TwitterData } from '../pages/TwitterService';

interface NFTPreviewProps {
  data: {
    productName: string;
    description: string;
    companyName: string;
  } | null;
  twitterData?: TwitterData | null;
}

const NFTPreview: React.FC<NFTPreviewProps> = ({ data, twitterData }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10
                    transform transition-all duration-500 hover:border-indigo-500/50 h-full">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-indigo-400" />
        NFT Preview
      </h3>

      {data ? (
        <div className="space-y-6">
          <div className="aspect-square rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20
                        flex items-center justify-center p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 transform group-hover:scale-105 transition-transform duration-500" />
            <Package2 className="w-24 h-24 text-indigo-400 transform group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-indigo-300">Product Name</h4>
              <p className="text-lg text-white">{data.productName}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-indigo-300">Description</h4>
              <p className="text-white/80">{data.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-indigo-300">Company</h4>
              <p className="text-white">{data.companyName}</p>
            </div>

            {twitterData && (
              <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
                <div className="flex items-center space-x-3 mb-3">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-medium text-blue-300">Twitter Profile</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium">{twitterData.profile.name}</p>
                  <p className="text-white/80 text-sm">{twitterData.profile.bio}</p>
                  <p className="text-blue-300 text-sm">{twitterData.profile.followers.toLocaleString()} followers</p>
                  {twitterData.tweets.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-blue-500/10">
                      <p className="text-sm text-blue-300 mb-2">Recent Tweet:</p>
                      <p className="text-white/80 text-sm">{twitterData.tweets[0]}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4">
              <div className="text-sm text-indigo-300/80 flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Verified with ZK-Proof
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100%-2rem)] flex flex-col items-center justify-center text-center space-y-4 text-indigo-300/60">
          <Package2 className="w-16 h-16" />
          <p>Fill out the form to preview your NFT</p>
        </div>
      )}
    </div>
  );
};

export default NFTPreview;