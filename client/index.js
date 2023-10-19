const ethers = require('ethers')

const contractArtifact = require('../out/Counter.sol/Counter.json')
const contractAbi = contractArtifact.abi

let theContract
let provider

async function initContract() {

    if (!window.ethereum) {
        throw new Error('provider not found')
    }
    window.ethereum.on('accountsChanged', () => {
        console.log('acct');
        window.location.reload()
    })
    window.ethereum.on('chainChanged', () => {
        console.log('chainChained');
        window.location.reload()
    })
    // const networkId = await window.ethereum.request({method: 'net_version'})

    provider = new ethers.providers.Web3Provider(window.ethereum)

    const network = await provider.getNetwork()
    // const artifactNetwork = contractArtifact.networks[networkId]
    // if (!artifactNetwork)
    //     throw new Error('Can\'t find deployment on network ' + networkId)
    // const contractAddress = artifactNetwork.address
    const contractAddress = "0xf69d6cf837080dccb2878174e61e569247504564";
    theContract = new ethers.Contract(
        contractAddress, contractAbi, provider.getSigner())

    console.log('theContract:', theContract);

    // await listenToEvents()
    return {contractAddress, network}
}

async function callIncrement() {
    await window.ethereum.send('eth_requestAccounts')

    console.log('theContract2:', theContract);

    const txOptions = {gasPrice: await provider.getGasPrice()}
    const transaction = await theContract.increment(txOptions)
    const hash = transaction.hash
    console.log(`Transaction ${hash} sent`)
    const receipt = await transaction.wait()
    console.log(`Mined in block: ${receipt.blockNumber}`)
}

async function getLastCaller() {
    await window.ethereum.send('eth_requestAccounts')

    const txOptions = {gasPrice: await provider.getGasPrice()}
    const transaction = await theContract.getLastCaller(txOptions)
    console.log(`this is the last caller: ${transaction}`)
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
    getLastCaller
    // log
}

