import { QueueClient, OnMessage, OnError, MessagingError, delay, Message, ReceiveMode } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "SERVICEBUS_CONNECTION_STRING";
const entityPath = "QUEUE_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
console.log("str: ", str);
console.log("path: ", path);

let client: QueueClient;
async function main(): Promise<void> {
  client = QueueClient.createFromConnectionString(str, path);
  await client.send({ body: "Hello awesome world!!" + new Date().toString() });
  console.log("***********Created sender and sent the message...");
  const onMessage: OnMessage = async (brokeredMessage: Message) => {
    console.log(">>> Message: ", brokeredMessage);
    console.log("### Actual message:", brokeredMessage.body ? brokeredMessage.body.toString() : null);
    console.log(">>>> Calling accept....");
    brokeredMessage._delivery!.accept();
  }
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  //console.log(onMessage, onError);
  client.receive(onMessage, onError, { receiveMode: ReceiveMode.receiveAndDelete });
  // giving some time for receiver setup to complete. This will make sure that the receiver can receive the newly sent
  // message from now onwards.
  await delay(6000);
  // Giving enough time for the receiver to receive the message...
  //await rcvrHandler.stop();
}

main().then(() => {
  console.log(">>>> Calling close....");
  return client.close();
}).catch((err) => {
  console.log("error: ", err);
});
