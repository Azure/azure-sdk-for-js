// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Additional Resource Tests for Discovery ARM Client
 *
 * Tests for resources not covered in the main discovery.spec.ts:
 * - ChatModelDeployments
 * - NodePools
 * - StorageAssets
 * - Tools
 * - PrivateEndpoints (Workspace + Bookshelf)
 */

import { env, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  recorderStartOptions,
  getSubscriptionId,
  EUAP_ENDPOINT,
} from "./utils/recorderUtils.js";
import { createRedirectToEuapPolicy } from "./utils/redirectToEuapPolicy.js";

// Skip tests until API is stable and resources exist
const skipTests = true;

describe.skipIf(skipTests)("Discovery ARM Client - Additional Resources", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;
  let resourceGroupName: string;

  // Test resource names
  const workspaceName = "wrksptest44";
  const supercomputerName = "test-supercomputer";
  const storageContainerName = "test-storage-container";
  const bookshelfName = "test-bookshelf";

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderStartOptions);

    subscriptionId = getSubscriptionId();
    const credential = createTestCredential();

    const clientOptions = recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createRedirectToEuapPolicy(EUAP_ENDPOINT),
          position: "perCall",
        },
      ],
    });
    client = new DiscoveryClient(credential, subscriptionId, clientOptions);
    resourceGroupName = env.DISCOVERY_RESOURCE_GROUP || "newapiversiontest";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // ============ ChatModelDeployment Tests ============

  describe("chatModelDeployments", () => {
    it.skip("should list chat model deployments by workspace", async () => {
      const deployments: any[] = [];
      for await (const deployment of client.chatModelDeployments.listByWorkspace(
        resourceGroupName,
        workspaceName,
      )) {
        deployments.push(deployment);
      }
      assert.isArray(deployments);
    });

    it.skip("should get a chat model deployment", async () => {
      const deploymentName = "test-deployment";
      const deployment = await client.chatModelDeployments.get(
        resourceGroupName,
        workspaceName,
        deploymentName,
      );
      assert.isNotNull(deployment);
    });

    it.skip("should create a chat model deployment", async () => {
      const deploymentName = "test-deployment";
      const poller = client.chatModelDeployments.createOrUpdate(
        resourceGroupName,
        workspaceName,
        deploymentName,
        { location: "eastus", properties: {} },
      );
      const result = await poller.pollUntilDone();
      assert.equal(result.name, deploymentName);
    });

    it.skip("should delete a chat model deployment", async () => {
      const deploymentName = "test-deployment";
      const poller = client.chatModelDeployments.delete(
        resourceGroupName,
        workspaceName,
        deploymentName,
      );
      await poller.pollUntilDone();
    });
  });

  // ============ NodePool Tests ============

  describe("nodePools", () => {
    it.skip("should list node pools by supercomputer", async () => {
      const nodePools: any[] = [];
      for await (const nodePool of client.nodePools.listBySupercomputer(
        resourceGroupName,
        supercomputerName,
      )) {
        nodePools.push(nodePool);
      }
      assert.isArray(nodePools);
    });

    it.skip("should get a node pool", async () => {
      const nodePoolName = "test-nodepool";
      const nodePool = await client.nodePools.get(
        resourceGroupName,
        supercomputerName,
        nodePoolName,
      );
      assert.isNotNull(nodePool);
    });

    it.skip("should create a node pool", async () => {
      const nodePoolName = "test-nodepool";
      const poller = client.nodePools.createOrUpdate(
        resourceGroupName,
        supercomputerName,
        nodePoolName,
        { properties: {} },
      );
      const result = await poller.pollUntilDone();
      assert.equal(result.name, nodePoolName);
    });

    it.skip("should delete a node pool", async () => {
      const nodePoolName = "test-nodepool";
      const poller = client.nodePools.delete(resourceGroupName, supercomputerName, nodePoolName);
      await poller.pollUntilDone();
    });
  });

  // ============ StorageAsset Tests ============

  describe("storageAssets", () => {
    it.skip("should list storage assets by storage container", async () => {
      const assets: any[] = [];
      for await (const asset of client.storageAssets.listByStorageContainer(
        resourceGroupName,
        storageContainerName,
      )) {
        assets.push(asset);
      }
      assert.isArray(assets);
    });

    it.skip("should get a storage asset", async () => {
      const assetName = "test-asset";
      const asset = await client.storageAssets.get(
        resourceGroupName,
        storageContainerName,
        assetName,
      );
      assert.isNotNull(asset);
    });

    it.skip("should create a storage asset", async () => {
      const assetName = "test-asset";
      const poller = client.storageAssets.createOrUpdate(
        resourceGroupName,
        storageContainerName,
        assetName,
        { properties: {} },
      );
      const result = await poller.pollUntilDone();
      assert.equal(result.name, assetName);
    });

    it.skip("should delete a storage asset", async () => {
      const assetName = "test-asset";
      const poller = client.storageAssets.delete(resourceGroupName, storageContainerName, assetName);
      await poller.pollUntilDone();
    });
  });

  // ============ Tool Tests ============

  describe("tools", () => {
    it.skip("should list tools by subscription", async () => {
      const tools: any[] = [];
      for await (const tool of client.tools.listBySubscription()) {
        tools.push(tool);
      }
      assert.isArray(tools);
    });

    it.skip("should list tools by resource group", async () => {
      const tools: any[] = [];
      for await (const tool of client.tools.listByResourceGroup(resourceGroupName)) {
        tools.push(tool);
      }
      assert.isArray(tools);
    });

    it.skip("should get a tool", async () => {
      const toolName = "test-tool";
      const tool = await client.tools.get(resourceGroupName, toolName);
      assert.isNotNull(tool);
    });

    it.skip("should create a tool", async () => {
      const toolName = "test-tool";
      const poller = client.tools.createOrUpdate(resourceGroupName, toolName, {
        location: "eastus",
        properties: {},
      });
      const result = await poller.pollUntilDone();
      assert.equal(result.name, toolName);
    });

    it.skip("should delete a tool", async () => {
      const toolName = "test-tool";
      const poller = client.tools.delete(resourceGroupName, toolName);
      await poller.pollUntilDone();
    });
  });

  // ============ Workspace Private Endpoint Connection Tests ============

  describe("workspacePrivateEndpointConnections", () => {
    it.skip("should list workspace private endpoint connections", async () => {
      const connections: any[] = [];
      for await (const conn of client.workspacePrivateEndpointConnections.listByWorkspace(
        resourceGroupName,
        workspaceName,
      )) {
        connections.push(conn);
      }
      assert.isArray(connections);
    });

    it.skip("should get a workspace private endpoint connection", async () => {
      const connectionName = "test-pe-connection";
      const connection = await client.workspacePrivateEndpointConnections.get(
        resourceGroupName,
        workspaceName,
        connectionName,
      );
      assert.isNotNull(connection);
    });

    it.skip("should create a workspace private endpoint connection", async () => {
      const connectionName = "test-pe-connection";
      const poller = client.workspacePrivateEndpointConnections.createOrUpdate(
        resourceGroupName,
        workspaceName,
        connectionName,
        {},
      );
      const result = await poller.pollUntilDone();
      assert.isNotNull(result);
    });

    it.skip("should delete a workspace private endpoint connection", async () => {
      const connectionName = "test-pe-connection";
      const poller = client.workspacePrivateEndpointConnections.delete(
        resourceGroupName,
        workspaceName,
        connectionName,
      );
      await poller.pollUntilDone();
    });
  });

  // ============ Workspace Private Link Resource Tests ============

  describe("workspacePrivateLinkResources", () => {
    it.skip("should list workspace private link resources", async () => {
      const resources: any[] = [];
      for await (const resource of client.workspacePrivateLinkResources.listByWorkspace(
        resourceGroupName,
        workspaceName,
      )) {
        resources.push(resource);
      }
      assert.isArray(resources);
    });

    it.skip("should get a workspace private link resource", async () => {
      const resourceName = "workspace";
      const resource = await client.workspacePrivateLinkResources.get(
        resourceGroupName,
        workspaceName,
        resourceName,
      );
      assert.isNotNull(resource);
    });
  });

  // ============ Bookshelf Private Endpoint Connection Tests ============

  describe("bookshelfPrivateEndpointConnections", () => {
    it.skip("should list bookshelf private endpoint connections", async () => {
      const connections: any[] = [];
      for await (const conn of client.bookshelfPrivateEndpointConnections.listByBookshelf(
        resourceGroupName,
        bookshelfName,
      )) {
        connections.push(conn);
      }
      assert.isArray(connections);
    });

    it.skip("should get a bookshelf private endpoint connection", async () => {
      const connectionName = "test-pe-connection";
      const connection = await client.bookshelfPrivateEndpointConnections.get(
        resourceGroupName,
        bookshelfName,
        connectionName,
      );
      assert.isNotNull(connection);
    });

    it.skip("should create a bookshelf private endpoint connection", async () => {
      const connectionName = "test-pe-connection";
      const poller = client.bookshelfPrivateEndpointConnections.createOrUpdate(
        resourceGroupName,
        bookshelfName,
        connectionName,
        {},
      );
      const result = await poller.pollUntilDone();
      assert.isNotNull(result);
    });

    it.skip("should delete a bookshelf private endpoint connection", async () => {
      const connectionName = "test-pe-connection";
      const poller = client.bookshelfPrivateEndpointConnections.delete(
        resourceGroupName,
        bookshelfName,
        connectionName,
      );
      await poller.pollUntilDone();
    });
  });

  // ============ Bookshelf Private Link Resource Tests ============

  describe("bookshelfPrivateLinkResources", () => {
    it.skip("should list bookshelf private link resources", async () => {
      const resources: any[] = [];
      for await (const resource of client.bookshelfPrivateLinkResources.listByBookshelf(
        resourceGroupName,
        bookshelfName,
      )) {
        resources.push(resource);
      }
      assert.isArray(resources);
    });

    it.skip("should get a bookshelf private link resource", async () => {
      const resourceName = "bookshelf";
      const resource = await client.bookshelfPrivateLinkResources.get(
        resourceGroupName,
        bookshelfName,
        resourceName,
      );
      assert.isNotNull(resource);
    });
  });
});
