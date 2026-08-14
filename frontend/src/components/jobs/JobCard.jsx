const JobCard = ({ job, onClick }) => {
  return (
    <div style={styles.card} onClick={onClick}>
      <h3 style={styles.title}>{job.title}</h3>
      <div style={styles.meta}>
        <span style={styles.department}>{job.department}</span>
        <span style={styles.location}>{job.location}</span>
      </div>
      <div style={styles.type}>
        <span style={{...styles.badge, ...styles[job.type?.toLowerCase()]}}>
          {job.type || 'Full-time'}
        </span>
        <span style={{...styles.badge, ...styles[job.status]}}>
          {job.status || 'active'}
        </span>
      </div>
      <p style={styles.description}>{job.description?.substring(0, 120)}...</p>
      <div style={styles.footer}>
        <span style={styles.postedDate}>
          Posted: {new Date(job.posted_date).toLocaleDateString()}
        </span>
        <button style={styles.viewBtn}>View Details</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    },
  },
  title: {
    margin: '0 0 12px 0',
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: '600',
  },
  meta: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#666',
  },
  department: {
    backgroundColor: '#ebf4ff',
    padding: '2px 10px',
    borderRadius: '12px',
    color: '#2b6cb0',
  },
  location: {
    color: '#718096',
  },
  type: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
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
  description: {
    color: '#555',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #f0f0f0',
  },
  postedDate: {
    fontSize: '12px',
    color: '#999',
  },
  viewBtn: {
    padding: '6px 16px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#3182ce',
    },
  },
};

export default JobCard;