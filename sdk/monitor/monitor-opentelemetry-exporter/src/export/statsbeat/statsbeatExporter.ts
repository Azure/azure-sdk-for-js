// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { context } from "@opentelemetry/api";
import type { PushMetricExporter, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode, suppressTracing } from "@opentelemetry/core";
import type { AzureMonitorExporterOptions } from "../../config.js";
import type { MetricsData, TelemetryItem as Envelope } from "../../generated/index.js";
import { resourceMetricsToEnvelope } from "../../utils/metricUtils.js";
import { AzureMonitorBaseExporter } from "../base.js";

/**
 * Azure Monitor Statsbeat Exporter
 */
export class AzureMonitorStatsbeatExporter
  extends AzureMonitorBaseExporter
  implements PushMetricExporter
{
  /**
   * Flag to determine if the Exporter is shutdown.
   */
  private _isShutdown = false;
  private _sender: any;
  private _senderOptions: any;

  /**
   * Initializes a new instance of the AzureMonitorStatsbeatExporter class.
   * @param options - Exporter configuration
   */
  constructor(options: AzureMonitorExporterOptions) {
    super(options, true);
    // Store sender options for lazy initialization to avoid circular dependency
    this._senderOptions = {
      endpointUrl: this.endpointUrl,
      instrumentationKey: this.instrumentationKey,
      trackStatsbeat: this.trackStatsbeat,
      exporterOptions: options,
      isStatsbeatSender: true,
    };
  }

  /**
   * Lazily initialize the sender to avoid circular dependency
   */
  private async _getSender(): Promise<any> {
    if (!this._sender) {
      const { HttpSender } = await import("../../platform/nodejs/httpSender.js");
      this._sender = new HttpSender(this._senderOptions);
    }
    return this._sender;
  }

  /**
   * Filter out envelopes with zero metric values to prevent exporting zero counts.
   * This ensures zero counts are observed for internal cleanup but not exported to Azure Monitor.
   * @param envelopes - Array of telemetry envelopes to filter
   * @returns Filtered array of envelopes with non-zero metric values
   */
  private filterZeroValueMetrics(envelopes: Envelope[]): Envelope[] {
    return envelopes.filter((envelope) => {
      // Check if this is a metric envelope
      if (envelope.data?.baseType === "MetricData") {
        const metricsData = envelope.data.baseData as MetricsData | undefined;
        const metrics = metricsData?.metrics;
        // Filter out metrics where all values are zero
        if (metrics) {
          return metrics.some((metric) => metric.value !== 0);
        }
      }
      return true;
    });
  }

  /**
   * Export Statsbeat metrics.
   */
  async export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void,
  ): Promise<void> {
    if (this._isShutdown) {
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }

    const envelopes: Envelope[] = resourceMetricsToEnvelope(
      metrics,
      this.instrumentationKey,
      true, // isStatsbeat flag passed to create a Statsbeat envelope.
    );

    // Filter out zero-value metrics before export
    const filteredEnvelopes = this.filterZeroValueMetrics(envelopes);

    // Supress tracing until OpenTelemetry Metrics SDK support it
    context.with(suppressTracing(context.active()), async () => {
      const sender = await this._getSender();
      resultCallback(await sender.exportEnvelopes(filteredEnvelopes));
    });
  }

  /**
   * Shutdown AzureMonitorStatsbeatExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    if (this._sender) {
      return this._sender.shutdown();
    }
  }

  /**
   * Force flush.
   */
  public async forceFlush(): Promise<void> {
    return Promise.resolve();
  }
}
