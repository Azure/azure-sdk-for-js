import { HubClient } from "../";

import * as dotenv from "dotenv";
dotenv.config();

const chatHub = new HubClient(process.env.SIGNALR_CONNECTION_STRING!, "chat");
const adminGroup = chatHub.getGroupClient("admin");

async function main() {
  // adding and removing users
  await adminGroup.addUser("bterlson");
  await adminGroup.hasUser("bterlson"); // true
  await adminGroup.removeUser("xirzec");

  // adding and removing specific connections
  await adminGroup.addConnection("Tn3XcrAbHI0OE36XvbWwige4ac096c1");
  await adminGroup.removeConnection("Tn3XcrAbHI0OE36XvbWwige4ac096c1");
}

main();
