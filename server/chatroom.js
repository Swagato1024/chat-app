class Participant {
  #id;
  #name;
  #friends;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  get profile() {
    return {
      id: this.#id,
      name: this.#name,
      friends: [...this.#friends],
    };
  }

  addFriend(friend) {
    this.#friends.push(friend);
  }
}

class ChatRoom {
  #participants;
  #count;

  constructor() {
    this.#participants = [];
    this.#count = 0;
  }

  register(name, onData) {
    this.#count += 1;
    const participant = new Participant(this.#count, name);
    this.#participants.push(participant, socket);

    onData();
  }

  broadcast(name) {
  }
}

module.exports = {
  ChatRoom,
  Participant,
};
