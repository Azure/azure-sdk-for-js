import {
  generateUuid,
  QueueClient,
  SendableMessageInfo,
  OnSessionMessage,
  OnError,
  MessagingError,
  delay,
  ServiceBusMessage,
  ReceiveMode,
  Namespace,
  MessageSession
} from "../../lib";
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

  await sendMessages(client, "session-1");
  await sendMessages(client, "session-2");
  await sendMessages(client, "session-3");
  await sendMessages(client, "session-4");

  await receiveMessages(client);

  await client.close();
  await ns.close();
}

async function sendMessages(queueClient: QueueClient, sessionId: string): Promise<void> {
  const data = [
    { step: 1, title: "Shop" },
    { step: 2, title: "Unpack" },
    { step: 3, title: "Prepare" },
    { step: 4, title: "Cook" },
    { step: 5, title: "Eat" }
  ];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message: SendableMessageInfo = {
      sessionId: sessionId,
      body: `${element.step} ${element.title}`,
      label: "RecipeStep",
      timeToLive: 2 * 60 * 1000, // 2 minutes
      messageId: generateUuid()
    };

    console.log(`Message sent: ${message.body} SessionId : ${sessionId}`);
    await queueClient.send(message);
  }
}

async function receiveMessages(queueClient: QueueClient): Promise<void> {
  const onMessage: OnSessionMessage = async (
    messageSession: MessageSession,
    brokeredMessage: ServiceBusMessage
  ) => {
    console.log(
      `Message received: ${brokeredMessage.body} SessionId : ${brokeredMessage.sessionId}`
    );
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  queueClient.receiveMessgesFromSessions(onMessage, onError);
  await delay(10000);
}

main()
  .then(() => {
    console.log("\n>>>> Sample Done!");
  })
  .catch((err) => {
    console.log("error: ", err);
    ns.close();
  });
