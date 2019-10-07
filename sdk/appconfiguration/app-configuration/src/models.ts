// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DeleteKeyValueHeaders,
  DeleteLockHeaders,
  GetKeyValueHeaders,
  PutKeyValueHeaders,
  PutLockHeaders,
  GetKeyValuesHeaders,
  GetRevisionsHeaders
} from "./generated/src/models/index";
import { RequestOptionsBase, HttpResponse } from "@azure/core-http";

export {
  DeleteKeyValueHeaders,
  DeleteLockHeaders,
  GetKeyValueHeaders,
  GetKeyValuesHeaders,
  GetRevisionsHeaders,
  PutKeyValueHeaders,
  PutLockHeaders,
} from "./generated/src/models/index";

/**
 * Fields that uniquely identify a configuration setting
 */
export interface ConfigurationSettingId {
  /**
   * The key for this setting
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
export interface ConfigurationSettingParam extends ConfigurationSettingId {
  /**
   * The content type of the setting's value
   */
  contentType?: string;

  /**
   * The setting's value
   */
  value?: string;

  /**
   * Tags for this key
   */
  tags?: { [propertyName: string]: string };
}

/**
 * Configuration setting with extra metadata from the server, indicating
 * its etag, whether it is currently readonly and when it was last modified.
 */
export interface ConfigurationSetting extends ConfigurationSettingParam {
  /**
   * The date when this setting was last modified
   */
  lastModified?: Date;

  /**
   * Whether or not the setting is read-only
   */
  locked?: boolean;

  /**
   * The etag for this setting
   */
  etag?: string;
}

/**
 * Parameters for adding a new configuration setting
 */
export interface AddConfigurationSettingParam extends ConfigurationSettingParam { }

/**
 * Parameters for creating or updating a new configuration setting
 */
export interface SetConfigurationSettingParam extends ConfigurationSettingParam {}

/**
 * Standard base response for getting, deleting or updating a configuration setting
 */
export type ConfigurationSettingResponse<HeadersT> = ConfigurationSetting &
  HttpResponseField<HeadersT> &
  Pick<HeadersT, Exclude<keyof HeadersT, "eTag">>;

/**
 * HTTP response related information - headers and raw body.
 */
export interface HttpResponseField<HeadersT> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
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
 * Options used to provide if-match or if-none-match headers for an HTTP request
 */
export interface HttpConditionalFields {
  /**
   * Used to perform an operation only if the targeted resource's etag matches the value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not match the value
   * provided.
   */
  ifNoneMatch?: string;
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
 * Response from retrieving a ConfigurationSetting.
 */
export interface GetConfigurationSettingResponse
  extends ConfigurationSettingResponse<GetKeyValueHeaders> {}

/**
 * Options used when adding a ConfigurationSetting.
 */
export interface AddConfigurationSettingOptions extends RequestOptionsBase {}

/**
 * Response from adding a ConfigurationSetting.
 */
export interface AddConfigurationSettingResponse
  extends ConfigurationSettingResponse<PutKeyValueHeaders> {}

/**
 * Response from deleting a ConfigurationSetting.
 */
export interface DeleteConfigurationSettingResponse
  extends ConfigurationSettingResponse<DeleteKeyValueHeaders> {}

/**
 * Options for deleting a ConfigurationSetting.
 */
export interface DeleteConfigurationSettingOptions extends HttpConditionalFields, RequestOptionsBase { }

/**
 * Options used when saving a ConfigurationSetting.
 */
export interface SetConfigurationSettingOptions extends HttpConditionalFields, RequestOptionsBase { }

/**
 * Response from setting a ConfigurationSetting.
 */
export interface SetConfigurationSettingResponse
  extends ConfigurationSettingResponse<PutKeyValueHeaders> {}

/**
 * A configuration setting and associated HTTP information
 */
export interface GetConfigurationSettingResponse extends ConfigurationSettingResponse<GetKeyValueHeaders> { }

/**
 * Options for getting a ConfigurationSetting.
 */
export interface GetConfigurationSettingOptions extends RequestOptionsBase, HttpConditionalFields, OptionalFields { 
  /**
   * Requests the server to respond with the state of the resource at the specified time.
   */
  acceptDatetime?: string;
}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export interface ListSettingsOptions extends OptionalFields {
  /**
   * Requests the server to respond with the state of the resource at the specified time.
   */
  acceptDatetime?: string;

  /**
   * Filters for wildcard matching (using *) against keys. These conditions are logically OR'd against each other.
   */
  keys?: string[];

  /**
   * Filters for wildcard matching (using *) against labels. These conditions are logically OR'd against each other.
   */
  labels?: string[];
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListConfigurationSettingsOptions extends RequestOptionsBase, ListSettingsOptions {
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListConfigurationSettingPage extends HttpResponseField<GetKeyValuesHeaders> {
  /**
   * The configuration settings for this page of results.
   */
  items: ConfigurationSetting[];
}
  
/**
 * Options for listRevisions that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListRevisionsOptions extends RequestOptionsBase, ListSettingsOptions {  
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListRevisionsPage extends HttpResponseField<GetRevisionsHeaders> {
  /**
   * The configuration settings for this page of results.
   */
  items: ConfigurationSetting[];
}

/**
 * Options for clearReadOnly
 */
export interface ClearReadOnlyOptions extends HttpConditionalFields, RequestOptionsBase { }

/**
 * Response when clearing the read-only status from a value
 */
export interface ClearReadOnlyResponse extends ConfigurationSettingResponse<DeleteLockHeaders> { }

/**
 * Options for setReadOnly
 */
export interface SetReadOnlyOptions extends HttpConditionalFields, RequestOptionsBase { }

/**
 * Response when setting a value to read-only.
 */
export interface SetReadOnlyResponse extends ConfigurationSettingResponse<PutLockHeaders> {}
