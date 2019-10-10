// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListConfigurationSettingsOptions } from '..';
import { URLBuilder, ResponseBodyNotFoundError } from '@azure/core-http';
import { isArray } from 'util';
import { ListRevisionsOptions, ConfigurationSetting, HttpResponseField } from '../models';
import { AppConfigurationGetKeyValuesOptionalParams } from '../generated/src/models';

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
 * Checks the ifMatch/ifNoneMatch properties to make sure we haven't specified both
 * and throws an Error. Otherwise, returns the properties properly quoted.
 * @param options An options object with ifMatch/ifNoneMatch fields 
 * @internal
 * @ignore
 */
export function checkAndFormatIfAndIfNoneMatch(options: { ifMatch?: string, ifNoneMatch?: string }): { ifMatch: string | undefined, ifNoneMatch: string | undefined } {
  if (options.ifMatch && options.ifNoneMatch) {
    throw new Error("ifMatch and ifNoneMatch are mutually-exclusive");
  }

  let ifMatch;
  let ifNoneMatch;

  if (options.ifMatch) {
    ifMatch = quoteETag(options.ifMatch);
  }

  if (options.ifNoneMatch) {
    ifNoneMatch = quoteETag(options.ifNoneMatch);
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
): Pick<AppConfigurationGetKeyValuesOptionalParams, "key" | "label"> {
  let key;

  if (listConfigOptions.keys) {
    // TODO: escape commas?
    key = listConfigOptions.keys.join(",");
  }

  let label;

  if (listConfigOptions.labels) {
    label = listConfigOptions.labels.join(",");
  }

  return {
    key,
    label
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
 * @param response The response to alter
 * @param errorMessage The error message to use for the thrown ResponseBodyNotFoundError
 * @param errorCode The error code to use for the thrown ResponseBodyNotFoundError
 */
export function makeConfigurationSettingsFieldsThrow(response: ConfigurationSetting & HttpResponseField<any>, errorMessage: string, errorCode: string) {
  const errThrower = () => {
    throw new ResponseBodyNotFoundError(errorMessage, errorCode, response._response.status, response._response.request, response._response, null);
  };

  // TODO:  can I identify these fields in a less manual manner?
  const names: (keyof ConfigurationSetting)[] = [
    "contentType",
    "etag",
    "key",
    "label",
    "lastModified",
    "locked",
    "tags",
    "value"
  ];

  for (const name of names) {
    Object.defineProperty(response, name, {
      get: errThrower
    });
  }
}
