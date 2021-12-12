import React, { useEffect, useState } from 'react';

// remember to run 'npm install -S react-router-dom' in terminal and 'npm install react-router-dom --save'
import { Link, NavLink } from 'react-router-dom';

import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';
import vendingMachine from './vendingmachine.png';


const [boop, setBoop] = useState(false);

const boopBtn = () => (
    <button>BOOP</button>
)

boopHandler(() => {
    boopBtn.addEventListener("click", function() {
        setBoop(true)
    })
}, []);

const boopHandler = () => {
    setBoop(true)
}

{boop && <CandyMachine walletAddress={window.solana} />}