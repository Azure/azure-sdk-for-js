import { HubClient } from "../";

import * as dotenv from "dotenv";
dotenv.config();

const chatHub = new HubClient(process.env.WPS_CONNECTION_STRING!, "chat");

async function main() {
  // send a text message to the entire hub
  await chatHub.broadcast("Hi there!");

  // send a text message to a particular group
  const adminGroup = chatHub.getGroupClient("admin");
  await adminGroup.broadcast("Hi admins!");

  // send binary data to the entire hub
  const data = new Uint8Array(10);
  for (let i = 0; i < 10; i++) {
    data[i] = i;
  }
  chatHub.broadcast(data.buffer);
}

main();
