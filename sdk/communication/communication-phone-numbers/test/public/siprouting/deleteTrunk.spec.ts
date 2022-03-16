// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder } from "@azure-tools/test-recorder";
import { SipTrunk } from "../../../src/models";
import { createRecordedClient } from "./utils/recordedClient";

describe("SipRoutingClient - delete trunk", function () {
  let client: SipRoutingClient;
  let recorder: Recorder;

  beforeEach(function (this: Context) {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can delete an existing trunk", async () => {
    const trunk: SipTrunk = {
      fqdn: "111.fqdn.com",
      sipSignalingPort: 5678,
    };
    const storedTrunk = await client.setTrunk(trunk);
    assert.deepEqual(storedTrunk, trunk);
    assert.exists((await client.listTrunks()).find((value) => value.fqdn === trunk.fqdn));

    await client.deleteTrunk("111.fqdn.com");

    assert.notExists((await client.listTrunks()).find((value) => value.fqdn === trunk.fqdn));
  });

  it("cannot delete a not existing trunk but succeeds", async () => {
    await client.setTrunks([]);

    await client.deleteTrunk("notExisting.fqdn.com");

    const listTrunks = await client.listTrunks();
    assert.isNotNull(listTrunks);
    assert.isArray(listTrunks);
    assert.isEmpty(listTrunks);
  });
});
