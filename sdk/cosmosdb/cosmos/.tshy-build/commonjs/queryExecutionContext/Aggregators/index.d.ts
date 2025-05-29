import { AverageAggregator } from "./AverageAggregator.js";
import { CountAggregator } from "./CountAggregator.js";
import { MaxAggregator } from "./MaxAggregator.js";
import { MinAggregator } from "./MinAggregator.js";
import { SumAggregator } from "./SumAggregator.js";
import { StaticValueAggregator } from "./StaticValueAggregator.js";
import type { AggregateType } from "../../request/ErrorResponse.js";
export declare function createAggregator(aggregateType: AggregateType): AverageAggregator | CountAggregator | MaxAggregator | MinAggregator | SumAggregator | StaticValueAggregator;
export { AverageAggregator, CountAggregator, MaxAggregator, MinAggregator, SumAggregator };
export { Aggregator } from "./Aggregator.js";
//# sourceMappingURL=index.d.ts.map