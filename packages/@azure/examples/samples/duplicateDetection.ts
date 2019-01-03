import { ReceiveMode, Namespace, generateUuid, SendableMessageInfo } from "../../lib";
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

  const duplicateMsgId = generateUuid();

  const message1: SendableMessageInfo = {
    body: "body of message",
    timeToLive: 2 * 60 * 1000, // 2 minutes
    messageId: duplicateMsgId
  };

  const message2: SendableMessageInfo = {
    body: "body of message",
    timeToLive: 2 * 60 * 1000, // 2 minutes
    messageId: duplicateMsgId
  };

  console.log("Sending messages");
  // send 2 duplicated messages
  await client.send(message1);
  await client.send(message2);

  console.log("Retrieving messages");
  // try to get two messages from the queue. If the queue has duplicate detection enabled
  // you are only going to get one message back.
  const receivedMessages = await client.receiveBatch(2);

  if (receivedMessages.length > 1) {
    console.log(
      "Received more messages then expected. Is Duplicate Detection enabled on the queue?"
    );
  }

  await client.close();
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
