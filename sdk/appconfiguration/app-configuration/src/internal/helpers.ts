// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type ConfigurationSetting,
  type ConfigurationSettingParam,
  type HttpOnlyIfChangedField,
  type HttpOnlyIfUnchangedField,
  type HttpResponseField,
  type HttpResponseFields,
  type ListRevisionsOptions,
  type ListSettingsOptions,
  type ListSnapshotsOptions,
  type ConfigurationSnapshot,
  type SnapshotResponse,
  type EtagEntity,
  type ListLabelsOptions,
  KnownAppConfigAudience,
} from "../models.js";
import type { FeatureFlagValue } from "../featureFlag.js";
import { FeatureFlagHelper, featureFlagContentType } from "../featureFlag.js";
import type {
  GetKeyValuesOptionalParams,
  GetLabelsOptionalParams,
  GetSnapshotsOptionalParams,
  KeyValue,
} from "../generated/src/models/index.js";
import type { SecretReferenceValue } from "../secretReference.js";
import { SecretReferenceHelper, secretReferenceContentType } from "../secretReference.js";
import type { SnapshotReferenceValue } from "../snapshotReference.js";
import { SnapshotReferenceHelper, snapshotReferenceContentType } from "../snapshotReference.js";
import { isDefined } from "@azure/core-util";
import { logger } from "../logger.js";
import type { OperationOptions } from "@azure/core-client";

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface SendConfigurationSettingsOptions
  extends OperationOptions, ListSettingsOptions, EtagEntity {
  /**
   * A filter used get configuration setting for a snapshot. Not valid when used with 'key' and 'label' filters
   */
  snapshotName?: string;
}

/**
 * Options for listLabels that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface SendLabelsRequestOptions extends ListLabelsOptions {}

/**
 * Formats the etag so it can be used with a If-Match/If-None-Match header
 * @internal
 */
export function quoteETag(etag: string | undefined): string | undefined {
  // https://tools.ietf.org/html/rfc7232#section-3.1
  if (etag === undefined || etag === "*") {
    return etag;
  }

  if (etag.startsWith('"') && etag.endsWith('"')) {
    return etag;
  }

  if (etag.startsWith("'") && etag.endsWith("'")) {
    return etag;
  }

  return `"${etag}"`;
}

/**
 * Checks the onlyIfChanged/onlyIfUnchanged properties to make sure we haven't specified both
 * and throws an Error. Otherwise, returns the properties properly quoted.
 * @param options - An options object with onlyIfChanged/onlyIfUnchanged fields
 * @internal
 */
export function checkAndFormatIfAndIfNoneMatch(
  objectWithEtag: EtagEntity,
  options: HttpOnlyIfChangedField & HttpOnlyIfUnchangedField,
): { ifMatch: string | undefined; ifNoneMatch: string | undefined } {
  if (options.onlyIfChanged && options.onlyIfUnchanged) {
    logger.error(
      "onlyIfChanged and onlyIfUnchanged are both specified",
      options.onlyIfChanged,
      options.onlyIfUnchanged,
    );
    throw new Error("onlyIfChanged and onlyIfUnchanged are mutually-exclusive");
  }

  let ifMatch;
  let ifNoneMatch;

  if (options.onlyIfUnchanged) {
    ifMatch = quoteETag(objectWithEtag.etag);
  }

  if (options.onlyIfChanged) {
    ifNoneMatch = quoteETag(objectWithEtag.etag);
  }

  return {
    ifMatch: ifMatch,
    ifNoneMatch: ifNoneMatch,
  };
}

/**
 * Transforms some of the key fields in SendConfigurationSettingsOptions and ListRevisionsOptions
 * so they can be added to a request using AppConfigurationGetKeyValuesOptionalParams.
 * - `options.acceptDateTime` is converted into an ISO string
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter and labelFilter are moved to key and label, respectively.
 *
 * @internal
 */
