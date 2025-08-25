// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode, delay } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { createRecorder } from "../utils/recordedClient.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe.skip("MongoCluster test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: MongoClusterManagementClient;
  let location: string;
  let resourceGroup: string;
  let resourcename: string;
  let connectionName: string;

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
    location = "eastus";
    resourceGroup = "myjstest";
    resourcename = "resourcetest0602";
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it("mongoClusters for private endpoint create test", async () => {
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

  // need create a mongocluster first then create a private endpoint named testPEC with the mongocluster.
  it("private endpoint connection create test", async () => {
    for await (const item of client.privateEndpointConnections.listByMongoCluster(
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

  it("private endpoint connection get test", async () => {
    const res = await client.privateEndpointConnections.get(
      resourceGroup,
      resourcename,
      connectionName,
    );
    console.log(res);
    assert.equal(res.name, connectionName);
  });
  it("private endpoint connection list test", async () => {
    const resArray = new Array();
    for await (const item of client.privateEndpointConnections.listByMongoCluster(
      resourceGroup,
      resourcename,
    )) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("private endpoint connection delete test", async () => {
    for await (const item of client.privateEndpointConnections.listByMongoCluster(
      resourceGroup,
      resourcename,
    )) {
      connectionName = String(item.name);
    }
    const resArray = new Array();
    await client.privateEndpointConnections.delete(resourceGroup, resourcename, connectionName);
    for await (const item of client.privateEndpointConnections.listByMongoCluster(
      resourceGroup,
      resourcename,
    )) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("mongoClusters for private endpoint delete test", async () => {
    const resArray = new Array();
    await client.mongoClusters.delete(resourceGroup, resourcename);
    for await (const item of client.mongoClusters.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);

    await delay(isPlaybackMode() ? 1000 : 60000);
  });
});
