import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoomPage from "./pages/RoomPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/myRoom" element={<RoomPage />} />
    </Routes>
  );
};

export default App;
