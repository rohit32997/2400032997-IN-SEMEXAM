import React, { useState } from 'react';
import './SortableTable.css'; // Optional: external CSS for better styling separation

const initialData = [
  { name: 'Alice', department: 'HR', salary: 55000 },
  { name: 'Bob', department: 'Engineering', salary: 75000 },
  { name: 'Charlie', department: 'Marketing', salary: 60000 },
  { name: 'Diana', department: 'Engineering', salary: 80000 },
  { name: 'Eve', department: 'HR', salary: 58000 },
];

const SortableTable = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortData = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  const getHeaderStyle = (key) => {
    if (sortConfig.key !== key) return {};
    return {
      textDecoration: 'underline',
      fontWeight: 'bold',
    };
  };

  return (
    <table className="sortable-table">
      <thead>
        <tr>
          <th onClick={() => sortData('name')} style={getHeaderStyle('name')}>
            Name
          </th>
          <th onClick={() => sortData('department')} style={getHeaderStyle('department')}>
            Department
          </th>
          <th onClick={() => sortData('salary')} style={getHeaderStyle('salary')}>
            Salary
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>${employee.salary.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
