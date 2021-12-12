import React, { useEffect, useState } from 'react';
import './Front-view.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

import vendingMachineFrontView from './assets/candy-machine-front-view.png';
import topButton from './assets/candy-btn2.png';
import solanaButton from './assets/solana-btn2.png';
import buildspaceButton from './assets/buildspace-btn2.png';
import numberButton from './assets/number-btn_2.png';

import { Link, NavLink } from 'react-router-dom';

import NFTPage from './Nft.js'


// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const SOLSCAN_LINK = `https://solscan.io/`;
const BUILDSPACE_LINK = `https://buildspace.so/`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // boop testing
  const [boop, setBoop] = useState(false);

    const boopHandler = () => {
        setBoop(true)
    }


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

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  const renderFrontView = () => (
    <div>
    <div class="vending-machine-container">
      <img class="vending-machine-front" src={vendingMachineFrontView} alt="Vending Machine Front View"/>
    </div>

    <div class="candy-container front-view-button">
      <a href="https://docs.metaplex.com/create-candy/introduction" target="_blank"
            rel="noreferrer">
            <img src={topButton} alt="top button"/>
      </a>
    </div>

    <div class="solana-container front-view-button">
      <a href="https://solscan.io/" target="_blank"
            rel="noreferrer">
          <img src={solanaButton} alt="solana button"/>
      </a>
    </div>

    <div class="buildspace-container front-view-button">
      <a href="https://buildspace.so/" target="_blank"
            rel="noreferrer">
          <img src={buildspaceButton} alt="buildspace button"/>
      </a>
    </div>

    <div class="number-container front-view-button">
      <a href="https://docs.metaplex.com/create-candy/introduction">
          <img src={numberButton} alt="number button"/>
      </a>
    </div>
    </div>
  )

    const candyButton = () => (
        <button onClick={boopHandler}>🍭🍭🍭🍭</button>
    )
    
  return (
    <div id="front-view" className="App">
      <div className="container">
        {!boop && renderFrontView()}
        {/* <butoon onClick={boopHandler}>
            TAKE ME TO CANDY MACHINE
        </butoon> */}
        {!boop && candyButton()}
        {boop && <NFTPage/>}

        {/* Check for walletAddress and then pass in walletAddress */}
        {/* {walletAddress && <CandyMachine walletAddress={window.solana} />} */}


        {/* <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by Ando Collective`}</a>
        </div> */}
      </div>
    </div>
  );
};

export default App;