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
        const onMessage = (eventData) => __awaiter(this, void 0, void 0, function* () {
            console.log(">>> EventDataObject: ", eventData);
            console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
        });
        const onError = (err) => {
            console.log(">>>>> Error occurred: ", err);
        };
        const options = {
            eventPosition: azure_arm_event_hubs_1.EventPosition.fromEnqueuedTime(Date.now()),
            enableReceiverRuntimeMetric: true
        };
        const rcvHandler = client.receiveOnMessage("0", onMessage, onError, options);
        console.log("rcvHandler: ", rcvHandler.name);
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
