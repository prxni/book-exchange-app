

export default function Layout({ sidebarContent, mainContent }) {
    return (
        <div className="flex h-screen gap-0 bg-black">
            {/* Left Sidebar */}
            <div className="w-1/4 bg-violet-400">
                {sidebarContent}
            </div>

            {/* Main Content */}
            <div className="w-3/4 mx-10 my-4">
                {mainContent}
            </div>
        </div>
    );
}
