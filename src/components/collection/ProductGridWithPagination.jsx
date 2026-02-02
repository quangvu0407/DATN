import React, { useEffect, useState } from 'react'
import ProductItems from '../Product/ProductItems'

const ProductGridWithPagination = ({ products, productsPerPage = 8 }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(products.length / productsPerPage)

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage

  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  // Reset về trang 1 khi danh sách product thay đổi
  useEffect(() => {
    setCurrentPage(1)
  }, [products])

  if (products.length === 0) {
    return <p className="text-center text-gray-400">No products found</p>
  }

  return (
    <>
      {/* Product grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          currentProducts.map(item => (
            <ProductItems
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {
            Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded
                  ${currentPage === page ? 'bg-black text-white' : ''}`}
              >
                {page}
              </button>
            ))

          }

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div >
      )}
    </>
  )
}

export default ProductGridWithPagination
