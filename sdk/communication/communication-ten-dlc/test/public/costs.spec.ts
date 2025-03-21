// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { TenDlcClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "../utils/recordedClient";
import type { Recorder } from "@azure-tools/test-recorder";

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
    for await (const cost of client.listCosts()) {
      assert.isNotNull(cost);
    }
  }).timeout(30000);
});
