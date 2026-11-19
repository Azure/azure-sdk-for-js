// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { gunzipSync } from "node:zlib";
import type { Attributes } from "@opentelemetry/api";
import { SpanKind, SpanStatusCode, TraceFlags, ValueType } from "@opentelemetry/api";
import { ExportResultCode } from "@opentelemetry/core";
import type { ExportResult } from "@opentelemetry/core";
import { resourceFromAttributes } from "@opentelemetry/resources";
import type { ReadableLogRecord } from "@opentelemetry/sdk-logs";
import type { ReadableSpan } from "@opentelemetry/sdk-trace";
import type { ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { AggregationTemporality, DataPointType } from "@opentelemetry/sdk-metrics";
import { createEmptyPipeline, createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import type { AzureMonitorExporterOptions } from "../../src/config.js";
import {
  AzureMonitorLogExporter,
  AzureMonitorTraceExporter,
  AzureMonitorMetricExporter,
} from "../../src/index.js";
import * as routing from "../../src/utils/routing.js";
import { ConfigurationManager } from "../../src/_configuration/configurationManager.js";
import { StatsbeatManager } from "../../src/export/statsbeat/statsbeatManager.js";
import { CustomerSDKStatsManager } from "../../src/export/statsbeat/customerSDKStatsManager.js";
import { AzureMonitorStatsbeatExporter } from "../../src/export/statsbeat/statsbeatExporter.js";
import { FileAccessControl } from "../../src/platform/nodejs/persist/fileAccessControl.js";

const hostKey = "00000000-0000-4000-8000-000000000001";
const route = (key = "tenant-key", endpoint = "https://first.test"): Attributes => ({
  "microsoft.instrumentation_key": key,
  "microsoft.ingestion_endpoint": endpoint,
  "microsoft.multi_endpoint_cloud_role": "tenant-role",
});
const resource = resourceFromAttributes({
  "service.name": "host-service",
  "service.instance.id": "host-instance",
});

function log(attributes: Attributes = route()): ReadableLogRecord {
  return {
    resource,
    instrumentationScope: { name: "test" },
    hrTime: [1, 0],
    hrTimeObserved: [1, 0],
    body: "message",
    attributes,
    droppedAttributesCount: 0,
  };
}

function span(attributes: Attributes = route()): ReadableSpan {
  return {
    resource,
    instrumentationScope: { name: "test" },
    name: "request",
    kind: SpanKind.SERVER,
    spanContext: () => ({
      traceId: "12345678901234567890123456789012",
      spanId: "1234567890123456",
      traceFlags: TraceFlags.SAMPLED,
    }),
    startTime: [1, 0],
    endTime: [2, 0],
    duration: [1, 0],
    status: { code: SpanStatusCode.OK },
    attributes,
    links: [],
    events: [],
    ended: true,
    droppedAttributesCount: 0,
    droppedEventsCount: 0,
    droppedLinksCount: 0,
  };
}

function metrics(points: Attributes[]): ResourceMetrics {
  return {
    resource,
    scopeMetrics: [
      {
        scope: { name: "test" },
        metrics: [
          {
            descriptor: { name: "requests", description: "", unit: "1", valueType: ValueType.INT },
            aggregationTemporality: AggregationTemporality.DELTA,
            dataPointType: DataPointType.SUM,
            isMonotonic: true,
            dataPoints: points.map((attributes, index) => ({
              attributes,
              startTime: [1, 0],
              endTime: [2, 0],
              value: index + 1,
            })),
          },
        ],
      },
    ],
  };
}

interface WireEnvelope {
  iKey: string;
  tags: Record<string, string>;
  data: {
    baseType: string;
    baseData: { properties: Record<string, string>; metrics?: { value: number }[] };
  };
}

describe("multi-endpoint exporters", () => {
  let exporters: { shutdown(): Promise<void> }[];
  let requests: PipelineRequest[];
  let options: AzureMonitorExporterOptions;
  let sendRequest: ReturnType<typeof vi.fn<HttpClient["sendRequest"]>>;

  beforeEach(() => {
    exporters = [];
    requests = [];
    vi.spyOn(routing, "isMultiEndpointRoutingEnabled").mockReturnValue(true);
    vi.stubEnv("APPLICATIONINSIGHTS_CONNECTION_STRING", undefined);
    vi.stubEnv("APPLICATION_INSIGHTS_NO_STATSBEAT", "true");
    vi.spyOn(ConfigurationManager.getInstance(), "initialize").mockImplementation(() => {});
    sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => {
      requests.push(request);
      return {
        request,
        status: 200,
        headers: createHttpHeaders(),
        bodyAsText: '{"itemsReceived":1,"itemsAccepted":1,"errors":[]}',
      };
    });
    options = {
      httpClient: { sendRequest },
      disableOfflineStorage: true,
      retryOptions: { maxRetries: 0 },
    };
  });

  afterEach(async () => {
    await Promise.all(exporters.map((exporter) => exporter.shutdown()));
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  function create<T extends { shutdown(): Promise<void> }>(exporter: T): T {
    exporters.push(exporter);
    return exporter;
  }

  function body(index = 0): WireEnvelope[] {
    const request = requests[index];
    return JSON.parse(
      request.headers.get("content-encoding") === "gzip" && Buffer.isBuffer(request.body)
        ? gunzipSync(request.body).toString("utf8")
        : String(request.body),
    );
  }

  it("routes logs without host configuration and strips routing properties", async () => {
    const stats = vi.spyOn(StatsbeatManager.getInstance(), "initialize");
    const customerStats = vi.spyOn(CustomerSDKStatsManager.getInstance(), "initialize");
    const exporter = create(new AzureMonitorLogExporter(options));
    const callback = vi.fn();
    const first = log({ ...route("first", "https://FIRST.test.:443/"), custom: "value" });
    await exporter.export(
      [first, log(route("second")), log(route("third", "https://second.test/prefix")), log({})],
      callback,
    );
    expect(callback).toHaveBeenCalledExactlyOnceWith({ code: ExportResultCode.SUCCESS });
    expect(requests.map((request) => request.url)).toEqual([
      "https://first.test/v2.1/track",
      "https://second.test/prefix/v2.1/track",
    ]);
    expect(body().map((envelope) => envelope.iKey)).toEqual(["first", "second"]);
    expect(body()[0].data.baseData.properties).toEqual({ custom: "value" });
    expect(body()[0].tags).toMatchObject({
      "ai.cloud.role": "tenant-role",
      "ai.cloud.roleInstance": "host-instance",
    });
    expect(first.attributes).toHaveProperty("microsoft.instrumentation_key", "first");
    expect(stats).not.toHaveBeenCalled();
    expect(customerStats).not.toHaveBeenCalled();
  });

  it("preserves destination-specific envelopes when regional requests are compressed", async () => {
    const exporter = create(new AzureMonitorLogExporter(options));
    const callback = vi.fn();
    await exporter.export(
      [
        log(route("east-first", "https://eastus-8.in.applicationinsights.azure.com")),
        log(route("east-second", "https://eastus-8.in.applicationinsights.azure.com")),
        log(route("west", "https://westus2-2.in.applicationinsights.azure.com")),
      ],
      callback,
    );
    expect(callback).toHaveBeenCalledExactlyOnceWith({ code: ExportResultCode.SUCCESS });
    expect(requests).toHaveLength(2);
    for (const [index, request] of requests.entries()) {
      expect(request.headers.get("content-encoding")).toBe("gzip");
      expect(Buffer.isBuffer(request.body)).toBe(true);
      expect(body(index).map((envelope) => envelope.iKey)).toEqual(
        request.url.includes("eastus-8") ? ["east-first", "east-second"] : ["west"],
      );
    }
  });

  it.each([AzureMonitorLogExporter, AzureMonitorTraceExporter, AzureMonitorMetricExporter])(
    "%s preserves statistics storage settings independently of host sender persistence",
    async (Exporter) => {
      vi.stubEnv("APPLICATION_INSIGHTS_NO_STATSBEAT", undefined);
      vi.stubEnv("APPLICATIONINSIGHTS_SDKSTATS_DISABLED", undefined);
      vi.spyOn(StatsbeatManager.getInstance(), "initialize").mockImplementation(() => {});
      vi.spyOn(CustomerSDKStatsManager.getInstance(), "initialize").mockResolvedValue();
      vi.spyOn(FileAccessControl, "checkFileProtection").mockImplementation(() => {});
      const fileProtection = FileAccessControl.OS_PROVIDES_FILE_PROTECTION;
      FileAccessControl.OS_PROVIDES_FILE_PROTECTION = true;
      vi.useFakeTimers();

      try {
        for (const routingEnabled of [true, false]) {
          vi.mocked(routing.isMultiEndpointRoutingEnabled).mockReturnValue(routingEnabled);
          for (const disableOfflineStorage of [undefined, false, true]) {
            const exporterOptions = {
              ...options,
              connectionString: `InstrumentationKey=${hostKey};IngestionEndpoint=https://host.test`,
              disableOfflineStorage,
            };
            const exporter = create(new Exporter(exporterOptions));
            const sender =
              exporter instanceof AzureMonitorTraceExporter
                ? exporter["sender"]
                : exporter instanceof AzureMonitorLogExporter
                  ? exporter["_sender"]
                  : exporter["_sender"];
            const statisticsOptions = expect.objectContaining({
              instrumentationKey: hostKey,
              endpointUrl: "https://host.test",
              disableOfflineStorage: disableOfflineStorage ?? false,
            });
            expect(StatsbeatManager.getInstance().initialize).toHaveBeenLastCalledWith(
              statisticsOptions,
            );
            expect(CustomerSDKStatsManager.getInstance().initialize).toHaveBeenLastCalledWith(
              statisticsOptions,
            );
            expect(sender.hasOfflineStorage).toBe(!routingEnabled && !disableOfflineStorage);
            expect(exporterOptions.disableOfflineStorage).toBe(disableOfflineStorage);
            await exporter.shutdown();
          }
        }
      } finally {
        FileAccessControl.OS_PROVIDES_FILE_PROTECTION = fileProtection;
        vi.useRealTimers();
      }
    },
  );

  it.each([AzureMonitorLogExporter, AzureMonitorTraceExporter, AzureMonitorMetricExporter])(
    "%s still validates supplied host connection strings",
    (Exporter) => {
      for (const connectionString of [
        "",
        "invalid",
        "InstrumentationKey=invalid",
        "IngestionEndpoint=https://host.test",
      ]) {
        expect(() => new Exporter({ ...options, connectionString })).toThrow();
      }
      vi.stubEnv("APPLICATIONINSIGHTS_CONNECTION_STRING", "InstrumentationKey=invalid");
      expect(() => new Exporter(options)).toThrow();
    },
  );

  it("uses parent routing for span events and never emits a host resource envelope", async () => {
    const exporter = create(
      new AzureMonitorTraceExporter({
        ...options,
        connectionString: `InstrumentationKey=${hostKey}`,
      }),
    );
    const parent = span();
    parent.events.push({
      name: "event",
      time: [1, 0],
      attributes: { ...route("wrong", "https://wrong.test"), custom: "event-value" },
    });
    const callback = vi.fn();
    await exporter.export(
      [parent, span({}), span(route("second", "https://second.test"))],
      callback,
    );
    expect(callback).toHaveBeenCalledExactlyOnceWith({ code: ExportResultCode.SUCCESS });
    expect(body()).toHaveLength(2);
    expect(body().map((envelope) => envelope.iKey)).toEqual(["tenant-key", "tenant-key"]);
    expect(body().map((envelope) => envelope.tags["ai.cloud.role"])).toEqual([
      "tenant-role",
      "tenant-role",
    ]);
    expect(body()[1].data.baseData.properties).toEqual({ custom: "event-value" });
    expect(requests).toHaveLength(2);
  });

  it("routes individual metric points and keeps distinct cloud roles", async () => {
    const exporter = create(new AzureMonitorMetricExporter(options));
    const callback = vi.fn();
    await exporter.export(
      metrics([
        { ...route("first"), custom: "one" },
        { ...route("second"), "microsoft.multi_endpoint_cloud_role": " " },
        route("third", "https://second.test"),
        {},
      ]),
      callback,
    );
    expect(callback).toHaveBeenCalledExactlyOnceWith({ code: ExportResultCode.SUCCESS });
    expect(requests).toHaveLength(2);
    expect(body().map((envelope) => envelope.iKey)).toEqual(["first", "second"]);
    expect(body().map((envelope) => envelope.tags["ai.cloud.role"])).toEqual([
      "tenant-role",
      "unknown_service",
    ]);
    expect(body().map((envelope) => envelope.data.baseData.metrics?.[0].value)).toEqual([1, 2]);
    expect(body()[0].data.baseData.properties).toEqual({ custom: "one" });
  });

  it.each([false, true])(
    "retains GenAI message limits initialized with opt-in %s across routed telemetry",
    async (enabled) => {
      vi.stubEnv(
        "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
        enabled
          ? "multi_endpoint_routing,gen_ai_input_output_limit_increase"
          : "multi_endpoint_routing",
      );
      const logExporter = create(new AzureMonitorLogExporter(options));
      const traceExporter = create(new AzureMonitorTraceExporter(options));
      const metricExporter = create(new AzureMonitorMetricExporter(options));
      vi.stubEnv(
        "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
        enabled ? undefined : "gen_ai_input_output_limit_increase",
      );
      const attributes = {
        ...route(),
        "gen_ai.input.messages": "i".repeat(1024 * 1024),
        "gen_ai.output.messages": "o".repeat(4 * 1024 * 1024 + 1),
        "gen_ai.system_instructions": "s".repeat(256 * 1024 + 1),
        "custom.attribute": "c".repeat(8 * 1024 + 1),
      };
      const parent = span(attributes);
      parent.events.push({ name: "event", time: [1, 0], attributes });
      const callback = vi.fn();
      await logExporter.export([log(attributes)], callback);
      await traceExporter.export([parent], callback);
      await metricExporter.export(metrics([attributes]), callback);

      expect(callback.mock.calls).toEqual([
        [{ code: ExportResultCode.SUCCESS }],
        [{ code: ExportResultCode.SUCCESS }],
        [{ code: ExportResultCode.SUCCESS }],
      ]);
      expect(requests.map((request) => request.url)).toEqual([
        "https://first.test/v2.1/track",
        "https://first.test/v2.1/track",
        "https://first.test/v2.1/track",
      ]);
      const envelopes = requests.flatMap((_, index) => body(index));
      expect(envelopes).toHaveLength(4);
      for (const envelope of envelopes) {
        expect(envelope.iKey).toBe("tenant-key");
        const properties = envelope.data.baseData.properties;
        expect(Buffer.byteLength(properties["gen_ai.input.messages"])).toBe(
          enabled ? 1024 * 1024 : 256 * 1024,
        );
        expect(Buffer.byteLength(properties["gen_ai.output.messages"])).toBe(
          enabled ? 4 * 1024 * 1024 : 256 * 1024,
        );
        expect(Buffer.byteLength(properties["gen_ai.system_instructions"])).toBe(256 * 1024);
        expect(Buffer.byteLength(properties["custom.attribute"])).toBe(8 * 1024);
        expect(properties["microsoft.instrumentation_key"]).toBeUndefined();
      }
    },
  );

  it("separates authentication modes without sending host credentials on key-only routes", async () => {
    const getToken = vi
      .fn()
      .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 });
    const exporter = create(
      new AzureMonitorLogExporter({
        ...options,
        credential: { getToken },
        host: "https://wrong.test",
        endpoint: "https://wrong.test/override",
      }),
    );
    await exporter.export(
      [log(route("key-only")), log({ ...route("aad-key"), "microsoft.ingestion_auth": " AAD " })],
      vi.fn(),
    );
    expect(requests).toHaveLength(2);
    expect(requests.map((request) => request.url)).toEqual([
      "https://first.test/v2.1/track",
      "https://first.test/v2.1/track",
    ]);
    expect(requests[0].headers.get("authorization")).toBeUndefined();
    expect(requests[1].headers.get("authorization")).toBe("Bearer test-token");
    expect(getToken).toHaveBeenCalledOnce();
  });

  it("reports missing AAD credentials while still sending independent destinations", async () => {
    const exporter = create(new AzureMonitorLogExporter(options));
    const callback = vi.fn<(result: ExportResult) => void>();
    await exporter.export(
      [
        log({ ...route(), "microsoft.ingestion_auth": "aad" }),
        log(route("key-only", "https://second.test")),
      ],
      callback,
    );
    expect(callback).toHaveBeenCalledOnce();
    expect(callback.mock.calls[0][0].code).toBe(ExportResultCode.FAILED);
    expect(callback.mock.calls[0][0].error?.message).toContain("requires an exporter credential");
    expect(body()[0].iKey).toBe("key-only");
  });

  it("reports HTTP failure once without cancelling other routes", async () => {
    sendRequest.mockImplementation(async (request) => {
      requests.push(request);
      return {
        request,
        status: request.url.includes("first") ? 500 : 200,
        headers: createHttpHeaders(),
        bodyAsText: "",
      };
    });
    const exporter = create(new AzureMonitorTraceExporter(options));
    const callback = vi.fn();
    await exporter.export([span(), span(route("second", "https://second.test"))], callback);
    expect(callback).toHaveBeenCalledOnce();
    expect(callback.mock.calls[0][0].code).toBe(ExportResultCode.FAILED);
    expect(requests).toHaveLength(2);
  });

  it("rejects stateful custom pipelines and additional policies", () => {
    expect(
      () => new AzureMonitorLogExporter({ ...options, pipeline: createEmptyPipeline() }),
    ).toThrow("Custom pipelines");
    expect(
      () =>
        new AzureMonitorLogExporter({
          ...options,
          additionalPolicies: [
            {
              policy: { name: "custom", sendRequest: (request, next) => next(request) },
              position: "perCall",
            },
          ],
        }),
    ).toThrow("additional policies");
  });

  it("preserves host routing and existing property filtering when the feature is disabled", async () => {
    vi.mocked(routing.isMultiEndpointRoutingEnabled).mockReturnValue(false);
    expect(() => new AzureMonitorLogExporter(options)).toThrow("No instrumentation key");
    const exporter = create(
      new AzureMonitorLogExporter({
        ...options,
        connectionString: `InstrumentationKey=${hostKey};IngestionEndpoint=https://host.test`,
      }),
    );
    await exporter.export([log()], vi.fn());
    expect(requests[0].url).toBe("https://host.test/v2.1/track");
    expect(body()[0].iKey).toBe(hostKey);
    expect(body()[0].tags["ai.cloud.role"]).toBe("host-service");
    expect(body()[0].data.baseData.properties["microsoft.instrumentation_key"]).toBeUndefined();
  });

  it("returns success once for empty or fully invalid batches", async () => {
    const logExporter = create(new AzureMonitorLogExporter(options));
    const traceExporter = create(new AzureMonitorTraceExporter(options));
    const metricExporter = create(new AzureMonitorMetricExporter(options));
    for (const operation of [
      (callback: (result: ExportResult) => void) => logExporter.export([], callback),
      (callback: (result: ExportResult) => void) => traceExporter.export([span({})], callback),
      (callback: (result: ExportResult) => void) => metricExporter.export(metrics([{}]), callback),
    ]) {
      const callback = vi.fn();
      await operation(callback);
      expect(callback).toHaveBeenCalledExactlyOnceWith({ code: ExportResultCode.SUCCESS });
    }
    expect(requests).toHaveLength(0);
  });

  it("keeps internal statistics on the host destination when routing is enabled", async () => {
    const exporter = create(
      new AzureMonitorStatsbeatExporter({
        ...options,
        connectionString: `InstrumentationKey=${hostKey};IngestionEndpoint=https://host.test`,
      }),
    );
    const callback = vi.fn();
    await exporter.export(metrics([route()]), callback);
    expect(callback).toHaveBeenCalledExactlyOnceWith({ code: ExportResultCode.SUCCESS });
    expect(requests[0].url).toBe("https://host.test/v2.1/track");
    expect(body()[0].iKey).toBe(hostKey);
  });

  it("does not send after shutdown", async () => {
    const exporter = create(new AzureMonitorLogExporter(options));
    await exporter.export([log()], vi.fn());
    await exporter.shutdown();
    const result = await new Promise<ExportResult>(
      (resolve) => void exporter.export([log()], resolve),
    );
    expect(result.code).toBe(ExportResultCode.FAILED);
    expect(requests).toHaveLength(1);
  });
});
