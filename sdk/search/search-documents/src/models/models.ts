// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchIndexResponse } from "./azure/search/documents/indexes/models.js";
import { searchIndexResponseArrayDeserializer } from "./azure/search/documents/indexes/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Response from a List Indexes request. If successful, it includes the full definitions of all indexes. */
export interface _ListIndexesSelectedResult {
  /** The indexes in the Search service. */
  readonly value: SearchIndexResponse[];
}

export function _listIndexesSelectedResultDeserializer(item: any): _ListIndexesSelectedResult {
  return {
    value: searchIndexResponseArrayDeserializer(item["value"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-04-01 API version. */
  V20260401 = "2026-04-01",
}
