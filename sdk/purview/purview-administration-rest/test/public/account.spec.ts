// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PurviewAccount } from "@azure-rest/purview-administration";
import { Recorder } from "@azure-tools/test-recorder";
import { createAccountClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Get account info", () => {
  let recorder: Recorder;
  let client: PurviewAccount.Client.PurviewAccountClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createAccountClient(recorder);
  });

  afterEach(async () => {
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
