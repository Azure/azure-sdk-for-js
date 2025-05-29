"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRequestForQueryBatch = convertRequestForQueryBatch;
exports.convertResponseForQueryBatch = convertResponseForQueryBatch;
exports.fixInvalidBatchQueryResponse = fixInvalidBatchQueryResponse;
exports.convertRequestForMetricsBatchQuery = convertRequestForMetricsBatchQuery;
exports.convertRequestForMetrics = convertRequestForMetrics;
exports.convertResponseForMetrics = convertResponseForMetrics;
exports.convertRequestOptionsForMetricsDefinitions = convertRequestOptionsForMetricsDefinitions;
exports.convertResponseForMetricBatch = convertResponseForMetricBatch;
exports.convertResponseForMetricsDefinitions = convertResponseForMetricsDefinitions;
exports.convertResponseForMetricNamespaces = convertResponseForMetricNamespaces;
exports.convertGeneratedTable = convertGeneratedTable;
exports.convertBatchQueryResponseHelper = convertBatchQueryResponseHelper;
exports.computeResultType = computeResultType;
exports.mapError = mapError;
const tslib_1 = require("tslib");
const util_js_1 = require("./util.js");
const publicMetricsModels_js_1 = require("../models/publicMetricsModels.js");
const timespanConversion_js_1 = require("../timespanConversion.js");
const publicLogsModels_js_1 = require("../models/publicLogsModels.js");
/**
 * @internal
 */
function convertRequestForQueryBatch(batch) {
    let id = 0;
    const requests = batch.map((query) => {
        const body = {
            workspaceId: query.workspaceId,
            query: query.query,
        };
        if (query["additionalWorkspaces"]) {
            body["workspaces"] = query["additionalWorkspaces"].map((x) => x);
        }
        if (query["timespan"]) {
            body["timespan"] = (0, timespanConversion_js_1.convertTimespanToInterval)(query["timespan"]);
        }
        delete body["workspaceId"];
        delete body["includeQueryStatistics"];
        delete body["includeVisualization"];
        delete body["additionalWorkspaces"];
        delete body["serverTimeoutInSeconds"];
        const generatedRequest = {
            id: id.toString(),
            workspace: query.workspaceId,
            headers: (0, util_js_1.formatPreferHeader)(query),
            body,
        };
        ++id;
        return generatedRequest;
    });
    return {
        requests,
    };
}
/**
 * @internal
 */
function convertResponseForQueryBatch(generatedResponse, rawResponse) {
    var _a;
    const fixApplied = fixInvalidBatchQueryResponse(generatedResponse, rawResponse);
    /* Sort the ids that are passed in with the queries, as numbers instead of strings
     * It is not guaranteed that service will return the responses for queries in the same order
     * as the queries are passed in
     */
    const responseList = generatedResponse.responses || [];
    const newResponse = (_a = responseList === null || responseList === void 0 ? void 0 : responseList.sort((a, b) => {
        let left = 0;
        if (a.id != null) {
            left = parseInt(a.id, 10);
        }
        let right = 0;
        if (b.id != null) {
            right = parseInt(b.id, 10);
        }
        return left - right;
    })) === null || _a === void 0 ? void 0 : _a.map((response) => convertBatchQueryResponseHelper(response));
    newResponse["__fixApplied"] = fixApplied;
    return newResponse;
}
/**
 * This is a workaround for a service bug that we're investigating. The 'body' column will occasionally come
 * back as a JSON string, instead of being a JSON object.
 *
 * (examples, with excess stuff trimmed)
 * Correct: `{"responses":[{"body":{"tables":[{"name":"PrimaryResult","columns":[{"name":"stringcolumn","type":"string"}],"rows":[["hello"]}`
 * Broken: `{"responses":[{"body":"{\"tables\":[{\"name\":\"PrimaryResult\",\"columns\":[{\"name\":\"stringcolumn\",\"type\":\"string\"}],\"rows\":[[\"hello\"]}`
 *
 * Issue here: https://github.com/Azure/azure-sdk-for-js/issues/15688
 *
 * @internal
 */
function fixInvalidBatchQueryResponse(generatedResponse, rawResponse) {
    var _a;
    if (generatedResponse.responses == null) {
        return false;
    }
    let hadToFix = false;
    // the body here is incorrect, deserialize the correct one from the raw response itself.
    const parsedBody = JSON.parse(rawResponse.bodyAsText);
    // fix whichever responses are in this broken state (each query has it's own
    // response, so they're not all always broken)
    for (let i = 0; i < generatedResponse.responses.length; ++i) {
        if (((_a = generatedResponse.responses[i].body) === null || _a === void 0 ? void 0 : _a.error) != null) {
            continue;
        }
        // deserialize the raw response from the service, since we'll need index into it.
        generatedResponse.responses[i].body = parsedBody.responses[i].body;
        hadToFix = true;
    }
    return hadToFix;
}
/**
 * @internal
 */
