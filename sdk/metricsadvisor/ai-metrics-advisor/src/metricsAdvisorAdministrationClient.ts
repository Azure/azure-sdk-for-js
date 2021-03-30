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
import { TokenCredential } from "@azure/core-auth";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import "@azure/core-paging";

import { logger } from "./logger";
import { createSpan } from "./tracing";
import { MetricsAdvisorKeyCredential } from "./metricsAdvisorKeyCredentialPolicy";
import { createClientPipeline } from "./createClientPipeline";
import { SpanStatusCode } from "@azure/core-tracing";
import { GeneratedClient } from "./generated/generatedClient";
import {
  IngestionStatus,
  DataFeedGranularity,
  DataFeedOptions,
  DataFeed,
  DataFeedPatch,
  WebNotificationHook,
  EmailNotificationHook,
  WebNotificationHookPatch,
  EmailNotificationHookPatch,
  AnomalyDetectionConfiguration,
  GetDataFeedResponse,
  GetAnomalyDetectionConfigurationResponse,
  GetAnomalyAlertConfigurationResponse,
  GetHookResponse,
  NotificationHookUnion,
  DataFeedRollupMethod,
  DataFeedsPageResponse,
  IngestionStatusPageResponse,
  AlertConfigurationsPageResponse,
  DetectionConfigurationsPageResponse,
  HooksPageResponse,
  DataFeedStatus,
  GetIngestionProgressResponse,
  AnomalyAlertConfiguration
} from "./models";
import { DataSourceType, HookInfoUnion, NeedRollupEnum } from "./generated/models";
import {
  fromServiceAnomalyDetectionConfiguration,
  fromServiceDataFeedDetailUnion,
  fromServiceHookInfoUnion,
  fromServiceAlertConfiguration,
  toServiceRollupSettings,
  toServiceAnomalyDetectionConfiguration,
  toServiceAnomalyDetectionConfigurationPatch,
  toServiceAlertConfiguration,
  toServiceAlertConfigurationPatch,
  toServiceGranularity
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
    status?: DataFeedStatus;
    /**
     * filter data feed by its creator
     */
    creator?: string;
  };
} & OperationOptions;

/**
 * describes the input to Create Data Feed operation
 */
export type DataFeedDescriptor = Omit<
  DataFeed,
  "id" | "metricIds" | "isAdmin" | "status" | "creator" | "createdOn"
