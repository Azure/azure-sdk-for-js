"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeExecutionTimes = void 0;
const tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const queryMetricsConstants_js_1 = tslib_1.__importDefault(require("./queryMetricsConstants.js"));
const queryMetricsUtils_js_1 = require("./queryMetricsUtils.js");
const timeSpan_js_1 = require("./timeSpan.js");
class RuntimeExecutionTimes {
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
        return (`${queryMetricsConstants_js_1.default.SystemFunctionExecuteTimeInMs}=${this.systemFunctionExecutionTime.totalMilliseconds()};` +
            `${queryMetricsConstants_js_1.default.UserDefinedFunctionExecutionTimeInMs}=${this.userDefinedFunctionExecutionTime.totalMilliseconds()}`);
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
        const metrics = (0, queryMetricsUtils_js_1.parseDelimitedString)(delimitedString);
        const vmExecutionTime = (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.VMExecutionTimeInMs);
        const indexLookupTime = (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.IndexLookupTimeInMs);
        const documentLoadTime = (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.DocumentLoadTimeInMs);
        const documentWriteTime = (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.DocumentWriteTimeInMs);
        let queryEngineExecutionTime = timeSpan_js_1.TimeSpan.zero;
        queryEngineExecutionTime = queryEngineExecutionTime.add(vmExecutionTime);
        queryEngineExecutionTime = queryEngineExecutionTime.subtract(indexLookupTime);
        queryEngineExecutionTime = queryEngineExecutionTime.subtract(documentLoadTime);
        queryEngineExecutionTime = queryEngineExecutionTime.subtract(documentWriteTime);
        return new RuntimeExecutionTimes(queryEngineExecutionTime, (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.SystemFunctionExecuteTimeInMs), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.UserDefinedFunctionExecutionTimeInMs));
    }
}
exports.RuntimeExecutionTimes = RuntimeExecutionTimes;
RuntimeExecutionTimes.zero = new RuntimeExecutionTimes(timeSpan_js_1.TimeSpan.zero, timeSpan_js_1.TimeSpan.zero, timeSpan_js_1.TimeSpan.zero);
//# sourceMappingURL=runtimeExecutionTimes.js.map