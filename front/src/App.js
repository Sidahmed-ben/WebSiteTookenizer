import "./App.css";
import Parser from "./components/Parser";
import SearchPage from "./components/SearchPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/parser" element={<Parser></Parser>} />
        <Route path="/search-page" element={<SearchPage></SearchPage>} />
      </Routes>
    </div>
  );
}

export default App;
