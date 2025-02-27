import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
