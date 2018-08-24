import { EventHubClient, EventData, EventPosition, OnMessage, OnError, MessagingError } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  console.log("Created EH client from connection string");
  console.log("Created Sender for partition 0.");
  let count = 0;
  const onMessage: OnMessage = (eventData: any) => {
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
    count++;
    if (count >= 5) {
      client.close();
    }
  }
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  client.receive("0", onMessage, onError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  console.log("Created Receiver for partition 0 and CG $default.");

  const messageCount = 5;
  let datas: EventData[] = [];
  for (let i = 0; i < messageCount; i++) {
    let obj: EventData = { body: `Hello foo ${i}` };
    datas.push(obj);
  }
  console.log("Sending batch message...");
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
  // where the body is a JSON object/array.
  // const datas = [
  //   { body: { "message": "Hello World 1" }, applicationProperties: { id: "Some id" }, partitionKey: "pk786" },
  //   { body: { "message": "Hello World 2" } },
  //   { body: { "message": "Hello World 3" } }
  // ];
  await client.sendBatch(datas, "0");
  console.log("message sent");
}

main().catch((err) => {
  console.log("error: ", err);
});
