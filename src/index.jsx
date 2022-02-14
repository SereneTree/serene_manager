import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login/Login';
import store from './redux/store'
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
