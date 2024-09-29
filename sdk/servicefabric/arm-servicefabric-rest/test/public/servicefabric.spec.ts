// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import {
  ApplicationTypeResourceListOutput,
  ApplicationTypeResourceOutput,
  ApplicationTypesCreateOrUpdateParameters,
  ClusterListResultOutput,
  ClusterOutput,
  ClustersCreateOrUpdateParameters,
  ClustersUpdateParameters,
  ServiceFabricClient,
  getLongRunningPoller,
} from "../../src/index";

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

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    client = await createClient(recorder);
    location = "eastus";
    resourceGroup = "myjstest";
    clusterName = "myclusterxxxy";
    applicationTypeName = "myapplicationtypexxxy";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("clusters create test", async function () {
    const parameters: ClustersCreateOrUpdateParameters = {
      body: {
        type: "Microsoft.ServiceFabric/clusters",
        location: location,
        id:
          "/subscriptions/" +
          subscriptionId +
          "/resourceGroups/" +
          resourceGroup +
          "/providers/Microsoft.ServiceFabric/clusters/" +
          clusterName,
        name: clusterName,
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
    const poller = getLongRunningPoller(client, initialResponse, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterOutput).name, clusterName);
  });

  it("applicationTypes create test", async function () {
    const parameters: ApplicationTypesCreateOrUpdateParameters = {
      body: {
        type: "applicationTypes",
        location: location,
        id:
          "/subscriptions/" +
          subscriptionId +
          "/resourceGroups/" +
          resourceGroup +
          "/providers/Microsoft.ServiceFabric/clusters/" +
          clusterName +
          "/applicationTypes/" +
          applicationTypeName,
        name: "myCluster",
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

  it("clusters get test", async function () {
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

  it("applicationTypes get test", async function () {
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

  it("clusters list test", async function () {
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/clusters",
        subscriptionId,
      )
      .get();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterListResultOutput).value?.length, 1);
  });

  it("applicationTypes list test", async function () {
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

  it("clusters update test", async function () {
    if (isPlaybackMode()) {
      this.skip();
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
    const poller = getLongRunningPoller(client, initialResponse, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.status, "200");
    assert.equal((result.body as ClusterOutput).properties?.upgradeMode, "Automatic");
  });

  it("applicationTypes delete test", async function () {
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
        subscriptionId,
        resourceGroup,
        clusterName,
        applicationTypeName,
      )
      .delete();
    const poller = getLongRunningPoller(client, initialResponse, testPollingOptions);
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

  it("clusters delete test", async function () {
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
