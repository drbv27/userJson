import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import User from "./components/UserCard";
import UsersList from "./components/UsersList";
import { MdErrorOutline } from "react-icons/md";

export interface Geo {
  lat: string;
  lng: string;
}
export interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false);
          setError(error.message);
        } else {
          setLoading(false);
          setError("Hubo un error en la consulta");
        }
        console.log("error al consultar los usuarios");
      }
    };
    fetchUsers();
  }, []);

  //console.log(users);

  if (loading) {
    return (
      <div className="flex flex-col justify-center">
        <h2>Loading....</h2>
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p>
        <span className="text-red-500">
          <MdErrorOutline />
        </span>
        Hubo un error...
        <span className="text-red-500">
          <MdErrorOutline />
        </span>
      </p>
    );
  }

  return (
    <>
      <UsersList users={users} />
    </>
  );
}

export default App;