export function formatFiltersAndSelect(
  listConfigOptions: ListRevisionsOptions,
): Pick<GetKeyValuesOptionalParams, "key" | "label" | "select" | "acceptDatetime" | "tags"> {
  let acceptDatetime: string | undefined = undefined;

  if (listConfigOptions.acceptDateTime) {
    acceptDatetime = listConfigOptions.acceptDateTime.toISOString();
  }
  return {
    key: listConfigOptions.keyFilter,
    label: listConfigOptions.labelFilter,
    tags: listConfigOptions.tagsFilter,
    acceptDatetime,
    select: formatFieldsForSelect(listConfigOptions.fields),
  };
}

/**
 * Transforms some of the key fields in SendConfigurationSettingsOptions
 * so they can be added to a request using AppConfigurationGetKeyValuesOptionalParams.
 * - `options.acceptDateTime` is converted into an ISO string
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter, labelFilter, snapshotName are moved to key, label, and snapshot respectively.
 *
 * @internal
 */
export function formatConfigurationSettingsFiltersAndSelect(
  listConfigOptions: SendConfigurationSettingsOptions,
): Pick<
  GetKeyValuesOptionalParams,
  "key" | "label" | "select" | "acceptDatetime" | "snapshot" | "tags"
> {
  const { snapshotName: snapshot, ...options } = listConfigOptions;
  return {
    ...formatFiltersAndSelect(options),
    snapshot,
  };
}
/**
 * Transforms some of the key fields in ListSnapshotsOptions
 * so they can be added to a request using AppConfigurationGetSnapshotsOptionalParams.
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter and labelFilter are moved to key and label, respectively.
 *
 * @internal
 */
export function formatSnapshotFiltersAndSelect(
  listSnapshotOptions: ListSnapshotsOptions,
): Pick<GetSnapshotsOptionalParams, "name" | "select" | "status"> {
  return {
    name: listSnapshotOptions.nameFilter,
    status: listSnapshotOptions.statusFilter,
    select: listSnapshotOptions.fields,
  };
}

/**
 * Transforms some of the key fields in ListLabelsOptions
 * so they can be added to a request using AppConfigurationGetLabelsOptionalParams.
 * - `select` is populated with the proper field names from `options.fields`
 * - `nameFilter` are moved to name
 *
 * @internal
 */
export function formatLabelsFiltersAndSelect(
  listLabelsOptions: ListLabelsOptions,
): Pick<GetLabelsOptionalParams, "name" | "select"> {
  return {
    name: listLabelsOptions.nameFilter,
    select: listLabelsOptions.fields,
  };
}
/**
 * Handles translating a Date acceptDateTime into a string as needed by the API
 * @param newOptions - A newer style options with acceptDateTime as a date (and with proper casing!)
 * @internal
 */
export function formatAcceptDateTime(newOptions: { acceptDateTime?: Date }): {
  acceptDatetime?: string;
} {
  return {
    acceptDatetime: newOptions.acceptDateTime && newOptions.acceptDateTime.toISOString(),
  };
}

/**
 * Take the URL that gets returned from next link and extract the 'after' token needed
 * to get the next page of results.
 * @internal
 */
export function extractAfterTokenFromNextLink(nextLink: string): string {
  const searchParams = new URLSearchParams(nextLink);
  const afterToken = searchParams.get("after");

  if (afterToken == null || Array.isArray(afterToken)) {
    logger.error("Invalid nextLink - invalid after token", afterToken, Array.isArray(afterToken));
    throw new Error("Invalid nextLink - invalid after token");
  }

  return decodeURIComponent(afterToken);
}

/**
 * Take the header link that gets returned from 304 response and extract the 'after' token needed
 * to get the next page of results.
 *
 * @internal
 */
