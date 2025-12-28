"use client";
import { useBinanceSocket } from "../hooks/useBinanceSocket";

export default function OrderBook() {
  const { bids, asks } = useBinanceSocket();

  const sortedBids = Object.entries(bids).sort(
    (a, b) => parseFloat(b[0]) - parseFloat(a[0])
  ); 
  const sortedAsks = Object.entries(asks).sort(
    (a, b) => parseFloat(a[0]) - parseFloat(b[0])
  ); 

  const maxBidQty = Math.max(...sortedBids.map(([_, qty]) => qty), 1);
  const maxAskQty = Math.max(...sortedAsks.map(([_, qty]) => qty), 1);

  const highestBid = sortedBids.length > 0 ? parseFloat(sortedBids[0][0]) : 0;
  const lowestAsk = sortedAsks.length > 0 ? parseFloat(sortedAsks[0][0]) : 0;
  const spread = (lowestAsk - highestBid).toFixed(4);

  return (
    <div className="flex flex-col items-center space-y-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-green-500/20">
          <h2 className="text-lg font-semibold mb-3 text-green-400 text-center">
             Bids
          </h2>

          <div className="flex justify-between font-bold text-yellow-500 text-sm border-b border-gray-700 pb-1 mb-1">
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <ul className="space-y-1 max-h-96 overflow-y-auto text-sm">
            {sortedBids.slice(0, 20).map(([price, qty], index) => {
              const total = (parseFloat(price) * qty).toFixed(2);
              const percentage = (qty / maxBidQty) * 100;
              return (
                <li key={index} className="relative flex justify-between font-mono hover:bg-green-500/10 rounded px-2 py-1 transition-colors overflow-hidden">
                  <div
                    className="absolute inset-0 bg-green-600/40 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="relative z-10 text-green-400">
                    {parseFloat(price).toFixed(2)}
                  </span>
                  <span className="relative z-10">{qty.toFixed(4)}</span>
                  <span className="relative z-10 text-gray-300">{total}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-red-500/20">
          <h2 className="text-lg font-semibold mb-3 text-red-400 text-center">
             Asks
          </h2>

          <div className="flex justify-between font-bold text-yellow-500 text-sm border-b border-gray-700 pb-1 mb-1">
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <ul className="space-y-1 max-h-96 overflow-y-auto text-sm">
            {sortedAsks.slice(0, 20).map(([price, qty], index) => {
              const total = (parseFloat(price) * qty).toFixed(2);
              const percentage = (qty / maxAskQty) * 100;
              return (
                <li key={index} className="relative flex justify-between font-mono hover:bg-red-500/10 rounded px-2 py-1 transition-colors overflow-hidden">
                  <div
                    className="absolute inset-0 bg-red-600/40 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="relative z-10 text-red-400">
                    {parseFloat(price).toFixed(2)}
                  </span>
                  <span className="relative z-10">{qty.toFixed(4)}</span>
                  <span className="relative z-10 text-gray-300">{total}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="bg-gray-900/80 backdrop-blur-sm px-8 py-3 rounded-xl shadow-2xl text-center border border-yellow-500/40">
        <h2 className="text-sm font-semibold text-yellow-400 mb-1"> Spread</h2>
        <p className="text-2xl text-yellow-400 font-mono font-bold">{spread}</p>
      </div>
    </div>
  );
}
