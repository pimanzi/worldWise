import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
const Base_URL = 'https://worldwise-json-server-ag9v.onrender.com';
const citiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  error: '',
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };
    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };

    case 'city/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter((cities) => cities.id !== action.payload),
        isLoading: false,
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('action type not recognised');
  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${Base_URL}/cities`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: err.message });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (currentCity.id === Number(id)) return;
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${Base_URL}/cities/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: err.message });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${Base_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${Base_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err.message });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined) {
    throw new Error('CitiesContext is used outside  of its provider');
  }
  return context;
}

export { CitiesProvider, useCities };
