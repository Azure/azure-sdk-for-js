// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AggregateType } from "../../request/ErrorResponse";
import { AverageAggregator } from "./AverageAggregator";
import { CountAggregator } from "./CountAggregator";
import { MaxAggregator } from "./MaxAggregator";
import { MinAggregator } from "./MinAggregator";
import { StaticValueAggregator } from "./StaticValueAggregator";
import { SumAggregator } from "./SumAggregator";

export function createAggregator(
  aggregateType: AggregateType
):
  | AverageAggregator
  | CountAggregator
  | MaxAggregator
  | MinAggregator
  | SumAggregator
  | StaticValueAggregator {
  switch (aggregateType) {
    case "Average":
      return new AverageAggregator();
    case "Count":
      return new CountAggregator();
    case "Max":
      return new MaxAggregator();
    case "Min":
      return new MinAggregator();
    case "Sum":
      return new SumAggregator();
    default:
      return new StaticValueAggregator();
  }
}

export { AverageAggregator, CountAggregator, MaxAggregator, MinAggregator, SumAggregator };
export { Aggregator } from "./Aggregator";