function convertRequestForMetricsBatchQuery(metricsQueryResourcesOptions) {
    var _a, _b;
    if (!metricsQueryResourcesOptions) {
        return {};
    }
    return Object.assign({ starttime: (_a = metricsQueryResourcesOptions.startTime) === null || _a === void 0 ? void 0 : _a.toISOString(), endtime: (_b = metricsQueryResourcesOptions.endTime) === null || _b === void 0 ? void 0 : _b.toISOString(), rollupby: metricsQueryResourcesOptions.rollUpBy }, metricsQueryResourcesOptions);
}
/**
 * @internal
 */
function convertRequestForMetrics(metricNames, queryMetricsOptions) {
    if (!queryMetricsOptions) {
        return {};
    }
    const { orderBy, aggregations, metricNamespace, timespan, granularity, rollUpBy } = queryMetricsOptions, rest = tslib_1.__rest(queryMetricsOptions, ["orderBy", "aggregations", "metricNamespace", "timespan", "granularity", "rollUpBy"]);
    const obj = Object.assign({}, rest);
    if (timespan) {
        obj.timespan = (0, timespanConversion_js_1.convertTimespanToInterval)(timespan);
    }
    if (orderBy) {
        obj.orderby = orderBy;
    }
    if (metricNames) {
        obj.metricnames = metricNames.join(",");
    }
    if (aggregations) {
        obj.aggregation = aggregations.join(",");
    }
    if (metricNamespace) {
        obj.metricnamespace = metricNamespace;
    }
    if (granularity) {
        obj.interval = granularity;
    }
    if (rollUpBy) {
        obj.rollupby = rollUpBy;
    }
    return obj;
}
/**
 * @internal
 */
function convertResponseForMetrics(generatedResponse) {
    const metrics = generatedResponse.value.map((metric) => {
        const metricObject = Object.assign(Object.assign({}, metric), { name: metric.name.value, description: metric.displayDescription, timeseries: metric.timeseries.map((ts) => {
                var _a;
                return ({
                    data: ts.data,
                    metadataValues: (_a = ts.metadatavalues) === null || _a === void 0 ? void 0 : _a.map((mv) => {
                        var _a;
                        return (Object.assign(Object.assign({}, mv), { name: (_a = mv.name) === null || _a === void 0 ? void 0 : _a.value }));
                    }),
                });
            }) });
        delete metricObject.displayDescription;
        return metricObject;
    });
    const { resourceregion, value: _ignoredValue, interval, timespan } = generatedResponse, rest = tslib_1.__rest(generatedResponse, ["resourceregion", "value", "interval", "timespan"]);
    const obj = Object.assign(Object.assign({}, rest), { metrics, timespan: (0, timespanConversion_js_1.convertIntervalToTimeIntervalObject)(timespan) });
    if (resourceregion) {
        obj.resourceRegion = resourceregion;
    }
    if (interval) {
        obj.granularity = interval;
    }
    return (0, publicMetricsModels_js_1.createMetricsQueryResult)(obj);
}
/**
 * @internal
 */
function convertRequestOptionsForMetricsDefinitions(options) {
    if (!options) {
        return {};
    }
    const { metricNamespace } = options, rest = tslib_1.__rest(options, ["metricNamespace"]);
    const obj = Object.assign({}, rest);
    if (metricNamespace) {
        obj.metricnamespace = metricNamespace;
    }
    return obj;
}
function convertResponseForMetricBatch(generatedResponse) {
    var _a;
    const result = [];
    (_a = generatedResponse === null || generatedResponse === void 0 ? void 0 : generatedResponse.values) === null || _a === void 0 ? void 0 : _a.forEach((genDef) => {
        const response = {
            timespan: {
                startTime: new Date(genDef.starttime),
                endTime: new Date(genDef.endtime),
            },
            granularity: genDef.interval,
            namespace: genDef.namespace,
            resourceRegion: genDef.resourceregion,
            resourceId: genDef.resourceid,
            metrics: genDef.value.map((genValue) => {
                var _a;
                return Object.assign(Object.assign({}, genValue), { description: (_a = genValue.displayDescription) !== null && _a !== void 0 ? _a : "", name: genValue.name.value });
            }),
            getMetricByName: publicMetricsModels_js_1.getMetricByName,
        };
        result.push(response);
    });
    return result;
}
/**
 * @internal
 */
