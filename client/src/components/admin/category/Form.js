import React from "react";

const Form = (props) => {
  return (
    <div className="fixed inset-x-0 top-14 bottom-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="p-2 rounded">
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-3/4">
            {props.isLoading === true ? (
              <div className="bg-white px-6 py-4">Loading</div>
            ) : (
              <form
                className="bg-white px-6 py-4"
                onSubmit={props.handleSubmit}
              >
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="name"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    Kategori Adı:
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="text-sm sm:text-base placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                    placeholder="Kategori Adı"
                    name="name"
                    onChange={(e) => props.setName(e.target.value)}
                    value={props.name}
                    required
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="status"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    Durum:
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="text-sm sm:text-base placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                    onChange={(e) => props.setStatus(e.target.value)}
                    value={props.status}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => props.setShow(false)} // Close the form
                    className="mr-2 px-4 py-2 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-violet-600 rounded-lg md:text-fontmd text-fontsm hover:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 focus:ring-opacity-80"
                  >
                    {props.button}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
