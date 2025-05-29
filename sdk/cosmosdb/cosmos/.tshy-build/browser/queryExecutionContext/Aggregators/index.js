// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AverageAggregator } from "./AverageAggregator.js";
import { CountAggregator } from "./CountAggregator.js";
import { MaxAggregator } from "./MaxAggregator.js";
import { MinAggregator } from "./MinAggregator.js";
import { SumAggregator } from "./SumAggregator.js";
import { StaticValueAggregator } from "./StaticValueAggregator.js";
import { MakeListAggregator } from "./MakeListAggregator.js";
import { MakeSetAggregator } from "./MakeSetAggregator.js";
export function createAggregator(aggregateType) {
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
        case "MakeList":
            return new MakeListAggregator();
        case "MakeSet":
            return new MakeSetAggregator();
        default:
            return new StaticValueAggregator();
    }
}
export { AverageAggregator, CountAggregator, MaxAggregator, MinAggregator, SumAggregator };
//# sourceMappingURL=index.js.map