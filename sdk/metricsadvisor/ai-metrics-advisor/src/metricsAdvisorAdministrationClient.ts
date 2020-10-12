// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  PipelineOptions,
  operationOptionsToRequestOptionsBase,
  ServiceClientOptions,
  OperationOptions,
  RestResponse
} from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import "@azure/core-paging";

import { logger } from "./logger";
import { createSpan } from "./tracing";
import { MetricsAdvisorKeyCredential } from "./metricsAdvisorKeyCredentialPolicy";
import { createClientPipeline } from "./createClientPipeline";
import { CanonicalCode } from "@opentelemetry/api";
import { GeneratedClient } from "./generated/generatedClient";
import {
  IngestionStatus,
  DataFeedGranularity,
  DataFeedOptions,
  DataFeed,
  DataFeedPatch,
  WebhookHook,
  EmailHook,
  WebhookHookPatch,
  EmailHookPatch,
  AnomalyDetectionConfiguration,
  AnomalyAlertConfiguration,
  GetDataFeedResponse,
  GetAnomalyDetectionConfigurationResponse,
  GetAnomalyAlertConfigurationResponse,
  GetHookResponse,
  HookUnion,
  DataFeedRollupMethod,
  ListDataFeedsPageResponse,
  ListDataFeedIngestionStatusPageResponse,
  ListAnomalyAlertConfigurationsPageResponse,
  ListAnomalyDetectionConfigurationsPageResponse,
  ListHooksPageResponse
} from "./models";
import {
  DataSourceType,
  EntityStatus,
  GeneratedClientGetIngestionProgressResponse,
  NeedRollupEnum
} from "./generated/models";
import {
  fromServiceAnomalyDetectionConfiguration,
  fromServiceDataFeedDetailUnion,
  fromServiceHookInfoUnion,
  fromServiceAlertConfiguration,
  toServiceRollupSettings
} from "./transforms";
/**
 * Client options used to configure API requests.
 */
export interface MetricsAdvisorAdministrationClientOptions extends PipelineOptions {}

/**
 * Options for listing data feed ingestion status
 */
export type ListDataFeedIngestionStatusOptions = {
  skip?: number;
} & OperationOptions;

/**
 * Options for listing hooks
 */
export type ListHooksOptions = {
  skip?: number;
  /**
   * filter hook by its name
   */
  hookName?: string;
} & OperationOptions;

/**
 * Options for listing data feeds
 */
export type ListDataFeedsOptions = {
  skip?: number;
  filter?: {
    /**
     * filter data feed by its name
     */
    dataFeedName?: string;
    /**
     * filter data feed by its source type
     */
    dataSourceType?: DataSourceType;
    /**
     * filter data feed by its granularity
     */
    granularity?: DataFeedGranularity;
    /**
     * filter data feed by its status
     */
    status?: EntityStatus;
    /**
     * filter data feed by its creator
     */
    creator?: string;
  };
} & OperationOptions;

/**
 * Options for creating data feed
 */
export type CreateDataFeedOptions = DataFeedOptions & OperationOptions;

/**
 * Client class for interacting with Azure Metrics Advisor Service to perform management operations
 */
export class MetricsAdvisorAdministrationClient {
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
   * Creates an instance of MetricsAdvisorAdministrationClient.
   *
   * Example usage:
   * ```ts
   * import { MetricsAdvisorAdministrationClient, MetricsAdvisorKeyCredential } from "@azure/ai-metrics-advisor";
   *
   * const client = new MetricsAdvisorAdministrationClient(
   *    "<service endpoint>",
   *    new MetricsAdvisorKeyCredential("<subscription key>", "<api key>")
   * );
   * ```
   * @param {string} endpointUrl Url to an Azure Metrics Advisor service endpoint
   * @param {MetricsAdvisorKeyCredential} credential Used to authenticate requests to the service.
   * @param {MetricsAdvisorAdministrationClientOptions} [options] Used to configure the Metrics Advisor client.
   */
  constructor(
    endpointUrl: string,
    credential: MetricsAdvisorKeyCredential,
    options: MetricsAdvisorAdministrationClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.pipeline = createClientPipeline(credential, options);
    this.client = new GeneratedClient(this.endpointUrl, this.pipeline);
  }

  /**
   * Adds a new data feed for a specifc data source and provided settings
   * @param feed the data feed object to create
   * @param options The options parameter.
   */

