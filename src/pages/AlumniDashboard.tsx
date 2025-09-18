import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AlumniDashboard = () => {
  const userName = localStorage.getItem("user_name") || "Alumni";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex space-x-4 p-4">
          <Button asChild variant="ghost">
            <Link to="/alumni/profile">Profile</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/alumni/mentorship">Mentorship</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/alumni/donate">Donate</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/alumni/explore">Explore</Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Alumni Dashboard
          </h2>
          <p>Use the navbar above to navigate to different sections.</p>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;