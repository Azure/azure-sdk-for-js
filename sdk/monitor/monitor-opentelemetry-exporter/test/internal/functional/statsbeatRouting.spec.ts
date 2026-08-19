// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExportResultCode } from "@opentelemetry/core";
import type { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import type { MetricsData } from "../../../src/generated/index.js";
import {
  DEFAULT_BREEZE_ENDPOINT,
  ENV_DISABLE_SDKSTATS,
  LEGACY_ENV_DISABLE_STATSBEAT,
} from "../../../src/Declarations/Constants.js";
import { AzureMonitorTraceExporter } from "../../../src/export/trace.js";
import { LongIntervalStatsbeatMetrics } from "../../../src/export/statsbeat/longIntervalStatsbeatMetrics.js";
import { NetworkStatsbeatMetrics } from "../../../src/export/statsbeat/networkStatsbeatMetrics.js";
import {
  EU_CONNECTION_STRING,
  NETWORK_STATSBEAT_ENDPOINT,
  NON_EU_CONNECTION_STRING,
  StatsbeatCounter,
} from "../../../src/export/statsbeat/types.js";
import { BaseSender } from "../../../src/platform/nodejs/baseSender.js";
import type { CapturedEnvelope, TelemetryCapture } from "../../utils/statsbeatCapture.js";
import {
  EU_STATSBEAT,
  ROW_STATSBEAT,
  captureStatsbeatDestinations,
  captureTelemetry,
  redirectTelemetry,
} from "../../utils/statsbeatCapture.js";
import nock from "nock";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

const CUSTOMER_IKEY = "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
const CUSTOMER_ENVELOPE = {
  name: "Microsoft.ApplicationInsights.Message",
  time: new Date(),
  instrumentationKey: CUSTOMER_IKEY,
};

interface RouteState {
  network: NetworkStatsbeatMetrics;
  longInterval: LongIntervalStatsbeatMetrics;
  networkProvider: object;
  networkReader: PeriodicExportingMetricReader;
  networkTimer: unknown;
  networkMeter: object;
  networkExporter: object;
  networkCollection: unknown[];
  networkCounter: {
    host: string;
    endpoint: string;
    totalRequestCount: number;
    totalSuccessfulRequestCount: number;
  };
  longProvider: object;
  longReader: PeriodicExportingMetricReader;
  longTimer: unknown;
  longMeter: object;
  longExporter: object;
}

function resetStatsbeatSingletons(): void {
  (NetworkStatsbeatMetrics as any).instance = null;
  (LongIntervalStatsbeatMetrics as any).instance = null;
  (BaseSender as any).statsbeatRouteUpdate = Promise.resolve();
}

function getReaderTimer(reader: PeriodicExportingMetricReader): unknown {
  return (reader as unknown as { _interval: unknown })._interval;
}

function getMetric(
  envelopes: ReturnType<TelemetryCapture["envelopes"]>,
  name: string,
): CapturedEnvelope | undefined {
  return envelopes.find((envelope) => {
    const baseData = envelope.data?.baseData as MetricsData | undefined;
    return baseData?.metrics?.some((metric) => metric.name === name);
  });
}

function getMetricProperties(
  envelope: ReturnType<TelemetryCapture["envelopes"]>[number] | undefined,
): Record<string, string> {
  const baseData = envelope?.data?.baseData as MetricsData | undefined;
  return (baseData?.properties ?? {}) as Record<string, string>;
}

function assertStatsbeatCapture(
  capture: TelemetryCapture,
  expectedInstrumentationKey: string,
): void {
  const envelopes = capture.envelopes();
  assert.isAbove(envelopes.length, 0);
  for (const envelope of envelopes) {
    assert.strictEqual(envelope.name, "Microsoft.ApplicationInsights.Statsbeat");
    assert.strictEqual(envelope.iKey, expectedInstrumentationKey);
    assert.strictEqual(envelope.data?.baseType, "MetricData");
    assert.strictEqual(getMetricProperties(envelope).cikey, CUSTOMER_IKEY);
  }
}

function createExporter(startEndpoint?: string): AzureMonitorTraceExporter {
  const ingestionEndpoint = startEndpoint ? `;IngestionEndpoint=${startEndpoint}` : "";
  return new AzureMonitorTraceExporter({
    connectionString: `InstrumentationKey=${CUSTOMER_IKEY}${ingestionEndpoint}`,
    disableOfflineStorage: true,
  });
}

async function getRouteState(exporter: AzureMonitorTraceExporter): Promise<RouteState> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  const network = exporter["sender"]["networkStatsbeatMetrics"]!;
  const longInterval = exporter["sender"]["longIntervalStatsbeatMetrics"]!;
  const networkProvider = network["networkStatsbeatMeterProvider"];
  const networkReader = (networkProvider as any)["_sharedState"].metricCollectors[0][
    "_metricReader"
  ] as PeriodicExportingMetricReader;
  const networkCollection = network["networkStatsbeatCollection"];
  network.countSuccess(100);
  const networkCounter = networkCollection[0];
  const longReader = longInterval["longIntervalMetricReader"];

  return {
    network,
    longInterval,
    networkProvider,
    networkReader,
    networkTimer: getReaderTimer(networkReader),
    networkMeter: network["networkStatsbeatMeter"],
    networkExporter: network["networkAzureExporter"],
    networkCollection,
    networkCounter,
    longProvider: longInterval["longIntervalStatsbeatMeterProvider"],
    longReader,
    longTimer: getReaderTimer(longReader),
    longMeter: longInterval["longIntervalStatsbeatMeter"],
    longExporter: longInterval["longIntervalAzureExporter"],
  };
}

