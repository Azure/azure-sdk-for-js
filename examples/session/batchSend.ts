import { Namespace, SendableMessageInfo } from "../../lib";
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
  let messages: SendableMessageInfo[] = [];

  for (let i = 0; i < 10; i++) {
    const sessionId = i % 2 === 0 ? "even-session" : "odd-session";
    messages.push({
      body: "Hello sb world!!" + `-${i}-` + new Date().toString(),
      sessionId: sessionId
    });
  }
  await client.sendBatch(messages);
  console.log("***********Created sender and sent messages...");
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
