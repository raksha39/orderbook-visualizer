"use client";
import OrderBook from "@/components/orderBook";
import { useBinanceSocket } from "../hooks/useBinanceSocket";

export default function HomePage() {
  const { trades } = useBinanceSocket();

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
         Binance BTC/USDT Live Data
      </h1>

      {/*  Order Book Section */}
      <OrderBook />

      {/*  Recent Trades Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-md mx-auto mt-8">
        <h2 className="text-lg font-semibold mb-3 text-center">
           Recent BTC/USDT Trades
        </h2>
        <ul className="space-y-1 max-h-96 overflow-y-auto">
          {trades.map((trade, index) => (
            <li
              key={index}
              className={`flex justify-between items-center text-sm p-1 rounded ${
                trade.isBuyerMaker ? "text-red-400" : "text-green-400"
              }`}
            >
              <span>{trade.price}</span>
              <span>{trade.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
