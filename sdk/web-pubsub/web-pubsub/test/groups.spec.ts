// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { env, Recorder, record } from "@azure/test-utils-recorder";
import { HubAdminClient, GroupAdminClient } from "../src";
import { assert } from "chai";
import environmentSetup from "./testEnv";
import { RestError } from "@azure/core-http";

describe("Group client working with a group", function() {
  let recorder: Recorder;
  let client: GroupAdminClient;
  this.timeout(30000);

  beforeEach(function() {
    recorder = record(this, environmentSetup);
    const hubClient = new HubAdminClient(env.SIGNALR_CONNECTION_STRING, "simplechat");
    client = hubClient.getGroupClient("group");
  });

  it("can broadcast to groups", async () => {
    let res = await client.broadcast("hello");
    assert.equal(res._response.status, 202);

    const binaryMessage = new Uint8Array(10);
    res = await client.broadcast(binaryMessage.buffer);
    assert.equal(res._response.status, 202);
  });

  it("can manage connections", async () => {
    // this endpoint returns 404 for connections not on the hub
    let error: RestError;
    try {
      await client.addConnection("xxxx");
    } catch (e) {
      error = e;
    }

    assert.isDefined(error!);
    assert.equal(error!.name, "RestError");

    // this endpoint just returns 200 if the connection isn't present
    const res2 = await client.removeConnection("xxxx");
    assert.equal(res2._response.status, 200);
  });

  it("can manage users", async () => {
    const res = await client.addUser("brian");
    assert.equal(res._response.status, 202);

    const hasBrian = await client.hasUser("brian");
    assert.isTrue(hasBrian);

    const hasJeff = await client.hasUser("jeff");
    assert.isFalse(hasJeff);

    const res2 = await client.removeUser("brian");
    assert.equal(res2._response.status, 202);

    const hasBrianNow = await client.hasUser("brian");
    assert.isFalse(hasBrianNow);
  });

  afterEach(async function() {
    if (recorder) {
      recorder.stop();
    }
  });
});
