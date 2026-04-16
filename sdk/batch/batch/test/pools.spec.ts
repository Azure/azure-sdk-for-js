// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  BatchPoolCreateOptions,
  BatchPoolUpdateOptions,
  BatchPoolReplaceOptions,
  BatchPoolResizeOptions,
  BatchPoolNodeCounts,
  BatchPool,
} from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { wait } from "./utils/wait.js";
import { getResourceName, POLLING_INTERVAL, waitForNotNull } from "./utils/helpers.js";
import { describe, it, beforeAll, beforeEach, afterEach, expect } from "vitest";
import { waitForNodesToStart, waitForPoolToBeReady } from "./utils/pool.js";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";
import { RestError } from "@azure/core-rest-pipeline";

const BASIC_POOL = getResourceName("Pool-Basic");
const VMSIZE_D1 = "Standard_D1_v2";
const VMSIZE_A1 = "Standard_A1_v2";
const BASIC_POOL_NUM_VMS = 4;
const DISK_POOL = getResourceName("Pool-Datadisk");
const ENDPOINT_POOL = getResourceName("Pool-Endpoint");
const TEST_POOL3 = getResourceName("Pool-3");

describe("Pool Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
  let batchAccountEndpoint = fakeAzureBatchEndpoint;
  let batchAccountKey = fakeTestPasswordPlaceholder2;

  const nonAdminPoolUser: string = "nonAdminUser";

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

  it("Create Batch Pool successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
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
        extensions: [
          {
            name: "batchextension1",
            type: "GenevaMonitoring",
            publisher: "Microsoft.Azure.Geneva",
            typeHandlerVersion: "2.0",
            autoUpgradeMinorVersion: true,
            enableAutomaticUpgrade: true,
          },
        ],
      },
      networkConfiguration: {
        enableAcceleratedNetworking: true,
      },
      targetDedicatedNodes: BASIC_POOL_NUM_VMS,
      // Ensures there's a compute node file we can reference later
      startTask: { commandLine: "cmd /c echo hello > hello.txt" },
      // Sets up pool user we can reference later
      userAccounts: [
        {
          name: nonAdminPoolUser,
          password: isPlaybackMode() ? fakeTestPasswordPlaceholder2 : "user_1account_password2",
          elevationLevel: "nonadmin",
        },
      ],
    };

    await batchClient.createPool(poolParams);

    if (!isPlaybackMode()) await wait(20000);
  });

  it("should patch pool parameters successfully", async () => {
    const options: BatchPoolUpdateOptions = {
      metadata: [
        {
          name: "foo2",
          value: "bar2",
        },
      ],
    };

    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    await batchClient.updatePool(poolId, options);

    const pool = await batchClient.getPool(poolId);

    expect(pool.id).toEqual(poolId);
    expect(pool.state).toEqual("active");

    for (let index = 0; index < options.metadata!.length; index++) {
      expect(pool.metadata![index].name).toEqual(options.metadata![index].name);
      expect(pool.metadata![index].value).toEqual(options.metadata![index].value);
    }
  });

  it("should get a pool reference successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const pool = await waitForPoolToBeReady(poolId, batchClient);
    const metadata = pool.metadata![0];

    expect(pool.id).toEqual(poolId);
    expect(pool.state).toEqual("active");
    expect(pool.allocationState).toEqual("steady");
    expect(pool.virtualMachineConfiguration).toBeDefined();
    expect(pool.virtualMachineConfiguration!.imageReference!.sku).toEqual("2022-datacenter");
    expect(pool.vmSize?.toLowerCase()).toEqual(VMSIZE_D1.toLowerCase());
    expect(pool.targetDedicatedNodes).toEqual(BASIC_POOL_NUM_VMS);
    expect(pool.enableAutoScale).toBe(false);

    expect(metadata.name).toEqual("foo2");
    expect(metadata.value).toEqual("bar2");

    expect(pool.startTask).toBeDefined();
    expect(pool.startTask!.commandLine).toEqual("cmd /c echo hello > hello.txt");

    expect(pool.userAccounts!.length).toEqual(1);
    expect(pool.userAccounts![0].name).toEqual(nonAdminPoolUser);
    expect(pool.userAccounts![0].elevationLevel).toEqual("nonadmin");
    expect(pool.networkConfiguration?.enableAcceleratedNetworking).toBe(true);
    expect(pool.virtualMachineConfiguration?.extensions?.[0].enableAutomaticUpgrade).toBe(true);
    expect(pool.virtualMachineConfiguration?.extensions?.[0].name).toEqual("batchextension1");
  });

  it("should update pool parameters successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const updateOptions: BatchPoolReplaceOptions = {
      metadata: [{ name: "foo", value: "bar" }],
      applicationPackageReferences: [],
      // Ensures the start task isn't cleared
      startTask: { commandLine: "cmd /c echo hello > hello.txt" },
    };

    await batchClient.replacePoolProperties(poolId, updateOptions);

    const pool = await batchClient.getPool(poolId);

    const metadata = pool.metadata!;
    expect(metadata[0].name).toEqual("foo");
    expect(metadata[0].value).toEqual("bar");
  });

  it("should get a pool reference with odata successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const pool = await batchClient.getPool(poolId, {
      select: ["id", "state"],
      expand: ["stats"],
    });

    expect(pool.id).toEqual(poolId);
    expect(pool.state).toEqual("active");
    expect(pool.allocationState).toBe("steady");
    expect(pool.vmSize).toBe("standard_d1_v2");
  });

  it("should list pools without filters", async () => {
    const pools: unknown[] = [];
    for await (const pool of batchClient.listPools()) {
      pools.push(pool);
    }

    expect(pools.length).toBeGreaterThanOrEqual(1);
  });

  it("should list a maximum number of pools", async () => {
    const maxResults = 1;
    const pools: unknown[] = [];
    for await (const pool of batchClient.listPools({ maxresults: maxResults })) {
      pools.push(pool);
    }

    expect(pools.length).toBeGreaterThanOrEqual(maxResults);
  });

  it("should fail to list pools with invalid max", async () => {
    try {
      const pools: unknown[] = [];
      for await (const pool of batchClient.listPools({ maxresults: -5 })) {
        pools.push(pool);
      }
      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.code).toEqual("InvalidQueryParameterValue");
    }
  });

  it("should list pools according to filter", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const pools: BatchPool[] = [];
    for await (const pool of batchClient.listPools({
      filter: `startswith(id,'${poolId}')`,
      select: ["id", "state"],
      expand: ["stats"],
    })) {
      pools.push(pool);
    }

    expect(pools.length).toEqual(1);
    expect(pools[0].id).toEqual(poolId);
    expect(pools[0].state).toEqual("active");
    expect(pools[0].allocationState).toBe("steady");
    expect(pools[0].vmSize).toBe("standard_d1_v2");
  });

  it("should check that pool exists successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    // poolExists returns void on success, throws on failure
    await batchClient.poolExists(poolId);
  });

  it("should add a pool with a Data Disk", async () => {
    const poolId = recorder.variable("DISK_POOL", DISK_POOL);
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_A1,
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "Canonical",
          offer: "ubuntu-24_04-lts",
          sku: "server-gen1",
        },
        nodeAgentSkuId: "batch.node.ubuntu 24.04",
        dataDisks: [
          {
            logicalUnitNumber: 1,
            diskSizeGb: 50,
          },
        ],
      },
      targetDedicatedNodes: 0,
    };

    await batchClient.createPool(poolParams);

    await wait(POLLING_INTERVAL);

    const pool = await batchClient.getPool(poolId);

    expect(pool.virtualMachineConfiguration!.dataDisks![0].logicalUnitNumber).toEqual(1);
    expect(pool.virtualMachineConfiguration!.dataDisks![0].diskSizeGb).toEqual(50);

    await batchClient.deletePool(poolId, { updateIntervalInMs: POLLING_INTERVAL });
  });

  it("should add a pool with inbound endpoint configuration successfully", async () => {
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_A1,
      userAccounts: [
        {
          name: nonAdminPoolUser,
          password: isPlaybackMode() ? fakeTestPasswordPlaceholder2 : "user_1account_password2",
          elevationLevel: "nonadmin",
        },
      ],
      networkConfiguration: {
        endpointConfiguration: {
          inboundNatPools: [
            {
              name: "TestEndpointConfig",
              protocol: "udp",
              backendPort: 64444,
              frontendPortRangeStart: 60000,
              frontendPortRangeEnd: 61000,
              networkSecurityGroupRules: [
                {
                  priority: 150,
                  access: "allow",
                  sourceAddressPrefix: "*",
                },
              ],
            },
            {
              name: "ssh",
              protocol: "tcp",
              backendPort: 22,
              frontendPortRangeStart: 15000,
              frontendPortRangeEnd: 15100,
            },
          ],
        },
      },
      virtualMachineConfiguration: {
        nodeAgentSkuId: "batch.node.ubuntu 22.04",
        imageReference: {
          publisher: "Canonical",
          offer: "0001-com-ubuntu-server-jammy",
          sku: "22_04-lts",
        },
      },
      targetDedicatedNodes: 1,
    };

    await batchClient.createPool(poolParams);
  });

  it("should get the details of a pool with endpoint configuration successfully", async () => {
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);

    const nodeList = await waitForNodesToStart(poolId, batchClient);

    expect(nodeList.length).toEqual(1);
    expect(nodeList[0].endpointConfiguration).toBeDefined();
    expect(nodeList[0].endpointConfiguration!.inboundEndpoints.length).toEqual(2);
    expect(nodeList[0].endpointConfiguration!.inboundEndpoints[0].name).toEqual(
      "TestEndpointConfig.0",
    );
    expect(nodeList[0].endpointConfiguration!.inboundEndpoints[0].protocol).toEqual("udp");
  });

  it("should get pool node counts successfully", async () => {
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);

    const listNodeCounts = async (): Promise<BatchPoolNodeCounts[] | null> => {
      const poolList: BatchPoolNodeCounts[] = [];
      for await (const pool of batchClient.listPoolNodeCounts()) {
        poolList.push(pool);
      }

      if (poolList.length > 0) {
        const endpointPool = poolList.filter((pool) => pool.poolId === poolId);
        if (endpointPool.length > 0 && endpointPool[0].dedicated!.idle > 0) {
          return endpointPool;
        }
      }
      return null;
    };

    const nodeList = await waitForNotNull(listNodeCounts, 60 * 10000);

    const endpointPoolObj = nodeList.filter((pool) => pool.poolId === poolId);
    expect(endpointPoolObj.length).toBeGreaterThan(0);
    expect(endpointPoolObj[0].dedicated!.idle).toEqual(1);
    expect(endpointPoolObj[0].lowPriority!.total).toEqual(0);
  });

  it("should get a remote login settings successfully", async () => {
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);

    const nodeList = await waitForNodesToStart(poolId, batchClient);

    const node = nodeList[0];
    if (!node.id) {
      expect.fail("Node id is not defined in the node object");
    }

    const loginSettings = await batchClient.getNodeRemoteLoginSettings(poolId, node.id);

    expect(loginSettings.remoteLoginIpAddress).toBeTypeOf("string");
    expect(loginSettings.remoteLoginPort).toBeTypeOf("number");
  });

  it("should create a second pool successfully", async () => {
    const poolId = recorder.variable("TEST_POOL3", TEST_POOL3);
    const poolParams: BatchPoolCreateOptions = {
      id: poolId,
      vmSize: VMSIZE_A1,
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
  });

  it("should start and wait for pool resizing successfully", async () => {
    const poolId = recorder.variable("TEST_POOL3", TEST_POOL3);
    await waitForPoolToBeReady(poolId, batchClient);

    const options: BatchPoolResizeOptions = {
      targetDedicatedNodes: 1,
      targetLowPriorityNodes: 1,
    };

    await batchClient.resizePool(poolId, options, {
      updateIntervalInMs: POLLING_INTERVAL,
    });

    const pool = await batchClient.getPool(poolId);

    expect(pool.targetDedicatedNodes).toEqual(1);
    expect(pool.targetLowPriorityNodes).toEqual(1);
    expect(pool.allocationState).toEqual("steady");
  });

  it("should stop pool resizing successfully", async () => {
    const poolId = recorder.variable("TEST_POOL3", TEST_POOL3);
    const resizePoolPromise = batchClient.resizePool(
      poolId,
      {
        targetDedicatedNodes: 0,
        targetLowPriorityNodes: 1,
      },
      { updateIntervalInMs: POLLING_INTERVAL },
    );
    await batchClient.stopPoolResize(poolId, { updateIntervalInMs: POLLING_INTERVAL });
    // resizePool will resolve once the resize is fully stopped
    await resizePoolPromise;
  });

  it("should delete a pool successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    await batchClient.deletePool(poolId, { updateIntervalInMs: POLLING_INTERVAL });
    try {
      await batchClient.getPool(poolId);
      expect.fail("Expected an error to be thrown");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(RestError);
      const restError = error as RestError;
      expect(restError.statusCode).toEqual(404);
    }
  });

  it("should delete a second pool successfully", async () => {
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);
    await batchClient.deletePool(poolId, { updateIntervalInMs: POLLING_INTERVAL });
  });

  it("should delete a third pool successfully", async () => {
    const poolId = recorder.variable("TEST_POOL3", TEST_POOL3);
    await batchClient.deletePool(poolId, { updateIntervalInMs: POLLING_INTERVAL });
  });
});
