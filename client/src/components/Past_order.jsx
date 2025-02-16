export default function Past_order()
{
    return(
        <div className="overflow-hidden w-56 h-64 flex flex-col bg-indigo-200 rounded-lg p-4 gap-2 font-Poppins shadow-lg  hover:scale-105">
            <img
                className="w-full h-32 object-cover rounded-lg shadow-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKb3YVQ2iBe1r_vV9uT9rrcjKUkFQJ1ijZ0Q&s"
                alt="book pic"
            />
            <div>
                <h4 className="font-bold text-stone-600 text-lg">Fifety shades of Grey</h4>
            </div>
            <p>2 days ago</p>
        </div>
    )
}