"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const msrestAzure = require("ms-rest-azure");
const endpoint = "ENDPOINT";
const entityPath = "EVENTHUB_NAME";
const address = process.env[endpoint] || "";
const path = process.env[entityPath] || "";
async function main() {
    // For now the interactive user needs to explicitly be assigned
    // the role of a constributor/owner even if the user is a subscription owner.
    // azure role assignment create -o contributor --scope /subscriptions/<subscriptionId>/resourceGroups/<rgName>/providers/Microsoft.EventHub/namespaces/<ehNamespaceName> --signInName <user@example.com>
    const credentials = await msrestAzure.interactiveLogin({ tokenAudience: lib_1.aadEventHubsAudience });
    const client = lib_1.EventHubClient.createFromAadTokenCredentials(address, path, credentials);
    const sender = await client.createSender("0");
    const receiver = await client.createReceiver("0");
    sender.send({ body: "Hello awesome world!!" });
    receiver.on("message", (eventData) => {
        console.log(">>> EventDataObject: ", eventData);
        console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
    });
    await sender.close();
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=sendReceiveWithInteractiveAuth.js.map