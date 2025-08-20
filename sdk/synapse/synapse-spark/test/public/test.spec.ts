// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { SparkClient } from "@azure/synapse-spark";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Synapse Managed Private Endpoints", () => {
  let recorder: Recorder;
  let client: SparkClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    const spark_pool_name = "testsparkpool";
    client = createClient(spark_pool_name, recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create session", async () => {
    const session_name = "demo_session";

    const result = await client.sparkSessionOperations.createSparkSession({
      name: session_name,
      driverMemory: "28g",
      driverCores: 4,
      executorMemory: "28g",
      executorCores: 4,
      executorCount: 2,
    });

    assert.isDefined(result);
  });

  it("should list sessions", async () => {
    const result = await client.sparkSessionOperations.getSparkSessions();

    assert.isTrue(result.sessions && result.sessions.length > 0);
  });
});
