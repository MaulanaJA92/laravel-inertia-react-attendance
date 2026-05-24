import { Link, usePage } from "@inertiajs/react"
import { LayoutDashboard, Users, FileText } from "lucide-react"

const Sidebar = () => {
    const { url } = usePage()

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { href: "/users", label: "Users", icon: <Users size={18} /> },
        { href: "/reports", label: "Reports", icon: <FileText size={18} /> },
    ]

    return (
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="flex flex-col p-4 gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg
                            ${url === item.href
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar