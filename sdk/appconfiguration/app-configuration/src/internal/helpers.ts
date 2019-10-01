// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ETagOption, ListConfigurationSettingsOptions, AppConfigurationGetKeyValuesOptionalParams } from '..';
import { URLBuilder } from '@azure/core-http';
import { isArray } from 'util';
import { ListRevisionsOptions } from '../models';

/**
 * Formats the etag so it can be used with a if-match header
 * @internal
 * @ignore
 */
export function formatETagForMatchHeaders(objectWithEtag: ETagOption): string | undefined {
  if (objectWithEtag.etag) {
    return `"${objectWithEtag.etag}"`;
  }

  return undefined;
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
