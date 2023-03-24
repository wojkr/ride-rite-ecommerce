import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/itemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Conformation from "./scenes/checkout/Conformation";
import Navbar from "./scenes/global/Navbar";

const ScrollToTop = () => {
  //when go to new page starts at the top, not in the middle
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo = (0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Conformation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
