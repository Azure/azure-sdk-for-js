// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes the list of web test locations available to an Application Insights Component. */
export interface _ApplicationInsightsWebTestLocationsListResult {
  /** List of web test locations. */
  value: ApplicationInsightsComponentWebTestLocation[];
  /** The URL to the next page of results */
  nextLink?: string;
}

export function _applicationInsightsWebTestLocationsListResultDeserializer(
  item: any,
): _ApplicationInsightsWebTestLocationsListResult {
  return {
    value: applicationInsightsComponentWebTestLocationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationInsightsComponentWebTestLocationArrayDeserializer(
  result: Array<ApplicationInsightsComponentWebTestLocation>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentWebTestLocationDeserializer(item);
  });
}

/** Properties that define a web test location available to an Application Insights Component. */
export interface ApplicationInsightsComponentWebTestLocation {
  /** The display name of the web test location. */
  readonly displayName?: string;
  /** Internally defined geographic location tag. */
  readonly tag?: string;
}

export function applicationInsightsComponentWebTestLocationDeserializer(
  item: any,
): ApplicationInsightsComponentWebTestLocation {
  return {
    displayName: item["DisplayName"],
    tag: item["Tag"],
  };
}
