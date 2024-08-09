import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesProvider';
import { AuthProvider } from './contexts/FakeAuthProvider';
import ProtectorRoutes from './pages/ProtectorRoutes';
import { Suspense, lazy } from 'react';
import SpinnerFullPage from './components/SpinnerFullPage';
// import Product from './pages/Product';
// import Price from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';
// import Login from './pages/Login';
const Product = lazy(() => import('./pages/Product'));
const Price = lazy(() => import('./pages/Pricing'));
const Homepage = lazy(() => import('./pages/Homepage'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
              {' '}
              <Routes>
                <Route path="pricing" element={<Price></Price>}></Route>
                <Route path="product" element={<Product />}></Route>
                <Route index element={<Homepage />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
                <Route
                  path="app"
                  element={
                    <ProtectorRoutes>
                      <AppLayout />
                    </ProtectorRoutes>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="cities"></Navigate>}
                  ></Route>

                  <Route path="cities/:id" element={<City></City>}></Route>

                  <Route path="cities" element={<CityList></CityList>}></Route>
                  <Route
                    path="countries"
                    element={<CountryList></CountryList>}
                  ></Route>
                  <Route path="form" element={<Form></Form>}></Route>
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
