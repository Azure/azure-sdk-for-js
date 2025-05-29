// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import QueryMetricsConstants from "./queryMetricsConstants.js";
import { parseDelimitedString, timeSpanFromMetrics } from "./queryMetricsUtils.js";
import { TimeSpan } from "./timeSpan.js";
export class QueryPreparationTimes {
    constructor(queryCompilationTime, logicalPlanBuildTime, physicalPlanBuildTime, queryOptimizationTime) {
        this.queryCompilationTime = queryCompilationTime;
        this.logicalPlanBuildTime = logicalPlanBuildTime;
        this.physicalPlanBuildTime = physicalPlanBuildTime;
        this.queryOptimizationTime = queryOptimizationTime;
    }
    /**
     * returns a new QueryPreparationTimes instance that is the addition of this and the arguments.
     */
    add(...queryPreparationTimesArray) {
        let queryCompilationTime = this.queryCompilationTime;
        let logicalPlanBuildTime = this.logicalPlanBuildTime;
        let physicalPlanBuildTime = this.physicalPlanBuildTime;
        let queryOptimizationTime = this.queryOptimizationTime;
        for (const queryPreparationTimes of queryPreparationTimesArray) {
            if (queryPreparationTimes == null) {
                throw new Error("queryPreparationTimesArray has null or undefined item(s)");
            }
            queryCompilationTime = queryCompilationTime.add(queryPreparationTimes.queryCompilationTime);
            logicalPlanBuildTime = logicalPlanBuildTime.add(queryPreparationTimes.logicalPlanBuildTime);
            physicalPlanBuildTime = physicalPlanBuildTime.add(queryPreparationTimes.physicalPlanBuildTime);
            queryOptimizationTime = queryOptimizationTime.add(queryPreparationTimes.queryOptimizationTime);
        }
        return new QueryPreparationTimes(queryCompilationTime, logicalPlanBuildTime, physicalPlanBuildTime, queryOptimizationTime);
    }
    /**
     * Output the QueryPreparationTimes as a delimited string.
     */
    toDelimitedString() {
        return (`${QueryMetricsConstants.QueryCompileTimeInMs}=${this.queryCompilationTime.totalMilliseconds()};` +
            `${QueryMetricsConstants.LogicalPlanBuildTimeInMs}=${this.logicalPlanBuildTime.totalMilliseconds()};` +
            `${QueryMetricsConstants.PhysicalPlanBuildTimeInMs}=${this.physicalPlanBuildTime.totalMilliseconds()};` +
            `${QueryMetricsConstants.QueryOptimizationTimeInMs}=${this.queryOptimizationTime.totalMilliseconds()}`);
    }
    /**
     * Returns a new instance of the QueryPreparationTimes class that is the
     * aggregation of an array of QueryPreparationTimes.
     */
    static createFromArray(queryPreparationTimesArray) {
        if (queryPreparationTimesArray == null) {
            throw new Error("queryPreparationTimesArray is null or undefined item(s)");
        }
        return QueryPreparationTimes.zero.add(...queryPreparationTimesArray);
    }
    /**
     * Returns a new instance of the QueryPreparationTimes class this is deserialized from a delimited string.
     */
    static createFromDelimitedString(delimitedString) {
        const metrics = parseDelimitedString(delimitedString);
        return new QueryPreparationTimes(timeSpanFromMetrics(metrics, QueryMetricsConstants.QueryCompileTimeInMs), timeSpanFromMetrics(metrics, QueryMetricsConstants.LogicalPlanBuildTimeInMs), timeSpanFromMetrics(metrics, QueryMetricsConstants.PhysicalPlanBuildTimeInMs), timeSpanFromMetrics(metrics, QueryMetricsConstants.QueryOptimizationTimeInMs));
    }
}
QueryPreparationTimes.zero = new QueryPreparationTimes(TimeSpan.zero, TimeSpan.zero, TimeSpan.zero, TimeSpan.zero);
//# sourceMappingURL=queryPreparationTime.js.map