import './App.css';

import PrimeReact from 'primereact/api';

import AppContainer from './AppContainer';

PrimeReact.inputStyle = 'filled';
PrimeReact.zIndex = {
  modal: 1100, // dialog, sidebar
  overlay: 1000, // dropdown, overlaypanel
  menu: 1000, // overlay menus
  tooltip: 1100, // tooltip
  toast: 1200, // toast
};
PrimeReact.autoZIndex = true;

function App() {
  return <AppContainer />;
}

export default App;
