export interface TickerData {
  instrumentName: string;
  high: number;
  low: number;
  lastPrice: number;
  volume: number;
  volumeValue: number;
  priceChange: number;
  bestBid: number;
  bestAsk: number;
  openInterest: number;
  timestamp: number;
}
