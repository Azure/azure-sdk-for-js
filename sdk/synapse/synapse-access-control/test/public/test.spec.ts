// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessControlClient } from "../../src/accessControlClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: AccessControlClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list roles", async () => {
    const result = await client.roleDefinitions.listRoleDefinitions();
    assert.isTrue(result.length > 0);
  });
});
