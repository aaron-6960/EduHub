import "./App.css";
import { Navbar, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import {ProtectedRoute} from "./components";

function App() {
  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Navbar />
          <div className="flex justify-center">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;