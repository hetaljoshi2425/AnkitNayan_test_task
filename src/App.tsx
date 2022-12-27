import { BrowserRouter } from "react-router-dom";
import { RouteWrapper } from './Routes/RouteWrapper';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
