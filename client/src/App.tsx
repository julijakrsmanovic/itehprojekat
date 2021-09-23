import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from './model';
import axios from 'axios';
import { Context, SERVER } from './util';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
axios.defaults.withCredentials = true;

function App() {

  const [user, setUser] = useState<User | undefined>(undefined)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(SERVER + '/check', { withCredentials: true }).then(res => {
      setUser({
        rel1: [],
        rel2: [],
        ...res.data
      });
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  return (
    <div>
      <Context.Provider value={{
        user,
        loading,
        setUser
      }}>
        <Navbar user={user} />
        <Routes user={user} />
      </Context.Provider>
    </div>
  );
}

export default App;
