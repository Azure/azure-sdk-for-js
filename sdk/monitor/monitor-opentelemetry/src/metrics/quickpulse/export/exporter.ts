// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { context, diag } from "@opentelemetry/api";
import type { PushMetricExporter, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { AggregationTemporality, InstrumentType } from "@opentelemetry/sdk-metrics";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode, suppressTracing } from "@opentelemetry/core";
import type { QuickpulseExporterOptions } from "../types.js";
import { QuickpulseSender } from "./sender.js";
import type {
  DocumentIngress,
  MonitoringDataPoint,
  PublishOptionalParams,
  CollectionConfigurationError,
} from "../../../generated/index.js";
import type { QuickpulseResponse } from "./sender.js";
import { getTransmissionTime, resourceMetricsToQuickpulseDataPoint } from "../utils.js";

/**
 * Quickpulse Metric Exporter.
 */
export class QuickpulseMetricExporter implements PushMetricExporter {
  private sender: QuickpulseSender;
  private postCallback: (response: QuickpulseResponse | undefined) => void;
  private getDocumentsFn: () => DocumentIngress[];
  // Monitoring data point with common properties
  private baseMonitoringDataPoint: MonitoringDataPoint;
  private etag: string;
  private getErrorsFn: () => CollectionConfigurationError[];
  private getDerivedMetricValuesFn: () => Map<string, number>;
  private enabled = true;
  private abortController = new AbortController();

  /**
   * Initializes a new instance of the AzureMonitorMetricExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */

  constructor(options: QuickpulseExporterOptions) {
    this.sender = new QuickpulseSender({
      endpointUrl: options.endpointUrl,
      instrumentationKey: options.instrumentationKey,
      credential: options.credential,
      credentialScopes: options.credentialScopes,
    });
    this.postCallback = options.postCallback;
    this.getDocumentsFn = options.getDocumentsFn;
    this.baseMonitoringDataPoint = options.baseMonitoringDataPoint;
    this.getErrorsFn = options.getErrorsFn;
    this.etag = "";
    this.getDerivedMetricValuesFn = options.getDerivedMetricValuesFn;
    diag.debug("QuickpulseMetricExporter was successfully setup");
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
    if (!this.enabled) {
      resultCallback({ code: ExportResultCode.SUCCESS });
      return;
    }
    const abortController = this.abortController;
    diag.info(`Exporting Live metrics(s). Converting to envelopes...`);
    const optionalParams: PublishOptionalParams = {
      abortSignal: abortController.signal,
      monitoringDataPoints: resourceMetricsToQuickpulseDataPoint(
        metrics,
        this.baseMonitoringDataPoint,
        this.getDocumentsFn(),
        this.getErrorsFn(),
        this.getDerivedMetricValuesFn(),
      ),
      transmissionTime: getTransmissionTime(),
      configurationEtag: this.etag,
    };
    // Supress tracing until OpenTelemetry Metrics SDK support it
    await context.with(suppressTracing(context.active()), async () => {
      try {
        const response = await this.sender.publish(optionalParams);
        if (this.enabled && this.abortController === abortController) {
          this.postCallback(response);
        }
        resultCallback({ code: ExportResultCode.SUCCESS });
      } catch (error) {
        if (this.enabled && this.abortController === abortController) {
          this.postCallback(undefined);
          resultCallback({ code: ExportResultCode.FAILED });
        } else {
          resultCallback({ code: ExportResultCode.SUCCESS });
        }
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

  public setEtag(etag: string): void {
    this.etag = etag;
  }

  public setEnabled(enabled: boolean): void {
    if (this.enabled === enabled) {
      return;
    }
    this.enabled = enabled;
    if (enabled) {
      this.abortController = new AbortController();
    } else {
      this.abortController.abort();
    }
  }
}
