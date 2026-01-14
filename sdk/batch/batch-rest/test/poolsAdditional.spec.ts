// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClientV2, createRecorder } from "./utils/recordedClient.js";
import type { BatchClient, CreatePoolParameters } from "../src/index.js";
import { isUnexpected } from "../src/index.js";
import { fakeAzureBatchEndpoint } from "./utils/fakeTestSecrets.js";
import { getResourceName } from "./utils/helpers.js";
import { describe, it, beforeAll, beforeEach, assert, expect, afterEach } from "vitest";
import { getExistingBatchAccount } from "./utils/arm-resources/batch-account.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";
import { waitForNodesToStart } from "./utils/pool.js";

const VMSIZE_D1 = "Standard_D1_v2";

describe("Pool Operations additional tests", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
  let batchAccountEndpoint = fakeAzureBatchEndpoint;

  /**
   * Provision helper resources needed for testing pools
   */
  beforeAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const account = await getExistingBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClientV2({
      recorder,
      accountEndpoint: batchAccountEndpoint,
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

  it("should create a pool with job FIFO scheduling policy", async () => {
    const poolId = recorder.variable("Pool-JobFifo", getResourceName("Pool-JobFifo"));
    const poolParams: CreatePoolParameters = {
      body: {
        id: poolId,
        vmSize: VMSIZE_D1,
        taskSchedulingPolicy: {
          nodeFillType: "spread",
          jobDefaultOrder: "creationtime",
        },
        virtualMachineConfiguration: {
          nodeAgentSKUId: "batch.node.windows amd64",
          imageReference: {
            publisher: "microsoftwindowsserver",
            offer: "windowsserver",
            sku: "2022-datacenter",
          },
        },
      },
      contentType: "application/json; odata=minimalmetadata",
    };
    try {
      const result = await batchClient.path("/pools").post(poolParams);
      if (isUnexpected(result)) {
        assert.fail(`Received unexpected status code from creating pool: ${result.status}`);
      }

      const poolRes = await batchClient.path("/pools/{poolId}", poolId).get();
      if (isUnexpected(poolRes)) {
        assert.fail(`Received unexpected status code from getting pool: ${poolRes.status}`);
      }
      expect(poolRes.body.taskSchedulingPolicy).toBeDefined();
      expect(poolRes.body.taskSchedulingPolicy?.jobDefaultOrder).toBe("creationtime");
    } finally {
      await batchClient.path("/pools/{poolId}", poolId).delete();
    }
  });

  it("should create a pool with IPv6 address", async () => {
    const poolId = recorder.variable("Pool-IPv6", getResourceName("Pool-IPv6"));
    const poolParams: CreatePoolParameters = {
      body: {
        id: poolId,
        vmSize: VMSIZE_D1,
        networkConfiguration: {
          publicIPAddressConfiguration: {
            provision: "batchmanaged",
            ipFamilies: ["IPv6", "IPv4"],
          },
          endpointConfiguration: {
            inboundNATPools: [
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
          nodeAgentSKUId: "batch.node.windows amd64",
          imageReference: {
            publisher: "microsoftwindowsserver",
            offer: "windowsserver",
            sku: "2022-datacenter",
          },
        },
        targetDedicatedNodes: 1,
      },

      contentType: "application/json; odata=minimalmetadata",
    };

    try {
      const result = await batchClient.path("/pools").post(poolParams);
      if (isUnexpected(result)) {
        console.dir(result.body.values, { depth: null });
        assert.fail(`Received unexpected status code from creating pool: ${result.status}`);
      }
      const poolRes = await batchClient.path("/pools/{poolId}", poolId).get();
      if (isUnexpected(poolRes)) {
        console.dir(poolRes.body, { depth: null });
        assert.fail(`Received unexpected status code from getting pool: ${poolRes.status}`);
      }
      expect(poolRes.body.networkConfiguration).toBeDefined();
      expect(poolRes.body.networkConfiguration?.publicIPAddressConfiguration).toBeDefined();
      expect(poolRes.body.networkConfiguration?.publicIPAddressConfiguration?.ipFamilies).toContain(
        "IPv6",
      );

      await waitForNodesToStart(poolId, batchClient);

      const getNodesRes = await batchClient.path("/pools/{poolId}/nodes", poolId).get();
      if (isUnexpected(getNodesRes)) {
        assert.fail(
          `Received unexpected status code from listing compute nodes: ${getNodesRes.status}`,
        );
      }

      if ((getNodesRes.body.value || []).length === 0) {
        assert.fail(`No compute nodes found in pool ${poolId}`);
      }
      const node = getNodesRes.body.value![0];
      expect(node.ipAddress).toBeDefined();
      expect(node.ipv6Address).toBeDefined();

      //   await waitForNodeIdle(poolId, node.id!, batchClient);

      const remoteLoginSettingsRes = await batchClient
        .path("/pools/{poolId}/nodes/{nodeId}/remoteloginsettings", poolId, node.id!)
        .get();

      if (isUnexpected(remoteLoginSettingsRes)) {
        console.dir(remoteLoginSettingsRes.body, { depth: null });
        assert.fail(
          `Received unexpected status code from getting remote login settings: ${remoteLoginSettingsRes.status}`,
        );
      }
      expect(remoteLoginSettingsRes.body.ipv6RemoteLoginIPAddress).toBeDefined();
      expect(remoteLoginSettingsRes.body.ipv6RemoteLoginPort).toBeDefined();
    } finally {
      await batchClient.path("/pools/{poolId}", poolId).delete();
    }
  });

  it("should failed to create a CMK disk encrypted pool as dataplane does not support pool identity", async () => {
    const poolId = recorder.variable("Pool-CMK-Fail", getResourceName("Pool-CMK-Fail"));
    const poolParams: CreatePoolParameters = {
      body: {
        id: poolId,
        vmSize: VMSIZE_D1,
        virtualMachineConfiguration: {
          nodeAgentSKUId: "batch.node.windows amd64",
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
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const result = await batchClient.path("/pools").post(poolParams);
    if (!isUnexpected(result)) {
      assert.fail("Expected error response to return");
    }

    expect(result.status).toBe("400");
    expect(result.body.code).toBe("InvalidPropertyValue");

    expect(result.body.values).toContainEqual({
      key: "Reason",
      value: "Pool Identity is required when using CustomerManagedKey.",
    });
  });
});
