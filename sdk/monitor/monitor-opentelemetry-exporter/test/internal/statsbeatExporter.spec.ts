// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { ExportResultCode } from "@opentelemetry/core";
import { describe, expect, it, vi } from "vitest";
import { AzureMonitorStatsbeatExporter } from "../../src/export/statsbeat/statsbeatExporter.js";
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
});
