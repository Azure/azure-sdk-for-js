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
  PublishOptionalParams,
  PublishResponse,
} from "../../../generated";
import { getTransmissionTime, resourceMetricsToQuickpulseDataPoint } from "../utils";

/**
 * Quickpulse Metric Exporter.
 */
export class QuickpulseMetricExporter implements PushMetricExporter {
  private sender: QuickpulseSender;
  private postCallback: (response: PublishResponse | undefined) => void;
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
    resultCallback: (result: ExportResult) => void,
  ): Promise<void> {
    diag.info(`Exporting Live metrics(s). Converting to envelopes...`);
    const optionalParams: PublishOptionalParams = {
      monitoringDataPoints: resourceMetricsToQuickpulseDataPoint(
        metrics,
        this.baseMonitoringDataPoint,
        this.getDocumentsFn(),
      ),
      transmissionTime: getTransmissionTime(),
    };
    // Supress tracing until OpenTelemetry Metrics SDK support it
    await context.with(suppressTracing(context.active()), async () => {
      try {
        const postResponse = await this.sender.publish(optionalParams);
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
