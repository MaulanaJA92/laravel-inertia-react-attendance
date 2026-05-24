import { User } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type Props = {
    users: User[];
    onEdit: (user: User) => void;
}

const UsersTable = ({ users, onEdit }: Props) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
 
  const confirmDelete = (userId: number, userName: string) => {
    MySwal.fire({
      title: "Delete User?",
      html: (
        <div className="text-sm text-gray-500 text-center">
          Are you sure you want to delete <span className="font-bold text-gray-800">{userName}</span>? 
          <p className="text-red-500 text-xs mt-2 font-semibold">This action cannot be undone.</p>
        </div>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",  
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
      reverseButtons: true, 
      background: "#ffffff",
      customClass: {
        popup: "rounded-xl shadow-xl border border-gray-100 p-6",
        title: "font-bold text-gray-900 text-xl",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/users/${userId}`, {
          onBefore: () => {
            MySwal.fire({
              title: "Processing...",
              allowOutsideClick: false,
              didOpen: () => MySwal.showLoading(),
            });
          },
          onSuccess: () => {
            MySwal.fire({
              title: "Success!",
              text: "The user has been deleted from the system.",
              icon: "success",
              confirmButtonColor: "#4f46e5", 
              timer: 1500, 
            });
          },
          onError: () => {
            MySwal.fire({
              title: "Failed!",
              text: "An error occurred while trying to delete the user.",
              icon: "error",
              confirmButtonColor: "#4f46e5",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Users</h2>
      <table className="min-w-full text-left border-collapse divide-y divide-gray-100">
        <thead className="bg-emerald-50/60 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
          <tr>
            <th className="p-4 text-sm font-semibold text-emerald-900">Name</th>
            <th className="p-4 text-sm font-semibold text-emerald-900">Email</th>
            <th className="p-4 text-sm font-semibold text-emerald-900">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-emerald-50/20 ">
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(user.id, user.name)}
                  className="bg-red-500 text-white hover:bg-red-700 ml-4 py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      

    </div>
    
  )
}

export default UsersTable