import { ReceiveMode, Namespace } from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  const messageSession = await client.acceptSession({ sessionId: "session-1" });
  const result = await messageSession.peek(10);
  console.log(">>> Peeked messages for sessionId '%s': %O", messageSession.sessionId, result);
  console.log(">>> Number of messages for sessionId '%s': %d", messageSession.sessionId,
    result.length);
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});
