"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPreparationTimes = void 0;
const tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const queryMetricsConstants_js_1 = tslib_1.__importDefault(require("./queryMetricsConstants.js"));
const queryMetricsUtils_js_1 = require("./queryMetricsUtils.js");
const timeSpan_js_1 = require("./timeSpan.js");
class QueryPreparationTimes {
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
        return (`${queryMetricsConstants_js_1.default.QueryCompileTimeInMs}=${this.queryCompilationTime.totalMilliseconds()};` +
            `${queryMetricsConstants_js_1.default.LogicalPlanBuildTimeInMs}=${this.logicalPlanBuildTime.totalMilliseconds()};` +
            `${queryMetricsConstants_js_1.default.PhysicalPlanBuildTimeInMs}=${this.physicalPlanBuildTime.totalMilliseconds()};` +
            `${queryMetricsConstants_js_1.default.QueryOptimizationTimeInMs}=${this.queryOptimizationTime.totalMilliseconds()}`);
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
        const metrics = (0, queryMetricsUtils_js_1.parseDelimitedString)(delimitedString);
        return new QueryPreparationTimes((0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.QueryCompileTimeInMs), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.LogicalPlanBuildTimeInMs), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.PhysicalPlanBuildTimeInMs), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.QueryOptimizationTimeInMs));
    }
}
exports.QueryPreparationTimes = QueryPreparationTimes;
QueryPreparationTimes.zero = new QueryPreparationTimes(timeSpan_js_1.TimeSpan.zero, timeSpan_js_1.TimeSpan.zero, timeSpan_js_1.TimeSpan.zero, timeSpan_js_1.TimeSpan.zero);
//# sourceMappingURL=queryPreparationTime.js.map