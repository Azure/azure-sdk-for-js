// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  PipelineOptions,
  operationOptionsToRequestOptionsBase,
  ServiceClientOptions,
  OperationOptions
} from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import "@azure/core-paging";
import { TokenCredential } from "@azure/core-auth";
import { GeneratedClient } from "./generated/generatedClient";
import { createSpan } from "./tracing";
import { MetricsAdvisorKeyCredential } from "./metricsAdvisorKeyCredentialPolicy";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  MetricFeedbackUnion,
  AnomalyIncident,
  DataPointAnomaly,
  AnomalyAlert,
  GetMetricEnrichedSeriesDataResponse,
  GetIncidentRootCauseResponse,
  GetFeedbackResponse,
  AlertsPageResponse,
  IncidentsPageResponse,
  AnomaliesPageResponse,
  DimensionValuesPageResponse,
  MetricSeriesPageResponse,
  MetricEnrichmentStatusPageResponse,
  MetricSeriesDefinition,
  DimensionKey,
  EnrichmentStatus,
  GetMetricSeriesDataResponse,
  MetricFeedbackPageResponse,
  AlertQueryTimeMode
} from "./models";
import { SeverityFilterCondition, FeedbackType, FeedbackQueryTimeMode } from "./generated/models";
import { toServiceMetricFeedbackUnion, fromServiceMetricFeedbackUnion } from "./transforms";
import { createClientPipeline } from "./createClientPipeline";

/**
 * Client options used to configure Metrics Advisor API requests.
 */

export interface MetricsAdvisorClientOptions extends PipelineOptions {}

/**
 * Options for listing incidents for detection configurations
 */

export type ListIncidentsForDetectionConfigurationOptions = {
  dimensionFilter?: DimensionKey[]; // lifted
} & OperationOptions;

/**
 * Options for retreiving metric enriched series data
 */

export type GetMetricEnrichedSeriesDataOptions = OperationOptions;

/**
 * Options for listing anomalies for detection configurations
 */

export type ListAnomaliesForDetectionConfigurationOptions = {
  skip?: number;
  dimensionFilter?: DimensionKey[];
  severityFilter?: SeverityFilterCondition;
} & OperationOptions;

/**
 * Options for listing anomalies for alert configurations
 */

export type ListAnomaliesForAlertConfigurationOptions = {
  skip?: number;
} & OperationOptions;

/**
 * Options for listing incidents for an alert
 */

export type ListIncidentsForAlertOptions = {
  skip?: number;
} & OperationOptions;

/**
 * Options for listing dimension values for detection configurations
 */

export type ListAnomalyDimensionValuesOptions = {
  skip?: number;
  dimensionFilter?: DimensionKey;
} & OperationOptions;

/**
 * Options for listing feedbacks
 */

export type ListFeedbackOptions = {
  skip?: number;
  /**
   * filter when listing feedbacks
   */
  filter?: {
    dimensionFilter?: DimensionKey;
    /**
     * filter feedbacks by type
     */
    feedbackType?: FeedbackType;
    /**
     * start time filter under chosen time mode
     */
    startTime?: Date | string;
    /**
     * end time filter under chosen time mode
     */
    endTime?: Date | string;
    /**
     * time mode to filter feedback
     */
    timeMode?: FeedbackQueryTimeMode;
  };
} & OperationOptions;

/**
 * Options for listing series definitions of a metric
 */

export type ListMetricSeriesDefinitionsOptions = {
  skip?: number;
  /**
   * filter specific dimension name and values
   */
  dimensionFilter?: Record<string, string[]>;
} & OperationOptions;

/**
 * Options for retreiving metric series data
 */

export type GetMetricSeriesDataOptions = OperationOptions;

/**
 * Options for listing alerts
 */

export type ListAlertsOptions = {
  skip?: number;
} & OperationOptions;

/**
 * Options for listing dimension values of a metric
 */

export type ListMetricDimensionValuesOptions = {
  skip?: number;
  /**
   * dimension value to be filtered
   */
  dimensionValueFilter?: string;
} & OperationOptions;

/**
 * Options for listing metric enrichment status
 */

export type ListMetricEnrichmentStatusOptions = {
  skip?: number;
} & OperationOptions;

/**
 * Client class for interacting with Azure Metrics Advisor Service to query alerts/incidents/anomalies, diagnose incidents, provide metric feedback
 */
export class MetricsAdvisorClient {
  /**
   * Url to service endpoint
   */
  public readonly endpointUrl: string;

  /**
   * A reference to service client options.
   */
  private readonly pipeline: ServiceClientOptions;

