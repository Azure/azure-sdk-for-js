/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { DeviceRegistryManagementClient } from "../../src/deviceRegistryManagementClient.js";
import type {
  Credential,
  Policy,
  PolicyUpdate,
  NamespaceDevice,
  DeviceCredentialsRevokeRequest,
  ActivateBringYourOwnRootRequest,
} from "../../src/index.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

/**
 * Checks required environment variables and logs them.
 *
 * Before running, set the following env vars in your shell:
 *   $env:AZURE_TENANT_ID = "<your-tenant-id>"
 *   $env:SUBSCRIPTION_ID = "<your-subscription-id>"
 *   $env:TEST_MODE = "live"               # or "playback" / "record"
 *   $env:RESOURCE_GROUP_NAME = "<rg>"      # e.g. "adr-sdk-test-cms-async1"
 *   $env:LOCATION = "<region>"             # e.g. "eastus2euap"
 */
function checkAndSetTestEnvironment(): void {
  console.log("[test-env] AZURE_TENANT_ID:", process.env.AZURE_TENANT_ID ?? "(not set)");
  console.log("[test-env] SUBSCRIPTION_ID:", process.env.SUBSCRIPTION_ID ?? "(not set)");
  console.log("[test-env] TEST_MODE:", process.env.TEST_MODE ?? "(not set)");
  console.log("[test-env] RESOURCE_GROUP_NAME:", process.env.RESOURCE_GROUP_NAME ?? "(not set)");
  console.log("[test-env] LOCATION:", process.env.LOCATION ?? "(not set)");
}

// PREREQUISITES
// =============
// Create RG, UAMI, ADR Namespace, IoT Hub, and DPS with ADR Integration BEFORE running in Record/Live mode.
// Use the helper scripts (from the .NET SDK tests/Scripts/):
//   Setup:    .\tests\Scripts\Setup-CmsTestPrerequisites.ps1 -Suffix both -Iteration <N> -NoPrompt
//   Teardown: .\tests\Scripts\Teardown-CmsTestPrerequisites.ps1 -Suffix both -Iteration <N> -Force
// To run just this test:
//   npx vitest run test/public/deviceregistry_credentials_and_policies_flow_test.spec.ts --reporter=verbose

