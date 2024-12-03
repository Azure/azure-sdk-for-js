// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryFeature } from "../common";

export function supportedQueryFeaturesBuilder(disableNonStreamingOrderByQuery?: boolean): string {
  if (disableNonStreamingOrderByQuery) {
    return Object.keys(QueryFeature)
      .filter((k) => k !== QueryFeature.NonStreamingOrderBy)
      .join(", ");
  } else {
    return Object.keys(QueryFeature).join(", ");
  }
}
