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
const storageConnectionString = "STORAGE_CONNECTION_STRING";
const ehconnectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const path = process.env[entityPath] || "";
const storageCS = process.env[storageConnectionString];
const ehCS = process.env[ehconnectionString];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create the Event Processo Host
        const eph = lib_1.EventProcessorHost.createFromConnectionString(lib_1.EventProcessorHost.createHostName("my-host"), storageCS, ehCS, {
            eventHubPath: path
        });
        // Message event handler
        const onMessage = (context, data) => {
            console.log(">>>>> Rx message from '%s': '%s'", context.partitionId, data.body);
            return context.checkpoint();
        };
        // Error event handler
        const onError = (error) => {
            console.log(">>>>> Received Error: %O", error);
        };
        // Register the event handlers
        eph.on(lib_1.EventProcessorHost.message, onMessage);
        eph.on(lib_1.EventProcessorHost.error, onError);
        // start the EPH
        yield eph.start();
        // After some time let' say 2 minutes
        yield lib_1.delay(120000);
        // This will stop the EPH.
        yield eph.stop();
    });
}
main().catch((err) => {
    console.log(err);
});