  /**
   * A reference to the auto-generated MetricsAdvisor HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of MetricsAdvisorClient.
   *
   * Example usage:
   * ```ts
   * import { MetricsAdvisorClient, MetricsAdvisorKeyCredential } from "@azure/ai-metrics-advisor";
   *
   * const client = new MetricsAdvisorClient(
   *    "<service endpoint>",
   *    new MetricsAdvisorKeyCredential("<subscription key>", "<api key>")
   * );
   * ```
   * @param endpointUrl - Url to an Azure Metrics Advisor service endpoint
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Metrics Advisor client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | MetricsAdvisorKeyCredential,
    options: MetricsAdvisorClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.pipeline = createClientPipeline(credential, options);
    this.client = new GeneratedClient(this.endpointUrl, this.pipeline);
  }

  /**
   * List alert segments for alerting configuration
   */
  private async *listSegmentOfAlerts(
    alertConfigId: string,
    startTime: Date,
    endTime: Date,
    timeMode: AlertQueryTimeMode,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListAlertsOptions = {}
  ): AsyncIterableIterator<AlertsPageResponse> {
    let segmentResponse;
    const optionsBody = {
      startTime: startTime,
      endTime: endTime,
      timeMode: timeMode
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getAlertsByAnomalyAlertingConfiguration(
        alertConfigId,
        optionsBody,
        {
          ...options,
          top: maxPageSize
        }
      );
      const alerts = segmentResponse.value?.map((a) => {
        return {
          id: a.alertId!,
          alertConfigId: alertConfigId,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          timestamp: a.timestamp?.getTime()
        };
      });
      const resultArray = Object.defineProperty(alerts || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getAlertsByAnomalyAlertingConfigurationNext(
        continuationToken,
        optionsBody,
        options
      );
      const alerts = segmentResponse.value?.map((a) => {
        return {
          id: a.alertId!,
          alertConfigId: alertConfigId,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          timestamp: a.timestamp?.getTime()
        };
      });
      const resultArray = Object.defineProperty(alerts || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * List alert items for alerting configuration
   */
  private async *listItemsOfAlerts(
    alertConfigId: string,
    startTime: Date,
    endTime: Date,
    timeMode: AlertQueryTimeMode,
    options: ListAlertsOptions
  ): AsyncIterableIterator<AnomalyAlert> {
    for await (const segment of this.listSegmentOfAlerts(
      alertConfigId,
      startTime,
      endTime,
      timeMode,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list alerts for an alert configuration.
   *
   * `.byPage()` returns an async iterable iterator to list the alerts in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey)
   * );
   * const alerts = client.listAlerts(alertConfigId,
   *   startTime, endTime, timeMode
   * );
   * let i = 1;
   * for await (const alert of alerts) {
   *   console.log(`alert ${i++}:`);
   *   console.log(alert);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listAlerts(alertConfigId, startTime, endTime, timeMode);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` alert - ${result.value.id}`);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listAlerts(alertConfigId, startTime, endTime, timeMode)
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const alert of page.value) {
   *      console.log(`${alert}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param alertConfigId - Anomaly alerting configuration unique id
   * @param startTime - The start of time range to query alert items for alerting configuration
   * @param endTime - The end of time range to query alert items for alerting configuration
   * @param timeMode - Query time mode - "AnomalyTime" | "CreatedTime" | "ModifiedTime"
   * @param options - The options parameter.
   */

  public listAlerts(
    alertConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    timeMode: AlertQueryTimeMode,
    options: ListAlertsOptions = {}
  ): PagedAsyncIterableIterator<AnomalyAlert, AlertsPageResponse> {
    const iter = this.listItemsOfAlerts(
      alertConfigId,
      typeof startTime === "string" ? new Date(startTime) : startTime,
      typeof endTime === "string" ? new Date(endTime) : endTime,
      timeMode,
      options
    );
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentOfAlerts(
          alertConfigId,
          typeof startTime === "string" ? new Date(startTime) : startTime,
          typeof endTime === "string" ? new Date(endTime) : endTime,
          timeMode,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  /**
   * List anomalies for alerting configuration - segments
   */
  private async *listSegmentsOfAnomaliesForAlert(
    alertConfigId: string,
    alertId: string,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListAnomaliesForAlertConfigurationOptions = {}
  ): AsyncIterableIterator<AnomaliesPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getAnomaliesFromAlertByAnomalyAlertingConfiguration(
        alertConfigId,
        alertId,
        {
          ...options,
          top: maxPageSize
        }
      );
      const anomalies = segmentResponse.value?.map((a) => {
        return {
          detectionConfigurationId: a.anomalyDetectionConfigurationId!,
          metricId: a.metricId,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus,
          timestamp: a.timestamp.getTime()
        };
      });
      const resultArray = Object.defineProperty(anomalies || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getAnomaliesFromAlertByAnomalyAlertingConfigurationNext(
        alertConfigId,
        alertId,
        continuationToken,
        {
          ...options,
          top: maxPageSize
        }
      );
      const anomalies = segmentResponse.value?.map((a) => {
        return {
          detectionConfigurationId: a.anomalyDetectionConfigurationId!,
          metricId: a.metricId,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus,
          timestamp: a.timestamp.getTime()
        };
      });
      const resultArray = Object.defineProperty(anomalies || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * listing anomalies for alerting configuration - items
   */
  private async *listItemsOfAnomaliesForAlert(
    alertConfigId: string,
    alertId: string,
    options: ListAnomaliesForAlertConfigurationOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<DataPointAnomaly> {
    for await (const segment of this.listSegmentsOfAnomaliesForAlert(
      alertConfigId,
      alertId,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  private listAnomaliesForAlert(
    alert: AnomalyAlert,
    options: ListAnomaliesForAlertConfigurationOptions = {}
  ): PagedAsyncIterableIterator<DataPointAnomaly, AnomaliesPageResponse> {
    const iter = this.listItemsOfAnomaliesForAlert(alert.alertConfigId, alert.id, options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfAnomaliesForAlert(
          alert.alertConfigId,
          alert.id,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  /**
   * listing incidents for alert - segments
   */
  private async *listSegmentsOfIncidentsForAlert(
    alertConfigId: string,
    alertId: string,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListIncidentsForAlertOptions = {}
  ): AsyncIterableIterator<IncidentsPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getIncidentsFromAlertByAnomalyAlertingConfiguration(
        alertConfigId,
        alertId,
        {
          ...options,
          top: maxPageSize
        }
      );
      const incidents = segmentResponse.value?.map((incident) => {
        return {
          id: incident.incidentId,
          metricId: incident.metricId,
          detectionConfigurationId: incident.anomalyDetectionConfigurationId!,
          rootDimensionKey: incident.rootNode.dimension,
          status: incident.property.incidentStatus!,
          severity: incident.property.maxSeverity,
          startTime: incident.startTime,
          lastOccurredTime: incident.lastTime
        };
      });
      const resultArray = Object.defineProperty(incidents || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getIncidentsFromAlertByAnomalyAlertingConfigurationNext(
        alertConfigId,
        alertId,
        continuationToken,
        {
          ...options,
          top: maxPageSize
        }
      );
      const incidents = segmentResponse.value?.map((incident) => {
        return {
          id: incident.incidentId,
          metricId: incident.metricId,
          detectionConfigurationId: incident.anomalyDetectionConfigurationId!,
          rootDimensionKey: incident.rootNode.dimension,
          status: incident.property.incidentStatus!,
          severity: incident.property.maxSeverity,
          startTime: incident.startTime,
          lastOccurredTime: incident.lastTime
        };
      });
      const resultArray = Object.defineProperty(incidents || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * listing incidents for alert - items
   */
  private async *listItemsOfIncidentsForAlert(
    alertConfigId: string,
    alertId: string,
    options: ListIncidentsForAlertOptions = {}
  ): AsyncIterableIterator<AnomalyIncident> {
    for await (const segment of this.listSegmentsOfIncidentsForAlert(
      alertConfigId,
      alertId,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list incidents associated with an alert
   *
   * `.byPage()` returns an async iterable iterator to list the incidents in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const incidentList = client.listIncidents(anomalyAlert);
   * let i = 1;
   * for await (const incident of incidentList){
   *   console.log(`incident ${i++}:`);
   *   console.log(incident);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listIncidents(anomalyAlert);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` incident - ${result.value.id}`);
   *   console.dir(result.value);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listIncidents(anomalyAlert).byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const incident of page.value) {
   *      console.dir(incident);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param alert - Anomaly alert containing alertConfigId and id
   * @param options - The options parameter.
   */
  public listIncidents(
    alert: AnomalyAlert,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListIncidentsForAlertOptions
  ): PagedAsyncIterableIterator<AnomalyIncident, IncidentsPageResponse>;
  /**
   * Returns an async iterable iterator to list incidents for an anomaly detection configuration.
   *
   * `.byPage()` returns an async iterable iterator to list the incidents in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const incidentList = client
   *   .listIncidents(detectionConfigId, startTime, endTime);
   * let i = 1;
   * for await (const incident of incidentList){
   *  console.log(`incident ${i++}:`);
   *  console.log(incident);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listIncidents(detectionConfigId, startTime, endTime);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` incident - ${result.value.id}`);
   *   console.dir(result.value);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listIncidents(detectionConfigId, startTime, endTime)
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const incident of page.value) {
   *      console.dir(incident);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param detectionConfigId - Anomaly detection configuration id
   * @param startTime - The start of time range to query for incidents
   * @param endTime - The end of time range to query for incidents
   * @param options - The options parameter.
   */
  public listIncidents(
    detectionConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListIncidentsForDetectionConfigurationOptions
  ): PagedAsyncIterableIterator<AnomalyIncident, IncidentsPageResponse>;

  public listIncidents(
    alertOrDetectionConfigId: AnomalyAlert | string,
    optionsOrStartTime?: ListIncidentsForAlertOptions | Date | string,
    endTime?: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListIncidentsForDetectionConfigurationOptions
  ): PagedAsyncIterableIterator<AnomalyIncident, IncidentsPageResponse> {
    if (typeof alertOrDetectionConfigId === "string") {
      if (!optionsOrStartTime || !endTime) {
        throw new Error("Invalid startTime or endTime");
      }
      return this.listIncidentsForDetectionConfiguration(
        alertOrDetectionConfigId,
        typeof optionsOrStartTime === "string"
          ? new Date(optionsOrStartTime)
          : (optionsOrStartTime as Date),
        typeof endTime === "string" ? new Date(endTime) : endTime,
        options || {}
      );
    } else {
      return this.listIncidentsForAlert(
        alertOrDetectionConfigId as AnomalyAlert,
        (optionsOrStartTime || {}) as ListIncidentsForAlertOptions
      );
    }
  }

  private listIncidentsForAlert(
    alert: AnomalyAlert,
    options: ListIncidentsForAlertOptions = {}
  ): PagedAsyncIterableIterator<AnomalyIncident, IncidentsPageResponse> {
    const iter = this.listItemsOfIncidentsForAlert(alert.alertConfigId, alert.id, options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfIncidentsForAlert(
          alert.alertConfigId,
          alert.id,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  /**
   * Retrieves enriched metric series data for a detection configuration
   *
   * @param detectionConfigId - Anomaly detection configuration id
   * @param startTime - The start of time range to query metric enriched series data
   * @param endTime - The end of time range to query metric enriched series data
   * @param seriesToFilter - Series to retrieve their data
   * @param options - The options parameter.
   */
  public async getMetricEnrichedSeriesData(
    detectionConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    seriesToFilter: DimensionKey[],
    options: GetMetricEnrichedSeriesDataOptions = {}
  ): Promise<GetMetricEnrichedSeriesDataResponse> {
    const optionsBody = {
      startTime: typeof startTime === "string" ? new Date(startTime) : startTime,
      endTime: typeof endTime === "string" ? new Date(endTime) : endTime,
      series: seriesToFilter.map((s) => {
        return { dimension: s };
      })
    };
    const result = await this.client.getSeriesByAnomalyDetectionConfiguration(
      detectionConfigId,
      optionsBody,
      options
    );
    const results = result.value.map((d) => {
      return {
        series: d.series.dimension,
        timestamps: d.timestampList,
        values: d.valueList,
        expectedValues: d.expectedValueList,
        lowerBounds: d.lowerBoundaryList,
        upperBounds: d.upperBoundaryList,
        isAnomaly: d.isAnomalyList,
        periods: d.periodList
      };
    });

    return Object.defineProperty(results, "_response", {
      enumerable: false,
      value: result._response
    });
  }

  /**
   * listing anomalies for detection config - segments
   */

  private async *listSegmentsOfAnomaliesForDetectionConfig(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    maxPageSize?: number,
    continuationToken?: string,
    options: ListAnomaliesForDetectionConfigurationOptions = {}
  ): AsyncIterableIterator<AnomaliesPageResponse> {
    let segmentResponse;
    const optionsBody = {
      startTime: startTime,
      endTime: endTime,
      filter:
        options.dimensionFilter || options.severityFilter
          ? {
              dimensionFilter: options.dimensionFilter?.map((d) => {
                return { dimension: d };
              }),
              severityFilter: options.severityFilter
            }
          : undefined
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getAnomaliesByAnomalyDetectionConfiguration(
        detectionConfigId,
        optionsBody,
        {
          ...options,
          top: maxPageSize
        }
      );
      const anomalies = segmentResponse.value?.map((a) => {
        return {
          detectionConfigurationId: detectionConfigId,
          metricId: a.metricId,
          timestamp: a.timestamp.getTime(),
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus
        };
      });
      const resultArray = Object.defineProperty(anomalies || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getAnomaliesByAnomalyDetectionConfigurationNext(
        continuationToken,
        optionsBody,
        options
      );
      continuationToken = segmentResponse.nextLink;
      const anomalies = segmentResponse.value?.map((a) => {
        return {
          detectionConfigurationId: detectionConfigId,
          metricId: a.metricId,
          timestamp: a.timestamp.getTime(),
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus
        };
      });
      const resultArray = Object.defineProperty(anomalies || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
    }
  }

  /**
   * listing anomalies for detection config - items
   */

  private async *listItemsOfAnomaliesForDetectionConfig(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListAnomaliesForDetectionConfigurationOptions
  ): AsyncIterableIterator<DataPointAnomaly> {
    for await (const segment of this.listSegmentsOfAnomaliesForDetectionConfig(
      detectionConfigId,
      startTime,
      endTime,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  private listAnomaliesForDetectionConfiguration(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListAnomaliesForDetectionConfigurationOptions = {}
  ): PagedAsyncIterableIterator<DataPointAnomaly, AnomaliesPageResponse> {
    const iter = this.listItemsOfAnomaliesForDetectionConfig(
      detectionConfigId,
      startTime,
      endTime,
      options
    );
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfAnomaliesForDetectionConfig(
          detectionConfigId,
          startTime,
          endTime,
          settings.maxPageSize,
          settings.continuationToken,
          options
        );
      }
    };
  }

  /**
   * Returns an async iterable iterator to list anamolies associated with an alert
   *
   * `.byPage()` returns an async iterable iterator to list the anomalies in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const anamolyList = client.listAnomalies({alertConfigId, id: alertId});
   * let i = 1;
   * for await (const anamoly of anamolyList){
   *  console.log(`anamoly ${i++}:`);
   *  console.log(anamoly);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listAnomalies({alertConfigId, id: alertId});
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` anamoly - ${result.value.metricId}, ${result.value.detectionConfigurationId} `);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listAnomalies({alertConfigId, id: alertId}).byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const anomaly of page.value) {
   *      console.log(`${anomaly}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param alert - Anomaly alert containing alertConfigId and id
   * @param options - The options parameter.
   */
  public listAnomalies(
    alert: AnomalyAlert,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListAnomaliesForAlertConfigurationOptions
  ): PagedAsyncIterableIterator<DataPointAnomaly, AnomaliesPageResponse>;

  /**
   * Returns an async iterable iterator to list anomalies for a detection configuration.
   *
   * `.byPage()` returns an async iterable iterator to list the anomalies in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const anomalies = client.listAnomalies(detectionConfigId, startTime, endTime);
   * let i = 1;
   * for await (const anomaly of anomalies) {
   *   console.log(`anomaly ${i++}:`);
   *   console.log(anomaly);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listAnomalies(detectionConfigId, startTime, endTime);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` anomaly - ${result.value.severity} ${result.value.status}`);
   *   console.dir(result.value);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listAnomalies(detectionConfigId, startTime, endTime)
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const anomaly of page.value) {
   *      console.dir(anomaly);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param detectionConfigId - Anomaly detection configuration id
   * @param startTime - The start of time range to query anomalies
   * @param endTime - The end of time range to query anomalies
   * @param options - The options parameter.
   */
  public listAnomalies(
    detectionConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListAnomaliesForDetectionConfigurationOptions
  ): PagedAsyncIterableIterator<DataPointAnomaly, AnomaliesPageResponse>;
  public listAnomalies(
    alertOrDetectionConfigId: AnomalyAlert | string,
    optionsOrStartTime?: ListAnomaliesForAlertConfigurationOptions | Date | string,
    endTime?: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListAnomaliesForDetectionConfigurationOptions
  ): PagedAsyncIterableIterator<DataPointAnomaly, AnomaliesPageResponse> {
    if (typeof alertOrDetectionConfigId === "string") {
      if (!optionsOrStartTime || !endTime) {
        throw new Error("Invalid startTime or endTime");
      }
      return this.listAnomaliesForDetectionConfiguration(
        alertOrDetectionConfigId,
        typeof optionsOrStartTime === "string"
          ? new Date(optionsOrStartTime)
          : (optionsOrStartTime as Date),
        typeof endTime === "string" ? new Date(endTime) : endTime,
        options || {}
      );
    } else {
      return this.listAnomaliesForAlert(
        alertOrDetectionConfigId,
        (optionsOrStartTime as ListAnomaliesForAlertConfigurationOptions) || {}
      );
    }
  }

  // ## list segments of dimension values of anomalies detected by a detection configuration
  private async *listSegmentsOfAnomalyDimensionValues(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    dimensionName: string,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListAnomalyDimensionValuesOptions = {}
  ): AsyncIterableIterator<DimensionValuesPageResponse> {
    let segmentResponse;
    const optionsBody = {
      ...options,
      dimensionFilter: options.dimensionFilter ? { dimension: options.dimensionFilter } : undefined,
      startTime,
      endTime,
      dimensionName
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getDimensionOfAnomaliesByAnomalyDetectionConfiguration(
        detectionConfigId,
        optionsBody,
        {
          ...options,
          top: maxPageSize
        }
      );
      const resultArray = Object.defineProperty(segmentResponse.value, "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getDimensionOfAnomaliesByAnomalyDetectionConfigurationNext(
        continuationToken,
        optionsBody,
        options
      );
      const resultArray = Object.defineProperty(segmentResponse.value, "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }
  }

  // ## list items of dimension values of anomalies detected by a detection configuration
  private async *listItemsOfAnomalyDimensionValues(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    dimensionName: string,
    options: ListAnomalyDimensionValuesOptions
  ): AsyncIterableIterator<string> {
    for await (const segment of this.listSegmentsOfAnomalyDimensionValues(
      detectionConfigId,
      startTime,
      endTime,
      dimensionName,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list dimension values of anomalies detected by a detection configuration.
   *
   * `.byPage()` returns an async iterable iterator to list the dimension values in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const dimensionValues = client
   *   .listAnomalyDimensionValues(detectionConfigId, startTime, endTime, dimensionName);
   * let i = 1;
   * for await (const dv of dimensionValues) {
   *   console.log(`dimension value ${i++}: ${dv}`);
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client
   *   .listAnomalyDimensionValues(detectionConfigId, startTime, endTime, dimensionName);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` dimension value - '${result.value}'`);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client
   *   .listAnomalyDimensionValues(
   *     detectionConfigId,
   *     startTime,
   *     endTime,
   *     dimensionName
   *   )
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *   if (page.value) {
   *     console.log(`-- page ${i++}`);
   *     for (const dv of page.value) {
   *       console.log(` dimension value - '${result.value}'`);
   *     }
   *   }
   *   page = await pages.next();
   * }
   * ```
   * @param detectionConfigId - Anomaly detection configuration id
   * @param dimensionName - Name of the dimension for anomaly detection config
   * @param startTime - The start of time range to query anomalies
   * @param endTime - The end of time range to query anomalies
   * @param options - The options parameter.
   */
  public listAnomalyDimensionValues(
    detectionConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    dimensionName: string,
    options: ListAnomalyDimensionValuesOptions = {}
  ): PagedAsyncIterableIterator<string, DimensionValuesPageResponse> {
    const iter = this.listItemsOfAnomalyDimensionValues(
      detectionConfigId,
      typeof startTime === "string" ? new Date(startTime) : startTime,
      typeof endTime === "string" ? new Date(endTime) : endTime,
      dimensionName,
      options
    );
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfAnomalyDimensionValues(
          detectionConfigId,
          typeof startTime === "string" ? new Date(startTime) : startTime,
          typeof endTime === "string" ? new Date(endTime) : endTime,
          dimensionName,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  // ## listing incidents for detection config - segments
  private async *listSegmentsOfIncidentsForDetectionConfig(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListIncidentsForDetectionConfigurationOptions = {}
  ): AsyncIterableIterator<IncidentsPageResponse> {
    let segmentResponse;
    const optionsBody = {
      startTime: startTime,
      endTime: endTime,
      filter: {
        dimensionFilter: options.dimensionFilter?.map((d) => {
          return { dimension: d };
        })
      }
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getIncidentsByAnomalyDetectionConfiguration(
        detectionConfigId,
        optionsBody,
        {
          ...options,
          top: maxPageSize
        }
      );
      const incidents = segmentResponse.value?.map((incident) => {
        return {
          id: incident.incidentId,
          metricId: incident.metricId,
          detectionConfigurationId: detectionConfigId,
          rootDimensionKey: incident.rootNode.dimension,
          status: incident.property.incidentStatus!,
          severity: incident.property.maxSeverity,
          startTime: incident.startTime,
          lastOccurredTime: incident.lastTime
        };
      });
      const resultArray = Object.defineProperty(incidents || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }

    while (continuationToken) {
      segmentResponse = await this.client.getIncidentsByAnomalyDetectionConfigurationNext(
        detectionConfigId,
        optionsBody,
        continuationToken,
        {
          ...options,
          top: maxPageSize
        }
      );
      const incidents = segmentResponse.value?.map((incident) => {
        return {
          id: incident.incidentId,
          metricId: incident.metricId,
          detectionConfigurationId: detectionConfigId,
          rootDimensionKey: incident.rootNode.dimension,
          status: incident.property.incidentStatus!,
          severity: incident.property.maxSeverity,
          startTime: incident.startTime,
          lastOccurredTime: incident.lastTime
        };
      });
      const resultArray = Object.defineProperty(incidents || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }
  }

  // ## listing incidents for detection config - items
  private async *listItemsOfIncidentsForDetectionConfig(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListIncidentsForDetectionConfigurationOptions
  ): AsyncIterableIterator<AnomalyIncident> {
    for await (const segment of this.listSegmentsOfIncidentsForDetectionConfig(
      detectionConfigId,
      startTime,
      endTime,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  private listIncidentsForDetectionConfiguration(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListIncidentsForDetectionConfigurationOptions = {}
  ): PagedAsyncIterableIterator<AnomalyIncident, IncidentsPageResponse> {
    const iter = this.listItemsOfIncidentsForDetectionConfig(
      detectionConfigId,
      startTime,
      endTime,
      options
    );
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfIncidentsForDetectionConfig(
          detectionConfigId,
          startTime,
          endTime,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  /**
   * Gets the root causes of an incident.
   *
   * @param detectionConfigId - Anomaly detection configuration id
   * @param incidentId - Incident id
   * @param options - The options parameter
   */
  public async getIncidentRootCauses(
    detectionConfigId: string,
    incidentId: string,
    options: OperationOptions = {}
  ): Promise<GetIncidentRootCauseResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorClient-getIncidentRootCauses",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getRootCauseOfIncidentByAnomalyDetectionConfiguration(
        detectionConfigId,
        incidentId,
        requestOptions
      );
      const transformed = result.value?.map((r) => {
        return {
          seriesKey: r.rootCause.dimension,
          path: r.path,
          score: r.score,
          description: r.description
        };
      });
      return {
        rootCauses: transformed,
        _response: result._response
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a metric feedback.
   *
   * @param feedback - Content of the feedback
   * @param options - The options parameter
   * @returns Response with Feedback object
   */
  public async createFeedback(
    feedback: MetricFeedbackUnion,
    options: OperationOptions = {}
  ): Promise<GetFeedbackResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createFeedback",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const serviceFeedback = toServiceMetricFeedbackUnion(feedback);
      const result = await this.client.createMetricFeedback(serviceFeedback, requestOptions);
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const feedbackId = result.location.substring(lastSlashIndex + 1);
      return this.getFeedback(feedbackId);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves a metric feedback for the given feedback id.
   * @param id - Id of the feedback to retrieve
   * @param options - The options parameter
   */
  public async getFeedback(
    id: string,
    options: OperationOptions = {}
  ): Promise<GetFeedbackResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getFeedback",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getMetricFeedback(id, requestOptions);
      return {
        ...fromServiceMetricFeedbackUnion(result),
        _response: result._response
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listSegmentsOfFeedback(
    metricId: string,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListFeedbackOptions = {}
  ): AsyncIterableIterator<MetricFeedbackPageResponse> {
    let segmentResponse;
    const startTime =
      typeof options.filter?.startTime === "string"
        ? new Date(options.filter?.startTime)
        : options.filter?.startTime;
    const endTime =
      typeof options.filter?.endTime === "string"
        ? new Date(options.filter.endTime)
        : options.filter?.endTime;
    const optionsBody = {
      metricId,
      dimensionFilter: options.filter?.dimensionFilter
        ? { dimension: options.filter?.dimensionFilter }
        : undefined,
      feedbackType: options.filter?.feedbackType,
      startTime,
      endTime,
      timeMode: options.filter?.timeMode
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.listMetricFeedbacks(optionsBody, {
        ...options,
        top: maxPageSize
      });
      const feedbacks = segmentResponse.value?.map((feedback) => {
        return fromServiceMetricFeedbackUnion(feedback);
      });
      const resultArray = Object.defineProperty(feedbacks || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }

    while (continuationToken) {
      segmentResponse = await this.client.listMetricFeedbacksNext(
        continuationToken,
        optionsBody,
        options
      );
      const feedbacks = segmentResponse.value?.map((feedback) => {
        return fromServiceMetricFeedbackUnion(feedback);
      });
      const resultArray = Object.defineProperty(feedbacks || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }
  }

  private async *listItemsOfFeedback(
    metricId: string,
    options: ListFeedbackOptions = {}
  ): AsyncIterableIterator<MetricFeedbackUnion> {
    for await (const segment of this.listSegmentsOfFeedback(
      metricId,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list feedbacks for a metric.
   *
   * `.byPage()` returns an async iterable iterator to list the feedbacks in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const feedbacks = client.listFeedback(metricId);
   * let i = 1;
   * for await (const f of feedbacks){
   *  console.log(`feedback ${i++}:`);
   *  console.log(f);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listFeedback(metricId);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` feedback - ${result.value.id}`);
   *   console.dir(result.value);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listFeedback(metricId)
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const f of page.value) {
   *      console.dir(f);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param metricId - Metric id
   * @param options - The options parameter
   */
  public listFeedback(
    metricId: string,
    options: ListFeedbackOptions = {}
  ): PagedAsyncIterableIterator<MetricFeedbackUnion, MetricFeedbackPageResponse> {
    const iter = this.listItemsOfFeedback(metricId, options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfFeedback(
          metricId,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  // # Metric

  /**
   * Gets the time series data for a metric
   * @param metricId - Metric id
   * @param startTime - The start of the time range to retrieve series data
   * @param endTime - The end of the time range to retrieve series data
   * @param seriesToFilter - A list of time series to retrieve their data
   * @param options - The options parameter
   */
  public async getMetricSeriesData(
    metricId: string,
    startTime: Date | string,
    endTime: Date | string,
    seriesToFilter: DimensionKey[],
    options: GetMetricSeriesDataOptions = {}
  ): Promise<GetMetricSeriesDataResponse> {
    const optionsBody = {
      startTime: typeof startTime === "string" ? new Date(startTime) : startTime,
      endTime: typeof endTime === "string" ? new Date(endTime) : endTime,
      series: seriesToFilter
    };
    const result = await this.client.getMetricData(metricId, optionsBody, options);
    const resultArray =
      result.value?.map((s) => {
        return {
          definition: { metricId: s.id!.metricId!, dimension: s.id!.dimension! },
          timestamps: s.timestampList,
          values: s.valueList
        };
      }) || [];
    Object.defineProperty(resultArray, "_response", {
      enumerable: false,
      value: result._response
    });

    return resultArray as GetMetricSeriesDataResponse;
  }

  private async *listSegmentsOfMetricSeriesDefinitions(
    metricId: string,
    activeSince: Date,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListMetricSeriesDefinitionsOptions = {}
  ): AsyncIterableIterator<MetricSeriesPageResponse> {
    let segmentResponse;
    const optionsBody = {
      activeSince: activeSince,
      dimensionFilter: options.dimensionFilter
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getMetricSeries(metricId, optionsBody, {
        ...options,
        top: maxPageSize
      });
      const definitions = segmentResponse.value?.map((d) => {
        return {
          metricId: d.metricId!,
          dimension: d.dimension!
        };
      });
      const resultArray = Object.defineProperty(definitions || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getMetricSeriesNext(
        continuationToken,
        optionsBody,
        options
      );
      const definitions = segmentResponse.value?.map((d) => {
        return {
          metricId: d.metricId!,
          dimension: d.dimension!
        };
      });
      const resultArray = Object.defineProperty(definitions || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }
  }

  private async *listItemsOfMetricSeriesDefinitions(
    metricId: string,
    activeSince: Date,
    options: ListMetricSeriesDefinitionsOptions
  ): AsyncIterableIterator<MetricSeriesDefinition> {
    for await (const segment of this.listSegmentsOfMetricSeriesDefinitions(
      metricId,
      activeSince,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list series definitions (dimension combinations) for a metric.
   *
   * `.byPage()` returns an async iterable iterator to list the series definitions in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const definitions = client.listMetricSeriesDefinitions(metricId, activeSince);
   * let i = 1;
   * for await (const definition of definitions){
   *  console.log(`definition ${i++}:`);
   *  console.log(definition);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listMetricSeriesDefinitions(metricId, activeSince);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` definition - ${result.value.metricId} ${result.value.dimension}`);
   *   console.dir(result.value);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listMetricSeriesDefinitions(metricId, activeSince).byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *   if (page.value) {
   *     console.log(`-- page ${i++}`);
   *     for (const definition of page.value) {
   *       console.dir(definition);
   *     }
   *   }
   *   page = await pages.next();
   * }
   * ```
   * @param metricId - Metric id
   * @param activeSince - Definitions of series ingested after this time are returned
   * @param options - The options parameter.
   */
  public listMetricSeriesDefinitions(
    metricId: string,
    activeSince: Date | string,
    options: ListMetricSeriesDefinitionsOptions = {}
  ): PagedAsyncIterableIterator<MetricSeriesDefinition, MetricSeriesPageResponse> {
    const iter = this.listItemsOfMetricSeriesDefinitions(
      metricId,
      typeof activeSince === "string" ? new Date(activeSince) : activeSince,
      options
    );
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfMetricSeriesDefinitions(
          metricId,
          typeof activeSince === "string" ? new Date(activeSince) : activeSince,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  private async *listSegmentsOfMetricDimensionValues(
    metricId: string,
    dimensionName: string,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListMetricDimensionValuesOptions = {}
  ): AsyncIterableIterator<DimensionValuesPageResponse> {
    let segmentResponse;
    const optionsBody = {
      dimensionName: dimensionName
    };

    if (continuationToken === undefined) {
      segmentResponse = await this.client.getMetricDimension(metricId, optionsBody, {
        ...options,
        top: maxPageSize
      });
      const resultArray = Object.defineProperty(segmentResponse.value || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getMetricDimensionNext(
        continuationToken,
        optionsBody,
        options
      );
      const resultArray = Object.defineProperty(segmentResponse.value || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink
      });
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }
  }

  private async *listItemsOfMetricDimensionValues(
    metricId: string,
    dimensionName: string,
    options: ListMetricDimensionValuesOptions
  ): AsyncIterableIterator<string> {
    for await (const segment of this.listSegmentsOfMetricDimensionValues(
      metricId,
      dimensionName,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the values for a metric dimension.
   *
   * `.byPage()` returns an async iterable iterator to list the values in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const values = client.listMetricDimensionValues(metricId, dimensionName);
   * let i = 1;
   * for await (const v of values){
   *   console.log(`dimension value ${i++}:`);
   *   console.log(v);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listMetricDimensionValues(metricId, dimensionName);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` dimension value - ${result.value}`);
   *   console.dir(result.value);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listMetricDimensionValues(metricId, dimensionName).byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *   if (page.value) {
   *     console.log(`-- page ${i++}`);
   *     for (const dv of page.value) {
   *       console.dir(dv);
   *     }
   *   }
   *   page = await pages.next();
   * }
   * ```
   * @param metricId - Anomaly detection configuration id
   * @param dimensionName - Name of the dimension to list value
   * @param options - The options parameter.
   */ public listMetricDimensionValues(
    metricId: string,
    dimensionName: string,
    options: ListMetricDimensionValuesOptions = {}
  ): PagedAsyncIterableIterator<string, DimensionValuesPageResponse> {
    const iter = this.listItemsOfMetricDimensionValues(metricId, dimensionName, options);

    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfMetricDimensionValues(
          metricId,
          dimensionName,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }

  private async *listSegmentsOfMetricEnrichmentStatus(
    metricId: string,
    startTime: Date,
    endTime: Date,
    continuationToken?: string,
    maxPageSize?: number,
    options: ListMetricEnrichmentStatusOptions = {}
  ): AsyncIterableIterator<MetricEnrichmentStatusPageResponse> {
    let segmentResponse;
    const optionsBody = {
      startTime: startTime,
      endTime: endTime
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getEnrichmentStatusByMetric(metricId, optionsBody, {
        ...options,
        top: maxPageSize
      });
      const resultArray = Object.defineProperty(
        segmentResponse.value?.map((s) => {
          return {
            timestamp: s.timestamp?.getTime(),
            status: s.status,
            message: s.message
          };
        }) || [],
        "continuationToken",
        {
          enumerable: true,
          value: segmentResponse.nextLink
        }
      );
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getEnrichmentStatusByMetricNext(
        continuationToken,
        optionsBody,
        options
      );
      const resultArray = Object.defineProperty(
        segmentResponse.value?.map((s) => {
          return {
            timestamp: s.timestamp?.getTime(),
            status: s.status,
            message: s.message
          };
        }) || [],
        "continuationToken",
        {
          enumerable: true,
          value: segmentResponse.nextLink
        }
      );
      yield Object.defineProperty(resultArray, "_response", {
        enumerable: false,
        value: segmentResponse._response
      });

      continuationToken = segmentResponse.nextLink;
    }
  }

  private async *listItemsOfMetricEnrichmentStatus(
    metricId: string,
    startTime: Date,
    endTime: Date,
    options: ListMetricEnrichmentStatusOptions
  ): AsyncIterableIterator<EnrichmentStatus> {
    for await (const segment of this.listSegmentsOfMetricEnrichmentStatus(
      metricId,
      startTime,
      endTime,
      undefined,
      undefined,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list incidents for an anomaly detection configuration.
   *
   * `.byPage()` returns an async iterable iterator to list the incidents in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const statusList = client.listMetricEnrichmentStatus(metricId, startTime, endTime);
   * let i = 1;
   * for await (const status of statusList){
   *   console.log(`enrichment status ${i++}:`);
   *   console.log(status);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listMetricEnrichmentStatus(metricId, startTime, endTime);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` enrichment status - ${result.value.status} ${result.value.message}`);
   *   console.dir(result.value);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listMetricEnrichmentStatus(metricId, startTime, endTime)
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const status of page.value) {
   *      console.dir(status);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param metricId - Metric id
   * @param startTime - The start of time range to query for enrichment status
   * @param endTime - The end of time range to query for enrichment status
   * @param options - The options parameter.
   */
  public listMetricEnrichmentStatus(
    metricId: string,
    startTime: Date | string,
    endTime: Date | string,
    options: ListMetricEnrichmentStatusOptions = {}
  ): PagedAsyncIterableIterator<EnrichmentStatus, MetricEnrichmentStatusPageResponse> {
    const iter = this.listItemsOfMetricEnrichmentStatus(
      metricId,
      typeof startTime === "string" ? new Date(startTime) : startTime,
      typeof endTime === "string" ? new Date(endTime) : endTime,
      options
    );
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns An AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfMetricEnrichmentStatus(
          metricId,
          typeof startTime === "string" ? new Date(startTime) : startTime,
          typeof endTime === "string" ? new Date(endTime) : endTime,
          settings.continuationToken,
          settings.maxPageSize,
          options
        );
      }
    };
  }
}
