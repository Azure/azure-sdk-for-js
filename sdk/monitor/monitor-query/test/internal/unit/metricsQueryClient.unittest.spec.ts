import { DefaultAzureCredential } from "@azure/identity";
import { assert } from "@azure/test-utils";
import { Durations, MetricsQueryClient } from "../../../src";

it("verify tracing", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsQueryClient(credential, {
      endpoint: "https://customEndpoint1",
    });
    await assert.supportsTracing(
      async (options) => {
        const promises: Promise<any>[] = [
         client.queryResource("resourceId",["metricName1","metricName2"],{
            granularity: "PT1M",
            timespan: { duration: Durations.fiveMinutes },
            ...options
         }),
        client.listMetricNamespaces("resourceUri").next(),
        client.listMetricDefinitions("resourceUri").next()
        ];
        // We don't care about errors, only that we created (and closed) the appropriate spans.
        await Promise.all(promises.map((p) => p.catch(() => undefined)));
      },
      ["MetricsQueryClient.queryResource",
       "MetricsQueryClient.listSegmentOfMetricDefinitions",
    ]   
    );
  });