>;

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
   * A reference to service client options.
   */
  private readonly pipeline: ServiceClientOptions;

  /**
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
   * @param endpointUrl - Url to an Azure Metrics Advisor service endpoint
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Metrics Advisor client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | MetricsAdvisorKeyCredential,
    options: MetricsAdvisorAdministrationClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.pipeline = createClientPipeline(credential, options);
    this.client = new GeneratedClient(this.endpointUrl, this.pipeline);
  }

  /**
   * Adds a new data feed for a specific data source and provided settings
   * @param feed - the data feed object to create
   * @param options - The options parameter.
   * @returns Response with Datafeed object
   */

  public async createDataFeed(
    feed: DataFeedDescriptor,
    operationOptions: OperationOptions = {}
  ): Promise<GetDataFeedResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createDataFeed",
      operationOptions
    );
    const {
      name,
      granularity,
      source,
      schema,
      ingestionSettings,
      rollupSettings,
      missingDataPointFillSettings,
      accessMode,
      adminEmails,
      viewerEmails,
      description
    } = feed;

    if (source.dataSourceType === "Unknown") {
      throw new Error("Cannot create a data feed with the Unknown source type.");
    }

    const needRollup: NeedRollupEnum | undefined =
      rollupSettings?.rollupType === "AutoRollup"
        ? "NeedRollup"
        : rollupSettings?.rollupType === "AlreadyRollup"
        ? "AlreadyRollup"
        : rollupSettings?.rollupType === "NoRollup"
        ? "NoRollup"
        : undefined;
    const rollUpColumns: string[] | undefined =
      rollupSettings?.rollupType === "AutoRollup"
        ? rollupSettings.autoRollupGroupByColumnNames
        : undefined;
    const allUpIdentification: string | undefined =
      rollupSettings?.rollupType === "AutoRollup" || rollupSettings?.rollupType === "AlreadyRollup"
        ? rollupSettings.rollupIdentificationValue
        : undefined;
    const rollUpMethod: DataFeedRollupMethod | undefined =
      rollupSettings?.rollupType === "AutoRollup" ? rollupSettings.rollupMethod : undefined;
    const fillMissingPointType = missingDataPointFillSettings?.fillType;
    const fillMissingPointValue =
      missingDataPointFillSettings?.fillType === "CustomValue"
        ? missingDataPointFillSettings.customFillValue
        : undefined;
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const body = {
        dataFeedName: name,
        ...toServiceGranularity(granularity),
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
        viewMode: accessMode,
        admins: adminEmails,
        viewers: viewerEmails,
        dataFeedDescription: description,
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves data feed for the given data feed id
   * @param id - id for the data feed to retrieve
   * @param options - The options parameter.
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
        code: SpanStatusCode.ERROR,
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
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const feed of page.value) {
   *      console.log(`  ${feed.id} - ${feed.name}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param options - The options parameter.
   */

  public listDataFeeds(
    options: ListDataFeedsOptions = {}
  ): PagedAsyncIterableIterator<DataFeed, DataFeedsPageResponse> {
    const iter = this.listItemsOfDataFeeds(options);
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

  private async *listItemsOfDataFeeds(
    options: ListDataFeedsOptions
  ): AsyncIterableIterator<DataFeed> {
    for await (const segment of this.listSegmentsOfDataFeeds(options)) {
      if (segment) {
        yield* segment;
      }
    }
  }

  private async *listSegmentsOfDataFeeds(
    options: ListDataFeedsOptions & { maxPageSize?: number },
    continuationToken?: string
  ): AsyncIterableIterator<DataFeedsPageResponse> {
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
      const resultArray = Object.defineProperty(dataFeeds || [], "continuationToken", {
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
      segmentResponse = await this.client.listDataFeedsNext(continuationToken, {
        ...options.filter,
        ...options,
        top: options?.maxPageSize
      });
      const dataFeeds = segmentResponse.value?.map((d) => {
        return fromServiceDataFeedDetailUnion(d);
      });
      const resultArray = Object.defineProperty(dataFeeds || [], "continuationToken", {
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
   * Updates a data feed given its id
   * @param dataFeedId - id of the data feed to update
   * @param patch - Input to the update data feed operation {@link DataFeedPatch}
   * @param options - The options parameter.
   */

  public async updateDataFeed(
    dataFeedId: string,
    patch: DataFeedPatch,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateDataFeed",
      options
    );
    if (patch.source.dataSourceType === "Unknown") {
      throw new Error("Cannot update a data feed to have the Unknown source type.");
    }
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const patchBody = {
        // source
        dataSourceType: patch.source.dataSourceType,
        dataSourceParameter: patch.source.dataSourceParameter,
        // name and description
        dataFeedName: patch.name,
        dataFeedDescription: patch.description,
        // schema
        timestampColumn: patch.schema?.timestampColumn,
        // ingestion settings
        dataStartFrom: patch.ingestionSettings?.ingestionStartTime,
        startOffsetInSeconds: patch.ingestionSettings?.ingestionStartOffsetInSeconds,
        maxConcurrency: patch.ingestionSettings?.dataSourceRequestConcurrency,
        minRetryIntervalInSeconds: patch.ingestionSettings?.ingestionRetryDelayInSeconds,
        stopRetryAfterInSeconds: patch.ingestionSettings?.stopRetryAfterInSeconds,
        // rollup settings
        ...toServiceRollupSettings(patch.rollupSettings),
        // missing point filling settings
        fillMissingPointType: patch.missingDataPointFillSettings?.fillType,
        fillMissingPointValue:
          patch.missingDataPointFillSettings?.fillType === "CustomValue"
            ? patch.missingDataPointFillSettings.customFillValue
            : undefined,
        // other options
        viewMode: patch.accessMode,
        admins: patch.adminEmails,
        viewers: patch.viewerEmails,
        status: patch.status,
        actionLinkTemplate: patch.actionLinkTemplate
      };
      return await this.client.updateDataFeed(dataFeedId, patchBody, requestOptions);
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
   * Deletes a data feed for the given data feed id
   * @param id - id of the data feed to delete
   * @param options - The options parameter.
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates an anomaly detection configuration for a given metric
   * @param config - The detection configuration object to create
   * @param options - The options parameter
   * @returns Response with Detection Config object
   */
  public async createDetectionConfig(
    config: Omit<AnomalyDetectionConfiguration, "id">,
    options: OperationOptions = {}
  ): Promise<GetAnomalyDetectionConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createDetectionConfig",
      options
    );
    try {
      const transformed = toServiceAnomalyDetectionConfiguration(config);
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.createAnomalyDetectionConfiguration(
        transformed,
        requestOptions
      );
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const configId = result.location.substring(lastSlashIndex + 1);
      return this.getDetectionConfig(configId);
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
   * Retrieves metric anomaly detection configuration for the given configuration id
   * @param id - id of the detection configuration to retrieve
   * @param options - The options parameter.
   */

  public async getDetectionConfig(
    id: string,
    options: OperationOptions = {}
  ): Promise<GetAnomalyDetectionConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getDetectionConfig",
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates a metric anomaly detection configuration for the given configuration id
   * @param id - id of the detection configuration for metric anomaly to update
   * @param patch - Input to the update anomaly detection configuration operation {@link AnomalyDetectionConfigurationPatch}
   * @param options - The options parameter.
   */

  public async updateDetectionConfig(
    id: string,
    patch: Partial<Omit<AnomalyDetectionConfiguration, "id" | "metricId">>,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateDetectionConfig",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const transformed = toServiceAnomalyDetectionConfigurationPatch(patch);
      return await this.client.updateAnomalyDetectionConfiguration(id, transformed, requestOptions);
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
   * Deletes a metric anomaly detection configuration for the given configuration id
   * @param id - id of the detection configuration to delete
   * @param options - The options parameter.
   */

  public async deleteDetectionConfig(
    id: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-deleteDetectionConfig",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.deleteAnomalyDetectionConfiguration(id, requestOptions);
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
   * Creates anomaly alerting configuration for a given metric
   * @param config - The alert configuration object to create
   * @returns Response with Alert object
   */
  public async createAlertConfig(
    config: Omit<AnomalyAlertConfiguration, "id">,
    options: OperationOptions = {}
  ): Promise<GetAnomalyAlertConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createAlertConfig",
      options
    );
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const transformed = toServiceAlertConfiguration(config);
      const result = await this.client.createAnomalyAlertingConfiguration(
        transformed,
        requestOptions
      );
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const configId = result.location.substring(lastSlashIndex + 1);
      return this.getAlertConfig(configId);
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
   * Updates an anomaly alert configuration for the given configuration id
   * @param id - id of the anomaly alert configuration to update
   * @param patch - Input to the update anomaly alert configuration operation {@link AnomalyAlertConfigurationPatch}
   * @param options - The options parameter
   */
  public async updateAlertConfig(
    id: string,
    patch: Partial<Omit<AnomalyAlertConfiguration, "id">>,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateAlertConfig",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const transformed = toServiceAlertConfigurationPatch(patch);
      return await this.client.updateAnomalyAlertingConfiguration(id, transformed, requestOptions);
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
   * Retrieves metric anomaly alert configuration for the given configuration id
   * @param id - id of the anomaly alert configuration to retrieve
   * @param options - The options parameter.
   */

  public async getAlertConfig(
    id: string,
    options: OperationOptions = {}
  ): Promise<GetAnomalyAlertConfigurationResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getAlertConfig",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getAnomalyAlertingConfiguration(id, requestOptions);
      return { ...fromServiceAlertConfiguration(result), _response: result._response };
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
   * Deletes metric anomaly alert configuration for the given configuration id
   * @param id - id of the anomaly alert configuration to delete
   * @param options - The options parameter.
   */

  public async deleteAlertConfig(
    id: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-deleteAlertConfig",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.deleteAnomalyAlertingConfiguration(id, requestOptions);
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

  private async *listSegmentsOfAlertingConfigurations(
    detectionConfigId: string,
    options: OperationOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<AlertConfigurationsPageResponse> {
    // Service doesn't support server-side paging now
    const segment = await this.client.getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration(
      detectionConfigId,
      options
    );

    const alertConfigurations = segment.value.map((c) => fromServiceAlertConfiguration(c));
    yield Object.defineProperty(alertConfigurations, "_response", {
      enumerable: false,
      value: segment._response
    });
  }

  private async *listItemsOfAlertingConfigurations(
    detectionConfigId: string,
    options: OperationOptions = {}
  ): AsyncIterableIterator<AnomalyAlertConfiguration> {
    for await (const segment of this.listSegmentsOfAlertingConfigurations(
      detectionConfigId,
      options
    )) {
      if (segment) {
        yield* segment;
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
   * const alertConfigurations = client.listAlertConfigs(detectionConfigurationId);
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
   * let iter = client.listAlertConfigs(detectionConfigurationId);
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
   * const pages = client.listAlertConfigs(detectionConfigurationId)
   *   .byPage();
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value.alertConfigurations) {
   *    console.log(`-- page ${i++}`);
   *    for (const alert of page.value) {
   *      console.log(`${alert}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param detectionConfigId - anomaly detection configuration unique id
   * @param options - The options parameter.
   */

  public listAlertConfigs(
    detectionConfigId: string,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<
    AnomalyAlertConfiguration,
    AlertConfigurationsPageResponse,
    undefined // service does not support server-side paging
  > {
    const iter = this.listItemsOfAlertingConfigurations(detectionConfigId, options);
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
       * Returns an AsyncIterableIterator that works a page at a time
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
   * @param hookInfo - Information for the new hook consists of the hook type, name, description, external link and hook parameter
   * @param options - The options parameter.
   * @returns  Response with Hook object
   */
  public async createHook(
    hookInfo: EmailNotificationHook | WebNotificationHook,
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
        } as HookInfoUnion,
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves hook for the given hook id
   * @param id - id for the hook to retrieve
   * @param options - The options parameter.
   */

  public async getHook(id: string, options: OperationOptions = {}): Promise<GetHookResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getHook",
      options
    );
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const result = await this.client.getHook(id, requestOptions);
      const resultHookResponse: NotificationHookUnion = fromServiceHookInfoUnion(
        result._response.parsedBody
      );
      return { ...resultHookResponse, _response: result._response };
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

  private async *listSegmentOfHooks(
    continuationToken?: string,
    maxPageSize?: number,
    options: ListHooksOptions = {}
  ): AsyncIterableIterator<HooksPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.listHooks({
        ...options,
        top: maxPageSize
      });
      const hooks = segmentResponse.value?.map((h) => fromServiceHookInfoUnion(h)) || [];
      const resultArray = Object.defineProperty(hooks, "continuationToken", {
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
      segmentResponse = await this.client.listHooksNext(continuationToken, options);
      const hooks = segmentResponse.value?.map((h) => fromServiceHookInfoUnion(h)) || [];
      const resultArray = Object.defineProperty(hooks, "continuationToken", {
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

  private async *listItemsOfHooks(
    options: ListHooksOptions = {}
  ): AsyncIterableIterator<NotificationHookUnion> {
    for await (const segment of this.listSegmentOfHooks(undefined, undefined, options)) {
      yield* segment;
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
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const hook of page.value) {
   *      console.log("hook-");
   *      console.dir(hook);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param options - The options parameter.
   */

  public listHooks(
    options: ListHooksOptions = {}
  ): PagedAsyncIterableIterator<NotificationHookUnion, HooksPageResponse> {
    const iter = this.listItemsOfHooks(options);
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
        return this.listSegmentOfHooks(settings.continuationToken, settings.maxPageSize, options);
      }
    };
  }

  /**
   * Updates hook for the given hook id
   * @param id - id of the hook to update
   * @param patch - Input to the update hook of type Email {@link EmailHookPatch} or WebHook {@link WebhookHookPatch}
   * @param options - The options parameter
   */
  public async updateHook(
    id: string,
    patch: EmailNotificationHookPatch | WebNotificationHookPatch,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateHook",
      options
    );
    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      return await this.client.updateHook(id, patch, requestOptions);
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
   * Deletes hook for the given hook id
   * @param id - id of the hook to delete
   * @param options - The options parameter
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listSegmentsOfDetectionConfigurations(
    metricId: string,
    options: OperationOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<DetectionConfigurationsPageResponse> {
    // Service doesn't support server-side paging now
    const segment = await this.client.getAnomalyDetectionConfigurationsByMetric(metricId, options);
    const configs = segment.value.map((c) => fromServiceAnomalyDetectionConfiguration(c));
    const resultArray = Object.defineProperty(configs, "_response", {
      enumerable: false,
      value: segment._response
    });
    yield resultArray;
  }

  private async *listItemsOfDetectionConfigurations(
    detectionConfigId: string,
    options: OperationOptions = {}
  ): AsyncIterableIterator<AnomalyDetectionConfiguration> {
    for await (const segment of this.listSegmentsOfDetectionConfigurations(
      detectionConfigId,
      options
    )) {
      if (segment) {
        yield* segment;
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
   * const anomalyDetectionList = client.listDetectionConfigs(metricId);
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
   * let iter = client.listDetectionConfigs(metricId);
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
   * const pages = client.listDetectionConfigs(metricId)
   *   .byPage();
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const detectionConfiguration of page.value) {
   *      console.log("detection configuration-");
   *      console.dir(detectionConfiguration);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param metricId - metric id for list of anomaly detection configurations
   * @param options - The options parameter.
   */

  public listDetectionConfigs(
    metricId: string,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<
    AnomalyDetectionConfiguration,
    DetectionConfigurationsPageResponse,
    undefined // service does not support server-side paging
  > {
    const iter = this.listItemsOfDetectionConfigurations(metricId, options);
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
   * @param dataFeedId - data feed id for the ingestion progress to retrieve
   * @param options - The options parameter.
   */

  public async getDataFeedIngestionProgress(
    dataFeedId: string,
    options = {}
  ): Promise<GetIngestionProgressResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getDataFeedIngestionProgress",
      options
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const response = await this.client.getIngestionProgress(dataFeedId, requestOptions);
      return {
        latestActiveTimestamp: response.latestActiveTimestamp?.getTime(),
        latestSuccessTimestamp: response.latestSuccessTimestamp?.getTime(),
        _response: response._response
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

  private async *listSegmentOfIngestionStatus(
    dataFeedId: string,
    startTime: Date,
    endTime: Date,
    continuationToken?: string,
    options: ListDataFeedIngestionStatusOptions & { maxPageSize?: number } = {}
  ): AsyncIterableIterator<IngestionStatusPageResponse> {
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
      segmentResponse = await this.client.getDataFeedIngestionStatusNext(
        continuationToken,
        {
          startTime,
          endTime
        },
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

  /**
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
      if (segment) {
        yield* segment;
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
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const status of page.value) {
   *      console.log("ingestion status-");
   *      console.dir(status);
   *    }
   *  }
   *  page = await pages.next();
   * }
   *
   * ```
   * @param dataFeedId - data feed id for list of data feed ingestion status
   * @param startTime - The start point of time range to query data ingestion status
   * @param endTime - The end point of time range to query data ingestion status
   * @param options - The options parameter.
   */

  public listDataFeedIngestionStatus(
    dataFeedId: string,
    startTime: Date | string,
    endTime: Date | string,
    options: ListDataFeedIngestionStatusOptions = {}
  ): PagedAsyncIterableIterator<IngestionStatus, IngestionStatusPageResponse> {
    const iter = this.listItemsOfIngestionStatus(
      dataFeedId,
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
       * @returns an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegmentOfIngestionStatus(
          dataFeedId,
          typeof startTime === "string" ? new Date(startTime) : startTime,
          typeof endTime === "string" ? new Date(endTime) : endTime,
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
   * @param dataFeedId - The data feed id for the ingestion progress to refresh or reset
   * @param startTime - The start point of time range to query data ingestion status
   * @param endTime - The end point of time range to query data ingestion status
   * @param options - The options parameter.
   */

  public async refreshDataFeedIngestion(
    dataFeedId: string,
    startTime: Date | string,
    endTime: Date | string,
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
          startTime: typeof startTime === "string" ? new Date(startTime) : startTime,
          endTime: typeof endTime === "string" ? new Date(endTime) : endTime
        },
        requestOptions
      );
      logger.info(result);
      return result;
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
}
