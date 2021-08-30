/* eslint-disable class-methods-use-this */
import { io } from 'socket.io-client';

class ClientApi {
  constructor(cfg) {
    Object.assign(this, {
      ...cfg,
      game: cfg.game,
    });
  }

  connect() {
    const { url, path } = this;

    this.io = io(url, {
      path,
    });

    this.io.on('welcome', this.onWelcome);
    this.io.on('join', this.onJoin.bind(this));
  }

  // eslint-disable-next-line no-unused-vars
  onWelcome(serverStatus) {}

  onJoin(player) {
    this.game.createCurrentPlayer(player.player);
  }

  join(playerName) {
    this.io.emit('join', playerName);
  }
}

export default ClientApi;
