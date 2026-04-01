import { NavLink } from "react-router-dom";
import { CarFront, LayoutDashboard, LogIn, LogOut, PlusSquare, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";
import viteLogo from "../../assets/vite-logo.svg";

const guestLinks = [{ to: "/", label: "Public Registry", icon: CarFront }];
const authLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vehicle/new", label: "Register Vehicle", icon: PlusSquare },
];

function AppShell({ children }) {
  const { isAuthenticated, logout, user } = useAuth();
  const links = isAuthenticated ? [...guestLinks, ...authLinks] : guestLinks;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon-wrap">
            <div className="brand-icon">
              <ShieldCheck size={24} />
            </div>
            <img src={viteLogo} alt="Vite logo" className="brand-vite-logo" />
          </div>
          <div>
            <p>Velocity Registry</p>
            <span>Vehicle operations dashboard powered by Vite</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn("nav-link", isActive && "nav-link-active")}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          {isAuthenticated ? (
            <>
              <div className="user-panel">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>
              <button type="button" className="ghost-button" onClick={logout}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="ghost-button">
              <LogIn size={16} />
              Login
            </NavLink>
          )}
        </div>
      </aside>

      <main className="content-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Production grade frontend assignment</p>
            <h1>Vehicle Registration & Management Platform</h1>
          </div>
          <div className="topbar-badge">{isAuthenticated ? "Protected Mode" : "Guest View"}</div>
        </header>
        {children}
      </main>
    </div>
  );
}

export default AppShell;
