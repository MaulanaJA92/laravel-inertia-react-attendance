import StaffAttendanceModal from "@/Components/staff/StaffAttendance";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);
    return (
        <>
            {user.role === "admin" ? (
                <div className="py-12 bg-gray-100 min-h-screen">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200">
                            <div className="p-6 text-gray-900 font-medium">
                                Welcome Back, Admin! You're logged in.
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12 min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100 flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Welcome back, {user.name}!
                        </h1>
                        <div className="w-full flex items-center justify-between gap-4 mb-8">
                            <div className="flex-1 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                                <span className="block text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">
                                    Shift Start
                                </span>
                                <span className="text-lg font-black text-indigo-900">
                                    09:00 AM
                                </span>
                            </div>
                            <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
                                <span className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                                    Shift End
                                </span>
                                <span className="text-lg font-black text-amber-900">
                                    04:00 PM
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpen(true)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 transform active:scale-95 text-center"
                        >
                            Attend Now
                        </button>
                    </div>

                    {open && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                                onClick={() => setOpen(false)}
                            />

                            <div className="relative z-10 w-full max-w-md transform transition-all duration-300">
                                <StaffAttendanceModal
                                    onClose={() => setOpen(false)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
