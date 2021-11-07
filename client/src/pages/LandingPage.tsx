import { useNavigate } from "react-router-dom";
import axios from "axios";
const LandingPage = () => {
  const navigate = useNavigate();
  const guestHandler = async () => {
    try {
      const response = await axios.post("http://localhost:4000/newGuestRoom");
      const roomId = response.data;
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <h1>this is the landing page</h1>
      <div>
        <button>create an Account</button>
        <button onClick={guestHandler}>Create room as guest</button>
        <button>Join Room as guest</button>
      </div>
    </div>
  );
};

export default LandingPage;
