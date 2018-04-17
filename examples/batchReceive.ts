import { EventHubClient, EventData } from "../lib";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const receiver = client.createReceiver("0", { enableReceiverRuntimeMetric: true });
  console.log("Created Receiver for partition 0 and CG $default.");
  let result: EventData[] = await receiver.receive(10, 20);
  console.log(">>> EventDataObjects: ", result);
  let i = 0;
  for (let data of result) {
    console.log("### Actual message (%d):", ++i, data.body ? data.body.toString() : null);
  }
  await receiver.close();
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
