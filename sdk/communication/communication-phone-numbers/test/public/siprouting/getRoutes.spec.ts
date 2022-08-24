// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient } from "./utils/recordedClient";

describe("SipRoutingClient - get routes", function () {
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

  it("can retrieve routes", async () => {
    assert.isArray(await client.getRoutes());
  });

  it("can retrieve empty routes", async () => {
    await client.setRoutes([]);

    const routes = await client.getRoutes();

    assert.isNotNull(routes);
    assert.isArray(routes);
    assert.isEmpty(routes);
  });

  it("can retrieve not empty routes", async () => {
    const expectedRoutes = [
      {
        name: "myFirstRoute",
        description: "myFirstRoute's description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: [],
      },
      {
        name: "mySecondRoute",
        description: "mySecondRoute's description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: [],
      },
    ];
    await client.setRoutes(expectedRoutes);

    const routes = await client.getRoutes();

    assert.isNotNull(routes);
    assert.isArray(routes);
    assert.deepEqual(routes, expectedRoutes);
  });
});
