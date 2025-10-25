import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = location.pathname === "/auth";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-background/70 backdrop-blur-md border-b border-border/30">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold bg-gradient-pride bg-clip-text text-transparent cursor-pointer"
      >
        Pride Social Network
      </h1>

      {!isAuth && !isDashboard && (
        <Button
          variant="outline"
          onClick={() => navigate("/auth")}
          className="text-sm"
        >
          Login / Register
        </Button>
      )}

      {isDashboard && (
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("walletAddress");
            navigate("/");
          }}
          className="text-sm"
        >
          Logout
        </Button>
      )}
    </header>
  );
};

export default Header;
