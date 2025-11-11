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
      <h2>Users</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
