import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../customize/axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, setCartItems } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  console.log(searchParams);

  const verifyPayment = async () => {
    try {
      // proceed even if context `token` isn't set yet; axiosInstance reads token from localStorage
      const response = await axiosInstance.post(
        "/api/order/verifyStripe",
        { success, orderId }
      );

      if (response.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      {/* Verify */}
      kk
    </div>
  )
};

export default Verify;