//src/App.tsx
import { useState, useEffect, useRef, useMemo, useReducer } from "react"; //importamos todos los hooks necesarios
import "./App.css";
import axios from "axios";
import UsersList from "./components/UsersList";
import { MdErrorOutline } from "react-icons/md";
import type User from "./helpers/interfaces";
import type { FetchState } from "./helpers/interfaces";

const initialState: FetchState = {
  data: [],
  loading: true,
  error: null,
};

function fetchReducer(state: FetchState, action: any): FetchState {
  console.log("Dispatching", action.type); //para debugear
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [searchTerm, setSearchTerm] = useState<string>(""); //👈🏼 estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null); //ref para el input

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      dispatch({ type: "FETCH_INIT" }); // 👈 Iniciar carga
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data }); // 👈 Éxito
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Hubo un error";
        dispatch({ type: "FETCH_FAILURE", payload: message }); // 👈 Fallo
        console.log("error al consultar los usuarios");
      }
    };
    fetchUsers();
  }, []);

  //👇 lo usamos para poner el foco en el input
  useEffect(() => {
    searchInputRef.current?.focus();
  }, [state.loading]);

  //👇 lo usamos para filtrar eficientemente los usarios
  const filteredUsers = useMemo(() => {
    return state.data.filter(
      ({ name, email, username }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [state.data, searchTerm]); // 👈 Dependencias: se recalcula- solo si users o searchRerm cambian

  //console.log(users);

  if (state.loading) {
    return (
      <div className="flex flex-col justify-center">
        <h2>Loading....</h2>
        <div className="loader"></div>
      </div>
    );
  }

  if (state.error) {
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
