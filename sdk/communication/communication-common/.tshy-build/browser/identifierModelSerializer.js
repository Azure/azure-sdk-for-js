// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getIdentifierKind, getIdentifierRawId, } from "./identifierModels.js";
const assertNotNullOrUndefined = (obj, prop) => {
    const subObjName = Object.keys(obj)[0];
    const subObj = obj[subObjName];
    if (prop in subObj) {
        return subObj[prop];
    }
    throw new Error(`Property ${prop} is required for identifier of type ${subObjName}.`);
};
const assertMaximumOneNestedModel = (identifier) => {
    const presentProperties = [];
    if (identifier.communicationUser !== undefined) {
        presentProperties.push("communicationUser");
    }
    if (identifier.microsoftTeamsUser !== undefined) {
        presentProperties.push("microsoftTeamsUser");
    }
    if (identifier.microsoftTeamsApp !== undefined) {
        presentProperties.push("microsoftTeamsApp");
    }
    if (identifier.phoneNumber !== undefined) {
        presentProperties.push("phoneNumber");
    }
    if (identifier.teamsExtensionUser !== undefined) {
        presentProperties.push("teamsExtensionUser");
    }
    if (presentProperties.length > 1) {
        throw new Error(`Only one of the properties in ${JSON.stringify(presentProperties)} should be present.`);
    }
};
/**
 * @hidden
 * Translates a CommunicationIdentifier to its serialized format for sending a request.
 * @param identifier - The CommunicationIdentifier to be serialized.
 */
export const serializeCommunicationIdentifier = (identifier) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const identifierKind = getIdentifierKind(identifier);
    switch (identifierKind.kind) {
        case "communicationUser":
            return {
                rawId: getIdentifierRawId(identifierKind),
                communicationUser: { id: identifierKind.communicationUserId },
            };
        case "phoneNumber":
            return {
                rawId: (_a = identifierKind.rawId) !== null && _a !== void 0 ? _a : getIdentifierRawId(identifierKind),
                phoneNumber: {
                    value: identifierKind.phoneNumber,
                    isAnonymous: (_b = identifierKind.isAnonymous) !== null && _b !== void 0 ? _b : false,
                    assertedId: identifierKind.assertedId,
                },
            };
        case "microsoftTeamsUser":
            return {
                rawId: (_c = identifierKind.rawId) !== null && _c !== void 0 ? _c : getIdentifierRawId(identifierKind),
                microsoftTeamsUser: {
                    userId: identifierKind.microsoftTeamsUserId,
                    isAnonymous: (_d = identifierKind.isAnonymous) !== null && _d !== void 0 ? _d : false,
                    cloud: (_e = identifierKind.cloud) !== null && _e !== void 0 ? _e : "public",
                },
            };
        case "microsoftTeamsApp":
            return {
                rawId: (_f = identifierKind.rawId) !== null && _f !== void 0 ? _f : getIdentifierRawId(identifierKind),
                microsoftTeamsApp: {
                    appId: identifierKind.teamsAppId,
                    cloud: (_g = identifierKind.cloud) !== null && _g !== void 0 ? _g : "public",
                },
            };
        case "teamsExtensionUser":
            return {
                rawId: (_h = identifierKind.rawId) !== null && _h !== void 0 ? _h : getIdentifierRawId(identifierKind),
                teamsExtensionUser: {
                    userId: identifierKind.userId,
                    tenantId: identifierKind.tenantId,
                    resourceId: identifierKind.resourceId,
                    cloud: (_j = identifierKind.cloud) !== null && _j !== void 0 ? _j : "public",
                },
            };
        case "unknown":
            return { rawId: identifierKind.id };
        default:
            throw new Error(`Can't serialize an identifier with kind ${identifierKind.kind}`);
    }
};
const getKind = (serializedIdentifier) => {
    if (serializedIdentifier.communicationUser) {
        return "communicationUser";
    }
    if (serializedIdentifier.phoneNumber) {
        return "phoneNumber";
    }
    if (serializedIdentifier.microsoftTeamsUser) {
        return "microsoftTeamsUser";
    }
    if (serializedIdentifier.microsoftTeamsApp) {
        return "microsoftTeamsApp";
    }
    if (serializedIdentifier.teamsExtensionUser) {
        return "teamsExtensionUser";
    }
    return "unknown";
};
/**
 * @hidden
 * Translates the serialized format of a communication identifier to CommunicationIdentifier.
 * @param serializedIdentifier - The SerializedCommunicationIdentifier to be deserialized.
 */
