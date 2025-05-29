"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._stopSend = _stopSend;
exports._stopDeserialize = _stopDeserialize;
exports.stop = stop;
exports._startSend = _startSend;
exports._startDeserialize = _startDeserialize;
exports.start = start;
exports._listSend = _listSend;
exports._listDeserialize = _listDeserialize;
exports.list = list;
exports._$deleteSend = _$deleteSend;
exports._$deleteDeserialize = _$deleteDeserialize;
exports.$delete = $delete;
exports._updateSend = _updateSend;
exports._updateDeserialize = _updateDeserialize;
exports.update = update;
exports._createSend = _createSend;
exports._createDeserialize = _createDeserialize;
exports.create = create;
exports._getSend = _getSend;
exports._getDeserialize = _getDeserialize;
exports.get = get;
const models_js_1 = require("../../models/models.js");
const pollingHelpers_js_1 = require("../../static-helpers/pollingHelpers.js");
const pagingHelpers_js_1 = require("../../static-helpers/pagingHelpers.js");
const urlTemplate_js_1 = require("../../static-helpers/urlTemplate.js");
const core_client_1 = require("@azure-rest/core-client");
function _stopSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}/stop{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        centralInstanceName: centralInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: !options["body"] ? options["body"] : (0, models_js_1.stopRequestSerializer)(options["body"]) }));
}
async function _stopDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.operationStatusResultDeserializer)(result.body);
}
/** Stops the SAP Central Services Instance. */
function stop(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _stopDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _stopSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        resourceLocationConfig: "location",
    });
}
function _startSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}/start{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        centralInstanceName: centralInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: !options["body"] ? options["body"] : (0, models_js_1.startRequestSerializer)(options["body"]) }));
}
async function _startDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.operationStatusResultDeserializer)(result.body);
}
/** Starts the SAP Central Services Instance. */
function start(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = {
    requestOptions: {},
}) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _startDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _startSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        resourceLocationConfig: "location",
    });
}
function _listSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
async function _listDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._sapCentralServerInstanceListResultDeserializer)(result.body);
}
/** Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource. */
function list(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listSend(context, resourceGroupName, sapVirtualInstanceName, options), _listDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        centralInstanceName: centralInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).delete(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
async function _$deleteDeserialize(result) {
    const expectedStatuses = ["202", "204", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return;
}
/** Deletes the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
function $delete(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = {
    requestOptions: {},
}) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        resourceLocationConfig: "location",
    });
}
function _updateSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, properties, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        centralInstanceName: centralInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).patch(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.updateSAPCentralInstanceRequestSerializer)(properties) }));
}
async function _updateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapCentralServerInstanceDeserializer)(result.body);
}
/** Updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource. */
async function update(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, properties, options = {
    requestOptions: {},
}) {
    const result = await _updateSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, properties, options);
    return _updateDeserialize(result);
}
function _createSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, resource, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        centralInstanceName: centralInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.sapCentralServerInstanceSerializer)(resource) }));
}
async function _createDeserialize(result) {
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapCentralServerInstanceDeserializer)(result.body);
}
/** Creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. */
function create(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, resource, options = {
    requestOptions: {},
}) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _createDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _getSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        centralInstanceName: centralInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
async function _getDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapCentralServerInstanceDeserializer)(result.body);
}
/** Gets the SAP Central Services Instance resource. */
async function get(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options = { requestOptions: {} }) {
    const result = await _getSend(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options);
    return _getDeserialize(result);
}
//# sourceMappingURL=operations.js.map