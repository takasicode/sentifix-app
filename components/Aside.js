import { useState } from "react";
import Header from "@/components/Header";
import {
  MdOutlineDashboard,
  MdOutlineTableChart,
  MdMenu,
  MdOutlineMenuOpen,
} from "react-icons/md";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { useRouter } from "next/router";
const Aside = ({ children }) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: MdOutlineDashboard,url:'/' },
    { title: "Reviews", src: MdOutlineTableChart,url:'/reviews' },
  ];
  const router = useRouter();
  return (
    <div className="flex bg-white">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5 relative duration-300`}
      >
        <MdMenu
          size={25}
          className={`absolute cursor-pointer -right-3 top-9 `}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img src="/logo.png" className="cursor-pointer" />
          <h1
            className={`text-[#222] origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
             
            >
              <Link href={Menu.url}  className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#4154F1]/[0.1] text-[#222] text-sm font-semibold items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${router.pathname === Menu.url ? "bg-[#4154F1]/[0.1]" : ""}`}>

              <Menu.src size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200  `}>
                {Menu.title}
              </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 px-7">
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
           
              <div className="ml-auto flex items-center space-x-4">
               
                <UserNav />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Aside;
