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

  return (
    <div className="grid grid-cols-2 gap-4">
      {/*  Bids */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-green-400 text-center">
           Bids (Buy Orders)
        </h2>
        <h3 className="space-y-1 text-yellow-500  max-h-96 overflow-y-auto text-md">
            <li className="flex justify-between">
                <span>price</span>
                <span>Quantity</span>
            </li>
        </h3>
        <ul className="space-y-1 max-h-96 overflow-y-auto text-sm">
          {sortedBids.slice(0, 20).map(([price, qty], index) => (
            <li key={index} className="flex justify-between">
              <span>{price}</span>
              <span>{qty}</span>
            </li>
          ))}
        </ul>
      </div>

      {/*  Asks */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-red-400 text-center">
           Asks (Sell Orders)
        </h2>
        <h3 className="space-y-1 text-yellow-500  max-h-96 overflow-y-auto text-md">
            <li className="flex justify-between">
                <span>price</span>
                <span>Quantity</span>
            </li>
        </h3>
        <ul className="space-y-1 max-h-96 overflow-y-auto text-sm">
          {sortedAsks.slice(0, 20).map(([price, qty], index) => (
            <li key={index} className="flex justify-between">
              <span>{price}</span>
              <span>{qty}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
