import useCryptoDetail from "@/hooks/useCryptoDetail";

interface cryptoDetailPopupProps {
  coin: string;
  onClose: (coin: string) => void;
}

export default function Detail({
  coin,
  onClose,
}: cryptoDetailPopupProps): JSX.Element {
  const { cryptoDetail, loading } = useCryptoDetail(coin);

  return (
    <div className={`detail-popover ${loading ? "skeleton" : ""}`}>
      <table>
        <thead className="popover-window-handle">
          <tr>
            <th>{cryptoDetail && cryptoDetail.name}</th>
            <th className="close-button-container">
              <button className="close-button" onClick={() => onClose(coin)}>
                X
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rank</td>
            <td>{cryptoDetail && cryptoDetail.rank}</td>
          </tr>
          <tr>
            <td>Symbol</td>
            <td>{cryptoDetail && cryptoDetail.symbol}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{cryptoDetail && cryptoDetail.price}</td>
          </tr>
          <tr>
            <td>24h Volume</td>
            <td>{cryptoDetail && cryptoDetail.volume_24h}</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{cryptoDetail && cryptoDetail.market_cap}</td>
          </tr>
          {cryptoDetail && cryptoDetail.id !== "1" && (
            <tr>
              <td>₿</td>
              <td>{cryptoDetail.btc_price}</td>
            </tr>
          )}
          <tr>
            <td>24h Change</td>
            <td>{cryptoDetail && cryptoDetail.percent_change_24h}%</td>
          </tr>
          <tr>
            <td>Total Supply</td>
            <td>{cryptoDetail && cryptoDetail.total_supply}</td>
          </tr>
          <tr>
            <td>Circulating Supply</td>
            <td>{cryptoDetail && cryptoDetail.circulating_supply}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
