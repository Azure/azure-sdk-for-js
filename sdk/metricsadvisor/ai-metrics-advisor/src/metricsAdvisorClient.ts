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

import { GeneratedClient } from "./generated/generatedClient";
import { createSpan } from "./tracing";
import { MetricsAdvisorKeyCredential } from "./metricsAdvisorKeyCredentialPolicy";
import { CanonicalCode } from "@opentelemetry/api";
import {
  MetricFeedbackUnion,
  AnomalyIncident,
  DataPointAnomaly,
  AnomalyAlert,
  GetMetricEnrichedSeriesDataResponse,
  GetIncidentRootCauseResponse,
  GetFeedbackResponse,
  ListAlertsForAlertConfigurationPageResponse,
  ListAnomaliesForAlertPageResponse,
  ListIncidentsForAlertPageResponse,
  ListAnomaliesForDetectionConfigurationPageResponse,
  ListDimensionValuesForDetectionConfigurationPageResponse,
  ListIncidentsByDetectionConfigurationPageResponse,
  ListMetricSeriesPageResponse,
  ListMetricEnrichmentStatusPageResponse,
  MetricSeriesDefinition,
  DimensionKey,
  GetMetricSeriesDataResponse,
  ListMetricDimensionValuesPageResponse,
  ListMetricFeedbackPageResponse,
  AlertQueryTimeMode
} from "./models";
import {
  SeverityFilterCondition,
  EnrichmentStatus,
  FeedbackType,
  FeedbackQueryTimeMode
} from "./generated/models";
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

export type GetMetricEnrichedSeriesDataOptions = {} & OperationOptions;

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

export type ListDimensionValuesForDetectionConfigurationOptions = {
  skip?: number;
  dimensionFilter?: DimensionKey;
} & OperationOptions;

/**
 * Options for listing feedbacks
 */

export type ListFeedbacksOptions = {
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
    startTime?: Date;
    /**
     * end time filter under chosen time mode
     */
    endTime?: Date;
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
   * filter specfic dimension name and values
   */
  dimensionFilter?: Record<string, string[]>;
} & OperationOptions;

/**
 * Options for retreiving metric series data
 */

