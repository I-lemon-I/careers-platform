import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Careers Platform
        </Link>
        <div style={styles.links}>
          {isAuthenticated ? (
            <>
              <Link to="/jobs" style={styles.link}>Jobs</Link>
              <span style={styles.user}>
                User: {user?.name || user?.email}
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2d3748',
    padding: '16px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
    ':hover': {
      color: 'white',
    },
  },
  user: {
    color: '#e2e8f0',
    fontSize: '14px',
    padding: '4px 12px',
    backgroundColor: '#4a5568',
    borderRadius: '4px',
  },
  logoutBtn: {
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#c53030',
    },
  },
  registerBtn: {
    backgroundColor: '#48bb78',
    color: 'white',
    textDecoration: 'none',
    padding: '6px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#38a169',
    },
  },
};

export default Navbar;