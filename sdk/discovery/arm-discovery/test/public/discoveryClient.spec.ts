// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DiscoveryClient,
  type Workspace,
  type Bookshelf,
  type Project,
  type StorageAsset,
  type StorageContainer,
  type Tool,
  type Supercomputer,
  type NodePool,
  type ChatModelDeployment,
} from "../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert } from "vitest";

describe("DiscoveryClient - Unit Tests", () => {
  it("should have all expected operation groups", () => {
    const credential = createTestCredential();
    const client = new DiscoveryClient(credential, "00000000-0000-0000-0000-000000000000");

    assert.isDefined(client.operations);
    assert.isDefined(client.workspaces);
    assert.isDefined(client.workspacePrivateEndpointConnections);
    assert.isDefined(client.workspacePrivateLinkResources);
    assert.isDefined(client.bookshelves);
    assert.isDefined(client.bookshelfPrivateEndpointConnections);
    assert.isDefined(client.bookshelfPrivateLinkResources);
    assert.isDefined(client.projects);
    assert.isDefined(client.storageAssets);
    assert.isDefined(client.storageContainers);
    assert.isDefined(client.tools);
    assert.isDefined(client.supercomputers);
    assert.isDefined(client.nodePools);
    assert.isDefined(client.chatModelDeployments);
  });

  it("should have a pipeline", () => {
    const credential = createTestCredential();
    const client = new DiscoveryClient(credential, "00000000-0000-0000-0000-000000000000");

    assert.isDefined(client.pipeline);
  });
});

describe("Discovery Models - Unit Tests", () => {
  it("should define Workspace type", () => {
    const workspace: Workspace = {
      location: "eastus",
      properties: {},
    };
    assert.equal(workspace.location, "eastus");
    assert.isDefined(workspace.properties);
  });

  it("should define Bookshelf type", () => {
    const bookshelf: Bookshelf = {
      location: "eastus",
      properties: {},
    };
    assert.equal(bookshelf.location, "eastus");
    assert.isDefined(bookshelf.properties);
  });

  it("should define Project type", () => {
    const project: Project = {
      location: "eastus",
      properties: {},
    };
    assert.equal(project.location, "eastus");
    assert.isDefined(project.properties);
  });

  it("should define StorageAsset type", () => {
    const asset: StorageAsset = {
      location: "eastus",
      properties: {},
    };
    assert.equal(asset.location, "eastus");
    assert.isDefined(asset.properties);
  });

  it("should define StorageContainer type", () => {
    const container: StorageContainer = {
      location: "eastus",
      properties: {},
    };
    assert.isDefined(container.properties);
  });

  it("should define Tool type", () => {
    const tool: Tool = {
      location: "eastus",
      properties: {},
    };
    assert.equal(tool.location, "eastus");
    assert.isDefined(tool.properties);
  });

  it("should define Supercomputer type", () => {
    const supercomputer: Supercomputer = {
      location: "eastus",
      properties: {},
    };
    assert.equal(supercomputer.location, "eastus");
    assert.isDefined(supercomputer.properties);
  });

  it("should define NodePool type", () => {
    const nodePool: NodePool = {
      properties: {},
    };
    assert.isDefined(nodePool.properties);
  });

  it("should define ChatModelDeployment type", () => {
    const deployment: ChatModelDeployment = {
      properties: {},
    };
    assert.isDefined(deployment.properties);
  });
});
