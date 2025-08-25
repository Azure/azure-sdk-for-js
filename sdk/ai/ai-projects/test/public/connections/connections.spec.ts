// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient, Connection, ConnectionsOperations } from "@azure/ai-projects";

describe("connections - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let connections: ConnectionsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    connections = projectsClient.connections;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and connection operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(connections);
  });

  it("should list connections", async function () {
    // List connections
    const connectionsListIterator = connections.list();
    const connectionsList: Connection[] = [];
    for await (const connection of connectionsListIterator) {
      connectionsList.push(connection);
    }

    assert.isNotNull(connectionsList);
  });

  it("should retrieve a connection without secrets", async function () {
    // List connections
    const connectionsListIterator = connections.list();
    const connectionsList: Connection[] = [];
    for await (const connection of connectionsListIterator) {
      connectionsList.push(connection);
    }
    assert.isNotNull(connectionsList);
    assert.isAtLeast(connectionsList.length, 1);

    // Retrieve one connection
    for (const _connection of connectionsList) {
      const connectionName = _connection.name;
      const connection = await connections.get(connectionName);
      assert.isNotNull(connection);
      assert.equal(connection.name, connectionName);
    }
  });

  it("should retrieve a connection with secrets", async function () {
    // List connections
    const connectionsListIterator = connections.list();
    const connectionsList: Connection[] = [];
    for await (const connection of connectionsListIterator) {
      connectionsList.push(connection);
    }
    assert.isNotNull(connectionsList);
    assert.isAtLeast(connectionsList.length, 1);

    // Retrieve one connection with secrets
    for (const _connection of connectionsList) {
      const connectionName = _connection.name;
      const connection = await connections.getWithCredentials(connectionName);
      assert.isNotNull(connection);
      assert.equal(connection.name, connectionName);
      assert.isNotNull(connection.credentials);
    }
  });

  it("get default connection with credentials", async function () {
    const defaultConnection = await connections.getDefault("AzureOpenAI", true);
    assert.isNotNull(defaultConnection);
    assert.isNotNull(defaultConnection.credentials);
  });
});
