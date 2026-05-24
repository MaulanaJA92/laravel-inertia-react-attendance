import UsersTable from "@/Components/Users/UsersTable";
import UserForm from "@/Components/Users/UserForm";
import { PageProps, User } from "@/types";
import { useState } from "react";

interface Props extends PageProps {
    users: User[]
}
const Index = ({ users }: Props) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'create' | 'edit'>('create');
 const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)

  return (
    <div>
      <button
        onClick={() => {
          setType('create');
          setOpen(true);
        }}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create User
      </button>
      <UsersTable users={users} onEdit={(user) => {
        setType('edit');
        setOpen(true);
        setSelectedUser(user)
      }} />
{ open && <UserForm mode={type} user={selectedUser}  onClose={() => {setOpen(false); setSelectedUser(undefined)}} />}
    </div>
  )
}

export default Index