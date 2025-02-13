// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { MetricsClient, MetricsQueryResult } from "../../src/index.js";
import type { RecorderAndMetricsBatchQueryClient } from "./shared/testShared.js";
import {
  createRecorderAndMetricsBatchQueryClient,
  getMetricsBatchResourceIds,
  getMetricsBatchNamespace,
  getMetricsBatchNames,
} from "./shared/testShared.js";
import { describe, it, assert, beforeEach } from "vitest";

describe.skip("MetricsBatchClient live tests", function () {
  let resourceIds: string[];
  let metricsNamespace: string;
  let metricNames: string[];
  let metricsBatchQueryClient: MetricsClient;

  beforeEach(async () => {
    const recordedClient: RecorderAndMetricsBatchQueryClient =
      await createRecorderAndMetricsBatchQueryClient();
    resourceIds = getMetricsBatchResourceIds();
    metricsNamespace = getMetricsBatchNamespace();
    metricNames = getMetricsBatchNames();
    metricsBatchQueryClient = recordedClient.client;
  });

  it("batch query with no resource ids", async () => {
    try {
      await metricsBatchQueryClient.queryResources([], metricNames, metricsNamespace);
      assert.fail("Code should not reach here.");
    } catch {
      assert.equal(1, 1);
    }
  });

  it("batch query for 2 resource ids", async () => {
    const result: MetricsQueryResult[] = await metricsBatchQueryClient.queryResources(
      resourceIds,
      metricNames,
      metricsNamespace,
    );
    assert.equal(result.length, 2);
  });

  it("batch query for 1 resource id", async () => {
    const result: MetricsQueryResult[] = await metricsBatchQueryClient.queryResources(
      [resourceIds[0]],
      metricNames,
      metricsNamespace,
    );
    assert.equal(result.length, 1);
  });
});
