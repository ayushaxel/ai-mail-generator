import { LogOut } from "lucide-react";

const Navbar = ({user,onLogout})=>{
    return (
        <nav className="bg-white shadow-sm border-b p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">AI Mail Generator</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-700" >Hi {user?.name}</span>
                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    onClick={onLogout}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;