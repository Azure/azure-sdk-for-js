// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type {
  ApplicationTypeResourceListOutput,
  ApplicationTypeResourceOutput,
  ApplicationTypesCreateOrUpdateParameters,
  ClusterListResultOutput,
  ClusterOutput,
  ClustersCreateOrUpdateParameters,
  ClustersUpdateParameters,
  ServiceFabricClient,
} from "../../src/index.js";
import { getLongRunningPoller } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Service Fabric Rest Level Client Test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: ServiceFabricClient;
  let location: string;
  let resourceGroup: string;
  let clusterName: string;
  let applicationTypeName: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    client = await createClient(recorder);
    location = "eastus";
    resourceGroup = "myjstest";
    clusterName = "myclusterxxxy";
    applicationTypeName = "myapplicationtypexxxy";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("clusters create test", async () => {
    const parameters: ClustersCreateOrUpdateParameters = {
      body: {
        location: location,
        properties: {
          managementEndpoint: "http://myCluster.eastus.cloudapp.azure.com:19080",
          fabricSettings: [
            {
              name: "UpgradeService",
              parameters: [
                {
                  name: "AppPollIntervalInSeconds",
                  value: "60",
                },
              ],
            },
          ],
          diagnosticsStorageAccountConfig: {
            storageAccountName: "diag",
            protectedAccountKeyName: "StorageAccountKey1",
            blobEndpoint: "https://diag.blob.core.windows.net/",
            queueEndpoint: "https://diag.queue.core.windows.net/",
            tableEndpoint: "https://diag.table.core.windows.net/",
          },
          nodeTypes: [
            {
              name: "nt1vm",
              clientConnectionEndpointPort: 19000,
              httpGatewayEndpointPort: 19007,
              applicationPorts: {
                startPort: 20000,
                endPort: 30000,
              },
              ephemeralPorts: {
                startPort: 49000,
                endPort: 64000,
              },
              isPrimary: true,
              vmInstanceCount: 5,
              durabilityLevel: "Bronze",
            },
          ],
          reliabilityLevel: "Silver",
          upgradeMode: "Automatic",
        },
      },
    };
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
        subscriptionId,
        resourceGroup,
        clusterName,
      )
      .put(parameters);
    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterOutput).name, clusterName);
  });

  it("applicationTypes create test", async () => {
    const parameters: ApplicationTypesCreateOrUpdateParameters = {
      body: {
        location: location,
      },
    };
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
        subscriptionId,
        resourceGroup,
        clusterName,
        applicationTypeName,
      )
      .put(parameters);
    assert.equal(result.status, "200");
    assert.equal((result.body as ApplicationTypeResourceOutput).name, applicationTypeName);
  });

  it("clusters get test", async () => {
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
        subscriptionId,
        resourceGroup,
        clusterName,
      )
      .get();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterOutput).name, clusterName);
  });

  it("applicationTypes get test", async () => {
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
        subscriptionId,
        resourceGroup,
        clusterName,
        applicationTypeName,
      )
      .get();
    assert.equal(result.status, "200");
    assert.equal((result.body as ApplicationTypeResourceOutput).name, applicationTypeName);
  });

  it("clusters list test", async () => {
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/clusters",
        subscriptionId,
      )
      .get();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterListResultOutput).value?.length, 1);
  });

  it("applicationTypes list test", async () => {
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes",
        subscriptionId,
        resourceGroup,
        clusterName,
      )
      .get();
    assert.equal(result.status, "200");
    assert.equal((result.body as ApplicationTypeResourceListOutput).value?.length, 1);
  });

  it("clusters update test", async function (ctx) {
    if (isPlaybackMode()) {
      ctx.skip();
    }
    const parameters: ClustersUpdateParameters = {
      body: {
        tags: {
          a: "b",
        },
        properties: {
          nodeTypes: [
            {
              name: "nt1vm",
              clientConnectionEndpointPort: 19000,
              httpGatewayEndpointPort: 19007,
              applicationPorts: {
                startPort: 20000,
                endPort: 30000,
              },
              ephemeralPorts: {
                startPort: 49000,
                endPort: 64000,
              },
              isPrimary: true,
              vmInstanceCount: 5,
              durabilityLevel: "Bronze",
            },
            {
              name: "testnt1",
              clientConnectionEndpointPort: 0,
              httpGatewayEndpointPort: 0,
              applicationPorts: {
                startPort: 1000,
                endPort: 2000,
              },
              ephemeralPorts: {
                startPort: 3000,
                endPort: 4000,
              },
              isPrimary: false,
              vmInstanceCount: 3,
              durabilityLevel: "Bronze",
            },
          ],
          reliabilityLevel: "Bronze",
          upgradeMode: "Automatic",
          eventStoreServiceEnabled: true,
        },
      },
    };
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
        subscriptionId,
        resourceGroup,
        clusterName,
      )
      .patch(parameters);
    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterOutput).properties?.upgradeMode, "Automatic");
  });

  it("applicationTypes delete test", async () => {
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
        subscriptionId,
        resourceGroup,
        clusterName,
        applicationTypeName,
      )
      .delete();
    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const deleteResult = await poller.pollUntilDone();
    assert.equal(deleteResult.status, "204");

    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes",
        subscriptionId,
        resourceGroup,
        clusterName,
      )
      .get();
    assert.equal(result.status, "200");
    assert.equal((result.body as ApplicationTypeResourceListOutput).value?.length, 0);
  });

  it("clusters delete test", async () => {
    const deleteResult = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
        subscriptionId,
        resourceGroup,
        clusterName,
      )
      .delete();
    assert.equal(deleteResult.status, "200");
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters",
        subscriptionId,
        resourceGroup,
      )
      .get();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterListResultOutput).value?.length, 0);
  });
});
