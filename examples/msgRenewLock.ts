import { OnMessage, OnError, MessagingError, delay, ServiceBusMessage, ReceiveMode, Namespace } from "../lib";
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
  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    console.log(">>> Message: ", brokeredMessage);
    console.log("### Actual message:", brokeredMessage.body ? brokeredMessage.body.toString() : null);
    const result = await client.renewLock(brokeredMessage);
    console.log("Renew Lock result is: %O", result);
    console.log("Locked Until: %s", brokeredMessage.lockedUntilUtc);
    console.log(">>>>>> Explicitly completing the message...");
    await delay(2000);
    brokeredMessage.complete();
  }
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const rcvHandler = client.receive(onMessage, onError, { autoComplete: false, });
  await delay(500000);
  await rcvHandler.stop();
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});
