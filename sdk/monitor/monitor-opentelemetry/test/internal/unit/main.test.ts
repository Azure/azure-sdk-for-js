// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import { metrics, trace, Context } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import {
  useAzureMonitor,
  AzureMonitorOpenTelemetryOptions,
  shutdownAzureMonitor,
} from "../../../src/index";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { StatsbeatFeature, StatsbeatInstrumentation } from "../../../src/types";
import { getOsPrefix } from "../../../src/utils/common";
import { ReadableSpan, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import { LogRecordProcessor, LogRecord } from "@opentelemetry/sdk-logs";
import { getInstance } from "../../../src/utils/statsbeat";

describe("Main functions", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let sandbox: sinon.SinonSandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    process.env = originalEnv;
    sandbox.restore();
  });

  after(() => {
    trace.disable();
    metrics.disable();
    logs.disable();
  });

  it("useAzureMonitor", () => {
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    assert.ok(metrics.getMeterProvider());
    assert.ok(trace.getTracerProvider());
    assert.ok(logs.getLoggerProvider());
  });

  it("should shutdown azureMonitor - sync", () => {
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    shutdownAzureMonitor();
    const meterProvider = metrics.getMeterProvider() as MeterProvider;
    assert.strictEqual(meterProvider["_shutdown"], true);
  });

  it("should shutdown azureMonitor - async", async () => {
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    await shutdownAzureMonitor();
    const meterProvider = metrics.getMeterProvider() as MeterProvider;
    assert.strictEqual(meterProvider["_shutdown"], true);
  });

  it("should add custom spanProcessors", () => {
    let processor: SpanProcessor = {
      forceFlush: () => {
        return Promise.resolve();
      },
      onStart: (span: Span) => {
        span = span;
      },
      onEnd: (span: ReadableSpan) => {
        span = span;
      },
      shutdown: () => {
        return Promise.resolve();
      },
    };
    const spyOnStart = sandbox.spy(processor, "onStart");
    const spyOnEnd = sandbox.spy(processor, "onEnd");
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      spanProcessors: [processor],
    };
    useAzureMonitor(config);
    let span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();
    assert.ok(spyOnStart.called);
    assert.ok(spyOnEnd.called);
  });

  it("should add custom logProcessors", () => {
    let processor: LogRecordProcessor = {
      forceFlush: () => {
        return Promise.resolve();
      },
      onEmit(logRecord: LogRecord, context?: Context) {
        logRecord = logRecord;
        context = context;
      },
      shutdown: () => {
        return Promise.resolve();
      },
    };
    const spyonEmit = sandbox.spy(processor, "onEmit");
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      logRecordProcessors: [processor],
    };
    useAzureMonitor(config);
    logs.getLogger("testLogger").emit({ body: "testLog" });
    assert.ok(spyonEmit.called);
  });

  it("should set statsbeat features", () => {
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      enableLiveMetrics: true,
      instrumentationOptions: {
        azureSdk: {
          enabled: true,
        },
        mongoDb: {
          enabled: true,
        },
        mySql: {
          enabled: true,
        },
        postgreSql: {
          enabled: true,
        },
        redis: {
          enabled: true,
        },
      },
    };
    useAzureMonitor(config);
    let output = JSON.parse(String(process.env["AZURE_MONITOR_STATSBEAT_FEATURES"]));
    const features = Number(output["feature"]);
    const instrumentations = Number(output["instrumentation"]);
    assert.ok(!(features & StatsbeatFeature.AAD_HANDLING), "AAD_HANDLING is set");
    assert.ok(!(features & StatsbeatFeature.DISK_RETRY), "DISK_RETRY is set");
    assert.ok(!(features & StatsbeatFeature.BROWSER_SDK_LOADER), "BROWSER_SDK_LOADER is set");
    assert.ok(features & StatsbeatFeature.DISTRO, "DISTRO is not set");
    assert.ok(
      instrumentations & StatsbeatInstrumentation.AZURE_CORE_TRACING,
      "AZURE_CORE_TRACING not set",
    );
    assert.ok(!(features & StatsbeatFeature.SHIM), "SHIM is set");
    assert.ok(instrumentations & StatsbeatInstrumentation.MONGODB, "MONGODB not set");
    assert.ok(instrumentations & StatsbeatInstrumentation.MYSQL, "MYSQL not set");
    assert.ok(instrumentations & StatsbeatInstrumentation.POSTGRES, "POSTGRES not set");
    assert.ok(instrumentations & StatsbeatInstrumentation.REDIS, "REDIS not set");
  });

  it("should set shim feature in statsbeat if env var is populated", () => {
    getInstance()["initializedByShim"] = true;
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    let output = JSON.parse(String(process.env["AZURE_MONITOR_STATSBEAT_FEATURES"]));
    const features = Number(output["feature"]);
    assert.ok(features & StatsbeatFeature.SHIM, `SHIM is not set ${features}`);
  });

  it("should use statsbeat features if already available", () => {
    const env = <{ [id: string]: string }>{};
    let current = 0;
    current |= StatsbeatFeature.AAD_HANDLING;
    current |= StatsbeatFeature.DISK_RETRY;
    current |= StatsbeatFeature.LIVE_METRICS;
    env.AZURE_MONITOR_STATSBEAT_FEATURES = current.toString();
    process.env = env;
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    let output = JSON.parse(String(process.env["AZURE_MONITOR_STATSBEAT_FEATURES"]));
    const numberOutput = Number(output["feature"]);
    assert.ok(numberOutput & StatsbeatFeature.AAD_HANDLING, "AAD_HANDLING not set");
    assert.ok(numberOutput & StatsbeatFeature.DISK_RETRY, "DISK_RETRY not set");
    assert.ok(numberOutput & StatsbeatFeature.DISTRO, "DISTRO not set");
    assert.ok(!(numberOutput & StatsbeatFeature.BROWSER_SDK_LOADER), "BROWSER_SDK_LOADER is set");
    assert.ok(numberOutput & StatsbeatFeature.LIVE_METRICS, "LIVE_METRICS is not set");
  });

  it("should capture the app service SDK prefix correctly", () => {
    const os = getOsPrefix();
    const env = <{ [id: string]: string }>{};
    env.WEBSITE_SITE_NAME = "test-azure-app-service";
    process.env = env;
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    assert.strictEqual(process.env["AZURE_MONITOR_PREFIX"], `a${os}m_`);
  });

  it("should capture the azure function SDK prefix correctly", () => {
    const os = getOsPrefix();
    const env = <{ [id: string]: string }>{};
    env.FUNCTIONS_WORKER_RUNTIME = "test-azure-functions";
    process.env = env;
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    assert.strictEqual(process.env["AZURE_MONITOR_PREFIX"], `f${os}m_`);
  });

  it("should capture the AKS SDK prefix correctly", () => {
    const os = getOsPrefix();
    const env = <{ [id: string]: string }>{};
    env.AKS_ARM_NAMESPACE_ID = "test-AKS";
    process.env = env;
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    assert.strictEqual(process.env["AZURE_MONITOR_PREFIX"], `k${os}m_`);
  });

  it("should prioritize resource detectors in env var OTEL_NODE_RESOURCE_DETECTORS", () => {
    const expectedResourceAttributeNamespaces = new Set(["os", "service", "telemetry"]);
    const env = <{ [id: string]: string }>{};
    env.OTEL_NODE_RESOURCE_DETECTORS = "os";
    process.env = env;
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    let span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();
    //@ts-ignore
    const resource = span["resource"]["_attributes"];
    console.log(resource);
    Object.keys(resource).forEach((attr) => {
      const parts = attr.split(".");
      assert.ok(expectedResourceAttributeNamespaces.has(parts[0]));
    });
  });

  it("should skip unknown resource detectors", () => {
    const expectedResourceAttributeNamespaces = new Set(["host", "service", "telemetry"]);
    const env = <{ [id: string]: string }>{};
    env.OTEL_NODE_RESOURCE_DETECTORS = "blah,host";
    process.env = env;
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    let span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();

    //@ts-ignore
    const resource = span["resource"]["_attributes"];
    console.log(resource);
    Object.keys(resource).forEach((attr) => {
      const parts = attr.split(".");
      assert.ok(expectedResourceAttributeNamespaces.has(parts[0]));
    });
  });

  it("should not use process resource detector if OTEL_NODE_RESOURCE_DETECTORS not specified", () => {
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    let span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();

    //@ts-ignore
    const resource = span["resource"]["_attributes"];
    console.log(resource);
    Object.keys(resource).forEach((attr) => {
      assert.ok(!attr.includes("process"));
    });
  });
});
