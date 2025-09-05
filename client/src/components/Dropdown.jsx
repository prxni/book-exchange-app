import { Menu } from "@headlessui/react";

export default function Dropdown(props) {
  return (
    <div className="relative inline-block">
      <Menu>
        {/* Dropdown Button */}
        <Menu.Button className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium flex items-center gap-1">
          Genres
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </Menu.Button>

        {/* Dropdown Content */}
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 shadow-2xl rounded-lg divide-y divide-gray-700 z-50 backdrop-blur-sm">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium first:rounded-t-lg ${
                      active ? "bg-gray-700 text-teal-400" : "hover:bg-gray-700"
                    }`}
                  >
                    Fantasy
                  </a>
                )}
              </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  active ? "bg-gray-700 text-teal-400" : "hover:bg-gray-700"
                }`}
              >
                Adventure
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  active ? "bg-gray-700 text-teal-400" : "hover:bg-gray-700"
                }`}
              >
                Science Fiction
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  active ? "bg-gray-700 text-teal-400" : "hover:bg-gray-700"
                }`}
              >
                Mystery
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  active ? "bg-gray-700 text-teal-400" : "hover:bg-gray-700"
                }`}
              >
                Romance
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  active ? "bg-gray-700 text-teal-400" : "hover:bg-gray-700"
                }`}
              >
                Horror
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium last:rounded-b-lg ${
                  active ? "bg-gray-700 text-teal-400" : "hover:bg-gray-700"
                }`}
              >
                View All Genres
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}