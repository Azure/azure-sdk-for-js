// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CompatResponse } from "@azure/core-http-compat";
import type { FeatureFlagValue } from "./featureFlag.js";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import type { SecretReferenceValue } from "./secretReference.js";
import type { SnapshotReferenceValue } from "./snapshotReference.js";
import type {
  SnapshotComposition,
  ConfigurationSettingsFilter,
  ConfigurationSnapshot,
  ConfigurationSnapshotStatus,
  SettingLabel,
} from "./generated/src/index.js";

/**
 * Provides configuration options for AppConfigurationClient.
 */
export interface AppConfigurationClientOptions extends CommonClientOptions {
  /**
   * The API version to use when interacting with the service. The default value is `2023-11-01`.
   * Note that overriding this default value may result in unsupported behavior.
   */
  apiVersion?: string;

  /**
   * The Audience to use for authentication with Azure Active Directory (AAD).
   * {@link KnownAppConfigAudience} can be used interchangeably with audience.
   * If not specified, the default audience will be set to Azure Public Cloud.
   */
  audience?: string;
}

/**
 * Known values for Azure App Configuration Audience
 */
export enum KnownAppConfigAudience {
  /**
   * Audience for Azure China
   */
  AzureChina = "https://appconfig.azure.cn",
  /**
   * Audience for Azure Government
   */
  AzureGovernment = "https://appconfig.azure.us",
  /**
   * Audience for Azure Public
   */
  AzurePublicCloud = "https://appconfig.azure.com",
}

/**
 * Fields that uniquely identify a configuration setting
 */
export interface ConfigurationSettingId {
  /**
   * The etag for this setting
   */
  etag?: string;
  /**
   * The key for this setting.
   * Feature flags must be prefixed with `.appconfig.featureflag/<feature-flag-name>`.
   */
  key: string;

  /**
   * The label for this setting. Leaving this undefined means this
   * setting does not have a label.
   */
  label?: string;
}
/**
 * Necessary fields for updating or creating a new configuration setting
 */
export type ConfigurationSettingParam<
  T extends string | FeatureFlagValue | SecretReferenceValue | SnapshotReferenceValue = string,
> = ConfigurationSettingId & {
  /**
   * The content type of the setting's value
   */
  contentType?: string;

  /**
   * Tags for this key
   */
  tags?: { [propertyName: string]: string };
} & (T extends string
    ? {
        /**
         * The setting's value
         */
        value?: string;
      }
    : {
        /**
         * The setting's value
         */
        value: T;
      });

/**
 * Configuration setting with extra metadata from the server, indicating
 * its etag, whether it is currently readOnly and when it was last modified.
 */
export type ConfigurationSetting<
  T extends string | FeatureFlagValue | SecretReferenceValue | SnapshotReferenceValue = string,
> = ConfigurationSettingParam<T> & {
  /**
   * Whether or not the setting is read-only
   */
  isReadOnly: boolean;

  /**
   * The date when this setting was last modified
   */
  lastModified?: Date;
};

/**
 * Fields that are hoisted up  from the _response field of the object
 * Used in cases where individual HTTP response fields are important for
 * the user to use in common-use cases like handling http status codes 204 or 304.
 */
export interface HttpResponseFields {
  /**
   * The HTTP status code for the response
   */
  statusCode: number;
}
/**
 * HTTP response related information - headers and raw body.
 */
export interface HttpResponseField<HeadersT> {
  /**
   * The underlying HTTP response.
   */
  _response: CompatResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: HeadersT;

    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
  };
}
/**
 * Parameters for adding a new configuration setting
 */
export type AddConfigurationSettingParam<
  T extends string | FeatureFlagValue | SecretReferenceValue | SnapshotReferenceValue = string,
> = ConfigurationSettingParam<T>;

/**
 * Parameters for creating or updating a new configuration setting
 */
export type SetConfigurationSettingParam<
  T extends string | FeatureFlagValue | SecretReferenceValue | SnapshotReferenceValue = string,
> = ConfigurationSettingParam<T>;

/**
 * Standard base response for getting, deleting or updating a configuration setting
 */
export type ConfigurationSettingResponse<HeadersT> = ConfigurationSetting &
  HttpResponseField<HeadersT> &
  Pick<HeadersT, Exclude<keyof HeadersT, "eTag">>;

/**
 * Options used to provide if-none-match for an HTTP request
 */
export interface HttpOnlyIfChangedField {
  /**
   * Used to perform an operation only if the targeted resource's etag does not match the value
   * provided.
   */
  onlyIfChanged?: boolean;
}

/**
 * Options used to provide if-match for an HTTP request
 */
