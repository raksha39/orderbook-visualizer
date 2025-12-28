import { useState, useEffect } from "react";

type Trade = { price: string; quantity: string; isBuyerMaker: boolean };
type Order = Record<string, number>; // price -> amount

export function useBinanceSocket() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [bids, setBids] = useState<Order>({});
  const [asks, setAsks] = useState<Order>({});

  useEffect(() => {
    const aggTrade = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
    const orderBook = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");


    aggTrade.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const trade: Trade = {
        price: data.p,
        quantity: data.q,
        isBuyerMaker: data.m,
      };
      setTrades((prev) => [trade, ...prev].slice(0, 50));
    };

    orderBook.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBids((prev) => {
        const updated = { ...prev };
        for (const [price, qty] of data.b) {
          if (parseFloat(qty) === 0) delete updated[price];
          else updated[price] = parseFloat(qty);
        }
        return updated;
      });
      setAsks((prev) => {
        const updated = { ...prev };
        for (const [price, qty] of data.a) {
          if (parseFloat(qty) === 0) delete updated[price];
          else updated[price] = parseFloat(qty);
        }
        return updated;
      });
    };

    return () => {
      aggTrade.close();
      orderBook.close();
    };
  }, []);

  return { trades, bids, asks };
}
