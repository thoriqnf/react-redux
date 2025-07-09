import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", exact: true },
    { path: "/counter", label: "Counter (Basic)" },
    { path: "/posts", label: "Posts (Advanced)" },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vh",
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#2d2d2d",
          color: "white",
          padding: "1rem 0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          borderBottom: "1px solid #444",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <h1 style={{ margin: "0", fontSize: "24px", color: "#4a90e2" }}>
            React + Zustand Demo
          </h1>
          <p
            style={{
              margin: "5px 0 0 0",
              fontSize: "14px",
              opacity: "0.8",
              color: "#ccc",
            }}
          >
            Learn state management with practical examples
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "#2d2d2d",
          borderBottom: "1px solid #444",
          padding: "0",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: "0",
              padding: "0",
              display: "flex",
              gap: "0",
            }}
          >
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    display: "block",
                    padding: "15px 20px",
                    textDecoration: "none",
                    color: isActive(item.path, item.exact) ? "#4a90e2" : "#ccc",
                    backgroundColor: isActive(item.path, item.exact)
                      ? "#1a1a1a"
                      : "transparent",
                    borderBottom: isActive(item.path, item.exact)
                      ? "2px solid #4a90e2"
                      : "2px solid transparent",
                    transition: "all 0.3s ease",
                    fontWeight: isActive(item.path, item.exact)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          minHeight: "calc(100vh - 160px)",
          backgroundColor: "#1a1a1a",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2d2d2d",
          color: "#ccc",
          padding: "20px 0",
          marginTop: "auto",
          borderTop: "1px solid #444",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0", fontSize: "14px", opacity: "0.8" }}>
            Built with React + Zustand • Demonstrating real-world state
            management patterns
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
