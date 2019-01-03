import {
  ReceiveMode,
  Namespace,
  generateUuid,
  QueueClient,
  SendableMessageInfo,
  OnMessage,
  ServiceBusMessage,
  OnError,
  MessagingError,
  delay,
  ReceiveHandler
} from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;

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
      timeToLive: 2 * 60 * 1000, // 2 minutes
      messageId: generateUuid()
    };

    console.log(`Sending ${message.body}`);
    await queueClient.send(message);
  }
}

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });

  // populate the queue with messages
  await sendMessages(client);

  let rcvHandler: ReceiveHandler;

  // retrieve messages from the queue
  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    console.log(
      `### Received message: ${brokeredMessage.body ? brokeredMessage.body.toString() : undefined}`
    );
  };

  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  rcvHandler = client.receive(onMessage, onError);

  // wait 5 seconds
  await delay(5000);

  console.log("Stopping the receiver");
  await rcvHandler.stop();

  console.log("Closing the client");
  await client.close();
}

main()
  .then(() => {
    console.log("Closing the namespace");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
