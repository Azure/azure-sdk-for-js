// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("list the operations for the provider", () => {
  let recorder: Recorder;
  let client: AzureDedicatedHSMResourceProvider;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list the operations for the provider for getAListOfPaymentHSMOperations", async function () {
    const resArray = new Array();
    for await (const item of client.operations.list()) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 2);
    assert.strictEqual(resArray[0].name, "Microsoft.HardwareSecurityModules/dedicatedhsms/read");
    assert.strictEqual(resArray[0].isDataAction, false);
    assert.strictEqual(resArray[0].origin, "system");
  });
});
