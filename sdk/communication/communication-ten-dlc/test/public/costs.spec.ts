// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { TenDlcClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "../utils/recordedClient";
import { Recorder } from "@azure-tools/test-recorder";

describe("TenDlcClient - Costs", function () {
  let recorder: Recorder;
  let client: TenDlcClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all costs", async function () {
    let count = 0;
    for await (const cost of client.listCosts()) {
      count++;
      assert.isNotNull(cost);
    }
  }).timeout(30000);
});