export function extractAfterTokenFromLinkHeader(link: string): string {
  // Example transformation of the link header
  // link:
  // '</kv?api-version=2023-10-01&key=listResults714&after=bGlzdE4>; rel="next"'
  //
  // linkValue:
  // </kv?api-version=2023-10-01&key=listResults714&after=bGlzdE4>
  //
  // nextLink:
  // /kv?api-version=2023-10-01&key=listResults714&after=bGlzdE4
  const linkValue = link.split(";")[0];
  const nextLink = linkValue.substring(1, linkValue.length - 1);
  return extractAfterTokenFromNextLink(nextLink);
}

/**
 * Makes a ConfigurationSetting-based response throw for all of the data members. Used primarily
 * to prevent possible errors by the user in accessing a model that is uninitialized. This can happen
 * in cases like HTTP status code 204 or 304, which return an empty response body.
 *
 * @param configurationSetting - The configuration setting to alter
 */
export function makeConfigurationSettingEmpty(
  configurationSetting: Partial<Record<Exclude<keyof ConfigurationSetting, "key">, any>>,
): void {
  const names: Exclude<keyof ConfigurationSetting, "key">[] = [
    "contentType",
    "etag",
    "label",
    "lastModified",
    "isReadOnly",
    "tags",
    "value",
  ];

  for (const name of names) {
    configurationSetting[name] = undefined;
  }
}

/**
 * @internal
 */
export function transformKeyValue<T>(kvp: T & KeyValue): T & ConfigurationSetting {
  const setting: T & ConfigurationSetting & KeyValue = {
    value: undefined,
    ...kvp,
    isReadOnly: !!kvp.locked,
  };
  delete setting.locked;
  if (!setting.label) {
    delete setting.label;
  }
  if (!setting.contentType) {
    delete setting.contentType;
  }
  return setting;
}

/**
 * @internal
 */
function isConfigSettingWithSecretReferenceValue(
  setting: any,
): setting is ConfigurationSetting<SecretReferenceValue> {
  return (
    setting.contentType === secretReferenceContentType &&
    isDefined(setting.value) &&
    typeof setting.value !== "string"
  );
}

/**
 * @internal
 */
function isConfigSettingWithSnapshotReferenceValue(
  setting: any,
): setting is ConfigurationSetting<SnapshotReferenceValue> {
  return (
    setting.contentType === snapshotReferenceContentType &&
    isDefined(setting.value) &&
    typeof setting.value !== "string"
  );
}

/**
 * @internal
 */
function isConfigSettingWithFeatureFlagValue(
  setting: any,
): setting is ConfigurationSetting<FeatureFlagValue> {
  return (
    setting.contentType === featureFlagContentType &&
    isDefined(setting.value) &&
    typeof setting.value !== "string"
  );
}

/**
 * @internal
 */
function isSimpleConfigSetting(setting: any): setting is ConfigurationSetting {
  return typeof setting.value === "string" || !isDefined(setting.value);
}

/**
 * @internal
 */
export function serializeAsConfigurationSettingParam(
  setting:
    | ConfigurationSettingParam
    | ConfigurationSettingParam<FeatureFlagValue>
    | ConfigurationSettingParam<SecretReferenceValue>
    | ConfigurationSettingParam<SnapshotReferenceValue>,
): ConfigurationSettingParam {
  if (isSimpleConfigSetting(setting)) {
    return setting as ConfigurationSettingParam;
  }
  try {
    if (isConfigSettingWithFeatureFlagValue(setting)) {
      return FeatureFlagHelper.toConfigurationSettingParam(setting);
    }
    if (isConfigSettingWithSecretReferenceValue(setting)) {
      return SecretReferenceHelper.toConfigurationSettingParam(setting);
    }
    if (isConfigSettingWithSnapshotReferenceValue(setting)) {
      return SnapshotReferenceHelper.toConfigurationSettingParam(setting);
    }
  } catch (error: any) {
    return setting as ConfigurationSettingParam;
  }
  logger.error("Unable to serialize to a configuration setting", setting);
  throw new TypeError(
    `Unable to serialize the setting with key "${setting.key}" as a configuration setting`,
  );
}

