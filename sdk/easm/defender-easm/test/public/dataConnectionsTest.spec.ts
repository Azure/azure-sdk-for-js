// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { EasmDefenderClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Data Connections Test", () => {
  let recorder: Recorder;
  let client: EasmDefenderClient;
  let data_connection_name: string;
  let new_data_connection_name: string;
  let cluster_name: string;
  let database_name: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    const subscription_id = env.SUBSCRIPTIONID || "";
    const resource_group = env.RESOURCEGROUPNAME || "";
    const workspace_name = "sdktest";
    const endpoint = env.ENDPOINT || "";
    const credential = createTestCredential();
    client = EasmDefender(
      endpoint,
      subscription_id,
      resource_group,
      workspace_name,
      credential,
      recorder.configureClientOptions({})
    );
    data_connection_name = "shad-data";
    new_data_connection_name = "sample-dc";
    cluster_name = "sample-cluster";
    database_name = "sample-db";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should list data connections", async () => {
    const dataConnectionsResponse = await client.path("/dataConnections").get();
    if (isUnexpected(dataConnectionsResponse)) {
      throw new Error(dataConnectionsResponse.body?.error.message);
    }

    assert.strictEqual(dataConnectionsResponse.status, "200");

    const data_connection = dataConnectionsResponse.body.value![0];

    assert.isNotEmpty(data_connection.name);
  });

  it("Should get a given data connection", async () => {
    const dataConnectionsResponse = await client
      .path("/dataConnections/{dataConnectionName}", data_connection_name)
      .get();

    if (isUnexpected(dataConnectionsResponse)) {
      throw new Error(dataConnectionsResponse.body?.error.message);
    }

    const data_connection = dataConnectionsResponse.body;

    assert.strictEqual(dataConnectionsResponse.status, "200");

    assert.strictEqual(data_connection_name, data_connection.name);
    assert.strictEqual(data_connection_name, data_connection.displayName);
  });

  it("Should validate a data connection", async () => {
    const dataConnectionValidateResponse = await client.path("/dataConnections:validate").post({
      body: {
        kind: "azureDataExplorer",
        properties: {
          clusterName: cluster_name,
          databaseName: database_name,
          region: "eastus",
        },
        content: "assets",
        frequency: "daily",
        name: data_connection_name,
      },
    });
    if (isUnexpected(dataConnectionValidateResponse)) {
      throw new Error(dataConnectionValidateResponse.body?.error.message);
    }

    const validate_response = dataConnectionValidateResponse.body;

    assert.isNull(validate_response.error);
  });

  it("Should put a new data connection", async () => {
    const dataConnectionResponse = await client
      .path("/dataConnections/{dataConnectionName}", new_data_connection_name)
      .put({
        body: {
          kind: "azureDataExplorer",
          properties: {
            clusterName: cluster_name,
            databaseName: database_name,
            region: "eastus",
          },
          content: "assets",
          frequency: "daily",
          name: new_data_connection_name,
        },
      });
    if (isUnexpected(dataConnectionResponse)) {
      throw new Error(dataConnectionResponse.body?.error.message);
    }

    const data_connection = dataConnectionResponse.body;

    assert.isNotNull(data_connection.name);
  });

  it("Should delete a data connection", async () => {
    const dataConnectionResponse = await client
      .path("/dataConnections/{dataConnectionName}", new_data_connection_name)
      .delete();
    if (isUnexpected(dataConnectionResponse)) {
      throw new Error(dataConnectionResponse.body?.error.message);
    }

    assert.strictEqual(dataConnectionResponse.status, "204");
  });
});
