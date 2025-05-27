//src/App.tsx
import { useState, useEffect, useRef, useMemo } from "react"; //importamos todos los hooks necesarios
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
  const [searchTerm, setSearchTerm] = useState<string>(""); //👈🏼 estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null); //ref para el input

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        /* setLoading(false); */ //colocado en el finally
      } catch (error) {
        if (error instanceof Error) {
          /* setLoading(false); */ //colocado en el finally
          setError(error.message);
        } else {
          setError("Hubo un error en la consulta");
        }
        console.log("error al consultar los usuarios");
      } finally {
        setLoading(false); // 👈 Se ejecuta siempre, bueno para quitar el loading
      }
    };
    fetchUsers();
  }, []);

  //👇 lo usamos para poner el foco en el input TODO:revisar el useRef
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  //👇 lo usamos para filtrar eficientemente los usarios
  const filteredUsers = useMemo(() => {
    //console.log("filtrando usuarios");
    return users.filter(
      (
        user //TODO: Analizar si en vez de includes() usamos mejor startsWith0
      ) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]); // 👈 Dependencias: se recalcula- solo si users o searchRerm cambian

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
    <div className="p-4 container mx-auto">
      <h1 className="text-4xl font-bold text-center my-6 text-gray-800">
        Mi lista de Usuarios
      </h1>
      <div className="mb-6 flex justify-center">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Busca por nombre, email o username..."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <UsersList users={filteredUsers} />
    </div>
  );
}

export default App;
