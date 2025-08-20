// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { ManagedPrivateEndpoint, ManagedPrivateEndpointsClient } from "@azure/synapse-managed-private-endpoints";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Synapse Managed Private Endpoints", () => {
  let recorder: Recorder;
  let client: ManagedPrivateEndpointsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list endpoints", async () => {
    const result = client.managedPrivateEndpoints.list("default");
    const endpoints: ManagedPrivateEndpoint[] = [];

    for await (const endpoint of result) {
      endpoints.push(endpoint);
    }
    assert.isTrue(endpoints.length > 0);
  });
});
