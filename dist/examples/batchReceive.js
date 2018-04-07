"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
async function main() {
    const client = lib_1.EventHubClient.createFromConnectionString(str, path);
    const receiver = await client.createReceiver("0", { enableReceiverRuntimeMetric: true });
    console.log("Created Receiver for partition 0 and CG $default.");
    let result = await receiver.receive(10);
    console.log(">>> EventDataObjects: ", result);
    let i = 0;
    for (let data of result) {
        console.log("### Actual message (%d):", ++i, data.body ? data.body.toString() : null);
    }
    await receiver.close();
    await client.close();
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=batchReceive.js.map