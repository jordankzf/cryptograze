import { useEffect, useState } from "react";
import axios from "axios";
import { autorun } from "mobx";
import { Cryptocurrency } from "./useCryptoList";
import cryptoStore from "@/stores/cryptoStore";
import { formatNumbers, dynamicRounding } from "@/helpers/formatNumbers";
import BigNumber from "bignumber.js";

interface CryptocurrencyDetail extends Cryptocurrency {
  name: string;
  volume_24h: string;
  market_cap: string;
  total_supply: string;
  circulating_supply: string;
  btc_price: string;
}

export default function useCryptoDetail(coin?: string) {
  const [cryptoDetail, setCryptoDetail] = useState<CryptocurrencyDetail | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (currency: string, bitcoinPrice: number) => {
    setLoading(true);
    const result = await axios.get(
      `/api/cryptocurrencies/${coin}?currency=${currency}`
    );

    // CoinMarketCap's Free API currency limit has forced my hand
    const btc_price = dynamicRounding(
      BigNumber(result.data.price).dividedBy(BigNumber(bitcoinPrice))
    );

    setCryptoDetail({ ...(formatNumbers(result.data) as any), btc_price });

    setLoading(false);
  };

  useEffect(() => {
    const disposer = autorun(() => {
      const { refreshKey, selectedCurrency, bitcoinPrice } = cryptoStore;
      if (coin && selectedCurrency) {
        fetchData(selectedCurrency, bitcoinPrice);
      }
    });

    return () => {
      disposer();
    };
  }, [coin]);

  return { cryptoDetail, loading };
}