async function flushStatsbeat(state: RouteState): Promise<void> {
  await state.network["networkStatsbeatMeterProvider"].forceFlush();
  await state.longInterval["longIntervalStatsbeatMeterProvider"].forceFlush();
}

function assertRouteStateRetained(state: RouteState, expectedHost: string): void {
  assert.strictEqual(state.network["networkStatsbeatMeterProvider"], state.networkProvider);
  assert.strictEqual(state.network["networkStatsbeatMeter"], state.networkMeter);
  assert.strictEqual(state.network["networkAzureExporter"], state.networkExporter);
  assert.strictEqual(state.network["networkStatsbeatCollection"], state.networkCollection);
  assert.strictEqual(state.network["networkStatsbeatCollection"][0], state.networkCounter);
  assert.strictEqual(getReaderTimer(state.networkReader), state.networkTimer);
  assert.strictEqual(state.networkCounter.host, expectedHost);
  assert.strictEqual(state.networkCounter.endpoint, NETWORK_STATSBEAT_ENDPOINT);
  assert.strictEqual(state.networkCounter.totalRequestCount, 2);
  assert.strictEqual(state.networkCounter.totalSuccessfulRequestCount, 2);

  assert.strictEqual(state.longInterval["longIntervalStatsbeatMeterProvider"], state.longProvider);
  assert.strictEqual(state.longInterval["longIntervalMetricReader"], state.longReader);
  assert.strictEqual(state.longInterval["longIntervalStatsbeatMeter"], state.longMeter);
  assert.strictEqual(state.longInterval["longIntervalAzureExporter"], state.longExporter);
  assert.strictEqual(getReaderTimer(state.longReader), state.longTimer);
}

