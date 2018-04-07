"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const str = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const path = process.env["EVENTHUB_NAME"] || "";
async function main() {
    const client = index_1.EventHubClient.createFromConnectionString(str, path);
    let info = await client.getHubRuntimeInformation();
    console.log("RuntimeInfo: ", info);
    await client.close();
}
main().catch((err) => {
    console.log("error: ", err);
});
//# sourceMappingURL=getHubRuntimeInfo.js.map