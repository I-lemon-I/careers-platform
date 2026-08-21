const JobFilters = ({ filters, onFilterChange }) => {
  const { search, department, status } = filters;

  const handleSearch = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    onFilterChange({ ...filters, department: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({ search: '', department: '', status: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={handleSearch}
          style={styles.input}
        />
        <select
          value={department}
          onChange={handleDepartmentChange}
          style={styles.select}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select
          value={status}
          onChange={handleStatusChange}
          style={styles.select}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
        <button onClick={clearFilters} style={styles.clearBtn}>
          Clear
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '24px',
  },
  filters: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '10px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '16px',
  },
  select: {
    padding: '10px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: 'white',
    minWidth: '150px',
  },
  clearBtn: {
    padding: '10px 20px',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default JobFilters;