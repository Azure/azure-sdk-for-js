// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApplicationInsightsSampler,
  AzureMonitorLogExporter,
  AzureMonitorMetricExporter,
  AzureMonitorTraceExporter,
} from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { diag, DiagConsoleLogger, DiagLogLevel, metrics } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { Resource } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { BatchSpanProcessor, NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleDistributedTracing", async () => {
    // Create an exporter instance
    const exporter = new AzureMonitorTraceExporter({
      connectionString: "<connection string>",
    });
    // @ts-preserve-whitespace
    // Create and configure the Node Tracer provider
    const tracerProvider = new NodeTracerProvider({
      resource: new Resource({
        [ATTR_SERVICE_NAME]: "basic-service",
      }),
      spanProcessors: [
        new BatchSpanProcessor(exporter, {
          exportTimeoutMillis: 15000,
          maxQueueSize: 1000,
        }),
      ],
    });
    // @ts-preserve-whitespace
    // Register Tracer Provider as global
    tracerProvider.register();
  });

  it("ReadmeSampleMetrics", async () => {
    // Add the exporter into the MetricReader and register it with the MeterProvider
    const exporter = new AzureMonitorMetricExporter({
      connectionString: "<connection string>",
    });
    // @ts-preserve-whitespace
    const metricReaderOptions = {
      exporter: exporter,
    };
    const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    const meterProvider = new MeterProvider({
      readers: [metricReader],
    });
    // @ts-preserve-whitespace
    // Register Meter Provider as global
    metrics.setGlobalMeterProvider(meterProvider);
  });

  it("ReadmeSampleLogs", async () => {
    // Add the Log exporter into the logRecordProcessor and register it with the LoggerProvider
    const exporter = new AzureMonitorLogExporter({
      connectionString: "<connection string>",
    });
    // @ts-preserve-whitespace
    const logRecordProcessor = new BatchLogRecordProcessor(exporter);
    const loggerProvider = new LoggerProvider();
    loggerProvider.addLogRecordProcessor(logRecordProcessor);
    // @ts-preserve-whitespace
    // Register logger Provider as global
    logs.setGlobalLoggerProvider(loggerProvider);
  });

  it("ReadmeSampleSampling", async () => {
    // Sampler expects a sample rate of between 0 and 1 inclusive
    // A rate of 0.75 means approximately 75 % of your traces will be sent
    const aiSampler = new ApplicationInsightsSampler(0.75);
    const provider = new NodeTracerProvider({
      sampler: aiSampler,
      resource: new Resource({
        [ATTR_SERVICE_NAME]: "basic-service",
      }),
    });
    // @ts-preserve-whitespace
    provider.register();
  });

  it("EnableDebugLogging", async () => {
    const provider = new NodeTracerProvider();
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
    provider.register();
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
