// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  searchIndexResponseArrayDeserializer,
  SearchIndexResponse,
} from "./azure/search/documents/indexes/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Response from a List Indexes request. If successful, it includes the full definitions of all indexes. */
export interface _ListIndexesSelectedResult {
  /** The total count of indexes in the service, or null if the count was not requested. */
  readonly count?: number;
  /** The indexes in the Search service. */
  readonly value: SearchIndexResponse[];
  /** The URL that can be used to fetch the next set of results. */
  readonly nextLink?: string;
}

export function _listIndexesSelectedResultDeserializer(item: any): _ListIndexesSelectedResult {
  return {
    count: item["@odata.count"],
    value: searchIndexResponseArrayDeserializer(item["value"]),
    nextLink: item["@odata.nextLink"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
  /** The 2026-04-01 API version. */
  V20260401 = "2026-04-01",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
}

export type GetDocumentCountResponse = { body: number };
