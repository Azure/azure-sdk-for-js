// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { SpanKind } from "@opentelemetry/api";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { AlwaysOnSampler, BatchSpanProcessor, TracerProvider } from "@opentelemetry/sdk-trace";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AzureMonitorExporterOptions } from "../../../src/config.js";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils.js";

const hostKey = "00000000-0000-4000-8000-000000000001";
const destinations = [
  ["key-a", "https://first.test/prefix/"],
  ["key-b", "https://second.test"],
  ["key-c", "HTTPS://FIRST.TEST:443/prefix"],
  ["", "https://invalid.test"],
];

const routingAttributes = [
  "microsoft.instrumentation_key",
  "microsoft.ingestion_endpoint",
  "microsoft.ingestion_auth",
  "microsoft.multi_endpoint_cloud_role",
];

interface WireItem {
  iKey: string;
  tags: Record<string, string>;
  data: {
    baseType: string;
    baseData: { properties: Record<string, string> };
  };
}

describe.each([false, true])("provider flush with routing enabled: %s", (enabled) => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it.each(["log", "trace", "metric"] as const)(
    "keeps the selection made by the first %s exporter",
    async (first) => {
      vi.resetModules();
      const { AzureMonitorLogExporter, AzureMonitorTraceExporter, AzureMonitorMetricExporter } =
        await import("../../../src/index.js");
      const { ConfigurationManager } =
        await import("../../../src/_configuration/configurationManager.js");
      vi.spyOn(ConfigurationManager.getInstance(), "initialize").mockImplementation(() => {});
      vi.stubEnv("APPLICATION_INSIGHTS_NO_STATSBEAT", "true");
      vi.stubEnv("APPLICATIONINSIGHTS_OPENTELEMETRY_RESOURCE_METRIC_DISABLED", "true");
      vi.stubEnv(
        "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
        enabled ? "multi_endpoint_routing" : "",
      );

      const requests: { url: string; items: WireItem[] }[] = [];
      const options: AzureMonitorExporterOptions = {
        connectionString: `InstrumentationKey=${hostKey};IngestionEndpoint=https://host.test`,
        disableOfflineStorage: true,
        httpClient: {
          async sendRequest(request) {
            const items: WireItem[] = JSON.parse(String(request.body));
            requests.push({ url: request.url, items });
            return {
              request,
              status: 200,
              headers: createHttpHeaders(),
              bodyAsText: JSON.stringify(successfulBreezeResponse(items.length)),
            };
          },
        },
      };
      const resource = resourceFromAttributes({
        "service.name": "host-role",
        "service.instance.id": "instance",
      });
      const FirstExporter = {
        log: AzureMonitorLogExporter,
        trace: AzureMonitorTraceExporter,
        metric: AzureMonitorMetricExporter,
      }[first];
      await new FirstExporter(options).shutdown();
      vi.stubEnv(
        "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
        enabled ? "" : "multi_endpoint_routing",
      );
      const loggerProvider = new LoggerProvider({
        resource,
        processors: [
          new BatchLogRecordProcessor({ exporter: new AzureMonitorLogExporter(options) }),
        ],
      });
      const tracerProvider = new TracerProvider({
        resource,
        sampler: new AlwaysOnSampler(),
        spanProcessors: [
          new BatchSpanProcessor({ exporter: new AzureMonitorTraceExporter(options) }),
        ],
      });
      const meterProvider = new MeterProvider({
        resource,
        readers: [
          new PeriodicExportingMetricReader({ exporter: new AzureMonitorMetricExporter(options) }),
        ],
      });

      try {
        const logger = loggerProvider.getLogger("routing");
        const tracer = tracerProvider.getTracer("routing");
        const counter = meterProvider.getMeter("routing").createCounter("operations");
        const traceIds: string[] = [];
        for (const [i, [key, endpoint]] of destinations.entries()) {
          const attributes = {
            "microsoft.instrumentation_key": key,
            "microsoft.ingestion_endpoint": endpoint,
            "microsoft.ingestion_auth": "ikey",
            "microsoft.multi_endpoint_cloud_role": `role-${i}`,
            "record.id": String(i),
          };
          logger.emit({ body: `log-${i}`, attributes });
          const span = tracer.startSpan(`span-${i}`, { kind: SpanKind.SERVER, attributes });
          traceIds.push(span.spanContext().traceId);
          span.addEvent(`event-${i}`, {
            ...attributes,
            "microsoft.ingestion_endpoint": "https://event.test",
            "microsoft.instrumentation_key": "event-key",
          });
          span.end();
          counter.add(i + 1, attributes);
        }

        const expectedRoutes: Record<string, number[]> = enabled
          ? {
              "https://first.test/prefix/v2.1/track": [0, 2],
              "https://second.test/v2.1/track": [1],
            }
          : { "https://host.test/v2.1/track": [0, 1, 2, 3] };
        expect(requests).toHaveLength(0);
        async function checkFlush(
          provider: LoggerProvider | TracerProvider | MeterProvider,
          expectedItems: (index: number) => object[],
        ): Promise<void> {
          await provider.forceFlush();
          expect(requests.map(({ url }) => url).sort()).toEqual(Object.keys(expectedRoutes).sort());
          for (const { url, items } of requests.splice(0)) {
            const indexes = expectedRoutes[url];
            expect(items).toHaveLength(indexes.flatMap(expectedItems).length);
            for (const i of indexes) {
              const record = items.filter(
                (item) => item.data.baseData.properties["record.id"] === String(i),
              );
              expect(record).toMatchObject(expectedItems(i));
              for (const item of record) {
                expect(item.iKey).toBe(enabled ? destinations[i][0] : hostKey);
                expect(item.tags).toMatchObject({
                  "ai.cloud.role": enabled ? `role-${i}` : "host-role",
                  "ai.cloud.roleInstance": "instance",
                });
                if (enabled) {
                  for (const attribute of routingAttributes) {
                    expect(Object.keys(item.data.baseData.properties)).not.toContain(attribute);
                  }
                }
              }
            }
          }
        }
        await checkFlush(loggerProvider, (i) => [
          { data: { baseType: "MessageData", baseData: { message: `log-${i}` } } },
        ]);
        await checkFlush(tracerProvider, (i) => [
          {
            data: { baseType: "RequestData", baseData: { name: `span-${i}` } },
            tags: { "ai.operation.id": traceIds[i] },
          },
          {
            data: { baseType: "MessageData", baseData: { message: `event-${i}` } },
            tags: { "ai.operation.id": traceIds[i] },
          },
        ]);
        await checkFlush(meterProvider, (i) => [
          {
            data: {
              baseType: "MetricData",
              baseData: { metrics: [{ name: "operations", value: i + 1 }] },
            },
          },
        ]);
      } finally {
        await Promise.all([
          loggerProvider.shutdown(),
          tracerProvider.shutdown(),
          meterProvider.shutdown(),
        ]);
      }
    },
  );
});
