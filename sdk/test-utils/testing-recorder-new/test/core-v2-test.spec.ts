// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { TableEntity, TableClient } from "@azure/data-tables";
import { TestProxyHttpClient, recorderHttpPolicy } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
import { createSimpleEntity } from "./utils/utils";
config();

describe("Tests", () => {
  it.only("tables test", async function() {
    const file = (isNode ? "node_" : "browser_") + `core_v2_file_path.json`;
    const recorder = new TestProxyHttpClient(file);
    const client = TableClient.fromConnectionString(env.TABLES_SAS_CONNECTION_STRING, "newtable");
    client.pipeline.addPolicy(recorderHttpPolicy(recorder));
    await recorder.start();
    // await recorder.addSanitizer({ regex: "harshanstoragetest", value: "fakeaccount" });
    await recorder.addConnectionStringSanitizer({
      fakeConnString:
        "TableEndpoint=https://fakeaccountname.table.core.windows.net/;SharedAccessSignature=st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval",
      actualConnString: env.TABLES_SAS_CONNECTION_STRING
    });
    // console.log(await recorder.transformsInfo());
    await recorder.removeHeaderSanitizer(["x-ms-version", "X-Content-Type-Options"]);
    await client.createTable();
    const simpleEntity: TableEntity = createSimpleEntity();
    await client.createEntity(simpleEntity);
    await client.deleteTable();
    await recorder.stop();
  });
});
