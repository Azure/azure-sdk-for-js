// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { getYieldedValue } from "@azure/test-utils";
import { Durations, MetricsQueryClient } from "../../src";

import {
  RecorderAndMetricsClient,
  createRecorderAndMetricsClient,
  getMetricsArmResourceId,
  loggerForTest,
} from "./shared/testShared";
import { Recorder } from "@azure-tools/test-recorder";
describe("MetricsClient live tests", function () {
  let resourceId: string;
  let metricsQueryClient: MetricsQueryClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    loggerForTest.verbose(`Recorder: starting...`);
    recorder = new Recorder(this.currentTest);
    const recordedClient: RecorderAndMetricsClient = await createRecorderAndMetricsClient(recorder);
    ({ resourceId } = getMetricsArmResourceId());
    metricsQueryClient = recordedClient.client;
  });

  afterEach(async function () {
    loggerForTest.verbose("Recorder: stopping");
    await recorder.stop();
  });

  it("getMetricDefinitions -> queryMetrics", async () => {
    const iter = metricsQueryClient.listMetricDefinitions(resourceId);

    let result = await iter.next();
    const firstResult = getYieldedValue(result);
    assert.isNotEmpty(result);
    let metricDefinitionsLength = 0;
    while (!result.done) {
      // you can only query 20 metrics at a time.
      const resultQuery = await metricsQueryClient.queryResource(
        resourceId,
        [result.value.name || ""],
        {}
      );
      assert(resultQuery);
      assert(resultQuery.granularity);
      assert.isNotEmpty(resultQuery.metrics);
      result = await iter.next();
      metricDefinitionsLength++;
    }

    const metricDefinitions = iter;
    let i = 0;
    let definitionNames: Array<string> = [];

    for await (const metricDefinition of metricDefinitions) {
      if (i % 20 === 0) {
        definitionNames = [];
      }
      if (metricDefinition.name == null) {
        throw new Error("Definition name for a metric was undefined/null");
      }
      definitionNames.push(metricDefinition.name);

      i++;
      if (i % 20 === 0 || i === metricDefinitionsLength) {
        const newResults = await metricsQueryClient.queryResource(resourceId, definitionNames, {
          timespan: {
            duration: Durations.twentyFourHours,
          },
        });
        assert.ok(newResults);
        assert.isNotEmpty(newResults.metrics);
      }
    }

    // pick the first query and use the namespace as well.

    assert.isNotNull(firstResult);
    assert.isNotEmpty(firstResult.name);
    assert.isNotEmpty(firstResult.namespace);

    const individualMetricWithNamespace = await metricsQueryClient.queryResource(
      resourceId,
      [firstResult.name!],
      {
        timespan: { duration: Durations.twentyFourHours },
        metricNamespace: firstResult.namespace,
      }
    );

    assert.ok(individualMetricWithNamespace);
  });

  it("listNamespaces", async () => {
    const result = metricsQueryClient.listMetricNamespaces(resourceId);
    assert.ok(result);
  });
  it("listDefinitions", async () => {
    const result = metricsQueryClient.listMetricDefinitions(resourceId);
    assert.ok(result);
  });
});
