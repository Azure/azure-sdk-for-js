// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Resource } from "@opentelemetry/resources";
import fs from "fs";
import path from "path";
import * as os from "os";
import {
  ResourceMetrics,
  MeterProvider,
  PeriodicExportingMetricReaderOptions,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { resourceMetricsToEnvelope } from "../../src/utils/metricUtils";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { AzureMonitorMetricExporter } from "../../src/export/metric";
import { AzureMonitorExporterOptions } from "../../src/config";
import {
  TelemetryItem as Envelope,
  KnownContextTagKeys,
  RemoteDependencyData,
  RequestData,
} from "../../src/generated";
import assert from "assert";
import { BreezePerformanceCounterNames, OTelPerformanceCounterNames, Tags } from "../../src/types";
import { Context, getInstance } from "../../src/platform";

const context = getInstance();
const packageJsonPath = path.resolve(__dirname, "../../", "./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

let testMetrics: ResourceMetrics;
class TestExporter extends AzureMonitorMetricExporter {
  constructor(options: AzureMonitorExporterOptions = {}) {
    super(options);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async export(metrics: ResourceMetrics): Promise<void> {
    testMetrics = metrics;
    testMetrics.resource = new Resource({
      [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: "testServiceInstanceID",
      [SemanticResourceAttributes.SERVICE_NAME]: "testServiceName",
      [SemanticResourceAttributes.SERVICE_NAMESPACE]: "testServiceNamespace",
    });
  }
}

function assertEnvelope(
  envelope: Envelope,
  name: string,
  sampleRate: number,
  baseType: string,
  expectedTags: Tags,
  expectedBaseData: Partial<RequestData | RemoteDependencyData>,
  expectedTime?: Date,
): void {
  assert.strictEqual(Context.sdkVersion, packageJson.version);
  assert.ok(envelope);
  assert.strictEqual(envelope.name, name);
  assert.strictEqual(envelope.sampleRate, sampleRate);
  assert.deepStrictEqual(envelope.data?.baseType, baseType);

  assert.strictEqual(envelope.instrumentationKey, "ikey");
  assert.ok(envelope.time);
  assert.ok(envelope.version);
  assert.ok(envelope.data);

  if (expectedTime) {
    assert.deepStrictEqual(envelope.time, expectedTime);
  }

  const expectedServiceTags: Tags = {
    [KnownContextTagKeys.AiCloudRole]: "testServiceNamespace.testServiceName",
    [KnownContextTagKeys.AiCloudRoleInstance]: "testServiceInstanceID",
  };
  assert.deepStrictEqual(envelope.tags, {
    ...context.tags,
    ...expectedServiceTags,
    ...expectedTags,
  });
  assert.deepStrictEqual(envelope.data?.baseData?.metrics[0], expectedBaseData);
}

describe("metricUtil.ts", () => {
  const prefix = process.env["AZURE_MONITOR_PREFIX"] ? process.env["AZURE_MONITOR_PREFIX"] : "";
  const version = process.env["AZURE_MONITOR_DISTRO_VERSION"]
    ? `ext${process.env["AZURE_MONITOR_DISTRO_VERSION"]}`
    : `ext${Context.sdkVersion}`;
  describe("#resourceMetricsToEnvelope", () => {
    it("should create a metric envelope", async () => {
      const expectedTags: Tags = {
        "ai.device.osVersion": os && `${os.type()} ${os.release()}`,
        "ai.internal.sdkVersion": `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`,
      };
      const expectedBaseData: Partial<RequestData> = {
        name: "counter",
        value: 1,
        dataPointType: "Aggregation",
        count: 1,
      };
      const provider = new MeterProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
        }),
      });
      const exporter = new TestExporter({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      });
      const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
        exporter: exporter,
      };
      const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
      provider.addMetricReader(metricReader);
      const meter = provider.getMeter("example-meter-node");
      // Create Counter instrument with the meter
      const counter = meter.createCounter("counter");
      counter.add(1);
      provider.forceFlush();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const envelope = resourceMetricsToEnvelope(testMetrics, "ikey");
      assertEnvelope(
        envelope[0],
        "Microsoft.ApplicationInsights.Metric",
        100,
        "MetricData",
        expectedTags,
        expectedBaseData,
      );
    });
  });

  describe("#performanceMetricsToEnvelope", () => {
    it("should create private bytes envelopes with the correct name", async () => {
      const expectedTags: Tags = {
        "ai.device.osVersion": os && `${os.type()} ${os.release()}`,
        "ai.internal.sdkVersion": `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`,
      };
      const expectedBaseData = {
        name: BreezePerformanceCounterNames.PRIVATE_BYTES,
        value: 1,
        dataPointType: "Aggregation",
        count: 1,
      };
      const provider = new MeterProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
        }),
      });
      const exporter = new TestExporter({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      });
      const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
        exporter: exporter,
      };
      const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
      provider.addMetricReader(metricReader);
      const meter = provider.getMeter("example-meter-node");
      // Create Counter instrument with the meter
      const counter = meter.createCounter(OTelPerformanceCounterNames.PRIVATE_BYTES);
      counter.add(1);
      provider.forceFlush();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const envelope = resourceMetricsToEnvelope(testMetrics, "ikey");
      assertEnvelope(
        envelope[0],
        "Microsoft.ApplicationInsights.Metric",
        100,
        "MetricData",
        expectedTags,
        expectedBaseData,
      );
    });
    it("should create available bytes envelopes with the correct name", async () => {
      const expectedTags: Tags = {
        "ai.device.osVersion": os && `${os.type()} ${os.release()}`,
        "ai.internal.sdkVersion": `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`,
      };
      const expectedBaseData = {
        name: BreezePerformanceCounterNames.AVAILABLE_BYTES,
        value: 1,
        dataPointType: "Aggregation",
        count: 1,
      };
      const provider = new MeterProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
        }),
      });
      const exporter = new TestExporter({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      });
      const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
        exporter: exporter,
      };
      const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
      provider.addMetricReader(metricReader);
      const meter = provider.getMeter("example-meter-node");
      // Create Counter instrument with the meter
      const counter = meter.createCounter(OTelPerformanceCounterNames.AVAILABLE_BYTES);
      counter.add(1);
      provider.forceFlush();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const envelope = resourceMetricsToEnvelope(testMetrics, "ikey");
      assertEnvelope(
        envelope[0],
        "Microsoft.ApplicationInsights.Metric",
        100,
        "MetricData",
        expectedTags,
        expectedBaseData,
      );
    });
    it("should create processor time envelopes with the correct name", async () => {
      const expectedTags: Tags = {
        "ai.device.osVersion": os && `${os.type()} ${os.release()}`,
        "ai.internal.sdkVersion": `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`,
      };
      const expectedBaseData = {
        name: BreezePerformanceCounterNames.PROCESSOR_TIME,
        value: 1,
        dataPointType: "Aggregation",
        count: 1,
      };
      const provider = new MeterProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
        }),
      });
      const exporter = new TestExporter({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      });
      const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
        exporter: exporter,
      };
      const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
      provider.addMetricReader(metricReader);
      const meter = provider.getMeter("example-meter-node");
      // Create Counter instrument with the meter
      const counter = meter.createCounter(OTelPerformanceCounterNames.PROCESSOR_TIME);
      counter.add(1);
      provider.forceFlush();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const envelope = resourceMetricsToEnvelope(testMetrics, "ikey");
      assertEnvelope(
        envelope[0],
        "Microsoft.ApplicationInsights.Metric",
        100,
        "MetricData",
        expectedTags,
        expectedBaseData,
      );
    });
    it("should create process time envelopes with the correct name", async () => {
      const expectedTags: Tags = {
        "ai.device.osVersion": os && `${os.type()} ${os.release()}`,
        "ai.internal.sdkVersion": `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`,
      };
      const expectedBaseData = {
        name: BreezePerformanceCounterNames.PROCESS_TIME,
        value: 1,
        dataPointType: "Aggregation",
        count: 1,
      };
      const provider = new MeterProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
        }),
      });
      const exporter = new TestExporter({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      });
      const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
        exporter: exporter,
      };
      const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
      provider.addMetricReader(metricReader);
      const meter = provider.getMeter("example-meter-node");
      // Create Counter instrument with the meter
      const counter = meter.createCounter(OTelPerformanceCounterNames.PROCESS_TIME);
      counter.add(1);
      provider.forceFlush();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const envelope = resourceMetricsToEnvelope(testMetrics, "ikey");
      assertEnvelope(
        envelope[0],
        "Microsoft.ApplicationInsights.Metric",
        100,
        "MetricData",
        expectedTags,
        expectedBaseData,
      );
    });
    it("should create request rate envelopes with the correct name", async () => {
      const expectedTags: Tags = {
        "ai.device.osVersion": os && `${os.type()} ${os.release()}`,
        "ai.internal.sdkVersion": `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`,
      };
      const expectedBaseData = {
        name: BreezePerformanceCounterNames.REQUEST_RATE,
        value: 1,
        dataPointType: "Aggregation",
        count: 1,
      };
      const provider = new MeterProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
        }),
      });
      const exporter = new TestExporter({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      });
      const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
        exporter: exporter,
      };
      const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
      provider.addMetricReader(metricReader);
      const meter = provider.getMeter("example-meter-node");
      // Create Counter instrument with the meter
      const counter = meter.createCounter(OTelPerformanceCounterNames.REQUEST_RATE);
      counter.add(1);
      provider.forceFlush();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const envelope = resourceMetricsToEnvelope(testMetrics, "ikey");
      assertEnvelope(
        envelope[0],
        "Microsoft.ApplicationInsights.Metric",
        100,
        "MetricData",
        expectedTags,
        expectedBaseData,
      );
    });
    it("should create request duration envelopes with the correct name", async () => {
      const expectedTags: Tags = {
        "ai.device.osVersion": os && `${os.type()} ${os.release()}`,
        "ai.internal.sdkVersion": `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`,
      };
      const expectedBaseData = {
        name: BreezePerformanceCounterNames.REQUEST_DURATION,
        value: 1,
        dataPointType: "Aggregation",
        count: 1,
      };
      const provider = new MeterProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
        }),
      });
      const exporter = new TestExporter({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      });
      const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
        exporter: exporter,
      };
      const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
      provider.addMetricReader(metricReader);
      const meter = provider.getMeter("example-meter-node");
      // Create Counter instrument with the meter
      const counter = meter.createCounter(OTelPerformanceCounterNames.REQUEST_DURATION);
      counter.add(1);
      provider.forceFlush();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const envelope = resourceMetricsToEnvelope(testMetrics, "ikey");
      assertEnvelope(
        envelope[0],
        "Microsoft.ApplicationInsights.Metric",
        100,
        "MetricData",
        expectedTags,
        expectedBaseData,
      );
    });
  });
});
