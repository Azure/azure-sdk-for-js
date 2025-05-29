// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import QueryMetricsConstants from "./queryMetricsConstants.js";
import { parseDelimitedString, timeSpanFromMetrics } from "./queryMetricsUtils.js";
import { TimeSpan } from "./timeSpan.js";
export class RuntimeExecutionTimes {
    constructor(queryEngineExecutionTime, systemFunctionExecutionTime, userDefinedFunctionExecutionTime) {
        this.queryEngineExecutionTime = queryEngineExecutionTime;
        this.systemFunctionExecutionTime = systemFunctionExecutionTime;
        this.userDefinedFunctionExecutionTime = userDefinedFunctionExecutionTime;
    }
    /**
     * returns a new RuntimeExecutionTimes instance that is the addition of this and the arguments.
     */
    add(...runtimeExecutionTimesArray) {
        let queryEngineExecutionTime = this.queryEngineExecutionTime;
        let systemFunctionExecutionTime = this.systemFunctionExecutionTime;
        let userDefinedFunctionExecutionTime = this.userDefinedFunctionExecutionTime;
        for (const runtimeExecutionTimes of runtimeExecutionTimesArray) {
            if (runtimeExecutionTimes == null) {
                throw new Error("runtimeExecutionTimes has null or undefined item(s)");
            }
            queryEngineExecutionTime = queryEngineExecutionTime.add(runtimeExecutionTimes.queryEngineExecutionTime);
            systemFunctionExecutionTime = systemFunctionExecutionTime.add(runtimeExecutionTimes.systemFunctionExecutionTime);
            userDefinedFunctionExecutionTime = userDefinedFunctionExecutionTime.add(runtimeExecutionTimes.userDefinedFunctionExecutionTime);
        }
        return new RuntimeExecutionTimes(queryEngineExecutionTime, systemFunctionExecutionTime, userDefinedFunctionExecutionTime);
    }
    /**
     * Output the RuntimeExecutionTimes as a delimited string.
     */
    toDelimitedString() {
        return (`${QueryMetricsConstants.SystemFunctionExecuteTimeInMs}=${this.systemFunctionExecutionTime.totalMilliseconds()};` +
            `${QueryMetricsConstants.UserDefinedFunctionExecutionTimeInMs}=${this.userDefinedFunctionExecutionTime.totalMilliseconds()}`);
    }
    /**
     * Returns a new instance of the RuntimeExecutionTimes class that is
     *  the aggregation of an array of RuntimeExecutionTimes.
     */
    static createFromArray(runtimeExecutionTimesArray) {
        if (runtimeExecutionTimesArray == null) {
            throw new Error("runtimeExecutionTimesArray is null or undefined item(s)");
        }
        return RuntimeExecutionTimes.zero.add(...runtimeExecutionTimesArray);
    }
    /**
     * Returns a new instance of the RuntimeExecutionTimes class this is deserialized from a delimited string.
     */
    static createFromDelimitedString(delimitedString) {
        const metrics = parseDelimitedString(delimitedString);
        const vmExecutionTime = timeSpanFromMetrics(metrics, QueryMetricsConstants.VMExecutionTimeInMs);
        const indexLookupTime = timeSpanFromMetrics(metrics, QueryMetricsConstants.IndexLookupTimeInMs);
        const documentLoadTime = timeSpanFromMetrics(metrics, QueryMetricsConstants.DocumentLoadTimeInMs);
        const documentWriteTime = timeSpanFromMetrics(metrics, QueryMetricsConstants.DocumentWriteTimeInMs);
        let queryEngineExecutionTime = TimeSpan.zero;
        queryEngineExecutionTime = queryEngineExecutionTime.add(vmExecutionTime);
        queryEngineExecutionTime = queryEngineExecutionTime.subtract(indexLookupTime);
        queryEngineExecutionTime = queryEngineExecutionTime.subtract(documentLoadTime);
        queryEngineExecutionTime = queryEngineExecutionTime.subtract(documentWriteTime);
        return new RuntimeExecutionTimes(queryEngineExecutionTime, timeSpanFromMetrics(metrics, QueryMetricsConstants.SystemFunctionExecuteTimeInMs), timeSpanFromMetrics(metrics, QueryMetricsConstants.UserDefinedFunctionExecutionTimeInMs));
    }
}
RuntimeExecutionTimes.zero = new RuntimeExecutionTimes(TimeSpan.zero, TimeSpan.zero, TimeSpan.zero);
//# sourceMappingURL=runtimeExecutionTimes.js.map