// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { context } from "@opentelemetry/api";
import { PushMetricExporter, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { ExportResult, ExportResultCode, suppressTracing } from "@opentelemetry/core";
import { AzureMonitorExporterOptions } from "../../config";
import { TelemetryItem as Envelope } from "../../generated";
import { resourceMetricsToEnvelope } from "../../utils/metricUtils";
import { AzureMonitorBaseExporter } from "../base";
import { HttpSender } from "../../platform";

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
  private _sender: HttpSender;

  /**
   * Initializes a new instance of the AzureMonitorStatsbeatExporter class.
   * @param options - Exporter configuration
   */
  constructor(options: AzureMonitorExporterOptions) {
    super(options, true);
    this._sender = new HttpSender({
      endpointUrl: this.endpointUrl,
      instrumentationKey: this.instrumentationKey,
      trackStatsbeat: this.trackStatsbeat,
      exporterOptions: options,
      isStatsbeatSender: true,
    });
  }

  /**
   * Export Statsbeat metrics.
   */
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-misused-promises
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
    // Supress tracing until OpenTelemetry Metrics SDK support it
    context.with(suppressTracing(context.active()), async () => {
      resultCallback(await this._sender.exportEnvelopes(envelopes));
    });
  }

  /**
   * Shutdown AzureMonitorStatsbeatExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    return this._sender.shutdown();
  }

  /**
   * Force flush.
   */
  public async forceFlush(): Promise<void> {
    return Promise.resolve();
  }
}
