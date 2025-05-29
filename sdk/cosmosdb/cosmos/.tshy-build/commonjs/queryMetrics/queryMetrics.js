"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMetrics = void 0;
const tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const clientSideMetrics_js_1 = require("./clientSideMetrics.js");
const queryMetricsConstants_js_1 = tslib_1.__importDefault(require("./queryMetricsConstants.js"));
const queryMetricsUtils_js_1 = require("./queryMetricsUtils.js");
const queryPreparationTime_js_1 = require("./queryPreparationTime.js");
const runtimeExecutionTimes_js_1 = require("./runtimeExecutionTimes.js");
const timeSpan_js_1 = require("./timeSpan.js");
class QueryMetrics {
    constructor(retrievedDocumentCount, retrievedDocumentSize, outputDocumentCount, outputDocumentSize, indexHitDocumentCount, totalQueryExecutionTime, queryPreparationTimes, indexLookupTime, documentLoadTime, vmExecutionTime, runtimeExecutionTimes, documentWriteTime, clientSideMetrics) {
        this.retrievedDocumentCount = retrievedDocumentCount;
        this.retrievedDocumentSize = retrievedDocumentSize;
        this.outputDocumentCount = outputDocumentCount;
        this.outputDocumentSize = outputDocumentSize;
        this.indexHitDocumentCount = indexHitDocumentCount;
        this.totalQueryExecutionTime = totalQueryExecutionTime;
        this.queryPreparationTimes = queryPreparationTimes;
        this.indexLookupTime = indexLookupTime;
        this.documentLoadTime = documentLoadTime;
        this.vmExecutionTime = vmExecutionTime;
        this.runtimeExecutionTimes = runtimeExecutionTimes;
        this.documentWriteTime = documentWriteTime;
        this.clientSideMetrics = clientSideMetrics;
    }
    /**
     * Gets the IndexHitRatio
     * @hidden
     */
    get indexHitRatio() {
        return this.retrievedDocumentCount === 0
            ? 1
            : this.indexHitDocumentCount / this.retrievedDocumentCount;
    }
    /**
     * returns a new QueryMetrics instance that is the addition of this and the arguments.
     */
    add(queryMetricsArray) {
        let retrievedDocumentCount = 0;
        let retrievedDocumentSize = 0;
        let outputDocumentCount = 0;
        let outputDocumentSize = 0;
        let indexHitDocumentCount = 0;
        let totalQueryExecutionTime = timeSpan_js_1.TimeSpan.zero;
        const queryPreparationTimesArray = [];
        let indexLookupTime = timeSpan_js_1.TimeSpan.zero;
        let documentLoadTime = timeSpan_js_1.TimeSpan.zero;
        let vmExecutionTime = timeSpan_js_1.TimeSpan.zero;
        const runtimeExecutionTimesArray = [];
        let documentWriteTime = timeSpan_js_1.TimeSpan.zero;
        const clientSideQueryMetricsArray = [];
        queryMetricsArray.push(this);
        for (const queryMetrics of queryMetricsArray) {
            if (queryMetrics) {
                retrievedDocumentCount += queryMetrics.retrievedDocumentCount;
                retrievedDocumentSize += queryMetrics.retrievedDocumentSize;
                outputDocumentCount += queryMetrics.outputDocumentCount;
                outputDocumentSize += queryMetrics.outputDocumentSize;
                indexHitDocumentCount += queryMetrics.indexHitDocumentCount;
                totalQueryExecutionTime = totalQueryExecutionTime.add(queryMetrics.totalQueryExecutionTime);
                queryPreparationTimesArray.push(queryMetrics.queryPreparationTimes);
                indexLookupTime = indexLookupTime.add(queryMetrics.indexLookupTime);
                documentLoadTime = documentLoadTime.add(queryMetrics.documentLoadTime);
                vmExecutionTime = vmExecutionTime.add(queryMetrics.vmExecutionTime);
                runtimeExecutionTimesArray.push(queryMetrics.runtimeExecutionTimes);
                documentWriteTime = documentWriteTime.add(queryMetrics.documentWriteTime);
                clientSideQueryMetricsArray.push(queryMetrics.clientSideMetrics);
            }
        }
        return new QueryMetrics(retrievedDocumentCount, retrievedDocumentSize, outputDocumentCount, outputDocumentSize, indexHitDocumentCount, totalQueryExecutionTime, queryPreparationTime_js_1.QueryPreparationTimes.createFromArray(queryPreparationTimesArray), indexLookupTime, documentLoadTime, vmExecutionTime, runtimeExecutionTimes_js_1.RuntimeExecutionTimes.createFromArray(runtimeExecutionTimesArray), documentWriteTime, clientSideMetrics_js_1.ClientSideMetrics.createFromArray(...clientSideQueryMetricsArray));
    }
    /**
     * Output the QueryMetrics as a delimited string.
     * @hidden
     */
    toDelimitedString() {
        return (queryMetricsConstants_js_1.default.RetrievedDocumentCount +
            "=" +
            this.retrievedDocumentCount +
            ";" +
            queryMetricsConstants_js_1.default.RetrievedDocumentSize +
            "=" +
            this.retrievedDocumentSize +
            ";" +
            queryMetricsConstants_js_1.default.OutputDocumentCount +
            "=" +
            this.outputDocumentCount +
            ";" +
            queryMetricsConstants_js_1.default.OutputDocumentSize +
            "=" +
            this.outputDocumentSize +
            ";" +
            queryMetricsConstants_js_1.default.IndexHitRatio +
            "=" +
            this.indexHitRatio +
            ";" +
            queryMetricsConstants_js_1.default.TotalQueryExecutionTimeInMs +
            "=" +
            this.totalQueryExecutionTime.totalMilliseconds() +
            ";" +
            this.queryPreparationTimes.toDelimitedString() +
            ";" +
            queryMetricsConstants_js_1.default.IndexLookupTimeInMs +
            "=" +
            this.indexLookupTime.totalMilliseconds() +
            ";" +
            queryMetricsConstants_js_1.default.DocumentLoadTimeInMs +
            "=" +
            this.documentLoadTime.totalMilliseconds() +
            ";" +
            queryMetricsConstants_js_1.default.VMExecutionTimeInMs +
            "=" +
            this.vmExecutionTime.totalMilliseconds() +
            ";" +
            this.runtimeExecutionTimes.toDelimitedString() +
            ";" +
            queryMetricsConstants_js_1.default.DocumentWriteTimeInMs +
            "=" +
            this.documentWriteTime.totalMilliseconds());
    }
    /**
     * Returns a new instance of the QueryMetrics class that is the aggregation of an array of query metrics.
     */
    static createFromArray(queryMetricsArray) {
        if (!queryMetricsArray) {
            throw new Error("queryMetricsArray is null or undefined item(s)");
        }
        return QueryMetrics.zero.add(queryMetricsArray);
    }
    /**
     * Returns a new instance of the QueryMetrics class this is deserialized from a delimited string.
     */
    static createFromDelimitedString(delimitedString, clientSideMetrics) {
        const metrics = (0, queryMetricsUtils_js_1.parseDelimitedString)(delimitedString);
        const indexHitRatio = metrics[queryMetricsConstants_js_1.default.IndexHitRatio] || 0;
        const retrievedDocumentCount = metrics[queryMetricsConstants_js_1.default.RetrievedDocumentCount] || 0;
        const indexHitCount = indexHitRatio * retrievedDocumentCount;
        const outputDocumentCount = metrics[queryMetricsConstants_js_1.default.OutputDocumentCount] || 0;
        const outputDocumentSize = metrics[queryMetricsConstants_js_1.default.OutputDocumentSize] || 0;
        const retrievedDocumentSize = metrics[queryMetricsConstants_js_1.default.RetrievedDocumentSize] || 0;
        const totalQueryExecutionTime = (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.TotalQueryExecutionTimeInMs);
        return new QueryMetrics(retrievedDocumentCount, retrievedDocumentSize, outputDocumentCount, outputDocumentSize, indexHitCount, totalQueryExecutionTime, queryPreparationTime_js_1.QueryPreparationTimes.createFromDelimitedString(delimitedString), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.IndexLookupTimeInMs), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.DocumentLoadTimeInMs), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.VMExecutionTimeInMs), runtimeExecutionTimes_js_1.RuntimeExecutionTimes.createFromDelimitedString(delimitedString), (0, queryMetricsUtils_js_1.timeSpanFromMetrics)(metrics, queryMetricsConstants_js_1.default.DocumentWriteTimeInMs), clientSideMetrics || clientSideMetrics_js_1.ClientSideMetrics.zero);
    }
}
exports.QueryMetrics = QueryMetrics;
QueryMetrics.zero = new QueryMetrics(0, 0, 0, 0, 0, timeSpan_js_1.TimeSpan.zero, queryPreparationTime_js_1.QueryPreparationTimes.zero, timeSpan_js_1.TimeSpan.zero, timeSpan_js_1.TimeSpan.zero, timeSpan_js_1.TimeSpan.zero, runtimeExecutionTimes_js_1.RuntimeExecutionTimes.zero, timeSpan_js_1.TimeSpan.zero, clientSideMetrics_js_1.ClientSideMetrics.zero);
//# sourceMappingURL=queryMetrics.js.map