// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { MetricsBatchQueryClient, MetricResultsResponseValuesItem } from "../../src";
import {
  RecorderAndMetricsBatchQueryClient,
  createRecorderAndMetricsBatchQueryClient,
  getMetricsBatchResourceIds,
  getMetricsBatchNamespace,
  getMetricsBatchNames,
} from "./shared/testShared";

describe.skip("MetricsBatchClient live tests", function () {
  let resourceIds: string[];
  let metricsNamespace: string;
  let metricNames: string[];
  let metricsBatchQueryClient: MetricsBatchQueryClient;

  beforeEach(async function (this: Context) {
    const recordedClient: RecorderAndMetricsBatchQueryClient =
      await createRecorderAndMetricsBatchQueryClient();
    resourceIds = getMetricsBatchResourceIds();
    metricsNamespace = getMetricsBatchNamespace();
    metricNames = getMetricsBatchNames();
    metricsBatchQueryClient = recordedClient.client;
  });

  // afterEach(async function () {
  //   loggerForTest.verbose("Recorder: stopping");
  //   await recorder.stop();
  // });

  it("batch query with no resource ids", async () => {
    try {
      await metricsBatchQueryClient.queryBatch([], metricsNamespace, metricNames);
      assert.fail("Code should not reach here.");
    } catch (e) {
      assert.equal(1, 1);
    }
  });

  it("batch query for 2 resource ids", async () => {
    const result: MetricResultsResponseValuesItem[] = await metricsBatchQueryClient.queryBatch(
      resourceIds,
      metricsNamespace,
      metricNames,
    );
    assert.equal(result.length, 2);
  });

  it("batch query for 1 resource id", async () => {
    const result: MetricResultsResponseValuesItem[] = await metricsBatchQueryClient.queryBatch(
      [resourceIds[0]],
      metricsNamespace,
      metricNames,
    );
    assert.equal(result.length, 1);
  });
});
