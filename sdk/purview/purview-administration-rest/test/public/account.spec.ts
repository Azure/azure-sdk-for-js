// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PurviewAccount } from "../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createAccountClient } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("Get account info", () => {
  let recorder: Recorder;
  let client: PurviewAccount.Client.PurviewAccountRestClient;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    client = await createAccountClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should get the account info", async () => {
    const result = await client.path("/").get();

    if (result.status !== "200") {
      assert.fail(`GET "/" failed with ${result.status}`);
    }

    assert.isDefined(result.body);
  });
});