export const deserializeCommunicationIdentifier = (serializedIdentifier) => {
    var _a, _b;
    assertMaximumOneNestedModel(serializedIdentifier);
    const communicationUser = serializedIdentifier.communicationUser;
    const microsoftTeamsUser = serializedIdentifier.microsoftTeamsUser;
    const microsoftTeamsApp = serializedIdentifier.microsoftTeamsApp;
    const phoneNumber = serializedIdentifier.phoneNumber;
    const teamsExtensionUser = serializedIdentifier.teamsExtensionUser;
    const kind = (_a = serializedIdentifier.kind) !== null && _a !== void 0 ? _a : getKind(serializedIdentifier);
    if (kind === "communicationUser" && communicationUser) {
        return {
            kind: "communicationUser",
            communicationUserId: assertNotNullOrUndefined({ communicationUser }, "id"),
        };
    }
    if (kind === "phoneNumber" && phoneNumber) {
        return {
            kind: "phoneNumber",
            phoneNumber: assertNotNullOrUndefined({ phoneNumber }, "value"),
            rawId: assertNotNullOrUndefined({ phoneNumber: serializedIdentifier }, "rawId"),
            isAnonymous: (_b = phoneNumber.isAnonymous) !== null && _b !== void 0 ? _b : false,
            assertedId: phoneNumber.assertedId,
        };
    }
    if (kind === "microsoftTeamsUser" && microsoftTeamsUser) {
        return {
            kind: "microsoftTeamsUser",
            microsoftTeamsUserId: assertNotNullOrUndefined({ microsoftTeamsUser }, "userId"),
            isAnonymous: assertNotNullOrUndefined({ microsoftTeamsUser }, "isAnonymous"),
            cloud: assertNotNullOrUndefined({ microsoftTeamsUser }, "cloud"),
            rawId: assertNotNullOrUndefined({ microsoftTeamsUser: serializedIdentifier }, "rawId"),
        };
    }
    if (kind === "microsoftTeamsApp" && microsoftTeamsApp) {
        return {
            kind: "microsoftTeamsApp",
            teamsAppId: assertNotNullOrUndefined({ microsoftTeamsApp }, "appId"),
            cloud: assertNotNullOrUndefined({ microsoftTeamsApp }, "cloud"),
            rawId: assertNotNullOrUndefined({ microsoftTeamsApp: serializedIdentifier }, "rawId"),
        };
    }
    if (kind === "teamsExtensionUser" && teamsExtensionUser) {
        return {
            kind: "teamsExtensionUser",
            userId: assertNotNullOrUndefined({ teamsExtensionUser }, "userId"),
            tenantId: assertNotNullOrUndefined({ teamsExtensionUser }, "tenantId"),
            resourceId: assertNotNullOrUndefined({ teamsExtensionUser }, "resourceId"),
            cloud: assertNotNullOrUndefined({ teamsExtensionUser }, "cloud"),
            rawId: assertNotNullOrUndefined({ teamsExtensionUser: serializedIdentifier }, "rawId"),
        };
    }
    return {
        kind: "unknown",
        id: assertNotNullOrUndefined({ unknown: serializedIdentifier }, "rawId"),
    };
};
//# sourceMappingURL=identifierModelSerializer.js.map