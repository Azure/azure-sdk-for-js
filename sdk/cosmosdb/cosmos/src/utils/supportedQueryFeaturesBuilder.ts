// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { QueryFeature } from "../common";

export function supportedQueryFeaturesBuilder(disableNonStreamingOrderByQuery?: boolean): string {
  const disableListAndSetAggregate = process.env.DISABLE_LIST_AND_SET_AGGREGATE === "true";
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
