"use client";
import React from "react";
import { useBinanceSocket } from "../hooks/useBinanceSocket";

export default function RecentTrades() {
  const {trades} = useBinanceSocket();

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3 text-center"> Recent Trades</h2>

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
  );
}
