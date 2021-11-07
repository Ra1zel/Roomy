import "./App.css";
import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import socketIOClient, { Socket } from "socket.io-client";

const ENDPOINT = `http://${window.location.hostname}:4000`;

function RoomPage() {
  const plyrRef = useRef<ReactPlayer>(null);
  const [socket, setSocket] = useState<Socket>();
  const [myState, setMyState] = useState(false);
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    socket?.on("jumpVal", (val) => {
      console.log("client side:", val);
      if (plyrRef) {
        if (Math.abs(plyrRef.current!.getCurrentTime() - val) > 1) {
          plyrRef.current?.seekTo(val, "seconds");
          setMyState(true);
        }
      }
    });
  }, [socket]);
  const SearchBarRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    // setVidId(SearchBarRef.current?.value!);
    // SearchBarRef.current!.value = "";
  };

  const getTimeFromPause = () => {
    const f = plyrRef.current && plyrRef.current.getCurrentTime();
    console.log(f);
    socket?.emit("playerTime", f);
  };
  const getTimeFromPlay = () => {
    const f = plyrRef.current && plyrRef.current.getCurrentTime();
    console.log(f);
    socket?.emit("playerTime", f);
  };

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <form onSubmit={formSubmitHandler}>
          <input placeholder="enter video ID"></input>
          <button type="submit">Let's Watch</button>
        </form>
      </div>
      <ReactPlayer
        ref={plyrRef}
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        width="100%"
        height="800px"
        controls={true}
        onPause={getTimeFromPause}
        onPlay={getTimeFromPlay}
        playing={myState}
      />
    </div>
  );
}
export default RoomPage;
