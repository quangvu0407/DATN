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
            Welcome to our store – your trusted destination for smartphones and high-quality tech accessories.
            We specialize in providing genuine mobile phones, chargers, power banks, earphones,
            and other essential electronic accessories at competitive prices.
          </p>

          <p>
            Every product we offer is carefully selected to ensure performance, durability,
            and compatibility. Whether you are looking for the latest smartphone,
            a fast-charging adapter, or premium wireless earphones,
            we are here to meet your needs.
          </p>

          <b className='text-gray-800'>Our mission</b>
          <p>
            Our mission is to deliver reliable technology products that enhance your daily life.
            We are committed to providing authentic devices, safe and secure payments,
            fast delivery, and professional customer support.
            Your satisfaction and trust are our top priorities.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-3'>
        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-5 rounded-lg'>
          <b className='text-xl text-pink-400'>Genuine Products:</b>
          <p className='text-gray-600'>
            We provide authentic smartphones and accessories from trusted brands.
            All products are quality-checked to ensure safety, durability,
            and optimal performance for your devices.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-5 rounded-lg'>
          <b className='text-xl text-pink-400'>Fast- Safe Charging Solutions:</b>
          <p className='text-gray-600'>
            From fast chargers to high-capacity power banks,
            we offer reliable charging solutions designed to protect your battery
            and keep your devices powered throughout the day.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-5 rounded-lg'>
          <b className='text-xl text-pink-400'>Professional Support:</b>
          <p className='text-gray-600'>
            Our support team is always ready to assist you with product consultation,
            technical questions, and after-sales service.
            We aim to provide a smooth and satisfying shopping experience.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Abouts