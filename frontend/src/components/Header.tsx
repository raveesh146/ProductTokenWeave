import React from "react";
import { Link } from "react-router-dom";
import useWallet from "../hooks/useWallet";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="bg-violet-500 flex items-center justify-between px-8 py-4">
      <h1 className="text-4xl font-black text-black tracking-tighter">
        TokenWeave
      </h1>
      <nav className="flex space-x-6">
        <Link
          to="/"
          className="text-lg font-bold hover:text-blue-700"
        >
          Home
        </Link>
        <Link
          to="/uri-creation"
          className="text-lg font-bold  hover:text-purple-700"
        >
          URI Creation
        </Link>
        <Link
          to="/tokenization"
          className="text-lg font-bold hover:text-green-700"
        >
          Tokenization
        </Link>
        <Link
          to="/balance"
          className="text-lg font-bold hover:text-orange-700"
        >
          My Tokens
        </Link>

      </nav>
      {account ? (
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
};


