// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder } from "@azure-tools/test-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { DataLakeServiceClient } from "../../src";
import { recorderEnvSetup, getConnectionStringFromEnvironment } from "../utils";

dotenv.config();

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("can be created from AccountConnString", async () => {
    const newClient = DataLakeServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 1
        }
      }
    );

    const listIter = newClient.listFileSystems();
    await listIter.next();
    assert.ok(newClient.url.includes("dfs"));
  });
});
