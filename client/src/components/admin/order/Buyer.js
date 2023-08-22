import React from 'react'

const Buyer = (props) => {
  return (
    <div className="fixed inset-x-0 top-14 bottom-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">{props.selectedBuyer.name}</h3>
      <ul className="space-y-2">
            <div key={props.selectedBuyer._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">Address: </h2>
                <p className="mt-1 text-xs text-gray-700">{props.selectedBuyer.address.substring(0,30)}</p>
                <hr className="my-4" />
                <h2 className="text-lg font-bold text-gray-900 mt-6">Phone: </h2>
                <p className="mt-1 text-xs text-gray-700">{props.selectedBuyer.phone}</p>
              </div>
            </div>
          </div>
      </ul>
      <button
        className="mt-4 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        onClick={() => props.setShowBuyer(false)}
      >
        Close
      </button>
    </div>
  </div>
  )
}

export default Buyer
