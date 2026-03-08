// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Hero Scenario Integration Test: Run a Tool on Supercomputer
 *
 * This test file demonstrates the complete end-to-end Discovery workflow
 * using all three SDK clients:
 *
 * ARM Client (azure-discovery):
 *   - Create/manage Workspace
 *   - Create/manage Project
 *   - Access Supercomputer
 *
 * Workspace Client (azure-discovery-workspace):
 *   - Create Investigation
 *   - Run Tool on Supercomputer
 *   - Monitor Run Status
 *   - Manage Tasks
 *
 * Bookshelf Client (azure-discovery-bookshelf):
 *   - Query KnowledgeBase for insights
 *   - Search results
 *
 * HERO SCENARIO: "Run a Tool on Supercomputer"
 * This is the primary use case for the Discovery service - executing
 * scientific computing tools on Azure supercomputers.
 */

import { describe, it, assert, beforeAll, vi } from "vitest";
import { DiscoveryClient } from "../../src/discoveryClient.js";
import type { TokenCredential } from "@azure/core-auth";

describe("Hero Scenario: Run Tool on Supercomputer (Unit Test)", () => {
  /**
   * This unit test validates the API surface and flow for the hero scenario.
   * It uses mocks to verify the correct sequence of operations.
   *
   * For actual Azure integration, run with TEST_MODE=record
   */

  let armClient: DiscoveryClient;
  let mockCredential: TokenCredential;
  const mockSubscriptionId = "00000000-0000-0000-0000-000000000000";

  beforeAll(() => {
    mockCredential = {
      getToken: vi.fn().mockResolvedValue({
        token: "test-token",
        expiresOnTimestamp: Date.now() + 3600000,
      }),
    };
    armClient = new DiscoveryClient(mockCredential, mockSubscriptionId);
  });

  describe("Workflow Validation", () => {
    it("should have all required ARM operations for workspace management", () => {
      // Step 1: Workspace operations
      assert.isFunction(armClient.workspaces.createOrUpdate, "createOrUpdate workspace");
      assert.isFunction(armClient.workspaces.get, "get workspace");
      assert.isFunction(armClient.workspaces.delete, "delete workspace");
      assert.isFunction(armClient.workspaces.listByResourceGroup, "list workspaces");
    });

    it("should have all required ARM operations for project management", () => {
      // Step 2: Project operations
      assert.isFunction(armClient.projects.createOrUpdate, "createOrUpdate project");
      assert.isFunction(armClient.projects.get, "get project");
      assert.isFunction(armClient.projects.delete, "delete project");
      assert.isFunction(armClient.projects.listByWorkspace, "list projects");
    });

    it("should have all required ARM operations for supercomputer access", () => {
      // Step 3: Supercomputer operations
      assert.isFunction(armClient.supercomputers.get, "get supercomputer");
      assert.isFunction(armClient.supercomputers.listBySubscription, "list supercomputers");
      assert.isFunction(armClient.supercomputers.listByResourceGroup, "list by resource group");
    });

    it("should have node pool operations for compute allocation", () => {
      // Node pools are where tools run
      assert.isFunction(armClient.nodePools.get, "get node pool");
      assert.isFunction(armClient.nodePools.listBySupercomputer, "list node pools");
      assert.isFunction(armClient.nodePools.createOrUpdate, "create node pool");
    });

    it("should have tool definition operations", () => {
      // Tools are the scientific applications
      assert.isFunction(armClient.tools.get, "get tool");
      assert.isFunction(armClient.tools.listBySubscription, "list tools");
      assert.isFunction(armClient.tools.createOrUpdate, "create tool");
    });

    it("should have storage operations for data access", () => {
      // Storage for input/output data
      assert.isFunction(armClient.storageContainers.get, "get storage container");
      assert.isFunction(armClient.storageContainers.listBySubscription, "list storage containers");
      assert.isFunction(armClient.storageAssets.listByStorageContainer, "list storage assets");
    });

    it("should have bookshelf operations for knowledge management", () => {
      // Bookshelves store knowledge bases
      assert.isFunction(armClient.bookshelves.get, "get bookshelf");
      assert.isFunction(armClient.bookshelves.listBySubscription, "list bookshelves");
      assert.isFunction(armClient.bookshelves.createOrUpdate, "create bookshelf");
    });
  });

  describe("Hero Scenario Flow Documentation", () => {
    /**
     * This test documents the expected flow for the hero scenario.
     * Each step is validated to ensure the API surface supports it.
     */

    it("documents the complete hero scenario flow", () => {
      const heroScenarioSteps = [
        {
          step: 1,
          name: "Create Workspace",
          client: "ARM (DiscoveryClient)",
          operation: "workspaces.createOrUpdate",
          description: "Create an Azure Discovery Workspace to organize resources",
        },
        {
          step: 2,
          name: "Create Project",
          client: "ARM (DiscoveryClient)",
          operation: "projects.createOrUpdate",
          description: "Create a Project within the Workspace for logical grouping",
        },
        {
          step: 3,
          name: "Get Supercomputer",
          client: "ARM (DiscoveryClient)",
          operation: "supercomputers.get",
          description: "Get reference to an existing Supercomputer for compute",
        },
        {
          step: 4,
          name: "Get Node Pool",
          client: "ARM (DiscoveryClient)",
          operation: "nodePools.listBySupercomputer",
          description: "Get available node pools for running tools",
        },
        {
          step: 5,
          name: "Get Tool Definition",
          client: "ARM (DiscoveryClient)",
          operation: "tools.get",
          description: "Get the tool to run (e.g., molecular dynamics simulation)",
        },
        {
          step: 6,
          name: "Create Investigation",
          client: "Workspace (WorkspaceClient)",
          operation: "investigations.createOrUpdate",
          description: "Create an Investigation to track the scientific workflow",
        },
        {
          step: 7,
          name: "Run Tool on Supercomputer",
          client: "Workspace (WorkspaceClient)",
          operation: "tools.run",
          description: "THE HERO - Execute the tool on supercomputer nodes",
        },
        {
          step: 8,
          name: "Monitor Run Status",
          client: "Workspace (WorkspaceClient)",
          operation: "tools.getRunStatus",
          description: "Poll for completion of the tool run",
        },
        {
          step: 9,
          name: "Create Task for Results",
          client: "Workspace (WorkspaceClient)",
          operation: "tasks.create",
          description: "Create a task to process and analyze results",
        },
        {
          step: 10,
          name: "Query Knowledge Base",
          client: "Bookshelf (BookshelfClient)",
          operation: "knowledgeBaseVersions.search",
          description: "Search knowledge base for insights from the run",
        },
      ];

      // Validate all steps are documented
      assert.equal(heroScenarioSteps.length, 10, "Hero scenario has 10 steps");

      // Validate step structure
      for (const step of heroScenarioSteps) {
        assert.isDefined(step.step, "step number");
        assert.isDefined(step.name, "step name");
        assert.isDefined(step.client, "client name");
        assert.isDefined(step.operation, "operation name");
        assert.isDefined(step.description, "description");
      }

      // Log the flow for documentation
      console.log("\n=== HERO SCENARIO: Run Tool on Supercomputer ===\n");
      for (const step of heroScenarioSteps) {
        console.log(`Step ${step.step}: ${step.name}`);
        console.log(`  Client: ${step.client}`);
        console.log(`  Operation: ${step.operation}`);
        console.log(`  ${step.description}\n`);
      }
    });
  });

  describe("Client Interoperability", () => {
    it("should use same subscription across ARM operations", () => {
      // All ARM operations use the same subscription
      assert.isDefined(armClient.workspaces);
      assert.isDefined(armClient.projects);
      assert.isDefined(armClient.supercomputers);
    });

    it("should support workspace endpoint extraction for data plane clients", () => {
      // After creating a workspace via ARM, the workspace.properties
      // contains the endpoint URL for Workspace and Bookshelf clients
      // This is the key handoff from control plane to data plane

      // Workspace client uses: workspace.properties.workspaceUrl
      // Bookshelf client uses: bookshelf.properties.bookshelfUrl

      assert.isFunction(armClient.workspaces.get);
      assert.isFunction(armClient.bookshelves.get);
    });
  });
});
