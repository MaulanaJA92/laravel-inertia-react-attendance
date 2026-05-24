import Footer from "@/Components/Layout/Footer"
import Navbar from "@/Components/Layout/Navbar"
import Sidebar from "@/Components/Layout/Sidebar"
import { Head ,usePage} from "@inertiajs/react"


type Props = {
    children: React.ReactNode
}

const BasicLayout = ({ children, }: Props) => {
    const user = usePage().props.auth.user;
    return (
        <>
         <Head title="My App" />
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1">
              {user.role === "admin" && <Sidebar />}
                <main className="flex-1 flex flex-col bg-gray-100">
                    <div className="flex-1 p-6">
                        {children}
                    </div>
                    <Footer />  
                </main>
            </div>
            
        </div></>
    )
}

export default BasicLayout