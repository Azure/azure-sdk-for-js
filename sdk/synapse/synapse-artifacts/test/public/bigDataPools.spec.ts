// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ArtifactsClient } from "$internal/artifactsClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("BigDataPools", () => {
  let recorder: Recorder;
  let client: ArtifactsClient;
  let firstPool: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list bigDataPools", async () => {
    const result = await client.bigDataPools.list();
    assert.ok(result.value && result.value.length >= 1, "Result doesn't contain any values");
    for (const pool of result.value ?? []) {
      firstPool = pool.name ?? "";
      break;
    }
  });

  it("should get a bigDataPool by name", async () => {
    const result = await client.bigDataPools.get(firstPool);
    assert.equal(result.name, firstPool);
  });
});
