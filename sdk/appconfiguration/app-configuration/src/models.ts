// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CompatResponse } from "@azure/core-http-compat";
import { FeatureFlagValue } from "./featureFlag";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { SecretReferenceValue } from "./secretReference";
import {
  CompositionType,
  ConfigurationSettingsFilter,
  OperationDetails,
  Snapshot,
  SnapshotStatus,
} from "./generated/src";

/**
 * Provides configuration options for AppConfigurationClient.
 */
export interface AppConfigurationClientOptions extends CommonClientOptions {
  /**
   * The version of the App Configuration REST API to call.
   *
   * Default: AppConfigurationApiVersion.Latest ("2022-11-01-preview")
   */
  apiVersion?: AppConfigurationApiVersion;
}

/**
 * Valid values of the App Configuration service REST API version.
 */
export type AppConfigurationApiVersion =
  (typeof AppConfigurationApiVersion)[keyof typeof AppConfigurationApiVersion];

/**
 * Supported and common values of AppConfigurationApiVersion.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppConfigurationApiVersion = {
  /**
   * The newest version of the service known to be supported by the client (default).
   *
   * If using a beta package version, this will be identical to the latest preview version. Otherwise, it will be
   * identical to the latest stable version.
   */
  Latest: "2022-11-01-preview",

  /**
   * The newest stable version of the service known to be supported by the package. This will be a Generally Available
   * (GA) version, even if the package version is a beta.
   */
  Stable: "1.0",

  /**
   * App Configuration API version "1.0" (GA).
   */
  "1.0": "1.0",

  /**
   * App Configuration API version 2022-11-01-preview.
   */
  "2022-11-01-preview": "2022-11-01-preview",
} as const;

/**
 * Fields that uniquely identify a configuration setting
 */
export interface ConfigurationSettingId extends ConfigurationSettingsFilter {
  /**
   * The etag for this setting
   */
  etag?: string;
}
/**
 * Necessary fields for updating or creating a new configuration setting
 */
export type ConfigurationSettingParam<
  T extends string | FeatureFlagValue | SecretReferenceValue = string
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
  T extends string | FeatureFlagValue | SecretReferenceValue = string
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
  T extends string | FeatureFlagValue | SecretReferenceValue = string
> = ConfigurationSettingParam<T>;

/**
 * Parameters for creating or updating a new configuration setting
 */
export type SetConfigurationSettingParam<
  T extends string | FeatureFlagValue | SecretReferenceValue = string
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
  fields?: (keyof Snapshot)[];
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
  extends ConfigurationSetting,
    SyncTokenHeaderField,
    HttpResponseField<SyncTokenHeaderField> {}

/**
 * Response from deleting a ConfigurationSetting.
 */
export interface DeleteConfigurationSettingResponse
  extends SyncTokenHeaderField,
    HttpResponseFields,
    HttpResponseField<SyncTokenHeaderField> {}

/**
 * Options for deleting a ConfigurationSetting.
 */
export interface DeleteConfigurationSettingOptions
  extends HttpOnlyIfUnchangedField,
    OperationOptions {}

/**
 * Options used when saving a ConfigurationSetting.
 */
export interface SetConfigurationSettingOptions
  extends HttpOnlyIfUnchangedField,
    OperationOptions {}

/**
 * Response from setting a ConfigurationSetting.
 */
export interface SetConfigurationSettingResponse
  extends ConfigurationSetting,
    SyncTokenHeaderField,
    HttpResponseField<SyncTokenHeaderField> {}

/**
 * Headers from getting a ConfigurationSetting.
 */
export interface GetConfigurationHeaders extends SyncTokenHeaderField {}

/**
 * Response from retrieving a ConfigurationSetting.
 */
export interface GetConfigurationSettingResponse
  extends ConfigurationSetting,
    GetConfigurationHeaders,
    HttpResponseFields,
    HttpResponseField<GetConfigurationHeaders> {}

