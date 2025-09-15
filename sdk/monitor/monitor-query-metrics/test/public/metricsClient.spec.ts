// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MetricsClient } from "../../src/index.js";
import type { MetricsQueryResult } from "../../src/index.js";
import type { RecorderAndMetricsClient } from "./shared/testShared.js";
import {
  createRecorderAndMetricsClient,
  getMetricsBatchResourceIds,
  getMetricsBatchNamespace,
  getMetricsBatchNames,
} from "./shared/testShared.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { Durations } from "../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import type { Recorder } from "@azure-tools/test-recorder";

describe("MetricsBatchClient live tests", function () {
  let resourceIds: string[];
  let metricsNamespace: string;
  let metricNames: string[];
  let metricsClient: MetricsClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    const recordedClient: RecorderAndMetricsClient = await createRecorderAndMetricsClient(ctx);
    resourceIds = getMetricsBatchResourceIds();
    metricsNamespace = getMetricsBatchNamespace();
    metricNames = getMetricsBatchNames();
    metricsClient = recordedClient.client;
    recorder = recordedClient.recorder;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("batch query with no resource ids", async () => {
    try {
      await metricsClient.queryResources([], metricNames, metricsNamespace);
      assert.fail("Code should not reach here.");
    } catch {
      assert.equal(1, 1);
    }
  });

  it("batch query for 2 resource ids", async () => {
    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      resourceIds,
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
      },
    );
    assert.equal(result.length, 2);
  });

  it("batch query for 1 resource id", async () => {
    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
      },
    );
    assert.equal(result.length, 1);
  });

  it("batch query with granularity", async () => {
    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
        interval: Durations.fiveMinutes, // PT5M
      },
    );
    assert.equal(result.length, 1);

    // Check that the granularity is set correctly in the response
    for (const response of result) {
      assert.equal(response.granularity, Durations.fiveMinutes);

      // Check that metrics can be accessed and have timeseries data
      assert.isTrue(response.metrics.length > 0);
      for (const metric of response.metrics) {
        assert.isDefined(metric.timeseries);
        for (const timeseries of metric.timeseries || []) {
          assert.isDefined(timeseries.metadatavalues);
        }
      }
    }
  });

  it("batch query with time range", async () => {
    // Use fixed timestamps for predictable recording/playback
    const endTime = new Date("2025-07-31T08:45:06Z");
    const startTime = new Date("2025-07-31T07:45:06Z"); // 1 hour ago

    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
        startTime: startTime,
        endTime: endTime,
        interval: Durations.fiveMinutes,
      },
    );

    assert.equal(result.length, 1);
    assert.isDefined(result[0].timespan);
  });

  it("batch query with multiple aggregations", async () => {
    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count,Average", // Multiple aggregations
      },
    );

    assert.equal(result.length, 1);
    assert.isDefined(result[0].metrics);
  });

  it("batch query with top parameter", async () => {
    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
        top: 10,
      },
    );

    assert.equal(result.length, 1);
    assert.isDefined(result[0].metrics);
  });

  it("batch query with order by", async () => {
    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
        orderBy: "count desc",
      },
    );

    assert.equal(result.length, 1);
    assert.isDefined(result[0].metrics);
  });

  it("batch query with filter", async () => {
    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
        filter: "Computer eq '*'", // Filter for all computers in Log Analytics
      },
    );

    assert.equal(result.length, 1);
    assert.isDefined(result[0].metrics);

    // Check that the filter was applied (metrics should have metadata)
    for (const metric of result[0].metrics) {
      assert.isDefined(metric.timeseries);
      for (const timeseries of metric.timeseries || []) {
        assert.isDefined(timeseries.metadatavalues);
      }
    }
  });

  it("client with different endpoint", () => {
    const credential = createTestCredential();
    const endpoint = "https://usgovvirginia.metrics.monitor.azure.us";
    const audience = "https://metrics.monitor.azure.us";

    const client = new MetricsClient(endpoint, credential, { audience });

    // Verify the client was created with the correct endpoint
    assert.isDefined(client);
    // Note: We can't easily test the internal endpoint without accessing private members
    // This test mainly ensures the constructor works with different endpoints
  });

  it("batch query with all parameters", async () => {
    // Comprehensive test with multiple parameters combined
    // Use fixed timestamps for predictable recording/playback
    const endTime = new Date("2025-07-31T08:45:24Z");
    const startTime = new Date("2025-07-31T07:45:24Z"); // 1 hour ago

    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count,Average",
        interval: Durations.fiveMinutes,
        startTime: startTime,
        endTime: endTime,
        top: 5,
        orderBy: "count desc",
        filter: "Computer eq '*'",
      },
    );

    assert.equal(result.length, 1);
    assert.isDefined(result[0].timespan);
    assert.isDefined(result[0].metrics);
    assert.equal(result[0].granularity, Durations.fiveMinutes);
  });

  it("batch query should handle empty metrics gracefully", async () => {
    // Test edge case where no metrics data is available for a recent but specific time range
    // Use fixed timestamps for predictable recording/playback
    const endTime = new Date("2025-07-24T08:45:26Z"); // 7 days ago
    const startTime = new Date("2025-07-24T07:45:26Z"); // 1 hour before that

    const result: MetricsQueryResult[] = await metricsClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
      {
        aggregation: "Count",
        startTime: startTime,
        endTime: endTime,
      },
    );

    assert.equal(result.length, 1);
    assert.isDefined(result[0].metrics);
  });
});
