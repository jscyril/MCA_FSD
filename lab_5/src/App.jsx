import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
