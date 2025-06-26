import * as signalR from '@microsoft/signalr'
import { addRoomHandlers } from './roomHandlers';
import { addGameHandlers } from './gameHandlers';

const URL = "http://localhost:5253/hub";

class Connector {
    static instance = null

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build()
    }

    static getInstance(roomContext, moviesContext, navigate) {
        if (!Connector.instance) {
          Connector.instance = new Connector();
          addRoomHandlers(Connector.instance.connection, roomContext, navigate);
          addGameHandlers(Connector.instance.connection, moviesContext, navigate);
        }
    
        return Connector.instance;
    }

    async start() {
        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
            try {
                await this.connection.start();
            } catch(err) {
                console.log("SignalR Error: ")
            }
        }
    }
}

export default Connector.getInstance