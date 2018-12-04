import {
  OnSessionMessage, OnError, MessagingError, delay, ServiceBusMessage, ReceiveMode, Namespace
} from "../../lib";
import * as dotenv from "dotenv";
import { MessageSession } from '../../lib/session/messageSession';
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  const onMessage: OnSessionMessage = async (messageSession: MessageSession, brokeredMessage: ServiceBusMessage) => {
    console.log(">>> Message: ", brokeredMessage);
    console.log("### Actual message:", brokeredMessage.body ? brokeredMessage.body.toString() : undefined);
    // await brokeredMessage.complete();
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const messageSession = await client.acceptSession();
  messageSession.receive(onMessage, onError, { autoComplete: true });
  await delay(30000);
  await messageSession.close();
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});
