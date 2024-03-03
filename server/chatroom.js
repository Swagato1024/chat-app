class Participant {
  #id;
  #name;
  #friends;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
    this.#friends = [];
  }

  get profile() {
    return {
      id: this.#id,
      name: this.#name,
    };
  }
}

class ChatRoom {
  #participants; // [{socket, participant}]
  #count;

  constructor() {
    this.#participants = [];
    this.#count = 0;
  }

  register(name, socket) {
    this.#count += 1;
    const participant = new Participant(this.#count, name);
    this.#participants.push({ socket, participant });

    socket.on("data", (data) => {
      this.#broadcast(name, data);
    });

    socket.on("end", () => {
      this.#broadcast(name, "left");
    });
  }

  #broadcast(name, data) {
    this.#participants.forEach(({ socket }) => {
      socket.write(
        `${name}: ${data} -> ${this.#participants.length}`
      );
    });
  }
}

module.exports = {
  ChatRoom,
  Participant,
};