describe("DeviceRegistry Credentials and Policies Flow tests", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let resourceGroupName: string;
  let location: string;
  let client: DeviceRegistryManagementClient;

  // Resource names — must match what the prerequisite scripts create.
  const iteration = "1";
  const suffix = `async${iteration}`;
  const namespaceName = `cms-test-namespace-${suffix}`;
  const policyName = `cms-test-policy-${suffix}`;
  const byorPolicyName = `cms-test-byor-policy-${suffix}`;
  const deviceName = `cms-test-device-${suffix}`;

  checkAndSetTestEnvironment();

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = process.env.SUBSCRIPTION_ID!;
    resourceGroupName = process.env.RESOURCE_GROUP_NAME!;
    location = process.env.LOCATION!;

    const credential = createTestCredential({
      tenantId: process.env.AZURE_TENANT_ID,
    });
    client = new DeviceRegistryManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it.skipIf(isPlaybackMode())("Credential and Policy full flow", async () => {
    // Step 1: Verify the pre-created namespace exists
    console.log(`Step 1: Getting namespace '${namespaceName}'...`);
    const namespaceResource = await client.namespaces.get(resourceGroupName, namespaceName);
    assert.isNotNull(namespaceResource);
    assert.equal(namespaceResource.location, location);
    assert.equal(namespaceResource.name, namespaceName);
    console.log("  ✓ Namespace retrieved successfully");

    // Step 2: Create or get Credential
    console.log("Step 2: Creating credential...");
    let credentialResource: Credential;
    try {
      credentialResource = await client.credentials.get(resourceGroupName, namespaceName);
      console.log("  Credential already exists, retrieved");
    } catch {
      const credentialData: Credential = {
        location,
      };
      const credentialPoller = client.credentials.createOrUpdate(
        resourceGroupName,
        namespaceName,
        credentialData,
        testPollingOptions,
      );
      credentialResource = await credentialPoller.pollUntilDone();
      console.log("  ✓ Credential created successfully");
    }
    assert.isNotNull(credentialResource);

    // Step 3: Clean up existing policies (1 policy/credential limit), then create a new one
    console.log(`Step 3: Cleaning up existing policies and creating '${policyName}'...`);
    const existingPolicies: Policy[] = [];
    for await (const p of client.policies.listByResourceGroup(resourceGroupName, namespaceName)) {
      existingPolicies.push(p);
    }

    if (existingPolicies.length > 0) {
      console.log(`  Found ${existingPolicies.length} existing policy(ies) — deleting...`);
      for (const existingPolicy of existingPolicies) {
        console.log(`    Deleting policy '${existingPolicy.name}'...`);
        const deletePoller = client.policies.delete(
          resourceGroupName,
          namespaceName,
          existingPolicy.name!,
          testPollingOptions,
        );
        await deletePoller.pollUntilDone();
        console.log(`    ✓ Deleted '${existingPolicy.name}'`);
      }
    }

    // Create certificate configuration
    console.log("  Creating new policy with ECC certificate (90-day validity)...");
    const policyData: Policy = {
      properties: {
        certificate: {
          certificateAuthorityConfiguration: {
            keyType: "ECC",
          },
          leafCertificateConfiguration: {
            validityPeriodInDays: 90,
          },
        },
      },
    };

    const policyPoller = client.policies.createOrUpdate(
      resourceGroupName,
      namespaceName,
      policyName,
      policyData,
      testPollingOptions,
    );
    let policyResource = await policyPoller.pollUntilDone();
    assert.isNotNull(policyResource);
    assert.equal(policyResource.name, policyName);
    console.log("  ✓ Policy created successfully");

    // Verify certificate configuration
    assert.isNotNull(policyResource.properties);
    assert.isNotNull(policyResource.properties!.certificate);
    assert.equal(
      policyResource.properties!.certificate!.certificateAuthorityConfiguration.keyType,
      "ECC",
    );
    assert.equal(
      policyResource.properties!.certificate!.leafCertificateConfiguration.validityPeriodInDays,
      90,
    );
    assert.equal(policyResource.properties!.provisioningState, "Succeeded");
    console.log("  ✓ Certificate: ECC key type, 90-day validity, provisioning Succeeded");

    // Test Policy List operation
    console.log("  Testing LIST operation...");
    const allPolicies: Policy[] = [];
    for await (const policy of client.policies.listByResourceGroup(
      resourceGroupName,
      namespaceName,
    )) {
      allPolicies.push(policy);
    }
    assert.isTrue(allPolicies.some((p) => p.name === policyName));
    console.log(`  ✓ LIST operation successful, found ${allPolicies.length} policy(ies)`);

    // Step 4: Synchronize Credentials with IoT Hub
    console.log("Step 4: Synchronizing credentials with IoT Hub...");
    const syncPoller = client.credentials.synchronize(
      resourceGroupName,
      namespaceName,
      testPollingOptions,
    );
    await syncPoller.pollUntilDone();
    console.log("  ✓ Synchronization completed successfully");

    // Step 5: GET policy after sync before updating
    console.log("Step 5: Getting fresh policy after sync...");
    policyResource = await client.policies.get(resourceGroupName, namespaceName, policyName);
    const currentValidity =
      policyResource.properties!.certificate!.leafCertificateConfiguration.validityPeriodInDays;
    console.log(`  ✓ Fresh policy retrieved (current validity: ${currentValidity} days)`);

    // Step 6: Test Policy Update - change validity period
    // Omit certificateAuthorityConfiguration from PATCH (immutable field).
    console.log(`Step 6: Testing UPDATE - changing validity from ${currentValidity} to 60 days...`);
    const policyPatch: PolicyUpdate = {
      properties: {
        certificate: {
          leafCertificateConfiguration: { validityPeriodInDays: 60 },
        } as any,
      },
    };

    const updatePoller = client.policies.update(
      resourceGroupName,
      namespaceName,
      policyName,
      policyPatch,
      testPollingOptions,
    );
    await updatePoller.pollUntilDone();
    console.log("  Update operation completed");

    // GET policy after update to verify
    policyResource = await client.policies.get(resourceGroupName, namespaceName, policyName);
    assert.equal(
      policyResource.properties!.certificate!.leafCertificateConfiguration.validityPeriodInDays,
      60,
    );
    console.log("  ✓ Policy updated successfully, validity now 60 days");

    // Step 7: Create a device in the CMS namespace
    console.log(`Step 7: Creating device '${deviceName}' in CMS namespace...`);
    const deviceData: NamespaceDevice = {
      location,
      properties: {
        manufacturer: "Contoso",
        model: "CMS-TestModel-5000",
        operatingSystem: "Linux",
        operatingSystemVersion: "22.04",
        endpoints: {},
      },
    };

    const devicePoller = client.namespaceDevices.createOrReplace(
      resourceGroupName,
      namespaceName,
      deviceName,
      deviceData,
      testPollingOptions,
    );
    let deviceResource = await devicePoller.pollUntilDone();
    assert.isNotNull(deviceResource);
    assert.equal(deviceResource.name, deviceName);
    assert.isNotNull(deviceResource.properties?.uuid);
    assert.equal(deviceResource.properties?.manufacturer, "Contoso");
    assert.equal(deviceResource.properties?.model, "CMS-TestModel-5000");
    console.log(`  ✓ Device created: ${deviceResource.name}`);
    console.log(`  ✓ UUID: ${deviceResource.properties?.uuid}`);

    // Step 8: GET device and verify properties
    console.log("Step 8: Getting device and verifying properties...");
    deviceResource = await client.namespaceDevices.get(
      resourceGroupName,
      namespaceName,
      deviceName,
    );
    assert.isNotNull(deviceResource.properties);
    assert.equal(deviceResource.properties!.manufacturer, "Contoso");
    assert.equal(deviceResource.properties!.model, "CMS-TestModel-5000");
    assert.equal(deviceResource.properties!.operatingSystem, "Linux");
    assert.equal(deviceResource.properties!.operatingSystemVersion, "22.04");
    console.log("  ✓ Device properties verified");

    // List devices in namespace
    console.log("  Listing devices in namespace...");
    const allDevices: NamespaceDevice[] = [];
    for await (const d of client.namespaceDevices.listByResourceGroup(
      resourceGroupName,
      namespaceName,
    )) {
      allDevices.push(d);
    }
    assert.isTrue(allDevices.some((d) => d.name === deviceName));
    console.log(`  ✓ LIST found ${allDevices.length} device(s), including '${deviceName}'`);

    // Step 9: Test Device.Revoke on ARM-created device (negative test)
    // ARM-created devices have no policy attached, so revoke should fail.
    // Known RP bug: returns HTTP 200 with error body instead of proper 4xx.
    console.log(
      "Step 9: Testing Device.Revoke (ARM-created device, no policy — expect failure)...",
    );
    const revokeRequest: DeviceCredentialsRevokeRequest = { disable: false };
    try {
      const revokePoller = client.namespaceDevices.revoke(
        resourceGroupName,
        namespaceName,
        deviceName,
        revokeRequest,
        testPollingOptions,
      );
      await revokePoller.pollUntilDone();
      // If we get here, the RP bug may have been fixed — log it
      console.log("  ⚠ Revoke succeeded unexpectedly (RP bug may be fixed)");
    } catch (e: any) {
      console.log(`  ✓ Revoke threw ${e.constructor.name} as expected`);
      console.log(`  Message: ${e.message?.substring(0, 150)}...`);
    }

    // Step 10: Verify device state unchanged after failed revoke
    console.log("Step 10: Verifying device state unchanged after failed revoke...");
    deviceResource = await client.namespaceDevices.get(
      resourceGroupName,
      namespaceName,
      deviceName,
    );
    assert.isNotNull(deviceResource.properties);
    console.log(`  ✓ Device still exists: ${deviceResource.name}`);

    // Step 11: Delete device (cleanup)
    console.log(`Step 11: Deleting device '${deviceName}'...`);
    const deviceDeletePoller = client.namespaceDevices.delete(
      resourceGroupName,
      namespaceName,
      deviceName,
      testPollingOptions,
    );
    await deviceDeletePoller.pollUntilDone();
    console.log("  ✓ Device deleted successfully");

    // Step 12: Test RevokeIssuer on standard policy
    console.log("Step 12: Testing RevokeIssuer on standard policy...");
    const revokeIssuerPoller = client.policies.revokeIssuer(
      resourceGroupName,
      namespaceName,
      policyName,
      testPollingOptions,
    );
    await revokeIssuerPoller.pollUntilDone();
    console.log("  ✓ RevokeIssuer completed successfully");

    // Verify policy state after RevokeIssuer
    policyResource = await client.policies.get(resourceGroupName, namespaceName, policyName);
    assert.isNotNull(policyResource.properties);
    assert.equal(policyResource.properties!.provisioningState, "Succeeded");
    console.log(`  ✓ Policy provisioning state: ${policyResource.properties!.provisioningState}`);

    // Step 13: Delete standard policy
    console.log(`Step 13: Deleting policy '${policyName}'...`);
    const policyDeletePoller = client.policies.delete(
      resourceGroupName,
      namespaceName,
      policyName,
      testPollingOptions,
    );
    await policyDeletePoller.pollUntilDone();
    console.log("  ✓ Policy deleted successfully");

    // ============================================================
    // BYOR (Bring Your Own Root) Policy Flow
    // ============================================================

    // Step 14: Create a BYOR-enabled policy
    console.log(`Step 14: Creating BYOR-enabled policy '${byorPolicyName}'...`);
    const byorPolicyData: Policy = {
      properties: {
        certificate: {
          certificateAuthorityConfiguration: {
            keyType: "ECC",
            bringYourOwnRoot: { enabled: true },
          },
          leafCertificateConfiguration: {
            validityPeriodInDays: 90,
          },
        },
      },
    };

    const byorPoller = client.policies.createOrUpdate(
      resourceGroupName,
      namespaceName,
      byorPolicyName,
      byorPolicyData,
      testPollingOptions,
    );
    let byorPolicyResource = await byorPoller.pollUntilDone();
    assert.isNotNull(byorPolicyResource);
    assert.equal(byorPolicyResource.name, byorPolicyName);

    const byorConfig =
      byorPolicyResource.properties!.certificate!.certificateAuthorityConfiguration
        .bringYourOwnRoot!;
    assert.isTrue(byorConfig.enabled);
    console.log(`  ✓ BYOR policy created, enabled: ${byorConfig.enabled}`);
    console.log(`  ✓ BYOR status: ${byorConfig.status}`);

    // Step 15: Verify BYOR PendingActivation status and CSR
    console.log("Step 15: Verifying BYOR PendingActivation status and CSR...");
    assert.equal(byorConfig.status, "PendingActivation");
    assert.isNotNull(byorConfig.certificateSigningRequest);
    assert.include(byorConfig.certificateSigningRequest!, "-----BEGIN CERTIFICATE REQUEST-----");
    console.log(`  ✓ BYOR status: PendingActivation`);
    console.log(`  ✓ CSR present (${byorConfig.certificateSigningRequest!.length} chars)`);

    // Step 16: Test ActivateBringYourOwnRoot with invalid certificate (negative test)
    console.log("Step 16: Testing ActivateBYOR with INVALID certificate (negative test)...");
    const fakeCertificateChain =
      "-----BEGIN CERTIFICATE-----\n" +
      "MIIBkTCB+wIJALRiMLAhFake0DQYJKoZIhvcNAQELBQAwDzENMAsGA1UEAwwEdGVz\n" +
      "dDAeFw0yNDAzMjAxMjAwMDBaFw0yNTAzMjAxMjAwMDBaMA8xDTALBgNVBAMMBHRl\n" +
      "c3QwXDANBgkqhkiG9w0BAQEFAANLADBIAkEA0Z3VS5JJcds3xf0GQGZ/fake+key\n" +
      "data+that+is+intentionally+invalid+for+testing+purposes+only+AAAAAAAAAA==\n" +
      "-----END CERTIFICATE-----";

    const activateRequest: ActivateBringYourOwnRootRequest = {
      certificateChain: fakeCertificateChain,
    };

    try {
      const activatePoller = client.policies.activateBringYourOwnRoot(
        resourceGroupName,
        namespaceName,
        byorPolicyName,
        activateRequest,
        testPollingOptions,
      );
      await activatePoller.pollUntilDone();
      console.log("  ⚠ ActivateBYOR succeeded unexpectedly with invalid cert");
    } catch (e: any) {
      console.log(`  ✓ ActivateBYOR correctly rejected invalid certificate`);
      console.log(`  Exception type: ${e.constructor.name}`);
      console.log(`  Message: ${e.message?.substring(0, 200)}...`);
    }

    // Step 17: Verify BYOR state unchanged after failed activation
    console.log("Step 17: Verifying BYOR state unchanged after failed activation...");
    byorPolicyResource = await client.policies.get(
      resourceGroupName,
      namespaceName,
      byorPolicyName,
    );
    const byorConfigAfterFailure =
      byorPolicyResource.properties!.certificate!.certificateAuthorityConfiguration
        .bringYourOwnRoot!;

    assert.isTrue(byorConfigAfterFailure.enabled);
    assert.equal(byorConfigAfterFailure.status, "PendingActivation");
    assert.isNotNull(byorConfigAfterFailure.certificateSigningRequest);
    console.log(`  ✓ BYOR still enabled, still PendingActivation`);

    // Step 18: Update BYOR policy — change validity period
    // Omit certificateAuthorityConfiguration from PATCH (immutable field).
    console.log(
      `Step 18: Updating BYOR policy - changing validity from ${byorPolicyResource.properties!.certificate!.leafCertificateConfiguration.validityPeriodInDays} to 45 days...`,
    );
    const byorPolicyPatch: PolicyUpdate = {
      properties: {
        certificate: {
          leafCertificateConfiguration: { validityPeriodInDays: 45 },
        } as any,
      },
    };

    const byorUpdatePoller = client.policies.update(
      resourceGroupName,
      namespaceName,
      byorPolicyName,
      byorPolicyPatch,
      testPollingOptions,
    );
    await byorUpdatePoller.pollUntilDone();

    // Verify update
    byorPolicyResource = await client.policies.get(
      resourceGroupName,
      namespaceName,
      byorPolicyName,
    );
    assert.equal(
      byorPolicyResource.properties!.certificate!.leafCertificateConfiguration.validityPeriodInDays,
      45,
    );
    assert.isTrue(
      byorPolicyResource.properties!.certificate!.certificateAuthorityConfiguration
        .bringYourOwnRoot!.enabled,
    );
    console.log("  ✓ BYOR policy updated, validity now 45 days, BYOR still enabled");

    // Step 19: Delete BYOR policy
    console.log(`Step 19: Deleting BYOR policy '${byorPolicyName}'...`);
    const byorDeletePoller = client.policies.delete(
      resourceGroupName,
      namespaceName,
      byorPolicyName,
      testPollingOptions,
    );
    await byorDeletePoller.pollUntilDone();
    console.log("  ✓ BYOR policy deleted successfully");

    // Step 20: Delete Credential
    console.log("Step 20: Deleting credential...");
    const credentialDeletePoller = client.credentials.delete(
      resourceGroupName,
      namespaceName,
      testPollingOptions,
    );
    await credentialDeletePoller.pollUntilDone();
    console.log("  ✓ Credential deleted successfully");

    console.log("\n=== TEST COMPLETED SUCCESSFULLY ===");
  });
});
