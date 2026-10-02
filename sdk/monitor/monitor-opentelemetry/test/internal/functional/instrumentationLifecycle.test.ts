// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequire } from "node:module";
import { once } from "node:events";
import { Writable } from "node:stream";
import type * as Http from "node:http";
import type { AddressInfo } from "node:net";
import type * as Bunyan from "bunyan";
import type * as Winston from "winston";
import { createTracingClient, useInstrumenter } from "@azure/core-tracing";
import type * as CoreTracing from "@azure/core-tracing";
import { createOpenTelemetryInstrumenter } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { ExportResultCode } from "@opentelemetry/core";
import {
  AzureMonitorLogExporter,
  AzureMonitorMetricExporter,
  AzureMonitorTraceExporter,
} from "@azure/monitor-opentelemetry-exporter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { _getSdkInstance, shutdownAzureMonitor, useAzureMonitor } from "../../../src/index.js";
import type { NodeSDK } from "@opentelemetry/sdk-node";
import type { AzureMonitorOpenTelemetryOptions } from "../../../src/index.js";
import { TraceHandler } from "../../../src/traces/handler.js";
import { LogHandler } from "../../../src/logs/handler.js";

const esmRequire = createRequire(import.meta.url);

describe("instrumentation lifecycle", () => {
  const sdks: NodeSDK[] = [];
  const options: AzureMonitorOpenTelemetryOptions = {
    azureMonitorExporterOptions: {
      connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      disableOfflineStorage: true,
    },
    samplingRatio: 1,
    tracesPerSecond: 0,
    enableLiveMetrics: false,
    enableStandardMetrics: false,
    enablePerformanceCounters: false,
    instrumentationOptions: {
      azureSdk: { enabled: false },
      bunyan: { enabled: false },
      winston: { enabled: false },
      console: { enabled: false },
      http: { enabled: false },
      mongoDb: { enabled: false },
      mySql: { enabled: false },
      postgreSql: { enabled: false },
      redis: { enabled: false },
      redis4: { enabled: false },
    },
  };

  beforeEach(() => {
    vi.stubEnv("APPLICATION_INSIGHTS_NO_STATSBEAT", "true");
    vi.stubEnv("APPLICATIONINSIGHTS_SDKSTATS_DISABLED", "true");
    vi.stubEnv("OTEL_NODE_RESOURCE_DETECTORS", "none");
    vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "INFO");
    vi.stubEnv("APPLICATIONINSIGHTS_CONFIGURATION_CONTENT", "{}");
    vi.spyOn(AzureMonitorTraceExporter.prototype, "export").mockImplementation((_, callback) => {
      callback({ code: ExportResultCode.SUCCESS });
      return Promise.resolve();
    });
    vi.spyOn(AzureMonitorLogExporter.prototype, "export").mockImplementation((_, callback) => {
      callback({ code: ExportResultCode.SUCCESS });
      return Promise.resolve();
    });
    vi.spyOn(AzureMonitorMetricExporter.prototype, "export").mockImplementation((_, callback) => {
      callback({ code: ExportResultCode.SUCCESS });
      return Promise.resolve();
    });
  });

  afterEach(async () => {
    await shutdownAzureMonitor();
    await Promise.all(sdks.splice(0).map((sdk) => sdk.shutdown()));
    trace.disable();
    logs.disable();
    metrics.disable();
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it.each([true, false])(
    "respects enabled -> disabled -> enabled with explicit shutdown: %s",
    async (shutdown) => {
      const history: {
        spans: string[];
        records: unknown[];
        spanCount: number;
        logCount: number;
      }[] = [];
      for (const enabled of [false, true, true, false, false, true]) {
        const spans: string[] = [];
        const records: unknown[] = [];
        useAzureMonitor({
          ...options,
          instrumentationOptions: {
            ...options.instrumentationOptions,
            azureSdk: { enabled },
            console: { enabled },
          },
          spanProcessors: [
            {
              onStart: () => {},
              onEnd: (span) => {
                spans.push(span.name);
              },
              forceFlush: async () => {},
              shutdown: async () => {},
            },
          ],
          logRecordProcessors: [
            {
              onEmit: (record) => {
                records.push(record.body);
              },
              forceFlush: async () => {},
              shutdown: async () => {},
            },
          ],
        });
        if (!shutdown) {
          const sdk = _getSdkInstance();
          if (sdk) {
            sdks.push(sdk);
          }
        }

        try {
          console.info("console-lifecycle");
          createTracingClient({ namespace: "Lifecycle", packageName: "lifecycle" })
            .startSpan("azure-lifecycle")
            .span.end();
          const coreTracing = esmRequire("@azure/core-tracing") as typeof CoreTracing;
          coreTracing
            .createTracingClient({ namespace: "Lifecycle", packageName: "lifecycle" })
            .startSpan("azure-cjs-lifecycle")
            .span.end();
          trace.getTracer("lifecycle").startSpan("manual-span").end();
          logs.getLogger("lifecycle").emit({ body: "manual-log" });

          expect
            .soft(spans.sort())
            .toEqual(
              enabled ? ["azure-cjs-lifecycle", "azure-lifecycle", "manual-span"] : ["manual-span"],
            );
          expect
            .soft(records.sort())
            .toEqual(enabled ? ["console-lifecycle", "manual-log"] : ["manual-log"]);
          for (const previous of history) {
            expect(previous.spans).toHaveLength(previous.spanCount);
            expect(previous.records).toHaveLength(previous.logCount);
          }
          history.push({ spans, records, spanCount: spans.length, logCount: records.length });
        } finally {
          if (shutdown) {
            await shutdownAzureMonitor();
          }
        }
      }
    },
  );

  it.each([true, false])(
    "collects real Bunyan and Winston records across enabled -> disabled -> enabled with explicit shutdown: %s",
    async (shutdown) => {
      const history: { records: unknown[]; expected: string[] }[] = [];
      for (const [phase, enabled] of [true, false, true].entries()) {
        const records: unknown[] = [];
        const bunyanMessage = `bunyan-lifecycle-${phase}`;
        const winstonMessage = `winston-lifecycle-${phase}`;
        const manualMessage = `manual-lifecycle-${phase}`;
        const expected = enabled ? [bunyanMessage, manualMessage, winstonMessage] : [manualMessage];
        useAzureMonitor({
          ...options,
          instrumentationOptions: {
            ...options.instrumentationOptions,
            bunyan: { enabled },
            winston: { enabled },
          },
          logRecordProcessors: [
            {
              onEmit: (record) => {
                records.push(record.body);
              },
              forceFlush: async () => {},
              shutdown: async () => {},
            },
          ],
        });
        if (!shutdown) {
          const sdk = _getSdkInstance();
          if (sdk) {
            sdks.push(sdk);
          }
        }

        // Load after SDK initialization so the real module hooks can patch the loggers.
        const bunyan = esmRequire("bunyan") as typeof Bunyan;
        const winston = esmRequire("winston") as typeof Winston;
        const sink = new Writable({
          write(_chunk, _encoding, callback) {
            callback();
          },
        });
        const bunyanLogger = bunyan.createLogger({
          name: "lifecycle",
          streams: [{ stream: sink }],
        });
        const winstonLogger = winston.createLogger({
          transports: [new winston.transports.Stream({ stream: sink })],
        });
        try {
          bunyanLogger.info(bunyanMessage);
          winstonLogger.info(winstonMessage);
          logs.getLogger("lifecycle").emit({ body: manualMessage });
          const finished = once(winstonLogger, "finish");
          winstonLogger.end();
          await finished;

          expect(records.slice().sort()).toEqual(expected);
          for (const previous of history) {
            expect(previous.records.slice().sort()).toEqual(previous.expected);
          }
          history.push({ records, expected });
        } finally {
          winstonLogger.close();
          sink.destroy();
          if (shutdown) {
            await shutdownAzureMonitor();
          }
        }
      }
    },
  );

  it.each([true, false])(
    "disables and reuses all module instrumentations with explicit shutdown: %s",
    async (shutdown) => {
      const traces = vi.spyOn(TraceHandler.prototype, "getInstrumentations");
      const logInstrumentations = vi.spyOn(LogHandler.prototype, "getInstrumentations");
      const enabledOptions: AzureMonitorOpenTelemetryOptions = {
        ...options,
        instrumentationOptions: {
          ...options.instrumentationOptions,
          http: { enabled: true },
          azureSdk: { enabled: true },
          mongoDb: { enabled: true },
          mySql: { enabled: true },
          postgreSql: { enabled: true },
          redis: { enabled: true },
          bunyan: { enabled: true },
          winston: { enabled: true },
        },
      };
      const registeredInstrumentations = (): ReturnType<TraceHandler["getInstrumentations"]> => {
        const traceResult = traces.mock.results.at(-1);
        const logResult = logInstrumentations.mock.results.at(-1);
        if (traceResult?.type !== "return" || logResult?.type !== "return") {
          throw new Error("Expected both handlers to return their instrumentations");
        }
        return traceResult.value.concat(logResult.value);
      };
      useAzureMonitor(enabledOptions);
      const initial = registeredInstrumentations();
      expect(initial.map((instrumentation) => instrumentation.instrumentationName)).toEqual([
        "@opentelemetry/instrumentation-http",
        "@azure/opentelemetry-instrumentation-azure-sdk",
        "@opentelemetry/instrumentation-mongodb",
        "@opentelemetry/instrumentation-mysql",
        "@opentelemetry/instrumentation-pg",
        "@opentelemetry/instrumentation-redis",
        "@opentelemetry/instrumentation-bunyan",
        "@opentelemetry/instrumentation-winston",
      ]);
      const disableSpies = initial.map((instrumentation) => vi.spyOn(instrumentation, "disable"));
      const enableSpies = initial.map((instrumentation) => vi.spyOn(instrumentation, "enable"));
      const tracerSpies = initial.map((instrumentation) =>
        vi.spyOn(instrumentation, "setTracerProvider"),
      );
      const meterSpies = initial.map((instrumentation) =>
        vi.spyOn(instrumentation, "setMeterProvider"),
      );
      const loggerSpies = initial.map((instrumentation) =>
        instrumentation.setLoggerProvider
          ? vi.spyOn(instrumentation, "setLoggerProvider")
          : undefined,
      );
      if (shutdown) {
        await shutdownAzureMonitor();
      } else {
        const sdk = _getSdkInstance();
        if (sdk) {
          sdks.push(sdk);
        }
      }
      useAzureMonitor(options);
      expect(registeredInstrumentations()).toEqual([]);
      for (const disable of disableSpies) {
        expect(disable).toHaveBeenCalledOnce();
      }
      for (const enable of enableSpies) {
        expect(enable).not.toHaveBeenCalled();
      }
      await shutdownAzureMonitor();
      useAzureMonitor(enabledOptions);
      const reenabled = registeredInstrumentations();
      expect(reenabled).toHaveLength(initial.length);
      for (let index = 0; index < initial.length; index++) {
        expect(reenabled[index]).toBe(initial[index]);
        expect(enableSpies[index]).toHaveBeenCalledOnce();
        expect(tracerSpies[index]).toHaveBeenCalledOnce();
        expect(meterSpies[index]).toHaveBeenCalled();
        expect(meterSpies[index].mock.calls.at(-1)?.[0]).toBe(metrics.getMeterProvider());
        expect(tracerSpies[index].mock.invocationCallOrder[0]).toBeLessThan(
          enableSpies[index].mock.invocationCallOrder[0],
        );
        expect(meterSpies[index].mock.invocationCallOrder[0]).toBeLessThan(
          enableSpies[index].mock.invocationCallOrder[0],
        );
        const loggerSpy = loggerSpies[index];
        if (loggerSpy) {
          expect(loggerSpy).toHaveBeenCalledOnce();
          expect(loggerSpy.mock.invocationCallOrder[0]).toBeLessThan(
            enableSpies[index].mock.invocationCallOrder[0],
          );
        }
      }
      await shutdownAzureMonitor();
      for (const disable of disableSpies) {
        expect(disable).toHaveBeenCalledTimes(2);
      }
    },
  );

  it("does not disable independently registered instrumentation", async () => {
    const customer = new HttpInstrumentation({ enabled: false });
    customer.enable();
    const disable = vi.spyOn(customer, "disable");
    try {
      useAzureMonitor(options);
      await shutdownAzureMonitor();
      useAzureMonitor(options);
      await shutdownAzureMonitor();
      expect(disable).not.toHaveBeenCalled();
      expect(customer.isEnabled()).toBe(true);
    } finally {
      customer.disable();
    }
  });

  it.each([
    ["http", "@opentelemetry/instrumentation-http"],
    ["azureSdk", "@azure/opentelemetry-instrumentation-azure-sdk"],
    ["mongoDb", "@opentelemetry/instrumentation-mongodb"],
    ["mySql", "@opentelemetry/instrumentation-mysql"],
    ["postgreSql", "@opentelemetry/instrumentation-pg"],
    ["redis", "@opentelemetry/instrumentation-redis"],
    ["bunyan", "@opentelemetry/instrumentation-bunyan"],
    ["winston", "@opentelemetry/instrumentation-winston"],
    ["console", "@opentelemetry/instrumentation-console"],
  ] as const)("toggles %s independently without enabling other integrations", async (key, name) => {
    const traces = vi.spyOn(TraceHandler.prototype, "getInstrumentations");
    const logInstrumentations = vi.spyOn(LogHandler.prototype, "getInstrumentations");
    for (const enabled of [false, true, false, true]) {
      useAzureMonitor({
        ...options,
        instrumentationOptions: { ...options.instrumentationOptions, [key]: { enabled } },
      });
      const traceResult = traces.mock.results.at(-1);
      const logResult = logInstrumentations.mock.results.at(-1);
      if (traceResult?.type !== "return" || logResult?.type !== "return") {
        throw new Error("Expected instrumentation results");
      }
      expect(
        traceResult.value.concat(logResult.value).map((item) => item.instrumentationName),
      ).toEqual(enabled ? [name] : []);
      await shutdownAzureMonitor();
    }
  });

  it("finishing an old shutdown does not disable a replacement SDK", async () => {
    let finishShutdown: () => void = () => {
      throw new Error("Shutdown was not started");
    };
    useAzureMonitor({
      ...options,
      instrumentationOptions: { ...options.instrumentationOptions, azureSdk: { enabled: true } },
      spanProcessors: [
        {
          onStart: () => {},
          onEnd: () => {},
          forceFlush: async () => {},
          shutdown: () =>
            new Promise<void>((resolve) => {
              finishShutdown = resolve;
            }),
        },
      ],
    });
    const shutdown = shutdownAzureMonitor();
    const spans: string[] = [];
    try {
      useAzureMonitor({
        ...options,
        instrumentationOptions: { ...options.instrumentationOptions, azureSdk: { enabled: true } },
        spanProcessors: [
          {
            onStart: () => {},
            onEnd: (span) => {
              spans.push(span.name);
            },
            forceFlush: async () => {},
            shutdown: async () => {},
          },
        ],
      });
    } finally {
      finishShutdown();
      await shutdown;
    }
    createTracingClient({ namespace: "Lifecycle", packageName: "lifecycle" })
      .startSpan("replacement")
      .span.end();
    expect(spans).toEqual(["replacement"]);
  });

  it.each(["redis", "redis4"] as const)(
    "supports %s alone and disables the shared Redis instance",
    async (key) => {
      const traces = vi.spyOn(TraceHandler.prototype, "getInstrumentations");
      const config = {
        ...options,
        instrumentationOptions: { ...options.instrumentationOptions, [key]: { enabled: true } },
      };
      useAzureMonitor(config);
      const first = traces.mock.results.at(-1);
      if (first?.type !== "return") throw new Error("Expected trace instrumentation");
      expect(first.value.map((instrumentation) => instrumentation.instrumentationName)).toEqual([
        "@opentelemetry/instrumentation-redis",
      ]);
      const disable = vi.spyOn(first.value[0], "disable");
      await shutdownAzureMonitor();
      await shutdownAzureMonitor();
      expect(disable).toHaveBeenCalledOnce();
      useAzureMonitor(options);
      expect(traces.mock.results.at(-1)?.value).toEqual([]);
      await shutdownAzureMonitor();
      useAzureMonitor(config);
      const reenabled = traces.mock.results.at(-1);
      if (reenabled?.type !== "return") throw new Error("Expected trace instrumentation");
      expect(reenabled.value[0]).toBe(first.value[0]);
    },
  );

  it("honors logging NONE and replaces severity configuration on cached log instrumentations", async () => {
    const logInstrumentations = vi.spyOn(LogHandler.prototype, "getInstrumentations");
    const config = {
      ...options,
      instrumentationOptions: {
        ...options.instrumentationOptions,
        bunyan: { enabled: true },
        winston: { enabled: true },
        console: { enabled: true },
      },
    };
    useAzureMonitor(config);
    const first = logInstrumentations.mock.results.at(-1);
    if (first?.type !== "return") throw new Error("Expected log instrumentations");
    expect(first.value).toHaveLength(3);
    for (const instrumentation of first.value) {
      expect(instrumentation.getConfig()).toMatchObject({ logSeverity: SeverityNumber.INFO });
    }
    await shutdownAzureMonitor();
    vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "NONE");
    useAzureMonitor(config);
    expect(logInstrumentations.mock.results.at(-1)?.value).toEqual([]);
    await shutdownAzureMonitor();
    vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "ERROR");
    useAzureMonitor(config);
    const next = logInstrumentations.mock.results.at(-1);
    if (next?.type !== "return") throw new Error("Expected log instrumentations");
    expect(next.value).toHaveLength(3);
    expect(next.value[0]).toBe(first.value[0]);
    expect(next.value[1]).toBe(first.value[1]);
    expect(next.value[2]).not.toBe(first.value[2]);
    for (const instrumentation of next.value) {
      expect(instrumentation.getConfig()).toMatchObject({ logSeverity: SeverityNumber.ERROR });
    }
  });

  it("collects real HTTP requests exactly once across toggles and configuration changes", async () => {
    const history: ReadableSpan[][] = [];
    const createOptions = (enabled: boolean, ignore = false): AzureMonitorOpenTelemetryOptions => {
      const spans: ReadableSpan[] = [];
      history.push(spans);
      return {
        ...options,
        instrumentationOptions: {
          ...options.instrumentationOptions,
          http: {
            enabled,
            ...(ignore
              ? {
                  ignoreIncomingRequestHook: () => true,
                  ignoreOutgoingRequestHook: () => true,
                }
              : {}),
          },
        },
        spanProcessors: [
          {
            onStart: () => {},
            onEnd: (span) => {
              spans.push(span);
            },
            forceFlush: async () => {},
            shutdown: async () => {},
          },
        ],
      };
    };
    useAzureMonitor(createOptions(true));
    const http = esmRequire("node:http") as typeof Http;
    const server = http.createServer((_request, response) => response.end("ok"));
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address() as AddressInfo;
    const request = (): Promise<void> =>
      new Promise((resolve, reject) => {
        http
          .get(`http://127.0.0.1:${address.port}/lifecycle`, (response) => {
            response.resume();
            response.on("end", resolve);
            response.on("error", reject);
          })
          .on("error", reject);
      });
    try {
      await request();
      expect(history[0]).toHaveLength(2);
      for (const [enabled, ignore, count] of [
        [false, false, 0],
        [true, true, 0],
        [true, false, 2],
        [false, false, 0],
        [true, false, 2],
      ] as const) {
        await shutdownAzureMonitor();
        useAzureMonitor(createOptions(enabled, ignore));
        const before = history.slice(0, -1).map((spans) => spans.length);
        await request();
        expect(history.at(-1)).toHaveLength(count);
        expect(history.slice(0, -1).map((spans) => spans.length)).toEqual(before);
      }
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("preserves a customer instrumenter during shutdown and disabled initialization", async () => {
    useAzureMonitor({
      ...options,
      instrumentationOptions: { ...options.instrumentationOptions, azureSdk: { enabled: true } },
    });
    const customerInstrumenter = createOpenTelemetryInstrumenter();
    const startSpan = vi.spyOn(customerInstrumenter, "startSpan");
    useInstrumenter(customerInstrumenter);
    await shutdownAzureMonitor();
    useAzureMonitor(options);
    createTracingClient({ namespace: "Customer", packageName: "customer" })
      .startSpan("customer-span")
      .span.end();
    expect(startSpan).toHaveBeenCalledOnce();
  });
});
