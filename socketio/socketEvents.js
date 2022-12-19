/** @format */

module.exports = {
  JOIN_ROOM: async (socket, data) => {
    socket.join(data);
  },
};
