"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = lib_1.EventHubClient.createFromConnectionString(str, path);
        console.log("Created EH client from connection string");
        const receiver = yield client.createReceiver("0", { epoch: 2 });
        receiver.on("message", (eventData) => {
            console.log("@@@@ receiver 1: ", receiver.name);
            console.log(">>> EventDataObject: ", eventData);
            console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
        });
        const receiver2 = yield client.createReceiver("0", { epoch: 1 });
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
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=createEpochReceiver.js.map