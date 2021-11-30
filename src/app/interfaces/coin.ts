interface CurrentPrice {
  usd: number;
}

interface MarketData {
  currentPrice: CurrentPrice;
}

interface Image {
  thumb: string;
  small: string;
  large: string;
}

interface Description {
  en: string;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: Image;
  marketData: MarketData;
  description?: Description;
}
