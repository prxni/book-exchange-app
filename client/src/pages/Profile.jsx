import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Post_profile from "../components/Post_profile";
import Past_order from "../components/Past_order";

export default function Profile() {
    const [userDetail, setUserDetails] = useState(false);

    const toggleUser = () => {
        setUserDetails(!userDetail);
    };

    const sidebarContent = (
        <div className="flex font-poppins cursor-default select-none h-full">
                <div className="w-full p-6 font-poppins text-white flex flex-col gap-4 bg-black  shadow-md">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                        <img
                            className="w-20 h-20 rounded-full"
                            src="http://res.cloudinary.com/djvb0qrot/image/upload/v1735025013/hsiiwzioxk4sdhnbqauh.jpg"
                            alt="profile pic"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-teal-300">Pranav A Viswam</h2>
                            <h3 className="text-sm text-rose-400">@prx_ni</h3>
                        </div>
                    </div>

                    <div className="px-1 py-2 bg-gray-800 rounded-md">
                        <div
                            onClick={toggleUser}
                            className="text-gray-300 font-semibold flex justify-between items-center cursor-pointer"
                        >
                            <span>Details</span>
                            <span
                                className={`material-symbols-outlined ${
                                    userDetail && "rotate-180"
                                } transition-transform duration-300`}
                            >
                                arrow_drop_down
                            </span>
                        </div>

                        {userDetail && (
                            <div className="mt-4 text-sm text-gray-300">
                                <p className="mb-1">
                                    <span className="font-semibold">Email:</span>{" "}
                                    <Link
                                        to="mailto:pranavviswam15@gmail.com"
                                        className="text-blue-400"
                                    >
                                        pranavviswam15@gmail.com
                                    </Link>
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Phone number:</span>{" "}
                                    +91 8139835562
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Date of birth:</span>{" "}
                                    16/06/2004
                                </p>
                                <p>
                                    <span className="font-semibold">Home address:</span>{" "}
                                    ARA A-8 Janaganamana Surabhi Gardens Aithadi Road Uloor
                                    TVM-11
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-teal-300 font-semibold mb-1">Bio</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            But I must explain to you how all this mistaken idea of
                            denouncing pleasure and praising pain was born and I will give
                            you a complete account of the system, and expound the actual
                            teachings of the great explorer of the truth, the master-builder
                            of human happiness. No one rejects, dislikes, or avoids pleasure
                            itself, because it is pleasure, but because those who do not
                            know how to pursue pleasure rationally encounter consequences
                            that are extremely painful.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-teal-300 font-semibold mb-1">Tags</h3>
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                                Fantasy
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                                Adventure
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    );
    
    const mainContent = (
        <div>
            <div className="w-full p-4 bg-black  text-gray-300 font-Poppins">
                <h3 className="text-teal-300 font-semibold mb-2">Profile Completeness</h3>
                <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-rose-300 h-full rounded-full"
                        style={{ width: "60%" }}
                    ></div>
                </div>
                <p className="text-sm mt-1">60% complete. Update your profile to reach 100%!</p>
            </div>
            <div className="flex flex-col  p-3 gap-4">
                <h3 className="text-teal-300 font-bold">Posts</h3>
                <div className="flex flex-row gap-4">
                    <Post_profile/>
                    <Post_profile/>
                    <Post_profile/>
                    <Post_profile/>uu
                </div>
            </div>
            <div className="flex flex-col  p-3 gap-4">
                <h3 className="text-teal-300 font-bold">Past orders</h3>
                <div className="flex flex-row gap-4">
                    <Past_order/>
                    <Past_order/>
                </div>
            </div>
        </div>
    );
    
    return <Layout sidebarContent={sidebarContent} mainContent={mainContent} />;
}
