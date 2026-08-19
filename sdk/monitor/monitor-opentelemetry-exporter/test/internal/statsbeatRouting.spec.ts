// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExportResultCode } from "@opentelemetry/core";
import { DEFAULT_BREEZE_ENDPOINT, ENV_DISABLE_SDKSTATS } from "../../src/Declarations/Constants.js";
import { AzureMonitorTraceExporter } from "../../src/export/trace.js";
import { LongIntervalStatsbeatMetrics } from "../../src/export/statsbeat/longIntervalStatsbeatMetrics.js";
import { NetworkStatsbeatMetrics } from "../../src/export/statsbeat/networkStatsbeatMetrics.js";
import {
  EU_CONNECTION_STRING,
  NETWORK_STATSBEAT_ENDPOINT,
  StatsbeatCounter,
} from "../../src/export/statsbeat/types.js";
import { BaseSender } from "../../src/platform/nodejs/baseSender.js";
import { successfulBreezeResponse } from "../utils/breezeTestUtils.js";
import nock from "nock";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";

const CUSTOMER_IKEY = "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
const EU_ENDPOINT = /IngestionEndpoint=([^;]+)/.exec(EU_CONNECTION_STRING)![1];
const EU_IKEY = /InstrumentationKey=([^;]+)/.exec(EU_CONNECTION_STRING)![1];

describe("Statsbeat redirect routing", () => {
  const originalWebsiteName = process.env.WEBSITE_SITE_NAME;
  const originalFeatures = process.env.AZURE_MONITOR_STATSBEAT_FEATURES;
  const originalDisableSdkStats = process.env[ENV_DISABLE_SDKSTATS];

  beforeEach(() => {
    nock.disableNetConnect();
    process.env.WEBSITE_SITE_NAME = "statsbeat-routing-test";
    process.env.AZURE_MONITOR_STATSBEAT_FEATURES = JSON.stringify({
      feature: 3,
      instrumentation: 10,
    });
    process.env[ENV_DISABLE_SDKSTATS] = "true";
    vi.spyOn(BaseSender.prototype as any, "scheduleStartupReplay").mockImplementation(() => {});
  });

  afterEach(async () => {
    const network = (NetworkStatsbeatMetrics as any).instance as
      NetworkStatsbeatMetrics | undefined;
    const longInterval = (LongIntervalStatsbeatMetrics as any).instance as
      LongIntervalStatsbeatMetrics | undefined;
    await Promise.allSettled([network?.shutdown(), longInterval?.shutdown()]);
    (NetworkStatsbeatMetrics as any).instance = null;
    (LongIntervalStatsbeatMetrics as any).instance = null;
    (BaseSender as any).redirectRouteUpdate = Promise.resolve();
    vi.restoreAllMocks();
    nock.cleanAll();
    nock.enableNetConnect();

    restoreEnvironment("WEBSITE_SITE_NAME", originalWebsiteName);
    restoreEnvironment("AZURE_MONITOR_STATSBEAT_FEATURES", originalFeatures);
    restoreEnvironment(ENV_DISABLE_SDKSTATS, originalDisableSdkStats);
  });

  it("routes both Statsbeat streams after the real public-cloud suffix transition", async () => {
    const regionalEndpoint = "https://westeurope-1.in.applicationinsights.azure.com";
    nock(DEFAULT_BREEZE_ENDPOINT)
      .post("/v2.1/track")
      .reply(307, "", { Location: `${regionalEndpoint}/v2.1/track` });
    const regionalRequest = nock(regionalEndpoint)
      .post("/v2.1/track")
      .reply(200, JSON.stringify(successfulBreezeResponse(1)));

    const euEnvelopes: any[] = [];
    let rowRequests = 0;
    nock(EU_ENDPOINT)
      .post("/v2.1/track", (body: any[]) => {
        euEnvelopes.push(...body);
        return true;
      })
      .reply(200, JSON.stringify(successfulBreezeResponse(10)))
      .persist();
    nock("https://westus-0.in.applicationinsights.azure.com")
      .post("/v2.1/track", () => {
        rowRequests++;
        return true;
      })
      .reply(200, JSON.stringify(successfulBreezeResponse(10)))
      .persist();

    const exporter = new AzureMonitorTraceExporter({
      connectionString: `InstrumentationKey=${CUSTOMER_IKEY}`,
      disableOfflineStorage: true,
    });
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    const result = await exporter["sender"]["exportEnvelopes"]([
      { name: "Microsoft.ApplicationInsights.Message", time: new Date() },
    ]);
    const network = exporter["sender"]["networkStatsbeatMetrics"]!;
    const longInterval = exporter["sender"]["longIntervalStatsbeatMetrics"]!;
    await network["networkStatsbeatMeterProvider"].forceFlush();
    await longInterval["longIntervalStatsbeatMeterProvider"].forceFlush();

    assert.strictEqual(result.code, ExportResultCode.SUCCESS);
    regionalRequest.done();
    assert.strictEqual(rowRequests, 0);
    assert.isAbove(euEnvelopes.length, 0);
    assert.isTrue(euEnvelopes.every((envelope) => envelope.iKey === EU_IKEY));

    const properties = euEnvelopes.map((envelope) => envelope.data.baseData.properties);
    assert.isTrue(
      properties.some(
        (item) =>
          item.cikey === CUSTOMER_IKEY &&
          item.endpoint === NETWORK_STATSBEAT_ENDPOINT &&
          item.host === "westeurope-1",
      ),
    );
    const metricNames = euEnvelopes.flatMap((envelope) =>
      envelope.data.baseData.metrics.map((metric: { name: string }) => metric.name),
    );
    assert.includeMembers(metricNames, [
      StatsbeatCounter.SUCCESS_COUNT,
      StatsbeatCounter.FEATURE,
      StatsbeatCounter.ATTACH,
    ]);
  });
});

function restoreEnvironment(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}
