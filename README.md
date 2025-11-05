# Real-Time Order Book Visualizer

A high-performance cryptocurrency order book visualizer built with Next.js and TypeScript. This application connects to the Binance WebSocket API to stream live market data for BTC/USDT, displaying real-time bids, asks, recent trades, and spread calculations with an aesthetic, responsive UI.

## Getting Started

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/raksha39/orderbook-visualizer.git
cd orderbook-visualizer

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Features

- **Live WebSocket Connection** - Real-time streaming from Binance API
- **Dynamic Order Book** - Bid/ask display with automatic updates and depth visualization
- **Recent Trades Feed** - Last 50 trades with flash animations (green for buys, red for sells)
- **Spread Calculation** - Live spread between best bid and ask prices
- **Glass-morphism UI** - Modern design with animated gradient backgrounds

## Design Choices

### WebSocket Connection (Client-Side)

I implemented a direct browser-to-Binance WebSocket connection to keep the architecture simple and demonstrate real-time data handling. This approach can be blocked by corporate firewalls—in production, I'd add a server-side relay using Node.js with the `ws` library for better reliability and rate limit management.

### State Management with React Hooks

I used React's built-in `useState` and `useEffect` instead of external libraries like Zustand or Redux. For this project's scope, the state updates are straightforward: `bids` and `asks` stored as objects for O(1) lookups, and `trades` as an array. This keeps the code simple and readable while maintaining good performance.

### Snapshot + Delta Pattern

The Binance API sends incremental updates (deltas) rather than full snapshots. My implementation fetches an initial snapshot via REST, then applies WebSocket deltas sequentially while validating update IDs. This adds complexity but ensures data accuracy—without it, the order book would drift over time.

### Performance Trade-offs

I calculate cumulative totals and sorting on every render for simplicity. For production, I'd optimize with `useMemo` to cache calculations, `React.memo` to prevent unnecessary re-renders, and throttling to limit updates to ~2 per second during high-frequency trading.

### Styling with Tailwind CSS

Tailwind enables rapid prototyping with utility classes while maintaining a consistent design system. The animated gradient background adds visual interest to what could otherwise be a dry financial dashboard, balancing professionalism with aesthetics.

## Project Structure

```
app/
  ├── page.tsx              # Main page with layout
  ├── layout.tsx            # Root layout
  └── globals.css           # Animations & styles
components/
  ├── orderBook.tsx         # Order book display
  └── recentTrades.tsx      # Recent trades feed
hooks/
  └── useBinanceSocket.ts   # WebSocket hook with reconnection logic
```

## Troubleshooting

**Empty order book?** Check the browser console. If you see "WebSocket error", your network may block Binance connections. Try a different network or VPN.

**Trades not updating?** Look for "Binance WS connected" in the console to verify the connection.

**High CPU usage?** The app processes high-frequency updates. Consider closing other tabs or using a more powerful device.

## Resources

- [Binance WebSocket API](https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Built by Raksha** | [GitHub](https://github.com/raksha39/orderbook-visualizer)
