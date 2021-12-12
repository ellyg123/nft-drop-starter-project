import React, { useEffect, useState } from 'react';

// remember to run 'npm install -S react-router-dom' in terminal and 'npm install react-router-dom --save'
import { Link, NavLink } from 'react-router-dom';

import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';
import vendingMachine from './vendingmachine.png';

//test
import FrontView from './Front-view.js'


// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const SOLSCAN_LINK = `https://solscan.io/`;
const BUILDSPACE_LINK = `https://buildspace.so/`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <div>
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      connect wallet
    </button>
    </div>
  );

  const renderHomepage = () => (
    <div>
      <img class="vending-machine" src={vendingMachine} alt="Vending Machine"/>
    </div>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  // // Testing ground
  // const Nav = () => {
  //   return (
  //     <div className="container">
  //       <NavLink to="Front-view">TEST</NavLink>
  //     </div>
  //   )
  // }

  // const takeMeThere= () => (
  //   <div>
  //     <NavLink to="Front-view">TEST</NavLink>
  //   </div>
  // )

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
        {!walletAddress && renderNotConnectedContainer()}
        {!walletAddress && renderHomepage()}
        </div>
        {/* <img class="vending-machine" src={vendingMachine} alt="Vending Machine"/> */}
        {/* Check for walletAddress and then pass in walletAddress */}
        {/* {walletAddress && <CandyMachine walletAddress={window.solana} />} */}
        {/* Below is how I got to Front-view.js */}

        {walletAddress && <FrontView />}


        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by Ando Collective`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;