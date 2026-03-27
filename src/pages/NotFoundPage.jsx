import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="state-card">
      <h2>Page not found</h2>
      <p>The route you requested does not exist in this platform.</p>
      <Link to="/" className="hero-link">
        Return home
      </Link>
    </div>
  );
}

export default NotFoundPage;
