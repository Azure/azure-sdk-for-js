// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-invalid-this */
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { WebPubSubServiceClient, WebPubSubGroup } from "../src";
import { assert } from "chai";
import recorderOptions from "./testEnv";
import { FullOperationResponse } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
/* eslint-disable @typescript-eslint/no-invalid-this */

describe("Group client working with a group", function () {
  let recorder: Recorder;
  let client: WebPubSubGroup;
  let lastResponse: FullOperationResponse | undefined;
  function onResponse(response: FullOperationResponse): void {
    lastResponse = response;
  }
  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    const hubClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_CONNECTION_STRING"),
      "simplechat",
      recorder.configureClientOptions({}),
    );

    client = hubClient.group("group");
  });

  it("can broadcast to groups", async () => {
    await client.sendToAll("hello", { contentType: "text/plain", onResponse });
    assert.equal(lastResponse?.status, 202);

    await client.sendToAll({ x: 1, y: 2 }, { onResponse });
    assert.equal(lastResponse?.status, 202);

    const binaryMessage = new Uint8Array(10);
    await client.sendToAll(binaryMessage.buffer, { onResponse });
    assert.equal(lastResponse?.status, 202);
  });

  it("can broadcast to group with filter", async () => {
    await client.sendToAll("hello", {
      contentType: "text/plain",
      filter: "userId ne 'user1'",
      messageTtlSeconds: 60,
      onResponse,
    });
    assert.equal(lastResponse?.status, 202);

    let error;
    try {
      await client.sendToAll("hello", {
        contentType: "text/plain",
        filter: "invalid filter",
      });
    } catch (e: any) {
      if (e.name !== "RestError") {
        throw e;
      }

      error = e;
    }
    assert.equal(error.statusCode, 400);
    assert.equal(
      JSON.parse(error.message).message,
      "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
    );
  });

  it("can manage connections", async () => {
    // this endpoint returns 404 for connections not on the hub
    let error: RestError | undefined;
    try {
      await client.addConnection("xxxx");
    } catch (e: any) {
      error = e;
    }

    assert.exists(error);
    assert.strictEqual(error?.name, "RestError");

    try {
      await client.removeConnection("xxxx", { onResponse });
    } catch (e: any) {
      assert.exists(error);
      assert.strictEqual(error?.name, "RestError");
    }
  });

  // skipping until we can record better tests with an actual user active.
  it.skip("can manage users", async () => {
    // service returns 404, this should likely be raised as an error but isn't
    // due to the swagger design
    await client.addUser("brian");

    // service returns 404 and this throws.
    await client.removeUser("brian");
  });

  afterEach(async function () {
    await recorder.stop();
  });
});

describe("client working with multiple groups", function () {
  let recorder: Recorder;
  let lastResponse: FullOperationResponse | undefined;
  let hubClient: WebPubSubServiceClient;
  function onResponse(response: FullOperationResponse): void {
    lastResponse = response;
  }
  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    hubClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_CONNECTION_STRING"),
      "simplechat",
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can join multiple groups with filter", async (): Promise<void> => {
    await hubClient.addConnectionsToGroups(["group1", "group2"], "userId eq 'user 1'", {
      onResponse,
    });
    assert.equal(lastResponse?.status, 200);

    let error;
    try {
      await hubClient.addConnectionsToGroups(["group1", "group2"], "invalid filter");
    } catch (e: any) {
      if (e.name !== "RestError") {
        throw e;
      }

      error = e;
    }
    assert.equal(error.statusCode, 400);
    assert.equal(
      JSON.parse(error.message).message,
      "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
    );
  });

  it("can leave multiple groups with filter", async () => {
    await hubClient.removeConnectionsFromGroups(["group1", "group2"], "userId eq 'user 1'", {
      onResponse,
    });
    assert.equal(lastResponse?.status, 200);

    let error;
    try {
      await hubClient.removeConnectionsFromGroups(["group1", "group2"], "invalid filter");
    } catch (e: any) {
      if (e.name !== "RestError") {
        throw e;
      }

      error = e;
    }
    assert.equal(error.statusCode, 400);
    assert.equal(
      JSON.parse(error.message).message,
      "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
    );
  });
});