  public async createDataFeed(
    feed: Omit<DataFeed, "id" | "metricIds" | "isAdmin" | "status" | "creator" | "createdTime">,
    operationOptions: OperationOptions = {}
  ): Promise<GetDataFeedResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createDataFeed",
      operationOptions
    );
    const { name, granularity, source, schema, ingestionSettings, options } = feed;

    const needRollup: NeedRollupEnum | undefined =
      options?.rollupSettings?.rollupType === "AutoRollup"
        ? "NeedRollup"
        : options?.rollupSettings?.rollupType === "AlreadyRollup"
        ? "AlreadyRollup"
        : options?.rollupSettings?.rollupType === "NoRollup"
        ? "NoRollup"
        : undefined;
    const rollUpColumns: string[] | undefined =
      options?.rollupSettings?.rollupType === "AutoRollup"
        ? options?.rollupSettings.autoRollupGroupByColumnNames
        : undefined;
    const allUpIdentification: string | undefined =
      options?.rollupSettings?.rollupType === "AutoRollup" ||
      options?.rollupSettings?.rollupType === "AlreadyRollup"
        ? options?.rollupSettings.rollupIdentificationValue
        : undefined;
    const rollUpMethod: DataFeedRollupMethod | undefined =
      options?.rollupSettings?.rollupType === "AutoRollup"
        ? options?.rollupSettings.rollupMethod
        : undefined;
    const fillMissingPointType = options?.missingDataPointFillSettings?.fillType;
    const fillMissingPointValue =
      options?.missingDataPointFillSettings?.fillType === "CustomValue"
        ? options?.missingDataPointFillSettings.customFillValue
        : undefined;
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const body = {
        dataFeedName: name,
        granularityName: granularity.granularityType,
        granularityAmount:
          granularity.granularityType === "Custom" ? granularity.customGranularityValue : undefined,
        ...source,
        metrics: schema.metrics,
        dimension: schema.dimensions,
        timestampColumn: schema.timestampColumn,
        dataStartFrom: ingestionSettings.ingestionStartTime,
        startOffsetInSeconds: ingestionSettings.ingestionStartOffsetInSeconds,
        maxConcurrency: ingestionSettings.dataSourceRequestConcurrency,
        minRetryIntervalInSeconds: ingestionSettings.ingestionRetryDelayInSeconds,
        stopRetryAfterInSeconds: ingestionSettings.stopRetryAfterInSeconds,
        needRollup,
        rollUpColumns,
        allUpIdentification,
        rollUpMethod,
        fillMissingPointType,
        fillMissingPointValue,
        viewMode: options?.accessMode,
        ...finalOptions
      };
      const result = await this.client.createDataFeed(body, requestOptions);
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const feedId = result.location.substring(lastSlashIndex + 1);
      return this.getDataFeed(feedId);
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
   * Retrieves data feed for the given data feed id
   * @param id id for the data feed to retrieve
   * @param options The options parameter.
   */

  public async getDataFeed(
    id: string,
    options: OperationOptions = {}
  ): Promise<GetDataFeedResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getDataFeed",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getDataFeedById(id, requestOptions);
      const resultDataFeed: DataFeed = fromServiceDataFeedDetailUnion(result);
      return { ...resultDataFeed, _response: result._response };
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
   * Returns an async iterable iterator to list data feeds based on options
   *
   * `.byPage()` returns an async iterable iterator to list the blobs in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorAdministrationClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const dataFeedList = client.listDataFeeds({
   * filter: { // filter
   *  dataFeedName: "js-blob-datafeed"
   *  }
   * });
   * let i = 1;
   * for await (const datafeed of dataFeedList){
   *  console.log(`datafeed ${i++}:`);
   *  console.log(datafeed);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listDataFeeds();
   * let dataFeedItem = await iter.next();
   * while (!dataFeedItem.done) {
   *   console.log(`id :${dataFeedItem.value.id}, name: ${dataFeedItem.value.name}`);
   *   dataFeedItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listDataFeeds().byPage({ maxPageSize: 10 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.dataFeeds) {
   *    console.log(`-- page ${i++}`);
   *    for (const feed of page.value.dataFeeds) {
   *      console.log(`  ${feed.id} - ${feed.name}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param options The options parameter.
   */

  public listDataFeeds(
    options: ListDataFeedsOptions = {}
  ): PagedAsyncIterableIterator<DataFeed, ListDataFeedsPageResponse> {
    const iter = this.listItemsOfDataFeeds(options);
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
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentsOfDataFeeds(
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
   * @private
   */
  private async *listItemsOfDataFeeds(
    options: ListDataFeedsOptions
  ): AsyncIterableIterator<DataFeed> {
    for await (const segment of this.listSegmentsOfDataFeeds(options)) {
      if (segment?.dataFeeds) {
        yield* segment.dataFeeds;
      }
    }
  }

  /**
   * @private
   */
  private async *listSegmentsOfDataFeeds(
    options: ListDataFeedsOptions & { maxPageSize?: number },
    continuationToken?: string
  ): AsyncIterableIterator<ListDataFeedsPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.listDataFeeds({
        ...options.filter,
        ...options,
        top: options?.maxPageSize
      });
      const dataFeeds = segmentResponse.value?.map((d) => {
        return fromServiceDataFeedDetailUnion(d);
      });
      yield {
        dataFeeds,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.listDataFeedsNext(continuationToken, {
        ...options.filter,
        ...options,
        top: options?.maxPageSize
      });
      const dataFeeds = segmentResponse.value?.map((d) => {
        return fromServiceDataFeedDetailUnion(d);
      });
      yield {
        dataFeeds,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * Updates a data feed given its id
   * @param dataFeedId id of the data feed to update
   * @param patch Input to the update data feed operation {@link DataFeedPatch}
   * @param options The options parameter.
   */

  public async updateDataFeed(
    dataFeedId: string,
    patch: DataFeedPatch,
    options: OperationOptions = {}
  ): Promise<GetDataFeedResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateDataFeed",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const patchBody = {
        // source
        dataSourceType: patch.source.dataSourceType,
        dataSourceParameter: patch.source.dataSourceParameter,
        // name and description
        dataFeedName: patch.name,
        dataFeedDescription: patch.options?.dataFeedDescription,
        // schema
        timestampColumn: patch.schema?.timestampColumn,
        // ingestion settings
        dataStartFrom: patch.ingestionSettings?.ingestionStartTime,
        startOffsetInSeconds: patch.ingestionSettings?.ingestionStartOffsetInSeconds,
        maxConcurrency: patch.ingestionSettings?.dataSourceRequestConcurrency,
        minRetryIntervalInSeconds: patch.ingestionSettings?.ingestionRetryDelayInSeconds,
        stopRetryAfterInSeconds: patch.ingestionSettings?.stopRetryAfterInSeconds,
        // rollup settings
        ...toServiceRollupSettings(patch.options?.rollupSettings),
        // missing point filling settings
        fillMissingPointType: patch.options?.missingDataPointFillSettings?.fillType,
        fillMissingPointValue:
          patch.options?.missingDataPointFillSettings?.fillType === "CustomValue"
            ? patch.options.missingDataPointFillSettings.customFillValue
            : undefined,
        // other options
        viewMode: patch.options?.accessMode,
        admins: patch.options?.admins,
        viewers: patch.options?.viewers,
        status: patch.options?.status,
        actionLinkTemplate: patch.options?.actionLinkTemplate
      };
      await this.client.updateDataFeed(dataFeedId, patchBody, requestOptions);
      return this.getDataFeed(dataFeedId);
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
   * Deletes a data feed for the given data feed id
   * @param id id of the data feed to delete
   * @param options The options parameter.
   */

  public async deleteDataFeed(id: string, options: OperationOptions = {}): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-deleteDataFeed",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.deleteDataFeed(id, requestOptions);
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
   * Creates an anomaly detection configuration for a given metric
   * @param config The detection configuration object to create
   * @param options The options parameter
   */
  public async createMetricAnomalyDetectionConfiguration(
    config: Omit<AnomalyDetectionConfiguration, "id">,
    options: OperationOptions = {}
  ): Promise<GetAnomalyDetectionConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createMetricAnomalyDetectionConfiguration",
      options
    );
    const {
      name,
      description,
      metricId,
      wholeSeriesDetectionCondition,
      seriesDetectionConditions,
      seriesGroupDetectionConditions
    } = config;

    try {
      const body = {
        name,
        description,
        metricId,
        wholeMetricConfiguration: wholeSeriesDetectionCondition,
        dimensionGroupOverrideConfigurations: seriesGroupDetectionConditions,
        seriesOverrideConfigurations: seriesDetectionConditions
      };
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.createAnomalyDetectionConfiguration(body, requestOptions);
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const configId = result.location.substring(lastSlashIndex + 1);
      return this.getMetricAnomalyDetectionConfiguration(configId);
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
   * Retrieves metric anomaly detection configuration for the given configuration id
   * @param id id of the detection configuration to retrieve
   * @param options The options parameter.
   */

  public async getMetricAnomalyDetectionConfiguration(
    id: string,
    options: OperationOptions = {}
  ): Promise<GetAnomalyDetectionConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getMetricAnomalyDetectionConfiguration",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getAnomalyDetectionConfiguration(id, requestOptions);
      return {
        ...fromServiceAnomalyDetectionConfiguration(result),
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
   * Updates a metric anomaly detection configuration for the given configuration id
   * @param id id of the detection configuration for metric anomaly to update
   * @param patch Input to the update anomaly detection configuration operation {@link AnomalyDetectionConfigurationPatch}
   * @param options The options parameter.
   */

  public async updateMetricAnomalyDetectionConfiguration(
    id: string,
    patch: Partial<Omit<AnomalyDetectionConfiguration, "id" | "metricId">>,
    options: OperationOptions = {}
  ): Promise<GetAnomalyDetectionConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateMetricAnomalyDetectionConfiguration",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      await this.client.updateAnomalyDetectionConfiguration(
        id,
        {
          wholeMetricConfiguration: patch.wholeSeriesDetectionCondition,
          dimensionGroupOverrideConfigurations: patch.seriesGroupDetectionConditions,
          seriesOverrideConfigurations: patch.seriesDetectionConditions,
          ...patch
        },
        requestOptions
      );
      return this.getMetricAnomalyDetectionConfiguration(id);
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
   * Deletes a metric anomaly detection configuration for the given configuration id
   * @param id id of the detection configuration to delete
   * @param options The options parameter.
   */

  public async deleteMetricAnomalyDetectionConfiguration(
    id: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-deleteMetricAnomalyDetectionConfiguration",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.deleteAnomalyDetectionConfiguration(id, requestOptions);
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
   * Creates anomaly alerting configuration for a given metric
   * @param config the alert configuration object to create
   */
  public async createAnomalyAlertConfiguration(
    config: Omit<AnomalyAlertConfiguration, "id">,
    options: OperationOptions = {}
  ): Promise<GetAnomalyAlertConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createAnomalyAlertConfiguration",
      options
    );
    const { name, description, crossMetricsOperator, hookIds, metricAlertConfigurations } = config;
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const transformedConfigurations = metricAlertConfigurations.map((c) => {
        return {
          anomalyDetectionConfigurationId: c.detectionConfigurationId,
          anomalyScopeType: c.alertScope.scopeType,
          ...c.alertScope,
          negationOperation: c.negationOperation,
          severityFilter: c.alertConditions?.severityCondition,
          snoozeFilter: c.snoozeCondition,
          valueFilter: c.alertConditions?.metricBoundaryCondition
        };
      });
      const body = {
        name,
        crossMetricsOperator,
        metricAlertingConfigurations: transformedConfigurations,
        hookIds,
        description
      };
      const result = await this.client.createAnomalyAlertingConfiguration(body, requestOptions);
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const configId = result.location.substring(lastSlashIndex + 1);
      return this.getAnomalyAlertConfiguration(configId);
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
   * Updates an anomaly alert configuration for the given configuration id
   * @param id id of the anomaly alert configuration to update
   * @param patch Input to the update anomaly alert configuration operation {@link AnomalyAlertConfigurationPatch}
   * @param options The options parameter
   */
  public async updateAnomalyAlertConfiguration(
    id: string,
    patch: Partial<Omit<AnomalyAlertConfiguration, "id">>,
    options: OperationOptions = {}
  ): Promise<GetAnomalyAlertConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateAnomalyAlertConfiguration",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const serviceMetricAlertingConfigs = patch.metricAlertConfigurations?.map((c) => {
        return {
          anomalyDetectionConfigurationId: c.detectionConfigurationId,
          anomalyScopeType: c.alertScope.scopeType,
          ...c.alertScope,
          negationOperation: c.negationOperation,
          severityFilter: c.alertConditions?.severityCondition,
          snoozeFilter: c.snoozeCondition,
          valueFilter: c.alertConditions?.metricBoundaryCondition
        };
      });
      await this.client.updateAnomalyAlertingConfiguration(
        id,
        {
          name: patch.name,
          description: patch.description,
          crossMetricsOperator: patch.crossMetricsOperator,
          hookIds: patch.hookIds,
          metricAlertingConfigurations: serviceMetricAlertingConfigs
        },
        requestOptions
      );
      return this.getAnomalyAlertConfiguration(id);
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
   * Retrieves metric anomaly alert configuration for the given configuration id
   * @param id id of the anomaly alert configuration to retrieve
   * @param options The options parameter.
   */

  public async getAnomalyAlertConfiguration(
    id: string,
    options: OperationOptions = {}
  ): Promise<GetAnomalyAlertConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getAnomalyAlertConfiguration",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getAnomalyAlertingConfiguration(id, requestOptions);
      return { ...fromServiceAlertConfiguration(result), _response: result._response };
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
   * Deletes metric anomaly alert configuration for the given configuration id
   * @param id id of the anomaly alert configuration to delete
   * @param options The options parameter.
   */

  public async deleteAnomalyAlertConfiguration(
    id: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-deleteAnomalyAlertConfiguration",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.deleteAnomalyAlertingConfiguration(id, requestOptions);
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
   * @private
   */

  private async *listSegmentsOfAlertingConfigurations(
    detectionConfigId: string,
    options: OperationOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListAnomalyAlertConfigurationsPageResponse> {
    // Service doesn't support server-side paging now
    const segment = await this.client.getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration(
      detectionConfigId,
      options
    );
    yield {
      alertConfigurations: segment.value.map((c) => fromServiceAlertConfiguration(c)),
      _response: segment._response
    };
  }

  /**
   * @private
   */

  private async *listItemsOfAlertingConfigurations(
    detectionConfigId: string,
    options: OperationOptions = {}
  ): AsyncIterableIterator<AnomalyAlertConfiguration> {
    for await (const segment of this.listSegmentsOfAlertingConfigurations(
      detectionConfigId,
      options
    )) {
      if (segment.alertConfigurations) {
        yield* segment.alertConfigurations;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list anamoly alert configurations associated with the given detection configuration.
   *
   * `.byPage()` returns an async iterable iterator to list the alert configurations in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorAdministrationClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const alertConfigurations = client.listAnomalyAlertConfigurations(detectionConfigurationId);
   * let i = 1;
   * for await (const alertConfiguration of alertConfigurations){
   *  console.log(`alertConfiguration ${i++}:`);
   *  console.log(alertConfiguration);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listAnomalyAlertConfigurations(detectionConfigurationId);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` alert - ${result.value.id}, ${result.value.name}`);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listAnomalyAlertConfigurations(detectionConfigurationId)
   *   .byPage();
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.alertConfigurations) {
   *    console.log(`-- page ${i++}`);
   *    for (const alert of page.value.alertConfigurations) {
   *      console.log(`${alert}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param detectionConfigId  anomaly detection configuration unique id
   * @param options The options parameter.
   */

  public listAnomalyAlertConfigurations(
    detectionConfigId: string,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<
    AnomalyAlertConfiguration,
    ListAnomalyAlertConfigurationsPageResponse,
    undefined // service does not support server-side paging
  > {
    const iter = this.listItemsOfAlertingConfigurations(detectionConfigId, options);
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
      byPage: () => {
        return this.listSegmentsOfAlertingConfigurations(detectionConfigId, {
          ...options
          // maxPageSize: settings.maxPageSize
        });
      }
    };
  }

  /**
   * Adds a new hook
   * @param hookInfo Information for the new hook consists of the hook type, name, description, external link and hook parameter
   * @param options The options parameter.
   */
  public async createHook(
    hookInfo: EmailHook | WebhookHook,
    options: OperationOptions = {}
  ): Promise<GetHookResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createHook",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const { hookType, name, description, externalLink, hookParameter } = hookInfo;
      const result = await this.client.createHook(
        {
          hookType,
          name,
          description,
          externalLink,
          hookParameter
        },
        requestOptions
      );
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const hookId = result.location.substring(lastSlashIndex + 1);
      return this.getHook(hookId);
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
   * Retrieves hook for the given hook id
   * @param id id for the hook to retrieve
   * @param options The options parameter.
   */

  public async getHook(id: string, options: OperationOptions = {}): Promise<GetHookResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getHook",
      options
    );
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getHook(id, requestOptions);
      const resultHookResponse: HookUnion = fromServiceHookInfoUnion(result._response.parsedBody);
      return { ...resultHookResponse, _response: result._response };
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
   * @private
   */

  private async *listSegmentOfHooks(
    continuationToken?: string,
    options: ListHooksOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListHooksPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.listHooks({
        ...options,
        top: options?.maxPageSize
      });
      yield {
        hooks: segmentResponse.value?.map((h) => fromServiceHookInfoUnion(h)),
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.listHooksNext(continuationToken, options);
      yield {
        hooks: segmentResponse.value?.map((h) => fromServiceHookInfoUnion(h)),
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * @private
   */

  private async *listItemsOfHooks(
    options: ListHooksOptions = {}
  ): AsyncIterableIterator<HookUnion> {
    for await (const segment of this.listSegmentOfHooks(undefined, options)) {
      if (segment?.hooks) {
        yield* segment.hooks;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list hooks based on options
   *
   * `.byPage()` returns an async iterable iterator to list the hooks in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorAdministrationClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const hookList = client.listHooks();
   * let i = 1;
   * for await (const hook of hookList){
   *  console.log(`hook ${i++}:`);
   *  console.log(hook);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listHooks();
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` hook - ${result.value.id}`);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listHooks().byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.hooks) {
   *    console.log(`-- page ${i++}`);
   *    for (const hook of page.value.hooks) {
   *      console.log("hook-");
   *      console.dir(hook);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param options The options parameter.
   */

  public listHooks(
    options: ListHooksOptions = {}
  ): PagedAsyncIterableIterator<HookUnion, ListHooksPageResponse> {
    const iter = this.listItemsOfHooks(options);
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
        return this.listSegmentOfHooks(settings.continuationToken, {
          ...options,
          maxPageSize: settings.maxPageSize
        });
      }
    };
  }

  /**
   * Updates hook for the given hook id
   * @param id id of the hook to update
   * @param patch Input to the update hook of type Email {@link EmailHookPatch} or WebHook {@link WebhookHookPatch}
   * @param options The options parameter
   */
  public async updateHook(
    id: string,
    patch: EmailHookPatch | WebhookHookPatch,
    options: OperationOptions = {}
  ): Promise<GetHookResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateHook",
      options
    );
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      await this.client.updateHook(id, patch, requestOptions);
      return this.getHook(id);
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
   * Deletes hook for the given hook id
   * @param id id of the hook to delete
   * @param options The options parameter
   */
  public async deleteHook(id: string, options: OperationOptions = {}): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-deleteHook",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.deleteHook(id, requestOptions);
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
   * @private
   */

  private async *listSegmentsOfDetectionConfigurations(
    metricId: string,
    options: OperationOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListAnomalyDetectionConfigurationsPageResponse> {
    // Service doesn't support server-side paging now
    const segment = await this.client.getAnomalyDetectionConfigurationsByMetric(metricId, options);
    yield {
      detectionConfigurations: segment.value.map((c) =>
        fromServiceAnomalyDetectionConfiguration(c)
      ),
      _response: segment._response
    };
  }

  /**
   * @private
   */

  private async *listItemsOfDetectionConfigurations(
    detectionConfigId: string,
    options: OperationOptions = {}
  ): AsyncIterableIterator<AnomalyDetectionConfiguration> {
    for await (const segment of this.listSegmentsOfDetectionConfigurations(
      detectionConfigId,
      options
    )) {
      if (segment.detectionConfigurations) {
        yield* segment.detectionConfigurations;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list anomaly detection configurations based on options
   *
   * `.byPage()` returns an async iterable iterator to list the anomaly detection configurations in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorAdministrationClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const anomalyDetectionList = client.listMetricAnomalyDetectionConfigurations(metricId);
   * let i = 1;
   * for await (const anomaly of anomalyDetectionList){
   *  console.log(`anomaly ${i++}:`);
   *  console.log(anomaly);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listMetricAnomalyDetectionConfigurations(metricId);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` anomaly - ${result.value.id}, ${result.value.name}`);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listMetricAnomalyDetectionConfigurations(metricId)
   *   .byPage();
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.detectionConfigurations) {
   *    console.log(`-- page ${i++}`);
   *    for (const detectionConfiguration of page.value.detectionConfigurations) {
   *      console.log("detection configuration-");
   *      console.dir(detectionConfiguration);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param metricId metric id for list of anomaly detection configurations
   * @param options The options parameter.
   */

  public listMetricAnomalyDetectionConfigurations(
    metricId: string,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<
    AnomalyDetectionConfiguration,
    ListAnomalyDetectionConfigurationsPageResponse,
    undefined // service does not support server-side paging
  > {
    const iter = this.listItemsOfDetectionConfigurations(metricId, options);
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
      byPage: () => {
        return this.listSegmentsOfDetectionConfigurations(metricId, {
          ...options
          // maxPageSize: settings.maxPageSize
        });
      }
    };
  }

  /**
   * Retrieves data feed ingestion progress for the given data feed id
   * @param dataFeedId data feed id for the ingestion progress to retrieve
   * @param options The options parameter.
   */

  public async getDataFeedIngestionProgress(
    dataFeedId: string,
    options = {}
  ): Promise<GeneratedClientGetIngestionProgressResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getDataFeedIngestionProgress",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.getIngestionProgress(dataFeedId, requestOptions);
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
   * @private
   */
  private async *listSegmentOfIngestionStatus(
    dataFeedId: string,
    startTime: Date,
    endTime: Date,
    continuationToken?: string,
    options: ListDataFeedIngestionStatusOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<ListDataFeedIngestionStatusPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.getDataFeedIngestionStatus(
        dataFeedId,
        {
          startTime,
          endTime
        },
        {
          ...options,
          top: options?.maxPageSize
        }
      );
      yield {
        statusList: segmentResponse.value,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getDataFeedIngestionStatusNext(
        continuationToken,
        {
          startTime,
          endTime
        },
        options
      );

      yield {
        statusList: segmentResponse.value,
        _response: segmentResponse._response
      };
      continuationToken = segmentResponse.nextLink;
    }
  }

  /**
   * @private
   */
  private async *listItemsOfIngestionStatus(
    dataFeedId: string,
    startTime: Date,
    endTime: Date,
    options: OperationOptions = {}
  ): AsyncIterableIterator<IngestionStatus> {
    for await (const segment of this.listSegmentOfIngestionStatus(
      dataFeedId,
      startTime,
      endTime,
      undefined,
      options
    )) {
      if (segment?.statusList) {
        yield* segment.statusList;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list data feed ingestion status based on options
   *
   * `.byPage()` returns an async iterable iterator to list the data feed ingestion status in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorAdministrationClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const ingestionStatusList = client.listDataFeedIngestionStatus(dataFeedId);
   * let i = 1;
   * for await (const ingestionStatus of ingestionStatusList){
   *  console.log(`ingestionStatus ${i++}:`);
   *  console.log(ingestionStatus);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listDataFeedIngestionStatus(dataFeedId);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` anomaly - ${result.value.timestamp}, ${result.value.status}, ${result.value.mesage}`);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listDataFeedIngestionStatus(dataFeedId).byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.statusList) {
   *    console.log(`-- page ${i++}`);
   *    for (const status of page.value.statusList) {
   *      console.log("ingestion status-");
   *      console.dir(status);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param dataFeedId data feed id for list of data feed ingestion status
   * @param startTime The start point of time range to query data ingestion status
   * @param endTime The end point of time range to query data ingestion status
   * @param options The options parameter.
   */

  public listDataFeedIngestionStatus(
    dataFeedId: string,
    startTime: Date,
    endTime: Date,
    options: ListDataFeedIngestionStatusOptions = {}
  ): PagedAsyncIterableIterator<IngestionStatus, ListDataFeedIngestionStatusPageResponse> {
    const iter = this.listItemsOfIngestionStatus(dataFeedId, startTime, endTime, options);
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
        return this.listSegmentOfIngestionStatus(
          dataFeedId,
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

  /**
   * Refreshes or resets data feed ingestion progress for the given data feed id
   * @param dataFeedId The data feed id for the ingestion progress to refresh or reset
   * @param startTime The start point of time range to query data ingestion status
   * @param endTime The end point of time range to query data ingestion status
   * @param options The options parameter.
   */

  public async refreshDataFeedIngestion(
    dataFeedId: string,
    startTime: Date,
    endTime: Date,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-refreshDataFeedIngestion",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.resetDataFeedIngestionStatus(
        dataFeedId,
        {
          startTime,
          endTime
        },
        requestOptions
      );
      logger.info(result);
      return result;
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
}
