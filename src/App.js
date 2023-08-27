import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherApp from "./component/WeatherApp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default App;
