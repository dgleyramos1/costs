import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Container from './components/layout/Container';


const App = () => {
    return (
      <Router>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contato</NavLink>
          <NavLink to="/company">Company</NavLink>
          <NavLink to="/newproject">New Project</NavLink>
        </div>

        <Routes>
          <Container customClass="min-height">
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/company'>
              <Company />
            </Route>
            <Route exactpath='/contact'>
              <Contact />
            </Route>
            <Route exac={true} path='/newproject'>
              <NewProject />
            </Route>
          </Container>
        </Routes>
        <p>Footer</p>
      </Router>
    )
}

export default App;
