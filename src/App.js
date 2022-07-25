import './App.css';
import { LogBasic } from './component';
import { Login } from './component/Login'
import { STORAGEKEY, getCookie } from './utils/storage'

function App() {
  const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
  return (
    <div className="App">
      {
        token
          ?
          <LogBasic />
          :
          <Login />
      }

    </div>
  );
}

export default App;
