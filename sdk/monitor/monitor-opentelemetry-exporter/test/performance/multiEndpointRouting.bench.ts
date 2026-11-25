// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { ExportResultCode } from "@opentelemetry/core";
import type { ReadableSpan } from "@opentelemetry/sdk-trace";
import {
  AlwaysOnSampler,
  InMemorySpanExporter,
  SimpleSpanProcessor,
  TracerProvider,
} from "@opentelemetry/sdk-trace";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AzureMonitorExporterOptions, AzureMonitorTraceExporter } from "../../src/index.js";

const batchSize = 512;
const modes = ["disabled", "disabled-with-attributes", "enabled"] as const;
type Mode = (typeof modes)[number];

async function makeBatch(mode: Mode, endpoints: number): Promise<ReadableSpan[]> {
  const exporter = new InMemorySpanExporter();
  const provider = new TracerProvider({
    sampler: new AlwaysOnSampler(),
    spanProcessors: [new SimpleSpanProcessor({ exporter })],
  });
  try {
    const tracer = provider.getTracer("routing-benchmark");
    for (let i = 0; i < batchSize; i++) {
      const destination = i % endpoints;
      const span = tracer.startSpan("operation", { attributes: { "benchmark.index": i } });
      if (mode !== "disabled") {
        span.setAttribute("microsoft.instrumentation_key", `key-${destination}`);
        span.setAttribute("microsoft.ingestion_endpoint", `https://endpoint-${destination}.test`);
      }
      span.end();
    }
    await provider.forceFlush();
    return [...exporter.getFinishedSpans()];
  } finally {
    await provider.shutdown();
  }
}

describe.each(modes)("routing %s", (mode) => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it.for([1, 3, 25])("%i destination(s)", async (endpoints, { bench }) => {
    vi.resetModules();
    vi.stubEnv(
      "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
      mode === "enabled" ? "multi_endpoint_routing" : "",
    );
    vi.stubEnv("APPLICATION_INSIGHTS_NO_STATSBEAT", "true");
    vi.stubEnv("APPLICATIONINSIGHTS_OPENTELEMETRY_RESOURCE_METRIC_DISABLED", "true");
    const { AzureMonitorTraceExporter: TraceExporter } = await import("../../src/index.js");
    const { ConfigurationManager } =
      await import("../../src/_configuration/configurationManager.js");
    vi.spyOn(ConfigurationManager.getInstance(), "initialize").mockImplementation(() => {});
    const spans = await makeBatch(mode, endpoints);
    expect(spans).toHaveLength(batchSize);

    let observe: ((request: PipelineRequest) => void) | undefined;
    const options: AzureMonitorExporterOptions = {
      connectionString:
        "InstrumentationKey=00000000-0000-4000-8000-000000000001;IngestionEndpoint=https://host.test",
      disableOfflineStorage: true,
      retryOptions: { maxRetries: 0 },
      httpClient: {
        async sendRequest(request) {
          observe?.(request);
          return {
            request,
            status: 200,
            headers: createHttpHeaders(),
            bodyAsText: '{"errors":[]}',
          };
        },
      },
    };
    const exportBatch = (exporter: AzureMonitorTraceExporter): Promise<void> =>
      exporter.export(spans, (result) => {
        if (result.code !== ExportResultCode.SUCCESS) {
          throw result.error ?? new Error("Export failed");
        }
      });
    const warmExporter = new TraceExporter(options);
    const warm = (): Promise<void> => exportBatch(warmExporter);
    const cold = async (): Promise<void> => {
      const exporter = new TraceExporter(options);
      try {
        await exportBatch(exporter);
      } finally {
        await exporter.shutdown();
      }
    };

    try {
      const requests: { url: string; count: number }[] = [];
      observe = (request) => {
        const items: unknown[] = JSON.parse(String(request.body));
        requests.push({ url: request.url, count: items.length });
      };
      await warm();
      const hosts =
        mode === "enabled"
          ? Array.from({ length: endpoints }, (_, i) => `endpoint-${i}.test`)
          : ["host.test"];
      expect(requests).toHaveLength(hosts.length);
      for (const [i, host] of hosts.entries()) {
        expect(requests).toContainEqual({
          url: `https://${host}/v2.1/track`,
          count: Math.floor(batchSize / hosts.length) + (i < batchSize % hosts.length ? 1 : 0),
        });
      }
      observe = undefined;
      await bench.compare(bench("warm", warm), bench("cold", cold));

      // Sample heap separately so memory instrumentation is never part of the timing.
      for (const [start, run] of [
        ["warm", warm],
        ["cold", cold],
      ] as const) {
        global.gc?.();
        const initial = process.memoryUsage().heapUsed;
        let peak = initial;
        observe = () => {
          peak = Math.max(peak, process.memoryUsage().heapUsed);
        };
        await run();
        const final = process.memoryUsage().heapUsed;
        console.log(
          JSON.stringify({
            mode,
            endpoints,
            start,
            batchSize,
            sampledPeakHeapGrowthBytes: Math.max(peak, final) - initial,
            heapDeltaBytes: final - initial,
          }),
        );
      }
    } finally {
      await warmExporter.shutdown();
    }
  });
});
