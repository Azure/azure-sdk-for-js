import type { GlobalStatistics } from "../../request/globalStatistics.js";
import type { Aggregator } from "./Aggregator.js";
export declare class GlobalStatisticsAggregator implements Aggregator {
    private globalStatistics;
    constructor();
    aggregate(other: GlobalStatistics): void;
    getResult(): GlobalStatistics;
}
//# sourceMappingURL=GlobalStatisticsAggregator.d.ts.map