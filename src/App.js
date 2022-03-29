import './App.css';
import { NavLink, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import ErrorBoundary from './components/ErrorBoundary';

const FancyHeader = styled.header({
  display: 'flex',
  boxShadow: ' 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);',
});

const newComponent = Component => {
  return function NewComponent(props) {
    return (
      <Component
        {...props}
        style={({ isActive }) => {
          return {
            display: 'block',
            margin: '20px 0px 20px 20px',
            color: isActive ? 'red' : '',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 18,
          };
        }}
      ></Component>
    );
  };
};

const MyNavLink = newComponent(NavLink);

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <FancyHeader>
          <MyNavLink to={'/'}> Home</MyNavLink>
          <MyNavLink to={'/movies'}> Movies</MyNavLink>
        </FancyHeader>
      </ErrorBoundary>

      <Outlet />
    </div>
  );
}

export default App;
