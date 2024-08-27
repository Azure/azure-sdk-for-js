// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { context, diag } from "@opentelemetry/api";
import {
  AggregationTemporality,
  InstrumentType,
  PushMetricExporter,
  ResourceMetrics,
} from "@opentelemetry/sdk-metrics";
import { ExportResult, ExportResultCode, suppressTracing } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "./base";
import { TelemetryItem as Envelope } from "../generated";
import { resourceMetricsToEnvelope } from "../utils/metricUtils";
import { AzureMonitorExporterOptions } from "../config";
import { HttpSender } from "../platform";

/**
 * Azure Monitor OpenTelemetry Metric Exporter.
 */
export class AzureMonitorMetricExporter
  extends AzureMonitorBaseExporter
  implements PushMetricExporter
{
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private _isShutdown = false;
  private _sender: HttpSender;

  /**
   * Initializes a new instance of the AzureMonitorMetricExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */

  constructor(options: AzureMonitorExporterOptions = {}) {
    super(options);
    this._sender = new HttpSender({
      endpointUrl: this.endpointUrl,
      instrumentationKey: this.instrumentationKey,
      trackStatsbeat: this.trackStatsbeat,
      exporterOptions: options,
      aadAudience: this.aadAudience,
    });
    diag.debug("AzureMonitorMetricExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry resource metrics.
   * @param metrics - Resource metrics to export.
   * @param resultCallback - Result callback.
   */
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void,
  ): Promise<void> {
    if (this._isShutdown) {
      diag.info("Exporter shut down. Failed to export spans.");
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }
    diag.info(`Exporting ${metrics.scopeMetrics.length} metrics(s). Converting to envelopes...`);

    const envelopes: Envelope[] = resourceMetricsToEnvelope(metrics, this.instrumentationKey);
    // Supress tracing until OpenTelemetry Metrics SDK support it
    await context.with(suppressTracing(context.active()), async () => {
      resultCallback(await this._sender.exportEnvelopes(envelopes));
    });
  }

  /**
   * Shutdown AzureMonitorMetricExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    diag.info("AzureMonitorMetricExporter shutting down");
    return this._sender.shutdown();
  }

  /**
   * Select aggregation temporality
   */
  public selectAggregationTemporality(instrumentType: InstrumentType): AggregationTemporality {
    if (
      instrumentType === InstrumentType.UP_DOWN_COUNTER ||
      instrumentType === InstrumentType.OBSERVABLE_UP_DOWN_COUNTER
    ) {
      return AggregationTemporality.CUMULATIVE;
    }
    return AggregationTemporality.DELTA;
  }

  /**
   * Force flush
   */
  public async forceFlush(): Promise<void> {
    return Promise.resolve();
  }
}
