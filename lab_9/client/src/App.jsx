import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Register from "./components/Register";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";
import ServerLoading from "./components/ServerLoading";
import "./App.css";

function App() {
  const [serverReady, setServerReady] = useState(false);

  // If server is not ready, show loading screen
  if (!serverReady) {
    return <ServerLoading onServerReady={() => setServerReady(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-indigo-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-white text-xl font-bold">
                  Social Network
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Users
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<EditUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
