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
let client;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        client = azure_arm_event_hubs_1.EventHubClient.createFromConnectionString(str, path);
        const ids = yield client.getPartitionIds();
        const hub = yield client.getHubRuntimeInformation();
        console.log(">>>> Hub: \n", hub);
        for (let i = 0; i < ids.length; i++) {
            const onMessage = (eventData) => __awaiter(this, void 0, void 0, function* () {
                console.log(">>> EventDataObject: ", eventData);
                console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
            });
            const onError = (err) => {
                console.log(">>>>> Error occurred: ", err);
            };
            //console.log(onMessage, onError);
            client.receive(ids[i], onMessage, onError, { eventPosition: azure_arm_event_hubs_1.EventPosition.fromEnqueuedTime(Date.now()) });
            // giving some time for receiver setup to complete. This will make sure that the receiver can receive the newly sent
            // message from now onwards.
            yield azure_arm_event_hubs_1.delay(3000);
            console.log("***********Created receiver %d", i);
            yield client.send({ body: "Hello awesome world!!" + new Date().toString() }, ids[i]);
            console.log("***********Created sender %d and sent the message...", i);
            // Giving enough time for the receiver to receive the message...
            yield azure_arm_event_hubs_1.delay(6000);
            //await rcvrHandler.stop();
        }
    });
}
main().then(() => {
    return client.close();
}).catch((err) => {
    console.log("error: ", err);
});
