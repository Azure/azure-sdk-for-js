// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//

import { isPlaybackMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { QueueServiceClient } from "@azure/storage-queue";
import { TestProxyHttpClientCoreV1, env } from "@azure-tools/test-recorder-new";

// This fake URL will be used in the recording. We use a general regex sanitizer
// (below) to replace the real SAS URL from when we record the test with this
// fake version.
const fakeSASUrl =
  "https://account_name.queue.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2026-07-10T07:00:24Z&st=2021-07-09T23:00:24Z&spr=https&sig=fake_sig";

// These options are passed to the recorder for playback.
const recorderOptions = {
  envSetupForPlayback: {
    // In playback, we use the fake SAS URL instead of a real one which would have
    // been provided via the .env file or otherwise.
    STORAGE_SAS_URL: fakeSASUrl
  }
};

const sanitizers = {
  // There are several different sanitzers that can be used. A general regex sanitizer
  // allows for a simple find and replace based on a given regular expression. This is
  // used here to strip out the sensitive and dynamic parts of the SAS URL in the recording,
  // replacing them with their corresponding components from the fake SAS URL defined above.
  generalRegexSanitizers: [
    // This one replaces the host portion of the URL, which is dynamic based on the storage account...
    {
      regex: env.STORAGE_SAS_URL.split("/")[2],
      value: fakeSASUrl.split("/")[2]
    },
    // ...and this one replaces the query string which contains sensitive information relating to
    // the SAS token.
    {
      regex: env.STORAGE_SAS_URL.split("/")[3].split("?")[1],
      value: fakeSASUrl.split("/")[3].split("?")[1]
    }
  ]
};

console.log(env.STORAGE_SAS_URL.split("/")[3].split("?")[1]);

describe("Core V1 tests using unified recorder", () => {
  let recorder: TestProxyHttpClientCoreV1;

  // Note the use of function() instead of an arrow function. This is important
  // since we pass `this.currentTest` to the client.
  beforeEach(async function(this: Context) {
    // Create an instance of recorder. We pass the current test as required by the client;
    // this value is used to determine the recording's location.
    recorder = new TestProxyHttpClientCoreV1(this.currentTest);

    // Configure the recorder and start it up prior to each test...
    await recorder.start(recorderOptions);
    await recorder.addSanitizers(sanitizers);
  });

  afterEach(async () => {
    // ...and stop it when each test wraps up.
    await recorder.stop();
  });

  it("storage-queue create queue", async function() {
    // Along with specifying the necessary parameters for the QueueServiceClient, we pass through
    // the test proxy HTTP client, which mean that the client will use the recorder when making requests.
    const client = new QueueServiceClient(env.STORAGE_SAS_URL, undefined, { httpClient: recorder });

    // Variables can be generated in record mode, and are stored with the recording to be reused
    // in playback mode.
    if (!isPlaybackMode()) {
      recorder.variables["queue-name"] = `queue-${Math.ceil(Math.random() * 1000 + 1000)}`;
    }

    await client.createQueue(recorder.variables["queue-name"]);
  });
});
