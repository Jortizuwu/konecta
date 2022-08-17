import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const routers = [
  { name: "Productos", path: "/products", iconName: "hola" },
  { name: "Ventas", path: "/sales", iconName: "hola" },
];

export const Layout = () => {
  return (
    <div className="flex flex-no-wrap">
      <div className="w-64 absolute sm:relative bg-gray-800 shadow h-screen flex-col justify-between hidden sm:flex">
        <div className="px-8">
          <div className="h-16 w-full flex items-center">
            <h1 className="text-blue-400">KONECTA</h1>
          </div>
          <ul className="mt-12 h-full">
            {routers.map(({ name, path, iconName }) => (
              <li
                key={name}
                className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6"
              >
                <NavLink
                  to={path}
                  style={({ isActive }) => (isActive ? null : undefined)}
                  className="flex items-center"
                >
                  <span className="text-sm ml-2 capitalize">{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto py-10 h-screen overflow-y-scroll md:w-4/5 w-11/12 px-6">
        <Outlet />
      </div>
    </div>
  );
};
