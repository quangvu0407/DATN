import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';
import Title from '../Title';
import AllProducts from './AllProducts';

const LastestCollection = () => {

  const { products } = useContext(ShopContext);

  const [lastProducts, setLastProducts] = useState([]);

  useEffect(() => {
    setLastProducts(products.slice(0, 10));
  }, [products])
  console.log(products);
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the.
        </p>
      </div>

      {/* gọi sản phẩm */}
      <AllProducts lastProducts={lastProducts} />
    </div>
  )
}

export default LastestCollection