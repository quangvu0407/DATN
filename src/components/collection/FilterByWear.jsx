import React from 'react'

const FilterByWear = ({ showFilter, toggleSubCategory }) => {
  return (
    <>
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Apple'} onChange={toggleSubCategory} />Apple
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Samsung'} onChange={toggleSubCategory} />Samsung
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Xiaomi'} onChange={toggleSubCategory} />Xiaomi
          </p>
        </div>
      </div>
    </>
  )
}

export default FilterByWear