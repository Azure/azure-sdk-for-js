import { EventHubClient, aadEventHubsAudience, EventPosition } from "../lib";
import * as msrestAzure from "ms-rest-azure";

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
  const sender = client.createSender("0");
  const receiver = client.createReceiver("0", { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  sender.send({ body: "Hello awesome world!!" });
  const datas = await receiver.receive(2, 5);
  console.log(">>> EventDataObjects: ", datas);
  await sender.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
