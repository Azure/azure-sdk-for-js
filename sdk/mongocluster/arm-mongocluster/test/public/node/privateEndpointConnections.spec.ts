/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import { env, Recorder, isPlaybackMode, delay } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { MongoClusterManagementClient } from "../../../src/mongoClusterManagementClient.js";
import { createRecorder } from "../utils/recordedClient.js";
import { NetworkManagementClient } from "@azure/arm-network";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("MongoCluster test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: MongoClusterManagementClient;
  let networkClient: NetworkManagementClient;
  let location: string;
  let resourceGroup: string;
  let resourcename: string;
  let connectionName: string;
  let virtualNetworkName: string;
  let privateEndpointName: string;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new MongoClusterManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    networkClient = new NetworkManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus";
    resourceGroup = "myjstest";
    resourcename = "resourcetest1";
    virtualNetworkName = "testvn";
    privateEndpointName = "testPEC";
  });

  afterEach(async function () {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it("mongoClusters for private endpoint create test", async function () {
    const res = await client.mongoClusters.createOrUpdate(
      resourceGroup,
      resourcename,
      {
        location,
        properties: {
          administrator: {
            userName: "mongoAdmin",
            password: "SecureString;",
          },
          serverVersion: "5.0",
          storage: { sizeGb: 128 },
          compute: { tier: "M30" },
          sharding: { shardCount: 1 },
          highAvailability: { targetMode: "Disabled" },
        },
      },
      testPollingOptions,
    );
    assert.equal(res.name, resourcename);
  });

  it("virtual network create test", async function () {
    const res = await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroup,
      virtualNetworkName,
      {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        flowTimeoutInMinutes: 10,
        location,
      },
    );
    assert.equal(res.name, virtualNetworkName);

    await networkClient.subnets.beginCreateOrUpdateAndWait(
      resourceGroup,
      virtualNetworkName,
      "testsubnet",
      { addressPrefix: "10.0.0.0/16" },
    );
  });

  it("private endpoit create test", async function () {
    const clusterRes = await client.mongoClusters.get(resourceGroup, resourcename);
    const res = await networkClient.privateEndpoints.beginCreateOrUpdateAndWait(
      resourceGroup,
      privateEndpointName,
      {
        location,
        customNetworkInterfaceName: privateEndpointName + "-nic",
        privateLinkServiceConnections: [
          {
            name: privateEndpointName,
            groupIds: ["MongoCluster"],
            privateLinkServiceId: clusterRes.id,
            requestMessage: "Please approve my connection.",
          },
        ],
        subnet: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/virtualNetworks/" +
            virtualNetworkName +
            "/subnets/testsubnet",
        },
      },
      testPollingOptions,
    );
    assert.equal(res.name, privateEndpointName);
  });

  // need create a mongocluster first then create a private endpoint named testPEC with the mongocluster.
  it("private endpoint connection create test", async function () {
    for await (let item of client.privateEndpointConnections.listByMongoCluster(
      resourceGroup,
      resourcename,
    )) {
      connectionName = String(item.name);
    }
    const res = await client.privateEndpointConnections.create(
      resourceGroup,
      resourcename,
      connectionName,
      {
        properties: {
          privateLinkServiceConnectionState: {
            status: "Rejected",
          },
        },
      },
      testPollingOptions,
    );
    console.log(res);
    assert.equal(res.name, connectionName);
  });

  it("private endpoint connection get test", async function () {
    const res = await client.privateEndpointConnections.get(
      resourceGroup,
      resourcename,
      connectionName,
    );
    console.log(res);
    assert.equal(res.name, connectionName);
  });
  it("private endpoint connection list test", async function () {
    const resArray = new Array();
    for await (let item of client.privateEndpointConnections.listByMongoCluster(
      resourceGroup,
      resourcename,
    )) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("private endpoint connection delete test", async function () {
    for await (let item of client.privateEndpointConnections.listByMongoCluster(
      resourceGroup,
      resourcename,
    )) {
      connectionName = String(item.name);
    }
    const resArray = new Array();
    await client.privateEndpointConnections.delete(resourceGroup, resourcename, connectionName);
    for await (let item of client.privateEndpointConnections.listByMongoCluster(
      resourceGroup,
      resourcename,
    )) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("private endpoint delete test", async function () {
    const resArray = new Array();
    await networkClient.privateEndpoints.beginDeleteAndWait(resourceGroup, privateEndpointName);
    for await (let item of networkClient.privateEndpoints.list(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("virtual network delete test", async function () {
    const resArray = new Array();
    await networkClient.virtualNetworks.beginDeleteAndWait(resourceGroup, virtualNetworkName);
    for await (let item of networkClient.virtualNetworks.list(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("mongoClusters for private endpoint delete test", async function () {
    const resArray = new Array();
    await client.mongoClusters.delete(resourceGroup, resourcename);
    for await (let item of client.mongoClusters.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);

    await delay(isPlaybackMode() ? 1000 : 60000);
  });
});
