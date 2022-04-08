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
         //Type 'PagedAsyncIterableIterator<MetricDefinition, MetricDefinition[], PageSettings>' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
        //  await client.listMetricDefinitions("resourceUri").byPage({
        //      maxPageSize: 2,
        //      continuationToken: null
        //  }),
        // client.listMetricNames("resourceUri")
        ];
        // We don't care about errors, only that we created (and closed) the appropriate spans.
        await Promise.all(promises.map((p) => p.catch(() => undefined)));
      },
      ["MetricsQueryClient.queryResource",
       // "MetricsQueryClient.listSegmentOfMetricDefinitions",
       // "MetricsQueryClient.listSegmentOfMetricNames"
    ]   
    );
  });