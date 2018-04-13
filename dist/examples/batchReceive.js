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
        const receiver = yield client.createReceiver("0", { enableReceiverRuntimeMetric: true });
        console.log("Created Receiver for partition 0 and CG $default.");
        let result = yield receiver.receive(10);
        console.log(">>> EventDataObjects: ", result);
        let i = 0;
        for (let data of result) {
            console.log("### Actual message (%d):", ++i, data.body ? data.body.toString() : null);
        }
        yield receiver.close();
        yield client.close();
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=batchReceive.js.map