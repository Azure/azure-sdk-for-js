// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type { BatchClient, BatchError, BatchPoolCreateOptions } from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName, POLLING_INTERVAL } from "./utils/helpers.js";
import { describe, it, beforeAll, beforeEach, afterEach, assert, expect } from "vitest";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";
import { waitForNodesToStart } from "./utils/pool.js";
import { RestError } from "@azure/core-rest-pipeline";

const VMSIZE_D2s = "Standard_D2s_v3";
const VMSIZE_D1 = "Standard_D1_v2";
const SECURITY_PROFILE_POOL = getResourceName("Pool-SecurityProfile");
const AUTO_OS_UPGRADE_POOL = getResourceName("Pool-AutoOSUpgrade");
const CVM_POOL = getResourceName("Pool-Confidential");

describe("Pool Advanced Features Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
  let batchAccountEndpoint = fakeAzureBatchEndpoint;
  let batchAccountKey = fakeTestPasswordPlaceholder2;

  /**
   * Provision helper resources needed for testing pools
   */
  beforeAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const account = await getExistingBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());
    console.log("created Batch Account:", getHoboBatchAccountName());

    batchAccountKey = accountKeys.primary!;
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClient({
      recorder,
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    await recorder.addSanitizers({
      generalSanitizers: [
        {
          target: batchAccountEndpoint,
          value: fakeAzureBatchEndpoint,
        },
      ],
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create a pool with SecurityProfile & OS Disk", async () => {
    const poolId = recorder.variable("SECURITY_PROFILE_POOL", SECURITY_PROFILE_POOL);
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_D2s,
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "Canonical",
          offer: "0001-com-ubuntu-server-jammy",
          sku: "22_04-lts",
        },
        nodeAgentSkuId: "batch.node.ubuntu 22.04",
        securityProfile: {
          securityType: "trustedLaunch",
          encryptionAtHost: true,
          uefiSettings: {
            secureBootEnabled: true,
            vTpmEnabled: true,
          },
        },
        osDisk: {
          caching: "readwrite",
          managedDisk: {
            storageAccountType: "standard_lrs",
          },
          diskSizeGB: 50,
          writeAcceleratorEnabled: true,
        },
      },
      targetDedicatedNodes: 0,
    };

    await batchClient.createPool(poolParams);

    try {
      const pool = await batchClient.getPool(poolId);

      const securityProfile = pool.virtualMachineConfiguration!.securityProfile!;
      expect(securityProfile.securityType?.toLocaleLowerCase()).toEqual("trustedlaunch");
      expect(securityProfile.encryptionAtHost).toEqual(true);
      expect(securityProfile.uefiSettings!.secureBootEnabled).toEqual(true);
      expect(securityProfile.uefiSettings!.vTpmEnabled).toEqual(true);

      const osDisk = pool.virtualMachineConfiguration!.osDisk!;
      expect(osDisk.caching?.toLocaleLowerCase()).toEqual("readwrite");
      expect(osDisk.managedDisk!.storageAccountType?.toLocaleLowerCase()).toEqual("standard_lrs");
      expect(osDisk.diskSizeGB).toEqual(50);
      expect(osDisk.writeAcceleratorEnabled).toEqual(true);
    } finally {
      await batchClient.beginDeletePoolAndWait(poolId, { updateIntervalInMs: POLLING_INTERVAL });
    }
  });

  it("should create a pool with Auto OS Upgrade", async () => {
    const poolId = recorder.variable("AUTO_OS_UPGRADE_POOL", AUTO_OS_UPGRADE_POOL);
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_D2s,
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "Canonical",
          offer: "0001-com-ubuntu-server-jammy",
          sku: "22_04-lts",
        },
        nodeAgentSkuId: "batch.node.ubuntu 22.04",
        nodePlacementConfiguration: {
          policy: "zonal",
        },
      },
      upgradePolicy: {
        mode: "automatic",
        automaticOsUpgradePolicy: {
          disableAutomaticRollback: true,
          enableAutomaticOsUpgrade: true,
          useRollingUpgradePolicy: true,
          osRollingUpgradeDeferral: true,
        },
        rollingUpgradePolicy: {
          enableCrossZoneUpgrade: true,
          maxBatchInstancePercent: 20,
          maxUnhealthyInstancePercent: 20,
          maxUnhealthyUpgradedInstancePercent: 20,
          pauseTimeBetweenBatches: "PT0S",
          prioritizeUnhealthyInstances: false,
          rollbackFailedInstancesOnPolicyBreach: false,
        },
      },
      targetDedicatedNodes: 0,
    };

    await batchClient.createPool(poolParams);

    try {
      const pool = await batchClient.getPool(poolId);

      const upgradePolicy = pool.upgradePolicy!;
      expect(upgradePolicy.mode).toEqual("automatic");
      expect(upgradePolicy.automaticOsUpgradePolicy!).toEqual({
        disableAutomaticRollback: true,
        enableAutomaticOsUpgrade: true,
        useRollingUpgradePolicy: true,
        osRollingUpgradeDeferral: true,
      });
      expect(upgradePolicy.rollingUpgradePolicy!).toEqual({
        enableCrossZoneUpgrade: true,
        maxBatchInstancePercent: 20,
        maxUnhealthyInstancePercent: 20,
        maxUnhealthyUpgradedInstancePercent: 20,
        pauseTimeBetweenBatches: "PT0S",
        prioritizeUnhealthyInstances: false,
        rollbackFailedInstancesOnPolicyBreach: false,
      });
    } finally {
      await batchClient.beginDeletePoolAndWait(poolId, { updateIntervalInMs: POLLING_INTERVAL });
    }
  });

  it("should create a pool with confidential VM and Metadata Security Protocol", async () => {
    const poolId = recorder.variable("CVM_POOL", CVM_POOL);
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_D2s,
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "canonical",
          offer: "0001-com-ubuntu-confidential-vm-jammy",
          sku: "22_04-lts-cvm",
        },
        nodeAgentSkuId: "batch.node.ubuntu 22.04",
        securityProfile: {
          securityType: "confidentialVM",
          encryptionAtHost: true,
          uefiSettings: {
            secureBootEnabled: true,
            vTpmEnabled: true,
          },
          proxyAgentSettings: {
            enabled: true,
            wireServer: {
              mode: "Audit",
            },
            imds: {
              mode: "Audit",
            },
          },
        },
        osDisk: {
          managedDisk: {
            securityProfile: {
              securityEncryptionType: "VMGuestStateOnly",
            },
          },
        },
      },
      targetDedicatedNodes: 0,
    };

    await batchClient.createPool(poolParams);

    try {
      const pool = await batchClient.getPool(poolId);

      const securityProfile = pool.virtualMachineConfiguration!.securityProfile!;
      expect(securityProfile.securityType?.toLocaleLowerCase()).toEqual("confidentialvm");
      expect(securityProfile.encryptionAtHost).toEqual(true);
      expect(securityProfile.uefiSettings!.secureBootEnabled).toEqual(true);
      expect(securityProfile.uefiSettings!.vTpmEnabled).toEqual(true);

      const osDisk = pool.virtualMachineConfiguration!.osDisk!;
      expect(osDisk.managedDisk!.securityProfile!.securityEncryptionType?.toLocaleLowerCase()).toEqual(
        "vmgueststateonly",
      );

      const proxySettings = securityProfile.proxyAgentSettings!;
      expect(proxySettings.enabled).toEqual(true);
      expect(proxySettings.wireServer!.mode?.toLocaleLowerCase()).toEqual("audit");
      expect(proxySettings.imds!.mode?.toLocaleLowerCase()).toEqual("audit");
    } finally {
      await batchClient.beginDeletePoolAndWait(poolId, { updateIntervalInMs: POLLING_INTERVAL });
    }
  });

  it("should create a pool with job FIFO scheduling policy", async () => {
    const poolId = recorder.variable("Pool-JobFifo", getResourceName("Pool-JobFifo"));
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_D1,
      taskSchedulingPolicy: {
        nodeFillType: "spread",
        jobDefaultOrder: "creationtime",
      },
      virtualMachineConfiguration: {
        nodeAgentSkuId: "batch.node.windows amd64",
        imageReference: {
          publisher: "microsoftwindowsserver",
          offer: "windowsserver",
          sku: "2022-datacenter",
        },
      },
    };

    await batchClient.createPool(poolParams);

    try {
      const pool = await batchClient.getPool(poolId);
      expect(pool.taskSchedulingPolicy).toBeDefined();
      expect(pool.taskSchedulingPolicy?.jobDefaultOrder).toBe("creationtime");
    } finally {
      await batchClient.beginDeletePoolAndWait(poolId, { updateIntervalInMs: POLLING_INTERVAL });
    }
  });

  it("should create a pool with IPv6 address", async () => {
    const poolId = recorder.variable("Pool-IPv6", getResourceName("Pool-IPv6"));
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_D1,
      networkConfiguration: {
        publicIpAddressConfiguration: {
          ipAddressProvisioningType: "batchmanaged",
          ipFamilies: ["IPv6", "IPv4"],
        },
        endpointConfiguration: {
          inboundNatPools: [
            {
              name: "RDP",
              protocol: "tcp",
              backendPort: 3389,
              frontendPortRangeStart: 15000,
              frontendPortRangeEnd: 15100,
            },
          ],
        },
      },
      virtualMachineConfiguration: {
        nodeAgentSkuId: "batch.node.windows amd64",
        imageReference: {
          publisher: "microsoftwindowsserver",
          offer: "windowsserver",
          sku: "2022-datacenter",
        },
      },
      targetDedicatedNodes: 1,
    };

    await batchClient.createPool(poolParams);

    try {
      const pool = await batchClient.getPool(poolId);
      expect(pool.networkConfiguration).toBeDefined();
      expect(pool.networkConfiguration?.publicIpAddressConfiguration).toBeDefined();
      expect(pool.networkConfiguration?.publicIpAddressConfiguration?.ipFamilies).toContain(
        "IPv6",
      );

      await waitForNodesToStart(poolId, batchClient);

      const nodes: any[] = [];
      for await (const node of batchClient.listNodes(poolId)) {
        nodes.push(node);
      }

      if (nodes.length === 0) {
        assert.fail(`No compute nodes found in pool ${poolId}`);
      }
      const node = nodes[0];
      expect(node.ipAddress).toBeDefined();
      expect(node.ipv6Address).toBeDefined();

      const remoteLoginSettings = await batchClient.getNodeRemoteLoginSettings(poolId, node.id!);

      expect(remoteLoginSettings.ipv6RemoteLoginIpAddress).toBeDefined();
      expect(remoteLoginSettings.ipv6RemoteLoginPort).toBeDefined();
    } finally {
      await batchClient.beginDeletePoolAndWait(poolId, { updateIntervalInMs: POLLING_INTERVAL});
    }
  });

  it("should fail to create a CMK disk encrypted pool as dataplane does not support pool identity", async () => {
    const poolId = recorder.variable("Pool-CMK-Fail", getResourceName("Pool-CMK-Fail"));
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_D1,
      virtualMachineConfiguration: {
        nodeAgentSkuId: "batch.node.windows amd64",
        imageReference: {
          publisher: "microsoftwindowsserver",
          offer: "windowsserver",
          sku: "2022-datacenter",
        },
        diskEncryptionConfiguration: {
          customerManagedKey: {
            keyUrl: "https://fake-vault.vault.azure.net/keys/fake-key/fake-key-version",
            identityReference: {
              resourceId:
                "/subscriptions/fake-subscription/resourceGroups/fake-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/fake-identity",
            },
          },
        },
      },
    };

    try {
      await batchClient.createPool(poolParams);
      assert.fail("Expected error response to return");
    } catch (error: any) {
      if (!(error instanceof RestError)) {
        throw error;
      }
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe("InvalidPropertyValue");
      const details = error.details as BatchError
      expect(details.values).toContainEqual({
        key: "Reason",
        value: "Pool Identity is required when using CustomerManagedKey.",
      });
    }
  });
});
