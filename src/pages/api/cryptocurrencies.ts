import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// BAD PRACTICE
// Since it's a free API and it's just for an exercise, I'll leave it here
const apiKey = "6ec6ced4-f700-4f0d-8495-4352fb02f295";
const baseUrl = "https://pro-api.coinmarketcap.com/v1";

type Cryptocurrency = {
  id: number;
  cmc_rank: number;
  symbol: string;
  quote: { [x: string]: { percent_change_24h: number; price: number } };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Next.js serverless functions caches responnses for 10 seconds by default
    res.setHeader("Cache-Control", "no-store");
    const currency = (req.query.currency as string | undefined) ?? "USD";
    const response = await axios.get(
      `${baseUrl}/cryptocurrency/listings/latest`,
      {
        headers: { "X-CMC_PRO_API_KEY": apiKey },
        params: { limit: 100, convert: currency },
      }
    );

    const data = response.data.data.map((crypto: Cryptocurrency) => ({
      // No math operations to be performed on id and rank
      id: crypto.id.toString(),
      rank: crypto.cmc_rank.toString(),
      symbol: crypto.symbol,
      price: crypto.quote[currency].price,
      percent_change_24h:
        crypto.quote[currency].percent_change_24h.toFixed(2) + "%",
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cryptocurrencies" });
  }
}
