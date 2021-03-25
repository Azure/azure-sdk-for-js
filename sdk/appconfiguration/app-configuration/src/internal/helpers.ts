// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListConfigurationSettingsOptions } from "..";
import { URLBuilder } from "@azure/core-http";
import {
  ListRevisionsOptions,
  ConfigurationSettingId,
  ConfigurationSetting,
  HttpResponseField,
  HttpResponseFields,
  HttpOnlyIfChangedField,
  HttpOnlyIfUnchangedField
} from "../models";
import { AppConfigurationGetKeyValuesOptionalParams, KeyValue } from "../generated/src/models";
import { deserializeFeatureFlag, featureFlagContentType } from "../featureFlag";
import { deserializeSecretReference, secretReferenceContentType } from "../keyvaultReference";

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
  configurationSetting: ConfigurationSettingId,
  options: HttpOnlyIfChangedField & HttpOnlyIfUnchangedField
): { ifMatch: string | undefined; ifNoneMatch: string | undefined } {
  if (options.onlyIfChanged && options.onlyIfUnchanged) {
    throw new Error("onlyIfChanged and onlyIfUnchanged are mutually-exclusive");
  }

  let ifMatch;
  let ifNoneMatch;

  if (options.onlyIfUnchanged) {
    ifMatch = quoteETag(configurationSetting.etag);
  }

  if (options.onlyIfChanged) {
    ifNoneMatch = quoteETag(configurationSetting.etag);
  }

  return {
    ifMatch: ifMatch,
    ifNoneMatch: ifNoneMatch
  };
}

/**
 * Transforms some of the key fields in ListConfigurationSettingsOptions and ListRevisionsOptions
 * so they can be added to a request using AppConfigurationGetKeyValuesOptionalParams.
 * - `options.acceptDateTime` is converted into an ISO string
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter and labelFilter are moved to key and label, respectively.
 *
 * @internal
 */
export function formatFiltersAndSelect(
  listConfigOptions: ListConfigurationSettingsOptions | ListRevisionsOptions
): Pick<AppConfigurationGetKeyValuesOptionalParams, "key" | "label" | "select" | "acceptDatetime"> {
  let acceptDatetime: string | undefined = undefined;

  if (listConfigOptions.acceptDateTime) {
    acceptDatetime = listConfigOptions.acceptDateTime.toISOString();
  }

  return {
    key: listConfigOptions.keyFilter,
    label: listConfigOptions.labelFilter,
    acceptDatetime,
    select: formatFieldsForSelect(listConfigOptions.fields)
  };
}

/**
 * Handles translating a Date acceptDateTime into a string as needed by the API
 * @param newOptions - A newer style options with acceptDateTime as a date (and with proper casing!)
 * @internal
 */
export function formatAcceptDateTime(newOptions: {
  acceptDateTime?: Date;
}): { acceptDatetime?: string } {
  return {
    acceptDatetime: newOptions.acceptDateTime && newOptions.acceptDateTime.toISOString()
  };
}

/**
 * Take the URL that gets returned from next link and extract the 'after' token needed
 * to get the next page of results.
 * @internal
 */
export function extractAfterTokenFromNextLink(nextLink: string): string {
  const parsedLink = URLBuilder.parse(nextLink);
  const afterToken = parsedLink.getQueryParameterValue("after");

  if (afterToken == null || Array.isArray(afterToken)) {
    throw new Error("Invalid nextLink - invalid after token");
  }

  return decodeURIComponent(afterToken);
}

/**
 * Makes a ConfigurationSetting-based response throw for all of the data members. Used primarily
 * to prevent possible errors by the user in accessing a model that is uninitialized. This can happen
 * in cases like HTTP status code 204 or 304, which return an empty response body.
 *
 * @param configurationSetting - The configuration setting to alter
 */
export function makeConfigurationSettingEmpty(
  configurationSetting: Partial<Record<Exclude<keyof ConfigurationSetting, "key">, any>>
): void {
  const names: Exclude<keyof ConfigurationSetting, "key">[] = [
    "contentType",
    "etag",
    "label",
    "lastModified",
    "isReadOnly",
    "tags",
    "value"
  ];

  for (const name of names) {
    configurationSetting[name] = undefined;
  }
}

/**
 * @internal
 */
export function transformKeyValue(kvp: KeyValue): ConfigurationSetting {
  const setting: ConfigurationSetting & KeyValue = {
    ...kvp,
    isReadOnly: !!kvp.locked
  };

  delete setting.locked;

  switch (setting.contentType) {
    case featureFlagContentType: {
      return deserializeFeatureFlag(setting) ?? setting;
    }
    case secretReferenceContentType: {
      return deserializeSecretReference(setting) ?? setting;
    }
    default:
      return setting;
  }
}

/**
 * @internal
 */
export function transformKeyValueResponseWithStatusCode<
  T extends KeyValue & HttpResponseField<any>
>(kvp: T): ConfigurationSetting & { eTag?: string } & HttpResponseField<any> & HttpResponseFields {
  return normalizeResponse(kvp, <
    ConfigurationSetting & HttpResponseField<any> & HttpResponseFields
  >{
    ...transformKeyValue(kvp),
    statusCode: kvp._response.status
  });
}

/**
 * @internal
 */
export function transformKeyValueResponse<
  T extends KeyValue & { eTag?: string } & HttpResponseField<any>
>(kvp: T): ConfigurationSetting & HttpResponseField<any> {
  return normalizeResponse(kvp, <ConfigurationSetting & HttpResponseField<any>>{
    ...transformKeyValue(kvp)
  });
}

function normalizeResponse<T extends HttpResponseField<any> & { eTag?: string }>(
  originalResponse: HttpResponseField<any>,
  newResponse: T
): T {
  Object.defineProperty(newResponse, "_response", {
    enumerable: false,
    value: originalResponse._response
  });

  // this field comes from the header but it's redundant with
  // the one serialized in the model itself
  delete newResponse.eTag;

  return newResponse;
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
  fieldNames: (keyof ConfigurationSetting)[] | undefined
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
