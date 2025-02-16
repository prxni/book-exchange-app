import { Menu } from "@headlessui/react";

export default function Dropdown(props) {
  return (
    <div className="relative inline-block">
      <Menu>
        {/* Dropdown Button */}
        <Menu.Button className="text-gray-300 hover:text-rose-400 transition">
          Themes
        </Menu.Button>

        {/* Dropdown Content */}
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-rose-100 shadow-lg rounded-lg divide-y divide-gray-200">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Action
                  </a>
                )}
              </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 ${
                  active ? "bg-gray-100" : ""
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
                className={`block px-4 py-2 ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                Fiction
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 ${
                  active ? "bg-gray-100" : ""
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
                className={`block px-4 py-2 ${
                  active ? "bg-gray-100" : ""
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
                className={`block px-4 py-2 ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                Science
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}