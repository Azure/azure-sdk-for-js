// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListConfigurationSettingsOptions } from '..';
import { URLBuilder } from '@azure/core-http';
import { isArray } from 'util';
import { ListRevisionsOptions, ConfigurationSettingId, ConfigurationSetting, HttpConditionalFields, HttpResponseField, HttpResponseFields } from '../models';
import { AppConfigurationGetKeyValuesOptionalParams, KeyValue } from '../generated/src/models';

/**
 * Formats the etag so it can be used with a If-Match/If-None-Match header
 * @internal
 * @ignore
 */
export function quoteETag(etag: string | undefined): string | undefined {
  // https://tools.ietf.org/html/rfc7232#section-3.1
  if (etag === undefined || etag === '*') {
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
export function checkAndFormatIfAndIfNoneMatch(configurationSetting: ConfigurationSettingId, options: HttpConditionalFields): { ifMatch: string | undefined, ifNoneMatch: string | undefined } {
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
): Pick<AppConfigurationGetKeyValuesOptionalParams, "key" | "label" | "select"> {
  let key;

  if (listConfigOptions.keys) {
    // TODO: escape commas?
    key = listConfigOptions.keys.join(",");
  }

  let label;

  if (listConfigOptions.labels) {
    label = listConfigOptions.labels.join(",");
  }

  let fields;

  if (listConfigOptions.fields) {
    fields = listConfigOptions.fields.map(opt => opt === "readOnly" ? "locked" : opt);
  }

  return {
    key,
    label,
    select: fields
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

  if (afterToken == null || isArray(afterToken)) {
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
export function makeConfigurationSettingEmpty(configurationSetting: Partial<Record<Exclude<keyof ConfigurationSetting, 'key'>, any>>) {
  const names: (Exclude<keyof ConfigurationSetting, 'key'>)[] = [
    "contentType",
    "etag",
    "label",
    "lastModified",
    "readOnly",
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
export function transformKeyValue(kvp: KeyValue) : ConfigurationSetting {  
  const obj : ConfigurationSetting & KeyValue = {
    ...kvp,
    readOnly: !!kvp.locked
  };

  delete obj.locked;
  return obj;
}

/**
 * @ignore
 * @internal
 */
export function transformKeyValueResponseWithStatusCode<T extends KeyValue & HttpResponseField<any>>(kvp: T) : ConfigurationSetting & HttpResponseField<any> & HttpResponseFields {
  return addResponseField(kvp, <ConfigurationSetting & HttpResponseField<any> & HttpResponseFields>{
    ...transformKeyValue(kvp),
    statusCode: kvp._response.status,
  });
}

/**
 * @ignore
 * @internal
 */
export function transformKeyValueResponse<T extends KeyValue & HttpResponseField<any>>(kvp: T) : ConfigurationSetting & HttpResponseField<any> {
  return addResponseField(kvp, <ConfigurationSetting & HttpResponseField<any>>{
    ...transformKeyValue(kvp)
  });
}

function addResponseField<T extends HttpResponseField<any>>(originalResponse: HttpResponseField<any>, newResponse: T) : T {
  Object.defineProperty(newResponse, '_response', {
    enumerable: false,
    value: originalResponse._response
  });

  return newResponse;
}