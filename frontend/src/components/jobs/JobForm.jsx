import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/client';

const emptyForm = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  description: '',
  requirements: '',
  status: 'active',
};

const JobForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEditing) return;

    let cancelled = false;
    const fetchJob = async () => {
      setFetching(true);
      try {
        const response = await api.get(`/jobs/${id}`);
        const job = response.data.data;
        if (!cancelled) {
          setFormData({
            title: job.title || '',
            department: job.department || '',
            location: job.location || '',
            type: job.type || 'Full-time',
            description: job.description || '',
            requirements: job.requirements?.join('\n') || '',
            status: job.status || 'active',
          });
        }
      } catch (err) {
        if (!cancelled) setError('Failed to load job for editing');
      } finally {
        if (!cancelled) setFetching(false);
      }
    };

    fetchJob();
    return () => {
      cancelled = true;
    };
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        requirements: formData.requirements
          .split('\n')
          .filter((req) => req.trim() !== ''),
      };

      if (isEditing) {
        await api.put(`/jobs/${id}`, dataToSubmit);
      } else {
        await api.post('/jobs', dataToSubmit);
      }

      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div style={styles.status}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/jobs')} style={styles.backBtn}>
        ← Back to Jobs
      </button>

      <div style={styles.card}>
        <h2 style={styles.title}>
          {isEditing ? 'Edit Job' : 'Create New Job'}
        </h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              rows="5"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Requirements (one per line)</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              style={styles.textarea}
              rows="4"
              placeholder={'5+ years experience\nNode.js\nVue.js'}
            />
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '24px 20px' },
  status: { textAlign: 'center', padding: '40px', color: '#718096' },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#4299e1',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: { margin: '0 0 24px 0', fontSize: '24px', color: '#2d3748' },
  error: {
    backgroundColor: '#fed7d7',
    color: '#c53030',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '16px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '14px', fontWeight: '500', color: '#4a5568' },
  input: {
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '16px',
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  textarea: {
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '16px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  cancelBtn: {
    padding: '10px 24px',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '10px 24px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default JobForm;