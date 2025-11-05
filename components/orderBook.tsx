"use client";
import { useBinanceSocket } from "../hooks/useBinanceSocket";

export default function OrderBook() {
  const { bids, asks } = useBinanceSocket();

  const sortedBids = Object.entries(bids).sort(
    (a, b) => parseFloat(b[0]) - parseFloat(a[0])
  ); // High → Low
  const sortedAsks = Object.entries(asks).sort(
    (a, b) => parseFloat(a[0]) - parseFloat(b[0])
  ); // Low → High

  //spread
  const highestBid = sortedBids.length > 0 ? parseFloat(sortedBids[0][0]) : 0;
  const lowestAsk = sortedAsks.length > 0 ? parseFloat(sortedAsks[0][0]) : 0;
  const spread = (lowestAsk - highestBid).toFixed(2);

  return (
    <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
      {/*  Bids */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-green-400 text-center">
           Bids
        </h2>
        <h3 className="space-y-1 text-yellow-500 text-sm">
            <li className="flex justify-between">
                <span>Price</span>
                <span>Qty</span>
            </li>
        </h3>
        <ul className="space-y-1 max-h-96 overflow-y-auto text-sm">
          {sortedBids.slice(0, 20).map(([price, qty], index) => (
            <li key={index} className="flex justify-between">
              <span>{price}</span>
              <span>{qty.toFixed(4)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Spread */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-3 text-yellow-400 text-center">Spread</h2>
        <p className="text-1xl text-yellow-400 font-mono ">{spread}</p>
      </div>

      {/*  Asks */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-red-400 text-center">
           Asks
        </h2>
        <h3 className="space-y-1 text-yellow-500 text-sm">
            <li className="flex justify-between">
                <span>Price</span>
                <span>Qty</span>
            </li>
        </h3>
        <ul className="space-y-1 max-h-96 overflow-y-auto text-sm">
          {sortedAsks.slice(0, 20).map(([price, qty], index) => (
            <li key={index} className="flex justify-between">
              <span>{price}</span>
              <span>{qty.toFixed(4)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
