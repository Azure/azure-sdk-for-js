// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DateTimeInterval,
  dateTimeIntervalSerializer,
  ResultFormat,
} from "../resourceGraphCommon/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes a history request to be executed. */
export interface ResourcesHistoryRequest {
  /** Azure subscriptions against which to execute the query. */
  subscriptions?: string[];
  /** The resources query. */
  query?: string;
  /** The history request evaluation options */
  options?: ResourcesHistoryRequestOptions;
  /** Azure management groups against which to execute the query. Example: [ 'mg1', 'mg2' ] */
  managementGroups?: string[];
}

export function resourcesHistoryRequestSerializer(item: ResourcesHistoryRequest): any {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
    query: item["query"],
    options: !item["options"]
      ? item["options"]
      : resourcesHistoryRequestOptionsSerializer(item["options"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : item["managementGroups"].map((p: any) => {
          return p;
        }),
  };
}

/** The options for history request evaluation */
export interface ResourcesHistoryRequestOptions {
  /** The time interval used to fetch history. */
  interval?: DateTimeInterval;
  /** The maximum number of rows that the query should return. Overrides the page size when ```$skipToken``` property is present. */
  top?: number;
  /** The number of rows to skip from the beginning of the results. Overrides the next page offset when ```$skipToken``` property is present. */
  skip?: number;
  /** Continuation token for pagination, capturing the next page size and offset, as well as the context of the query. */
  skipToken?: string;
  /** Defines in which format query result returned. */
  resultFormat?: ResultFormat;
}

export function resourcesHistoryRequestOptionsSerializer(
  item: ResourcesHistoryRequestOptions,
): any {
  return {
    interval: !item["interval"] ? item["interval"] : dateTimeIntervalSerializer(item["interval"]),
    $top: item["top"],
    $skip: item["skip"],
    $skipToken: item["skipToken"],
    resultFormat: item["resultFormat"],
  };
}
