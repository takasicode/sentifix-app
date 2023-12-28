"use client";

import React, { useState } from "react";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import {
  MdOutlineDashboard,
  MdOutlineTableChart,
  MdMenu,
  MdOutlineMenuOpen,
} from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { UserNav } from "./user-nav";
function Header({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isPhone = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const Menus = [
    { title: "Dashboard", src: MdOutlineDashboard, url: "/" },
    { title: "Reviews", src: MdOutlineTableChart, url: "/reviews" },
    { title: "Inputs", src: FaPencilAlt,url:'/input' },
  ];
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5  fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              onClick={toggleCollapse}
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer  hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100focus:ring-2 focus:ring-gray-100 "
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <a
              href="/"
              className="flex items-center justify-between mr-4"
            >
              <img
                src="/logo.png"
                className="mr-3 h-8"
                alt="Flowbite Logo"
              />
         
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                Sentifix
              </span>
            </a>
          </div>
          <div className="flex items-center lg:order-2">
            {/* <UserNav  /> / error */}
          </div>
        </div>
      </nav>

      <Sidebar
        theme={{
          root: {
            inner:
              "h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 ",
          },
        }}
        collapseBehavior={isPhone ? "hide" : "collapse"}
        collapsed={isCollapsed}
        color="primary"
        className="fixed top-0 left-0 z-40 h-screen pt-14  transition ease-in-out duration-100 border-r"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {Menus.map((item, index) => (
              <Sidebar.Item href={item.url} icon={item.src} key={index}>
                {item.title}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <main
        className={`p-4 pt-20 bg-slate-50  h-screen ${
          isPhone?'':(isCollapsed ? "ml-16" : "ml-64")
        }`}
      >
        {children}
      </main>
    </>
  );
}

export default Header;
