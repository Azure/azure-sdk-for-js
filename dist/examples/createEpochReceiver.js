"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
async function main() {
    const client = lib_1.EventHubClient.createFromConnectionString(str, path);
    console.log("Created EH client from connection string");
    const receiver = await client.createReceiver("0", { epoch: 2 });
    receiver.on("message", (eventData) => {
        console.log("@@@@ receiver 1: ", receiver.name);
        console.log(">>> EventDataObject: ", eventData);
        console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
    });
    const receiver2 = await client.createReceiver("0", { epoch: 1 });
    receiver2.on("message", (eventData) => {
        console.log("@@@@ receiver 2: ", receiver2.name);
        console.log(">>> EventDataObject 2: ", eventData);
        console.log("### Actual message 2:", eventData.body ? eventData.body.toString() : null);
    });
    receiver2.on("receiver_error", (err) => {
        console.log("From the sample");
        console.log(err);
    });
    // console.log("%%%%%%%%%%% Waiting for receiver 2")
    // setTimeout(async () => {
    //   const receiver2 = await client.createReceiver("0", { epoch: 1 });
    //   receiver2.on("message", (eventData: any) => {
    //     console.log("@@@@ receiver 2: ", receiver2.name);
    //     console.log(">>> EventDataObject 2: ", eventData);
    //     console.log("### Actual message 2:", eventData.body ? eventData.body.toString() : null);
    //   });
    // }, 2000);
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=createEpochReceiver.js.map