import { createConfig, WagmiConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';

// import URICreationPage from './pages/URICreationPage';
// import TokenizationPage from './pages/TokenizationPage';
// import BalancePage from './pages/BalancePage';
import HomePage from './pages/HomePage';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

function App() {
  return (
    <Router>
      <WagmiConfig config={config}>
        <div><Header/></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/uri-creation" element={<URICreationPage />} />
          <Route path="/tokenization" element={<TokenizationPage />} />
          <Route path="/balance" element={<BalancePage />} /> */}
        </Routes>
      </WagmiConfig>
    </Router>
  );
}

export default App;