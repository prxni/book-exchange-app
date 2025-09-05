import { Menu } from "@headlessui/react";
import appCover from "../assets/app_cover.png";
import Dropdown from "./Dropdown";
import ProfileDropdown from "./ProfileDropdown";

export default function Header()
{
    return (
        <header className="bg-black shadow-md font-Poppins border-b border-gray-800">
            <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
                {/* Brand */}
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-teal-300">BookExchange</h1>
                </div>
                
                {/* Search Bar */}
                <div className="flex flex-row items-center gap-3 w-auto">
                    <input
                        type="text"
                        placeholder="Search books, authors, genres..."
                        className="w-80 px-4 py-2.5 text-sm bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400"
                    />
                    <button className="px-5 py-2.5 bg-gradient-to-r from-teal-400 to-rose-400 text-white rounded-lg hover:from-teal-500 hover:to-rose-500 transition-all duration-200 font-medium">
                        Search
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-8 text-center">
                    <Dropdown/>
                    <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium">New Arrivals</a>
                    <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 font-medium">Exchange</a>
                </nav>

                {/* User Account */}
                <div className="flex items-center">
                    <ProfileDropdown/>
                </div>
            </div>
        </header>
    );
};
