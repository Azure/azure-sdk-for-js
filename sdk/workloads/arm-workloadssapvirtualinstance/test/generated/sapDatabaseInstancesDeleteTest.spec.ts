// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error", () => {
  let recorder: Recorder;
  let client: WorkloadsClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new WorkloadsClient(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error for sapDatabaseInstancesDelete", async function () {
    await client.sapDatabaseInstances.delete("test-rg", "X00", "databaseServer");
    /* Test passes if no exception is thrown */
  });
});
