// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { ExportResultCode } from "@opentelemetry/core";
import { describe, expect, it, vi } from "vitest";
import { AzureMonitorStatsbeatExporter } from "../../src/export/statsbeat/statsbeatExporter.js";
import { BaseSender } from "../../src/platform/nodejs/baseSender.js";
import { HttpSender } from "../../src/platform/nodejs/httpSender.js";
import {
  EU_CONNECTION_STRING,
  NON_EU_CONNECTION_STRING,
} from "../../src/export/statsbeat/types.js";

const { resourceMetricsToEnvelope } = vi.hoisted(() => ({
  resourceMetricsToEnvelope: vi.fn((_metrics: ResourceMetrics, instrumentationKey: string) => [
    {
      name: "Statsbeat",
      instrumentationKey,
      data: { baseType: "MetricData", baseData: { metrics: [{ value: 1 }] } },
    },
  ]),
}));

vi.mock("../../src/utils/metricUtils.js", () => ({
  resourceMetricsToEnvelope,
}));

describe("AzureMonitorStatsbeatExporter", () => {
  it("keeps the Statsbeat key and sender route atomic during reconfiguration", async () => {
    const exporter = new AzureMonitorStatsbeatExporter({
      connectionString: NON_EU_CONNECTION_STRING,
    });
    let completeFirstExport: (() => void) | undefined;
    const firstSender = {
      exportEnvelopes: vi.fn(
        (_envelopes: unknown[]) =>
          new Promise((resolve) => {
            completeFirstExport = () => resolve({ code: ExportResultCode.SUCCESS });
          }),
      ),
      shutdown: vi.fn().mockResolvedValue(undefined),
    };
    exporter["_sender"] = firstSender;

    const firstExport = exporter.export({} as ResourceMetrics, vi.fn());
    await vi.waitFor(() => expect(firstSender.exportEnvelopes).toHaveBeenCalledOnce());

    const update = exporter.updateConnectionString(EU_CONNECTION_STRING);
    expect(firstSender.shutdown).not.toHaveBeenCalled();

    completeFirstExport!();
    await firstExport;
    await update;

    expect(firstSender.exportEnvelopes).toHaveBeenCalledWith([
      expect.objectContaining({
        instrumentationKey: "c4a29126-a7cb-47e5-b348-11414998b11e",
      }),
    ]);
    expect(firstSender.shutdown).toHaveBeenCalledOnce();
    expect(exporter["_senderOptions"]).toMatchObject({
      endpointUrl: "https://westeurope-5.in.applicationinsights.azure.com",
      instrumentationKey: "7dc56bab-3c0c-4e9f-9ebb-d1acadee8d0f",
    });

    const secondSender = {
      exportEnvelopes: vi.fn((_envelopes: unknown[]) =>
        Promise.resolve({ code: ExportResultCode.SUCCESS }),
      ),
      shutdown: vi.fn().mockResolvedValue(undefined),
    };
    exporter["_sender"] = secondSender;
    await exporter.export({} as ResourceMetrics, vi.fn());

    expect(secondSender.exportEnvelopes).toHaveBeenCalledWith([
      expect.objectContaining({
        instrumentationKey: "7dc56bab-3c0c-4e9f-9ebb-d1acadee8d0f",
      }),
    ]);
  });

  it("applies concurrent route updates in invocation order", async () => {
    const exporter = new AzureMonitorStatsbeatExporter({
      connectionString: NON_EU_CONNECTION_STRING,
    });
    let completeShutdown: (() => void) | undefined;
    exporter["_sender"] = {
      shutdown: vi.fn(
        () =>
          new Promise<void>((resolve) => {
            completeShutdown = resolve;
          }),
      ),
    };
    const appliedRoutes: string[] = [];

    const euUpdate = exporter.updateConnectionString(EU_CONNECTION_STRING, () => {
      appliedRoutes.push("eu");
    });
    await vi.waitFor(() => expect(exporter["_sender"].shutdown).toHaveBeenCalledOnce());

    const nonEuUpdate = exporter.updateConnectionString(NON_EU_CONNECTION_STRING, () => {
      appliedRoutes.push("non-eu");
    });
    expect(appliedRoutes).toEqual([]);

    completeShutdown!();
    await Promise.all([euUpdate, nonEuUpdate]);

    expect(appliedRoutes).toEqual(["eu", "non-eu"]);
    expect(exporter["_senderOptions"]).toMatchObject({
      endpointUrl: "https://westus-0.in.applicationinsights.azure.com",
      instrumentationKey: "c4a29126-a7cb-47e5-b348-11414998b11e",
    });
  });

  it("disposes every replaced sender and leaves the current route usable", async () => {
    const exporter = new AzureMonitorStatsbeatExporter({
      connectionString: NON_EU_CONNECTION_STRING,
    });
    const rowSender = { shutdown: vi.fn().mockResolvedValue(undefined) };
    exporter["_sender"] = rowSender;

    await exporter.updateConnectionString(EU_CONNECTION_STRING);
    expect(rowSender.shutdown).toHaveBeenCalledOnce();
    expect(exporter["_sender"]).toBeUndefined();

    const euSender = { shutdown: vi.fn().mockResolvedValue(undefined) };
    exporter["_sender"] = euSender;
    await exporter.updateConnectionString(NON_EU_CONNECTION_STRING);
    expect(euSender.shutdown).toHaveBeenCalledOnce();
    expect(exporter["_sender"]).toBeUndefined();

    const currentSender = {
      exportEnvelopes: vi.fn().mockResolvedValue({ code: ExportResultCode.SUCCESS }),
      shutdown: vi.fn().mockResolvedValue(undefined),
    };
    exporter["_sender"] = currentSender;
    await exporter.export({} as ResourceMetrics, vi.fn());
    expect(currentSender.exportEnvelopes).toHaveBeenCalledWith([
      expect.objectContaining({
        instrumentationKey: "c4a29126-a7cb-47e5-b348-11414998b11e",
      }),
    ]);
  });

  it("cancels pending work on the sender it replaces", async () => {
    vi.useFakeTimers();
    vi.spyOn(BaseSender.prototype as any, "getStartupReplayDelayMs").mockReturnValue(1000);
    const oldSender = new HttpSender({
      endpointUrl: "https://westus-0.in.applicationinsights.azure.com",
      instrumentationKey: "c4a29126-a7cb-47e5-b348-11414998b11e",
      trackStatsbeat: false,
      exporterOptions: {},
      isStatsbeatSender: true,
    });
    const startupReplay = vi.spyOn(oldSender as any, "sendAllPersistedFiles");
    const retryReplay = vi.spyOn(oldSender as any, "sendFirstPersistedFile");
    (oldSender as any).scheduleRetryTimer(1000);

    const exporter = new AzureMonitorStatsbeatExporter({
      connectionString: NON_EU_CONNECTION_STRING,
    });
    exporter["_sender"] = oldSender;
    await exporter.updateConnectionString(EU_CONNECTION_STRING);
    await vi.advanceTimersByTimeAsync(1000);

    expect(startupReplay).not.toHaveBeenCalled();
    expect(retryReplay).not.toHaveBeenCalled();
    expect((oldSender as any).startupReplayTimer).toBeNull();
    expect((oldSender as any).retryTimer).toBeNull();
    vi.useRealTimers();
  });
});
