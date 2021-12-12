import React, { useEffect, useState } from 'react';
import './Nft.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

import nftGoddess from './nft_collection/crypto-goddess-1.png';


import { Link, NavLink } from 'react-router-dom';

import vendingMachine from './vendingmachine.png';




// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const SOLSCAN_LINK = `https://solscan.io/`;
const BUILDSPACE_LINK = `https://buildspace.so/`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // boop testing
  const [beep, setBeep] = useState(false);

  // Actions
    const beepHandler = () => {
        setBeep(true)
    }

    const mintyButton = () => (
        <button onClick={beepHandler}>🟢🟢🟢🟢🟢</button>
    )




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

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // render NFTs
  const nftCollectionRender = () => (
    <div>
        <img class="vending-machine" src={nftGoddess} alt="Crpto Goddess"/>
    </div>
  )

  const renderHomepage = () => (
    <div>
      <img class="vending-machine" src={vendingMachine} alt="Vending Machine"/>
    </div>
  )

// MINT BTN IS WAY UP THERE 🟢🟢🟢🟢🟢

  return (
    <div id="front-view" className="App">
      <div className="container">
        {!beep && nftCollectionRender()}
        {!beep && mintyButton()}
        {beep && <CandyMachine walletAddress={window.solana} />}
        
        {/* <div>
            <img src={nftGoddess}></img>
        </div> */}

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