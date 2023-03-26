import "./App.css";
import SearchPage from "./components/SearchPage";
import TextContent from "./components/TextContent";
import { Routes, Route } from "react-router-dom";

// Root application
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/text-content" element={<TextContent></TextContent>} />
        <Route path="/search-page" element={<SearchPage></SearchPage>} />
      </Routes>
    </div>
  );
}

export default App;
