import { Namespace, delay, SendableMessageInfo } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path);
  const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now
  const messages: SendableMessageInfo[] = [
    { body: "Hello sb world!! 1" + scheduleTime.toString() },
    { body: "Hello sb world!! 2" + scheduleTime.toString() }
  ];
  const sequenceNumbers = await client.scheduleMessages(scheduleTime, messages);
  console.log("***********Created sender and sent the message... %o", sequenceNumbers);
  await delay(3000);
  console.log(">>>> Cancelling scheduled messages");
  await client.cancelScheduledMessages(sequenceNumbers);
  console.log(">>>>>>>> Done cancelling scheduled messages..");
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
