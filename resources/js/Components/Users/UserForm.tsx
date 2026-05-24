import {useForm} from '@inertiajs/react'
import {User} from "@/types/index";

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

  const handleSubmit = () => {
    if (mode === 'create') {
      post('/users', { onSuccess: onClose });
    } else {
      put(`/users/${user?.id}`, {  onSuccess: onClose});
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {mode === 'create' ? 'Create User' : 'Edit User'}
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={processing}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {mode === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserForm