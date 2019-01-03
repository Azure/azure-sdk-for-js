// Enable partitions for the topics in the azure portal and then execute the sample.
// For partitioned queues, the topmost 16 bits of the SequenceNumber(64-bit unique integer assigned by ServiceBus for a message) reflect the partition id.
// The usual the ascending SequenceNumber characteristics is no longer guaranteed as the SequenceNumber depends on partitionKey(partitioned queues are distributed among different message brokers).
// Once you enable the partitions and execute the sample, you should be able to relate the SequenceNumbers corresponding to the same partitionKey.
// Read more on Partitioned queues and topics : https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-partitioning
import {
  delay,
  SendableMessageInfo,
  ReceiveMode,
  generateUuid,
  Namespace,
  ReceiveHandler,
  OnError,
  OnMessage,
  ServiceBusMessage,
  MessagingError
} from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log(`str: ${str}`);
console.log(`path: ${path}`);

async function main(): Promise<void> {
  await sendMessages();
  await receiveMessages();
}

async function sendMessages(): Promise<void> {
  const nsSend = Namespace.createFromConnectionString(str);
  const sendClient = nsSend.createQueueClient(path);
  const data = [
    { lastName: "Einstein", firstName: "Albert" },
    { lastName: "Einstein", firstName: "Elsa" },
    { lastName: "Curie", firstName: "Marie" },
    { lastName: "Curie", firstName: "Eve" },
    { lastName: "Curie", firstName: "Pierre" },
    { lastName: "Pavlov", firstName: "Ivan" },
    { lastName: "Bohr", firstName: "Niels" },
    { lastName: "Asimov", firstName: "Isaac" },
    { lastName: "Asimov", firstName: "David" },
    { lastName: "Faraday", firstName: "Michael" },
    { lastName: "Kopernikus", firstName: "Katharina" },
    { lastName: "Kopernikus", firstName: "Nikolaus" }
  ];
  try {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const message: SendableMessageInfo = {
        body: `${element.firstName} ${element.lastName}`,
        label: "Scientist",
        timeToLive: 2 * 60 * 1000, // After 2 minutes, the message will be removed from the queue
        messageId: generateUuid(),
        partitionKey: data[index].lastName.substring(0, 2) // The first two letters of the lastname is the partition key
      };
      console.log(`Sending ${message.body}`);
      await sendClient.send(message);
    }
    console.log("\n>>>>>>> Messages Sent !");
  } catch (err) {
    console.log("Error while sending", err);
  }
  return nsSend.close();
}

async function receiveMessages(): Promise<void> {
  const nsRcv = Namespace.createFromConnectionString(str);
  const receiveClient = nsRcv.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  try {
    let rcvHandler: ReceiveHandler;
    // retrieve messages from the queue
    const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
      console.log(
        ` \n### Received message:
        messageBody - ${brokeredMessage.body ? brokeredMessage.body.toString() : undefined},
        SequenceNumber - ${brokeredMessage.sequenceNumber},
        partitionKey - ${brokeredMessage.partitionKey}`
      );
    };

    const onError: OnError = (err: MessagingError | Error) => {
      console.log(">>>>> Error occurred: ", err);
    };

    rcvHandler = receiveClient.receive(onMessage, onError);

    // wait 5 seconds
    await delay(5000);

    console.log("Stopping the receiver");

    await rcvHandler.stop();

    console.log("Closing the client");
  } catch (err) {
    console.log("Error while receiving: ", err);
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
