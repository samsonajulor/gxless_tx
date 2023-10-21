import { useState } from 'react';
import { ethers } from 'ethers';
import { IHybridPaymaster, SponsorUserOperationDto, PaymasterMode } from '@biconomy/paymaster';
import { BiconomySmartAccount } from '@biconomy/account';
import contractArtifact from '../../../out/Counter.sol/Counter.json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let theContract: ethers.Contract;
const contractAddress = '0x3674651af1b1c3615621d0279cca7f510dfeaf51';
const contractAbi = contractArtifact.abi;


interface Props {
  smartAccount: BiconomySmartAccount;
  address: string;
  provider: ethers.providers.Provider;
}


const Incrementer: React.FC<Props> = ({ smartAccount, address, provider }) => {
 const [incremented, setIncremented] = useState<boolean>(false)
  const handleIncrement = async (signer:any) => {
    theContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider, // change this to provider.getSigner() if you want to send transactions
    )
    try {
      toast.info('Minting your NFT...', {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      const countTx = await theContract.populateTransaction.increment();
      console.log(countTx.data);
      const tx1 = {
        to: contractAddress,
        data: countTx.data,
      };
      let userOp = await smartAccount.buildUserOp([tx1]);
      console.log({ userOp })
      const biconomyPaymaster =
        smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: 'BICONOMY',
          version: '2.0.0'
        },
      };
      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          userOp,
          paymasterServiceData
        );
        
      userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      console.log("userOpHash", userOpResponse);
      const { receipt } = await userOpResponse.wait(1);
      setIncremented(true)
      toast.success(`Success! Here is your transaction:${receipt.transactionHash} `, {
        position: "top-right",
        autoClose: 18000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log("txHash", receipt.transactionHash);
    } catch (err: any) {
      console.error(err);
      console.log(err)
    }
  }

  return (
    <>
      {incremented && (
        <a href={`https://testnets.opensea.io/${address}`}> Click to increment counter for smart account</a>
      )}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}


export default Incrementer;