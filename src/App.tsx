import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.scss";
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
