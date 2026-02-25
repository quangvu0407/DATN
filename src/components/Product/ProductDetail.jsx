import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { assets } from '../../assets/assets';
import RelatedProduct from './RelatedProduct';

const ProductDetail = ({ productId }) => {
  const { products, currency, addToCard } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

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
          <p className='font-medium text-3xl mt-5 text-gray-400 text-green-700'>Price: {currency}  {productData.price}</p>
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
          <button onClick={() => addToCard(productData._id, size)} className='border border-black-200 rounded-lg bg-orange-200 text-black px-8 py-3 text-sm active:bg-blue-500'>ADD TO CART</button>
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
        {/* Tab Buttons */}
        <div className='flex gap-2 items-center'>
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-sm font-medium transition-all duration-300 border rounded-t-lg cursor-pointer ${activeTab === 'description'
              ? 'border-orange-600 bg-white text-orange-600 z-10'
              : 'border-black text-gray-500'
              }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-medium transition-all duration-300 border rounded-t-lg -ml-px cursor-pointer ${activeTab === 'reviews'
              ? 'border-orange-600 bg-white text-orange-600 z-10'
              : 'border border-black text-gray-500'
              }`}
          >
            Reviews (0)
          </button>
        </div>

        {/* Tab Content Area */}
        <div className='border border-gray-200 px-8 py-8 text-sm text-gray-600 rounded-b-xl rounded-tr-xl bg-white shadow-sm -mt-[1px] mt-4'>

          {/* Nội dung Description */}
          {activeTab === 'description' && (
            <div className='flex flex-col gap-5 leading-relaxed animate-fadeIn'>
              <p>
                This device is equipped with a high-capacity battery that delivers stable and long-lasting performance throughout the day.
                With fast-charging support, you can quickly recharge and get back to using your phone without long interruptions.
                The optimized power management system helps conserve energy, ensuring efficient usage even during extended screen time.
              </p>

              <p>
                Designed for modern lifestyles, the phone also supports high-quality audio accessories such as wireless and wired earphones.
                It provides clear sound output, stable connectivity, and low latency for music, calls, and gaming.
                Whether you're charging your device or enjoying your favorite audio through headphones, this product offers convenience, reliability, and smooth everyday performance.
              </p>
            </div>
          )}

          {/* Nội dung Reviews (Mặc định chưa có comment) */}
          {activeTab === 'reviews' && (
            <div className='flex flex-col items-center justify-center py-10 gap-2 animate-fadeIn'>
              <div className='text-gray-300 text-5xl mb-2'>💬</div>
              <p className='text-gray-400 italic text-base'>There are no reviews yet for this product.</p>
              <button className='mt-4 text-orange-600 hover:underline font-medium'>
                Be the first to write a review!
              </button>
            </div>
          )}
        </div>
        {/* Sản phẩm tương tự */}
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) :
    <div className='opacity-0'></div>
}

export default ProductDetail