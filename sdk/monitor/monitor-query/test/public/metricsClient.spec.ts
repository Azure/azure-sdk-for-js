// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { MetricsClient } from "../../src";

import { createTestClientSecretCredential, getMetricsArmResourceId } from "./shared/testShared";

describe("MetricsClient live tests", function() {
  let metricsArmResourceId: string;
  let metricsClient: MetricsClient;

  beforeEach(function(this: Context) {
    metricsArmResourceId = getMetricsArmResourceId(this);
    metricsClient = new MetricsClient(createTestClientSecretCredential());
  });

  it("queryMetrics", async () => {
    const result = await metricsClient.queryMetrics(metricsArmResourceId);
    assert.ok(result);

    // {
    //   "id": "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/ripark/providers/Microsoft.ServiceBus/namespaces/riparkdev2/providers/Microsoft.Insights/metrics/SuccessfulRequests",
    //   "type": "Microsoft.Insights/metrics",
    //   "name": {
    //     "value": "SuccessfulRequests",
    //     "localizedValue": "Successful Requests"
    //   },
    //   "unit": "Count",
    //   "timeseries": [
    //     {
    //       "metadatavalues": [],
    //       "data": [
    //         {
    //           "timeStamp": "2021-05-03T18:06:00.000Z",
    //           "total": 180
    //         },
    //         {
    //           "timeStamp": "2021-05-03T19:05:00.000Z",
    //           "total": 193
    //         }
    //       ]
    //     }
    //   ],
    // }
    // "displayDescription": "Total successful requests for a namespace",
    // "errorCode": "Success"

    assert.ok(result.interval);
  });

  it("listNamespaces", async () => {
    const result = await metricsClient.getMetricNamespaces(metricsArmResourceId);
    assert.ok(result);
  });
  it("listDefinitions", async () => {
    const result = await metricsClient.getMetricDefinitions(metricsArmResourceId);
    assert.ok(result);
  });
});