/**
 * Options for getting a ConfigurationSetting.
 */
export interface GetConfigurationSettingOptions
  extends OperationOptions,
    HttpOnlyIfChangedField,
    OptionalFields {
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
}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export interface ListSettingsSnapshotsOptions extends OperationOptions, OptionalFields {
  /**
   * Requests the server to respond with the state of the resource at the specified time.
   */
  acceptDateTime?: Date;
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListConfigurationSettingsOptions extends OperationOptions, ListSettingsOptions {}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export interface SendSettingsOptions extends ListSettingsOptions {
  /**
   * A filter used get configuration setting for a snapshot. Not valid when used with 'key' and 'label' filters
   */
  snapshotName?: string;
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface SendConfigurationSettingsOptions extends OperationOptions, SendSettingsOptions {}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export interface ListSnapshots extends OptionalSnapshotFields {
  /** A filter for the name of the returned snapshots. */
  nameFilter?: string;

  /** Used to filter returned snapshots by their status property. */
  statusFilter?: SnapshotStatus[];
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListSnapshotsOptions extends OperationOptions, ListSnapshots {}

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
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListConfigurationSettingPage
  extends HttpResponseField<SyncTokenHeaderField>,
    PageSettings {
  /**
   * The configuration settings for this page of results.
   */
  items: ConfigurationSetting[];
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListSnapshotsPage extends HttpResponseField<SyncTokenHeaderField>, PageSettings {
  /**
   * The configuration settings for this page of results.
   */
  items: Snapshot[];
}

/**
 * Options for listRevisions that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListRevisionsOptions extends OperationOptions, SendSettingsOptions {}

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
  extends ConfigurationSetting,
    SyncTokenHeaderField,
    HttpResponseField<SyncTokenHeaderField> {}

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
export interface CreateSnapshotOptions extends OperationOptions {}

/**
 * Response from adding a Snapshot.
 */
export interface SnapshotResponse extends Snapshot, SyncTokenHeaderField {}

/**
 * Response from adding a Snapshot.
 */
export interface OperationDetailsResponse extends OperationDetails {}

/**
 * Options used when getting a Snapshot.
 */
export interface GetSnapshotOptions
  extends OperationOptions,
    HttpOnlyIfChangedField,
    OptionalSnapshotFields {}

/**
 * Response from getting a Snapshot.
 */
export interface GetSnapshotResponse extends SnapshotResponse {}

/**
 * Options used when upadting a Snapshot.
 */
export interface UpdateSnapshotOptions extends HttpOnlyIfUnchangedField, OperationOptions {}

/**
 * Response from updating a Snapshot.
 */
export interface UpdateSnapshotResponse extends SnapshotResponse {}
/**
 * Response from updating a Snapshot.
 */
export interface CreateSnapshotResponse extends SnapshotResponse {}

export { CompositionType, SnapshotStatus };

/**
 * Fields that uniquely identify a snapshot
 */
export interface SnapshotInfo {
  /**
   * The name for this snapshot
   */
  name: string;
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters: ConfigurationSettingsFilter[];
  /** The composition type describes how the key-values within the snapshot are composed. The 'all' composition type includes all key-values. The 'group_by_key' composition type ensures there are no two key-values containing the same key. */
  compositionType?: CompositionType;
  /** The amount of time, in seconds, that a snapshot will remain in the archived state before expiring. This property is only writable during the creation of a snapshot. If not specified, the default lifetime of key-value revisions will be used. */
  retentionPeriod?: number;
  /** The tags of the snapshot. */
  tags?: { [propertyName: string]: string };
}
/**
 * Fields for the snapshot
 */
export interface SnapshotId {
  /**
   * The name for this snapshot
   */
  name: string;
  /**
   * The etag for this snapshot
   */
  etag?: string;
}

export {
  OperationDetails,
  State,
  ErrorDetail,
  Snapshot,
  ConfigurationSettingsFilter,
  InnerError,
} from "./generated/src";
