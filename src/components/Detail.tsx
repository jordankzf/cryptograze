import useCryptoDetail from "@/hooks/useCryptoDetail";

interface CryptoDetailPopupProps {
  coin: number;
  onClose: () => void;
}

export default function Detail({
  coin,
  onClose,
}: CryptoDetailPopupProps): JSX.Element {
  const { cryptoDetail, loading } = useCryptoDetail(coin);

  if (!loading && cryptoDetail) {
    return (
      <div
        className="detail-popover"
        style={{
          backgroundColor: "rgba(180, 180, 180, 1)",
          color: "black",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>{cryptoDetail.name}</th>
              <th className="close-button-container">
                <button className="close-button" onClick={onClose}>
                  X
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{cryptoDetail.id}</td>
            </tr>
            <tr>
              <td>Rank</td>
              <td>{cryptoDetail.rank}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{cryptoDetail.price}</td>
            </tr>
            <tr>
              <td>24h Change</td>
              <td>{cryptoDetail.percent_change_24h}%</td>
            </tr>
            <tr>
              <td>24h Volume</td>
              <td>{cryptoDetail.volume_24h}</td>
            </tr>
            <tr>
              <td>Market Cap</td>
              <td>{cryptoDetail.market_cap}</td>
            </tr>
            <tr>
              <td>Total Supply</td>
              <td>{cryptoDetail.total_supply}</td>
            </tr>
            <tr>
              <td>Circulating Supply</td>
              <td>{cryptoDetail.circulating_supply}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}