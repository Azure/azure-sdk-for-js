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

/**
 * Formats the etag so it can be used with a If-Match/If-None-Match header
 * @internal
 * @ignore
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
 * @param options An options object with onlyIfChanged/onlyIfUnchanged fields
 * @internal
 * @ignore
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
 * Transforms the keys/labels parameters in the listConfigurationSettings and listRevisions
 * into the format the REST call will need.
 *
 * @internal
 * @ignore
 */
export function formatWildcards(
  listConfigOptions: ListConfigurationSettingsOptions | ListRevisionsOptions
): Pick<AppConfigurationGetKeyValuesOptionalParams, "key" | "label" | "select" | "acceptDatetime"> {
  let fieldsToGet: (keyof KeyValue)[] | undefined;

  if (listConfigOptions.fields) {
    fieldsToGet = listConfigOptions.fields.map((opt) => {
      if (opt === "isReadOnly") {
        return "locked";
      }

      return opt;
    });
  }

  let acceptDatetime: string | undefined = undefined;

  if (listConfigOptions.acceptDateTime) {
    acceptDatetime = listConfigOptions.acceptDateTime.toISOString();
  }

  return {
    key: listConfigOptions.keyFilter,
    label: listConfigOptions.labelFilter,
    acceptDatetime,
    select: fieldsToGet
  };
}

/**
 * Handles translating a Date acceptDateTime into a string as needed by the API
 * @param newOptions A newer style options with acceptDateTime as a date (and with proper casing!)
 * @internal
 * @ignore
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
 * @ignore
 */
export function extractAfterTokenFromNextLink(nextLink: string) {
  let parsedLink = URLBuilder.parse(nextLink);
  let afterToken = parsedLink.getQueryParameterValue("after");

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
 * @param configurationSetting The configuration setting to alter
 */
export function makeConfigurationSettingEmpty(
  configurationSetting: Partial<Record<Exclude<keyof ConfigurationSetting, "key">, any>>
) {
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
 * @ignore
 * @internal
 */
export function transformKeyValue(kvp: KeyValue): ConfigurationSetting {
  const obj: ConfigurationSetting & KeyValue = {
    ...kvp,
    isReadOnly: !!kvp.locked
  };

  delete obj.locked;
  return obj;
}

/**
 * @ignore
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
 * @ignore
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
