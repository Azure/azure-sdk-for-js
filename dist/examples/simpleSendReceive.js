"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
async function main() {
    const client = lib_1.EventHubClient.createFromConnectionString(str, path);
    const sender = await client.createSender("0");
    const ids = await client.getPartitionIds();
    const hub = await client.getHubRuntimeInformation();
    console.log(">>>> Hub: \n", hub);
    for (let i = 0; i < ids.length; i++) {
        console.log("***********Creating receiver %d", i);
        const receiver = await client.createReceiver(ids[i], { eventPosition: lib_1.EventPosition.fromEnqueuedTime(Date.now()) });
        console.log("***********Created receiver %d", i);
        receiver.on("message", async (eventData) => {
            console.log(">>> EventDataObject: ", eventData);
            console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
            await receiver.close();
        });
    }
    sender.send({ body: "Hello awesome world!!" + new Date().toString() });
    await sender.close();
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=simpleSendReceive.js.map