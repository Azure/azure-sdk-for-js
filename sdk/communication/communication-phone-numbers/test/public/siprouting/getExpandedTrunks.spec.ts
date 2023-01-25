// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { SipRoutingClient } from "../../../src";

describe("SipRoutingClient - get expanded trunks", function () {
  let client: SipRoutingClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can retrieve trunks", async () => {
    assert.isArray(await client.getExpandedTrunks());
  });

  it("can retrieve empty trunks", async () => {
    await client.setTrunks([]);

    const trunks = await client.getExpandedTrunks();

    assert.isNotNull(trunks);
    assert.isArray(trunks);
    assert.isEmpty(trunks);
  });

  it("can retrieve not empty trunks", async () => {
    const expectedTrunks = [
      { fqdn: "11.fqdn.com", sipSignalingPort: 1239 },
      { fqdn: "22.fqdn.com", sipSignalingPort: 2348 },
      { fqdn: "33.fqdn.com", sipSignalingPort: 3457 },
    ];
    await client.setTrunks(expectedTrunks);

    const trunks = await client.getExpandedTrunks();

    assert.isNotNull(trunks);
    assert.isArray(trunks);
    assert.deepEqual(trunks, expectedTrunks);
  });
});