export interface HttpOnlyIfUnchangedField {
  /**
   * Used to perform an operation only if the targeted resource's etag matches the value provided.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Used when the API supports selectively returning fields.
 */
export interface OptionalFields {
  /**
   * Which fields to return for each ConfigurationSetting
   */
  fields?: (keyof ConfigurationSetting)[];
}

/**
 * Used when the API supports selectively returning fields.
 */
export interface OptionalSnapshotFields {
  /**
   * Which fields to return for each ConfigurationSetting
   */
  fields?: (keyof ConfigurationSnapshot)[];
}

/**
 * Used when the API supports selectively returning labels fields.
 */
export interface OptionalLabelsFields {
  /**
   * Which fields to return for each ConfigurationSetting
   */
  fields?: (keyof SettingLabel)[];
}
/**
 * Sync token header field
 */
export interface SyncTokenHeaderField {
  /**
   * Enables real-time consistency between requests by providing the returned value in the next
   * request made to the server.
   */
  syncToken?: string;
}

/**
 * Options used when adding a ConfigurationSetting.
 */
export interface AddConfigurationSettingOptions extends OperationOptions {}

/**
 * Response from adding a ConfigurationSetting.
 */
export interface AddConfigurationSettingResponse
  extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseField<SyncTokenHeaderField> {}

/**
 * Response from deleting a ConfigurationSetting.
 */
export interface DeleteConfigurationSettingResponse
  extends SyncTokenHeaderField, HttpResponseFields, HttpResponseField<SyncTokenHeaderField> {}

/**
 * Options for deleting a ConfigurationSetting.
 */
export interface DeleteConfigurationSettingOptions
  extends HttpOnlyIfUnchangedField, OperationOptions {}

/**
 * Options used when saving a ConfigurationSetting.
 */
export interface SetConfigurationSettingOptions
  extends HttpOnlyIfUnchangedField, OperationOptions {}

/**
 * Response from setting a ConfigurationSetting.
 */
export interface SetConfigurationSettingResponse
  extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseField<SyncTokenHeaderField> {}

/**
 * Headers from getting a ConfigurationSetting.
 */
export interface GetConfigurationHeaders extends SyncTokenHeaderField {}

/**
 * Response from retrieving a ConfigurationSetting.
 */
export interface GetConfigurationSettingResponse
  extends
    ConfigurationSetting,
    GetConfigurationHeaders,
    HttpResponseFields,
    HttpResponseField<GetConfigurationHeaders> {}

/**
 * Options for getting a ConfigurationSetting.
 */
export interface GetConfigurationSettingOptions
  extends OperationOptions, HttpOnlyIfChangedField, OptionalFields {
  /**
   * Requests the server to respond with the state of the resource at the specified time.
   */
  acceptDateTime?: Date;
}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export interface ListSettingsOptions extends OptionalFields {
  /**
   * Requests the server to respond with the state of the resource at the specified time.
   */
  acceptDateTime?: Date;

  /**
   * Filters for keys. There are two types of matching:
   *
   * 1. Exact matching. Up to 5 key names are allowed, separated by commas (',')
   * 2. Wildcard matching. A single wildcard expression can be specified.
   *
   *    | Value        | Matches                               |
   *    |--------------|---------------------------------------|
   *    | omitted or * | Matches any key                       |
   *    | abc          | Matches a key named abc               |
   *    | abc*         | Matches key names that start with abc |
   *
   * These characters are reserved and must be prefixed with backslash in order
   * to be specified: * or \\ or ,
   */
  keyFilter?: string;

  /* eslint-disable tsdoc/syntax */
  /**
   * Filters for labels. There are two types of matching:
   *
   * 1. Exact matching. Up to 5 labels are allowed, separated by commas (',')
   * 2. Wildcard matching. A single wildcard expression can be specified.
   *
   *    | Value        | Matches                                              |
   *    |--------------|------------------------------------------------------|
   *    | omitted or * | Matches any key                                      |
   *    | \0           | Matches any key without a label (URL encoded as %00) |
   *    | prod         | Matches a key with label named prod                  |
   *    | prod*        | Matches key with label names that start with prod    |
   * These characters are reserved and must be prefixed with backslash in order
   * to be specified: * or \\ or ,
   *
   * Reference: https://learn.microsoft.com/azure/azure-app-configuration/rest-api-key-value
   */
  labelFilter?: string;

  /** A filter used to query by tags. Syntax reference: https://aka.ms/azconfig/docs/keyvaluefiltering */
  tagsFilter?: string[];
}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export interface ListConfigurationSettingsForSnapshotOptions
  extends OperationOptions, OptionalFields {}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListConfigurationSettingsOptions extends OperationOptions, ListSettingsOptions {
  /**
   * Etags list for page
   */
  pageEtags?: string[];
}

/**
 * Options for listLabels
 */
export interface ListLabelsOptions extends OperationOptions, OptionalLabelsFields {
  /** A filter for the name of the returned labels. */
  nameFilter?: string;

