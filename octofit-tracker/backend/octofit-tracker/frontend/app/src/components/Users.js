import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || window.location.hostname.split('-')[0];
  const apiUrl = `https://${codespace}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
        console.log('API endpoint:', apiUrl);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-4 display-6">Users</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team ? (user.team.name || user.team) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
