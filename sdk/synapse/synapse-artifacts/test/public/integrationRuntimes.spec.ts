// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ArtifactsClient } from "$internal/artifactsClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("IntegrationRuntimes", () => {
  let recorder: Recorder;
  let client: ArtifactsClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list integrationRuntimes", async () => {
    const result = await client.integrationRuntimes.list();
    if (result.value.length) {
      assert.equal(result.value[0].name, "AutoResolveIntegrationRuntime");
    } else {
      assert.fail("No integrationRuntimes found");
    }
  });

  it("should get integrationRuntimes", async () => {
    const result = await client.integrationRuntimes.get("AutoResolveIntegrationRuntime");
    assert.equal(result.name, "AutoResolveIntegrationRuntime");
  });
});
