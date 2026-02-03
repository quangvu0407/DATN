import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { assets } from '../../assets/assets';
import RelatedProduct from './RelatedProduct';

const ProductDetail = ({ productId }) => {
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return;
      }
    })
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    fetchProductData();
  }, [productId])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} alt='' key={index} className={`border border-gray-300 w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${item === image ? 'border border-red-500' : ''}`} />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto border ' src={image} alt='' />
          </div>
        </div>

        {/* chi tiết sản phẩm  */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center mt-2 gap-1'>
            <p className='font-medium text-[oklch(63.7%_0.237_25.331)]'>Rate: </p>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='font-medium text-3xl mt-5 text-gray-400'>Price: {currency}  {productData.price}</p>
          <p className='text-xl mt-5 text-gray-500 md:w-4/5'>
            <span className='text-gray-700'>Description: </span>
            {productData.description}
          </p>

          <div className='flex flex-col gap-4 my-8'>
            <p className='font-medium text-xl'>Select Size:</p>
            <div className='flex gap-4'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border border-gray-200 px-4 py-2 ${item === size ? 'border-orange-500 text-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button className='border border-black-200 rounded-lg bg-orange-200 text-black px-8 py-3 text-sm active:bg-blue-500'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>

        </div>

      </div>
      {/* Mô tả chi tiết và bình luận */}
      <div className='mt-20'>
        <div className='flex gap-2 items-center'>
          <b className='border border-orange-600 rounded px-5 py-2 text-sm'>Description</b>
          <hr className='w-2' />
          <b className='border border-gray-600 px-5 rounded py-2 text-sm'>Reviews (122)</b>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 mt-3 border rounded-xl'>
          <p>
            This clothing item is made from carefully selected, high-quality fabric that feels soft on the skin while remaining breathable and comfortable throughout the day.
            The material allows for good air circulation, helping you stay cool and relaxed even during long hours of wear.
            Its modern cut and well-balanced proportions create a clean, stylish look that easily fits into any everyday wardrobe.
          </p>
          <p>
            Designed with attention to detail, the garment features precise stitching and a durable structure that helps it maintain its shape over time.
            The fabric resists fading and shrinking after multiple washes, ensuring long-lasting use and consistent quality.
            Whether paired with casual jeans or styled for a more polished outfit, this piece offers versatility, comfort, and timeless appeal for daily wear.
          </p>
        </div>
        {/* Sản phẩm tương tự */}
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) :
    <div className='opacity-0'></div>
}

export default ProductDetail