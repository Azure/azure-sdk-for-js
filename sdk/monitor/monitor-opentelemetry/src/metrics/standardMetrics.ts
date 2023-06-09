// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { Attributes, Histogram, Meter, SpanKind, ValueType } from "@opentelemetry/api";
import { ReadableSpan, Span } from "@opentelemetry/sdk-trace-base";
import {
  SemanticAttributes,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";
import {
  MetricDependencyDimensions,
  MetricRequestDimensions,
  StandardMetricBaseDimensions,
} from "./types";

/**
 * Azure Monitor Standard Metrics
 * @internal
 */
export class StandardMetrics {
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _incomingRequestDurationHistogram: Histogram;
  private _outgoingRequestDurationHistogram: Histogram;
  private _config: AzureMonitorOpenTelemetryConfig;

  /**
   * Initializes a new instance of the StandardMetrics class.
   * @param config - Distro configuration.
   * @param options - Standard Metrics options.
   */
  constructor(config: AzureMonitorOpenTelemetryConfig, options?: { collectionInterval: number }) {
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
    this._incomingRequestDurationHistogram = this._meter.createHistogram("REQUEST_DURATION", {
      valueType: ValueType.DOUBLE,
    });
    this._outgoingRequestDurationHistogram = this._meter.createHistogram("DEPENDENCY_DURATION", {
      valueType: ValueType.DOUBLE,
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
   * Add extra attributes to Span so Ingestion doesn't aggregate the data again
   * @internal
   */
  public markSpanAsProcessed(span: Span): void {
    if (this._config.enableAutoCollectStandardMetrics) {
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
  }

  private _getRequestDimensions(span: ReadableSpan): Attributes {
    const dimensions: MetricRequestDimensions = this._getBaseDimensions(span);
    dimensions.metricId = "requests/duration";
    const statusCode = String(span.attributes["http.status_code"]);
    dimensions.requestResultCode = statusCode;
    dimensions.requestSuccess = statusCode === "200" ? "True" : "False";
    return dimensions as Attributes;
  }

  private _getDependencyDimensions(span: ReadableSpan): Attributes {
    const dimensions: MetricDependencyDimensions = this._getBaseDimensions(span);
    dimensions.metricId = "dependencies/duration";
    const statusCode = String(span.attributes["http.status_code"]);
    dimensions.dependencyTarget = this._getDependencyTarget(span.attributes);
    dimensions.dependencyResultCode = statusCode;
    dimensions.dependencyType = "http";
    dimensions.dependencySuccess = statusCode === "200" ? "True" : "False";
    return dimensions as Attributes;
  }

  private _getBaseDimensions(span: ReadableSpan): StandardMetricBaseDimensions {
    const dimensions: StandardMetricBaseDimensions = {};
    dimensions.IsAutocollected = "True";
    if (span.resource) {
      const spanResourceAttributes = span.resource.attributes;
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
}
