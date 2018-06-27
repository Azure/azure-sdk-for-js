import { OnMessage, OnError, MessagingError, delay, Message, ReceiveMode, Namespace } from "../lib";
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
  const client = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock, maxConcurrentCalls: 1 });
  const onMessage: OnMessage = async (brokeredMessage: Message) => {
    console.log(">>> Message: ", brokeredMessage);
    console.log("### Actual message:", brokeredMessage.body ? brokeredMessage.body.toString() : null);
    if (brokeredMessage.body.toString() === "Hello sb world!!") {
      // console.log(">>>> Calling complete....");
      // brokeredMessage.complete();
      // console.log("???????????????????????????????????????????? completed the message....");
      //brokeredMessage.abandon();
      console.log("???????????????????????????????????????????? abandoned the message....");
      // brokeredMessage.defer();
      // console.log("???????????????????????????????????????????? defered the message....");
    } else {
      brokeredMessage.complete();
    }
  }
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  //console.log(onMessage, onError);
  client.receive(onMessage, onError, { autoComplete: true });
  // const msgs = await client.receiveBatch(10);
  // console.log(msgs);
  // giving some time for receiver setup to complete. This will make sure that the receiver can receive the newly sent
  // message from now onwards.
  await delay(30000);
  // Giving enough time for the receiver to receive the message...
  //await rcvrHandler.stop();
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});
