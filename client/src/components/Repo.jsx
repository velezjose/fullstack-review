import React from 'react';

const Repo = ({ repo }) => {
  return (<div style={{borderTop: '1px solid gray'}}>
    <p style={{color: 'black'}}><a href={repo.url}>{repo.name}</a></p>
    <div style={{fontSize: 10}}>
      <p>Number of forks: {repo.forks}</p>
      <p>Created at: {repo.created_at}</p>
      <p>Owner ID: {repo.owner_id}</p>
    </div>
  </div>);
};

export default Repo;