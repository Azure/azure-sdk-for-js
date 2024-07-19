// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { QueryFeature } from "../common";

export function supportedQueryFeaturesBuilder(
  disableNonStreamingOrderByQuery?: boolean,
  disableListAndSetAggregate?: boolean,
): string {
  if (disableNonStreamingOrderByQuery && disableListAndSetAggregate) {
    return Object.keys(QueryFeature)
      .filter(
        (k) => k !== QueryFeature.NonStreamingOrderBy && k !== QueryFeature.ListAndSetAggregate,
      )
      .join(", ");
  } else if (disableNonStreamingOrderByQuery) {
    return Object.keys(QueryFeature)
      .filter((k) => k !== QueryFeature.NonStreamingOrderBy)
      .join(", ");
  } else if (disableListAndSetAggregate) {
    return Object.keys(QueryFeature)
      .filter((k) => k !== QueryFeature.ListAndSetAggregate)
      .join(", ");
  } else {
    return Object.keys(QueryFeature).join(", ");
  }
}
