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
import { QuickpulseExporterOptions } from "../types";
import { QuickpulseSender } from "./sender";
import {
  DocumentIngress,
  MonitoringDataPoint,
  PostOptionalParams,
  PostResponse,
} from "../../../generated";
import { resourceMetricsToQuickpulseDataPoint } from "../utils";

/**
 * Quickpulse Metric Exporter.
 */
export class QuickpulseMetricExporter implements PushMetricExporter {
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private isShutdown = false;
  private sender: QuickpulseSender;
  private postCallback: (response: PostResponse | undefined) => void;
  private getDocumentsFn: () => DocumentIngress[];
  // Monitoring data point with common properties
  private baseMonitoringDataPoint: MonitoringDataPoint;

  /**
   * Initializes a new instance of the AzureMonitorMetricExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */

  constructor(options: QuickpulseExporterOptions) {
    this.sender = new QuickpulseSender({
      endpointUrl: options.endpointUrl,
      instrumentationKey: options.instrumentationKey,
      aadAudience: options.aadAudience,
      credential: options.credential,
    });
    this.postCallback = options.postCallback;
    this.getDocumentsFn = options.getDocumentsFn;
    this.baseMonitoringDataPoint = options.baseMonitoringDataPoint;
    diag.debug("QuickpulseMetricExporter was successfully setup");
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
    if (this.isShutdown) {
      diag.info("Exporter shut down. Failed to export quickpulse.");
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }
    diag.info(`Exporting Live metrics(s). Converting to envelopes...`);
    let optionalParams: PostOptionalParams = {
      monitoringDataPoints: resourceMetricsToQuickpulseDataPoint(
        metrics,
        this.baseMonitoringDataPoint,
        this.getDocumentsFn()
      ),
      xMsQpsTransmissionTime: Date.now(),
    };
    // Supress tracing until OpenTelemetry Metrics SDK support it
    await context.with(suppressTracing(context.active()), async () => {
      try {
        let postResponse = await this.sender.post(optionalParams);
        this.postCallback(postResponse);
        resultCallback({ code: ExportResultCode.SUCCESS });
      } catch (error) {
        this.postCallback(undefined);
        resultCallback({ code: ExportResultCode.FAILED });
      }
    });
  }

  /**
   * Shutdown Exporter.
   */
  public async shutdown(): Promise<void> {
    this.isShutdown = true;
    diag.info("QuickpulseMetricExporter shutting down");
    return Promise.resolve();
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

  /**
   * Get Sender
   */
  public getSender(): QuickpulseSender {
    return this.sender;
  }
}
