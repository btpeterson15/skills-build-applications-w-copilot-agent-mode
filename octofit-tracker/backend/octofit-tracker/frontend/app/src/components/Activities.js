import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || window.location.hostname.split('-')[0];
  const apiUrl = `https://${codespace}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
        console.log('API endpoint:', apiUrl);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-4 display-6">Activities</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.date}</td>
                  <td>{activity.user ? (activity.user.name || activity.user) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
