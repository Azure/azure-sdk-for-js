import {
  OnMessage,
  OnError,
  MessagingError,
  delay,
  ServiceBusMessage,
  ReceiveMode,
  generateUuid,
  Namespace
} from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

async function main(): Promise<void> {
  await sendMessage();
  await receiveMessage();
}

async function sendMessage(): Promise<void> {
  const nsSend = Namespace.createFromConnectionString(str);
  const sendClient = nsSend.createQueueClient(path);
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
  try {
    for (let i = 0; i < data.length; i++) {
      var message = {
        body: JSON.stringify(data[i]),
        contentType: "application/json",
        label: "Scientist",
        messageId: generateUuid()
      };
      await sendClient.send(message);
      console.log("Sent message number:", i + 1);
    }
    console.log("\n>>>>>>> Total Sent messages: %d\n", data.length);
  } catch (err) {
    console.log("Error while sending", err);
  }
  return nsSend.close();
}

async function receiveMessage(): Promise<void> {
  const nsRcv = Namespace.createFromConnectionString(str);
  const receiveClient = nsRcv.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  try {
    const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
      if (
        brokeredMessage.label === "Scientist" &&
        brokeredMessage.contentType === "application/json"
      ) {
        console.log(
          "Message Received:",
          brokeredMessage.body ? brokeredMessage.body.toString() : null
        );
      }
      await brokeredMessage.complete();
    };
    const onError: OnError = (err: MessagingError | Error) => {
      console.log(">>>>> Error occurred: ", err);
    };
    const rcvHandler = receiveClient.receive(onMessage, onError, { autoComplete: false });
    await delay(10000);
    await rcvHandler.stop();
  } catch (err) {
    console.log("Error while receiving: ", err);
  }
  return nsRcv.close();
}

main()
  .then(() => {
    console.log("\n>>>> sample Done!!!!");
  })
  .catch((err) => {
    console.log("error: ", err);
  });
