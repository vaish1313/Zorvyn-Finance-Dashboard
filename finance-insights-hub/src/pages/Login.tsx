import { AuthPage } from "@/components/ui/auth-page";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'viewer') => {
    // Store the role in localStorage
    localStorage.setItem('userRole', role);
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return <AuthPage onLogin={handleLogin} />;
}
