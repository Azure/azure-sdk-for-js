// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AIProjectsClient, ConnectionsOperations } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - assistants", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectsClient;
  let connections: ConnectionsOperations

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    connections = projectsClient.connections
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and connection operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(connections);
  });

  it("should retrieve workspace", async function () {
    // Retrieve workspace
    const workspace = await connections.getWorkspace();
    assert.isNotNull(workspace);
    assert.isNotNull(workspace.id);
    console.log(`Retrieved workspace, workspace ID: ${workspace.id}`);
  });

  it("should list connections", async function () {
    // List connections
    const connectionsList = await connections.listConnections();
    assert.isNotNull(connectionsList);
    assert.isAtLeast(connectionsList.value.length, 1);
    console.log(`Retrieved ${connectionsList.value.length} connections`);
  });

  it("should retrieve a connection without secrets", async function () {
    // List connections
    const connectionsList = await connections.listConnections();
    assert.isNotNull(connectionsList);
    assert.isAtLeast(connectionsList.value.length, 1);

    // Retrieve one connection
    connectionsList.value.forEach(async (i) => {
      const connectionName = i.name;
      const connection = await connections.getConnection(connectionName);
      assert.isNotNull(connection);
      assert.equal(connection.name, connectionName);
      console.log(`Retrieved connection, connection name: ${i.name}`);
    });
  });

  it("should retrieve a connection with secrets", async function () {
    // List connections
    const connectionsList = await connections.listConnections();
    assert.isNotNull(connectionsList);
    assert.isAtLeast(connectionsList.value.length, 1);

    // Retrieve one connection with secrets
    connectionsList.value.forEach(async (i) => {
      const connectionName = i.name;
      const connection = await connections.getConnectionWithSecrets(connectionName);
      assert.isNotNull(connection);
      assert.equal(connection.name, connectionName);
      console.log(`Retrieved connection with secrets, connection name: ${i.name}`);
    });
  });

});
