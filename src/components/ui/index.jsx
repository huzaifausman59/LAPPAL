// Shared primitive UI components used across the app

export function Logo({ size = "sm" }) {
  if (size === "lg") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div className="landing-logo-icon">💻</div>
        <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: -1 }}>Lappal</span>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="modal-logo-icon">💻</div>
      <span style={{ fontSize: 20, fontWeight: 700 }}>Lappal</span>
    </div>
  );
}

export function Navbar({ user, onNavigate, onLogoutClick }) {
  const home = user?.role === "seller" ? "dashboard" : "marketplace";
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate(home)}>
        <div className="logo-icon">💻</div>
        Lappal
      </div>
      {user && (
        <div className="navbar-links">
          {user.role === "seller" ? (
            <button className="nav-link" onClick={() => onNavigate("marketplace")}>Home</button>
          ) : (
            <>
              <button className="nav-link" onClick={() => onNavigate("dashboard")}>Dashboard</button>
              <button className="nav-link" onClick={() => onNavigate("messages")}>
                💬 Messages
              </button>
            </>
          )}
          <button className="nav-link" onClick={onLogoutClick}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export function Avatar({ name, size = 44 }) {
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {name[0]}
    </div>
  );
}

export function Toast({ message }) {
  return <div className="toast">{message}</div>;
}

export function EmptyState({ icon, text }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-text">{text}</div>
    </div>
  );
}

export function BackButton({ onClick, label = "Back" }) {
  return (
    <button className="back-btn" onClick={onClick}>
      ← {label}
    </button>
  );
}
