import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";

import { ALL_PRODUCTS } from "./pages/productData";

function App() {

  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prevItems, { ...product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const validQuantity = Math.max(1, Math.min(newQuantity, item.stock));
          return { ...item, quantity: validQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const processCheckout = () => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const purchasedItem = cartItems.find(item => item.id === product.id);
        if (purchasedItem) {

          return { ...product, stock: product.stock - purchasedItem.quantity };
        }
        return product;
      })
    );

    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-soft-linen-50 text-dark-spruce-900 font-montserrat">
      <BrowserRouter>
        <Navbar cartCount={totalCartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/catalog" element={<Catalog products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
            
            <Route path="/checkout" element={<Checkout cartItems={cartItems} processCheckout={processCheckout} />} />
            <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} cartItems={cartItems} />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;