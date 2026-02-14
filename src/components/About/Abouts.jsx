import React from 'react'
import Title from '../Title'
import { assets } from '../../assets/assets';
import NewsletterBox from '../Contact/NewsletterBox'

const Abouts = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] border rounded-sm' src={assets.about_img} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to our store – your trusted destination for high-quality fashion and lifestyle products.
            We are committed to bringing you carefully selected items that combine style, comfort, and affordability.
            Every product in our collection is chosen with attention to detail and customer satisfaction in mind.
          </p>

          <p>
            Our mission is to provide a seamless shopping experience with excellent customer service and fast delivery.
            We believe shopping should be enjoyable, convenient, and inspiring.
            Thank you for being part of our journey and supporting our growing community.
          </p>

          <b className='text-gray-800'>Our mission</b>
          <p>
            Our mission is to deliver high-quality products that combine style, comfort, and affordability.
            We strive to create a seamless and enjoyable shopping experience by offering carefully curated
            collections, secure payments, and fast, reliable delivery.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-3'>
        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-5 border rounded-lg'>
          <b className='text-xl text-pink-400'>Quanlity Assurance:</b>
          <p className='text-gray-600'>
            We are committed to maintaining the highest standards of quality in every product we offer.
            Each item undergoes careful inspection and selection to ensure durability, comfort, and overall excellence.
            Our goal is to provide products that meet your expectations and deliver long-lasting satisfaction.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-5 border rounded-lg'>
          <b className='text-xl text-pink-400'>Convenience:</b>
          <p className='text-gray-600'>
            We aim to make your shopping experience simple, fast, and stress-free.
            Our user-friendly website, secure checkout process, and multiple payment options
            are designed to save you time and provide maximum convenience.
            Enjoy smooth browsing, easy ordering, and reliable delivery right to your doorstep.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-5 border rounded-lg'>
          <b className='text-xl text-pink-400'>Exceptional Service:</b>
          <p className='text-gray-600'>
            Our dedicated support team is always ready to assist you with any questions or concerns.
            We believe in building strong relationships with our customers through responsive communication,
            helpful guidance, and prompt problem resolution.
            Your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Abouts