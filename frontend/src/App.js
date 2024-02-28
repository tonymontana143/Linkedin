import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ConnectWallet from './components/ConnectWallet';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import NetworkComponent from './components/NetworkComponent';
import Web3 from 'web3';
// import MyBlockchainComponent from './components/MyBlockchainComponent';

function App() {
    const [account, setAccount] = useState('');

    useEffect(() => {
        connectWalletHandler();
    }, []);

    const connectWalletHandler = async () => {
      console.log("Trying to connect wallet");
      if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const accounts = await web3.eth.getAccounts();
              setAccount(accounts[0]);
              console.log("Wallet connected:", accounts[0]);
          } catch (error) {
              console.error("Error connecting wallet:", error);
          }
      } else {
          alert('Please install MetaMask!');
      }
  };
  

    return (
<Router>
      <nav>
        <Link to="/">Home</Link><br />
        <Link to="/profile">Profile</Link><br />
        <Link to="/network">Network</Link>

      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/network" component={NetworkComponent} />
      </Routes>
    </Router>
    );
}


export default App;
