import { Contract } from "ethers";
import { getProvider } from "./eth";

// ⚠️ Укажи адрес своего токена (ERC-20)
const PRIDE_TOKEN_ADDRESS = "0x7Cb97A776A49E272BaccAd31396405a94f3Fb3f8";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export const getPrideContract = async () => {
  const provider = getProvider();
  return new Contract(PRIDE_TOKEN_ADDRESS, ERC20_ABI, provider);
};

export const getPrideBalance = async (address: string) => {
  if (!PRIDE_TOKEN_ADDRESS || PRIDE_TOKEN_ADDRESS === "0x7Cb97A776A49E272BaccAd31396405a94f3Fb3f8") {
    // адрес ещё не указан — мягко сообщаем вызывающему коду
    return null as any;
  }
  const contract = await getPrideContract();
  const [raw, decimals, symbol] = await Promise.all([
    contract.balanceOf(address),
    contract.decimals(),
    contract.symbol()
  ]);
  const balance = (Number(raw) / 10 ** Number(decimals)).toFixed(4);
  return { balance, symbol, decimals };
};
