export default function Post_profile() {
    return (
        <div className="overflow-hidden w-56 h-64 flex flex-col bg-orange-100 rounded-lg p-4 gap-2 font-Poppins shadow-lg  hover:scale-105">
            <img
                className="w-full h-32 object-cover rounded-lg shadow-md"
                src="https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg"
                alt="book pic"
            />
            <div>
                <h4 className="font-bold text-stone-600 text-lg">The Alchemist</h4>
            </div>
            <div className="flex flex-row justify-between mt-auto">
                <button className="bg-teal-500 text-white font-semibold py-1 px-3 rounded-md shadow hover:bg-teal-600 transition duration-200">
                    Buy
                </button>
                <button className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md shadow hover:bg-blue-600 transition duration-200">
                    Exchange
                </button>
            </div>
        </div>
    );
}