/**
 * @internal
 */
export function transformKeyValueResponseWithStatusCode<T extends KeyValue>(
  kvp: T,
  status: number | undefined,
): ConfigurationSetting & { eTag?: string } & HttpResponseFields {
  const response = {
    ...transformKeyValue(kvp),
    statusCode: status ?? -1,
  };

  if (hasUnderscoreResponse(kvp)) {
    Object.defineProperty(response, "_response", {
      enumerable: false,
      value: kvp._response,
    });
  }
  return response;
}

/**
 * @internal
 */
export function transformKeyValueResponse<T extends KeyValue & { eTag?: string }>(
  kvp: T,
): ConfigurationSetting {
  const setting = transformKeyValue(kvp);
  if (hasUnderscoreResponse(kvp)) {
    Object.defineProperty(setting, "_response", {
      enumerable: false,
      value: kvp._response,
    });
  }

  delete setting.eTag;
  return setting;
}

/**
 * @internal
 */
export function transformSnapshotResponse<T extends ConfigurationSnapshot>(
  snapshot: T,
): SnapshotResponse {
  if (hasUnderscoreResponse(snapshot)) {
    Object.defineProperty(snapshot, "_response", {
      enumerable: false,
      value: snapshot._response,
    });
  }
  return snapshot as any;
}

/**
 * Translates user-facing field names into their `select` equivalents (these can be
 * seen in the `KnownEnum5`)
 *
 * @param fieldNames - fieldNames from users.
 * @returns The field names translated into the `select` field equivalents.
 *
 * @internal
 */
export function formatFieldsForSelect(
  fieldNames: (keyof ConfigurationSetting)[] | undefined,
): string[] | undefined {
  if (fieldNames == null) {
    return undefined;
  }

  const mappedFieldNames = fieldNames.map((fn) => {
    switch (fn) {
      case "lastModified":
        return "last_modified";
      case "contentType":
        return "content_type";
      case "isReadOnly":
        return "locked";
      default:
        return fn;
    }
  });

  return mappedFieldNames;
}

/**
 * @internal
 */
export function errorMessageForUnexpectedSetting(
  key: string,
  expectedType: "FeatureFlag" | "SecretReference",
): string {
  return `Setting with key ${key} is not a valid ${expectedType}, make sure to have the correct content-type and a valid non-null value.`;
}

export function assertResponse<T extends object>(
  result: T,
): asserts result is T & HttpResponseField<any> {
  if (!hasUnderscoreResponse(result)) {
    Object.defineProperty(result, "_response", {
      enumerable: false,
      value:
        "Something went wrong, _response(raw response) is supposed to be part of the response. Please file a bug at https://github.com/Azure/azure-sdk-for-js",
    });
  }
}

export function hasUnderscoreResponse<T extends object>(
  result: T,
): result is T & HttpResponseField<any> {
  return Object.prototype.hasOwnProperty.call(result, "_response");
}

/**
 * Get the scope for the App Configuration service based on the endpoint and audience.
 * If the audience is provided, it will be used as the scope.
 * If not, the scope is defaulted to Azure Public Cloud when not specified.
 *
 * @internal
 */
export function getScope(appConfigEndpoint: string, appConfigAudience?: string): string {
  if (appConfigAudience) {
    return `${appConfigAudience}/.default`;
  } else if (
    appConfigEndpoint.endsWith("azconfig.azure.us") ||
    appConfigEndpoint.endsWith("appconfig.azure.us")
  ) {
    return `${KnownAppConfigAudience.AzureGovernment}/.default`;
  } else if (
    appConfigEndpoint.endsWith("azconfig.azure.cn") ||
    appConfigEndpoint.endsWith("appconfig.azure.cn")
  ) {
    return `${KnownAppConfigAudience.AzureChina}/.default`;
  } else {
    return `${KnownAppConfigAudience.AzurePublicCloud}/.default`;
  }
}
