// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { errorResponseDeserializer, sapVirtualInstanceSerializer, sapVirtualInstanceDeserializer, updateSAPVirtualInstanceRequestSerializer, _sapVirtualInstanceListResultDeserializer, startRequestSerializer, operationStatusResultDeserializer, stopRequestSerializer, sapSizingRecommendationRequestSerializer, sapSizingRecommendationResultUnionDeserializer, sapSupportedSkusRequestSerializer, sapSupportedResourceSkusResultDeserializer, sapDiskConfigurationsRequestSerializer, sapDiskConfigurationsResultDeserializer, sapAvailabilityZoneDetailsRequestSerializer, sapAvailabilityZoneDetailsResultDeserializer, } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { buildPagedAsyncIterator, } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { createRestError, operationOptionsToRequestParameters, } from "@azure-rest/core-client";
export function _getAvailabilityZoneDetailsSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getAvailabilityZoneDetails{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: sapAvailabilityZoneDetailsRequestSerializer(body) }));
}
export async function _getAvailabilityZoneDetailsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapAvailabilityZoneDetailsResultDeserializer(result.body);
}
/** Get the recommended SAP Availability Zone Pair Details for your region. */
export async function getAvailabilityZoneDetails(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getAvailabilityZoneDetailsSend(context, location, body, options);
    return _getAvailabilityZoneDetailsDeserialize(result);
}
export function _getDiskConfigurationsSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getDiskConfigurations{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: sapDiskConfigurationsRequestSerializer(body) }));
}
export async function _getDiskConfigurationsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapDiskConfigurationsResultDeserializer(result.body);
}
/** Get the SAP Disk Configuration Layout prod/non-prod SAP System. */
export async function getDiskConfigurations(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getDiskConfigurationsSend(context, location, body, options);
    return _getDiskConfigurationsDeserialize(result);
}
export function _getSapSupportedSkuSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSapSupportedSku{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: sapSupportedSkusRequestSerializer(body) }));
}
export async function _getSapSupportedSkuDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapSupportedResourceSkusResultDeserializer(result.body);
}
/** Get a list of SAP supported SKUs for ASCS, Application and Database tier. */
export async function getSapSupportedSku(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getSapSupportedSkuSend(context, location, body, options);
    return _getSapSupportedSkuDeserialize(result);
}
export function _getSizingRecommendationsSend(context, location, body, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSizingRecommendations{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        location: location,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: sapSizingRecommendationRequestSerializer(body) }));
}
export async function _getSizingRecommendationsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapSizingRecommendationResultUnionDeserializer(result.body);
}
/** Gets the sizing recommendations. */
export async function getSizingRecommendations(context, location, body, options = {
    requestOptions: {},
}) {
    const result = await _getSizingRecommendationsSend(context, location, body, options);
    return _getSizingRecommendationsDeserialize(result);
}
export function _stopSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/stop{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
/** Stops the SAP Application, that is the Application server instances and Central Services instance. */
export function stop(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _stopDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _stopSend(context, resourceGroupName, sapVirtualInstanceName, options),
        resourceLocationConfig: "location",
    });
}
export function _startSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/start{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
/** Starts the SAP application, that is the Central Services instance and Application server instances. */
export function start(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _startSend(context, resourceGroupName, sapVirtualInstanceName, options),
        resourceLocationConfig: "location",
    });
}
export function _listBySubscriptionSend(context, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/sapVirtualInstances{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
export async function _listBySubscriptionDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return _sapVirtualInstanceListResultDeserializer(result.body);
}
/** Gets all Virtual Instances for SAP solutions resources in a Subscription. */
export function listBySubscription(context, options = {
    requestOptions: {},
}) {
    return buildPagedAsyncIterator(context, () => _listBySubscriptionSend(context, options), _listBySubscriptionDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _listByResourceGroupSend(context, resourceGroupName, options = {
    requestOptions: {},
}) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
export async function _listByResourceGroupDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return _sapVirtualInstanceListResultDeserializer(result.body);
}
/** Gets all Virtual Instances for SAP solutions resources in a Resource Group. */
export function listByResourceGroup(context, resourceGroupName, options = {
    requestOptions: {},
}) {
    return buildPagedAsyncIterator(context, () => _listByResourceGroupSend(context, resourceGroupName, options), _listByResourceGroupDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
/** Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, options),
        resourceLocationConfig: "location",
    });
}
export function _updateSend(context, resourceGroupName, sapVirtualInstanceName, properties, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: updateSAPVirtualInstanceRequestSerializer(properties) }));
}
export async function _updateDeserialize(result) {
    const expectedStatuses = ["200", "202"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapVirtualInstanceDeserializer(result.body);
}
/** Updates a Virtual Instance for SAP solutions resource */
export function update(context, resourceGroupName, sapVirtualInstanceName, properties, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _updateSend(context, resourceGroupName, sapVirtualInstanceName, properties, options),
        resourceLocationConfig: "location",
    });
}
export function _createSend(context, resourceGroupName, sapVirtualInstanceName, resource, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).put(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: sapVirtualInstanceSerializer(resource) }));
}
export async function _createDeserialize(result) {
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return sapVirtualInstanceDeserializer(result.body);
}
/** Creates a Virtual Instance for SAP solutions (VIS) resource */
export function create(context, resourceGroupName, sapVirtualInstanceName, resource, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createSend(context, resourceGroupName, sapVirtualInstanceName, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
export function _getSend(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        sapVirtualInstanceName: sapVirtualInstanceName,
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
    return sapVirtualInstanceDeserializer(result.body);
}
/** Gets a Virtual Instance for SAP solutions resource */
export async function get(context, resourceGroupName, sapVirtualInstanceName, options = { requestOptions: {} }) {
    const result = await _getSend(context, resourceGroupName, sapVirtualInstanceName, options);
    return _getDeserialize(result);
}
//# sourceMappingURL=operations.js.map