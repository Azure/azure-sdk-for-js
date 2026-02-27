// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  recorderStartOptions,
  getSubscriptionId,
  uniqueString,
  EUAP_ENDPOINT,
} from "./utils/recorderUtils.js";
import { createRedirectToEuapPolicy } from "./utils/redirectToEuapPolicy.js";

// Skip recorded tests in playback mode until recordings are created
// NOTE: The 2026-02-01-preview API is behind a feature flag and is unstable.
// The API returns "Resource provider doesn't support api-version 2026-02-01-preview"
// because the feature flag is not consistently propagated across regions.
// To run in RECORD or LIVE mode, you need:
// 1. A subscription with the Microsoft.Discovery/2026-02-01-preview feature flag enabled
// 2. The SUBSCRIPTION_ID environment variable set to that subscription
// 3. The DISCOVERY_RESOURCE_GROUP environment variable set to an existing resource group
// These tests are skipped until the API is stable and feature flags are fully propagated.
const skipRecordedTests = false; // Try running recorded tests

describe.skipIf(skipRecordedTests)("Discovery ARM Client - Recorded Tests", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;
  let resourceGroupName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderStartOptions);

    subscriptionId = getSubscriptionId();
    const credential = createTestCredential();

    // Create client with default endpoint, then use policy to redirect to EUAP
    // This pattern works because:
    // 1. Authentication happens against management.azure.com (works with DefaultAzureCredential)
    // 2. The redirect policy rewrites the URL to EUAP before the request is sent
    const clientOptions = recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createRedirectToEuapPolicy(EUAP_ENDPOINT),
          position: "perCall",
        },
      ],
    });
    client = new DiscoveryClient(credential, subscriptionId, clientOptions);

    // Use a test resource group - should exist before running tests
    resourceGroupName = env.DISCOVERY_RESOURCE_GROUP || "discovery-test-rg";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // NOTE: operations.list returns 404 for api-version 2026-02-01-preview
  // The API says: "supported api-versions are '2025-07-01-preview,2025-12-01-preview'"
  // This is expected behavior for this preview API version
  describe.skip("operations", () => {
    it("should list available operations", async () => {
      const operations: any[] = [];
      for await (const operation of client.operations.list()) {
        operations.push(operation);
      }

      assert.isArray(operations);
      // Discovery service should have operations defined
      assert.isAtLeast(operations.length, 0);
    });
  });

  describe("workspaces", () => {
    it("should list workspaces in subscription", async () => {
      const workspaces: any[] = [];
      for await (const workspace of client.workspaces.listBySubscription()) {
        workspaces.push(workspace);
      }

      assert.isArray(workspaces);
    });

    // NOTE: Resource group-level operations are flaky due to feature flag propagation
    // The feature flag for 2026-02-01-preview may not be available in all regions
    it.skip("should list workspaces in resource group", async () => {
      const workspaces: any[] = [];
      for await (const workspace of client.workspaces.listByResourceGroup(resourceGroupName)) {
        workspaces.push(workspace);
      }

      assert.isArray(workspaces);
    });
  });

  describe("supercomputers", () => {
    it("should list supercomputers in subscription", async () => {
      const supercomputers: any[] = [];
      for await (const sc of client.supercomputers.listBySubscription()) {
        supercomputers.push(sc);
      }

      assert.isArray(supercomputers);
    });

    it.skip("should list supercomputers in resource group", async () => {
      const supercomputers: any[] = [];
      for await (const sc of client.supercomputers.listByResourceGroup(resourceGroupName)) {
        supercomputers.push(sc);
      }

      assert.isArray(supercomputers);
    });
  });

  describe("bookshelves", () => {
    it("should list bookshelves in subscription", async () => {
      const bookshelves: any[] = [];
      for await (const bookshelf of client.bookshelves.listBySubscription()) {
        bookshelves.push(bookshelf);
      }

      assert.isArray(bookshelves);
    });

    it.skip("should list bookshelves in resource group", async () => {
      const bookshelves: any[] = [];
      for await (const bookshelf of client.bookshelves.listByResourceGroup(resourceGroupName)) {
        bookshelves.push(bookshelf);
      }

      assert.isArray(bookshelves);
    });
  });

  describe("storageContainers", () => {
    it("should list storage containers in subscription", async () => {
      const containers: any[] = [];
      for await (const container of client.storageContainers.listBySubscription()) {
        containers.push(container);
      }

      assert.isArray(containers);
    });
  });
});

