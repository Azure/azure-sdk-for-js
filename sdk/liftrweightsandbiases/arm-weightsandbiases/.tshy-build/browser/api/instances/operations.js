// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { instanceResourceSerializer, instanceResourceDeserializer, errorResponseDeserializer, instanceResourceUpdateSerializer, _instanceResourceListResultDeserializer, } from "../../models/models.js";
import { buildPagedAsyncIterator, } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { createRestError, operationOptionsToRequestParameters, } from "@azure-rest/core-client";
export function _listBySubscriptionSend(context, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/providers/Microsoft.WeightsAndBiases/instances{?api-version}", {
        subscriptionId: context.subscriptionId,
        "api-version": context.apiVersion,
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
    return _instanceResourceListResultDeserializer(result.body);
}
/** List InstanceResource resources by subscription ID */
export function listBySubscription(context, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _listBySubscriptionSend(context, options), _listBySubscriptionDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _listByResourceGroupSend(context, resourceGroupName, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        "api-version": context.apiVersion,
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
    return _instanceResourceListResultDeserializer(result.body);
}
/** List InstanceResource resources by resource group */
export function listByResourceGroup(context, resourceGroupName, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _listByResourceGroupSend(context, resourceGroupName, options), _listByResourceGroupDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _$deleteSend(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
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
/** Delete a InstanceResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, resourceGroupName, instancename, options),
        resourceLocationConfig: "location",
    });
}
export function _updateSend(context, resourceGroupName, instancename, properties, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: instanceResourceUpdateSerializer(properties) }));
}
export async function _updateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return instanceResourceDeserializer(result.body);
}
/** Update a InstanceResource */
export async function update(context, resourceGroupName, instancename, properties, options = { requestOptions: {} }) {
    const result = await _updateSend(context, resourceGroupName, instancename, properties, options);
    return _updateDeserialize(result);
}
export function _createOrUpdateSend(context, resourceGroupName, instancename, resource, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).put(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers), body: instanceResourceSerializer(resource) }));
}
export async function _createOrUpdateDeserialize(result) {
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return instanceResourceDeserializer(result.body);
}
/** Create a InstanceResource */
export function createOrUpdate(context, resourceGroupName, instancename, resource, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createOrUpdateSend(context, resourceGroupName, instancename, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
export function _getSend(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}", {
        subscriptionId: context.subscriptionId,
        resourceGroupName: resourceGroupName,
        instancename: instancename,
        "api-version": context.apiVersion,
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
    return instanceResourceDeserializer(result.body);
}
/** Get a InstanceResource */
export async function get(context, resourceGroupName, instancename, options = { requestOptions: {} }) {
    const result = await _getSend(context, resourceGroupName, instancename, options);
    return _getDeserialize(result);
}
//# sourceMappingURL=operations.js.map