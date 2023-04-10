import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import Detail from "./Detail";

export interface Cryptocurrency {
  id: number;
  rank: number;
  symbol: string;
  price: number;
  percent_change_24h: number;
}

export default function List() {
  const [data, setData] = useState<Cryptocurrency[]>([]);
  const [portal, setPortal] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/cryptocurrencies`);
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((coin) => (
                <tr key={coin.id} onClick={() => setPortal(coin.id)}>
                  <td>{coin.rank}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.price}</td>
                  <td>{coin.percent_change_24h}</td>
                </tr>
              ))
            : null}
        </tbody>
        {portal &&
          createPortal(
            <Draggable defaultPosition={{ x: 81, y: 300 }}>
              <div
                style={{
                  //   position: "relative",
                  position: "fixed",
                  bottom: 0,
                  top: 0,
                }}
              >
                <Detail
                  onClose={() => {
                    setPortal();
                  }}
                  coin={portal}
                />
              </div>
            </Draggable>,
            document.body
          )}
      </table>
    </div>
  );
}
