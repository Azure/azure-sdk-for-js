// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type {
  IpGroupsCreateOrUpdateParameters,
  IpGroupsDeleteParameters,
  IpGroupsGetParameters,
  IpGroupsListParameters,
  NetworkManagementClient,
  SubnetsCreateOrUpdateParameters,
  SubnetsDeleteParameters,
  SubnetsGetParameters,
  SubnetsListParameters,
  VirtualNetworksCreateOrUpdateParameters,
  VirtualNetworksDeleteParameters,
  VirtualNetworksGetParameters,
  VirtualNetworksListParameters,
  VirtualNetworksUpdateTagsParameters,
} from "../../src/index.js";
import { getLongRunningPoller, isUnexpected, paginate } from "../../src/index.js";
import { createTestNetworkManagementClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Network test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: NetworkManagementClient;
  let location: string;
  let resourceGroupName: string;
  let virtualNetworkName: string;
  let subnet_name: string;
  let ipGroupName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = createTestNetworkManagementClient(recorder, credential);
    location = "eastus";
    resourceGroupName = env.RESOURCE_GROUP_NAME || "myjstest";
    virtualNetworkName = "virtualnetworkzzz";
    subnet_name = "subnetnamexx";
    ipGroupName = "ipgroupyyy";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("virtualNetworks create test", async () => {
    const option: VirtualNetworksCreateOrUpdateParameters = {
      body: {
        properties: {
          addressSpace: {
            addressPrefixes: ["10.0.0.0/16"],
          },
        },
        location: location,
      },
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
      )
      .put(option);

    if (isUnexpected(res)) {
      throw "create virtualNetworks set error result" + res;
    }

    const poller = await getLongRunningPoller(client, res, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.body.name, virtualNetworkName);
  });

  it("subnets create test", async () => {
    const option: SubnetsCreateOrUpdateParameters = {
      body: {
        properties: {
          addressPrefix: "10.0.0.0/24",
        },
      },
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
        subnet_name,
      )
      .put(option);

    if (isUnexpected(res)) {
      throw "create subnets set error result" + res;
    }
    const poller = await getLongRunningPoller(client, res, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.body.name, subnet_name);
  });

  it("ipGroups create test", async () => {
    const option: IpGroupsCreateOrUpdateParameters = {
      body: {
        tags: {
          key1: "value1",
        },
        location: "eastus",
        properties: {
          ipAddresses: ["13.64.39.16/32", "40.74.146.80/31", "40.74.147.32/28"],
        },
      },
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups/{ipGroupsName}",
        subscriptionId,
        resourceGroupName,
        ipGroupName,
      )
      .put(option);

    if (isUnexpected(res)) {
      throw "create ipGroups set error result" + res;
    }
    const poller = await getLongRunningPoller(client, res, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.body.name, ipGroupName);
  });

  it("virtualNetworks get test", async () => {
    const option: VirtualNetworksGetParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
      )
      .get(option);

    if (isUnexpected(res)) {
      throw "get virtualNetworks set error result" + res;
    }
    assert.equal(res.body.name, virtualNetworkName);
  });

  it("subnets get test", async () => {
    const option: SubnetsGetParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
        subnet_name,
      )
      .get(option);

    if (isUnexpected(res)) {
      throw "get subnets set error result" + res;
    }
    const poller = await getLongRunningPoller(client, res, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.body.name, subnet_name);
  });

  it("ipGroups get test", async () => {
    const option: IpGroupsGetParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups/{ipGroupsName}",
        subscriptionId,
        resourceGroupName,
        ipGroupName,
      )
      .get(option);

    if (isUnexpected(res)) {
      throw "get ipGroups set error result" + res;
    }
    const poller = await getLongRunningPoller(client, res, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.body.name, ipGroupName);
  });

  it("virtualNetworks list test", async () => {
    const option: VirtualNetworksListParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks",
        subscriptionId,
        resourceGroupName,
      )
      .get(option);

    const pageData = paginate(client, res);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }
    assert.equal(result.length, 1);
  });

  it("subnets list test", async () => {
    const option: SubnetsListParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
      )
      .get(option);

    const pageData = paginate(client, res);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }
    assert.equal(result.length, 1);
  });

  it("ipGroups list test", async () => {
    const option: IpGroupsListParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups",
        subscriptionId,
        resourceGroupName,
      )
      .get(option);

    const pageData = paginate(client, res);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }
    assert.equal(result.length, 1);
  });

  it("virtualNetworks updatetags test", async () => {
    const options: VirtualNetworksUpdateTagsParameters = {
      body: { tags: { tag1: "value1", tag2: "value2" } },
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
      )
      .patch(options);

    if (isUnexpected(res)) {
      throw "update virtualNetworks set error result" + res;
    }
    const poller = await getLongRunningPoller(client, res, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.body.name, virtualNetworkName);
  });

  it("ipGroups beginDeleteAndWait test", async () => {
    const options: IpGroupsDeleteParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const deleteInitialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups/{ipGroupsName}",
        subscriptionId,
        resourceGroupName,
        ipGroupName,
      )
      .delete(options);

    const poller = await getLongRunningPoller(client, deleteInitialResponse, testPollingOptions);
    const deleteResponse = await poller.pollUntilDone();

    if (isUnexpected(deleteResponse)) {
      throw "delete ipGroups set error result" + deleteResponse;
    }

    const option: IpGroupsListParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups",
        subscriptionId,
        resourceGroupName,
      )
      .get(option);

    const pageData = paginate(client, res);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }
    assert.equal(result.length, 0);
  });

  it("subnets beginDeleteAndWait test", async () => {
    const options: SubnetsDeleteParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const deleteInitialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
        subnet_name,
      )
      .delete(options);

    const poller = await getLongRunningPoller(client, deleteInitialResponse, testPollingOptions);
    const deleteResponse = await poller.pollUntilDone();

    if (isUnexpected(deleteResponse)) {
      throw "delete subnets set error result" + deleteResponse;
    }

    const option: SubnetsListParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
      )
      .get(option);

    const pageData = paginate(client, res);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }
    assert.equal(result.length, 0);
  });

  it("virtualNetworks beginDeleteAndWait test", async () => {
    const options: VirtualNetworksDeleteParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const deleteInitialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
        subscriptionId,
        resourceGroupName,
        virtualNetworkName,
      )
      .delete(options);

    const poller = await getLongRunningPoller(client, deleteInitialResponse, testPollingOptions);
    const deleteResponse = await poller.pollUntilDone();

    if (isUnexpected(deleteResponse)) {
      throw "delete virtualNetworks set error result" + deleteResponse;
    }

    const option: VirtualNetworksListParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks",
        subscriptionId,
        resourceGroupName,
      )
      .get(option);

    const pageData = paginate(client, res);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }
    assert.equal(result.length, 0);
  });
});
