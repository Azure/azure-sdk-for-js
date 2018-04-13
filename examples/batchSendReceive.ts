import { EventHubClient, EventData, EventPosition } from "../lib";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  console.log("Created EH client from connection string");
  const sender = await client.createSender("0");
  console.log("Created Sender for partition 0.");
  const receiver = await client.createReceiver("0", { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  receiver.on("message", (eventData: any) => {
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  });
  receiver.on("error", (error) => {
    console.log("Error occurred.. ", error);
  });
  console.log("Created Receiver for partition 0 and CG $default.");

  const messageCount = 5;
  let datas: EventData[] = [];
  for (let i = 0; i < messageCount; i++) {
    let obj: EventData = { body: `Hello foo ${i}` };
    datas.push(obj);
  }

  await sender.sendBatch(datas, 'pk1234656')
  console.log("message sent");
  await sender.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
