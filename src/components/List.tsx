import useCryptoList from "@/hooks/useCryptoList";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import Detail from "./Detail";

type Popup = {
  coin: string;
  position: { x: number; y: number };
};

export default function List() {
  const [portal, setPortal] = useState<number>();
  const [popups, setPopups] = useState<Popup[]>([]);

  function addPopup(
    e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    coin: string
  ) {
    setPopups((prevPopups: any) => [
      ...prevPopups,
      {
        coin,
        position: { x: e.clientX, y: e.clientY },
      },
    ]);
  }

  const removePopup = (coin: string) => {
    setPopups((prevPopups) =>
      prevPopups.filter((popup: Popup) => popup.coin !== coin)
    );
  };

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
              <tr key={coin.id} onClick={(e) => addPopup(e, coin.id)}>
                <td>{coin.rank}</td>
                <td>{coin.symbol}</td>
                <td>{coin.price}</td>
                <td>{coin.percent_change_24h}</td>
              </tr>
            ))
          )}
        </tbody>
        {popups.map((p) =>
          createPortal(
            <Draggable defaultPosition={p.position}>
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
                    removePopup(p.coin);
                  }}
                  coin={p.coin}
                />
              </div>
            </Draggable>,
            document.body
          )
        )}
      </table>
    </div>
  );
}
