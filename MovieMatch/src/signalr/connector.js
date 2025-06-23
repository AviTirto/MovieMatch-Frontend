import * as signalR from "@microsoft/signalr";

const URL = "http://localhost:5253/hub";

export class Connector {
  static instance = null;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
  }

  async start() {
    if (this.connection.state !== 'Connected') {
      await this.connection.start();
    }
  }

  static getInstance() {
    if (!Connector.instance) {
      Connector.instance = new Connector();
    }
    return Connector.instance;
  }
}

export default Connector.getInstance();
