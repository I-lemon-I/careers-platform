import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import JobCard from './JobCard';
import JobFilters from './JobFilters';

const emptyFilters = { search: '', department: '', status: '' };

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/jobs', { params: filters });
      setJobs(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleJobClick = (id) => {
    navigate(`/jobs/${id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Available Positions</h2>
        <button
          onClick={() => navigate('/jobs/create')}
          style={styles.createButton}
        >
          Post a Job
        </button>
      </div>

      <JobFilters filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <div style={styles.loading}>Loading jobs...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : jobs.length === 0 ? (
        <div style={styles.empty}>No jobs found</div>
      ) : (
        <div style={styles.grid}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => handleJobClick(job.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2d3748',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#718096',
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    color: '#c53030',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#718096',
    fontSize: '18px',
  },
};

export default JobList;