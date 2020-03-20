import { HubClient } from "../";

import * as dotenv from "dotenv";
dotenv.config();

const chatHub = new HubClient(process.env.SIGNALR_CONNECTION_STRING!, "chat");

async function main() {
  // send a text message directly to a user
  await chatHub.sendToUser("bterlson", "Hi there!");

  // send a text message to a specific connection
  await chatHub.sendToUser("Tn3XcrAbHI0OE36XvbWwige4ac096c1", "Hi there!");
}

main();
