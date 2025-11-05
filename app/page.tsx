"use client";
import OrderBook from "@/components/orderBook";
import { useBinanceSocket } from "../hooks/useBinanceSocket";

export default function HomePage() {
  const { trades } = useBinanceSocket();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
           Binance BTC/USDT Live Data
        </h1>

        {/*  Order Book Section */}
        <OrderBook />

        {/*  Recent Trades Section */}
        <div className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-gray-700 max-w-md mx-auto mt-8">
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
    </div>
  );
}
