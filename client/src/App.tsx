import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from './model';
import axios from 'axios';
import { SERVER } from './util';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
axios.defaults.withCredentials = true;
function App() {

  const [user, setUser] = useState<User | undefined>(undefined)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(SERVER + '/check', { withCredentials: true }).then(res => {
      setUser(res.data);
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  return (
    <div>
      <Navbar user={user} />
      <Routes user={user} />
    </div>
  );
}

export default App;
