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
  const delivery = await client.send(data);
  console.log(">>> Sent the message successfully: ", delivery.tag.toString());
  console.log(delivery);
  console.log("Calling rhea-promise sender close directly. This should result in sender getting reconnected.");
  await ((Object.values((client as any)._context.senders)[0] as any)._sender as any).close();
  // await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
