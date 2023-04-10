import useCryptoList from "@/hooks/useCryptoList";
import { MouseEvent, useState } from "react";
import { createPortal } from "react-dom";
import Popup from "./Popup";

type PopupT = {
  id: string;
  component: JSX.Element;
};

export default function List() {
  const [popups, setPopups] = useState<PopupT[]>([]);

  function addPopup(
    e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    coin: string
  ) {
    setPopups((prevPopups: any) => [
      ...prevPopups,
      {
        id: coin,
        component: (
          <Popup
            key={coin}
            coin={coin}
            position={{ x: e.clientX, y: e.clientY }}
            onClose={(coin) => {
              removePopup(coin);
            }}
          />
        ),
      },
    ]);
  }

  const removePopup = (coin: string) => {
    setPopups((prevPopups) =>
      prevPopups.filter((popup: PopupT) => popup.id !== coin)
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
        {popups.map((p) => createPortal(p.component, document.body))}
      </table>
    </div>
  );
}
