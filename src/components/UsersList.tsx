import type { User } from "../App";
import UserCard from "./UserCard";

const UsersList = ({ users }: any) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Mi lista de Usuarios
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user: User) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
