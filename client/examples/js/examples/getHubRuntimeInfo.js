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
const str = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const path = process.env["EVENTHUB_NAME"] || "";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = azure_arm_event_hubs_1.EventHubClient.createFromConnectionString(str, path);
        let info = yield client.getHubRuntimeInformation();
        console.log("RuntimeInfo: ", info);
        yield client.close();
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
