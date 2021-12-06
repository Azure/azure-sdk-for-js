// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, TableEntity } from "@azure/data-tables";
import { TestProxyHttpClient, recorderHttpPolicy } from "@azure-tools/test-recorder-new";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { SanitizerOptions } from "@azure-tools/test-recorder-new";
import { createSimpleEntity } from "../utils/utils";

// A fake connection string which replaces the actual connection string in the recording.
const fakeConnString =
  "TableEndpoint=https://fakeaccountname.table.core.windows.net/;SharedAccessSignature=st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval";
const sanitizerOptions: SanitizerOptions = {
  // We use a connection string sanitizer to remove the real connection string in the recording.
  connectionStringSanitizers: [
    {
      actualConnString: env.TABLES_SAS_CONNECTION_STRING,
      fakeConnString
    }
  ],
  // The removeHeaderSanitizer can be used to remove certain headers before saving a recording.
  removeHeaderSanitizer: { headersForRemoval: ["X-Content-Type-Options"] }
};

const recorderOptions = {
  envSetupForPlayback: {
    TABLES_SAS_CONNECTION_STRING: fakeConnString
  },
  sanitizerOptions
};

describe("Core V2 tests using unified recorder", () => {
  let recorder: TestProxyHttpClient;

  // Note the use of function() instead of an arrow function. This is important
  // since we pass `this.currentTest` to the client.
  beforeEach(async function(this: Context) {
    // Create an instance of recorder. We pass the current test as required by the client;
    // this value is used to determine the recording's location.
    recorder = new TestProxyHttpClient(this.currentTest);

    // Start the recorder using the options before each test.
    await recorder.start(recorderOptions);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("data-tables create entity", async function() {
    // Variables can be generated in record mode, and are stored with the recording to be reused
    // in playback mode.
    if (!isPlaybackMode()) {
      recorder.variables["table-name"] = `table${Math.ceil(Math.random() * 1000 + 1000)}`;
    }
    const client = TableClient.fromConnectionString(
      env.TABLES_SAS_CONNECTION_STRING,
      recorder.variables["table-name"]
    );

    // To set up the recorder with the core v2 pipeline, we add a HTTP policy which
    // redirects requests to use the proxy tool recorder.
    client.pipeline.addPolicy(recorderHttpPolicy(recorder));

    await client.createTable();
    const simpleEntity: TableEntity = createSimpleEntity();
    await client.createEntity(simpleEntity);
    await client.deleteTable();
  });
});
