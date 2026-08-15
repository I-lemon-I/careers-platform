import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const JobDetail = ({ job, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEdit = () => {
    navigate(`/jobs/${job.id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await onDelete(job.id);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/jobs')} style={styles.backBtn}>
        Back to Jobs
      </button>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{job.title}</h1>
          <div style={styles.badges}>
            <span style={{...styles.badge, ...styles[job.type?.toLowerCase()]}}>
              {job.type || 'Full-time'}
            </span>
            <span style={{...styles.badge, ...styles[job.status]}}>
              {job.status || 'active'}
            </span>
          </div>
        </div>

        <div style={styles.meta}>
          <span style={styles.department}>Department: {job.department}</span>
          <span style={styles.location}>Location:{job.location}</span>
          <span style={styles.date}>
            Posted: {new Date(job.posted_date).toLocaleDateString()}
          </span>
        </div>

        <div style={styles.section}>
          <h3>Description</h3>
          <p style={styles.description}>{job.description}</p>
        </div>

        <div style={styles.section}>
          <h3>Requirements</h3>
          <ul style={styles.requirements}>
            {job.requirements?.map((req, index) => (
              <li key={index} style={styles.requirementItem}>
                OK {req}
              </li>
            ))}
          </ul>
        </div>

        {user && (
          <div style={styles.actions}>
            <button onClick={handleEdit} style={styles.editBtn}>
              Edit Job
            </button>
            <button onClick={handleDelete} style={styles.deleteBtn}>
              Delete Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#4299e1',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: {
    margin: '0',
    fontSize: '28px',
    color: '#2d3748',
  },
  badges: {
    display: 'flex',
    gap: '8px',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  'full-time': {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  'part-time': {
    backgroundColor: '#fff3e0',
    color: '#e65100',
  },
  contract: {
    backgroundColor: '#e3f2fd',
    color: '#0d47a1',
  },
  active: {
    backgroundColor: '#c8e6c9',
    color: '#1b5e20',
  },
  closed: {
    backgroundColor: '#ffcdd2',
    color: '#b71c1c',
  },
  meta: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    fontSize: '14px',
    color: '#718096',
    flexWrap: 'wrap',
  },
  department: {
    backgroundColor: '#ebf4ff',
    padding: '2px 12px',
    borderRadius: '12px',
    color: '#2b6cb0',
  },
  location: {
    color: '#718096',
  },
  date: {
    color: '#a0aec0',
  },
  section: {
    marginTop: '24px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4a5568',
  },
  requirements: {
    listStyle: 'none',
    padding: '0',
  },
  requirementItem: {
    padding: '8px 0',
    color: '#4a5568',
    fontSize: '15px',
    borderBottom: '1px solid #f0f0f0',
  },
  actions: {
    marginTop: '32px',
    display: 'flex',
    gap: '12px',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0',
  },
  editBtn: {
    padding: '10px 24px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#3182ce',
    },
  },
  deleteBtn: {
    padding: '10px 24px',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#c53030',
    },
  },
};

export default JobDetail;