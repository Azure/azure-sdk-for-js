// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { TableEntity, TableClient } from "@azure/data-tables";
import { TestProxyHttpClient, recorderHttpPolicy } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { createSimpleEntity } from "./utils/utils";
import { SanitizerOptions } from "@azure-tools/test-recorder-new";
config();

const fakeConnString =
  "TableEndpoint=https://fakeaccountname.table.core.windows.net/;SharedAccessSignature=st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval";
const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.TABLES_SAS_CONNECTION_STRING,
      fakeConnString
    }
  ],
  removeHeaderSanitizer: { headersForRemoval: ["X-Content-Type-Options"] },
  generalRegexSanitizers: [{ regex: "abc", value: "fake_abc" }]
};

describe("Core V2 tests", () => {
  let recorder: TestProxyHttpClient;

  beforeEach(async function() {
    recorder = new TestProxyHttpClient(this.currentTest);
    await recorder.start({
      envSetupForPlayback: {
        TABLES_SAS_CONNECTION_STRING: fakeConnString
      }
    });
    await recorder.addSanitizers(sanitizerOptions);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("data-tables create entity", async function() {
    const client = TableClient.fromConnectionString(env.TABLES_SAS_CONNECTION_STRING, "newtable");
    client.pipeline.addPolicy(recorderHttpPolicy(recorder));
    await client.createTable();
    const simpleEntity: TableEntity = createSimpleEntity();
    await client.createEntity(simpleEntity);
    await client.deleteTable();
  });
});
