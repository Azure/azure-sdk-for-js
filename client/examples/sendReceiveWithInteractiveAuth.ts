import { EventHubClient, aadEventHubsAudience, EventPosition } from "azure-event-hubs";
import * as msrestAzure from "ms-rest-azure";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = "ENDPOINT";
const entityPath = "EVENTHUB_NAME";
const address = process.env[endpoint] || "";
const path = process.env[entityPath] || "";

async function main(): Promise<void> {
  // For now the interactive user needs to explicitly be assigned
  // the role of a constributor/owner even if the user is a subscription owner.
  // azure role assignment create -o contributor --scope /subscriptions/<subscriptionId>/resourceGroups/<rgName>/providers/Microsoft.EventHub/namespaces/<ehNamespaceName> --signInName <user@example.com>
  const credentials = await msrestAzure.interactiveLogin({ tokenAudience: aadEventHubsAudience });
  const client = EventHubClient.createFromAadTokenCredentials(address, path, credentials);
  await client.send({ body: "Hello awesome world!!" }, "0");
  const datas = await client.receiveBatch("0", 2, 5, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  console.log(">>> EventDataObjects: ", datas);
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
