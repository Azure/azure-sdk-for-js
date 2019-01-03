import {
  OnMessage,
  OnError,
  MessagingError,
  delay,
  ServiceBusMessage,
  ReceiveMode,
  Namespace
} from "../lib";
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
  // Please note: Lock duration property on the Queue was set to 45 seconds.
  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    console.log(">>> Message: ", brokeredMessage);
    console.log(
      "### Actual message:",
      brokeredMessage.body ? brokeredMessage.body.toString() : undefined
    );
    const time = 30000;
    console.log(
      ">>>> Sleeping for %d seconds. Meanwhile autorenew of message lock should happen.",
      time / 1000
    );
    await delay(time);
    console.log(
      ">>>> Sleeping for %d seconds again. Meanwhile autorenew of message lock should happen.",
      time / 1000
    );
    await delay(time);
    console.log(">>>> Now finally exiting from the message handler code...");
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const rcvHandler = client.receive(onMessage, onError, { maxAutoRenewDurationInSeconds: 350 });
  await delay(30000000);
  await rcvHandler.stop();
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
