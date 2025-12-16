// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MetricHandler } from "../../../../src/metrics/index.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import { Logger } from "../../../../src/shared/logging/index.js";
import { ExportResultCode } from "@opentelemetry/core";
import { metrics as MetricsApi } from "@opentelemetry/api";
import { AggregationType, InstrumentType, MeterProvider } from "@opentelemetry/sdk-metrics";
import type { MockInstance } from "vitest";
import { assert, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("MetricHandler", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let handler: MetricHandler;
  let exportStub: MockInstance<(typeof handler)["_azureExporter"]["export"]>;
  const config = new InternalConfig();
  if (config.azureMonitorExporterOptions) {
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
  }

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    process.env = originalEnv;
    if (handler) {
      handler.shutdown();
    }
    MetricsApi.disable();
    vi.restoreAllMocks();
  });

  function createHandler(): void {
    handler = new MetricHandler(config);
    exportStub = vi.spyOn(handler["_azureExporter"], "export").mockImplementation(
      (result: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(result);
        }),
    );
    const meterProvider = new MeterProvider({
      views: handler.getViews(),
      readers: [handler.getMetricReader()],
    });
    MetricsApi.setGlobalMeterProvider(meterProvider);
  }

  it("should observe instruments during collection", async () => {
    // Set a short export interval for this test before creating the handler
    process.env.OTEL_METRIC_EXPORT_INTERVAL = "200";

    // Create a new config to pick up the environment variable
    const testConfig = new InternalConfig();
    if (testConfig.azureMonitorExporterOptions) {
      testConfig.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
    }

    // Create handler with the test config
    handler = new MetricHandler(testConfig);
    exportStub = vi.spyOn(handler["_azureExporter"], "export").mockImplementation(
      (result: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(result);
        }),
    );
    const meterProvider = new MeterProvider({
      views: handler.getViews(),
      readers: [handler.getMetricReader()],
    });
    MetricsApi.setGlobalMeterProvider(meterProvider);

    const counter = MetricsApi.getMeter("testMeter").createCounter("testCounter", {
      description: "testDescription",
    });
    counter.add(2);
    await new Promise((resolve) => setTimeout(resolve, 220));
    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 1, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "testCounter");
    assert.strictEqual(metrics[0].descriptor.description, "testDescription");
    // Clean up environment variable
    delete process.env.OTEL_METRIC_EXPORT_INTERVAL;
  });

  it("should add views", () => {
    config.instrumentationOptions = {
      azureSdk: { enabled: true },
      http: { enabled: true },
      mySql: { enabled: true },
      postgreSql: { enabled: true },
      redis4: { enabled: true },
      redis: { enabled: true },
    };
    createHandler();
    const meterProvider = MetricsApi.getMeterProvider() as MeterProvider;
    assert.strictEqual(meterProvider["_sharedState"]["viewRegistry"]["_registeredViews"].length, 5); // redis4 is now supported via redis
  });

  describe("OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION", () => {
    it("uses exponential histogram aggregation when env is set", () => {
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION:
          "base2_exponential_bucket_histogram",
      } as NodeJS.ProcessEnv;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.HISTOGRAM);

      assert.strictEqual(
        aggregation.type,
        AggregationType.EXPONENTIAL_HISTOGRAM,
        "Should select exponential histogram aggregation",
      );
    });

    it("uses explicit bucket histogram aggregation when env is set", () => {
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION: "explicit_bucket_histogram",
      } as NodeJS.ProcessEnv;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.HISTOGRAM);

      assert.strictEqual(
        aggregation.type,
        AggregationType.EXPLICIT_BUCKET_HISTOGRAM,
        "Should select explicit bucket histogram aggregation",
      );
    });

    it("falls back to default aggregation on invalid value", () => {
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION: "invalid",
      } as NodeJS.ProcessEnv;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.HISTOGRAM);

      assert.strictEqual(
        aggregation.type,
        AggregationType.DEFAULT,
        "Should fall back to default aggregation for invalid values",
      );
    });

    it("uses default aggregation when env is not set", () => {
      // Ensure the env var is not set
      delete process.env.OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.HISTOGRAM);

      assert.strictEqual(
        aggregation.type,
        AggregationType.DEFAULT,
        "Should use default aggregation when environment variable is not set",
      );
    });

    it("uses default aggregation when env is empty string", () => {
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION: "",
      } as NodeJS.ProcessEnv;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.HISTOGRAM);

      assert.strictEqual(
        aggregation.type,
        AggregationType.DEFAULT,
        "Should use default aggregation when environment variable is empty",
      );
    });

    it("handles case-insensitive values", () => {
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION:
          "BASE2_EXPONENTIAL_BUCKET_HISTOGRAM",
      } as NodeJS.ProcessEnv;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.HISTOGRAM);

      assert.strictEqual(
        aggregation.type,
        AggregationType.EXPONENTIAL_HISTOGRAM,
        "Should handle uppercase values",
      );
    });

    it("handles values with whitespace", () => {
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION: "  explicit_bucket_histogram  ",
      } as NodeJS.ProcessEnv;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.HISTOGRAM);

      assert.strictEqual(
        aggregation.type,
        AggregationType.EXPLICIT_BUCKET_HISTOGRAM,
        "Should trim whitespace from values",
      );
    });

    it("logs warning for invalid values", () => {
      const warnSpy = vi.spyOn(Logger.getInstance(), "warn");
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION: "invalid_value",
      } as NodeJS.ProcessEnv;
      createHandler();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("unsupported value 'invalid_value'"),
      );
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("explicit_bucket_histogram"));
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("base2_exponential_bucket_histogram"),
      );
    });

    it("uses default aggregation for non-histogram instrument types", () => {
      process.env = {
        ...process.env,
        OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION:
          "base2_exponential_bucket_histogram",
      } as NodeJS.ProcessEnv;
      createHandler();

      const aggregation = handler.getMetricReader().selectAggregation(InstrumentType.COUNTER);

      assert.strictEqual(
        aggregation.type,
        AggregationType.DEFAULT,
        "Should use default aggregation for non-histogram instruments",
      );
    });
  });

  describe("#autoCollect", () => {
    it("standard metrics enablement during start", () => {
      const env = <{ [id: string]: string }>{};
      process.env = env;
      process.env.APPLICATION_INSIGHTS_NO_STANDARD_METRICS = undefined;
      createHandler();
      assert.isDefined(handler["_standardMetrics"], "Standard metrics not loaded");
    });

    it("standard metrics disabled if env var present", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATION_INSIGHTS_NO_STANDARD_METRICS"] = "true";
      process.env = env;
      createHandler();
      assert.isUndefined(handler["_standardMetrics"], "Standard metrics loaded");
    });
  });

  describe("OTEL_METRIC_EXPORT_INTERVAL environment variable", () => {
    it("should use OTEL_METRIC_EXPORT_INTERVAL when set to valid value", () => {
      // Set the environment variable to a valid interval
      process.env.OTEL_METRIC_EXPORT_INTERVAL = "5000";

      // Create a fresh config that will read the updated environment variable
      const freshConfig = new InternalConfig();
      if (freshConfig.azureMonitorExporterOptions) {
        freshConfig.azureMonitorExporterOptions.connectionString =
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      }

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // Access the private _exportInterval property to verify it was set correctly
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        5000,
        "Export interval should be set from environment variable",
      );

      void metricHandler.shutdown();
    });

    it("should ignore OTEL_METRIC_EXPORT_INTERVAL when set to invalid value and use default", () => {
      // Set the environment variable to an invalid value
      process.env.OTEL_METRIC_EXPORT_INTERVAL = "invalid";
      const freshConfig = new InternalConfig({
        azureMonitorExporterOptions: {
          connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
        },
      });

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // Should use default interval when env var is invalid
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        60000,
        "Export interval should use default when env var is invalid",
      );

      void metricHandler.shutdown();
    });

    it("should ignore OTEL_METRIC_EXPORT_INTERVAL when set to negative value and use default", () => {
      // Set the environment variable to a negative value
      process.env.OTEL_METRIC_EXPORT_INTERVAL = "-1000";
      const freshConfig = new InternalConfig({
        azureMonitorExporterOptions: {
          connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
        },
      });

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // Should use default since negative values are invalid
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        60000,
        "Export interval should use default when env var is negative",
      );

      void metricHandler.shutdown();
    });

    it("should ignore OTEL_METRIC_EXPORT_INTERVAL when set to zero and use default", () => {
      // Set the environment variable to zero
      process.env.OTEL_METRIC_EXPORT_INTERVAL = "0";
      const freshConfig = new InternalConfig({
        azureMonitorExporterOptions: {
          connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
        },
      });

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // Should use default since zero is invalid
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        60000,
        "Export interval should use default when env var is zero",
      );

      void metricHandler.shutdown();
    });

    it("should use default when OTEL_METRIC_EXPORT_INTERVAL is not set", () => {
      // Ensure the environment variable is not set
      delete process.env.OTEL_METRIC_EXPORT_INTERVAL;
      const freshConfig = new InternalConfig({
        azureMonitorExporterOptions: {
          connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
        },
      });

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // Should use default when env var is not set
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        60000,
        "Export interval should use default when env var is not set",
      );

      void metricHandler.shutdown();
    });

    it("should use default interval when neither OTEL_METRIC_EXPORT_INTERVAL nor options are provided", () => {
      // Ensure the environment variable is not set
      delete process.env.OTEL_METRIC_EXPORT_INTERVAL;

      const metricHandler = new MetricHandler(config); // No options provided
      const metricReader = metricHandler.getMetricReader();

      // Should use the default _collectionInterval (60000ms)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        60000,
        "Export interval should use default when neither env var nor options are provided",
      );

      void metricHandler.shutdown();
    });

    it("should prioritize OTEL_METRIC_EXPORT_INTERVAL over default", () => {
      // Set both environment variable and options
      process.env.OTEL_METRIC_EXPORT_INTERVAL = "7500";

      // Create a fresh config that will read the updated environment variable
      const freshConfig = new InternalConfig();
      if (freshConfig.azureMonitorExporterOptions) {
        freshConfig.azureMonitorExporterOptions.connectionString =
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      }

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // Should use environment variable over default
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        7500,
        "Export interval should prioritize env var over default",
      );

      void metricHandler.shutdown();
    });

    it("should handle OTEL_METRIC_EXPORT_INTERVAL with leading/trailing whitespace", () => {
      // Set the environment variable with whitespace
      process.env.OTEL_METRIC_EXPORT_INTERVAL = "  8000  ";

      // Create a fresh config that will read the updated environment variable
      const freshConfig = new InternalConfig();
      if (freshConfig.azureMonitorExporterOptions) {
        freshConfig.azureMonitorExporterOptions.connectionString =
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      }

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // parseInt should handle whitespace correctly
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        8000,
        "Export interval should handle whitespace in env var",
      );

      void metricHandler.shutdown();
    });

    it("should handle OTEL_METRIC_EXPORT_INTERVAL with decimal values by truncating", () => {
      // Set the environment variable to a decimal value
      process.env.OTEL_METRIC_EXPORT_INTERVAL = "1500.75";

      // Create a fresh config that will read the updated environment variable
      const freshConfig = new InternalConfig();
      if (freshConfig.azureMonitorExporterOptions) {
        freshConfig.azureMonitorExporterOptions.connectionString =
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      }

      const metricHandler = new MetricHandler(freshConfig);
      const metricReader = metricHandler.getMetricReader();

      // parseInt should truncate decimal values
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      const exportInterval = (metricReader as any)._exportInterval;
      assert.strictEqual(
        exportInterval,
        1500,
        "Export interval should truncate decimal values from env var",
      );

      void metricHandler.shutdown();
    });
  });
});
