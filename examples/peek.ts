import { ReceiveMode, Namespace } from "../lib";
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
  const client = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  const result = await client.peek();
  console.log(">>> Number of messages: %d", result.length);
  console.log(result);
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});
