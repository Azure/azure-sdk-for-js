// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { env, Recorder, record } from "@azure-tools/test-recorder";
import { WebPubSubServiceClient, WebPubSubGroup } from "../src";
import { assert } from "chai";
import environmentSetup from "./testEnv";
import { FullOperationResponse } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
/* eslint-disable @typescript-eslint/no-invalid-this */

describe("Group client working with a group", function() {
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
    await client.sendToAll("hello", { contentType: "text/plain", onResponse });
    assert.equal(lastResponse?.status, 202);

    await client.sendToAll({ x: 1, y: 2 }, { onResponse });
    assert.equal(lastResponse?.status, 202);

    const binaryMessage = new Uint8Array(10);
    await client.sendToAll(binaryMessage.buffer, { onResponse });
    assert.equal(lastResponse?.status, 202);
  });

  it("can manage connections", async () => {
    // this endpoint returns 404 for connections not on the hub
    let error: RestError | undefined;
    try {
      await client.addConnection("xxxx");
    } catch (e) {
      error = e;
    }

    assert.exists(error);
    assert.strictEqual(error?.name, "RestError");

    try {
      await client.removeConnection("xxxx", { onResponse });
    } catch (e) {
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

  afterEach(async function() {
    if (recorder) {
      recorder.stop();
    }
  });
});
