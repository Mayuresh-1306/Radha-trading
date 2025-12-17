import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Trading state
  const [portfolio, setPortfolio] = useState([]);
  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [funds, setFunds] = useState(50000); // Starting balance
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const savedPortfolio = localStorage.getItem("portfolio");
    const savedOrders = localStorage.getItem("orders");
    const savedHoldings = localStorage.getItem("holdings");
    const savedFunds = localStorage.getItem("funds");
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
        
        // Load saved trading data
        if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedHoldings) setHoldings(JSON.parse(savedHoldings));
        if (savedFunds) setFunds(JSON.parse(savedFunds));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        clearAuthData();
      }
    } else {
      // Initialize with sample data for new users
      initializeSampleData();
    }
    
    setIsInitialized(true);
  }, []);

  // Save trading data to localStorage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("holdings", JSON.stringify(holdings));
      localStorage.setItem("funds", JSON.stringify(funds));
    }
  }, [portfolio, orders, holdings, funds, isLoggedIn]);

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("portfolio");
    localStorage.removeItem("orders");
    localStorage.removeItem("holdings");
    localStorage.removeItem("funds");
    localStorage.removeItem("transactions");
    
    setIsLoggedIn(false);
    setUser(null);
    setPortfolio([]);
    setOrders([]);
    setHoldings([]);
    setTransactions([]);
    setFunds(50000);
  };

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
    initializeSampleData();
  };

  const logout = () => {
    clearAuthData();
    window.location.href = "/";
  };

  // Trading functions
  const placeOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'executed'
    };
    
    // Update orders
    setOrders(prev => [newOrder, ...prev]);
    
    // Update holdings based on order
    if (order.type === 'buy') {
      // Deduct funds
      const totalCost = order.quantity * order.price;
      setFunds(prev => prev - totalCost);
      
      // Update holdings
      const existingHolding = holdings.find(h => h.symbol === order.symbol);
      if (existingHolding) {
        setHoldings(prev => prev.map(h => 
          h.symbol === order.symbol 
            ? { 
                ...h, 
                quantity: h.quantity + order.quantity,
                avgPrice: ((h.avgPrice * h.quantity) + (order.price * order.quantity)) / (h.quantity + order.quantity),
                investment: h.investment + totalCost,
                currentPrice: order.price,
                currentValue: (h.quantity + order.quantity) * order.price
              }
            : h
        ));
      } else {
        setHoldings(prev => [...prev, {
          symbol: order.symbol,
          name: order.name,
          quantity: order.quantity,
          avgPrice: order.price,
          currentPrice: order.price,
          investment: totalCost,
          currentValue: totalCost,
          pnl: 0,
          pnlPercentage: 0
        }]);
      }
    } else if (order.type === 'sell') {
      // Add funds
      const totalValue = order.quantity * order.price;
      setFunds(prev => prev + totalValue);
      
      // Update holdings
      const existingHolding = holdings.find(h => h.symbol === order.symbol);
      if (existingHolding) {
        const newQuantity = existingHolding.quantity - order.quantity;
        if (newQuantity <= 0) {
          // Remove holding if quantity is 0
          setHoldings(prev => prev.filter(h => h.symbol !== order.symbol));
        } else {
          setHoldings(prev => prev.map(h => 
            h.symbol === order.symbol 
              ? { 
                  ...h, 
                  quantity: newQuantity,
                  investment: h.avgPrice * newQuantity,
                  currentValue: newQuantity * h.currentPrice
                }
              : h
          ));
        }
      }
    }
    
    // Add to transactions
    const transaction = {
      id: Date.now(),
      type: order.type,
      symbol: order.symbol,
      name: order.name,
      quantity: order.quantity,
      price: order.price,
      total: order.quantity * order.price,
      timestamp: new Date().toISOString()
    };
    
    setTransactions(prev => [transaction, ...prev]);
    setLastUpdate(new Date());
    
    return newOrder;
  };

  const getPortfolioStats = () => {
    const totalInvestment = holdings.reduce((sum, h) => sum + h.investment, 0);
    const totalCurrentValue = holdings.reduce((sum, h) => sum + (h.currentPrice * h.quantity), 0);
    const totalPnl = totalCurrentValue - totalInvestment;
    const pnlPercentage = totalInvestment > 0 ? (totalPnl / totalInvestment) * 100 : 0;
    
    return {
      totalInvestment,
      totalCurrentValue,
      totalPnl,
      pnlPercentage,
      availableFunds: funds
    };
  };

  const updateStockPrices = () => {
    // Simulate stock price changes
    setHoldings(prev => prev.map(holding => {
      const randomChange = (Math.random() - 0.5) * 10; // -5 to +5 change
      const newPrice = Math.max(1, holding.currentPrice + randomChange);
      const currentValue = newPrice * holding.quantity;
      const pnl = currentValue - holding.investment;
      const pnlPercentage = holding.investment > 0 ? (pnl / holding.investment) * 100 : 0;
      
      return {
        ...holding,
        currentPrice: parseFloat(newPrice.toFixed(2)),
        currentValue: parseFloat(currentValue.toFixed(2)),
        pnl: parseFloat(pnl.toFixed(2)),
        pnlPercentage: parseFloat(pnlPercentage.toFixed(2))
      };
    }));
    setLastUpdate(new Date());
  };

  // Initialize with sample data
  const initializeSampleData = () => {
    const sampleHoldings = [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        quantity: 10,
        avgPrice: 2450.50,
        currentPrice: 2510.75,
        investment: 24505.00,
        currentValue: 25107.50,
        pnl: 602.50,
        pnlPercentage: 2.46
      },
      {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        quantity: 15,
        avgPrice: 3250.25,
        currentPrice: 3320.50,
        investment: 48753.75,
        currentValue: 49807.50,
        pnl: 1053.75,
        pnlPercentage: 2.16
      },
      {
        symbol: 'INFY',
        name: 'Infosys',
        quantity: 25,
        avgPrice: 1420.75,
        currentPrice: 1455.25,
        investment: 35518.75,
        currentValue: 36381.25,
        pnl: 862.50,
        pnlPercentage: 2.43
      }
    ];
    
    const sampleOrders = [
      {
        id: 1,
        type: 'buy',
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        quantity: 10,
        price: 2450.50,
        total: 24505.00,
        timestamp: '2024-01-15T10:30:00Z',
        status: 'executed'
      },
      {
        id: 2,
        type: 'buy',
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        quantity: 15,
        price: 3250.25,
        total: 48753.75,
        timestamp: '2024-01-16T11:15:00Z',
        status: 'executed'
      },
      {
        id: 3,
        type: 'buy',
        symbol: 'INFY',
        name: 'Infosys',
        quantity: 25,
        price: 1420.75,
        total: 35518.75,
        timestamp: '2024-01-17T09:45:00Z',
        status: 'executed'
      }
    ];
    
    setHoldings(sampleHoldings);
    setOrders(sampleOrders);
    setFunds(50000 - (24505.00 + 48753.75 + 35518.75));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isInitialized,
        portfolio,
        orders,
        holdings,
        transactions,
        funds,
        lastUpdate,
        login,
        logout,
        setIsLoggedIn,
        setUser,
        placeOrder,
        getPortfolioStats,
        updateStockPrices,
        initializeSampleData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};