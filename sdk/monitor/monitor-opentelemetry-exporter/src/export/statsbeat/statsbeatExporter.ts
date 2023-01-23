// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { context } from "@opentelemetry/api";
import { PushMetricExporter, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { ExportResult, ExportResultCode, suppressTracing } from "@opentelemetry/core";
import { AzureMonitorExporterOptions } from "../../config";
import { TelemetryItem as Envelope } from "../../generated";
import { resourceMetricsToEnvelope } from "../../utils/metricUtils";
import { AzureMonitorBaseExporter } from "../base";

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

  /**
   * Initializes a new instance of the AzureMonitorStatsbeatExporter class.
   * @param options - Exporter configuration
   */
  constructor(options: AzureMonitorExporterOptions) {
    super(options, true);
  }

  /**
   * Export Statsbeat metrics.
   */
  async export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void
  ): Promise<void> {
    if (this._isShutdown) {
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }

    let envelopes: Envelope[] = resourceMetricsToEnvelope(
      metrics,
      this._instrumentationKey,
      true // isStatsbeat flag passed to create a Statsbeat envelope.
    );
    // Supress tracing until OpenTelemetry Metrics SDK support it
    context.with(suppressTracing(context.active()), async () => {
      resultCallback(await this._exportEnvelopes(envelopes));
    });
  }

  /**
   * Shutdown AzureMonitorStatsbeatExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    return this._shutdown();
  }

  /**
   * Force flush.
   */
  public async forceFlush(): Promise<void> {
    return Promise.resolve();
  }
}
