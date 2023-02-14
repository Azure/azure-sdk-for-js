// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-unused-expressions */

import { Recorder, VitestTestContext, isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import {
  BatchClient,
  BatchPoolResizeContent,
  BatchPoolUpdateContent,
  CreatePoolParameters,
  GetPoolParameters,
  ListPoolsParameters,
  ReplacePoolPropertiesParameters,
  ResizePoolParameters,
  isUnexpected,
  paginate,
} from "../../src/index.js";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets.js";
import { wait } from "./utils/wait.js";
import { getResourceName, POLLING_INTERVAL, waitForNotNull } from "./utils/helpers.js";
import { describe, it, beforeEach, afterEach, assert, expect } from "vitest";

const BASIC_POOL = getResourceName("Pool-Basic");
const VMSIZE_D1 = "Standard_D1_v2";
const VMSIZE_A1 = "Standard_A1_v2";
const VMSIZE_D2s = "Standard_D2s_v3";
const BASIC_POOL_NUM_VMS = 4;
const DISK_POOL = getResourceName("Pool-Datadisk");
const ENDPOINT_POOL = getResourceName("Pool-Endpoint");
const TEST_POOL3 = getResourceName("Pool-3");
const SECURITY_PROFILE_POOL = getResourceName("Pool-SecurityProfile");
const AUTO_OS_UPGRADE_POOL = getResourceName("Pool-AutoOSUpgrade");

describe("Pool Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;

  const nonAdminPoolUser: string = "nonAdminUser";

  /**
   * Provision helper resources needed for testing pools
   */

  beforeEach(async function (ctx: VitestTestContext) {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Create Batch Pool successfully", async function () {
    // Use assert to test your assumptions

    const poolParams: CreatePoolParameters = {
      body: {
        id: recorder.variable("BASIC_POOL", BASIC_POOL),
        vmSize: VMSIZE_D1,
        virtualMachineConfiguration: {
          nodeAgentSKUId: "batch.node.windows amd64",
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
            password: isPlaybackMode() ? fakeTestPasswordPlaceholder1 : "user_1account_password2", // Recorder sanitizer options will replace password with fakeTestPasswordPlaceholder1
            elevationLevel: "nonadmin",
          },
        ],
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const result = await batchClient.path("/pools").post(poolParams);
    assert.equal(result.status, "201");

    if (!isPlaybackMode()) await wait(20000);
  });

  it("should patch pool parameters successfully", async () => {
    const options: BatchPoolUpdateContent = {
      metadata: [
        {
          name: "foo2",
          value: "bar2",
        },
      ],
    };

    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const patchResult = await batchClient
      .path("/pools/{poolId}", poolId)
      .patch({ body: options, contentType: "application/json; odata=minimalmetadata" });
    assert.equal(patchResult.status, "200");

    const getResult = await batchClient.path("/pools/{poolId}", poolId).get();
    if (isUnexpected(getResult)) {
      assert.fail(`Received unexpected status code from getting pool: ${getResult.status}
              Response Body: ${getResult.body.message}`);
    }

    assert.equal(getResult.body.id, poolId);
    assert.equal(getResult.body.state, "active");

    for (let index = 0; index < options.metadata!.length; index++) {
      assert.equal(getResult.body.metadata![index].name, options.metadata![index].name);
      assert.equal(getResult.body.metadata![index].value, options.metadata![index].value);
    }
  });

  it("should get a pool reference successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const getSteadyPool = async () => {
      const res = await batchClient.path("/pools/{poolId}", poolId).get();
      if (isUnexpected(res)) {
        assert.fail(`Received unexpected status code from getting pool: ${res.status}
              Response Body: ${res.body.message}`);
      }
      if (res.body.allocationState === "steady") {
        return res;
      }
      return null;
    };

    const getResult = await waitForNotNull(getSteadyPool);
    const metadata = getResult.body.metadata![0];

    assert.equal(getResult.body.id, poolId);
    assert.equal(getResult.body.state, "active");
    assert.equal(getResult.body.allocationState, "steady");
    assert.isDefined(getResult.body.virtualMachineConfiguration);
    assert.equal(
      getResult.body.virtualMachineConfiguration!.imageReference!.sku,
      "2022-datacenter",
    );
    assert.equal(getResult.body.vmSize?.toLowerCase(), VMSIZE_D1.toLowerCase());
    assert.equal(getResult.body.targetDedicatedNodes, BASIC_POOL_NUM_VMS);
    assert.isFalse(getResult.body.enableAutoScale);

    assert.equal(metadata.name, "foo2");
    assert.equal(metadata.value, "bar2");

    assert.isDefined(getResult.body.startTask);
    assert.equal(getResult.body.startTask!.commandLine, "cmd /c echo hello > hello.txt");

    assert.lengthOf(getResult.body.userAccounts!, 1);
    assert.equal(getResult.body.userAccounts![0].name, nonAdminPoolUser);
    assert.equal(getResult.body.userAccounts![0].elevationLevel, "nonadmin");
    expect(getResult.body.networkConfiguration?.enableAcceleratedNetworking).to.be.true;
    expect(getResult.body.virtualMachineConfiguration?.extensions?.[0].enableAutomaticUpgrade).to.be
      .true;
    expect(getResult.body.virtualMachineConfiguration?.extensions?.[0].name).to.equal(
      "batchextension1",
    );
  });

  it("should update pool parameters successfully", async function () {
    const updateOptions: ReplacePoolPropertiesParameters = {
      body: {
        metadata: [{ name: "foo", value: "bar" }],
        applicationPackageReferences: [],
        // Ensures the start task isn't cleared
        startTask: { commandLine: "cmd /c echo hello > hello.txt" },
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const updateResult = await batchClient
      .path("/pools/{poolId}/updateproperties", poolId)
      .post(updateOptions);
    assert.equal(updateResult.status, "204");

    const getResult = await batchClient.path("/pools/{poolId}", poolId).get();
    if (isUnexpected(getResult)) {
      assert.fail(`Received unexpected status code from getting pool: ${getResult.status}
              Response Body: ${getResult.body.message}`);
    }

    const metadata = getResult.body.metadata!;
    assert.equal(metadata[0].name, "foo");
    assert.equal(metadata[0].value, "bar");
  });

  it("should get a pool reference with odata successfully", async () => {
    const getOptions: GetPoolParameters = {
      queryParameters: {
        $select: ["id", "state"],
        $expand: ["stats"],
      },
    };

    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const getResult = await batchClient.path("/pools/{poolId}", poolId).get(getOptions);
    if (isUnexpected(getResult)) {
      assert.fail(`Received unexpected status code from getting pool: ${getResult.status}
              Response Body: ${getResult.body.message}`);
    }

    assert.equal(getResult.body.id, poolId);
    assert.equal(getResult.body.state, "active");
    assert.isUndefined(getResult.body.allocationState);
    assert.isUndefined(getResult.body.vmSize);
  });

  it("should list pools without filters", async () => {
    const listPoolResult = await batchClient.path("/pools").get();
    assert.equal(listPoolResult.status, "200");

    if (isUnexpected(listPoolResult)) {
      assert.fail(`Received unexpected status code from listing pools: ${listPoolResult.status}
              Response Body: ${listPoolResult.body.message}`);
    }

    assert.isAtLeast(listPoolResult.body.value?.length ?? 0, 1);
  });

  it("should list a maximum number of pools", async () => {
    const listOptions = { queryParameters: { maxresults: 1 } };
    const listPoolResult = await batchClient.path("/pools").get(listOptions);

    if (isUnexpected(listPoolResult)) {
      assert.fail(`Received unexpected status code from listing pools: ${listPoolResult.status}
              Response Body: ${listPoolResult.body.message}`);
    }

    assert.isAtLeast(
      listPoolResult.body.value?.length ?? 0,
      listOptions.queryParameters.maxresults,
    );
  });

  it("should fail to list pools with invalid max", async () => {
    const listOptions = { queryParameters: { maxresults: -5 } };
    const listPoolResult = await batchClient.path("/pools").get(listOptions);

    if (!isUnexpected(listPoolResult)) {
      assert.fail(`Received successful list pool result when expected an error reply`);
    }

    expect(listPoolResult.body.code).to.equal("InvalidQueryParameterValue");
    expect(listPoolResult.body.values?.[0].value).to.equal("maxresults");
    expect(listPoolResult.body.values?.[1].value).to.equal("-5");
    expect(listPoolResult.body.values?.[2].value).to.equal("MaxResults cannot be less than 1");
  });

  it("should list pools according to filter", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const listOptions: ListPoolsParameters = {
      queryParameters: {
        $filter: `startswith(id,'${poolId}')`,
        $select: ["id", "state"],
        $expand: ["stats"],
      },
    };

    const listPoolsResult = await batchClient.path("/pools").get(listOptions);
    if (isUnexpected(listPoolsResult)) {
      assert.fail(`Received unexpected status code from listing pools: ${listPoolsResult.status}
              Response Body: ${listPoolsResult.body.message}`);
    }

    assert.lengthOf(listPoolsResult.body.value!, 1);
    assert.equal(listPoolsResult.body.value![0].id, poolId);
    assert.equal(listPoolsResult.body.value![0].state, "active");
    assert.isUndefined(listPoolsResult.body.value![0].allocationState);
    assert.isUndefined(listPoolsResult.body.value![0].vmSize);
  });

  it("should check that pool exists successfully", async () => {
    const poolExistsResult = await batchClient
      .path("/pools/{poolId}", recorder.variable("BASIC_POOL", BASIC_POOL))
      .head();
    assert.equal(poolExistsResult.status, "200");
  });

  it("should add a pool with a Data Disk", async () => {
    const poolParams: CreatePoolParameters = {
      body: {
        id: recorder.variable("DISK_POOL", DISK_POOL),
        vmSize: VMSIZE_A1,
        virtualMachineConfiguration: {
          imageReference: {
            publisher: "Canonical",
            offer: "UbuntuServer",
            sku: "18.04-LTS",
          },
          nodeAgentSKUId: "batch.node.ubuntu 18.04",
          dataDisks: [
            {
              lun: 1,
              diskSizeGB: 50,
            },
          ],
        },
        targetDedicatedNodes: 0,
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const result = await batchClient.path("/pools").post(poolParams);
    assert.equal(result.status, "201");

    await wait(POLLING_INTERVAL);

    const getResult = await batchClient.path("/pools/{poolId}", poolParams.body.id!).get();
    if (isUnexpected(getResult)) {
      assert.fail(`Received unexpected status code from getting pool: ${getResult.status}
              Response Body: ${getResult.body.message}`);
    }

    assert.equal(getResult.body.virtualMachineConfiguration!.dataDisks![0].lun, 1);
    assert.equal(getResult.body.virtualMachineConfiguration!.dataDisks![0].diskSizeGB, 50);

    await batchClient.path("/pools/{poolId}", poolParams.body.id!).delete();
  });

  it("should add a pool with inbound endpoint configuration successfully", async () => {
    const pool: CreatePoolParameters = {
      body: {
        id: recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL),
        vmSize: VMSIZE_A1,
        networkConfiguration: {
          endpointConfiguration: {
            inboundNATPools: [
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
            ],
          },
        },
        virtualMachineConfiguration: {
          nodeAgentSKUId: "batch.node.ubuntu 18.04",
          imageReference: {
            publisher: "Canonical",
            offer: "UbuntuServer",
            sku: "18.04-LTS",
          },
        },
        targetDedicatedNodes: 1,
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const addResult = await batchClient.path("/pools").post(pool);
    assert.equal(addResult.status, "201");
  });

  it("should get the details of a pool with endpoint configuration successfully", async () => {
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);
    const listNodes = async () => {
      const listResult = await batchClient.path("/pools/{poolId}/nodes", poolId).get();
      if (isUnexpected(listResult)) {
        assert.fail(`Received unexpected status code from list compute nodes: ${listResult.status}
              Response Body: ${listResult.body.message}`);
      }

      const paginateResponse = paginate(batchClient, listResult);
      const nodeList = [];
      for await (const node of paginateResponse) {
        nodeList.push(node);
      }
      if (nodeList.length > 0) {
        return nodeList;
      }
      return null;
    };

    const nodeList = await waitForNotNull(listNodes);

    assert.lengthOf(nodeList, 1);
    assert.isDefined(nodeList[0].endpointConfiguration);
    assert.lengthOf(nodeList[0].endpointConfiguration!.inboundEndpoints, 2);
    assert.equal(
      nodeList[0].endpointConfiguration!.inboundEndpoints[0].name,
      "TestEndpointConfig.0",
    );
    assert.equal(nodeList[0].endpointConfiguration!.inboundEndpoints[0].protocol, "udp");
  });

  it("should get pool node counts successfully", async () => {
    // let poolList = [];
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);
    // eslint-disable-next-line no-constant-condition

    const listNodeCounts = async () => {
      const poolList = [];
      const listNodeCountResult = await batchClient.path("/nodecounts").get();
      if (isUnexpected(listNodeCountResult)) {
        assert.fail(`Received unexpected status code from list compute nodes: ${listNodeCountResult.status}
              Response Body: ${listNodeCountResult.body.message}`);
      }

      const paginateResponse = paginate(batchClient, listNodeCountResult);
      for await (const pool of paginateResponse) {
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
    const nodeList = await waitForNotNull(listNodeCounts, 60 * 1000);

    const endpointPoolObj = nodeList.filter((pool) => pool.poolId === poolId);
    assert.isAbove(endpointPoolObj.length, 0, `Pool with Pool Id ${poolId} not found`);
    assert.equal(endpointPoolObj[0].dedicated!.idle, 1);
    assert.equal(endpointPoolObj[0].lowPriority!.total, 0);
  });

  it("should create a second pool successfully", async () => {
    const poolAddParams: CreatePoolParameters = {
      body: {
        id: recorder.variable("TEST_POOL3", TEST_POOL3),
        vmSize: VMSIZE_A1,
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

    const addPoolResult = await batchClient.path("/pools").post(poolAddParams);
    assert.equal(addPoolResult.status, "201");
  });

  it("should start pool resizing successfully", async () => {
    const poolId = recorder.variable("TEST_POOL3", TEST_POOL3);
    const getSteadyPool = async () => {
      const res = await batchClient.path("/pools/{poolId}", poolId).get();
      if (isUnexpected(res)) {
        assert.fail(`Received unexpected status code from getting pool: ${res.status}
              Response Body: ${res.body.message}`);
      }
      if (res.body.allocationState === "steady") {
        return res;
      }
      return null;
    };
    await waitForNotNull(getSteadyPool);

    const options: BatchPoolResizeContent = {
      targetDedicatedNodes: 3,
      targetLowPriorityNodes: 2,
    };
    const poolResizeParams: ResizePoolParameters = {
      body: options,
      contentType: "application/json; odata=minimalmetadata",
    };

    const poolResizeResult = await batchClient
      .path("/pools/{poolId}/resize", poolId)
      .post(poolResizeParams);
    assert.equal(poolResizeResult.status, "202");
  });

  it("should stop pool resizing successfully", async () => {
    const stopPoolResizeResult = await batchClient
      .path("/pools/{poolId}/stopresize", recorder.variable("TEST_POOL3", TEST_POOL3))
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(stopPoolResizeResult.status, "202");
  });

  it("should list pools usage metrics", async () => {
    const listPoolUsageResult = await batchClient.path("/poolusagemetrics").get();
    if (isUnexpected(listPoolUsageResult)) {
      assert.fail(`Received unexpected status code from getting pool usage metrics: ${listPoolUsageResult.status}
            Response Body: ${listPoolUsageResult.body.message}`);
    }

    assert.isAtLeast(listPoolUsageResult.body?.value?.length ?? 0, 0); // No pool activity during this test
  });

  it("should delete a pool successfully", async function () {
    const deleteResult = await batchClient
      .path("/pools/{poolId}", recorder.variable("BASIC_POOL", BASIC_POOL))
      .delete();
    assert.equal(deleteResult.status, "202");
  });

  it("should delete a second pool successfully", async function () {
    const deleteResult = await batchClient
      .path("/pools/{poolId}", recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL))
      .delete();
    assert.equal(deleteResult.status, "202");
  });

  it("should delete a third pool successfully", async function () {
    const deleteResult = await batchClient
      .path("/pools/{poolId}", recorder.variable("TEST_POOL3", TEST_POOL3))
      .delete();
    assert.equal(deleteResult.status, "202");
  });

  it("should create a pool with SecurityProfile & OS Disk", async () => {
    const poolId = recorder.variable("SECURITY_PROFILE_POOL", SECURITY_PROFILE_POOL);
    const poolParams: CreatePoolParameters = {
      body: {
        id: recorder.variable("SECURITY_PROFILE_POOL", SECURITY_PROFILE_POOL),
        vmSize: VMSIZE_D2s,
        virtualMachineConfiguration: {
          imageReference: {
            publisher: "Canonical",
            offer: "0001-com-ubuntu-server-jammy",
            sku: "22_04-lts",
          },
          nodeAgentSKUId: "batch.node.ubuntu 22.04",
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
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const result = await batchClient.path("/pools").post(poolParams);

    if (isUnexpected(result)) {
      assert.fail(`Received unexpected status code from creating pool: ${result.status}`);
    }

    try {
      const res = await batchClient.path("/pools/{poolId}", poolId).get();

      if (isUnexpected(res)) {
        assert.fail(`Received unexpected status code from getting pool: ${res.status}`);
      }
      const securityProfile = res.body.virtualMachineConfiguration!.securityProfile!;
      assert.equal(securityProfile.securityType?.toLocaleLowerCase(), "trustedlaunch");
      assert.equal(securityProfile.encryptionAtHost, true);
      assert.equal(securityProfile.uefiSettings!.secureBootEnabled, true);
      assert.equal(securityProfile.uefiSettings!.vTpmEnabled, true);

      const osDisk = res.body.virtualMachineConfiguration!.osDisk!;
      assert.equal(osDisk.caching?.toLocaleLowerCase(), "readwrite");
      assert.equal(osDisk.managedDisk!.storageAccountType?.toLocaleLowerCase(), "standard_lrs");
      assert.equal(osDisk.diskSizeGB, 50);
      assert.equal(osDisk.writeAcceleratorEnabled, true);
    } finally {
      await batchClient.path("/pools/{poolId}", poolId).delete();
    }
  });

  it("should create a pool with Auto OS Upgrade", async () => {
    const poolId = recorder.variable("AUTO_OS_UPGRADE_POOL", AUTO_OS_UPGRADE_POOL);
    const poolParams: CreatePoolParameters = {
      body: {
        id: poolId,
        vmSize: VMSIZE_D2s,
        virtualMachineConfiguration: {
          imageReference: {
            publisher: "Canonical",
            offer: "0001-com-ubuntu-server-jammy",
            sku: "22_04-lts",
          },
          nodeAgentSKUId: "batch.node.ubuntu 22.04",
          nodePlacementConfiguration: {
            policy: "zonal",
          },
        },
        upgradePolicy: {
          mode: "automatic",
          automaticOSUpgradePolicy: {
            disableAutomaticRollback: true,
            enableAutomaticOSUpgrade: true,
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
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const result = await batchClient.path("/pools").post(poolParams);

    if (isUnexpected(result)) {
      assert.fail(`Received unexpected status code from creating pool: ${result.status}`);
    }

    try {
      const res = await batchClient.path("/pools/{poolId}", poolId).get();

      if (isUnexpected(res)) {
        assert.fail(`Received unexpected status code from getting pool: ${res.status}`);
      }
      const upgradePolicy = res.body.upgradePolicy!;
      assert.equal(upgradePolicy.mode, "automatic");
      assert.deepEqual(upgradePolicy.automaticOSUpgradePolicy!, {
        disableAutomaticRollback: true,
        enableAutomaticOSUpgrade: true,
        useRollingUpgradePolicy: true,
        osRollingUpgradeDeferral: true,
      });
      assert.deepEqual(upgradePolicy.rollingUpgradePolicy!, {
        enableCrossZoneUpgrade: true,
        maxBatchInstancePercent: 20,
        maxUnhealthyInstancePercent: 20,
        maxUnhealthyUpgradedInstancePercent: 20,
        pauseTimeBetweenBatches: "PT0S",
        prioritizeUnhealthyInstances: false,
        rollbackFailedInstancesOnPolicyBreach: false,
      });
    } finally {
      await batchClient.path("/pools/{poolId}", poolId).delete();
    }
  });
});
