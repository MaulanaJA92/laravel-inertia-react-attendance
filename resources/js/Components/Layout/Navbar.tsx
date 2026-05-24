import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { User } from "lucide-react";

const Navbar = () => {
    const { auth } = usePage().props as any;
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="mx-auto  px-4 sm:px-6 lg:px-8 flex h-20 justify-between items-center">
                <span className="font-bold text-lg">Attendance</span>

                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 text-gray-600 hover:text-black"
                    >
                        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                            <User size={20} />
                        </div>
                        
                        <span className="text-lg">{auth.user.name}</span>
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                            <div className="px-4 py-2 text-sm text-gray-500 border-b">
                                {auth.user.email}
                            </div>
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
