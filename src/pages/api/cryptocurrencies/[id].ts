import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const apiKey = "6ec6ced4-f700-4f0d-8495-4352fb02f295";
const baseUrl = "https://pro-api.coinmarketcap.com/v1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader('Cache-Control', 'no-store');
    const { id } = req.query;
    const currency = (req.query.currency as string | undefined) ?? "USD";
    const response = await axios.get(`${baseUrl}/cryptocurrency/quotes/latest`, {
      headers: { "X-CMC_PRO_API_KEY": apiKey },
      params: { id, convert: currency },
    });
    
    const crypto = response.data.data[id as string];

    const data = {
      id: crypto.id.toString(),
      rank: crypto.cmc_rank.toString(),
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.quote[currency].price,
      volume_24h: crypto.quote[currency].volume_24h,
      market_cap: crypto.quote[currency].market_cap,
      // Free plan does not allow multiple currency conversion,
      // so you can't request for the price in BTC
      // price_btc: crypto.quote.BTC.price,
      percent_change_24h: crypto.quote[currency].percent_change_24h.toFixed(2),
      total_supply: crypto.total_supply,
      circulating_supply: crypto.circulating_supply,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cryptocurrency details" });
  }
}
