// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { InternalConfig } from "../shared/config";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { Attributes, Counter, Histogram, Meter, SpanKind, ValueType } from "@opentelemetry/api";
import { ReadableSpan, Span, TimedEvent } from "@opentelemetry/sdk-trace-base";
import {
  SemanticAttributes,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";
import {
  MetricDependencyDimensions,
  MetricRequestDimensions,
  StandardMetricBaseDimensions,
} from "./types";
import { LogRecord } from "@opentelemetry/sdk-logs";
import { Resource } from "@opentelemetry/resources";

/**
 * Azure Monitor Standard Metrics
 * @internal
 */
export class StandardMetrics {
  private _config: InternalConfig;
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _incomingRequestDurationHistogram: Histogram;
  private _outgoingRequestDurationHistogram: Histogram;
  private _exceptionsCounter: Counter;
  private _tracesCounter: Counter;

  /**
   * Initializes a new instance of the StandardMetrics class.
   * @param config - Distro configuration.
   * @param options - Standard Metrics options.
   */
  constructor(config: InternalConfig, options?: { collectionInterval: number }) {
    this._config = config;
    const meterProviderConfig: MeterProviderOptions = {
      resource: this._config.resource,
    };
    this._meterProvider = new MeterProvider(meterProviderConfig);
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterConfig);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: options?.collectionInterval || this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("AzureMonitorStandardMetricsMeter");
    this._incomingRequestDurationHistogram = this._meter.createHistogram(
      "azureMonitor.http.requestDuration",
      {
        valueType: ValueType.DOUBLE,
      }
    );
    this._outgoingRequestDurationHistogram = this._meter.createHistogram(
      "azureMonitor.http.dependencyDuration",
      {
        valueType: ValueType.DOUBLE,
      }
    );

    this._exceptionsCounter = this._meter.createCounter("azureMonitor.exceptionCount", {
      valueType: ValueType.INT,
    });
    this._tracesCounter = this._meter.createCounter("azureMonitor.traceCount", {
      valueType: ValueType.INT,
    });
  }

  /**
   * Shutdown Meter Provider it will return no-op Meters after being called.
   */
  public shutdown() {
    this._meterProvider.shutdown();
  }

  /**
   * Force flush Meter Provider.
   */
  public async flush(): Promise<void> {
    await this._meterProvider.forceFlush();
  }

  /**
   *Get OpenTelemetry MeterProvider
   */
  public getMeterProvider(): MeterProvider {
    return this._meterProvider;
  }

  /**
   * Add extra attributes to Span so Ingestion doesn't aggregate the data again
   * @internal
   */
  public markSpanAsProcessed(span: Span): void {
    if (span.kind === SpanKind.CLIENT) {
      span.setAttributes({
        "_MS.ProcessedByMetricExtractors": "(Name:'Dependencies', Ver:'1.1')",
      });
    } else if (span.kind === SpanKind.SERVER) {
      span.setAttributes({
        "_MS.ProcessedByMetricExtractors": "(Name:'Requests', Ver:'1.1')",
      });
    }
  }

  /**
   * Record Span metrics
   * @internal
   */
  public recordSpan(span: ReadableSpan): void {
    const durationMs = span.duration[0];
    if (span.kind === SpanKind.SERVER) {
      this._incomingRequestDurationHistogram.record(durationMs, this._getRequestDimensions(span));
    } else {
      this._outgoingRequestDurationHistogram.record(
        durationMs,
        this._getDependencyDimensions(span)
      );
    }
    if (span.events) {
      span.events.forEach((event: TimedEvent) => {
        event.attributes = event.attributes || {};
        if (event.name === "exception") {
          event.attributes["_MS.ProcessedByMetricExtractors"] = "(Name:'Exceptions', Ver:'1.1')";
          this._exceptionsCounter.add(1, this._getExceptionDimensions(span.resource));
        } else {
          event.attributes["_MS.ProcessedByMetricExtractors"] = "(Name:'Traces', Ver:'1.1')";
          this._tracesCounter.add(1, this._getTraceDimensions(span.resource));
        }
      });
    }
  }

  /**
   * Record LogRecord metrics, add attribute so data is not aggregated again in ingestion
   * @internal
   */
  public recordLog(logRecord: LogRecord): void {
    if (this._isExceptionTelemetry(logRecord)) {
      logRecord.setAttribute("_MS.ProcessedByMetricExtractors", "(Name:'Exceptions', Ver:'1.1')");
      this._exceptionsCounter.add(1, this._getExceptionDimensions(logRecord.resource));
    } else if (this._isTraceTelemetry(logRecord)) {
      logRecord.setAttribute("_MS.ProcessedByMetricExtractors", "(Name:'Traces', Ver:'1.1')");
      this._tracesCounter.add(1, this._getTraceDimensions(logRecord.resource));
    }
  }

  private _getRequestDimensions(span: ReadableSpan): Attributes {
    const dimensions: MetricRequestDimensions = this._getBaseDimensions(span.resource);
    dimensions.metricId = "requests/duration";
    const statusCode = String(span.attributes["http.status_code"]);
    dimensions.requestResultCode = statusCode;
    dimensions.requestSuccess = statusCode === "200" ? "True" : "False";
    return dimensions as Attributes;
  }

  private _getDependencyDimensions(span: ReadableSpan): Attributes {
    const dimensions: MetricDependencyDimensions = this._getBaseDimensions(span.resource);
    dimensions.metricId = "dependencies/duration";
    const statusCode = String(span.attributes["http.status_code"]);
    dimensions.dependencyTarget = this._getDependencyTarget(span.attributes);
    dimensions.dependencyResultCode = statusCode;
    dimensions.dependencyType = "http";
    dimensions.dependencySuccess = statusCode === "200" ? "True" : "False";
    return dimensions as Attributes;
  }

  private _getExceptionDimensions(resource: Resource): Attributes {
    const dimensions: StandardMetricBaseDimensions = this._getBaseDimensions(resource);
    dimensions.metricId = "exceptions/count";
    return dimensions as Attributes;
  }

  private _getTraceDimensions(resource: Resource): Attributes {
    const dimensions: StandardMetricBaseDimensions = this._getBaseDimensions(resource);
    dimensions.metricId = "traces/count";
    return dimensions as Attributes;
  }

  private _getBaseDimensions(resource: Resource): StandardMetricBaseDimensions {
    const dimensions: StandardMetricBaseDimensions = {};
    dimensions.IsAutocollected = "True";
    if (resource) {
      const spanResourceAttributes = resource.attributes;
      const serviceName = spanResourceAttributes[SemanticResourceAttributes.SERVICE_NAME];
      const serviceNamespace = spanResourceAttributes[SemanticResourceAttributes.SERVICE_NAMESPACE];
      if (serviceName) {
        if (serviceNamespace) {
          dimensions.cloudRoleName = `${serviceNamespace}.${serviceName}`;
        } else {
          dimensions.cloudRoleName = String(serviceName);
        }
      }
      const serviceInstanceId =
        spanResourceAttributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID];
      dimensions.cloudRoleInstance = String(serviceInstanceId);
    }
    return dimensions;
  }

  private _getDependencyTarget(attributes: Attributes): string {
    if (!attributes) {
      return "";
    }
    const peerService = attributes[SemanticAttributes.PEER_SERVICE];
    const httpHost = attributes[SemanticAttributes.HTTP_HOST];
    const httpUrl = attributes[SemanticAttributes.HTTP_URL];
    const netPeerName = attributes[SemanticAttributes.NET_PEER_NAME];
    const netPeerIp = attributes[SemanticAttributes.NET_PEER_IP];
    if (peerService) {
      return String(peerService);
    } else if (httpHost) {
      return String(httpHost);
    } else if (httpUrl) {
      return String(httpUrl);
    } else if (netPeerName) {
      return String(netPeerName);
    } else if (netPeerIp) {
      return String(netPeerIp);
    }
    return "";
  }

  private _isExceptionTelemetry(logRecord: LogRecord) {
    const baseType = logRecord.attributes["_MS.baseType"];
    // If Application Insights Legacy logs
    if (baseType && baseType === "ExceptionData") {
      return true;
    } else if (
      logRecord.attributes[SemanticAttributes.EXCEPTION_MESSAGE] ||
      logRecord.attributes[SemanticAttributes.EXCEPTION_TYPE]
    ) {
      return true;
    }
    return false;
  }

  private _isTraceTelemetry(logRecord: LogRecord) {
    const baseType = logRecord.attributes["_MS.baseType"];
    // If Application Insights Legacy logs
    if (baseType && baseType === "MessageData") {
      return true;
    } else if (
      !logRecord.attributes[SemanticAttributes.EXCEPTION_MESSAGE] &&
      !logRecord.attributes[SemanticAttributes.EXCEPTION_TYPE]
    ) {
      return true;
    }
    return false;
  }
}
