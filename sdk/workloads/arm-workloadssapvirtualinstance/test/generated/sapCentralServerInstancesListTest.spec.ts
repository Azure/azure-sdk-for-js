// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource", () => {
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

  it("should lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource for sapCentralInstancesListBySAPVirtualInstance", async function () {
    const resArray = new Array();
    for await (const item of client.sapCentralServerInstances.list("test-rg", "X00")) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 1);
    assert.strictEqual(resArray[0].name, "centralServer");
    assert.strictEqual(
      resArray[0].type,
      "Microsoft.Workloads/sapVirtualInstances/centralInstances",
    );
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/centralInstances/centralServer",
    );
    assert.strictEqual(resArray[0].location, "westcentralus");
  });
});
