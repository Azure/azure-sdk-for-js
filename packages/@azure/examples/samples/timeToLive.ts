import {
  delay,
  OnMessage,
  OnError,
  MessagingError,
  ServiceBusMessage,
  ReceiveMode,
  Namespace,
  SendableMessageInfo,
  generateUuid
} from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const queuePath = process.env.QUEUE_NAME || "";
const deadLetterQueuePath = Namespace.getDeadLetterQueuePathForQueue(queuePath);
const receiveClientTimeoutInMilliseconds = 10000;
console.log("str: ", str);
console.log("queue path: ", queuePath);
console.log("deadletter queue path: ", deadLetterQueuePath);

let ns: Namespace;

/*
  This sample demonstrates how TimeToLive property works. For more information, refer to
  https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-expiration
*/
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  // Send messages with TTL property assigned
  await sendMessage();

  // Expire the messages by waiting for 40 seconds
  await delay(40000);

  // Attempt to receive message from main queue
  // This will not show the message details that was sent, implying message got expired and removed
  await receiveMessageFromQueue(queuePath);

  // Attempt to receive message from DLQ
  // This will contain the message details that was sent, implying the message is moved to DLQ
  await receiveMessageFromQueue(deadLetterQueuePath);

  console.log("\n>>>> Calling close....");
  await ns.close();
  console.log("\n>>>> sample Done!!!!");
}

async function sendMessage(): Promise<void> {
  const recipeData = { name: "Limited Pineapple Icecream", type: "Dessert" };
  const client = ns.createQueueClient(queuePath);
  const messageBody = recipeData;
  const message: SendableMessageInfo = {
    body: messageBody,
    contentType: "application/json",
    label: "Recipe",
    timeToLive: 30 * 1000, // 30 seconds
    messageId: generateUuid()
  };
  await client.send(message);
  console.log(">>>>> Sent message with data", recipeData);
  await client.close();
}

async function receiveMessageFromQueue(givenQueuePath: string): Promise<void> {
  const client = ns.createQueueClient(givenQueuePath, { receiveMode: ReceiveMode.peekLock });

  const onMessageHandler: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    console.log(">>>>> Received message with data", brokeredMessage.body);
    await brokeredMessage.complete();
  };

  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };

  console.log("\n>>>>> Receiving message from queue", givenQueuePath);
  const receiverHandler = await client.receive(onMessageHandler, onError, { autoComplete: false });
  await delay(receiveClientTimeoutInMilliseconds);
  await receiverHandler.stop();
  console.log(">>>>> Done receiving message from queue", givenQueuePath);

  await client.close();
}

main().catch((err) => {
  console.log(">>>>> Error occurred: ", err);
  return ns.close();
});
