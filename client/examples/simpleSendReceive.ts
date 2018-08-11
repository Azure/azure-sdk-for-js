import { EventHubClient, EventPosition, OnMessage, OnError, MessagingError, delay } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
let client: EventHubClient;
async function main(): Promise<void> {
  client = EventHubClient.createFromConnectionString(str, path);
  const ids = await client.getPartitionIds();
  const hub = await client.getHubRuntimeInformation();
  console.log(">>>> Hub: \n", hub);
  for (let i = 0; i < 1; i++) {
    const onMessage: OnMessage = (eventData: any) => {
      console.log(">>> EventDataObject: ", eventData);
      console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
    }
    const onError: OnError = (err: MessagingError | Error) => {
      console.log(">>>>> Error occurred: ", err);
    };
    //console.log(onMessage, onError);
    client.receive(ids[i], onMessage, onError, { enableReceiverRuntimeMetric: true, eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
    // giving some time for receiver setup to complete. This will make sure that the receiver can receive the newly sent
    // message from now onwards.
    await delay(3000);
    console.log("***********Created receiver %d", i);
    await client.send({ body: "Hello awesome world!!" + new Date().toString() }, ids[i]);
    console.log("***********Created sender %d and sent the message...", i);
    // Giving enough time for the receiver to receive the message...
    await delay(6000);
    //await rcvrHandler.stop();
  }
}

main().then(() => {
  return client.close();
}).catch((err) => {
  console.log("error: ", err);
});
