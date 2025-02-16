import { Menu } from "@headlessui/react";
import appCover from "../assets/app_cover.png";
import Dropdown from "./Dropdown";
import ProfileDropdown from "./ProfileDropdown";

export default function Header()
{
    return (
        <header className="bg-black shadow-md font-Poppins">
            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <img className="w-16 h-auto" src={appCover} alt="app" />
                </div>
                
                {/* Search Bar */}
                <div className="flex flex-row items-center gap-2 w-auto">
                    <input
                        type="text"
                        placeholder="Search By Title, Author, Publisher Or ISBN"
                        className="w-72 px-4 py-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-rose-200"
                    />
                    <button className="px-4 py-2 bg-rose-300 text-white rounded-full hover:bg-rose-500">
                        Search
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-6 md:space-x-8 text-center">
                    <Dropdown/>
                    <a href="#" className="text-gray-300 hover:text-rose-400">New Arrivals</a>
                    <a href="#" className="text-gray-300 hover:text-rose-400">Exchange a Book</a>
                </nav>

                {/* User Account */}
                <div className="flex items-center">
                    <ProfileDropdown/>
                </div>
            </div>
        </header>
    );
};
