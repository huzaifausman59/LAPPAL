export default function LandingScreen({ onNavigate }) {
  return (
    <div className="landing">
      <div className="landing-logo">
        <div className="landing-logo-icon">💻</div>
        <span className="landing-title">Lappal</span>
      </div>
      <p className="landing-subtitle">
        Your trusted marketplace for cutting-edge technology
      </p>
      <div className="landing-buttons">
        <button className="btn btn-outline" onClick={() => onNavigate("login")}>
          Login
        </button>
        <button className="btn btn-primary" onClick={() => onNavigate("register")}>
          Register
        </button>
      </div>
    </div>
  );
}
