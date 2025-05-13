import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GitHubAuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGitHubLogin = () => {
    // Redirect to backend GitHub OAuth route
    window.location.href = "http://localhost:3000/api/auth/github";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Login with GitHub</h2>
        <p className="text-sm text-gray-500 mb-6">
          Securely authenticate using your GitHub account.
        </p>
        <button
          onClick={handleGitHubLogin}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Sign in with GitHub
        </button>
        <p className="text-xs text-gray-400 mt-6">
          If you’ve already logged in, we’re processing your login...
        </p>
      </div>
    </div>
  );
};

export default GitHubAuthPage;
