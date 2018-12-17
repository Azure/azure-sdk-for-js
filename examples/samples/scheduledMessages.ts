import { ReceiveMode, Namespace, generateUuid, QueueClient } from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;

async function sendMessages(queueClient: QueueClient, data: any[]): Promise<void> {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message = {
      body: `${element.firstName} ${element.name}`,
      label: "Scientist",
      timeToLive: 2 * 60 * 1000, // 2 minutes
      messageId: generateUuid()
    };
    const scheduledEnqueueTimeUtc = new Date(Date.now() + 30000 + index * 1000); // scheduling message to be sent (30 + index) seconds from now
    console.log(
      `>>>> Sending message:\t ${message.body}, scheduled for UTC: ${scheduledEnqueueTimeUtc}`
    );
    await queueClient.scheduleMessage(message, scheduledEnqueueTimeUtc);
  }
}

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  const data = [
    { name: "Einstein", firstName: "Albert" },
    { name: "Heisenberg", firstName: "Werner" },
    { name: "Curie", firstName: "Marie" },
    { name: "Hawking", firstName: "Steven" },
    { name: "Newton", firstName: "Isaac" },
    { name: "Bohr", firstName: "Niels" },
    { name: "Faraday", firstName: "Michael" },
    { name: "Galilei", firstName: "Galileo" },
    { name: "Kepler", firstName: "Johannes" },
    { name: "Kopernikus", firstName: "Nikolaus" }
  ];

  // schedule messages to appear on Queue at a later time.
  await sendMessages(client, data);

  // retrieve all the messages that were sent to the queue
  for (let index = 0; index < data.length; index++) {
    // retrieve one message at a time.
    const msg = await client.receiveBatch(1, 30 + index); // (30 + index) is the maximum wait time in seconds for which the Receiver will wait to receive the message.

    console.log(`Retrieved: ${msg[0].body} - ${msg[0].label}`);
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
