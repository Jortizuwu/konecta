import React from "react";
import { Link } from "react-router-dom";

export const Table = ({ rows, columnNames }) => {
  const keys = rows[0] ? Object?.keys(rows[0]) : [];

  return (
    <div className=" p-3 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">Productos</h2>
          <span className="text-xs">Todos los productos</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="lg:ml-40 ml-10 space-x-8">
            <Link
              to="create"
              className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
            >
              Crear
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {columnNames.map((val, idx) => (
                    <th
                      key={idx}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows?.map((val) => (
                  <tr key={val?.id_product}>
                    {keys?.map((name) => (
                      <td
                        className=" border-b border-gray-200 bg-white text-sm cursor-pointer"
                        key={name}
                      >
                        <Link to={`${val?.id_product}`}>
                          <p className="text-gray-900 px-5 py-5 h-full whitespace-no-wrap ">
                            {val?.[name]}
                          </p>
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
