import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../customize/axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCard = async (itemId, size) => {

    if (size === '') {
      toast.error("Please Choose size of product!");
      return;
    }

    let cardData = structuredClone(cartItems);
    if (cardData[itemId]) {
      if (cardData[itemId][size]) {
        cardData[itemId][size] += 1;
      }
      else {
        cardData[itemId][size] = 1;
      }
    }
    else {
      cardData[itemId] = {};
      cardData[itemId][size] = 1;
    }

    setCartItems(cardData);

    if (token) {
      try {
        await axiosInstance.post('/api/cart/add', { itemId, size })
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  const getUserCart = async () => {
    try {
      const response = await axiosInstance.get("/api/cart/get",
        {}
      );
      if (response.success) {
        setCartItems(response.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount
  }
  console.log(cartItems);

  const getProductsData = async () => {
    try {
      const data = await axiosInstance.get("/api/product/list");
      // console.log(response.data);

      if (data.success) {
        setProducts(data.products);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];

      // nếu product không còn size nào
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axiosInstance.post(
          "/api/cart/update",
          { itemId, size, quantity },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  const getCartAmount = () => {
    return Object.keys(cartItems).reduce((total, productId) => {

      const product = products.find(
        (p) => p._id.toString() === productId.toString()
      );

      if (!product) return total;

      return total + Object.keys(cartItems[productId]).reduce(
        (subTotal, size) =>
          subTotal + product.price * cartItems[productId][size],
        0
      );

    }, 0);
  };

  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCard, getCartCount, updateQuantity,
    getCartAmount, navigate, setToken, token, getUserCart, setCartItems
  }


  return (
    <ShopContext.Provider value={value}>
      {
        props.children
      }
    </ShopContext.Provider>
  )
}

export default ShopContextProvider