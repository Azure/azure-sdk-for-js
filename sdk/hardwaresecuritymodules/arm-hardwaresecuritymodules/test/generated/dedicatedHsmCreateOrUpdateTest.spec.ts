// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("create or Update a dedicated HSM in the specified subscription", () => {
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

  it("should create or Update a dedicated HSM in the specified subscription for createANewOrUpdateAnExistingDedicatedHSM", async function () {
    const result = await client.dedicatedHsm.createOrUpdate("hsm-group", "hsm1", {
      location: "westus",
      properties: {
        networkProfile: {
          networkInterfaces: [{ privateIpAddress: "1.0.0.1" }],
          subnet: {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
          },
        },
        stampId: "stamp01",
      },
      sku: { name: "SafeNet Luna Network HSM A790" },
      tags: { Dept: "hsm", Environment: "dogfood" },
    });
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

  it("should create or Update a dedicated HSM in the specified subscription for createANewOrUpdateAnExistingPaymentHSM", async function () {
    const result = await client.dedicatedHsm.createOrUpdate("hsm-group", "hsm1", {
      location: "westus",
      properties: {
        networkProfile: {
          networkInterfaces: [{ privateIpAddress: "1.0.0.1" }],
          subnet: {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
          },
        },
        stampId: "stamp01",
      },
      sku: { name: "payShield10K_LMK1_CPS60" },
      tags: { Dept: "hsm", Environment: "dogfood" },
    });
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

  it("should create or Update a dedicated HSM in the specified subscription for createANewOrUpdateAnExistingPaymentHSMWithManagementProfile", async function () {
    const result = await client.dedicatedHsm.createOrUpdate("hsm-group", "hsm1", {
      location: "westus",
      properties: {
        managementNetworkProfile: {
          networkInterfaces: [{ privateIpAddress: "1.0.0.2" }],
          subnet: {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
          },
        },
        networkProfile: {
          networkInterfaces: [{ privateIpAddress: "1.0.0.1" }],
          subnet: {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
          },
        },
        stampId: "stamp01",
      },
      sku: { name: "payShield10K_LMK1_CPS60" },
      tags: { Dept: "hsm", Environment: "dogfood" },
    });
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
