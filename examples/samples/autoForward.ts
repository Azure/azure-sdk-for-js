import { ReceiveMode, Namespace, generateUuid, SendableMessageInfo } from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const topic = process.env.TOPIC_NAME || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("topic: ", topic);
console.log("path: ", path);

let ns: Namespace;

// You need to setup a queue and a topic
// The topic needs to have a subcription that will forward the messages from the topic to the queue

// The sample assumes the topology described here is already setup.

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const topicSenderClient = ns.createTopicClient(topic);
  const queueClient = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });

  const message1: SendableMessageInfo = {
    body: "M1",
    timeToLive: 2 * 60 * 1000, // 2 minutes
    messageId: generateUuid()
  };

  const message2: SendableMessageInfo = {
    body: "M2",
    timeToLive: 2 * 60 * 1000, // 2 minutes
    messageId: generateUuid()
  };

  console.log("Sending messages");
  // send 2 messages
  await topicSenderClient.send(message1);
  await queueClient.send(message2);
  await topicSenderClient.close();

  console.log("Retrieving messages");
  // we should receive 2 messages from the queue since the auto-forward has been setup.
  const receivedMessages = await queueClient.receiveBatch(2);

  // make sure we received the right messages
  let receivedM1 = false;
  let receivedM2 = false;
  for (const m of receivedMessages) {
    if (m.body === "M1") {
      receivedM1 = true;
    }
    if (m.body === "M2") {
      receivedM2 = true;
    }

    // complete the message
    await m.complete();
  }

  if (receivedM1 && receivedM2) {
    console.log("Successfully received the autoforwarded message");
  }

  await queueClient.close();
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
