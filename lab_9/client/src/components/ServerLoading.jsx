import { useState, useEffect } from "react";

const ServerLoading = ({ onServerReady }) => {
  const [dots, setDots] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Count seconds
    const timeInterval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    // Check server status
    const checkServer = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL);
        if (response.ok) {
          onServerReady();
        }
      } catch (error) {
        // Server not ready yet, will try again
      }
    };

    // Check immediately, then every 3 seconds
    checkServer();
    const serverCheckInterval = setInterval(checkServer, 3000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(timeInterval);
      clearInterval(serverCheckInterval);
    };
  }, [onServerReady]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Starting Server{dots}
        </h2>

        <p className="text-gray-600 mb-4">
          Our server is hosted on Render and may take 30-60 seconds to start up
          from sleep mode.
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Time elapsed: {timeElapsed} seconds
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p className="text-sm text-blue-700">
            💡 This happens because free hosting services put apps to sleep when
            not in use. Your patience is appreciated!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerLoading;
