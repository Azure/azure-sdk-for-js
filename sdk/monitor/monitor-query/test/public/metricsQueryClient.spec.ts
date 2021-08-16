// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Durations, MetricsQueryClient } from "../../src";
import { timespan } from "../../src/generated/logquery/src/models/parameters";

import { createTestClientSecretCredential, getMetricsArmResourceId } from "./shared/testShared";

describe("MetricsClient live tests", function() {
  let resourceId: string;
  let metricsQueryClient: MetricsQueryClient;

  beforeEach(function(this: Context) {
    ({ resourceId } = getMetricsArmResourceId(this));
    metricsQueryClient = new MetricsQueryClient(createTestClientSecretCredential());
  });

  it("getMetricDefinitions -> queryMetrics", async () => {
    const metricDefinitions = await metricsQueryClient.getMetricDefinitions(resourceId);
    assert.isNotEmpty(metricDefinitions.definitions);

    // you can only query 20 metrics at a time.
    for (const definition of metricDefinitions.definitions) {
      const result = await metricsQueryClient.queryMetrics(resourceId, {
        metricNames: [definition.name || ""]
      });

      assert.ok(result);
      assert.ok(result.interval);
      assert.isNotEmpty(result.metrics);
    }

    // do a quick run through of all the individual metrics, in groups of 20
    // which is the max.
    for (let i = 0; i < metricDefinitions.definitions.length; i += 20) {
      const definitionNames = metricDefinitions.definitions
        .slice(i, i + 20)
        // TODO: I think the 'name' being optional is incorrect in the swagger
        // but just in case I'll check until we fix it.
        .map((definition) => definition.name!);

      for (const definitionName of definitionNames) {
        if (definitionName == null) {
          throw new Error("Definition name for a metric was undefined/null");
        }
      }

      const newResults = await metricsQueryClient.queryMetrics(resourceId, {
        metricNames: definitionNames,
        timespan: Durations.last24Hours
      });

      assert.ok(newResults);
      assert.isNotEmpty(newResults.metrics);
    }

    // pick the first query and use the namespace as well.

    const firstMetricDefinition = metricDefinitions.definitions[0];

    assert.isNotNull(firstMetricDefinition);
    assert.isNotEmpty(firstMetricDefinition.name);
    assert.isNotEmpty(firstMetricDefinition.namespace);

    const individualMetricWithNamespace = metricsQueryClient.queryMetrics(resourceId, {
      metricNames: [firstMetricDefinition.name!],
      timespan: Durations.last24Hours,
      metricNamespace: firstMetricDefinition.namespace
    });

    assert.ok(individualMetricWithNamespace);
  });

  it("listNamespaces", async () => {
    const result = await metricsQueryClient.getMetricNamespaces(resourceId);
    assert.ok(result);
  });
  it("listDefinitions", async () => {
    const result = await metricsQueryClient.getMetricDefinitions(resourceId);
    assert.ok(result);
  });
});
