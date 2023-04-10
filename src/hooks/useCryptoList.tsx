import { useEffect, useState } from "react";
import axios from "axios";
import cryptoStore from "@/stores/cryptoStore";
import { autorun } from "mobx";
import { formatArray } from "@/helpers/formatNumbers";

export interface Cryptocurrency {
  id: string;
  rank: string;
  symbol: string;
  price: string;
  percent_change_24h: string;
}

export default function useCryptoList() {
  const [cryptoList, setCryptoList] = useState<Cryptocurrency[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (
    currency: string,
    updateBitcoinPrice: (price: number) => void
  ) => {
    setLoading(true);
    const result = await axios.get(
      `/api/cryptocurrencies?currency=${currency}`
    );
    updateBitcoinPrice(
      result.data.find((coin: Cryptocurrency) => coin.id === "1").price
    );
    setCryptoList(formatArray(result.data) as any);
    setLoading(false);
  };

  useEffect(() => {
    const disposer = autorun(() => {
      const { refreshKey, selectedCurrency, updateBitcoinPrice } = cryptoStore;
      if (selectedCurrency) {
        fetchData(selectedCurrency, updateBitcoinPrice);
      }
    });

    return () => {
      disposer();
    };
  }, []);

  return { cryptoList, loading };
}
