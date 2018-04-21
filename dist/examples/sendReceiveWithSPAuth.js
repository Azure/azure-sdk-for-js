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
const cid = "CLIENT_ID";
const sec = "APPLICATION_SECRET";
const doma = "DOMAIN";
const clientId = process.env[cid] || "";
const secret = process.env[sec] || "";
const domain = process.env[doma] || "";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield msrestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, { tokenAudience: lib_1.aadEventHubsAudience });
        const client = lib_1.EventHubClient.createFromAadTokenCredentials(address, path, credentials);
        yield client.send({ body: "Hello awesome world!!" }, 0);
        const datas = yield client.receiveBatch("0", 2, 5, { eventPosition: lib_1.EventPosition.fromEnqueuedTime(Date.now()) });
        console.log(">>> EventDataObjects: ", datas);
        yield client.close();
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=sendReceiveWithSPAuth.js.map