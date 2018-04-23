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
        console.log("Created Sender for partition 0.");
        let count = 0;
        const onMessage = (eventData) => {
            console.log(">>> EventDataObject: ", eventData);
            console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
            count++;
            if (count >= 5) {
                client.close();
            }
        };
        const onError = (err) => {
            console.log(">>>>> Error occurred: ", err);
        };
        client.receiveOnMessage("0", onMessage, onError, { eventPosition: azure_arm_event_hubs_1.EventPosition.fromEnqueuedTime(Date.now()) });
        console.log("Created Receiver for partition 0 and CG $default.");
        const messageCount = 5;
        let datas = [];
        for (let i = 0; i < messageCount; i++) {
            let obj = { body: `Hello foo ${i}` };
            datas.push(obj);
        }
        console.log("Sending batch message...");
        yield client.sendBatch(datas, "0");
        console.log("message sent");
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
