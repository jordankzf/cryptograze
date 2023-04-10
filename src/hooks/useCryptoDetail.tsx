import { useEffect, useState } from "react";
import axios from "axios";
import { Cryptocurrency } from "./useCryptoList";

interface CryptocurrencyDetail extends Cryptocurrency {
  name: string;
  volume_24h: string;
  market_cap: string;
  total_supply: string;
  circulating_supply: string;
}

export default function useCryptoDetail(coin: number | null) {
  const [cryptoDetail, setCryptoDetail] = useState<CryptocurrencyDetail | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (coin) {
      setLoading(true);
      const fetchData = async () => {
        const result = await axios.get(`/api/cryptocurrencies/${coin}`);
        setCryptoDetail(result.data);
        setLoading(false);
      };
      fetchData();
    }
  }, [coin]);

  return { cryptoDetail, loading };
}
