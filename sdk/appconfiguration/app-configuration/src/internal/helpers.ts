// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListConfigurationSettingsOptions, AppConfigurationGetKeyValuesOptionalParams } from '..';
import { URLBuilder } from '@azure/core-http';
import { isArray } from 'util';
import { ListRevisionsOptions } from '../models';

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
