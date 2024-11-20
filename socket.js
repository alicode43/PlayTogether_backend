export const handleSocketConnection = (io) => {
    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);
  
      socket.on("join", (data) => {
        console.log("Joining session:", data);
      });
  
      socket.on("play", (data) => {
        console.log("Play signal:", data);
      });
  
      socket.on("pause", (data) => {
        console.log("Pause signal:", data);
      });
    });
  };
  