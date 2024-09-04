// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import * as sinon from "sinon";
import { metrics, trace, Context, TracerProvider } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import {
  useAzureMonitor,
  AzureMonitorOpenTelemetryOptions,
  shutdownAzureMonitor,
} from "../../../src/index";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatEnvironmentConfig,
  StatsbeatFeature,
  StatsbeatInstrumentation,
  StatsbeatInstrumentationMap,
} from "../../../src/types";
import { getOsPrefix } from "../../../src/utils/common";
import { ReadableSpan, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import { LogRecordProcessor, LogRecord } from "@opentelemetry/sdk-logs";
import { getInstance } from "../../../src/utils/statsbeat";
import { Instrumentation, InstrumentationConfig } from "@opentelemetry/instrumentation";

const testInstrumentation: Instrumentation = {
  instrumentationName: "@opentelemetry/instrumentation-fs",
  instrumentationVersion: "1.0",
  disable: function (): void {
    throw new Error("Function not implemented.");
  },
  enable: function (): void {
    throw new Error("Function not implemented.");
  },
  setTracerProvider: function (_tracerProvider: TracerProvider): void {
    throw new Error("Function not implemented.");
  },
  setMeterProvider: function (_meterProvider: MeterProvider): void {
    throw new Error("Function not implemented.");
  },
  setConfig: function (_config: InstrumentationConfig): void {
    throw new Error("Function not implemented.");
  },
  getConfig: function (): InstrumentationConfig {
    throw new Error("Function not implemented.");
  },
};

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
    const config: AzureMonitorOpenTelemetryOptions = {
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
    const config: AzureMonitorOpenTelemetryOptions = {
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
    const config: AzureMonitorOpenTelemetryOptions = {
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
    const processor: SpanProcessor = {
      forceFlush: () => {
        return Promise.resolve();
      },
      onStart: (_span: Span) => {
        /* no-op */
      },
      onEnd: (_span: ReadableSpan) => {
        /* no-op */
      },
      shutdown: () => {
        return Promise.resolve();
      },
    };
    const spyOnStart = sandbox.spy(processor, "onStart");
    const spyOnEnd = sandbox.spy(processor, "onEnd");
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      spanProcessors: [processor],
    };
    useAzureMonitor(config);
    const span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();
    assert.ok(spyOnStart.called);
    assert.ok(spyOnEnd.called);
  });

  it("should add custom logProcessors", () => {
    const processor: LogRecordProcessor = {
      forceFlush: () => {
        return Promise.resolve();
      },
      onEmit(_logRecord: LogRecord, _context?: Context) {
        /* no-op */
      },
      shutdown: () => {
        return Promise.resolve();
      },
    };
    const spyonEmit = sandbox.spy(processor, "onEmit");
    const config: AzureMonitorOpenTelemetryOptions = {
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
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
        disableOfflineStorage: true,
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
    const output = JSON.parse(String(process.env["AZURE_MONITOR_STATSBEAT_FEATURES"]));
    const features = Number(output["feature"]);
    const instrumentations = Number(output["instrumentation"]);
    assert.ok(!(features & StatsbeatFeature.AAD_HANDLING), "AAD_HANDLING is set");
    assert.ok(!(features & StatsbeatFeature.DISK_RETRY), "DISK_RETRY is set");
    assert.ok(!(features & StatsbeatFeature.BROWSER_SDK_LOADER), "BROWSER_SDK_LOADER is set");
    assert.ok(features & StatsbeatFeature.DISTRO, "DISTRO is not set");
    assert.strictEqual(features, 8);
    assert.ok(
      instrumentations & StatsbeatInstrumentation.AZURE_CORE_TRACING,
      "AZURE_CORE_TRACING not set",
    );
    assert.ok(!(features & StatsbeatFeature.SHIM), "SHIM is set");
    assert.ok(instrumentations & StatsbeatInstrumentation.MONGODB, "MONGODB not set");
    assert.ok(instrumentations & StatsbeatInstrumentation.MYSQL, "MYSQL not set");
    assert.ok(instrumentations & StatsbeatInstrumentation.POSTGRES, "POSTGRES not set");
    assert.ok(instrumentations & StatsbeatInstrumentation.REDIS, "REDIS not set");
    assert.strictEqual(instrumentations, 31);
  });

  it("should set shim feature in statsbeat if env var is populated", () => {
    getInstance()["initializedByShim"] = true;
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    const output = JSON.parse(String(process.env["AZURE_MONITOR_STATSBEAT_FEATURES"]));
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
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    const output = JSON.parse(String(process.env["AZURE_MONITOR_STATSBEAT_FEATURES"]));
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
    const config: AzureMonitorOpenTelemetryOptions = {
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
    const config: AzureMonitorOpenTelemetryOptions = {
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
    const config: AzureMonitorOpenTelemetryOptions = {
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
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    const span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();

    // Need to access resource attributes of a span to verify the correct resource detectors are enabled.
    // The resource field of a span is a readonly IResource and does not have a getter for the underlying Resource.
    const resource = (span as any)["resource"]["_attributes"];
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
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    const span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();

    // Need to access resource attributes of a span to verify the correct resource detectors are enabled.
    // The resource field of a span is a readonly IResource and does not have a getter for the underlying Resource.
    const resource = (span as any)["resource"]["_attributes"];
    console.log(resource);
    Object.keys(resource).forEach((attr) => {
      const parts = attr.split(".");
      assert.ok(expectedResourceAttributeNamespaces.has(parts[0]));
    });
  });

  it("should not use process resource detector if OTEL_NODE_RESOURCE_DETECTORS not specified", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    const span = trace.getTracer("testTracer").startSpan("testSpan");
    span.end();

    // Need to access resource attributes of a span to verify the correct resource detectors are enabled.
    // The resource field of a span is a readonly IResource and does not have a getter for the underlying Resource.
    const resource = (span as any)["resource"]["_attributes"];
    console.log(resource);
    Object.keys(resource).forEach((attr) => {
      assert.ok(!attr.includes("process"));
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  it("should update statsbeat env var based on reading instrumentations array", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      instrumentationOptions: {
        azureSdk: { enabled: false },
        http: { enabled: false },
        mongoDb: { enabled: false },
        mySql: { enabled: false },
        postgreSql: { enabled: false },
        redis: { enabled: false },
        redis4: { enabled: false },
        bunyan: { enabled: false },
        winston: { enabled: false },
      },
    };
    useAzureMonitor(config);
    const emptyStatsbeatConfig: string = JSON.stringify({ instrumentation: 0, feature: 0 });

    const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
    );
    const instrumentations = [testInstrumentation];
    let updatedStatsbeat = { instrumentation: 0, feature: 0 };

    // Dynamic statsbeat update logic
    for (let i = 0; i < instrumentations.length; i++) {
      updatedStatsbeat = {
        instrumentation: (statsbeatOptions.instrumentation |=
          StatsbeatInstrumentationMap.get(instrumentations[i].instrumentationName) || 0),
        feature: statsbeatOptions.feature,
      };
    }
    assert.strictEqual(updatedStatsbeat.instrumentation, StatsbeatInstrumentation.FS);
  });
});
