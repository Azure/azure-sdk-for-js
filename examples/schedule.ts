import { Namespace, delay } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "SERVICEBUS_CONNECTION_STRING";
const entityPath = "QUEUE_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path);
  const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now
  const sequenceNumber = await client.scheduleMessage(
    { body: "Hello sb world!!" + scheduleTime.toString() }, scheduleTime);
  console.log("***********Created sender and sent the message... %d", sequenceNumber);
  await delay(3000);
  console.log(">>>> Cancelling the scheduled message");
  await client.cancelScheduledMessage(sequenceNumber);
  console.log(">>>>>>>> Done cancelling the scheduled message..");
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});