async function exerciseAcceptedRedirect(options: {
  startEndpoint?: string;
  redirectLocation: string;
  statusCode: 307 | 308;
  expectedConnectionString: string;
  expectedHost: string;
}): Promise<void> {
  const startEndpoint = options.startEndpoint ?? DEFAULT_BREEZE_ENDPOINT;
  const redirectEndpoint = new URL(options.redirectLocation).origin;
  const redirectScope = redirectTelemetry(
    new URL(startEndpoint).origin,
    options.statusCode,
    options.redirectLocation,
  );
  const customerCapture = captureTelemetry(redirectEndpoint);
  const statsbeat = captureStatsbeatDestinations();
  const exporter = createExporter(options.startEndpoint);
  const state = await getRouteState(exporter);

  const result = await exporter["sender"]["exportEnvelopes"]([CUSTOMER_ENVELOPE]);

  assert.strictEqual(result.code, ExportResultCode.SUCCESS);
  redirectScope.done();
  assert.lengthOf(customerCapture.requests, 1);
  assertRouteStateRetained(state, options.expectedHost);
  assert.strictEqual(state.network["connectionString"], options.expectedConnectionString);
  assert.strictEqual(state.longInterval["connectionString"], options.expectedConnectionString);

  await flushStatsbeat(state);

  const selected =
    options.expectedConnectionString === EU_CONNECTION_STRING ? statsbeat.eu : statsbeat.row;
  const unselected =
    options.expectedConnectionString === EU_CONNECTION_STRING ? statsbeat.row : statsbeat.eu;
  const selectedKey =
    options.expectedConnectionString === EU_CONNECTION_STRING
      ? EU_STATSBEAT.instrumentationKey
      : ROW_STATSBEAT.instrumentationKey;

  assertStatsbeatCapture(selected, selectedKey);
  assert.lengthOf(unselected.requests, 0);

  const successEnvelope = getMetric(selected.envelopes(), StatsbeatCounter.SUCCESS_COUNT);
  assert.isDefined(successEnvelope);
  assert.deepInclude(getMetricProperties(successEnvelope), {
    endpoint: NETWORK_STATSBEAT_ENDPOINT,
    host: options.expectedHost,
    cikey: CUSTOMER_IKEY,
  });
  assert.isDefined(getMetric(selected.envelopes(), StatsbeatCounter.FEATURE));
  assert.isDefined(getMetric(selected.envelopes(), StatsbeatCounter.ATTACH));
}

