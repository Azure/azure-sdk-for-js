// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions,
} from "@azure/core-rest-pipeline";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import "@azure/core-paging";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import {
  createMetricsAdvisorKeyCredentialPolicy,
  MetricsAdvisorKeyCredential,
} from "./metricsAdvisorKeyCredentialPolicy";
import { SpanStatusCode } from "@azure/core-tracing";
import { GeneratedClient } from "./generated/generatedClient";
import {
  IngestionStatus,
  DataFeedGranularity,
  MetricsAdvisorDataFeed,
  DataFeedPatch,
  WebNotificationHook,
  EmailNotificationHook,
  WebNotificationHookPatch,
  EmailNotificationHookPatch,
  AnomalyDetectionConfiguration,
  AnomalyDetectionConfigurationPatch,
  NotificationHookUnion,
  DataFeedAutoRollupMethod,
  DataFeedsPageResponse,
  IngestionStatusPageResponse,
  AlertConfigurationsPageResponse,
  DetectionConfigurationsPageResponse,
  HooksPageResponse,
  DataFeedStatus,
  GetIngestionProgressResponse,
  AnomalyAlertConfiguration,
  DataSourceCredentialEntityUnion,
  DataSourceCredentialPatch,
  CredentialsPageResponse,
  RestResponse,
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
  toServiceGranularity,
  toServiceCredentialPatch,
  toServiceCredential,
  fromServiceCredential,
  toServiceDataFeedSource,
  toServiceDataFeedSourcePatch,
} from "./transforms";
import {
  DEFAULT_COGNITIVE_SCOPE,
  MetricsAdvisorLoggingAllowedHeaderNames,
  MetricsAdvisorLoggingAllowedQueryParameters,
} from "./constants";
import { ExtendedCommonClientOptions } from "@azure/core-http-compat";

/**
 * Client options used to configure API requests.
 */
export interface MetricsAdvisorAdministrationClientOptions extends ExtendedCommonClientOptions {}

/**
 * Options for listing data feed ingestion status
 */
export interface ListDataFeedIngestionStatusOptions extends OperationOptions {
  /** Number of items to skip */
  skip?: number;
}

/**
 * Options for listing hooks
 */
export interface ListHooksOptions extends OperationOptions {
  /** Number of items to skip */
  skip?: number;
  /**
   * filter hook by its name
   */
  hookName?: string;
}

/**
 * Options for listing data source credentials
 */
export interface ListDataSourceCredentialsOptions extends OperationOptions {
  /** Number of items to skip */
  skip?: number;
}

/**
 * Options for listing data feeds
 */
export interface ListDataFeedsOptions extends OperationOptions {
  /** Number of items to skip */
  skip?: number;
  /** Filters for listing datafeeds */
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
}

/**
 * describes the input to Create Data Feed operation
 */
export type DataFeedDescriptor = Omit<
  MetricsAdvisorDataFeed,
  "id" | "metricIds" | "isAdmin" | "status" | "creator" | "createdOn"
>;

/**
 * Options for creating data feed
 */
export interface CreateDataFeedOptions extends OperationOptions {}

/**
 * Client class for interacting with Azure Metrics Advisor Service to perform management operations
 */
