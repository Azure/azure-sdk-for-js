// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableEntity, TableClient } from "@azure/data-tables";
import { Recorder, RecorderStartOptions, env, SanitizerOptions } from "@azure-tools/test-recorder";
import { createSimpleEntity, assertEnvironmentVariable } from "./utils/utils";

const fakeConnString =
  "TableEndpoint=https://fakeaccountname.table.core.windows.net/;SharedAccessSignature=st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval";
const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.TABLES_SAS_CONNECTION_STRING,
      fakeConnString,
    },
  ],
  removeHeaderSanitizer: { headersForRemoval: ["X-Content-Type-Options"] },
  generalSanitizers: [{ target: "abc", value: "fake_abc" }],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    TABLES_SAS_CONNECTION_STRING: fakeConnString,
  },
  sanitizerOptions,
};

describe("Core V2 tests", () => {
  let recorder: Recorder;

  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("data-tables create entity", async function () {
    const client = TableClient.fromConnectionString(
      assertEnvironmentVariable("TABLES_SAS_CONNECTION_STRING"),
      recorder.variable("table-name", `table${Math.ceil(Math.random() * 1000 + 1000)}`),
      recorder.configureClientOptions({})
    );
    await client.createTable();
    const simpleEntity: TableEntity = createSimpleEntity();
    await client.createEntity(simpleEntity);
    await client.deleteTable();
  });
});
