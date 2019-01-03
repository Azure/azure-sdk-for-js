import { Namespace, generateUuid } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
const numberOfMessages: number = parseInt(process.env.MESSAGE_COUNT || "1");
console.log("str: ", str);
console.log("path: ", path);
console.log("Number of messages to send: %d", numberOfMessages);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path);
  for (let i = 0; i < numberOfMessages; i++) {
    await client.send({
      body: "Hello sb world!!" + new Date().toString(),
      messageId: generateUuid()
    });
    console.log(">>>>>> Sent message number: %d", i + 1);
  }
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
