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
const msrestAzure = require("ms-rest-azure");
const endpoint = "ENDPOINT";
const entityPath = "EVENTHUB_NAME";
const address = process.env[endpoint] || "";
const path = process.env[entityPath] || "";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // For now the interactive user needs to explicitly be assigned
        // the role of a constributor/owner even if the user is a subscription owner.
        // azure role assignment create -o contributor --scope /subscriptions/<subscriptionId>/resourceGroups/<rgName>/providers/Microsoft.EventHub/namespaces/<ehNamespaceName> --signInName <user@example.com>
        const credentials = yield msrestAzure.interactiveLogin({ tokenAudience: lib_1.aadEventHubsAudience });
        const client = lib_1.EventHubClient.createFromAadTokenCredentials(address, path, credentials);
        const sender = yield client.createSender("0");
        const receiver = yield client.createReceiver("0");
        sender.send({ body: "Hello awesome world!!" });
        receiver.on("message", (eventData) => {
            console.log(">>> EventDataObject: ", eventData);
            console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
        });
        yield sender.close();
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=sendReceiveWithInteractiveAuth.js.map