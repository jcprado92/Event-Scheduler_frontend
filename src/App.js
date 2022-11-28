import React, { useEffect, useState } from "react";
import Clock from "./components/Clock";
import CreateSchedule from "./components/CreateSchedule";
import Schedules from "./components/Schedules";
import socketIO from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
//👉🏻 Import the functions from the Firebase.js file
import { getTokenFromFirebase, onMessageListener } from "./firebase";

const socket = socketIO.connect("http://localhost:4000");

const App = () => {
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    //👉🏻Logs the device token to the console
    getTokenFromFirebase();
    //👉🏻Listen and logs the push messages from the server.
    onMessageListener()
      .then((payload) => {
        console.log("From Message", payload);
      })
      .catch((err) => console.log("failed: ", err));

    socket.on("sendSchedules", (schedules) => {
      setSchedules(schedules);
    });
    //Listens for the notification from the server
    socket.on("notification", (data) => {
      toast.success(` It's time for ${data.title}`);
    });
  }, []);
  return (
    <div className="app__container">
      <Clock />
      <CreateSchedule socket={socket} />
      <Schedules schedules={schedules} />
      <ToastContainer />
    </div>
  );
};
export default App;