export type GetMetricSeriesDataOptions = {} & OperationOptions;

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
   * @internal
   * @ignore
   * A reference to service client options.
   */
  private readonly pipeline: ServiceClientOptions;

  /**
   * @internal
   * @ignore
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
   * @param {string} endpointUrl Url to an Azure Metrics Advisor service endpoint
   * @param {MetricsAdvisorKeyCredential} credential Used to authenticate requests to the service.
   * @param {MetricsAdvisorClientOptions} [options] Used to configure the Metrics Advisor client.
   */
  constructor(
    endpointUrl: string,
    credential: MetricsAdvisorKeyCredential,
    options: MetricsAdvisorClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.pipeline = createClientPipeline(credential, options);
    this.client = new GeneratedClient(this.endpointUrl, this.pipeline);
  }

  /**
   * @private
   * List alert segments for alerting configuration
   */
  private async *listSegmentOfAlertsForAlertingConfig(
    alertConfigId: string,
    startTime: Date,
    endTime: Date,
    timeMode: AlertQueryTimeMode,
    continuationToken?: string,
    options: ListAlertsOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListAlertsForAlertConfigurationPageResponse> {
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
          top: options?.maxPageSize
        }
      );
      const alerts = segmentResponse.value?.map((a) => {
        return {
          id: a.alertId!,
          alertConfigId: alertConfigId,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          timestamp: a.timestamp
        };
      });
      yield {
        alerts,
        _response: segmentResponse._response
      };
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
          timestamp: a.timestamp
        };
      });
      yield {
        alerts,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * @private
   * List alert items for alerting configuration
   */
  private async *listItemsOfAlertsForAlertingConfig(
    alertConfigId: string,
    startTime: Date,
    endTime: Date,
    timeMode: AlertQueryTimeMode,
    options: ListAlertsOptions
  ): AsyncIterableIterator<AnomalyAlert> {
    for await (const segment of this.listSegmentOfAlertsForAlertingConfig(
      alertConfigId,
      startTime,
      endTime,
      timeMode,
      undefined,
      options
    )) {
      if (segment?.alerts) {
        yield* segment.alerts;
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
   * const alerts = client.listAlertsForAlertConfiguration(alertConfigId,
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
   * let iter = client.listAlertsForAlertConfiguration(alertConfigId, startTime, endTime, timeMode);
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
   * const pages = client.listAlertsForAlertConfiguration(alertConfigId, startTime, endTime, timeMode)
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.alerts) {
   *    console.log(`-- page ${i++}`);
   *    for (const alert of page.value.alerts) {
   *      console.log(`${alert}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param alertConfigId  anomaly alerting configuration unique id
   * @param startTime The start of time range to query alert items for alerting configuration
   * @param endTime The end of time range to query alert items for alerting configuration
   * @param timeMode Query time mode - "AnomalyTime" | "CreatedTime" | "ModifiedTime"
   * @param options The options parameter.
   */

  public listAlertsForAlertConfiguration(
    alertConfigId: string,
    startTime: Date,
    endTime: Date,
    timeMode: AlertQueryTimeMode,
    options: ListAlertsOptions = {}
  ): PagedAsyncIterableIterator<AnomalyAlert, ListAlertsForAlertConfigurationPageResponse> {
    const iter = this.listItemsOfAlertsForAlertingConfig(
      alertConfigId,
      startTime,
      endTime,
      timeMode,
      options
    );
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentOfAlertsForAlertingConfig(
          alertConfigId,
          startTime,
          endTime,
          timeMode,
          settings.continuationToken,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          }
        );
      }
    };
  }

  /**
   * @private
   * List anomalies for alerting configuration - segments
   */
  private async *listSegmentsOfAnomaliesForAlert(
    alertConfigId: string,
    alertId: string,
    continuationToken?: string,
    options: ListAnomaliesForAlertConfigurationOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListAnomaliesForAlertPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getAnomaliesFromAlertByAnomalyAlertingConfiguration(
        alertConfigId,
        alertId,
        {
          ...options,
          top: options.maxPageSize
        }
      );
      const anomalies = segmentResponse.value?.map((a) => {
        return {
          detectionConfigurationId: a.anomalyDetectionConfigurationId!,
          metricId: a.metricId,
          timestampe: a.timestamp,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus,
          timestamp: a.timestamp
        };
      });
      yield {
        anomalies,
        _response: segmentResponse._response
      };
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
          top: options.maxPageSize
        }
      );
      const anomalies = segmentResponse.value?.map((a) => {
        return {
          detectionConfigurationId: a.anomalyDetectionConfigurationId!,
          metricId: a.metricId,
          timestampe: a.timestamp,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus,
          timestamp: a.timestamp
        };
      });
      yield {
        anomalies,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * @private
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
      options
    )) {
      if (segment.anomalies) {
        yield* segment.anomalies;
      }
    }
  }

  private listAnomaliesForAlert(
    alert: AnomalyAlert,
    options: ListAnomaliesForAlertConfigurationOptions = {}
  ): PagedAsyncIterableIterator<DataPointAnomaly, ListAnomaliesForAlertPageResponse> {
    const iter = this.listItemsOfAnomaliesForAlert(alert.alertConfigId, alert.id, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfAnomaliesForAlert(
          alert.alertConfigId,
          alert.id,
          settings.continuationToken,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          }
        );
      }
    };
  }

  /**
   * @private
   * listing incidents for alert - segments
   */
  private async *listSegmentsOfIncidentsForAlert(
    alertConfigId: string,
    alertId: string,
    continuationToken?: string,
    options: ListIncidentsForAlertOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListIncidentsForAlertPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getIncidentsFromAlertByAnomalyAlertingConfiguration(
        alertConfigId,
        alertId,
        {
          ...options,
          top: options.maxPageSize
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
      yield {
        incidents,
        _response: segmentResponse._response
      };
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
          top: options.maxPageSize
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
      yield {
        incidents,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * @private
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
      options
    )) {
      if (segment.incidents) {
        yield* segment.incidents;
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
   *  if (page.value.incidents) {
   *    console.log(`-- page ${i++}`);
   *    for (const incident of page.value.incidents) {
   *      console.dir(incident);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param alert Anomaly alert containing alertConfigId and id
   * @param options The options parameter.
   */
  public listIncidents(
    alert: AnomalyAlert,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListIncidentsForAlertOptions
  ): PagedAsyncIterableIterator<AnomalyIncident, ListIncidentsForAlertPageResponse>;
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
   *  if (page.value.incidents) {
   *    console.log(`-- page ${i++}`);
   *    for (const incident of page.value.incidents) {
   *      console.dir(incident);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param detectionConfigId  Anomaly detection configuration id
   * @param startTime The start of time range to query for incidents
   * @param endTime The end of time range to query for incidents
   * @param options The options parameter.
   */
  public listIncidents(
    detectionConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListIncidentsForDetectionConfigurationOptions
  ): PagedAsyncIterableIterator<AnomalyIncident, ListIncidentsByDetectionConfigurationPageResponse>;

  public listIncidents(
    alertOrDetectionConfigId: AnomalyAlert | string,
    optionsOrStartTime?: ListIncidentsForAlertOptions | Date | string,
    endTime?: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListIncidentsForDetectionConfigurationOptions
  ):
    | PagedAsyncIterableIterator<AnomalyIncident, ListIncidentsForAlertPageResponse>
    | PagedAsyncIterableIterator<
        AnomalyIncident,
        ListIncidentsByDetectionConfigurationPageResponse
      > {
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
  ): PagedAsyncIterableIterator<AnomalyIncident, ListIncidentsForAlertPageResponse> {
    const iter = this.listItemsOfIncidentsForAlert(alert.alertConfigId, alert.id, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfIncidentsForAlert(
          alert.alertConfigId,
          alert.id,
          settings.continuationToken,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          }
        );
      }
    };
  }

  /**
   * Retrieves enriched metric series data for a detection configuration
   *
   * @param detectionConfigId Anomaly detection configuration id
   * @param startTime The start of time range to query metric enriched series data
   * @param endTime The end of time range to query metric enriched series data
   * @param seriesToFilter Series to retrieve their data
   * @param options The options parameter.
   */
  public async getMetricEnrichedSeriesData(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    seriesToFilter: DimensionKey[],
    options: GetMetricEnrichedSeriesDataOptions = {}
  ): Promise<GetMetricEnrichedSeriesDataResponse> {
    const optionsBody = {
      startTime: startTime,
      endTime: endTime,
      series: seriesToFilter.map((s) => {
        return { dimension: s };
      })
    };
    const result = await this.client.getSeriesByAnomalyDetectionConfiguration(
      detectionConfigId,
      optionsBody,
      options
    );
    return {
      results: result.value.map((d) => {
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
      }),
      _response: result._response
    };
  }

  /**
   * @private
   * listing anomalies for detection config - segments
   */

  private async *listSegmentsOfAnomaliesForDetectionConfig(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListAnomaliesForDetectionConfigurationOptions & { maxPageSize?: number },
    continuationToken?: string
  ): AsyncIterableIterator<ListAnomaliesForDetectionConfigurationPageResponse> {
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
          top: options.maxPageSize
        }
      );
      const anomalies = segmentResponse.value?.map((a) => {
        return {
          detectionConfigurationId: detectionConfigId,
          metricId: a.metricId,
          timestamp: a.timestamp,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus
        };
      });
      yield {
        anomalies,
        _response: segmentResponse._response
      };
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
          timestamp: a.timestamp,
          createdOn: a.createdTime,
          modifiedOn: a.modifiedTime,
          seriesKey: a.dimension,
          severity: a.property.anomalySeverity,
          status: a.property.anomalyStatus
        };
      });
      yield {
        anomalies,
        _response: segmentResponse._response
      };
    }
  }

  /**
   * @private
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
      options
    )) {
      if (segment.anomalies) {
        yield* segment.anomalies;
      }
    }
  }

  private listAnomaliesForDetectionConfiguration(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListAnomaliesForDetectionConfigurationOptions = {}
  ): PagedAsyncIterableIterator<
    DataPointAnomaly,
    ListAnomaliesForDetectionConfigurationPageResponse
  > {
    const iter = this.listItemsOfAnomaliesForDetectionConfig(
      detectionConfigId,
      startTime,
      endTime,
      options
    );
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfAnomaliesForDetectionConfig(
          detectionConfigId,
          startTime,
          endTime,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          },
          settings.continuationToken
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
   *  if (page.value.anomalies) {
   *    console.log(`-- page ${i++}`);
   *    for (const anomaly of page.value.anomalies) {
   *      console.log(`${anomaly}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param alert Anomaly alert containing alertConfigId and id
   * @param options The options parameter.
   */
  public listAnomalies(
    alert: AnomalyAlert,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListAnomaliesForAlertConfigurationOptions
  ): PagedAsyncIterableIterator<DataPointAnomaly, ListAnomaliesForAlertPageResponse>;

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
   *  if (page.value.anomalies) {
   *    console.log(`-- page ${i++}`);
   *    for (const anomaly of page.value.anomalies) {
   *      console.dir(anomaly);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param detectionConfigId Anomaly detection configuration id
   * @param startTime The start of time range to query anomalies
   * @param endTime The end of time range to query anomalies
   * @param options The options parameter.
   */
  public listAnomalies(
    detectionConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListAnomaliesForDetectionConfigurationOptions
  ): PagedAsyncIterableIterator<
    DataPointAnomaly,
    ListAnomaliesForDetectionConfigurationPageResponse
  >;
  public listAnomalies(
    alertOrDetectionConfigId: AnomalyAlert | string,
    optionsOrStartTime?: ListAnomaliesForAlertConfigurationOptions | Date | string,
    endTime?: Date | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListAnomaliesForDetectionConfigurationOptions
  ):
    | PagedAsyncIterableIterator<DataPointAnomaly, ListAnomaliesForAlertPageResponse>
    | PagedAsyncIterableIterator<
        DataPointAnomaly,
        ListAnomaliesForDetectionConfigurationPageResponse
      > {
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

  // ## list dimension values for detection config - segments
  private async *listSegmentsOfDimensionValuesForDetectionConfig(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    dimensionName: string,
    continuationToken?: string,
    options: ListDimensionValuesForDetectionConfigurationOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListDimensionValuesForDetectionConfigurationPageResponse> {
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
          top: options?.maxPageSize
        }
      );
      yield {
        dimensionValues: segmentResponse.value,
        _response: segmentResponse._response
      };
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
      yield {
        dimensionValues: segmentResponse.value,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  // ## list dimension values for detection config - items
  private async *listItemsOfDimensionValues(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    dimensionName: string,
    options: ListDimensionValuesForDetectionConfigurationOptions
  ): AsyncIterableIterator<string> {
    for await (const segment of this.listSegmentsOfDimensionValuesForDetectionConfig(
      detectionConfigId,
      startTime,
      endTime,
      dimensionName,
      undefined,
      options
    )) {
      if (segment.dimensionValues) {
        yield* segment.dimensionValues;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list dimension values for a detection configuration.
   *
   * `.byPage()` returns an async iterable iterator to list the dimension values in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const dimensionValues = client
   *   .listDimensionValuesForDetectionConfiguration(detectionConfigId, startTime, endTime, dimensionName);
   * let i = 1;
   * for await (const dv of dimensionValues) {
   *   console.log(`dimension value ${i++}: ${dv}`);
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client
   *   .listDimensionValuesForDetectionConfiguration(detectionConfigId, startTime, endTime, dimensionName);
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
   *   .listDimensionValuesForDetectionConfiguration(
   *     detectionConfigId,
   *     startTime,
   *     endTime,
   *     dimensionName
   *   )
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *   if (page.value.dimensionValues) {
   *     console.log(`-- page ${i++}`);
   *     for (const dv of page.value.dimensionValues) {
   *       console.log(` dimension value - '${result.value}'`);
   *     }
   *   }
   *   page = await pages.next();
   * }
   * ```
   * @param detectionConfigId  Anomaly detection configuration id
   * @param startTime The start of time range to query anomalies
   * @param endTime The end of time range to query anomalies
   * @param options The options parameter.
   */
  public listDimensionValuesForDetectionConfiguration(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    dimensionName: string,
    options: ListDimensionValuesForDetectionConfigurationOptions = {}
  ): PagedAsyncIterableIterator<string, ListDimensionValuesForDetectionConfigurationPageResponse> {
    const iter = this.listItemsOfDimensionValues(
      detectionConfigId,
      startTime,
      endTime,
      dimensionName,
      options
    );
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfDimensionValuesForDetectionConfig(
          detectionConfigId,
          startTime,
          endTime,
          dimensionName,
          settings.continuationToken,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          }
        );
      }
    };
  }

  // ## listing incidents for detection config - segments
  private async *listSegmentsOfIncidentsForDetectionConfig(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListIncidentsForDetectionConfigurationOptions & { maxPageSize?: number },
    continuationToken?: string
  ): AsyncIterableIterator<ListIncidentsByDetectionConfigurationPageResponse> {
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
          top: options?.maxPageSize
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
      yield {
        incidents,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }

    while (continuationToken) {
      segmentResponse = await this.client.getIncidentsByAnomalyDetectionConfigurationNext(
        detectionConfigId,
        optionsBody,
        continuationToken,
        {
          ...options,
          top: options?.maxPageSize
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
      yield {
        incidents,
        _response: segmentResponse._response
      };
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
      options
    )) {
      if (segment.incidents) {
        yield* segment.incidents;
      }
    }
  }

  private listIncidentsForDetectionConfiguration(
    detectionConfigId: string,
    startTime: Date,
    endTime: Date,
    options: ListIncidentsForDetectionConfigurationOptions = {}
  ): PagedAsyncIterableIterator<
    AnomalyIncident,
    ListIncidentsByDetectionConfigurationPageResponse
  > {
    const iter = this.listItemsOfIncidentsForDetectionConfig(
      detectionConfigId,
      startTime,
      endTime,
      options
    );
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfIncidentsForDetectionConfig(
          detectionConfigId,
          startTime,
          endTime,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          },
          settings.continuationToken
        );
      }
    };
  }

  /**
   * Gets the root causes of an incident.
   *
   * @param detectionConfigId Anomaly detection configuration id
   * @param incidentId Incident id
   * @param options The options parameter
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
        code: CanonicalCode.UNKNOWN,
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
   * @param feedback content of the feedback
   * @param options The options parameter
   */
  public async createMetricFeedback(
    feedback: MetricFeedbackUnion,
    options: OperationOptions = {}
  ): Promise<GetFeedbackResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createMetricFeedback",
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
      return this.getMetricFeedback(feedbackId);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrives a metric feedback for the given feedback id.
   * @param id Id of the feedback to retrieve
   * @param options The options parameter
   */
  public async getMetricFeedback(
    id: string,
    options: OperationOptions = {}
  ): Promise<GetFeedbackResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getMetricFeedback",
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
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listSegmentsOfMetricFeedbacks(
    metricId: string,
    continuationToken?: string,
    options: ListFeedbacksOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListMetricFeedbackPageResponse> {
    let segmentResponse;
    const optionsBody = {
      metricId,
      dimensionFilter: options.filter?.dimensionFilter
        ? { dimension: options.filter?.dimensionFilter }
        : undefined,
      feedbackType: options.filter?.feedbackType,
      startTime: options.filter?.startTime,
      endTime: options.filter?.endTime,
      timeMode: options.filter?.timeMode
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.listMetricFeedbacks(optionsBody, {
        ...options,
        top: options?.maxPageSize
      });
      const feedbacks = segmentResponse.value?.map((feedback) => {
        return fromServiceMetricFeedbackUnion(feedback);
      });
      yield {
        feedbacks,
        _response: segmentResponse._response
      };
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
      yield {
        feedbacks,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  private async *listItemsOfMetricFeedback(
    metricId: string,
    options: ListFeedbacksOptions = {}
  ): AsyncIterableIterator<MetricFeedbackUnion> {
    for await (const segment of this.listSegmentsOfMetricFeedbacks(metricId, undefined, options)) {
      if (segment.feedbacks) {
        yield* segment.feedbacks;
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
   * const feedbacks = client.listMetricFeedbacks(metricId);
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
   * let iter = client.listMetricFeedbacks(metricId);
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
   * const pages = client.listMetricFeedbacks(metricId)
   *   .byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.feedbacks) {
   *    console.log(`-- page ${i++}`);
   *    for (const f of page.value.feedbacks) {
   *      console.dir(f);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param metricId Metric id
   * @param options The options parameter
   */
  public listMetricFeedbacks(
    metricId: string,
    options: ListFeedbacksOptions = {}
  ): PagedAsyncIterableIterator<MetricFeedbackUnion, ListMetricFeedbackPageResponse> {
    const iter = this.listItemsOfMetricFeedback(metricId, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfMetricFeedbacks(metricId, settings.continuationToken, {
          ...options,
          maxPageSize: settings.maxPageSize
        });
      }
    };
  }

  // # Metric

  /**
   * Gets the time series data for a metric
   * @param metricId Metric id
   * @param startTime The start of the time range to retrieve series data
   * @param endTime The end of the time range to retrieve series data
   * @param seriesToFilter A list of time series to retrieve their data
   * @param options The optiosn parameter
   */
  public async getMetricSeriesData(
    metricId: string,
    startTime: Date,
    endTime: Date,
    seriesToFilter: DimensionKey[],
    options: GetMetricSeriesDataOptions = {}
  ): Promise<GetMetricSeriesDataResponse> {
    const optionsBody = {
      startTime: startTime,
      endTime: endTime,
      series: seriesToFilter
    };
    const result = await this.client.getMetricData(metricId, optionsBody, options);

    return {
      metricSeriesDataList: result.value?.map((s) => {
        return {
          definition: { metricId: s.id!.metricId!, dimension: s.id!.dimension! },
          timestamps: s.timestampList,
          values: s.valueList
        };
      }),
      _response: result._response
    };
  }

  private async *listSegmentsOfMetricSeriesDefinitions(
    metricId: string,
    activeSince: Date,
    options: ListMetricSeriesDefinitionsOptions & { maxPageSize?: number },
    continuationToken?: string
  ): AsyncIterableIterator<ListMetricSeriesPageResponse> {
    let segmentResponse;
    const optionsBody = {
      activeSince: activeSince,
      dimensionFilter: options.dimensionFilter
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getMetricSeries(metricId, optionsBody, {
        ...options,
        top: options?.maxPageSize
      });
      const definitions = segmentResponse.value?.map((d) => {
        return {
          metricId: d.metricId!,
          dimension: d.dimension!
        };
      });
      yield {
        definitions,
        _response: segmentResponse._response
      };
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
      yield {
        definitions,
        _response: segmentResponse._response
      };
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
      options
    )) {
      if (segment?.definitions) {
        yield* segment.definitions;
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
   *   if (page.value.definitions) {
   *     console.log(`-- page ${i++}`);
   *     for (const definition of page.value.definitions) {
   *       console.dir(definition);
   *     }
   *   }
   *   page = await pages.next();
   * }
   * ```
   * @param metricId Metric id
   * @param activeSince Definitions of series ingested after this time are returned
   * @param options The options parameter.
   */
  public listMetricSeriesDefinitions(
    metricId: string,
    activeSince: Date,
    options: ListMetricSeriesDefinitionsOptions = {}
  ): PagedAsyncIterableIterator<MetricSeriesDefinition, ListMetricSeriesPageResponse> {
    const iter = this.listItemsOfMetricSeriesDefinitions(metricId, activeSince, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfMetricSeriesDefinitions(
          metricId,
          activeSince,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          },
          settings.continuationToken
        );
      }
    };
  }

  private async *listSegmentsOfMetricDimensionValues(
    metricId: string,
    dimensionName: string,
    options: ListMetricDimensionValuesOptions & { maxPageSize?: number },
    continuationToken?: string
  ): AsyncIterableIterator<ListMetricDimensionValuesPageResponse> {
    let segmentResponse;
    const optionsBody = {
      dimensionName: dimensionName
    };

    if (continuationToken === undefined) {
      segmentResponse = await this.client.getMetricDimension(metricId, optionsBody, {
        ...options,
        top: options?.maxPageSize
      });
      yield {
        dimensionValues: segmentResponse.value,
        _response: segmentResponse._response
      };
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
      yield {
        dimensionValues: segmentResponse.value,
        _response: segmentResponse._response
      };
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
      options
    )) {
      if (segment?.dimensionValues) {
        yield* segment.dimensionValues;
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
   *   if (page.value.dimensionValues) {
   *     console.log(`-- page ${i++}`);
   *     for (const dv of page.value.dimensionValues) {
   *       console.dir(dv);
   *     }
   *   }
   *   page = await pages.next();
   * }
   * ```
   * @param metricId  Anomaly detection configuration id
   * @param dimensionName Name of the dimension to list value
   * @param options The options parameter.
   */ public listMetricDimensionValues(
    metricId: string,
    dimensionName: string,
    options: ListMetricDimensionValuesOptions = {}
  ): PagedAsyncIterableIterator<string, ListMetricDimensionValuesPageResponse> {
    const iter = this.listItemsOfMetricDimensionValues(metricId, dimensionName, options);

    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfMetricDimensionValues(
          metricId,
          dimensionName,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          },
          settings.continuationToken
        );
      }
    };
  }

  private async *listSegmentsOfMetricEnrichmentStatus(
    metricId: string,
    startTime: Date,
    endTime: Date,
    continuationToken?: string,
    options: ListMetricEnrichmentStatusOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListMetricEnrichmentStatusPageResponse> {
    let segmentResponse;
    const optionsBody = {
      startTime: startTime,
      endTime: endTime
    };
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getEnrichmentStatusByMetric(metricId, optionsBody, {
        ...options,
        top: options?.maxPageSize
      });

      yield { statusList: segmentResponse.value, _response: segmentResponse._response };
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
      yield { statusList: segmentResponse.value, _response: segmentResponse._response };
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
      options
    )) {
      if (segment.statusList) {
        yield* segment.statusList;
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
   *  if (page.value.statusList) {
   *    console.log(`-- page ${i++}`);
   *    for (const status of page.value.statusList) {
   *      console.dir(status);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param metricId Metric id
   * @param startTime The start of time range to query for enrichment status
   * @param endTime The end of time range to query for enrichment status
   * @param options The options parameter.
   */
  public listMetricEnrichmentStatus(
    metricId: string,
    startTime: Date,
    endTime: Date,
    options: ListMetricEnrichmentStatusOptions = {}
  ): PagedAsyncIterableIterator<EnrichmentStatus, ListMetricEnrichmentStatusPageResponse> {
    const iter = this.listItemsOfMetricEnrichmentStatus(metricId, startTime, endTime, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfMetricEnrichmentStatus(
          metricId,
          startTime,
          endTime,
          settings.continuationToken,
          {
            ...options,
            maxPageSize: settings.maxPageSize
          }
        );
      }
    };
  }
}
