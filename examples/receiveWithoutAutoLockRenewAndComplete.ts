import {
  OnMessage, OnError, MessagingError, delay, ServiceBusMessage, ReceiveMode, Namespace,
  MessageHandlerOptions
} from "../lib";
import * as dotenv from "dotenv";
import { } from '../lib/streamingReceiver';
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
  // Please note: Lock duration property on the Queue was set to 45 seconds.
  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    console.log(">>> Message: ", brokeredMessage);
    console.log("### Actual message:", brokeredMessage.body ? brokeredMessage.body.toString() : null);
    const time = 50000;
    console.log(">>>> Sleeping for %d seconds. Meanwhile autorenew of message lock should NOT happen.", time / 1000);
    await delay(time);
    try {
      await brokeredMessage.complete();
    } catch (err) {
      console.log("This should error, since the lock would have expired: %o.", err);
    }
  }
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const handlerOptions: MessageHandlerOptions = {
    autoComplete: false,
    maxAutoRenewDurationInSeconds: 0
  };
  const rcvHandler = client.receive(onMessage, onError, handlerOptions);
  await delay(30000000);
  await rcvHandler.stop();
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});