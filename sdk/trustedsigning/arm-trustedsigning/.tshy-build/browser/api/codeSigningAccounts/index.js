// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { codeSigningAccountPropertiesSerializer, codeSigningAccountPatchPropertiesSerializer, } from "../../models/models.js";
import { operationOptionsToRequestParameters, createRestError, } from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import { buildPagedAsyncIterator, } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
export function _getSend(context, subscriptionId, resourceGroupName, accountName, options = { requestOptions: {} }) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}", subscriptionId, resourceGroupName, accountName)
        .get(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _getDeserialize(result) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        tags: result.body["tags"],
        location: result.body["location"],
        id: result.body["id"],
        name: result.body["name"],
        type: result.body["type"],
        systemData: !result.body.systemData
            ? undefined
            : {
                createdBy: (_a = result.body.systemData) === null || _a === void 0 ? void 0 : _a["createdBy"],
                createdByType: (_b = result.body.systemData) === null || _b === void 0 ? void 0 : _b["createdByType"],
                createdAt: ((_c = result.body.systemData) === null || _c === void 0 ? void 0 : _c["createdAt"]) !== undefined
                    ? new Date((_d = result.body.systemData) === null || _d === void 0 ? void 0 : _d["createdAt"])
                    : undefined,
                lastModifiedBy: (_e = result.body.systemData) === null || _e === void 0 ? void 0 : _e["lastModifiedBy"],
                lastModifiedByType: (_f = result.body.systemData) === null || _f === void 0 ? void 0 : _f["lastModifiedByType"],
                lastModifiedAt: ((_g = result.body.systemData) === null || _g === void 0 ? void 0 : _g["lastModifiedAt"]) !== undefined
                    ? new Date((_h = result.body.systemData) === null || _h === void 0 ? void 0 : _h["lastModifiedAt"])
                    : undefined,
            },
        properties: !result.body.properties
            ? undefined
            : {
                accountUri: (_j = result.body.properties) === null || _j === void 0 ? void 0 : _j["accountUri"],
                sku: !((_k = result.body.properties) === null || _k === void 0 ? void 0 : _k.sku)
                    ? undefined
                    : { name: (_m = (_l = result.body.properties) === null || _l === void 0 ? void 0 : _l.sku) === null || _m === void 0 ? void 0 : _m["name"] },
                provisioningState: (_o = result.body.properties) === null || _o === void 0 ? void 0 : _o["provisioningState"],
            },
    };
}
/** Get a trusted Signing Account. */
export async function get(context, subscriptionId, resourceGroupName, accountName, options = { requestOptions: {} }) {
    const result = await _getSend(context, subscriptionId, resourceGroupName, accountName, options);
    return _getDeserialize(result);
}
export function _createSend(context, subscriptionId, resourceGroupName, accountName, resource, options = { requestOptions: {} }) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}", subscriptionId, resourceGroupName, accountName)
        .put(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { body: {
            tags: !resource.tags ? resource.tags : serializeRecord(resource.tags),
            location: resource["location"],
            properties: !resource.properties
                ? resource.properties
                : codeSigningAccountPropertiesSerializer(resource.properties),
        } }));
}
export async function _createDeserialize(result) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        tags: result.body["tags"],
        location: result.body["location"],
        id: result.body["id"],
        name: result.body["name"],
        type: result.body["type"],
        systemData: !result.body.systemData
            ? undefined
            : {
                createdBy: (_a = result.body.systemData) === null || _a === void 0 ? void 0 : _a["createdBy"],
                createdByType: (_b = result.body.systemData) === null || _b === void 0 ? void 0 : _b["createdByType"],
                createdAt: ((_c = result.body.systemData) === null || _c === void 0 ? void 0 : _c["createdAt"]) !== undefined
                    ? new Date((_d = result.body.systemData) === null || _d === void 0 ? void 0 : _d["createdAt"])
                    : undefined,
                lastModifiedBy: (_e = result.body.systemData) === null || _e === void 0 ? void 0 : _e["lastModifiedBy"],
                lastModifiedByType: (_f = result.body.systemData) === null || _f === void 0 ? void 0 : _f["lastModifiedByType"],
                lastModifiedAt: ((_g = result.body.systemData) === null || _g === void 0 ? void 0 : _g["lastModifiedAt"]) !== undefined
                    ? new Date((_h = result.body.systemData) === null || _h === void 0 ? void 0 : _h["lastModifiedAt"])
                    : undefined,
            },
        properties: !result.body.properties
            ? undefined
            : {
                accountUri: (_j = result.body.properties) === null || _j === void 0 ? void 0 : _j["accountUri"],
                sku: !((_k = result.body.properties) === null || _k === void 0 ? void 0 : _k.sku)
                    ? undefined
                    : { name: (_m = (_l = result.body.properties) === null || _l === void 0 ? void 0 : _l.sku) === null || _m === void 0 ? void 0 : _m["name"] },
                provisioningState: (_o = result.body.properties) === null || _o === void 0 ? void 0 : _o["provisioningState"],
            },
    };
}
/** Create a trusted Signing Account. */
export function create(context, subscriptionId, resourceGroupName, accountName, resource, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createSend(context, subscriptionId, resourceGroupName, accountName, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
export function _updateSend(context, subscriptionId, resourceGroupName, accountName, properties, options = { requestOptions: {} }) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}", subscriptionId, resourceGroupName, accountName)
        .patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { body: {
            tags: !properties.tags ? properties.tags : serializeRecord(properties.tags),
            properties: !properties.properties
                ? properties.properties
                : codeSigningAccountPatchPropertiesSerializer(properties.properties),
        } }));
}
export async function _updateDeserialize(result) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const expectedStatuses = ["200", "202"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        tags: result.body["tags"],
        location: result.body["location"],
        id: result.body["id"],
        name: result.body["name"],
        type: result.body["type"],
        systemData: !result.body.systemData
            ? undefined
            : {
                createdBy: (_a = result.body.systemData) === null || _a === void 0 ? void 0 : _a["createdBy"],
                createdByType: (_b = result.body.systemData) === null || _b === void 0 ? void 0 : _b["createdByType"],
                createdAt: ((_c = result.body.systemData) === null || _c === void 0 ? void 0 : _c["createdAt"]) !== undefined
                    ? new Date((_d = result.body.systemData) === null || _d === void 0 ? void 0 : _d["createdAt"])
                    : undefined,
                lastModifiedBy: (_e = result.body.systemData) === null || _e === void 0 ? void 0 : _e["lastModifiedBy"],
                lastModifiedByType: (_f = result.body.systemData) === null || _f === void 0 ? void 0 : _f["lastModifiedByType"],
                lastModifiedAt: ((_g = result.body.systemData) === null || _g === void 0 ? void 0 : _g["lastModifiedAt"]) !== undefined
                    ? new Date((_h = result.body.systemData) === null || _h === void 0 ? void 0 : _h["lastModifiedAt"])
                    : undefined,
            },
        properties: !result.body.properties
            ? undefined
            : {
                accountUri: (_j = result.body.properties) === null || _j === void 0 ? void 0 : _j["accountUri"],
                sku: !((_k = result.body.properties) === null || _k === void 0 ? void 0 : _k.sku)
                    ? undefined
                    : { name: (_m = (_l = result.body.properties) === null || _l === void 0 ? void 0 : _l.sku) === null || _m === void 0 ? void 0 : _m["name"] },
                provisioningState: (_o = result.body.properties) === null || _o === void 0 ? void 0 : _o["provisioningState"],
            },
    };
}
/** Update a trusted signing account. */
export function update(context, subscriptionId, resourceGroupName, accountName, properties, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _updateSend(context, subscriptionId, resourceGroupName, accountName, properties, options),
        resourceLocationConfig: "location",
    });
}
export function _$deleteSend(context, subscriptionId, resourceGroupName, accountName, options = { requestOptions: {} }) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}", subscriptionId, resourceGroupName, accountName)
        .delete(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _$deleteDeserialize(result) {
    const expectedStatuses = ["202", "204", "200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return;
}
/** Delete a trusted signing account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(context, subscriptionId, resourceGroupName, accountName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, subscriptionId, resourceGroupName, accountName, options),
        resourceLocationConfig: "location",
    });
}
export function _listByResourceGroupSend(context, subscriptionId, resourceGroupName, options = {
    requestOptions: {},
}) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts", subscriptionId, resourceGroupName)
        .get(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _listByResourceGroupDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        value: result.body["value"].map((p) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            return {
                tags: p["tags"],
                location: p["location"],
                id: p["id"],
                name: p["name"],
                type: p["type"],
                systemData: !p.systemData
                    ? undefined
                    : {
                        createdBy: (_a = p.systemData) === null || _a === void 0 ? void 0 : _a["createdBy"],
                        createdByType: (_b = p.systemData) === null || _b === void 0 ? void 0 : _b["createdByType"],
                        createdAt: ((_c = p.systemData) === null || _c === void 0 ? void 0 : _c["createdAt"]) !== undefined
                            ? new Date((_d = p.systemData) === null || _d === void 0 ? void 0 : _d["createdAt"])
                            : undefined,
                        lastModifiedBy: (_e = p.systemData) === null || _e === void 0 ? void 0 : _e["lastModifiedBy"],
                        lastModifiedByType: (_f = p.systemData) === null || _f === void 0 ? void 0 : _f["lastModifiedByType"],
                        lastModifiedAt: ((_g = p.systemData) === null || _g === void 0 ? void 0 : _g["lastModifiedAt"]) !== undefined
                            ? new Date((_h = p.systemData) === null || _h === void 0 ? void 0 : _h["lastModifiedAt"])
                            : undefined,
                    },
                properties: !p.properties
                    ? undefined
                    : {
                        accountUri: (_j = p.properties) === null || _j === void 0 ? void 0 : _j["accountUri"],
                        sku: !((_k = p.properties) === null || _k === void 0 ? void 0 : _k.sku) ? undefined : { name: (_m = (_l = p.properties) === null || _l === void 0 ? void 0 : _l.sku) === null || _m === void 0 ? void 0 : _m["name"] },
                        provisioningState: (_o = p.properties) === null || _o === void 0 ? void 0 : _o["provisioningState"],
                    },
            };
        }),
        nextLink: result.body["nextLink"],
    };
}
/** Lists trusted signing accounts within a resource group. */
export function listByResourceGroup(context, subscriptionId, resourceGroupName, options = {
    requestOptions: {},
}) {
    return buildPagedAsyncIterator(context, () => _listByResourceGroupSend(context, subscriptionId, resourceGroupName, options), _listByResourceGroupDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _listBySubscriptionSend(context, subscriptionId, options = {
    requestOptions: {},
}) {
    return context
        .path("/subscriptions/{subscriptionId}/providers/Microsoft.CodeSigning/codeSigningAccounts", subscriptionId)
        .get(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _listBySubscriptionDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        value: result.body["value"].map((p) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            return {
                tags: p["tags"],
                location: p["location"],
                id: p["id"],
                name: p["name"],
                type: p["type"],
                systemData: !p.systemData
                    ? undefined
                    : {
                        createdBy: (_a = p.systemData) === null || _a === void 0 ? void 0 : _a["createdBy"],
                        createdByType: (_b = p.systemData) === null || _b === void 0 ? void 0 : _b["createdByType"],
                        createdAt: ((_c = p.systemData) === null || _c === void 0 ? void 0 : _c["createdAt"]) !== undefined
                            ? new Date((_d = p.systemData) === null || _d === void 0 ? void 0 : _d["createdAt"])
                            : undefined,
                        lastModifiedBy: (_e = p.systemData) === null || _e === void 0 ? void 0 : _e["lastModifiedBy"],
                        lastModifiedByType: (_f = p.systemData) === null || _f === void 0 ? void 0 : _f["lastModifiedByType"],
                        lastModifiedAt: ((_g = p.systemData) === null || _g === void 0 ? void 0 : _g["lastModifiedAt"]) !== undefined
                            ? new Date((_h = p.systemData) === null || _h === void 0 ? void 0 : _h["lastModifiedAt"])
                            : undefined,
                    },
                properties: !p.properties
                    ? undefined
                    : {
                        accountUri: (_j = p.properties) === null || _j === void 0 ? void 0 : _j["accountUri"],
                        sku: !((_k = p.properties) === null || _k === void 0 ? void 0 : _k.sku) ? undefined : { name: (_m = (_l = p.properties) === null || _l === void 0 ? void 0 : _l.sku) === null || _m === void 0 ? void 0 : _m["name"] },
                        provisioningState: (_o = p.properties) === null || _o === void 0 ? void 0 : _o["provisioningState"],
                    },
            };
        }),
        nextLink: result.body["nextLink"],
    };
}
/** Lists trusted signing accounts within a subscription. */
export function listBySubscription(context, subscriptionId, options = {
    requestOptions: {},
}) {
    return buildPagedAsyncIterator(context, () => _listBySubscriptionSend(context, subscriptionId, options), _listBySubscriptionDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _checkNameAvailabilitySend(context, subscriptionId, body, options = {
    requestOptions: {},
}) {
    return context
        .path("/subscriptions/{subscriptionId}/providers/Microsoft.CodeSigning/checkNameAvailability", subscriptionId)
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { body: { name: body["name"] } }));
}
export async function _checkNameAvailabilityDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        nameAvailable: result.body["nameAvailable"],
        reason: result.body["reason"],
        message: result.body["message"],
    };
}
/** Checks that the trusted signing account name is valid and is not already in use. */
export async function checkNameAvailability(context, subscriptionId, body, options = {
    requestOptions: {},
}) {
    const result = await _checkNameAvailabilitySend(context, subscriptionId, body, options);
    return _checkNameAvailabilityDeserialize(result);
}
//# sourceMappingURL=index.js.map