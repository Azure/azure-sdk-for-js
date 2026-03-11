// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition", () => {
  let recorder: Recorder;
  let client: PostgreSQLManagementFlexibleServerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new PostgreSQLManagementFlexibleServerClient(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for promoteAReadReplicaToAStandaloneServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      replica: { promoteMode: "Standalone", promoteOption: "Forced" },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for switchOverAReadReplicaToPrimaryServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      replica: { promoteMode: "Switchover", promoteOption: "Forced" },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for promoteAReadReplicaToAStandaloneServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      replica: { promoteMode: "Standalone", promoteOption: "Planned" },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for switchOverAReadReplicaToPrimaryServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      replica: { promoteMode: "Switchover", promoteOption: "Planned" },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for updateAnExistingServer", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      administratorLoginPassword: "examplenewpassword",
      backup: { backupRetentionDays: 20 },
      createMode: "Update",
      storage: { autoGrow: "Enabled", storageSizeGB: 1024, tier: "P30" },
      sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for updateAnExistingServerWithCustomMaintenanceWindow", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      createMode: "Update",
      maintenanceWindow: { customWindow: "Enabled", dayOfWeek: 0, startHour: 8, startMinute: 0 },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
            {},
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
            {},
        },
      },
      administratorLoginPassword: "examplenewpassword",
      backup: { backupRetentionDays: 20 },
      createMode: "Update",
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI:
          "https://examplegeoredundantkeyvault.vault.azure.net/keys/examplekey/yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        geoBackupUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity",
        primaryKeyURI:
          "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
      },
      sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
            {},
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
            {},
        },
      },
      administratorLoginPassword: "examplenewpassword",
      backup: { backupRetentionDays: 20 },
      createMode: "Update",
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI: "https://examplegeoredundantkeyvault.vault.azure.net/keys/examplekey",
        geoBackupUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity",
        primaryKeyURI: "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
      },
      sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for updateAnExistingServerToUpgradeTheMajorVersionOfPostgreSQLDatabaseEngine", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      createMode: "Update",
      version: "17",
    });
    assert.ok(result);
  });

  it("should updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition for updateAnExistingServerWithMicrosoftEntraAuthenticationEnabled", async function () {
    const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
      administratorLoginPassword: "examplenewpassword",
      authConfig: {
        activeDirectoryAuth: "Enabled",
        passwordAuth: "Enabled",
        tenantId: "tttttt-tttt-tttt-tttt-tttttttttttt",
      },
      backup: { backupRetentionDays: 20 },
      createMode: "Update",
      storage: { autoGrow: "Disabled", storageSizeGB: 1024, tier: "P30" },
      sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });
});
