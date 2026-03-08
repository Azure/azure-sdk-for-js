// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { DiscoveryClient } from "../../src/discoveryClient.js";
import type { TokenCredential } from "@azure/core-auth";

describe("DiscoveryClient", () => {
  const mockSubscriptionId = "00000000-0000-0000-0000-000000000000";

  describe("constructor", () => {
    it("should create a client with valid credentials", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      assert.isDefined(client);
      assert.isDefined(client.pipeline);
    });

    it("should create a client with custom options", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId, {
        userAgentOptions: {
          userAgentPrefix: "custom-prefix",
        },
      });

      assert.isDefined(client);
      assert.isDefined(client.pipeline);
    });

    it("should expose all operation groups", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      // Control plane operation groups
      assert.isDefined(client.storageContainers);
      assert.isDefined(client.storageAssets);
      assert.isDefined(client.supercomputers);
      assert.isDefined(client.nodePools);
      assert.isDefined(client.workspacePrivateLinkResources);
      assert.isDefined(client.chatModelDeployments);
      assert.isDefined(client.workspacePrivateEndpointConnections);
      assert.isDefined(client.workspaces);
      assert.isDefined(client.projects);
      assert.isDefined(client.tools);
      assert.isDefined(client.bookshelfPrivateLinkResources);
      assert.isDefined(client.bookshelfPrivateEndpointConnections);
      assert.isDefined(client.bookshelves);
      assert.isDefined(client.operations);
    });
  });

  describe("storageContainers operations", () => {
    it("should have CRUD operations", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      assert.isFunction(client.storageContainers.get);
      assert.isFunction(client.storageContainers.createOrUpdate);
      assert.isFunction(client.storageContainers.update);
      assert.isFunction(client.storageContainers.delete);
      assert.isFunction(client.storageContainers.listByResourceGroup);
      assert.isFunction(client.storageContainers.listBySubscription);
    });
  });

  describe("workspaces operations", () => {
    it("should have CRUD operations", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      assert.isFunction(client.workspaces.get);
      assert.isFunction(client.workspaces.createOrUpdate);
      assert.isFunction(client.workspaces.update);
      assert.isFunction(client.workspaces.delete);
      assert.isFunction(client.workspaces.listByResourceGroup);
      assert.isFunction(client.workspaces.listBySubscription);
    });
  });

  describe("bookshelves operations", () => {
    it("should have CRUD operations", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      assert.isFunction(client.bookshelves.get);
      assert.isFunction(client.bookshelves.createOrUpdate);
      assert.isFunction(client.bookshelves.update);
      assert.isFunction(client.bookshelves.delete);
      assert.isFunction(client.bookshelves.listByResourceGroup);
      assert.isFunction(client.bookshelves.listBySubscription);
    });
  });

  describe("projects operations", () => {
    it("should have CRUD operations", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      assert.isFunction(client.projects.get);
      assert.isFunction(client.projects.createOrUpdate);
      assert.isFunction(client.projects.update);
      assert.isFunction(client.projects.delete);
      assert.isFunction(client.projects.listByWorkspace);
    });
  });

  describe("supercomputers operations", () => {
    it("should have CRUD operations", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      assert.isFunction(client.supercomputers.get);
      assert.isFunction(client.supercomputers.createOrUpdate);
      assert.isFunction(client.supercomputers.update);
      assert.isFunction(client.supercomputers.delete);
      assert.isFunction(client.supercomputers.listByResourceGroup);
      assert.isFunction(client.supercomputers.listBySubscription);
    });
  });

  describe("operations", () => {
    it("should have list operation", () => {
      const mockCredential: TokenCredential = {
        getToken: vi
          .fn()
          .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = new DiscoveryClient(mockCredential, mockSubscriptionId);

      assert.isFunction(client.operations.list);
    });
  });
});