describe("Statsbeat redirect routing functional validation", () => {
  const originalEnvironment = {
    websiteSiteName: process.env.WEBSITE_SITE_NAME,
    features: process.env.AZURE_MONITOR_STATSBEAT_FEATURES,
    longInterval: process.env.LONG_INTERVAL_EXPORT_MILLIS,
    disableStatsbeat: process.env[LEGACY_ENV_DISABLE_STATSBEAT],
    disableSdkStats: process.env[ENV_DISABLE_SDKSTATS],
  };

  beforeEach(() => {
    resetStatsbeatSingletons();
    nock.disableNetConnect();
    process.env.WEBSITE_SITE_NAME = "statsbeat-routing-test";
    process.env.AZURE_MONITOR_STATSBEAT_FEATURES = JSON.stringify({
      feature: 3,
      instrumentation: 10,
    });
    process.env.LONG_INTERVAL_EXPORT_MILLIS = "600000";
    delete process.env[LEGACY_ENV_DISABLE_STATSBEAT];
    process.env[ENV_DISABLE_SDKSTATS] = "true";
    vi.spyOn(BaseSender.prototype as any, "scheduleStartupReplay").mockImplementation(() => {});
  });

  afterEach(async () => {
    const network = (NetworkStatsbeatMetrics as any).instance as
      NetworkStatsbeatMetrics | undefined;
    const longInterval = (LongIntervalStatsbeatMetrics as any).instance as
      LongIntervalStatsbeatMetrics | undefined;
    await Promise.allSettled([network?.shutdown(), longInterval?.shutdown()]);
    resetStatsbeatSingletons();
    vi.restoreAllMocks();
    nock.cleanAll();
    nock.enableNetConnect();

    const restore = (name: string, value: string | undefined): void => {
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    };
    restore("WEBSITE_SITE_NAME", originalEnvironment.websiteSiteName);
    restore("AZURE_MONITOR_STATSBEAT_FEATURES", originalEnvironment.features);
    restore("LONG_INTERVAL_EXPORT_MILLIS", originalEnvironment.longInterval);
    restore(LEGACY_ENV_DISABLE_STATSBEAT, originalEnvironment.disableStatsbeat);
    restore(ENV_DISABLE_SDKSTATS, originalEnvironment.disableSdkStats);
  });

  it.each([307, 308] as const)(
    "routes ikey-only global Breeze traffic to EU Statsbeat after an accepted %s redirect",
    async (statusCode) => {
      await exerciseAcceptedRedirect({
        redirectLocation: "https://northeurope.services.visualstudio.com/v2.1/track",
        statusCode,
        expectedConnectionString: EU_CONNECTION_STRING,
        expectedHost: "northeurope",
      });
    },
  );

  it("accepts the real global-to-regional public cloud suffix transition", async () => {
    await exerciseAcceptedRedirect({
      redirectLocation: "https://westeurope-1.in.applicationinsights.azure.com/v2.1/track",
      statusCode: 307,
      expectedConnectionString: EU_CONNECTION_STRING,
      expectedHost: "westeurope",
    });
  });

  it.each([
    {
      name: "ROW to EU",
      startEndpoint: "https://westus-0.in.applicationinsights.azure.com",
      redirectLocation: "https://northeurope-0.in.applicationinsights.azure.com/v2.1/track",
      expectedConnectionString: EU_CONNECTION_STRING,
      expectedHost: "northeurope",
    },
    {
      name: "EU to ROW",
      startEndpoint: "https://westeurope-5.in.applicationinsights.azure.com",
      redirectLocation: "https://westus2-0.in.applicationinsights.azure.com/v2.1/track",
      expectedConnectionString: NON_EU_CONNECTION_STRING,
      expectedHost: "westus2",
    },
    {
      name: "ROW to Germany North",
      startEndpoint: "https://westus-0.in.applicationinsights.azure.com",
      redirectLocation: "https://GermanyNorth-42.in.applicationinsights.azure.com/v2.1/track",
      expectedConnectionString: EU_CONNECTION_STRING,
      expectedHost: "GermanyNorth",
    },
  ])("routes $name redirects to the expected Statsbeat backend", async (testCase) => {
    await exerciseAcceptedRedirect({
      ...testCase,
      statusCode: 307,
    });
  });

  it.each([
    {
      name: "missing Location",
      location: undefined,
    },
    {
      name: "malformed Location",
      location: "not a URL",
    },
    {
      name: "untrusted Location",
      location: "https://attacker.example.invalid/v2.1/track",
    },
  ])("keeps ROW Statsbeat routing for a rejected $name redirect", async ({ location }) => {
    const redirectScope = redirectTelemetry(DEFAULT_BREEZE_ENDPOINT, 307, location);
    const statsbeat = captureStatsbeatDestinations();
    const exporter = createExporter();
    const state = await getRouteState(exporter);

    const result = await exporter["sender"]["exportEnvelopes"]([CUSTOMER_ENVELOPE]);

    assert.strictEqual(result.code, ExportResultCode.FAILED);
    redirectScope.done();
    assert.strictEqual(state.network["connectionString"], NON_EU_CONNECTION_STRING);
    assert.strictEqual(state.longInterval["connectionString"], NON_EU_CONNECTION_STRING);
    assert.strictEqual(state.networkCounter.host, "dc");
    assert.strictEqual(state.networkCounter.endpoint, NETWORK_STATSBEAT_ENDPOINT);

    await flushStatsbeat(state);

    assertStatsbeatCapture(statsbeat.row, ROW_STATSBEAT.instrumentationKey);
    assert.lengthOf(statsbeat.eu.requests, 0);
    const networkEnvelope =
      getMetric(statsbeat.row.envelopes(), StatsbeatCounter.EXCEPTION_COUNT) ??
      getMetric(statsbeat.row.envelopes(), StatsbeatCounter.SUCCESS_COUNT);
    expect(getMetricProperties(networkEnvelope)).toMatchObject({
      endpoint: NETWORK_STATSBEAT_ENDPOINT,
      host: "dc",
      cikey: CUSTOMER_IKEY,
    });
  });
});
