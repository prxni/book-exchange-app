import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import Layout from "../Layouts/Layout";
import Header from "../components/Header";
import Post_profile from "../components/Post_profile";

export default function Home() {
    const { authorize, user, isLoading } = useContext(AuthContext);
    const [selectedGenre, setSelectedGenre] = useState('All');

    const genres = [
        'All', 'Adventure', 'Fantasy', 'Romance', 'Science Fiction', 
        'Horror', 'Thriller', 'Non-fiction', 'Biography', 'Mystery', 
        'Historical', 'Comics', 'Poetry'
    ];

    const stats = [
        { label: 'Total Books', value: '2,847', color: 'text-teal-300' },
        { label: 'Active Users', value: '1,234', color: 'text-rose-400' },
        { label: 'Exchanges Today', value: '67', color: 'text-blue-400' },
        { label: 'New Arrivals', value: '23', color: 'text-green-400' }
    ];

    useEffect(() => {
        authorize();
    }, []);

    const sidebarContent = (
        <div className="flex font-poppins h-full">
            <div className="w-full bg-black border-r border-gray-700 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-rose-400 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-lg">explore</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Explore</h2>
                            <p className="text-xs text-gray-400">Find your next read</p>
                        </div>
                    </div>
                </div>
                
                {/* Sidebar Content */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">

                    {/* Quick Stats */}
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-medium text-sm">Platform Stats</h3>
                            <span className="material-symbols-outlined text-teal-400 text-sm">trending_up</span>
                        </div>
                        <div className="space-y-3">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-gray-400 text-xs">{stat.label}</span>
                                    <span className={`font-semibold text-sm ${stat.color}`}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Browse by Genre */}
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-medium text-sm">Popular Genres</h3>
                            <span className="material-symbols-outlined text-rose-400 text-sm">category</span>
                        </div>
                        <div className="space-y-1">
                            {genres.slice(1, 7).map((genre) => (
                                <button
                                    key={genre}
                                    onClick={() => setSelectedGenre(genre)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-between group ${
                                        selectedGenre === genre
                                            ? 'bg-teal-500 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                >
                                    {genre}
                                    <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                                </button>
                            ))}
                        </div>
                        <button className="w-full text-left px-3 py-2 mt-2 text-xs text-teal-400 hover:text-teal-300 transition-colors duration-200 flex items-center gap-2">
                            <span>View all genres</span>
                            <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-medium text-sm">Quick Actions</h3>
                            <span className="material-symbols-outlined text-blue-400 text-sm">bolt</span>
                        </div>
                        <div className="space-y-2">
                            <Link
                                to="/add-book"
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-rose-400">add</span>
                                    <span>List a Book</span>
                                </div>
                                <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </Link>
                            <Link
                                to="/my-exchanges"
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-teal-400">swap_horiz</span>
                                    <span>My Exchanges</span>
                                </div>
                                <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </Link>
                            <Link
                                to="/browse"
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-blue-400">search</span>
                                    <span>Browse Books</span>
                                </div>
                                <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const mainContent = (
        <div className="text-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 mb-8 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-rose-500/10"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-rose-300">
                            Discover Your Next
                        </span>
                        <br />
                        <span className="text-white">Great Read</span>
                    </h1>
                    <p className="text-gray-300 text-lg mb-6 max-w-2xl leading-relaxed">
                        Join our vibrant community of book enthusiasts. Share, exchange, and discover amazing stories from readers around the world.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-gradient-to-r from-teal-500 to-rose-500 text-white px-8 py-3 rounded-xl hover:from-teal-600 hover:to-rose-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                            Start Exploring →
                        </button>
                        <button className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-all duration-200 font-semibold backdrop-blur-sm">
                            How it Works
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Books Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-rose-300">Featured Books</h2>
                        <p className="text-gray-400 text-sm mt-1">Handpicked recommendations from our community</p>
                    </div>
                    <Link to="/featured" className="text-teal-400 hover:text-rose-400 text-sm font-medium transition-colors duration-200 flex items-center gap-1">
                        View all 
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Post_profile />
                    <Post_profile />
                    <Post_profile />
                    <Post_profile />
                </div>
            </div>

            {/* Recently Added Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-teal-300">Recently Added</h2>
                        <p className="text-gray-400 text-sm mt-1">Fresh arrivals from our community</p>
                    </div>
                    <Link to="/recent" className="text-rose-400 hover:text-teal-400 text-sm font-medium transition-colors duration-200 flex items-center gap-1">
                        View all 
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Post_profile />
                    <Post_profile />
                    <Post_profile />
                    <Post_profile />
                </div>
            </div>

            {/* Genre Spotlight */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-rose-300">
                            {selectedGenre === 'All' ? 'Popular' : selectedGenre} Books
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Explore books by category</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select 
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="bg-gray-800 text-white text-sm rounded-lg px-4 py-2 border border-gray-600 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-200"
                        >
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                        <Link to={`/genre/${selectedGenre.toLowerCase()}`} className="text-teal-400 hover:text-rose-400 text-sm font-medium transition-colors duration-200 flex items-center gap-1">
                            View all 
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Post_profile />
                    <Post_profile />
                    <Post_profile />
                    <Post_profile />
                </div>
            </div>

            {/* How it Works Section */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-rose-500/5"></div>
                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-rose-300 mb-3">How It Works</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Get started with BookExchange in three simple steps</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                                    <span className="material-symbols-outlined text-white text-xl">book</span>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                            </div>
                            <h3 className="font-bold text-white mb-3 text-lg">List Your Books</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Upload beautiful photos and detailed descriptions of books you want to share with the community.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                                    <span className="material-symbols-outlined text-white text-xl">search</span>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                            </div>
                            <h3 className="font-bold text-white mb-3 text-lg">Discover Books</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Explore thousands of books from passionate readers and find your next favorite story.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                                    <span className="material-symbols-outlined text-white text-xl">swap_horiz</span>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                            </div>
                            <h3 className="font-bold text-white mb-3 text-lg">Make Exchanges</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Connect directly with book owners and arrange seamless exchanges or purchases.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-teal-300 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <Layout sidebarContent={sidebarContent} mainContent={mainContent} />
        </>
    );
}
