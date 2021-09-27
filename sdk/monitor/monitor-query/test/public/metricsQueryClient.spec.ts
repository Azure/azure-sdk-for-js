// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Durations, MetricsQueryClient } from "../../src";

import { createTestClientSecretCredential, getMetricsArmResourceId } from "./shared/testShared";

describe("MetricsClient live tests", function() {
  let resourceId: string;
  let metricsQueryClient: MetricsQueryClient;

  beforeEach(function(this: Context) {
    ({ resourceId } = getMetricsArmResourceId(this));
    metricsQueryClient = new MetricsQueryClient(createTestClientSecretCredential());
  });

  it("getMetricDefinitions -> queryMetrics", async () => {
    const iter = metricsQueryClient.listMetricDefinitions(resourceId);

    let result = await iter.next();
    assert.isNotEmpty(result);
    const firstMetricDefinition = result.value;
    let metricDefinitionsLength = 0;
    while (!result.done) {
      // you can only query 20 metrics at a time.
      const resultQuery = await metricsQueryClient.query(resourceId, [result.value.name || ""], {});
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
        const newResults = await metricsQueryClient.query(resourceId, definitionNames, {
          timespan: {
            duration: Durations.TwentyFourHours
          }
        });
        assert.ok(newResults);
        assert.isNotEmpty(newResults.metrics);
      }
    }

    // pick the first query and use the namespace as well.

    assert.isNotNull(firstMetricDefinition);
    assert.isNotEmpty(firstMetricDefinition.name);
    assert.isNotEmpty(firstMetricDefinition.namespace);

    const individualMetricWithNamespace = metricsQueryClient.query(
      resourceId,
      [firstMetricDefinition.name!],
      {
        timespan: { duration: Durations.TwentyFourHours },
        metricNamespace: firstMetricDefinition.namespace
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
