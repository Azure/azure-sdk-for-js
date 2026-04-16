// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type {
  WorkspacePrivateEndpointConnection,
  BookshelfPrivateEndpointConnection,
} from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

const WORKSPACE_NAME = "wrksptest44";
const BOOKSHELF_NAME = "test-bookshelf";

// All private endpoint tests are skipped: no recordings available
describe("Discovery ARM Client - Private Endpoints", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;
  let resourceGroupName: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new DiscoveryClient(credential, subscriptionId, recorder.configureClientOptions({}));
    resourceGroupName = env.DISCOVERY_RESOURCE_GROUP || "olawal";
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  // ============ Workspace Private Endpoint Connections ============

  it.skip("should list workspace private endpoint connections", async () => {
    const connections: any[] = [];
    for await (const conn of client.workspacePrivateEndpointConnections.listByWorkspace(
      resourceGroupName,
      WORKSPACE_NAME,
    )) {
      connections.push(conn);
    }
    assert.isArray(connections);
  });

  it.skip("should get a workspace private endpoint connection", async () => {
    const connection = await client.workspacePrivateEndpointConnections.get(
      resourceGroupName,
      WORKSPACE_NAME,
      "test-pe-connection",
    );
    assert.isDefined(connection);
    assert.isDefined(connection.name);
  });

  it.skip("should create a workspace private endpoint connection", async () => {
    const connectionData: WorkspacePrivateEndpointConnection = {
      properties: {
        privateLinkServiceConnectionState: { status: "Approved" },
      },
    };
    const poller = client.workspacePrivateEndpointConnections.createOrUpdate(
      resourceGroupName,
      WORKSPACE_NAME,
      "test-pe-connection",
      connectionData,
      testPollingOptions,
    );
    const connection = await poller.pollUntilDone();
    assert.isDefined(connection);
  });

  it.skip("should delete a workspace private endpoint connection", async () => {
    const poller = client.workspacePrivateEndpointConnections.delete(
      resourceGroupName,
      WORKSPACE_NAME,
      "pe-conn-to-delete",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });

  // ============ Workspace Private Link Resources ============

  it.skip("should list workspace private link resources", async () => {
    const resources: any[] = [];
    for await (const res of client.workspacePrivateLinkResources.listByWorkspace(
      resourceGroupName,
      WORKSPACE_NAME,
    )) {
      resources.push(res);
    }
    assert.isArray(resources);
  });

  it.skip("should get a workspace private link resource", async () => {
    const resource = await client.workspacePrivateLinkResources.get(
      resourceGroupName,
      WORKSPACE_NAME,
      "workspace",
    );
    assert.isDefined(resource);
  });

  // ============ Bookshelf Private Endpoint Connections ============

  it.skip("should list bookshelf private endpoint connections", async () => {
    const connections: any[] = [];
    for await (const conn of client.bookshelfPrivateEndpointConnections.listByBookshelf(
      resourceGroupName,
      BOOKSHELF_NAME,
    )) {
      connections.push(conn);
    }
    assert.isArray(connections);
  });

  it.skip("should get a bookshelf private endpoint connection", async () => {
    const connection = await client.bookshelfPrivateEndpointConnections.get(
      resourceGroupName,
      BOOKSHELF_NAME,
      "test-pe-connection",
    );
    assert.isDefined(connection);
    assert.isDefined(connection.name);
  });

  it.skip("should create a bookshelf private endpoint connection", async () => {
    const connectionData: BookshelfPrivateEndpointConnection = {
      properties: {
        privateLinkServiceConnectionState: { status: "Approved" },
      },
    };
    const poller = client.bookshelfPrivateEndpointConnections.createOrUpdate(
      resourceGroupName,
      BOOKSHELF_NAME,
      "test-pe-connection",
      connectionData,
      testPollingOptions,
    );
    const connection = await poller.pollUntilDone();
    assert.isDefined(connection);
  });

  it.skip("should delete a bookshelf private endpoint connection", async () => {
    const poller = client.bookshelfPrivateEndpointConnections.delete(
      resourceGroupName,
      BOOKSHELF_NAME,
      "pe-conn-to-delete",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });

  // ============ Bookshelf Private Link Resources ============

  it.skip("should list bookshelf private link resources", async () => {
    const resources: any[] = [];
    for await (const res of client.bookshelfPrivateLinkResources.listByBookshelf(
      resourceGroupName,
      BOOKSHELF_NAME,
    )) {
      resources.push(res);
    }
    assert.isArray(resources);
  });

  it.skip("should get a bookshelf private link resource", async () => {
    const resource = await client.bookshelfPrivateLinkResources.get(
      resourceGroupName,
      BOOKSHELF_NAME,
      "bookshelf",
    );
    assert.isDefined(resource);
  });
});
