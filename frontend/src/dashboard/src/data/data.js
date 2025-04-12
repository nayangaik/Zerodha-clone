// backend/dashboard/src/data/data.js

// !!! Paste the user ID you copied here !!!
const defaultUserId = '67f95d9a70585b6892af08b6';

// Watchlist data doesn't need userId based on current setup, keep as is
const watchlist = [
  {
    name: "INFY",
    price: 1555.45,
    percent: "-1.60%",
    isDown: true,
  },
  {
    name: "ONGC",
    price: 116.8,
    percent: "-0.09%",
    isDown: true,
  },
  {
    name: "TCS",
    price: 3194.8,
    percent: "-0.25%",
    isDown: true,
  },
  {
    name: "KPITTECH",
    price: 266.45,
    percent: "3.54%",
    isDown: false,
  },
  {
    name: "QUICKHEAL",
    price: 308.55,
    percent: "-0.15%",
    isDown: true,
  },
  {
    name: "WIPRO",
    price: 577.75,
    percent: "0.32%",
    isDown: false,
  },
  {
    name: "M&M",
    price: 779.8,
    percent: "-0.01%",
    isDown: true,
  },
  {
    name: "RELIANCE",
    price: 2112.4,
    percent: "1.44%",
    isDown: false,
  },
  {
    name: "HUL",
    price: 512.4,
    percent: "1.04%",
    isDown: false,
  },
];

// holdings - Updated with userId and matching schema fields
const holdings = [
  {
    userId: defaultUserId, // Added userId
    name: "BHARTIARTL",
    qty: 2,
    avgPrice: 538.05, // Renamed from 'avg'
    ltp: 541.15,      // Renamed from 'price'
    // Removed 'net', 'day' as they are not in the schema
  },
  {
    userId: defaultUserId,
    name: "HDFCBANK",
    qty: 2,
    avgPrice: 1383.4,
    ltp: 1522.35,
  },
  {
    userId: defaultUserId,
    name: "HINDUNILVR",
    qty: 1,
    avgPrice: 2335.85,
    ltp: 2417.4,
  },
  {
    userId: defaultUserId,
    name: "INFY",
    qty: 1,
    avgPrice: 1350.5,
    ltp: 1555.45,
    // Removed 'isLoss'
  },
  {
    userId: defaultUserId,
    name: "ITC",
    qty: 5,
    avgPrice: 202.0,
    ltp: 207.9,
  },
  {
    userId: defaultUserId,
    name: "KPITTECH",
    qty: 5,
    avgPrice: 250.3,
    ltp: 266.45,
  },
  {
    userId: defaultUserId,
    name: "M&M",
    qty: 2,
    avgPrice: 809.9,
    ltp: 779.8,
    // Removed 'isLoss'
  },
  {
    userId: defaultUserId,
    name: "RELIANCE",
    qty: 1,
    avgPrice: 2193.7,
    ltp: 2112.4,
  },
  {
    userId: defaultUserId,
    name: "SBIN",
    qty: 4,
    avgPrice: 324.35,
    ltp: 430.2,
    // Removed 'isLoss'
  },
  {
    userId: defaultUserId,
    name: "SGBMAY29",
    qty: 2,
    avgPrice: 4727.0,
    ltp: 4719.0,
  },
  {
    userId: defaultUserId,
    name: "TATAPOWER",
    qty: 5,
    avgPrice: 104.2,
    ltp: 124.15,
    // Removed 'isLoss'
  },
  {
    userId: defaultUserId,
    name: "TCS",
    qty: 1,
    avgPrice: 3041.7,
    ltp: 3194.8,
    // Removed 'isLoss'
  },
  {
    userId: defaultUserId,
    name: "WIPRO",
    qty: 4,
    avgPrice: 489.3,
    ltp: 577.75,
  },
];

// positions - Updated with userId and matching schema fields
const positions = [
  {
    userId: defaultUserId, // Added userId
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avgPrice: 316.27, // Renamed from 'avg'
    ltp: 312.35,      // Renamed from 'price'
    // Removed 'net', 'day', 'isLoss'
  },
  {
    userId: defaultUserId,
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avgPrice: 3124.75,
    ltp: 3082.65,
    // Removed 'net', 'day', 'isLoss'
  },
];

module.exports = { watchlist, holdings, positions };
