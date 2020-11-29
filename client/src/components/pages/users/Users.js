import React from 'react'

import { useRouteMatch, Link, Switch, Route, useParams } from 'react-router-dom';

function Users() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

export default Users
