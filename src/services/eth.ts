import { BrowserProvider, formatEther } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }
  return new BrowserProvider(window.ethereum);
};

export const connectWallet = async () => {
  const provider = getProvider();
  const accounts: string[] = await provider.send("eth_requestAccounts", []);
  const address = accounts[0];
  localStorage.setItem("walletAddress", address);
  return { address, provider };
};

export const getNativeBalance = async (address: string) => {
  const provider = getProvider();
  const bal = await provider.getBalance(address);
  return `${formatEther(bal)}`;
};
