import { EventHubClient, EventData } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const data: EventData = {
    body: "Hello World!!"
  };
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
  // where the body is a JSON object/array.
  // const data = { body: { "message": "Hello World" } };
  const delivery = await client.send(data, "0");
  console.log(">>> Sent the message successfully: ", delivery.tag.toString());
  console.log(delivery);
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
