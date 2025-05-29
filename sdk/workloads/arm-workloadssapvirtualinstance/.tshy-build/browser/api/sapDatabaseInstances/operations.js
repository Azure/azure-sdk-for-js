// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { errorResponseDeserializer, startRequestSerializer, operationStatusResultDeserializer, stopRequestSerializer, sapDatabaseInstanceSerializer, sapDatabaseInstanceDeserializer, updateSAPDatabaseInstanceRequestSerializer, _sapDatabaseInstanceListResultDeserializer, } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { buildPagedAsyncIterator, } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { createRestError, operationOptionsToRequestParameters, } from "@azure-rest/core-client";
export function _stopSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}/stop{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        databaseInstanceName: databaseInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: !options["body"] ? options["body"] : stopRequestSerializer(options["body"]) }));
}
export async function _stopDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return operationStatusResultDeserializer(result.body);
}
/** Stops the database instance of the SAP system. */
export function stop(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _stopDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _stopSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        resourceLocationConfig: "location",
    });
}
export function _startSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}/start{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        databaseInstanceName: databaseInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: !options["body"] ? options["body"] : startRequestSerializer(options["body"]) }));
}
export async function _startDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return operationStatusResultDeserializer(result.body);
}
/** Starts the database instance of the SAP system. */
export function start(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _startSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        resourceLocationConfig: "location",
    });
}
export function _listSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
export async function _listDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return _sapDatabaseInstanceListResultDeserializer(result.body);
}
/** Lists the Database resources associated with a Virtual Instance for SAP solutions resource. */
export function list(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _listSend(context, resourceGroupName, sapVirtualInstanceName, options), _listDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        databaseInstanceName: databaseInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).delete(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
export async function _$deleteDeserialize(result) {
    const expectedStatuses = ["202", "204", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return;
}
/** Deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        resourceLocationConfig: "location",
    });
}
export function _updateSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, properties, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        databaseInstanceName: databaseInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: updateSAPDatabaseInstanceRequestSerializer(properties) }));
}
export async function _updateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapDatabaseInstanceDeserializer(result.body);
}
/** Updates the Database resource. */
export async function update(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, properties, options = { requestOptions: {} }) {
    const result = await _updateSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, properties, options);
    return _updateDeserialize(result);
}
export function _createSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, resource, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        databaseInstanceName: databaseInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).put(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: sapDatabaseInstanceSerializer(resource) }));
}
export async function _createDeserialize(result) {
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapDatabaseInstanceDeserializer(result.body);
}
/** Creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
export function create(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, resource, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
export function _getSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        databaseInstanceName: databaseInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
export async function _getDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapDatabaseInstanceDeserializer(result.body);
}
/** Gets the SAP Database Instance resource. */
export async function get(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options = { requestOptions: {} }) {
    const result = await _getSend(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options);
    return _getDeserialize(result);
}
//# sourceMappingURL=operations.js.map