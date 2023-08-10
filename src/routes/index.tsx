import React from "react";
import { Route, NavLink, Routes, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Run from "../pages/Run";
import Edit from "../pages/Edit";
import Results from "../pages/Results";
import logo from '../logo.svg';

function MainLayout(props:any) {
  return (
    <div className="sjs-client-app">
      <header className="sjs-client-app__header">
        <img src={logo} className="sjs-client-app__logo" alt="logo" height={'50px'} />
        <NavBar />
      </header>
      <main className="sjs-client-app__content">
        {props.children ? props.children : <Outlet />}
      </main>
      <footer className="sjs-client-app__footer"></footer>
    </div>
  );
}
function SimpleLayout(props:any) {
  return (
    <div className="sjs-client-app">
      <main className="sjs-client-app__content">
        {props.children ? props.children : <Outlet />}
      </main>
      <footer className="sjs-client-app__footer"></footer>
    </div>
  );
}

export const NavBar = () => (
  <>
    <NavLink className="sjs-nav-button" to="/">
      <span>My Surveys</span>
    </NavLink>
    <NavLink className="sjs-nav-button" to="/about">
      <span>About</span>
    </NavLink>
  </>
);

const NoMatch = () => (
  <>
    <h1>404</h1>
  </>
);

const Content = (): React.ReactElement => (
  <>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/results/:id" element={<Results />}></Route>
        <Route element={<NoMatch />}></Route>
      </Route>
      <Route element={<SimpleLayout />}>
        <Route path="/run/:id" element={<Run />}></Route>
      </Route>
    </Routes>
  </>
);

export default Content;
