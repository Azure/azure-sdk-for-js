// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import {
  WebPubSubServiceClient,
  fetchActiveConnections,
  getAllHubMetrics,
  HubMetricKind,
} from "../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getEndpoint } from "../utils/injectables.js";

describe("Hub metrics helpers", () => {
  let recorder: Recorder;
  let client: WebPubSubServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({ envSetupForPlayback: {} });
    const credential = new DefaultAzureCredential();
    client = new WebPubSubServiceClient(
      getEndpoint(),
      credential,
      "default-hub",
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("returns active connection ids for a hub", async () => {
    const connections = await fetchActiveConnections(client, "default-hub", {
      maxResults: 10,
    });
    assert.isArray(connections);
  });

  it.skip("returns paged results for very large hubs", async () => {
    const connections = await fetchActiveConnections(client, "default-hub", {
      maxResults: 1,
    });
    assert.lengthOf(connections, 1);
  });

  it("returns metrics across every hub", async () => {
    const metrics = await getAllHubMetrics(client, {
      kinds: [HubMetricKind.Connections, HubMetricKind.Users],
    });
    assert.isArray(metrics);
    for (const metric of metrics) {
      assert.isAbove(metric.value, -1);
    }
  });

  it("throws on unknown hub", async () => {
    try {
      await fetchActiveConnections(client, "does-not-exist-12345");
      assert.fail("Expected fetchActiveConnections to throw");
    } catch (e: any) {
      assert.equal(e.statusCode, 404);
    }
  });
});
