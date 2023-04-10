import { useEffect, useState } from "react";
import axios from "axios";

export interface Cryptocurrency {
  id: number;
  rank: number;
  symbol: string;
  price: number;
  percent_change_24h: number;
}

export default function useCryptoList() {
  const [cryptoList, setCryptoList] = useState<Cryptocurrency[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await axios.get("/api/cryptocurrencies");
      setCryptoList(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { cryptoList, loading };
}