  /**
   * Requests the server to respond with the state of the resource at the specified time.
   */
  acceptDateTime?: Date;
}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export interface ListSnapshots extends OptionalSnapshotFields {
  /** A filter for the name of the returned snapshots. */
  nameFilter?: string;

  /** Used to filter returned snapshots by their status property. */
  statusFilter?: ConfigurationSnapshotStatus[];
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListSnapshotsOptions
  extends OperationOptions, ListSnapshots, OptionalSnapshotFields {}

/**
 * An interface that tracks the settings for paged iteration
 */
export interface PageSettings {
  /**
   * The token that keeps track of where to continue the iterator
   */
  continuationToken?: string;
  // The appconfig service doesn't currently support letting you select a page size
  // so we're ignoring their setting for now.
}

/**
 * Entity with etag.
 */
export interface EtagEntity {
  /**
   * The etag for this entity
   */
  etag?: string;
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListConfigurationSettingPage
  extends HttpResponseField<SyncTokenHeaderField>, PageSettings, EtagEntity {
  /**
   * The configuration settings for this page of results.
   */
  items: ConfigurationSetting[];
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListLabelsPage
  extends HttpResponseField<SyncTokenHeaderField>, PageSettings, EtagEntity {
  /**
   * The collection of labels
   */
  items: SettingLabel[];
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListSnapshotsPage extends SyncTokenHeaderField, PageSettings {
  /**
   * The configuration settings for this page of results.
   */
  items: ConfigurationSnapshot[];
}

/**
 * Options for listRevisions that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListRevisionsOptions extends OperationOptions, ListSettingsOptions {}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListRevisionsPage extends HttpResponseField<SyncTokenHeaderField>, PageSettings {
  /**
   * The configuration settings for this page of results.
   */
  items: ConfigurationSetting[];
}

/**
 * Options for setReadOnly
 */
export interface SetReadOnlyOptions extends HttpOnlyIfUnchangedField, OperationOptions {}

/**
 * Response when setting a value to read-only.
 */
export interface SetReadOnlyResponse
  extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseField<SyncTokenHeaderField> {}

/**
 * Options that control how to retry failed requests.
 */
export interface RetryOptions {
  /**
   * The maximum number of retry attempts.  Defaults to 3.
   */
  maxRetries?: number;

  /**
   * The maximum delay in milliseconds allowed before retrying an operation.
   */
  maxRetryDelayInMs?: number;
}

/**
 * Options used when creating a Snapshot.
 */
export interface CreateSnapshotOptions extends OperationOptions {
  /**
   * The amount of time to wait (in milliseconds) between subsequent requests relating to the same operation.
   */
  updateIntervalInMs?: number;
}

/**
 * Response from adding a Snapshot.
 */
export interface SnapshotResponse extends ConfigurationSnapshot, SyncTokenHeaderField {}

/**
 * Options used when getting a Snapshot.
 */
export interface GetSnapshotOptions extends OperationOptions, OptionalSnapshotFields {}

/**
 * Response from getting a Snapshot.
 */
export interface GetSnapshotResponse extends SnapshotResponse {}

/**
 * Options used when updating a Snapshot.
 */
export interface UpdateSnapshotOptions extends OperationOptions {
  /**
   * The etag for this snapshot
   */
  etag?: string;
}

/**
 * Response from updating a Snapshot.
 */
export interface UpdateSnapshotResponse extends SnapshotResponse {}
/**
 * Response from updating a Snapshot.
 */
export interface CreateSnapshotResponse extends SnapshotResponse {}

/**
 * Fields that uniquely identify a snapshot
 */
export interface SnapshotInfo {
  /** The name for this snapshot */
  name: string;
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters: ConfigurationSettingsFilter[];
  /** The composition type describes how the key-values within the snapshot are composed. The 'all' composition type includes all key-values. The 'group_by_key' composition type ensures there are no two key-values containing the same key. */
  compositionType?: SnapshotComposition;
  /** The amount of time, in seconds, that a snapshot will remain in the archived state before expiring. This property is only writable during the creation of a snapshot. If not specified, the default lifetime of key-value revisions will be used. */
  retentionPeriodInSeconds?: number;
  /** The tags of the snapshot. */
  tags?: { [propertyName: string]: string };
}

export {
  ConfigurationSnapshot,
  ConfigurationSettingsFilter,
  SnapshotComposition,
  KnownSnapshotComposition,
  KnownConfigurationSnapshotStatus,
  ConfigurationSnapshotStatus,
  SettingLabel,
} from "./generated/src/index.js";
