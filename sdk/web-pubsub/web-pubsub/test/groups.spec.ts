// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { env, Recorder, record } from "@azure/test-utils-recorder";
import { WebPubSubServiceClient, WebPubSubGroup } from "../src";
import { assert } from "chai";
import environmentSetup from "./testEnv";
import { FullOperationResponse } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";

describe("Group client working with a group", function() {
  this.timeout(30000);
  let recorder: Recorder;
  let client: WebPubSubGroup;
  let lastResponse: FullOperationResponse | undefined;
  function onResponse(response: FullOperationResponse) {
    lastResponse = response;
  }
  beforeEach(function() {
    recorder = record(this, environmentSetup);
    const hubClient = new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, "simplechat");
    client = hubClient.group("group");
  });

  it("can broadcast to groups", async () => {
    await client.sendToAll("hello", { contentType: "text/plain" });
    assert.equal(lastResponse?.status, 202);

    await client.sendToAll({ x: 1, y: 2 });
    assert.equal(lastResponse?.status, 202);

    const binaryMessage = new Uint8Array(10);
    await client.sendToAll(binaryMessage.buffer);
    assert.equal(lastResponse?.status, 202);
  });

  it("can manage connections", async () => {
    // this endpoint returns 404 for connections not on the hub
    let error: RestError;
    try {
      await client.addConnection("xxxx");
    } catch (e) {
      error = e;
    }

    assert.notStrictEqual(error!, undefined);
    assert.equal(error!.name, "RestError");

    // this endpoint just returns 200 if the connection isn't present
    await client.removeConnection("xxxx", { onResponse });
    assert.equal(lastResponse?.status, 200);
  });

  it("can manage users", async () => {
    await client.addUser("brian");
    await client.removeUser("brian");
  });

  afterEach(async function() {
    if (recorder) {
      recorder.stop();
    }
  });
});
