// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createBatchClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import {
  BatchClient,
  BatchPoolResizeParameters,
  BatchPoolUpdateParameters,
  CreatePoolParameters,
  GetPoolParameters,
  ListPoolsParameters,
  ReplacePoolPropertiesParameters,
  ResizePoolParameters,
  isUnexpected,
  paginate,
} from "../../src";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets";
import { wait } from "./utils/wait";
import { fail } from "assert";
import { getResourceName, LONG_TEST_TIMEOUT, POLLING_INTERVAL } from "./utils/helpers";

const BASIC_POOL = getResourceName("Pool-Basic");
const VMSIZE_D1 = "Standard_D1_v2";
const VMSIZE_A1 = "Standard_A1_v2";
const BASIC_POOL_NUM_VMS = 4;
const DISK_POOL = getResourceName("Pool-Datadisk");
const ENDPOINT_POOL = getResourceName("Pool-Endpoint");
const TEST_POOL3 = getResourceName("Pool-3");
const VMSIZE_SMALL = "small";
// const certThumb = "cff2ab63c8c955aaf71989efa641b906558d9fb7";
// const certAlgorithm = "sha1";

describe("Pool Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;

  const nonAdminPoolUser: string = "nonAdminUser";

  /**
   * Provision helper resources needed for testing pools
   */
  // before(async function () {
  // const batchClient = createBatchClient("AAD");

  // const cert: CertificatesAddParameters = {
  //       body: {thumbprint: certThumb,
  //       thumbprintAlgorithm: certAlgorithm,
  //       password: "nodesdk",
  //       certificateFormat: "pfx",
  //       data:
  //         "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"
  //     },
  //     contentType: "application/json; odata=minimalmetadata"
  //   };

  //   const certResponse = await batchClient.path("/certificates").post(cert);
  //   if (isUnexpected(certResponse)) {
  //       fail(`Received unexpected status code from creating certificate: ${certResponse.status}
  //             Unable to provision resource needed for Pool Testing`)
  //     }
  // })

  /**
   * Unprovision helper resources after all tests ran
   */
  // after(async function () {
  // const batchClient = createBatchClient("AAD");

  //   const certResponse = await batchClient.path("/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})", certAlgorithm, certThumb).delete();
  //   if (isUnexpected(certResponse)) {
  //       fail(`Received unexpected status code from deleting certificate: ${certResponse.status}. Certificate Resource Leaked`);
  //     }

  //     let routePath = "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})";
  //     routePath.replace
  // })

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    batchClient = createBatchClient("AAD", recorder);
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
        cloudServiceConfiguration: { osFamily: "4" },
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
    const options: BatchPoolUpdateParameters = {
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
      fail(`Received unexpected status code from getting pool: ${getResult.status}
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
    let getResult: any;
    let metadata: any;
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      getResult = await batchClient.path("/pools/{poolId}", poolId).get();
      if (isUnexpected(getResult)) {
        fail(`Received unexpected status code from getting pool: ${getResult.status}
              Response Body: ${getResult.body.message}`);
      }
      metadata = getResult.body.metadata![0];
      if (getResult.body.allocationState === "steady") {
        break;
      } else {
        await wait(POLLING_INTERVAL);
      }
    }

    assert.equal(getResult.body.id, poolId);
    assert.equal(getResult.body.state, "active");
    assert.equal(getResult.body.allocationState, "steady");
    assert.isDefined(getResult.body.cloudServiceConfiguration);
    assert.equal(getResult.body.cloudServiceConfiguration!.osFamily, "4");
    assert.equal(getResult.body.vmSize.toLowerCase(), VMSIZE_D1.toLowerCase());
    assert.equal(getResult.body.targetDedicatedNodes, BASIC_POOL_NUM_VMS);
    assert.isFalse(getResult.body.enableAutoScale);

    assert.equal(metadata.name, "foo2");
    assert.equal(metadata.value, "bar2");

    assert.isDefined(getResult.body.startTask);
    assert.equal(getResult.body.startTask!.commandLine, "cmd /c echo hello > hello.txt");

    assert.lengthOf(getResult.body.userAccounts!, 1);
    assert.equal(getResult.body.userAccounts![0].name, nonAdminPoolUser);
    assert.equal(getResult.body.userAccounts![0].elevationLevel, "nonadmin");
  }).timeout(LONG_TEST_TIMEOUT);

  it("should update pool parameters successfully", async function () {
    const updateOptions: ReplacePoolPropertiesParameters = {
      body: {
        metadata: [{ name: "foo", value: "bar" }],
        certificateReferences: [],
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
      fail(`Received unexpected status code from getting pool: ${getResult.status}
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
      fail(`Received unexpected status code from getting pool: ${getResult.status}
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
      fail(`Received unexpected status code from listing pools: ${listPoolResult.status}
              Response Body: ${listPoolResult.body.message}`);
    }

    assert.isAtLeast(listPoolResult.body.value?.length ?? 0, 1);
  });

  it("should list a maximum number of pools", async () => {
    const listOptions = { queryParameters: { maxResults: 1 } };
    const listPoolResult = await batchClient.path("/pools").get(listOptions);

    if (isUnexpected(listPoolResult)) {
      fail(`Received unexpected status code from listing pools: ${listPoolResult.status}
              Response Body: ${listPoolResult.body.message}`);
    }

    assert.isAtLeast(
      listPoolResult.body.value?.length ?? 0,
      listOptions.queryParameters.maxResults
    );
  });

  it("should fail to list pools with invalid max", async () => {
    const listOptions = { queryParameters: { maxResults: -5 } };
    const listPoolResult = await batchClient.path("/pools").get(listOptions);

    if (!isUnexpected(listPoolResult)) {
      fail(`Received successful list pool result when expected an error reply`);
    }

    // TODO Once Error Responses are fixed, modify assertion below
    // assert.isDefined(listPoolResult.body.error);
    // TODO Remove console statement
    // console.log(listPoolResult.body.error);
    // assert.equal(listPoolResult.body.message, '"options.poolListOptions.maxResults" with value "-5" should satisfy the constraint "InclusiveMinimum": 1.'))
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
      fail(`Received unexpected status code from listing pools: ${listPoolsResult.status}
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
      fail(`Received unexpected status code from getting pool: ${getResult.status}
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
    let nodeList = [];
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      nodeList = [];
      const listResult = await batchClient.path("/pools/{poolId}/nodes", poolId).get();

      if (isUnexpected(listResult)) {
        fail(`Received unexpected status code from list compute nodes: ${listResult.status}
              Response Body: ${listResult.body.message}`);
      }

      const paginateResponse = paginate(batchClient, listResult);
      for await (const node of paginateResponse) {
        nodeList.push(node);
      }
      if (nodeList.length > 0) {
        break;
      } else {
        await wait(POLLING_INTERVAL);
      }
    }

    assert.lengthOf(nodeList, 1);
    assert.isDefined(nodeList[0].endpointConfiguration);
    assert.lengthOf(nodeList[0].endpointConfiguration!.inboundEndpoints, 2);
    assert.equal(
      nodeList[0].endpointConfiguration!.inboundEndpoints[0].name,
      "TestEndpointConfig.0"
    );
    assert.equal(nodeList[0].endpointConfiguration!.inboundEndpoints[0].protocol, "udp");
  }).timeout(LONG_TEST_TIMEOUT);

  it("should get pool node counts successfully", async () => {
    let poolList = [];
    let endpointPool;
    const poolId = recorder.variable("ENDPOINT_POOL", ENDPOINT_POOL);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      poolList = [];
      const listNodeCountResult = await batchClient.path("/nodecounts").get();
      if (isUnexpected(listNodeCountResult)) {
        fail(`Received unexpected status code from list compute nodes: ${listNodeCountResult.status}
              Response Body: ${listNodeCountResult.body.message}`);
      }

      const paginateResponse = paginate(batchClient, listNodeCountResult);
      for await (const pool of paginateResponse) {
        poolList.push(pool);
      }

      if (poolList.length > 0) {
        endpointPool = poolList.filter((pool) => pool.poolId === poolId);
        if (endpointPool.length > 0 && endpointPool[0].dedicated!.idle > 0) {
          break;
        }
      } else {
        await wait(POLLING_INTERVAL);
      }
    }

    const endpointPoolObj = poolList.filter((pool) => pool.poolId === poolId);
    assert.isAbove(endpointPoolObj.length, 0, `Pool with Pool Id ${poolId} not found`);
    assert.equal(endpointPoolObj[0].dedicated!.idle, 1);
    assert.equal(endpointPool[0].lowPriority!.total, 0);
  }).timeout(LONG_TEST_TIMEOUT);

  // it("should add a pool with vnet and get expected error", async () => {
  //     const pool: Pool = {
  //       id: recorder.variable("VNET_POOL", VNET_POOL),
  //       vmSize: VMSIZE_A1,
  //       cloudServiceConfiguration: { osFamily: "4" },
  //       targetDedicatedNodes: 0,
  //       networkConfiguration: {
  //         subnetId:
  //           "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1"
  //       }
  //     };

  //     try {
  //       await batchClient.pool.add(pool);
  //       assert.fail("Expected error to be thrown");
  //     } catch (error: any) {
  //       assert.equal(error.statusCode, 403);
  //       assert.equal(error.details.code, "Forbidden");
  //     }
  //   });

  //   it("should add a pool with a custom image and get expected error", async () => {
  //     const pool: Pool = {
  //       id: recorder.variable("IMAGE_POOL", IMAGE_POOL),
  //       vmSize: VMSIZE_A1,
  //       virtualMachineConfiguration: {
  //         imageReference: {
  //           virtualMachineImageId:
  //             "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Microsoft.Compute/images/FakeImage"
  //         },
  //         nodeAgentSKUId: "batch.node.ubuntu 16.04"
  //       },
  //       targetDedicatedNodes: 0
  //     };

  //     try {
  //       await batchClient.pool.add(pool);
  //       assert.fail("Expected error to be thrown");
  //     } catch (error: any) {
  //       assert.equal(error.statusCode, 400);
  //       assert.equal(error.details.code, "InvalidPropertyValue");
  //       assert.equal(error.details.values[0].value, "virtualMachineImageId");
  //     }
  //   });

  it("should create a second pool successfully", async () => {
    const poolAddParams: CreatePoolParameters = {
      body: {
        id: recorder.variable("TEST_POOL3", TEST_POOL3),
        vmSize: VMSIZE_SMALL,
        cloudServiceConfiguration: { osFamily: "4" },
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const addPoolResult = await batchClient.path("/pools").post(poolAddParams);
    assert.equal(addPoolResult.status, "201");
  });

  it("should start pool resizing successfully", async () => {
    const poolId = recorder.variable("TEST_POOL3", TEST_POOL3);
    const poolResizing = true;
    let getPoolResult;
    while (poolResizing) {
      getPoolResult = await batchClient.path("/pools/{poolId}", poolId).get();
      if (isUnexpected(getPoolResult)) {
        fail(`Received unexpected status code from getting pool: ${getPoolResult.status}
            Response Body: ${getPoolResult.body.message}`);
      }
      if (getPoolResult.body.allocationState === "steady") {
        break;
      } else {
        await wait(POLLING_INTERVAL * 2);
      }
    }

    const options: BatchPoolResizeParameters = {
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

  // it("should get pool lifetime statistics", async () => {
  //   const getPoolLifeTimeStatsResult = await batchClient.path("/lifetimepoolstats").get();
  //   if (isUnexpected(getPoolLifeTimeStatsResult)) {
  //     fail(`Received unexpected status code from getting life time pool stats: ${getPoolLifeTimeStatsResult.status}
  //           Response Body: ${getPoolLifeTimeStatsResult.body.message}`);
  //   }

  //   assert.equal(getPoolLifeTimeStatsResult.status, "200");

  //   assert.isDefined(getPoolLifeTimeStatsResult.body.usageStats);
  //   assert.isDefined(getPoolLifeTimeStatsResult.body.resourceStats);
  // });

  it("should list pools usage metrics", async () => {
    const listPoolUsageResult = await batchClient.path("/poolusagemetrics").get();
    if (isUnexpected(listPoolUsageResult)) {
      fail(`Received unexpected status code from getting pool usage metrics: ${listPoolUsageResult.status}
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
});
