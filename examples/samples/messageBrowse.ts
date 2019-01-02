import { SendableMessageInfo, QueueClient, ReceiveMode, generateUuid, Namespace } from "../../lib";
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

  // populate the queue with messages
  await sendMessages(client);
  // browse those messages
  await peekMessages();
}

async function sendMessages(queueClient: QueueClient): Promise<void> {
  const data: { lastName: string; firstName: string }[] = [
    { lastName: "Einstein", firstName: "Albert" },
    { lastName: "Heisenberg", firstName: "Werner" },
    { lastName: "Curie", firstName: "Marie" },
    { lastName: "Hawking", firstName: "Steven" },
    { lastName: "Newton", firstName: "Isaac" },
    { lastName: "Bohr", firstName: "Niels" },
    { lastName: "Faraday", firstName: "Michael" },
    { lastName: "Galilei", firstName: "Galileo" },
    { lastName: "Kepler", firstName: "Johannes" },
    { lastName: "Kopernikus", firstName: "Nikolaus" }
  ];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message: SendableMessageInfo = {
      body: `${element.firstName} ${element.lastName}`,
      label: "Scientist",
      timeToLive: 2 * 60 * 1000, // After 2 minutes, the message will be removed from the queue
      messageId: generateUuid()
    };

    console.log(`Sending ${message.body}`);
    await queueClient.send(message);
  }
}

async function peekMessages(): Promise<void> {
  const nsRcv = Namespace.createFromConnectionString(str);
  const receiveClient = nsRcv.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  console.log("Browsing messages from Queue...");

  try {
    const count = 10;
    const peekedMessages = await receiveClient.peek(count);
    for (let i = 0; i < count; i++) {
      console.log(
        `Peeked message ${i}:
          ID - ${peekedMessages[i].messageId} ,
          messageBody - ${peekedMessages[i].body},
          label - ${peekedMessages[i].label}`
      );
    }
    console.log("\n>>>> Browsed the Messages.\n");
  } catch (err) {
    console.log("Error while peeking: ", err);
  }
  return nsRcv.close();
}

main()
  .then(() => {
    console.log("\n>>>> Done!!!!");
  })
  .catch((err) => {
    console.log("error: ", err);
  });