function convertResponseForMetricsDefinitions(generatedResponse) {
    const definitions = generatedResponse === null || generatedResponse === void 0 ? void 0 : generatedResponse.map((genDef) => {
        const { name, dimensions, displayDescription, metricAvailabilities } = genDef, rest = tslib_1.__rest(genDef, ["name", "dimensions", "displayDescription", "metricAvailabilities"]);
        const response = Object.assign({}, rest);
        if (displayDescription) {
            response.description = displayDescription;
        }
        if (name === null || name === void 0 ? void 0 : name.value) {
            response.name = name.value;
        }
        const mappedMetricAvailabilities = metricAvailabilities === null || metricAvailabilities === void 0 ? void 0 : metricAvailabilities.map((genMetricAvail) => {
            return {
                granularity: genMetricAvail.timeGrain,
                retention: genMetricAvail.retention,
            };
        });
        if (mappedMetricAvailabilities) {
            response.metricAvailabilities = mappedMetricAvailabilities;
        }
        const mappedDimensions = dimensions === null || dimensions === void 0 ? void 0 : dimensions.map((dim) => dim.value);
        if (mappedDimensions) {
            response.dimensions = mappedDimensions;
        }
        return response;
    });
    return definitions;
}
/**
 * @internal
 */
function convertResponseForMetricNamespaces(generatedResponse) {
    const namespaces = generatedResponse === null || generatedResponse === void 0 ? void 0 : generatedResponse.map((genDef) => {
        const { properties } = genDef, rest = tslib_1.__rest(genDef, ["properties"]);
        const response = Object.assign({}, rest);
        if (properties) {
            response.metricNamespaceName = properties.metricNamespaceName;
        }
        return response;
    });
    return namespaces;
}
/**
 * @internal
 */
function convertGeneratedTable(table) {
    const dynamicsIndices = [];
    const datesIndices = [];
    // most columns convert on deserialization except for `dynamic` columns (basically JSON objects)
    // and 'datetime' (strings that are ISO8601 formatted dates)
    for (let i = 0; i < table.columns.length; ++i) {
        if (table.columns[i].type === "datetime") {
            datesIndices.push(i);
        }
        else if (table.columns[i].type === "dynamic") {
            dynamicsIndices.push(i);
        }
    }
    return Object.assign(Object.assign({}, table), { rows: table.rows.map((row) => {
            for (const dynamicIndex of dynamicsIndices) {
                try {
                    row[dynamicIndex] = JSON.parse(row[dynamicIndex]);
                }
                catch (_err) {
                    /* leave as is. */
                }
            }
            for (const dateIndex of datesIndices) {
                row[dateIndex] = new Date(row[dateIndex]);
            }
            return row;
        }), columnDescriptors: table.columns });
}
/**
 * @internal
 */
function convertBatchQueryResponseHelper(response) {
    try {
        const parsedResponseBody = JSON.parse(response.body);
        return computeResultType(parsedResponseBody);
    }
    catch (e) {
        if (response.body)
            return computeResultType(response.body);
        else
            return {};
    }
}
function computeResultType(generatedResponse) {
    var _a, _b;
    if (!generatedResponse.error) {
        const result = {
            visualization: generatedResponse.render,
            status: publicLogsModels_js_1.LogsQueryResultStatus.Success,
            statistics: generatedResponse.statistics,
            tables: ((_a = generatedResponse.tables) === null || _a === void 0 ? void 0 : _a.map((table) => convertGeneratedTable(table))) ||
                [],
        };
        return result;
    }
    else {
        if (generatedResponse.tables) {
            const result = {
                visualization: generatedResponse.render,
                status: publicLogsModels_js_1.LogsQueryResultStatus.PartialFailure,
                statistics: generatedResponse.statistics,
                partialTables: (_b = generatedResponse.tables) === null || _b === void 0 ? void 0 : _b.map((table) => convertGeneratedTable(table)),
                partialError: mapError(generatedResponse.error),
            };
            return result;
        }
        else {
            const errorInfo = mapError(generatedResponse.error);
            const result = Object.assign({ status: publicLogsModels_js_1.LogsQueryResultStatus.Failure }, errorInfo);
            return result;
        }
    }
}
function mapError(error) {
    let innermostError = error;
    while (innermostError.innerError) {
        innermostError = innermostError.innerError;
    }
    return {
        name: "Error",
        code: error.code,
        message: `${error.message}.  ${innermostError.message}`,
    };
}
//# sourceMappingURL=modelConverters.js.map