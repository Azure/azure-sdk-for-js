// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { certificateProfilePropertiesSerializer, } from "../../models/models.js";
import { operationOptionsToRequestParameters, createRestError, } from "@azure-rest/core-client";
import { buildPagedAsyncIterator, } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
export function _getSend(context, subscriptionId, resourceGroupName, accountName, profileName, options = { requestOptions: {} }) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}", subscriptionId, resourceGroupName, accountName, profileName)
        .get(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _getDeserialize(result) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
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
                profileType: (_j = result.body.properties) === null || _j === void 0 ? void 0 : _j["profileType"],
                commonName: (_k = result.body.properties) === null || _k === void 0 ? void 0 : _k["commonName"],
                organization: (_l = result.body.properties) === null || _l === void 0 ? void 0 : _l["organization"],
                organizationUnit: (_m = result.body.properties) === null || _m === void 0 ? void 0 : _m["organizationUnit"],
                streetAddress: (_o = result.body.properties) === null || _o === void 0 ? void 0 : _o["streetAddress"],
                includeStreetAddress: (_p = result.body.properties) === null || _p === void 0 ? void 0 : _p["includeStreetAddress"],
                city: (_q = result.body.properties) === null || _q === void 0 ? void 0 : _q["city"],
                includeCity: (_r = result.body.properties) === null || _r === void 0 ? void 0 : _r["includeCity"],
                state: (_s = result.body.properties) === null || _s === void 0 ? void 0 : _s["state"],
                includeState: (_t = result.body.properties) === null || _t === void 0 ? void 0 : _t["includeState"],
                country: (_u = result.body.properties) === null || _u === void 0 ? void 0 : _u["country"],
                includeCountry: (_v = result.body.properties) === null || _v === void 0 ? void 0 : _v["includeCountry"],
                postalCode: (_w = result.body.properties) === null || _w === void 0 ? void 0 : _w["postalCode"],
                includePostalCode: (_x = result.body.properties) === null || _x === void 0 ? void 0 : _x["includePostalCode"],
                enhancedKeyUsage: (_y = result.body.properties) === null || _y === void 0 ? void 0 : _y["enhancedKeyUsage"],
                identityValidationId: (_z = result.body.properties) === null || _z === void 0 ? void 0 : _z["identityValidationId"],
                provisioningState: (_0 = result.body.properties) === null || _0 === void 0 ? void 0 : _0["provisioningState"],
                status: (_1 = result.body.properties) === null || _1 === void 0 ? void 0 : _1["status"],
                certificates: ((_2 = result.body.properties) === null || _2 === void 0 ? void 0 : _2["certificates"]) === undefined
                    ? (_3 = result.body.properties) === null || _3 === void 0 ? void 0 : _3["certificates"]
                    : (_4 = result.body.properties) === null || _4 === void 0 ? void 0 : _4["certificates"].map((p) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h;
                        return {
                            serialNumber: p["serialNumber"],
                            subjectName: p["subjectName"],
                            thumbprint: p["thumbprint"],
                            createdDate: p["createdDate"],
                            expiryDate: p["expiryDate"],
                            status: p["status"],
                            revocation: !p.revocation
                                ? undefined
                                : {
                                    requestedAt: ((_a = p.revocation) === null || _a === void 0 ? void 0 : _a["requestedAt"]) !== undefined
                                        ? new Date((_b = p.revocation) === null || _b === void 0 ? void 0 : _b["requestedAt"])
                                        : undefined,
                                    effectiveAt: ((_c = p.revocation) === null || _c === void 0 ? void 0 : _c["effectiveAt"]) !== undefined
                                        ? new Date((_d = p.revocation) === null || _d === void 0 ? void 0 : _d["effectiveAt"])
                                        : undefined,
                                    reason: (_e = p.revocation) === null || _e === void 0 ? void 0 : _e["reason"],
                                    remarks: (_f = p.revocation) === null || _f === void 0 ? void 0 : _f["remarks"],
                                    status: (_g = p.revocation) === null || _g === void 0 ? void 0 : _g["status"],
                                    failureReason: (_h = p.revocation) === null || _h === void 0 ? void 0 : _h["failureReason"],
                                },
                        };
                    }),
            },
    };
}
/** Get details of a certificate profile. */
export async function get(context, subscriptionId, resourceGroupName, accountName, profileName, options = { requestOptions: {} }) {
    const result = await _getSend(context, subscriptionId, resourceGroupName, accountName, profileName, options);
    return _getDeserialize(result);
}
export function _createSend(context, subscriptionId, resourceGroupName, accountName, profileName, resource, options = { requestOptions: {} }) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}", subscriptionId, resourceGroupName, accountName, profileName)
        .put(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { body: {
            properties: !resource.properties
                ? resource.properties
                : certificateProfilePropertiesSerializer(resource.properties),
        } }));
}
export async function _createDeserialize(result) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    const expectedStatuses = ["200", "201"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
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
                profileType: (_j = result.body.properties) === null || _j === void 0 ? void 0 : _j["profileType"],
                commonName: (_k = result.body.properties) === null || _k === void 0 ? void 0 : _k["commonName"],
                organization: (_l = result.body.properties) === null || _l === void 0 ? void 0 : _l["organization"],
                organizationUnit: (_m = result.body.properties) === null || _m === void 0 ? void 0 : _m["organizationUnit"],
                streetAddress: (_o = result.body.properties) === null || _o === void 0 ? void 0 : _o["streetAddress"],
                includeStreetAddress: (_p = result.body.properties) === null || _p === void 0 ? void 0 : _p["includeStreetAddress"],
                city: (_q = result.body.properties) === null || _q === void 0 ? void 0 : _q["city"],
                includeCity: (_r = result.body.properties) === null || _r === void 0 ? void 0 : _r["includeCity"],
                state: (_s = result.body.properties) === null || _s === void 0 ? void 0 : _s["state"],
                includeState: (_t = result.body.properties) === null || _t === void 0 ? void 0 : _t["includeState"],
                country: (_u = result.body.properties) === null || _u === void 0 ? void 0 : _u["country"],
                includeCountry: (_v = result.body.properties) === null || _v === void 0 ? void 0 : _v["includeCountry"],
                postalCode: (_w = result.body.properties) === null || _w === void 0 ? void 0 : _w["postalCode"],
                includePostalCode: (_x = result.body.properties) === null || _x === void 0 ? void 0 : _x["includePostalCode"],
                enhancedKeyUsage: (_y = result.body.properties) === null || _y === void 0 ? void 0 : _y["enhancedKeyUsage"],
                identityValidationId: (_z = result.body.properties) === null || _z === void 0 ? void 0 : _z["identityValidationId"],
                provisioningState: (_0 = result.body.properties) === null || _0 === void 0 ? void 0 : _0["provisioningState"],
                status: (_1 = result.body.properties) === null || _1 === void 0 ? void 0 : _1["status"],
                certificates: ((_2 = result.body.properties) === null || _2 === void 0 ? void 0 : _2["certificates"]) === undefined
                    ? (_3 = result.body.properties) === null || _3 === void 0 ? void 0 : _3["certificates"]
                    : (_4 = result.body.properties) === null || _4 === void 0 ? void 0 : _4["certificates"].map((p) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h;
                        return {
                            serialNumber: p["serialNumber"],
                            subjectName: p["subjectName"],
                            thumbprint: p["thumbprint"],
                            createdDate: p["createdDate"],
                            expiryDate: p["expiryDate"],
                            status: p["status"],
                            revocation: !p.revocation
                                ? undefined
                                : {
                                    requestedAt: ((_a = p.revocation) === null || _a === void 0 ? void 0 : _a["requestedAt"]) !== undefined
                                        ? new Date((_b = p.revocation) === null || _b === void 0 ? void 0 : _b["requestedAt"])
                                        : undefined,
                                    effectiveAt: ((_c = p.revocation) === null || _c === void 0 ? void 0 : _c["effectiveAt"]) !== undefined
                                        ? new Date((_d = p.revocation) === null || _d === void 0 ? void 0 : _d["effectiveAt"])
                                        : undefined,
                                    reason: (_e = p.revocation) === null || _e === void 0 ? void 0 : _e["reason"],
                                    remarks: (_f = p.revocation) === null || _f === void 0 ? void 0 : _f["remarks"],
                                    status: (_g = p.revocation) === null || _g === void 0 ? void 0 : _g["status"],
                                    failureReason: (_h = p.revocation) === null || _h === void 0 ? void 0 : _h["failureReason"],
                                },
                        };
                    }),
            },
    };
}
/** Create a certificate profile. */
export function create(context, subscriptionId, resourceGroupName, accountName, profileName, resource, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _createSend(context, subscriptionId, resourceGroupName, accountName, profileName, resource, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
export function _$deleteSend(context, subscriptionId, resourceGroupName, accountName, profileName, options = { requestOptions: {} }) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}", subscriptionId, resourceGroupName, accountName, profileName)
        .delete(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _$deleteDeserialize(result) {
    const expectedStatuses = ["202", "204", "200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return;
}
/** Delete a certificate profile. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(context, subscriptionId, resourceGroupName, accountName, profileName, options = { requestOptions: {} }) {
    return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _$deleteSend(context, subscriptionId, resourceGroupName, accountName, profileName, options),
        resourceLocationConfig: "location",
    });
}
export function _listByCodeSigningAccountSend(context, subscriptionId, resourceGroupName, accountName, options = {
    requestOptions: {},
}) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles", subscriptionId, resourceGroupName, accountName)
        .get(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _listByCodeSigningAccountDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        value: result.body["value"].map((p) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
            return {
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
                        profileType: (_j = p.properties) === null || _j === void 0 ? void 0 : _j["profileType"],
                        commonName: (_k = p.properties) === null || _k === void 0 ? void 0 : _k["commonName"],
                        organization: (_l = p.properties) === null || _l === void 0 ? void 0 : _l["organization"],
                        organizationUnit: (_m = p.properties) === null || _m === void 0 ? void 0 : _m["organizationUnit"],
                        streetAddress: (_o = p.properties) === null || _o === void 0 ? void 0 : _o["streetAddress"],
                        includeStreetAddress: (_p = p.properties) === null || _p === void 0 ? void 0 : _p["includeStreetAddress"],
                        city: (_q = p.properties) === null || _q === void 0 ? void 0 : _q["city"],
                        includeCity: (_r = p.properties) === null || _r === void 0 ? void 0 : _r["includeCity"],
                        state: (_s = p.properties) === null || _s === void 0 ? void 0 : _s["state"],
                        includeState: (_t = p.properties) === null || _t === void 0 ? void 0 : _t["includeState"],
                        country: (_u = p.properties) === null || _u === void 0 ? void 0 : _u["country"],
                        includeCountry: (_v = p.properties) === null || _v === void 0 ? void 0 : _v["includeCountry"],
                        postalCode: (_w = p.properties) === null || _w === void 0 ? void 0 : _w["postalCode"],
                        includePostalCode: (_x = p.properties) === null || _x === void 0 ? void 0 : _x["includePostalCode"],
                        enhancedKeyUsage: (_y = p.properties) === null || _y === void 0 ? void 0 : _y["enhancedKeyUsage"],
                        identityValidationId: (_z = p.properties) === null || _z === void 0 ? void 0 : _z["identityValidationId"],
                        provisioningState: (_0 = p.properties) === null || _0 === void 0 ? void 0 : _0["provisioningState"],
                        status: (_1 = p.properties) === null || _1 === void 0 ? void 0 : _1["status"],
                        certificates: ((_2 = p.properties) === null || _2 === void 0 ? void 0 : _2["certificates"]) === undefined
                            ? (_3 = p.properties) === null || _3 === void 0 ? void 0 : _3["certificates"]
                            : (_4 = p.properties) === null || _4 === void 0 ? void 0 : _4["certificates"].map((p) => {
                                var _a, _b, _c, _d, _e, _f, _g, _h;
                                return {
                                    serialNumber: p["serialNumber"],
                                    subjectName: p["subjectName"],
                                    thumbprint: p["thumbprint"],
                                    createdDate: p["createdDate"],
                                    expiryDate: p["expiryDate"],
                                    status: p["status"],
                                    revocation: !p.revocation
                                        ? undefined
                                        : {
                                            requestedAt: ((_a = p.revocation) === null || _a === void 0 ? void 0 : _a["requestedAt"]) !== undefined
                                                ? new Date((_b = p.revocation) === null || _b === void 0 ? void 0 : _b["requestedAt"])
                                                : undefined,
                                            effectiveAt: ((_c = p.revocation) === null || _c === void 0 ? void 0 : _c["effectiveAt"]) !== undefined
                                                ? new Date((_d = p.revocation) === null || _d === void 0 ? void 0 : _d["effectiveAt"])
                                                : undefined,
                                            reason: (_e = p.revocation) === null || _e === void 0 ? void 0 : _e["reason"],
                                            remarks: (_f = p.revocation) === null || _f === void 0 ? void 0 : _f["remarks"],
                                            status: (_g = p.revocation) === null || _g === void 0 ? void 0 : _g["status"],
                                            failureReason: (_h = p.revocation) === null || _h === void 0 ? void 0 : _h["failureReason"],
                                        },
                                };
                            }),
                    },
            };
        }),
        nextLink: result.body["nextLink"],
    };
}
/** List certificate profiles under a trusted signing account. */
export function listByCodeSigningAccount(context, subscriptionId, resourceGroupName, accountName, options = {
    requestOptions: {},
}) {
    return buildPagedAsyncIterator(context, () => _listByCodeSigningAccountSend(context, subscriptionId, resourceGroupName, accountName, options), _listByCodeSigningAccountDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _revokeCertificateSend(context, subscriptionId, resourceGroupName, accountName, profileName, body, options = {
    requestOptions: {},
}) {
    return context
        .path("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}/revokeCertificate", subscriptionId, resourceGroupName, accountName, profileName)
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { body: {
            serialNumber: body["serialNumber"],
            thumbprint: body["thumbprint"],
            effectiveAt: body["effectiveAt"].toISOString(),
            reason: body["reason"],
            remarks: body["remarks"],
        } }));
}
export async function _revokeCertificateDeserialize(result) {
    const expectedStatuses = ["204"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return;
}
/** Revoke a certificate under a certificate profile. */
export async function revokeCertificate(context, subscriptionId, resourceGroupName, accountName, profileName, body, options = {
    requestOptions: {},
}) {
    const result = await _revokeCertificateSend(context, subscriptionId, resourceGroupName, accountName, profileName, body, options);
    return _revokeCertificateDeserialize(result);
}
//# sourceMappingURL=index.js.map