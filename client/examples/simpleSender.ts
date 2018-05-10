import { EventHubClient, EventData } from "azure-event-hubs";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const data: EventData = {
    body: "Hello World!!"
  };
  const delivery = await client.send(data);
  console.log(">>> Sent the message successfully: ", delivery.id);
  // await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
