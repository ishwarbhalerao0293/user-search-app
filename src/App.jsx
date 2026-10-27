
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch {
        setError("We couldn't load the users. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-inner">
          <a className="brand" href="#home">
            <span className="brand-icon">P</span>
            <span>People<span className="brand-highlight">Hub</span></span>
          </a>

          <span className="nav-label">USER DIRECTORY</span>
        </div>
      </nav>

      <main id="home" className="main-content">
        <section className="hero">
          <span className="hero-tag">PEOPLE DIRECTORY</span>
          <h1>Discover your <span>people.</span></h1>
          <p>
            Explore our directory and find user information in seconds.
          </p>

          <div className="search-wrapper">
            <span className="search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>
            </span>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search users by name..."
              aria-label="Search users by name"
            />

            {searchQuery && (
              <button
                className="clear-button"
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </section>

        <section className="directory">
          <div className="section-heading">
            <div>
              <h2>Our Users</h2>
              <p>Browse people and their details</p>
            </div>

            {!loading && !error && (
              <span className="count-badge">
                {filteredUsers.length} users
              </span>
            )}
          </div>

          {loading && (
            <div className="status-box" role="status">
              <div className="spinner" />
              <h3>Loading users...</h3>
              <p>Please wait while we fetch the directory.</p>
            </div>
          )}

          {!loading && error && (
            <div className="status-box" role="alert">
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredUsers.length === 0 && (
            <div className="status-box">
              <h3>No users found</h3>
              <p>Try searching with a different name.</p>
              <button
                className="retry-button"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            </div>
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <div className="user-grid">
              {filteredUsers.map((user) => (
                <article className="user-card" key={user.id}>
                  <div className="card-header">
                    <div className={`avatar avatar-${(user.id % 5) + 1}`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="user-id">
                      ID #{String(user.id).padStart(3, "0")}
                    </span>
                  </div>

                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-username">@{user.username}</p>

                  <div className="card-divider" />

                  <div className="info-row">
                    <div className="info-icon email-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="14" rx="3" />
                        <path d="m4 7 8 6 8-6" />
                      </svg>
                    </div>
                    <div className="info-content">
                      <span className="info-label">EMAIL ADDRESS</span>
                      <a className="info-value email-value" href={`mailto:${user.email}`}>
                        {user.email}
                      </a>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-icon company-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="7" width="16" height="14" rx="2" />
                        <path d="M9 7V4h6v3M8 12h2m4 0h2M8 16h2m4 0h2" />
                      </svg>
                    </div>
                    <div className="info-content">
                      <span className="info-label">COMPANY</span>
                      <p className="info-value">{user.company.name}</p>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-icon city-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>
                    <div className="info-content">
                      <span className="info-label">CITY</span>
                      <p className="info-value">{user.address.city}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>PeopleHub <span>·</span> Built with React</p>
      </footer>
    </div>
  );
}

export default App;
