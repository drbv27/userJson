//src/components/UserCars.tsx
import type { User } from "../App";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-xl bg-gray-200">
      <h2 className="text-xl font-semibold text-blue-900">{user.name}</h2>
      <p className="text-gray-800">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-gray-800">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="text-gray-800">
        <strong>Phone:</strong> {user.phone}
      </p>
      <p className="text-gray-800">
        <strong>Website:</strong>{" "}
        <a className="text-blue-600 hover:underline" href={user.website}>
          {user.website}
        </a>
      </p>
      <div>
        <h3 className="text-md font-bold text-gray-800">Address:</h3>
        <p className="text-gray-600 text-sm">
          {user.address.street},{user.address.suite} <br />
          {user.address.city},{user.address.zipcode}
        </p>
      </div>
      <div>
        <h3 className="text-md font-bold text-gray-800">Company:</h3>
        <p className="text-gray-600 text-sm">
          <span className="text-base text-gray-700">{user.company.name}</span>{" "}
          <br />
          <em className="text-gray-500">{user.company.catchPhrase}</em>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
