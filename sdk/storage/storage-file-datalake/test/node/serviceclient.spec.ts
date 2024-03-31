// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

import { DataLakeServiceClient } from "../../src";
import {
  recorderEnvSetup,
  getConnectionStringFromEnvironment,
  configureStorageClient,
} from "../utils";

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can be created from AccountConnString", async () => {
    const newClient = DataLakeServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 1,
        },
      },
    );
    configureStorageClient(recorder, newClient);

    const listIter = newClient.listFileSystems();
    await listIter.next();
    assert.ok(newClient.url.includes("dfs"));
  });
});
