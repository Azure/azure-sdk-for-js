import { isLiveMode, isPlaybackMode, env } from "@azure/test-utils-recorder";
import { TableEntity, TableClient } from "@azure/data-tables";
import { TestProxyHttpClient, testProxyHttpPolicy } from "@azure/test-utils-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
import { createSimpleEntity } from "./utils/utils";
config();

describe("Tests", () => {
  it("tables test", async function() {
    const file = (isNode ? "node_" : "browser_") + `core_v2_file_path.json`;
    console.log(`env.TEST_MODE = ${env.TEST_MODE}`);
    const recorder = new TestProxyHttpClient(file, isPlaybackMode());
    const client = TableClient.fromConnectionString(env.TABLES_SAS_CONNECTION_STRING, "newtable");
    if (!isLiveMode()) {
      client.pipeline.addPolicy(testProxyHttpPolicy(recorder));
    }
    if (!isLiveMode()) await recorder.start();
    await client.createTable();
    const simpleEntity: TableEntity = createSimpleEntity();
    await client.createEntity(simpleEntity);
    await client.deleteTable();
    if (!isLiveMode()) await recorder.stop();
  });
});
