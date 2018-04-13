import { EventHubClient, aadEventHubsAudience } from "../lib";
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
  const receiver = await client.createReceiver("0");
  sender.send({ body: "Hello awesome world!!" });
  receiver.on("message", (eventData: any) => {
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  });
  await sender.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
