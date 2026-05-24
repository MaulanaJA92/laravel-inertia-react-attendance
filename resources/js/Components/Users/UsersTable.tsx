import { User } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";

type Props = {
    users: User[];
    onEdit: (user: User) => void;
}

const UsersTable = ({ users, onEdit }: Props) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const handleDelete = () => {
     if (deleteId) {
        router.delete(`/users/${deleteId}`, {
            onSuccess: () => setDeleteId(null)
        })
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Users</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(user.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {deleteId && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="font-bold mb-2">Hapus User?</h3>
            <p className="text-sm text-gray-500 mb-4">
                Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-2 justify-end">
                <button 
                    onClick={() => setDeleteId(null)}
                    className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
                >
                    Batal
                </button>
                <button 
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Hapus
                </button>
            </div>
        </div>
    </div>
)}
    </div>
    
  )
}

export default UsersTable