describe.skipIf(skipRecordedTests)("Discovery ARM Client - CRUD Operations", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;
  let resourceGroupName: string;
  let location: string;
  let workspaceName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderStartOptions);

    subscriptionId = getSubscriptionId();
    const credential = createTestCredential();

    // Create client with default endpoint, then use policy to redirect to EUAP
    const clientOptions = recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createRedirectToEuapPolicy(EUAP_ENDPOINT),
          position: "perCall",
        },
      ],
    });
    client = new DiscoveryClient(credential, subscriptionId, clientOptions);

    resourceGroupName = env.DISCOVERY_RESOURCE_GROUP || "discovery-test-rg";
    location = env.DISCOVERY_LOCATION || "eastus";
    workspaceName = recorder.variable("workspace", `workspace-${uniqueString()}`);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Note: These tests require actual Azure resources to be provisioned
  // They are designed to run in record mode first, then playback

  it.skip("should create, get, update, and delete a workspace", async () => {
    // Create workspace using poller
    const createPoller = client.workspaces.createOrUpdate(resourceGroupName, workspaceName, {
      location,
      properties: {
        workspaceIdentity: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity",
        },
      },
    });
    const createResult = await createPoller.pollUntilDone();

    assert.equal(createResult.name, workspaceName);
    assert.equal(createResult.location, location);

    // Get workspace
    const getResult = await client.workspaces.get(resourceGroupName, workspaceName);
    assert.equal(getResult.name, workspaceName);

    // Update workspace (add tags)
    const updatePoller = client.workspaces.update(resourceGroupName, workspaceName, {
      location,
      tags: { environment: "test" },
      properties: {
        workspaceIdentity: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity",
        },
      },
    });
    const updateResult = await updatePoller.pollUntilDone();

    assert.deepEqual(updateResult.tags, { environment: "test" });

    // Delete workspace
    const deletePoller = client.workspaces.delete(resourceGroupName, workspaceName);
    await deletePoller.pollUntilDone();

    // Verify deletion - should throw
    try {
      await client.workspaces.get(resourceGroupName, workspaceName);
      assert.fail("Expected workspace to be deleted");
    } catch (error: any) {
      assert.include(error.message.toLowerCase(), "not found");
    }
  });

  it.skip("should create, get, and delete a bookshelf", async () => {
    const bookshelfName = recorder.variable("bookshelf", `bookshelf-${uniqueString()}`);

    // Create bookshelf
    const createPoller = client.bookshelves.createOrUpdate(resourceGroupName, bookshelfName, {
      location,
      properties: {},
    });
    const createResult = await createPoller.pollUntilDone();

    assert.equal(createResult.name, bookshelfName);

    // Get bookshelf
    const getResult = await client.bookshelves.get(resourceGroupName, bookshelfName);
    assert.equal(getResult.name, bookshelfName);

    // Delete bookshelf
    const deletePoller = client.bookshelves.delete(resourceGroupName, bookshelfName);
    await deletePoller.pollUntilDone();
  });

  it.skip("should manage projects within a workspace", async () => {
    // First need a workspace
    const projectWorkspaceName = recorder.variable("projWorkspace", `ws-${uniqueString()}`);
    const projectName = recorder.variable("project", `project-${uniqueString()}`);

    const createWsPoller = client.workspaces.createOrUpdate(
      resourceGroupName,
      projectWorkspaceName,
      {
        location,
        properties: {
          workspaceIdentity: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity",
          },
        },
      },
    );
    await createWsPoller.pollUntilDone();

    try {
      // Create project
      const createPoller = client.projects.createOrUpdate(
        resourceGroupName,
        projectWorkspaceName,
        projectName,
        {
          location,
          properties: {},
        },
      );
      const createResult = await createPoller.pollUntilDone();

      assert.equal(createResult.name, projectName);

      // Get project
      const getResult = await client.projects.get(
        resourceGroupName,
        projectWorkspaceName,
        projectName,
      );
      assert.equal(getResult.name, projectName);

      // List projects in workspace
      const projects: any[] = [];
      for await (const project of client.projects.listByWorkspace(
        resourceGroupName,
        projectWorkspaceName,
      )) {
        projects.push(project);
      }
      assert.isArray(projects);

      // Delete project
      const deletePoller = client.projects.delete(
        resourceGroupName,
        projectWorkspaceName,
        projectName,
      );
      await deletePoller.pollUntilDone();
    } finally {
      // Cleanup workspace
      const deleteWsPoller = client.workspaces.delete(resourceGroupName, projectWorkspaceName);
      await deleteWsPoller.pollUntilDone();
    }
  });
});
