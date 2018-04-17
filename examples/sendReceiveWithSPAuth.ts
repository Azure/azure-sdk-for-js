import { EventHubClient, aadEventHubsAudience, EventPosition } from "../lib";
import * as msrestAzure from "ms-rest-azure";

const endpoint = "ENDPOINT";
const entityPath = "EVENTHUB_NAME";
const address = process.env[endpoint] || "";
const path = process.env[entityPath] || "";

const cid = "CLIENT_ID";
const sec = "APPLICATION_SECRET";
const doma = "DOMAIN";
const clientId = process.env[cid] || "";
const secret = process.env[sec] || "";
const domain = process.env[doma] || "";
async function main(): Promise<void> {
  const credentials = await msrestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, { tokenAudience: aadEventHubsAudience });
  const client = EventHubClient.createFromAadTokenCredentials(address, path, credentials);
  const sender = await client.createSender("0");
  const receiver = client.createReceiver("0", { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  sender.send({ body: "Hello awesome world!!" });
  const datas = await receiver.receive(2, 5);
  console.log(">>> EventDataObjects: ", datas);
  await sender.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
