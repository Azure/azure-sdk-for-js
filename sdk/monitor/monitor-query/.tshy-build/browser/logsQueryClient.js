// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureLogAnalytics } from "./generated/logquery/src/azureLogAnalytics.js";
import { LogsQueryResultStatus } from "./models/publicLogsModels.js";
import { convertGeneratedTable, convertRequestForQueryBatch, convertResponseForQueryBatch, mapError, } from "./internal/modelConverters.js";
import { formatPreferHeader } from "./internal/util.js";
import { convertTimespanToInterval } from "./timespanConversion.js";
import { KnownMonitorLogsQueryAudience, SDK_VERSION } from "./constants.js";
import { tracingClient } from "./tracing.js";
import { getLogQueryEndpoint } from "./internal/logQueryOptionUtils.js";
/**
 * Client for Azure Log Analytics
 */
export class LogsQueryClient {
    /**
     * Construct a LogsClient that can be used to query logs using the Log Analytics Query language.
     *
     * @param tokenCredential - A token credential.
     * @param options - Options for the LogsClient.
     */
    constructor(tokenCredential, options) {
        const scope = (options === null || options === void 0 ? void 0 : options.audience)
            ? `${options.audience}/.default`
            : `${KnownMonitorLogsQueryAudience.AzurePublicCloud}/.default`;
        let endpoint = options === null || options === void 0 ? void 0 : options.endpoint;
        if (options === null || options === void 0 ? void 0 : options.endpoint) {
            endpoint = getLogQueryEndpoint(options);
        }
        const packageDetails = `azsdk-js-monitor-query/${SDK_VERSION}`;
        const userAgentPrefix = (options === null || options === void 0 ? void 0 : options.userAgentOptions) && (options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix)
            ? `${options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix} ${packageDetails}`
            : `${packageDetails}`;
        this._logAnalytics = new AzureLogAnalytics(Object.assign(Object.assign({}, options), { $host: endpoint, endpoint: endpoint, credentialScopes: scope, credential: tokenCredential, userAgentOptions: {
                userAgentPrefix,
            } }));
    }
    /**
     * Queries logs in a Log Analytics Workspace.
     *
     * @param workspaceId - The 'Workspace Id' for the Log Analytics Workspace
     * @param query - A Kusto query.
     * @param timespan - The timespan over which to query data. This is an ISO8601 time period value. This timespan is applied in addition to any that are specified in the query expression.
     *  Some common durations can be found in the `Durations` object.
     * @param options - Options to adjust various aspects of the request.
     * @returns The result of the query.
     */
    async queryWorkspace(workspaceId, query, timespan, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        let timeInterval = "";
        return tracingClient.withSpan("LogsQueryClient.queryWorkspace", options, async (updatedOptions) => {
            var _a;
            if (timespan) {
                timeInterval = convertTimespanToInterval(timespan);
            }
            const { flatResponse, rawResponse } = await getRawResponse((paramOptions) => this._logAnalytics.query.execute(workspaceId, {
                query,
                timespan: timeInterval,
                workspaces: options === null || options === void 0 ? void 0 : options.additionalWorkspaces,
            }, paramOptions), Object.assign(Object.assign({}, updatedOptions), { requestOptions: Object.assign(Object.assign({}, updatedOptions.requestOptions), { customHeaders: Object.assign(Object.assign({}, (_a = updatedOptions.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders), formatPreferHeader(options)) }) }));
            const parsedBody = JSON.parse(rawResponse.bodyAsText);
            flatResponse.tables = parsedBody.tables;
            const res = {
                tables: flatResponse.tables.map(convertGeneratedTable),
                statistics: flatResponse.statistics,
                visualization: flatResponse.render,
            };
            if (!flatResponse.error) {
                // if there is no error field, it is success
                const result = {
                    tables: res.tables,
                    statistics: res.statistics,
                    visualization: res.visualization,
                    status: LogsQueryResultStatus.Success,
                };
                return result;
            }
            else {
                const result = {
                    partialTables: res.tables,
                    status: LogsQueryResultStatus.PartialFailure,
                    partialError: mapError(flatResponse.error),
                    statistics: res.statistics,
                    visualization: res.visualization,
                };
                return result;
            }
        });
    }
    /**
     * Query Logs with multiple queries, in a batch.
     * @param batch - A batch of Kusto queries to execute. Each query can be configured to run against separate workspaces.
     * @param options - Options for querying logs in a batch.
     * @returns The Logs query results for all the queries.
     */
    async queryBatch(batch, options = {}) {
        return tracingClient.withSpan("LogsQueryClient.queryBatch", options, async (updatedOptions) => {
            const generatedRequest = convertRequestForQueryBatch(batch);
            const { flatResponse, rawResponse } = await getRawResponse((paramOptions) => this._logAnalytics.query.batch(generatedRequest, paramOptions), updatedOptions || {});
            const result = convertResponseForQueryBatch(flatResponse, rawResponse);
            return result;
        });
    }
    /**
     * Executes a Kusto query on an Azure resource
     *
     * @param resourceId - The identifier of the resource. The expected format is
           '/subscriptions/<sid>/resourceGroups/<rg>/providers/<providerName>/<resourceType>/<resourceName>'.
     * @param query - A Kusto query. Learn more about the `Kusto query syntax <https://learn.microsoft.com/azure/data-explorer/kusto/query/>`.
     * @param timespan - The timespan over which to query data. This is an ISO8601 time period value. This timespan is applied in addition to any that are specified in the query expression.
     *  Some common durations can be found in the {@link Durations} object.
     * @param options - Options to adjust various aspects of the request.
     * @returns Returns all the Azure Monitor logs matching the given Kusto query for an Azure resource.
     */
    async queryResource(resourceId, query, timespan, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        let timeInterval = "";
        return tracingClient.withSpan("LogsQueryClient.queryResource", options, async (updatedOptions) => {
            var _a;
            timeInterval = convertTimespanToInterval(timespan);
            if (resourceId.startsWith("/")) {
                resourceId = resourceId.substring(1);
            }
            const { flatResponse, rawResponse } = await getRawResponse((paramOptions) => this._logAnalytics.query.resourceExecute(resourceId, {
                query,
                timespan: timeInterval,
                workspaces: options === null || options === void 0 ? void 0 : options.additionalWorkspaces,
            }, paramOptions), Object.assign(Object.assign({}, updatedOptions), { requestOptions: Object.assign(Object.assign({}, updatedOptions.requestOptions), { customHeaders: Object.assign(Object.assign({}, (_a = updatedOptions.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders), formatPreferHeader(options)) }) }));
            const parsedBody = JSON.parse(rawResponse.bodyAsText);
            flatResponse.tables = parsedBody.tables;
            const res = {
                tables: flatResponse.tables.map(convertGeneratedTable),
                statistics: flatResponse.statistics,
                visualization: flatResponse.render,
            };
            if (!flatResponse.error) {
                // if there is no error field, it is success
                const result = {
                    tables: res.tables,
                    statistics: res.statistics,
                    visualization: res.visualization,
                    status: LogsQueryResultStatus.Success,
                };
                return result;
            }
            else {
                const result = {
                    partialTables: res.tables,
                    status: LogsQueryResultStatus.PartialFailure,
                    partialError: mapError(flatResponse.error),
                    statistics: res.statistics,
                    visualization: res.visualization,
                };
                return result;
            }
        });
    }
}
async function getRawResponse(f, options) {
    // renaming onResponse received from customer to customerProvidedCallback
    const { onResponse: customerProvidedCallback } = options || {};
    let rawResponse = undefined;
    // flatResponseParam - is basically the flatResponse received from service call -
    // just named it so that linter doesn't complain
    // onResponse - includes the rawResponse and the customer's provided onResponse
    const flatResponse = await f(Object.assign(Object.assign({}, options), { onResponse: (response, flatResponseParam) => {
            rawResponse = response;
            customerProvidedCallback === null || customerProvidedCallback === void 0 ? void 0 : customerProvidedCallback(response, flatResponseParam);
        } }));
    return { flatResponse, rawResponse: rawResponse };
}
//# sourceMappingURL=logsQueryClient.js.map