// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { MonitorClient } from "../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Slis Operations", () => {
  let recorder: Recorder;
  let client: MonitorClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = new MonitorClient(new DefaultAzureCredential(), recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list SLIs by parent", async function () {
    const serviceGroupName = process.env.SERVICE_GROUP_NAME || "testSG";
    const items: any[] = [];
    for await (const item of client.slis.listByParent(serviceGroupName)) {
      items.push(item);
    }
    assert.isArray(items);
  });

  it("should not expose sloView operations", async function () {
    // Verify SloView is not part of the public API
    assert.notProperty(client, "sloView");
  });
});
