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
const connectionString = "IOTHUB_CONNECTION_STRING";
const str = process.env[connectionString] || "";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield lib_1.EventHubClient.createFromIotHubConnectionString(str);
        let info = yield client.getHubRuntimeInformation();
        console.log("RuntimeInfo: ", info);
        let pInfo = yield client.getPartitionInformation(info.partitionIds[0]);
        console.log("Partition Information: ", pInfo);
        yield client.close();
    });
}
main().catch((err) => {
    console.log("error: ", err);
});
