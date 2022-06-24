// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { diag } from "@opentelemetry/api";
import {
  AggregationTemporality,
  InstrumentType,
  PushMetricExporter,
  ResourceMetrics,
} from "@opentelemetry/sdk-metrics-base";
import { ExportResult } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "./base";
import { AzureExporterConfig } from "../config";
import { TelemetryItem as Envelope } from "../generated";
import { resourceMetricsToEnvelope } from "../utils/metricUtils";

/**
 * Azure Monitor OpenTelemetry Metric Exporter.
 */
export class AzureMonitorMetricExporter
  extends AzureMonitorBaseExporter
  implements PushMetricExporter
{
  /**
   * Initializes a new instance of the AzureMonitorMetricExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */
  constructor(options: AzureExporterConfig = {}) {
    super(options);
    diag.debug("AzureMonitorMetricExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry resource metrics.
   * @param metrics - Resource metrics to export.
   * @param resultCallback - Result callback.
   */
  async export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void
  ): Promise<void> {
    diag.info(`Exporting ${metrics.scopeMetrics.length} metrics(s). Converting to envelopes...`);

    let envelopes: Envelope[] = resourceMetricsToEnvelope(
      metrics,
      this._options.instrumentationKey
    );
    resultCallback(await this._exportEnvelopes(envelopes));
  }

  /**
   * Shutdown AzureMonitorMetricExporter.
   */
  public async shutdown(): Promise<void> {
    diag.info("Azure Monitor Trace Exporter shutting down");
    return this._shutdown();
  }

  public selectAggregationTemporality(_instrumentType: InstrumentType) {
    return AggregationTemporality.CUMULATIVE;
  }

  public async forceFlush() {
    // TODO: https://github.com/open-telemetry/opentelemetry-js/issues/3060
    throw new Error("Method not implemented.");
  }
}
