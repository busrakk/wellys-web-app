import React from 'react'

const Item = (props) => {
  return (
    <div className="fixed inset-x-0 top-14 bottom-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Ordered Products</h3>
      <ul className="space-y-2">
        {props.selectedProducts.map((item) => (
            <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
              src={`${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/product-photo/${item._id}`}
              alt={item.name}
              className="w-full rounded-lg sm:w-40 h-36"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                <p className="mt-1 text-xs text-gray-700">{item.description.substring(0,30)}</p>
                <div className="mt-8 space-x-2">
                </div>
              </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-xl">
                      Price : {item.price} ${" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <button
        className="mt-4 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        onClick={() => props.setShow(false)}
      >
        Close
      </button>
    </div>
  </div>
  )
}

export default Item
