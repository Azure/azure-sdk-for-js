// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AppConfigurationGetKeyValuesOptionalParams,
  AppConfigurationGetRevisionsOptionalParams,
  AppConfigurationPutKeyValueOptionalParams,
  GetKeyValuesResponse,
  GetRevisionsResponse,
  KeyValue as ConfigurationSetting,
  AppConfigurationDeleteLockOptionalParams,
  AppConfigurationPutLockOptionalParams,
} from "./generated/src/models/index";

export {
  AppConfigurationDeleteKeyValueOptionalParams as DeleteConfigurationSettingOptions,
  AppConfigurationDeleteKeyValueOptionalParams,
  AppConfigurationGetKeyValueOptionalParams as GetConfigurationSettingOptions,
  AppConfigurationGetKeyValueOptionalParams,
  AppConfigurationGetKeyValuesOptionalParams,
  AppConfigurationGetRevisionsOptionalParams,
  AppConfigurationPutKeyValueOptionalParams,
  DeleteKeyValueHeaders,
  DeleteKeyValueResponse as DeleteConfigurationSettingResponse,
  DeleteKeyValueResponse,
  DeleteLockResponse as ClearReadOnlyResponse,
  DeleteLockResponse,
  GetKeyValueHeaders,
  GetKeyValueResponse as GetConfigurationSettingResponse,
  GetKeyValueResponse,
  GetKeyValuesHeaders,
  GetKeyValuesResponse,
  GetRevisionsHeaders,
  GetRevisionsResponse,
  KeyValueListResult,
  PutKeyValueResponse as AddConfigurationSettingResponse,
  PutKeyValueResponse as SetConfigurationSettingResponse,
  PutKeyValueResponse,
  PutLockResponse as SetReadOnlyResponse,
  PutLockResponse,
} from "./generated/src/models/index";

export { ConfigurationSetting };

/**
 * Fields that represent a ConfigurationSetting
 * 
 * Any place that takes a ConfigurationSettingsParam will also take a ConfigurationSetting.
 */
export interface ConfigurationSettingId extends Pick<ConfigurationSetting, 'key' | 'label'> {
}
  
/**
 * A ConfigurationSetting minus any fields that are not settable in
 * addConfigurationSetting/setConfigurationSetting (ex: locked)
 *
 * Any place that takes a ConfigurationSettingsParam will also take a ConfigurationSetting.
 */
export interface ConfigurationSettingParam
  extends Pick<
    ConfigurationSetting,
    Exclude<keyof ConfigurationSetting, "locked" | "etag" | "lastModified">
  > {}

/**
 * Options used when adding or saving a ConfigurationSetting.
 */
export interface ConfigurationSettingOptions
  extends Pick<
    AppConfigurationPutKeyValueOptionalParams,
    Exclude<keyof AppConfigurationPutKeyValueOptionalParams, "label" | "entity">
  > {}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListConfigurationSettingsOptions
  extends Pick<
    AppConfigurationGetKeyValuesOptionalParams,
    Exclude<keyof AppConfigurationGetKeyValuesOptionalParams, "key" | "label" | "select" | "after">
  > {
  /**
   * Filters for wildcard matching (using *) against keys. These conditions are logically OR'd against each other.
   */
  keys?: string[];

  /**
   * Filters for wildcard matching (using *) against labels. These conditions are logically OR'd against each other.
   */
  labels?: string[];

  /**
   * Which fields to return for each ConfigurationSetting
   */
  fields?: (keyof ConfigurationSetting)[];
}

/**
 * Options for listRevisions that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListRevisionsOptions
  extends Pick<
    AppConfigurationGetRevisionsOptionalParams,
    Exclude<keyof AppConfigurationGetRevisionsOptionalParams, "key" | "label" | "select" | "after">
  > {
  /**
   * Filters for wildcard matching (using *) against keys. These conditions are logically OR'd against each other.
   */
  keys?: string[];

  /**
   * Filters for wildcard matching (using *) against labels. These conditions are logically OR'd against each other.
   */
  labels?: string[];

  /**
   * Which fields to return for each ConfigurationSetting
   */
  fields?: (keyof ConfigurationSetting)[];
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListConfigurationSettingPage
  extends Pick<GetKeyValuesResponse, Exclude<keyof GetKeyValuesResponse, "items">> {
  /**
   * ConfigurationSettings for this page of results
   */
  items: ConfigurationSetting[];
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListRevisionsPage
  extends Pick<GetRevisionsResponse, Exclude<keyof GetRevisionsResponse, "items">> {
  /**
   * ConfigurationSettings for this page of results
   */
  items: ConfigurationSetting[];
}

/**
 * Options for clearReadOnly
 */
export interface ClearReadOnlyOptions extends Pick<AppConfigurationDeleteLockOptionalParams, Exclude<keyof AppConfigurationDeleteLockOptionalParams, 'label'>> { }

/**
 * Options for setReadOnly
 */
export interface SetReadOnlyOptions extends Pick<AppConfigurationPutLockOptionalParams, Exclude<keyof AppConfigurationPutLockOptionalParams, 'label'>> { }

export interface ETagOption {
  /**
   * Entity tag (etag) of the object
   */
  etag?: string;
}
