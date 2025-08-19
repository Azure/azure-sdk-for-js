// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("gets the specified Azure dedicated HSM", () => {
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

  it("should gets the specified Azure dedicated HSM for getADedicatedHSM", async function () {
    const result = await client.dedicatedHsm.get("hsm-group", "hsm1");
    assert.ok(result);
    assert.strictEqual(result.name, "hsm1");
    assert.strictEqual(result.type, "Microsoft.HardwareSecurityModules/dedicatedHSMs");
    assert.strictEqual(
      result.id,
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/hsm1",
    );
    assert.strictEqual(result.location, "westus");
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
    assert.strictEqual(result.properties.stampId, "stamp01");
    assert.strictEqual(result.properties.statusMessage, "DedicatedHsm device is functional.");
  });

  it("should gets the specified Azure dedicated HSM for getAPaymentHSM", async function () {
    const result = await client.dedicatedHsm.get("hsm-group", "hsm1");
    assert.ok(result);
    assert.strictEqual(result.name, "hsm1");
    assert.strictEqual(result.type, "Microsoft.HardwareSecurityModules/dedicatedHSMs");
    assert.strictEqual(
      result.id,
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/hsm1",
    );
    assert.strictEqual(result.location, "westus");
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
    assert.strictEqual(result.properties.stampId, "stamp01");
    assert.strictEqual(result.properties.statusMessage, "DedicatedHsm device is functional.");
  });

  it("should gets the specified Azure dedicated HSM for getAPaymentHSMWith20181031PreviewApiVersion", async function () {
    const result = await client.dedicatedHsm.get("hsm-group", "hsm1");
    assert.ok(result);
    assert.strictEqual(result.name, "hsm1");
    assert.strictEqual(result.type, "Microsoft.HardwareSecurityModules/dedicatedHSMs");
    assert.strictEqual(
      result.id,
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/hsm1",
    );
    assert.strictEqual(result.location, "westus");
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
    assert.strictEqual(result.properties.stampId, "stamp01");
    assert.strictEqual(result.properties.statusMessage, "DedicatedHsm device is functional.");
  });
});
