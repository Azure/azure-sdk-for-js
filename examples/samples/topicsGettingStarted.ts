import {
  OnMessage,
  OnError,
  MessagingError,
  delay,
  ServiceBusMessage,
  generateUuid,
  Namespace,
  SendableMessageInfo,
  SubscriptionClient,
  TopicClient
} from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const topic = process.env.TOPIC_NAME || "";
const subscription1 = process.env.SUBSCRIPTION_NAME1 || "";
const subscription2 = process.env.SUBSCRIPTION_NAME2 || "";
const subscription3 = process.env.SUBSCRIPTION_NAME3 || "";

console.log("str: ", str);
console.log("path: ", topic);
console.log("Subscription 1: ", subscription1);
console.log("Subscription 2: ", subscription2);
console.log("Subscription 3: ", subscription3);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createTopicClient(topic);

  const subscription1Client = ns.createSubscriptionClient(topic, subscription1);
  const subscription2Client = ns.createSubscriptionClient(topic, subscription2);
  const subscription3Client = ns.createSubscriptionClient(topic, subscription3);

  //we are setting up receive handlers here
  setupReceiveHandlers(subscription1Client);
  setupReceiveHandlers(subscription2Client);
  setupReceiveHandlers(subscription3Client);

  await sendMessage(client);

  await delay(2000);

  await subscription1Client.close();
  await subscription2Client.close();
  await subscription3Client.close();
}

async function sendMessage(client: TopicClient): Promise<void> {
  var data = [
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
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const message: SendableMessageInfo = {
      body: `${element.firstName} ${element.name}`,
      label: "Scientist",
      timeToLive: 2 * 60 * 1000, // 2 minutes
      messageId: generateUuid()
    };

    console.log(`Sending ${message.body} \n`);
    await client.send(message);
  }
}

async function setupReceiveHandlers(client: SubscriptionClient): Promise<void> {
  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    console.log(`subscription: ${client.name}  Retrieved: ${brokeredMessage.body}`);
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const rcvHandler = client.receive(onMessage, onError);
  await delay(10000);
  await rcvHandler.stop();
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
    return ns.close();
  });
