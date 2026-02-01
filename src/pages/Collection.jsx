import React from 'react'
import AllProductCollection from '../components/collection/allProductCollection'

const Collection = () => {

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <AllProductCollection />
    </div>
  )
}

export default Collection