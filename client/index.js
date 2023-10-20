const ethers = require('ethers');
require('dotenv').config();
const contractArtifact = require('../out/Counter.sol/Counter.json');
const contractAbi = contractArtifact.abi;

let theContract;
let provider;

async function initContract() {
  if (!window.ethereum) {
    throw new Error('provider not found');
  }
  window.ethereum.on('accountsChanged', () => {
    console.log('acct');
    window.location.reload();
  });
  window.ethereum.on('chainChanged', () => {
    console.log('chainChained');
    window.location.reload();
  });

  provider = new ethers.providers.Web3Provider(window.ethereum);

  const contractAddress = '0x3674651af1b1c3615621d0279cca7f510dfeaf51';
  theContract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());

  await getNumber();

  // await listenToEvents()
  return { contractAddress };
}

async function callIncrement() {
  await window.ethereum.send('eth_requestAccounts');

  const txOptions = { gasPrice: await provider.getGasPrice() };
  const transaction = await theContract.increment(txOptions);
  const hash = transaction.hash;

  alert(`Transaction ${hash} sent. Please wait for confirmation...`);
  const id = document.getElementById('hash');
  id.innerText = hash;
  toggleLoadingIcon(true);
  const receipt = await transaction.wait();
  alert(`Mined in block: ${receipt.blockNumber}`);

  const id2 = document.getElementById('block');
  id2.innerText = receipt.blockNumber;
  toggleLoadingIcon(false);
}

async function callDecrement() {
  await window.ethereum.send('eth_requestAccounts');

  const txOptions = { gasPrice: await provider.getGasPrice() };
  const transaction = await theContract.increment(txOptions);
  const hash = transaction.hash;

  alert(`Transaction ${hash} sent. Please wait for confirmation...`);
  const id = document.getElementById('hash');
  id.innerText = hash;
  toggleLoadingIcon(true);
  const receipt = await transaction.wait();
  alert(`Mined in block: ${receipt.blockNumber}`);

  const id2 = document.getElementById('block');
  id2.innerText = receipt.blockNumber;
  toggleLoadingIcon(false);
}

async function getLastCaller() {
  await window.ethereum.send('eth_requestAccounts');

  const txOptions = { gasPrice: await provider.getGasPrice() };
  toggleLoadingIcon(true);
  const transaction = await theContract.getLastCaller(txOptions);

  alert(`This is the last caller: ${transaction}`);

  const id = document.getElementById('caller');
  id.innerText = transaction;
    toggleLoadingIcon(false);
}

async function getNumber() {
  await window.ethereum.send('eth_requestAccounts');

  const txOptions = { gasPrice: await provider.getGasPrice() };

  toggleLoadingIcon(true);
  const transaction = await theContract.number(txOptions);

  alert(`The current number is: ${transaction}! Increment or decrement it!`);

  const id = document.getElementById('number');

  id.innerText = transaction;
    toggleLoadingIcon(false);
}

function toggleLoadingIcon(isLoading) {
  const loadingIcon = document.getElementById('loading-icon');

  if (isLoading) {
    loadingIcon.style.display = 'block';
  } else {
    loadingIcon.style.display = 'none';
  }
}

// let logview

// function log(message) {
//     message = message.replace(/(0x\w\w\w\w)\w*(\w\w\w\w)\b/g, '<b>$1...$2</b>')
//     if (!logview) {
//         logview = document.getElementById('logview')
//     }
//     logview.innerHTML = message + "<br>\n" + logview.innerHTML
// }

// async function listenToEvents() {

//     theContract.on('FlagCaptured', (previousHolder, currentHolder, rawEvent) => {
//         log(`Flag Captured from&nbsp;${previousHolder} by&nbsp;${currentHolder}`)
//         console.log(`Flag Captured from ${previousHolder} by ${currentHolder}`)
//     })
// }

window.app = {
  initContract,
  callIncrement,
  getLastCaller,
  callDecrement,
  getNumber,
  // log
};
