import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItems = ({ productData }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${productData._id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={productData.image[0]} alt='' />
      </div>
      <p className='pt-3 pb-1 text-sm'>{productData.name}</p>
      <p className='text-sm font-medium'>{currency} {productData.price}</p>
    </Link>
  )
}

export default ProductItems