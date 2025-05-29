"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getAvailabilityZoneDetailsSend = _getAvailabilityZoneDetailsSend;
exports._getAvailabilityZoneDetailsDeserialize = _getAvailabilityZoneDetailsDeserialize;
exports.getAvailabilityZoneDetails = getAvailabilityZoneDetails;
exports._getDiskConfigurationsSend = _getDiskConfigurationsSend;
exports._getDiskConfigurationsDeserialize = _getDiskConfigurationsDeserialize;
exports.getDiskConfigurations = getDiskConfigurations;
exports._getSapSupportedSkuSend = _getSapSupportedSkuSend;
exports._getSapSupportedSkuDeserialize = _getSapSupportedSkuDeserialize;
exports.getSapSupportedSku = getSapSupportedSku;
exports._getSizingRecommendationsSend = _getSizingRecommendationsSend;
exports._getSizingRecommendationsDeserialize = _getSizingRecommendationsDeserialize;
exports.getSizingRecommendations = getSizingRecommendations;
exports._stopSend = _stopSend;
exports._stopDeserialize = _stopDeserialize;
exports.stop = stop;
exports._startSend = _startSend;
exports._startDeserialize = _startDeserialize;
exports.start = start;
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
function _getAvailabilityZoneDetailsSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getAvailabilityZoneDetails{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.sapAvailabilityZoneDetailsRequestSerializer)(body) }));
}
async function _getAvailabilityZoneDetailsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapAvailabilityZoneDetailsResultDeserializer)(result.body);
}
/** Get the recommended SAP Availability Zone Pair Details for your region. */
async function getAvailabilityZoneDetails(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getAvailabilityZoneDetailsSend(context, location, body, options);
    return _getAvailabilityZoneDetailsDeserialize(result);
}
function _getDiskConfigurationsSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getDiskConfigurations{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.sapDiskConfigurationsRequestSerializer)(body) }));
}
async function _getDiskConfigurationsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapDiskConfigurationsResultDeserializer)(result.body);
}
/** Get the SAP Disk Configuration Layout prod/non-prod SAP System. */
async function getDiskConfigurations(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getDiskConfigurationsSend(context, location, body, options);
    return _getDiskConfigurationsDeserialize(result);
}
function _getSapSupportedSkuSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSapSupportedSku{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.sapSupportedSkusRequestSerializer)(body) }));
}
async function _getSapSupportedSkuDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapSupportedResourceSkusResultDeserializer)(result.body);
}
/** Get a list of SAP supported SKUs for ASCS, Application and Database tier. */
async function getSapSupportedSku(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getSapSupportedSkuSend(context, location, body, options);
    return _getSapSupportedSkuDeserialize(result);
}
function _getSizingRecommendationsSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSizingRecommendations{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.sapSizingRecommendationRequestSerializer)(body) }));
}
async function _getSizingRecommendationsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapSizingRecommendationResultUnionDeserializer)(result.body);
}
/** Gets the sizing recommendations. */
async function getSizingRecommendations(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getSizingRecommendationsSend(context, location, body, options);
    return _getSizingRecommendationsDeserialize(result);
}
function _stopSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/stop{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
/** Stops the SAP Application, that is the Application server instances and Central Services instance. */
function stop(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _stopDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _stopSend(context, resourceGroupName, sapVirtualInstanceName, options),
        resourceLocationConfig: "location",
    });
}
function _startSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/start{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
/** Starts the SAP application, that is the Central Services instance and Application server instances. */
function start(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _startDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _startSend(context, resourceGroupName, sapVirtualInstanceName, options),
        resourceLocationConfig: "location",
    });
}
function _listBySubscriptionSend(context, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/sapVirtualInstances{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        "api%2Dversion": context.apiVersion,
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
    return (0, models_js_1._sapVirtualInstanceListResultDeserializer)(result.body);
}
/** Gets all Virtual Instances for SAP solutions resources in a Subscription. */
function listBySubscription(context, options = {
    requestOptions: {},
}) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listBySubscriptionSend(context, options), _listBySubscriptionDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _listByResourceGroupSend(context, resourceGroupName, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        "api%2Dversion": context.apiVersion,
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
    return (0, models_js_1._sapVirtualInstanceListResultDeserializer)(result.body);
}
/** Gets all Virtual Instances for SAP solutions resources in a Resource Group. */
function listByResourceGroup(context, resourceGroupName, options = {
    requestOptions: {},
}) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listByResourceGroupSend(context, resourceGroupName, options), _listByResourceGroupDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
/** Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
function $delete(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, options),
        resourceLocationConfig: "location",
    });
}
function _updateSend(context, resourceGroupName, sapVirtualInstanceName, properties, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).patch(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.updateSAPVirtualInstanceRequestSerializer)(properties) }));
}
async function _updateDeserialize(result) {
    const expectedStatuses = ["200", "202"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapVirtualInstanceDeserializer)(result.body);
}
/** Updates a Virtual Instance for SAP solutions resource */
function update(context, resourceGroupName, sapVirtualInstanceName, properties, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _updateDeserialize, ["200", "202"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _updateSend(context, resourceGroupName, sapVirtualInstanceName, properties, options),
        resourceLocationConfig: "location",
    });
}
function _createSend(context, resourceGroupName, sapVirtualInstanceName, resource, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: (0, models_js_1.sapVirtualInstanceSerializer)(resource) }));
}
async function _createDeserialize(result) {
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.sapVirtualInstanceDeserializer)(result.body);
}
/** Creates a Virtual Instance for SAP solutions (VIS) resource */
function create(context, resourceGroupName, sapVirtualInstanceName, resource, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _createDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createSend(context, resourceGroupName, sapVirtualInstanceName, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _getSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
    return (0, models_js_1.sapVirtualInstanceDeserializer)(result.body);
}
/** Gets a Virtual Instance for SAP solutions resource */
async function get(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    const result = await _getSend(context, resourceGroupName, sapVirtualInstanceName, options);
    return _getDeserialize(result);
}
//# sourceMappingURL=operations.js.map