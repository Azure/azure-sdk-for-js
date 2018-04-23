import { EventHubClient, EventData, EventPosition, OnMessage, OnError, EventHubsError } from "azure-arm-event-hubs";

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
  const onError: OnError = (err: EventHubsError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  client.receiveOnMessage("0", onMessage, onError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  console.log("Created Receiver for partition 0 and CG $default.");

  const messageCount = 5;
  let datas: EventData[] = [];
  for (let i = 0; i < messageCount; i++) {
    let obj: EventData = { body: `Hello foo ${i}` };
    datas.push(obj);
  }
  console.log("Sending batch message...");
  await client.sendBatch(datas, "0");
  console.log("message sent");
}

main().catch((err) => {
  console.log("error: ", err);
});
