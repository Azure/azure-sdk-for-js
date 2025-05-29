"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._listBySubscriptionSend = _listBySubscriptionSend;
exports._listBySubscriptionDeserialize = _listBySubscriptionDeserialize;
exports.listBySubscription = listBySubscription;
exports._listByResourceGroupSend = _listByResourceGroupSend;
exports._listByResourceGroupDeserialize = _listByResourceGroupDeserialize;
exports.listByResourceGroup = listByResourceGroup;
exports._$deleteSend = _$deleteSend;
exports._$deleteDeserialize = _$deleteDeserialize;
exports.$delete = $delete;
exports._updateSend = _updateSend;
exports._updateDeserialize = _updateDeserialize;
exports.update = update;
exports._createOrUpdateSend = _createOrUpdateSend;
exports._createOrUpdateDeserialize = _createOrUpdateDeserialize;
exports.createOrUpdate = createOrUpdate;
exports._getSend = _getSend;
exports._getDeserialize = _getDeserialize;
exports.get = get;
const models_js_1 = require("../../models/models.js");
const pagingHelpers_js_1 = require("../../static-helpers/pagingHelpers.js");
const pollingHelpers_js_1 = require("../../static-helpers/pollingHelpers.js");
const urlTemplate_js_1 = require("../../static-helpers/urlTemplate.js");
const core_client_1 = require("@azure-rest/core-client");
function _listBySubscriptionSend(context, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/providers/Microsoft.WeightsAndBiases/instances{?api-version}", {
        subscriptionId: context.subscriptionId,
        "api-version": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
async function _listBySubscriptionDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._instanceResourceListResultDeserializer)(result.body);
}
/** List InstanceResource resources by subscription ID */
function listBySubscription(context, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listBySubscriptionSend(context, options), _listBySubscriptionDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _listByResourceGroupSend(context, resourceGroupName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        "api-version": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
async function _listByResourceGroupDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._instanceResourceListResultDeserializer)(result.body);
}
/** List InstanceResource resources by resource group */
function listByResourceGroup(context, resourceGroupName, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listByResourceGroupSend(context, resourceGroupName, options), _listByResourceGroupDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _$deleteSend(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
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
/** Delete a InstanceResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
function $delete(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, resourceGroupName, instancename, options),
        resourceLocationConfig: "location",
    });
}
function _updateSend(context, resourceGroupName, instancename, properties, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).patch(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.instanceResourceUpdateSerializer)(properties) }));
}
async function _updateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.instanceResourceDeserializer)(result.body);
}
/** Update a InstanceResource */
async function update(context, resourceGroupName, instancename, properties, options = { requestOptions: {} }) {
    const result = await _updateSend(context, resourceGroupName, instancename, properties, options);
    return _updateDeserialize(result);
}
function _createOrUpdateSend(context, resourceGroupName, instancename, resource, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.instanceResourceSerializer)(resource) }));
}
async function _createOrUpdateDeserialize(result) {
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.instanceResourceDeserializer)(result.body);
}
/** Create a InstanceResource */
function createOrUpdate(context, resourceGroupName, instancename, resource, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _createOrUpdateDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createOrUpdateSend(context, resourceGroupName, instancename, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _getSend(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
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
    return (0, models_js_1.instanceResourceDeserializer)(result.body);
}
/** Get a InstanceResource */
async function get(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    const result = await _getSend(context, resourceGroupName, instancename, options);
    return _getDeserialize(result);
}
//# sourceMappingURL=operations.js.map