export class MetricsAdvisorAdministrationClient {
  /**
   * Url to service endpoint
   */
  public readonly endpointUrl: string;

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
    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: MetricsAdvisorLoggingAllowedHeaderNames,
        additionalAllowedQueryParameters: MetricsAdvisorLoggingAllowedQueryParameters,
      },
    };
    this.client = new GeneratedClient(this.endpointUrl, internalPipelineOptions);
    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_COGNITIVE_SCOPE })
      : createMetricsAdvisorKeyCredentialPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Adds a new data feed for a specific data source and provided settings
   * @param feed - the data feed object to create
   * @param options - The options parameter.
   * @returns Response with Datafeed object
   */
  public async createDataFeed(
    feed: DataFeedDescriptor,
    operationOptions: CreateDataFeedOptions = {}
  ): Promise<MetricsAdvisorDataFeed> {
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
      admins,
      viewers,
      description,
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
    const rollUpMethod: DataFeedAutoRollupMethod | undefined =
      rollupSettings?.rollupType === "AutoRollup" ? rollupSettings.rollupMethod : undefined;
    const fillMissingPointType = missingDataPointFillSettings?.fillType;
    const fillMissingPointValue =
      missingDataPointFillSettings?.fillType === "CustomValue"
        ? missingDataPointFillSettings.customFillValue
        : undefined;
    try {
      const body = {
        dataFeedName: name,
        ...toServiceGranularity(granularity),
        ...toServiceDataFeedSource(source),
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
        admins: admins,
        viewers: viewers,
        dataFeedDescription: description,
        ...finalOptions,
      };
      const result = await this.client.createDataFeed(body, finalOptions);
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created configuration");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const feedId = result.location.substring(lastSlashIndex + 1);
      return this.getDataFeed(feedId);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
  ): Promise<MetricsAdvisorDataFeed> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getDataFeed",
      options
    );

    try {
      const result = await this.client.getDataFeedById(id, finalOptions);
      const resultDataFeed: MetricsAdvisorDataFeed = fromServiceDataFeedDetailUnion(result);
      return resultDataFeed;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
  ): PagedAsyncIterableIterator<MetricsAdvisorDataFeed, DataFeedsPageResponse> {
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
            maxPageSize: settings.maxPageSize,
          },
          settings.continuationToken
        );
      },
    };
  }

  private async *listItemsOfDataFeeds(
    options: ListDataFeedsOptions
  ): AsyncIterableIterator<MetricsAdvisorDataFeed> {
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
        maxpagesize: options.maxPageSize,
        ...options,
      });
      const dataFeeds = segmentResponse.value?.map((d) => {
        return fromServiceDataFeedDetailUnion(d);
      });
      const resultArray = Object.defineProperty(dataFeeds || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink,
      });
      yield resultArray;

      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.listDataFeedsNext(continuationToken, {
        ...options.filter,
        maxpagesize: options.maxPageSize,
        ...options,
      });
      const dataFeeds = segmentResponse.value?.map((d) => {
        return fromServiceDataFeedDetailUnion(d);
      });
      const resultArray = Object.defineProperty(dataFeeds || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink,
      });
      yield resultArray;

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
  ): Promise<MetricsAdvisorDataFeed> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateDataFeed",
      options
    );
    if (patch.source.dataSourceType === "Unknown") {
      throw new Error("Cannot update a data feed to have the Unknown source type.");
    }
    try {
      const patchBody = {
        // source
        ...toServiceDataFeedSourcePatch(patch.source),
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
        admins: patch.admins,
        viewers: patch.viewers,
        status: patch.status,
        actionLinkTemplate: patch.actionLinkTemplate,
      };
      const result = await this.client.updateDataFeed(dataFeedId, patchBody, finalOptions);
      const resultDataFeed: MetricsAdvisorDataFeed = fromServiceDataFeedDetailUnion(result);
      return resultDataFeed;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
      const response = await getRawResponse(() => this.client.deleteDataFeed(id, finalOptions), {
        ...options,
      });
      return { _response: response.rawResponse };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
  ): Promise<AnomalyDetectionConfiguration> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createDetectionConfig",
      options
    );
    try {
      const transformed = toServiceAnomalyDetectionConfiguration(config);
      const result = await this.client.createAnomalyDetectionConfiguration(
        transformed,
        finalOptions
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
        message: e.message,
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
  ): Promise<AnomalyDetectionConfiguration> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getDetectionConfig",
      options
    );

    try {
      const result = await this.client.getAnomalyDetectionConfiguration(id, finalOptions);
      return fromServiceAnomalyDetectionConfiguration(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
    patch: AnomalyDetectionConfigurationPatch,
    options: OperationOptions = {}
  ): Promise<AnomalyDetectionConfiguration> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateDetectionConfig",
      options
    );

    try {
      const transformed = toServiceAnomalyDetectionConfigurationPatch(patch);
      const result = await this.client.updateAnomalyDetectionConfiguration(
        id,
        transformed,
        finalOptions
      );
      return fromServiceAnomalyDetectionConfiguration(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
      const response = await getRawResponse(
        () => this.client.deleteAnomalyDetectionConfiguration(id, finalOptions),
        {
          ...options,
        }
      );
      return { _response: response.rawResponse };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
  ): Promise<AnomalyAlertConfiguration> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createAlertConfig",
      options
    );
    try {
      const transformed = toServiceAlertConfiguration(config);
      const result = await this.client.createAnomalyAlertingConfiguration(
        transformed,
        finalOptions
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
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates an anomaly alert configuration for the given configuration id
   * @param id - id of the anomaly alert configuration to update
   * @param patch - Input to the update anomaly alert configuration operation
   * @param options - The options parameter
   */
  public async updateAlertConfig(
    id: string,
    patch: Partial<Omit<AnomalyAlertConfiguration, "id">>,
    options: OperationOptions = {}
  ): Promise<AnomalyAlertConfiguration> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateAlertConfig",
      options
    );

    try {
      const transformed = toServiceAlertConfigurationPatch(patch);
      const result = await this.client.updateAnomalyAlertingConfiguration(
        id,
        transformed,
        finalOptions
      );
      return fromServiceAlertConfiguration(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
  ): Promise<AnomalyAlertConfiguration> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getAlertConfig",
      options
    );

    try {
      const result = await this.client.getAnomalyAlertingConfiguration(id, finalOptions);
      return fromServiceAlertConfiguration(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
      const response = await getRawResponse(
        () => this.client.deleteAnomalyAlertingConfiguration(id, finalOptions),
        {
          ...options,
        }
      );
      return { _response: response.rawResponse };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
    const segment =
      await this.client.getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration(
        detectionConfigId,
        options
      );

    const alertConfigurations = segment.value?.map((c) => fromServiceAlertConfiguration(c)) ?? [];
    yield alertConfigurations;
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
          ...options,
          // maxPageSize: settings.maxPageSize
        });
      },
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
  ): Promise<NotificationHookUnion> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createHook",
      options
    );

    try {
      const { hookType, name, description, externalLink, admins, hookParameter } = hookInfo;
      const result = await this.client.createHook(
        {
          hookType,
          name,
          description,
          externalLink,
          admins,
          hookParameter,
        } as HookInfoUnion,
        finalOptions
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
        message: e.message,
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

  public async getHook(id: string, options: OperationOptions = {}): Promise<NotificationHookUnion> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getHook",
      options
    );
    try {
      const result = await this.client.getHook(id, finalOptions);
      const resultHookResponse: NotificationHookUnion = fromServiceHookInfoUnion(result);
      return resultHookResponse;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
        maxpagesize: maxPageSize,
      });
      const hooks = segmentResponse.value?.map((h) => fromServiceHookInfoUnion(h)) || [];
      const resultArray = Object.defineProperty(hooks, "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink,
      });
      yield resultArray;
      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.listHooksNext(continuationToken, options);
      const hooks = segmentResponse.value?.map((h) => fromServiceHookInfoUnion(h)) || [];
      const resultArray = Object.defineProperty(hooks, "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink,
      });
      yield resultArray;
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
      },
    };
  }

  /**
   * Updates hook for the given hook id
   * @param id - id of the hook to update
   * @param patch - Input to the update hook of type Email {@link EmailNotificationHookPatch} or WebHook {@link WebhookNotificationHookPatch}
   * @param options - The options parameter
   */
  public async updateHook(
    id: string,
    patch: EmailNotificationHookPatch | WebNotificationHookPatch,
    options: OperationOptions = {}
  ): Promise<NotificationHookUnion> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateHook",
      options
    );
    try {
      const result = await this.client.updateHook(id, patch, finalOptions);
      const resultHookResponse: NotificationHookUnion = fromServiceHookInfoUnion(result);
      return resultHookResponse;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
      const response = await getRawResponse(() => this.client.deleteHook(id, finalOptions), {
        ...options,
      });
      return { _response: response.rawResponse };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
    const configs = segment.value?.map((c) => fromServiceAnomalyDetectionConfiguration(c)) ?? [];
    const resultArray = configs;
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
          ...options,
          // maxPageSize: settings.maxPageSize
        });
      },
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
      const response = await this.client.getIngestionProgress(dataFeedId, finalOptions);
      return {
        latestActiveTimestamp: response.latestActiveTimestamp?.getTime(),
        latestSuccessTimestamp: response.latestSuccessTimestamp?.getTime(),
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
          endTime,
        },
        {
          ...options,
          maxpagesize: options?.maxPageSize,
        }
      );
      const resultArray = Object.defineProperty(
        segmentResponse.value?.map((s) => {
          return {
            timestamp: s.timestamp?.getTime(),
            status: s.status,
            message: s.message,
          };
        }) || [],
        "continuationToken",
        {
          enumerable: true,
          value: segmentResponse.nextLink,
        }
      );
      yield resultArray;

      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.getDataFeedIngestionStatusNext(
        continuationToken,
        {
          startTime,
          endTime,
        },
        options
      );

      const resultArray = Object.defineProperty(
        segmentResponse.value?.map((s) => {
          return {
            timestamp: s.timestamp?.getTime(),
            status: s.status,
            message: s.message,
          };
        }) || [],
        "continuationToken",
        {
          enumerable: true,
          value: segmentResponse.nextLink,
        }
      );
      yield resultArray;

      continuationToken = segmentResponse.nextLink;
    }
  }

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
            maxPageSize: settings.maxPageSize,
          }
        );
      },
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
      const response = await getRawResponse(
        () =>
          this.client.resetDataFeedIngestionStatus(
            dataFeedId,
            {
              startTime: typeof startTime === "string" ? new Date(startTime) : startTime,
              endTime: typeof endTime === "string" ? new Date(endTime) : endTime,
            },
            finalOptions
          ),
        {
          ...options,
        }
      );
      logger.info(response);
      return { _response: response.rawResponse };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates data source credential for the given id
   * @param dataSourceCredential - the credential entity object to create
   * @param options - The options parameter
   */
  public async createDataSourceCredential(
    dataSourceCredential: DataSourceCredentialEntityUnion,
    options: OperationOptions = {}
  ): Promise<DataSourceCredentialEntityUnion> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-createDataSourceCredential",
      options
    );
    try {
      // transformation
      const transformedCred = toServiceCredential(dataSourceCredential);
      const result = await this.client.createCredential(transformedCred, finalOptions);
      if (!result.location) {
        throw new Error("Expected a valid location to retrieve the created credential entity");
      }
      const lastSlashIndex = result.location.lastIndexOf("/");
      const credEntityId = result.location.substring(lastSlashIndex + 1);
      return this.getDataSourceCredential(credEntityId);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves data source credential for the given id
   * @param id - id of the credential entity to retrieve
   * @param options - The options parameter
   */

  public async getDataSourceCredential(
    id: string,
    options: OperationOptions = {}
  ): Promise<DataSourceCredentialEntityUnion> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-getDataSourceCredential",
      options
    );
    try {
      const result = await this.client.getCredential(id, finalOptions);
      const resultCred = fromServiceCredential(result);
      return resultCred;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an async iterable iterator to list data source credentials based on options
   *
   * `.byPage()` returns an async iterable iterator to list the credentials in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new MetricsAdvisorAdministrationClient(endpoint,
   *   new MetricsAdvisorKeyCredential(subscriptionKey, apiKey));
   * const dataSourceCredentialList = client.listDataSourceCredential();
   * let i = 1;
   * for await (const dataSourceCredential of dataSourceCredentialList){
   *  console.log(`dataSourceCredential ${i++}:`);
   *  console.log(dataSourceCredential);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listDataSourceCredential();
   * let result = await iter.next();
   * while (!result.done) {
   *   console.dir(result);
   *   result = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * const pages = client.listDataSourceCredential().byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const credential of page.value) {
   *      console.log("dataSource credential-");
   *      console.dir(credential);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   */
  public listDataSourceCredential(
    options: ListDataSourceCredentialsOptions = {}
  ): PagedAsyncIterableIterator<DataSourceCredentialEntityUnion, CredentialsPageResponse> {
    const iter = this.listItemsOfDataSourceCredentials(options);
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
        return this.listSegmentsOfCredentialEntities(
          {
            ...options,
            maxPageSize: settings.maxPageSize,
          },
          settings.continuationToken
        );
      },
    };
  }

  private async *listItemsOfDataSourceCredentials(
    options: ListDataSourceCredentialsOptions
  ): AsyncIterableIterator<DataSourceCredentialEntityUnion> {
    for await (const segment of this.listSegmentsOfCredentialEntities(options)) {
      if (segment) {
        yield* segment;
      }
    }
  }

  private async *listSegmentsOfCredentialEntities(
    options: ListDataSourceCredentialsOptions & { maxPageSize?: number },
    continuationToken?: string
  ): AsyncIterableIterator<CredentialsPageResponse> {
    let segmentResponse;
    if (continuationToken === undefined) {
      segmentResponse = await this.client.listCredentials({
        maxpagesize: options.maxPageSize,
        ...options,
      });
      const credentials = segmentResponse.value?.map((d) => {
        return fromServiceCredential(d);
      });
      const resultArray = Object.defineProperty(credentials || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink,
      });
      yield resultArray;

      continuationToken = segmentResponse.nextLink;
    }

    // we are using nextLink so don't send 'skip' in options
    delete options.skip;
    while (continuationToken) {
      segmentResponse = await this.client.listCredentialsNext(continuationToken, {
        maxpagesize: options.maxPageSize,
        ...options,
      });
      const credentials = segmentResponse.value?.map((d) => {
        return fromServiceCredential(d);
      });
      const resultArray = Object.defineProperty(credentials || [], "continuationToken", {
        enumerable: true,
        value: segmentResponse.nextLink,
      });
      yield resultArray;

      continuationToken = segmentResponse.nextLink;
    }
  }
  /**
   * Updates data source credential for the given id
   * @param id - id of the credential entity to update
   * @param patch -  Input to the update credential entity operation {@link DataSourceCredentialPatch}
   * @param options - The options parameter
   */
  public async updateDataSourceCredential(
    id: string,
    patch: DataSourceCredentialPatch,
    options: OperationOptions = {}
  ): Promise<DataSourceCredentialEntityUnion> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-updateDataSourceCredential",
      options
    );
    try {
      const result = await this.client.updateCredential(
        id,
        toServiceCredentialPatch(patch),
        finalOptions
      );
      const resultCred = fromServiceCredential(result);
      return resultCred;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes data source credential for the given id
   * @param id - id of the credential entity to delete
   * @param options - The options parameter
   */
  public async deleteDataSourceCredential(
    id: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "MetricsAdvisorAdministrationClient-deleteDataSourceCredential",
      options
    );

    try {
      const response = await getRawResponse(() => this.client.deleteCredential(id, finalOptions), {
        ...options,
      });
      return { _response: response.rawResponse };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
interface ReturnType<T> {
  flatResponse: T;
  rawResponse: FullOperationResponse;
}
async function getRawResponse<TOptions extends OperationOptions, TResult>(
  f: (options: TOptions) => Promise<TResult>,
  options: TOptions
): Promise<ReturnType<TResult>> {
  // renaming onResponse received from customer to customerProvidedCallback
  const { onResponse: customerProvidedCallback } = options || {};
  let rawResponse: FullOperationResponse | undefined = undefined;
  // flatResponseParam - is basically the flatResponse received from service call -
  // just named it so that linter doesn't complain
  // onResponse - includes the rawResponse and the customer's provided onResponse
  const flatResponse = await f({
    ...options,
    onResponse: (response: FullOperationResponse, flatResponseParam: unknown) => {
      rawResponse = response;
      customerProvidedCallback?.(response, flatResponseParam);
    },
  });
  return { flatResponse, rawResponse: rawResponse! };
}
