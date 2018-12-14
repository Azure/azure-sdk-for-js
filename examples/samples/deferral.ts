import {
  OnMessage,
  OnError,
  MessagingError,
  delay,
  ServiceBusMessage,
  ReceiveMode,
  generateUuid,
  Namespace,
  SendableMessageInfo
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
    { step: 1, title: "Shop" },
    { step: 2, title: "Unpack" },
    { step: 3, title: "Prepare" },
    { step: 4, title: "Cook" },
    { step: 5, title: "Eat" }
  ];
  var promises = new Array();
  for (let index = 0; index < data.length; index++) {
    const message: SendableMessageInfo = {
      body: data[index],
      label: "RecipeStep",
      contentType: "application/json",
      timeToLive: 2 * 60 * 1000, // 2 minutes
      messageId: generateUuid()
    };
    // the way we shuffle the message order is to introduce a tiny random delay before each of the messages is sent
    promises.push(
      delay(Math.random() * 30).then(async () => {
        try {
          await sendClient.send(message);
          console.log("Sent message step:", data[index].step);
        } catch (err) {
          console.log("Error while sending message", err);
        }
      })
    );
  }
  // wait until all the send tasks are complete
  await Promise.all(promises);
  nsSend.close();
}

async function receiveMessage(): Promise<void> {
  const nsRcv = Namespace.createFromConnectionString(str);
  const receiveClient = nsRcv.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  var deferredSteps = new Map();
  var lastProcessedRecipeStep = 0;
  try {
    const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
      if (
        brokeredMessage.label === "RecipeStep" &&
        brokeredMessage.contentType === "application/json"
      ) {
        const message = brokeredMessage.body;
        // now let's check whether the step we received is the step we expect at this stage of the workflow
        if (message.step == lastProcessedRecipeStep + 1) {
          console.log("Message Received:", message);
          lastProcessedRecipeStep++;
          await brokeredMessage.complete();
        } else {
          // if this is not the step we expected, we defer the message, meaning that we leave it in the queue but take it out of
          // the delivery order. We put it aside. To retrieve it later, we remeber its sequence number
          const sequenceNumber = brokeredMessage.sequenceNumber;
          deferredSteps.set(message.step, sequenceNumber);
          await brokeredMessage.defer();
        }
      } else {
        // we dead-letter the message if we don't know what to do with it.
        console.log(
          "Unknown message recieved, moving it to dead-letter queue ",
          brokeredMessage.body
        );
        await brokeredMessage.deadLetter();
      }
    };
    const onError: OnError = (err: MessagingError | Error) => {
      console.log(">>>>> Error occurred: ", err);
    };

    /*we are disabling autoComplete because we want to control the settling of the message i.e we want to control whether the message should be completed, deferred or deadlettered.*/
    const rcvHandler = receiveClient.receive(onMessage, onError, { autoComplete: false });
    await delay(10000);
    console.log("Deferred Messages count:", deferredSteps.size);
    // Now we process the deferrred messages
    while (deferredSteps.size > 0) {
      var step = lastProcessedRecipeStep + 1;
      const sequenceNumber = deferredSteps.get(step);
      const message = await receiveClient.receiveDeferredMessage(sequenceNumber);
      if (message) {
        console.log("Received Deferral Message:", message.body);
        await message.complete();
      } else {
        console.log("No message found for step number ", step);
      }
      deferredSteps.delete(step);
      lastProcessedRecipeStep++;
    }
    await rcvHandler.stop();
  } catch (err) {
    console.log("Error while receiving: ", err);
  }
  nsRcv.close();
}

main()
  .then(() => {
    console.log("\n>>>> sample Done!!!!");
  })
  .catch((err) => {
    console.log("error: ", err);
  });
