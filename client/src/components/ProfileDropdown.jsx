import { Menu } from "@headlessui/react";

export default function ProfileDropdown(props) {
  return (
    <div className="relative inline-block">
      <Menu>
        {/* Dropdown Button */}
        <Menu.Button className="text-gray-300 hover:text-rose-400 transition">
        <img
            className="w-12 h-12 rounded-full"
            src="http://res.cloudinary.com/djvb0qrot/image/upload/v1735025013/hsiiwzioxk4sdhnbqauh.jpg"
            alt="profile pic"
        />
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
                    Profile
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
                Log out
              </a>
            )}
          </Menu.Item>

        </Menu.Items>
      </Menu>
    </div>
  );
}