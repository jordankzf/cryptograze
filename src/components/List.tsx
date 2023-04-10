import useCryptoList from "@/hooks/useCryptoList";
import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import Detail from "./Detail";

export default function List() {
  const [portal, setPortal] = useState<number>();
  const [portals, setPortals] = useState();

  function addPortal(e, coin) {
    setPortals([portals, { coin, position: { x: e.clientX, y: clientY } }]);
  }

  const { cryptoList, loading } = useCryptoList();

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
          {loading || !cryptoList ? (
            <>
              {[...Array(20)].map((_, i) => (
                <tr key={i} className="table-row-skeleton">
                  {/* Dummy data */}
                  <td>1</td>
                  <td>USDT</td>
                  <td>12345.67</td>
                  <td>1.00%</td>
                </tr>
              ))}
            </>
          ) : (
            cryptoList.map((coin) => (
              <tr key={coin.id} onClick={() => setPortal(coin.id)}>
                <td>{coin.rank}</td>
                <td>{coin.symbol}</td>
                <td>{coin.price}</td>
                <td>{coin.percent_change_24h}</td>
              </tr>
            ))
          )}
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
