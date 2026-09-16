import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BannerLogo from './components/BannerLogo/BannerLogo';
import NavBar from './components/NavBar/NavBar';
import ProductsView from './views/ProductsView/ProductsView';
import ProductDetailsView from './views/ProductDetailsView/ProductDetailsView';
import LoginView from './views/LoginView/LoginView';
import LogoutView from './views/LogoutView';
import RegisterView from './views/RegisterView/RegisterView';
import ProtectedRoute from './components/ProtectedRoute';
import CartView from './views/CartView/CartView';

export default function App() {

  return (
    <div id="cart-app">
      <BrowserRouter>
        <BannerLogo />
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<ProductsView />} />
            <Route path="/:id" element={<ProductDetailsView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<LogoutView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/cart" element={<ProtectedRoute><CartView /></ProtectedRoute>} />
          </Routes>
        </main>
      </BrowserRouter>
      <footer>
        <p>© Solar System Geek 2026</p>
      </footer>
    </div>
  );
}
