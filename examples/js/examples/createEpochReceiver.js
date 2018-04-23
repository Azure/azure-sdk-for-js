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
const azure_arm_event_hubs_1 = require("azure-arm-event-hubs");
const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = azure_arm_event_hubs_1.EventHubClient.createFromConnectionString(str, path);
        console.log("Created EH client from connection string");
        const onMessage = (eventData) => {
            console.log("@@@@ receiver with epoch 2.");
            console.log(">>> EventDataObject: ", eventData);
            console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
        };
        const onError = (err) => {
            console.log("@@@@ receiver with epoch 2.");
            console.log(">>>>> Error occurred for receiver with epoch 2: ", err);
        };
        client.receiveOnMessage("0", onMessage, onError, { epoch: 2 });
        console.log("$$$$ Waiting for 8 seconds to let receiver 1 set up and start receiving messages...");
        yield azure_arm_event_hubs_1.delay(8000);
        const onMessage2 = (eventData) => {
            console.log("@@@@ receiver with epoch 1.");
            console.log(">>> EventDataObject: ", eventData);
            console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
        };
        const onError2 = (err) => {
            console.log("@@@@ receiver with epoch 1.");
            console.log(">>>>> Error occurred for receiver with epoch 1: ", err);
        };
        console.log("$$$$ Will start receiving messages from receiver with epoch value 1...");
        client.receiveOnMessage("0", onMessage2, onError2, { epoch: 1 });
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
