import {useForm} from '@inertiajs/react'
import {User} from "@/types/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type Props = {
    mode: 'create' | 'edit';
    user?: User;
    onClose: () => void;
    
}
const UserForm = ({ mode, user, onClose }: Props) => {
  const { data, setData, post, put, processing, errors } = useForm({
    name: user?.name || '',
    email: user?.email || '',
  });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); 

  if (mode === 'create') {
    post('/users', {
      onBefore: () => {
        
        MySwal.fire({
          title: "Saving data...",
          allowOutsideClick: false,
          didOpen: () => MySwal.showLoading(),
        });
      },
      onSuccess: () => {
        onClose(); 
        
        MySwal.fire({
          title: "Success!",
          text: "New user has been successfully added to the system.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          timer: 1500, 
        });
      },
      onError: () => {
        
        MySwal.fire({
          title: "Failed!",
          text: "Please double-check your form inputs.",
          icon: "error",
          confirmButtonColor: "#4f46e5",
        });
      }
    });
  } else {
    put(`/users/${user?.id}`, {
      onBefore: () => {
       
        MySwal.fire({
          title: "Updating data...",
          allowOutsideClick: false,
          didOpen: () => MySwal.showLoading(),
        });
      },
      onSuccess: () => {
        onClose();
    
        MySwal.fire({
          title: "Updated!",
          text: "User profile has been successfully updated.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          timer: 1500,
        });
      },
      onError: () => {
        MySwal.fire({
          title: "Failed!",
          text: "An error occurred while trying to update user data.",
          icon: "error",
          confirmButtonColor: "#4f46e5",
        });
      }
    });
  }
};

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden bg-white rounded-xl shadow-xl border border-slate-100">
        
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4">
          <h3 className="text-lg font-bold text-slate-800">
            {mode === 'create' ? 'Create New User' : 'Edit User Profile'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-medium text-2xl p-1 transition"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g. John Doe"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              required
            />
            {errors?.name && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              required
            />
            {errors?.email && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Saving...' : mode === 'create' ? 'Create User' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm