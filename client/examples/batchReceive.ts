import { EventHubClient, EventData } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const result: EventData[] = await client.receiveBatch("0", 10, 20);
  console.log(">>> EventDataObjects: ", result);
  let i = 0;
  for (let data of result) {
    console.log("### Actual message (%d):", ++i, data.body ? data.body.toString() : null);
  }
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
