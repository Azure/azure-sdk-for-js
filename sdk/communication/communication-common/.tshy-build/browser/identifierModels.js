// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Tests an Identifier to determine whether it implements CommunicationUserIdentifier.
 *
 * @param identifier - The assumed CommunicationUserIdentifier to be tested.
 */
export const isCommunicationUserIdentifier = (identifier) => {
    return typeof identifier.communicationUserId === "string";
};
/**
 * Tests an Identifier to determine whether it implements PhoneNumberIdentifier.
 *
 * @param identifier - The assumed PhoneNumberIdentifier to be tested.
 */
export const isPhoneNumberIdentifier = (identifier) => {
    return typeof identifier.phoneNumber === "string";
};
/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsUserIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export const isMicrosoftTeamsUserIdentifier = (identifier) => {
    return typeof identifier.microsoftTeamsUserId === "string";
};
/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsAppIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export const isMicrosoftTeamsAppIdentifier = (identifier) => {
    return typeof identifier.teamsAppId === "string";
};
/**
 * Tests an Identifier to determine whether it implements TeamsExtensionUserIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export const isTeamsExtensionUserIdentifier = (identifier) => {
    const userIdExists = typeof identifier.userId === "string";
    const tenantIdExists = typeof identifier.tenantId === "string";
    const resourceIdExists = typeof identifier.resourceId === "string";
    return userIdExists && tenantIdExists && resourceIdExists;
};
/**
 * Tests an Identifier to determine whether it implements UnknownIdentifier.
 *
 * @param identifier - The assumed UnknownIdentifier to be tested.
 */
export const isUnknownIdentifier = (identifier) => {
    return typeof identifier.id === "string";
};
/**
 * Returns the CommunicationIdentifierKind for a given CommunicationIdentifier. Returns undefined if the kind couldn't be inferred.
 *
 * @param identifier - The identifier whose kind is to be inferred.
 */
export const getIdentifierKind = (identifier) => {
    if (isCommunicationUserIdentifier(identifier)) {
        return Object.assign(Object.assign({}, identifier), { kind: "communicationUser" });
    }
    if (isPhoneNumberIdentifier(identifier)) {
        return Object.assign(Object.assign({}, identifier), { kind: "phoneNumber" });
    }
    if (isMicrosoftTeamsUserIdentifier(identifier)) {
        return Object.assign(Object.assign({}, identifier), { kind: "microsoftTeamsUser" });
    }
    if (isMicrosoftTeamsAppIdentifier(identifier)) {
        return Object.assign(Object.assign({}, identifier), { kind: "microsoftTeamsApp" });
    }
    if (isTeamsExtensionUserIdentifier(identifier)) {
        return Object.assign(Object.assign({}, identifier), { kind: "teamsExtensionUser" });
    }
    return Object.assign(Object.assign({}, identifier), { kind: "unknown" });
};
/**
 * Returns the rawId for a given CommunicationIdentifier. You can use the rawId for encoding the identifier and then use it as a key in a database.
 *
 * @param identifier - The identifier to be translated to its rawId.
 */
export const getIdentifierRawId = (identifier) => {
    const identifierKind = getIdentifierKind(identifier);
    switch (identifierKind.kind) {
        case "communicationUser":
            return identifierKind.communicationUserId;
        case "microsoftTeamsUser": {
            const { microsoftTeamsUserId, rawId, cloud, isAnonymous } = identifierKind;
            if (rawId)
                return rawId;
            if (isAnonymous)
                return `8:teamsvisitor:${microsoftTeamsUserId}`;
            switch (cloud) {
                case "dod":
                    return `8:dod:${microsoftTeamsUserId}`;
                case "gcch":
                    return `8:gcch:${microsoftTeamsUserId}`;
                case "public":
                    return `8:orgid:${microsoftTeamsUserId}`;
            }
            return `8:orgid:${microsoftTeamsUserId}`;
        }
        case "microsoftTeamsApp": {
            const { teamsAppId, rawId, cloud } = identifierKind;
            if (rawId)
                return rawId;
            switch (cloud) {
                case "dod":
                    return `28:dod:${teamsAppId}`;
                case "gcch":
                    return `28:gcch:${teamsAppId}`;
            }
            return `28:orgid:${teamsAppId}`;
        }
        case "phoneNumber": {
            const { phoneNumber, rawId } = identifierKind;
            if (rawId)
                return rawId;
            return `4:${phoneNumber}`;
        }
        case "teamsExtensionUser": {
            const { userId, tenantId, resourceId, rawId, cloud } = identifierKind;
            if (rawId)
                return rawId;
            switch (cloud) {
                case "dod":
                    return `8:dod-acs:${resourceId}_${tenantId}_${userId}`;
                case "gcch":
                    return `8:gcch-acs:${resourceId}_${tenantId}_${userId}`;
            }
            return `8:acs:${resourceId}_${tenantId}_${userId}`;
        }
        case "unknown": {
            return identifierKind.id;
        }
    }
};
const buildMicrosoftTeamsAppIdentifier = (teamsAppId, cloud) => {
    return {
        kind: "microsoftTeamsApp",
        teamsAppId: teamsAppId,
        cloud: cloud,
    };
};
const buildMicrosoftTeamsUserIdentifier = (id, cloud, isAnonymous) => {
    return {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: id,
        isAnonymous: isAnonymous,
        cloud: cloud,
    };
};
const buildTeamsExtensionUserOrCommunicationUserIdentifier = (rawId, suffix, cloud) => {
    const segments = suffix.split("_");
    if (segments.length !== 3) {
        return { kind: "communicationUser", communicationUserId: rawId };
    }
    const resourceId = segments[0];
    const tenantId = segments[1];
    const userId = segments[2];
    return {
        kind: "teamsExtensionUser",
        userId: userId,
        tenantId: tenantId,
        resourceId: resourceId,
        cloud: cloud,
    };
};
const buildPhoneNumberIdentifier = (rawId) => {
    const phoneNumber = rawId.substring("4:".length);
    const isAnonymous = phoneNumber === "anonymous";
    const assertedIdIndex = isAnonymous ? -1 : phoneNumber.lastIndexOf("_") + 1;
    const hasAssertedId = assertedIdIndex > 0 && assertedIdIndex < phoneNumber.length;
    const assertedId = hasAssertedId ? phoneNumber.substring(assertedIdIndex) : undefined;
    return {
        kind: "phoneNumber",
        phoneNumber: phoneNumber,
        isAnonymous: isAnonymous,
        assertedId: assertedId,
    };
};
/**
 * Creates a CommunicationIdentifierKind from a given rawId. When storing rawIds use this function to restore the identifier that was encoded in the rawId.
 *
 * @param rawId - The rawId to be translated to its identifier representation.
 */
export const createIdentifierFromRawId = (rawId) => {
    if (rawId.startsWith("4:")) {
        return buildPhoneNumberIdentifier(rawId);
    }
    const segments = rawId.split(":");
    if (segments.length !== 3) {
        return { kind: "unknown", id: rawId };
    }
    const prefix = `${segments[0]}:${segments[1]}:`;
    const suffix = segments[2];
    switch (prefix) {
        case "8:teamsvisitor:":
            return { kind: "microsoftTeamsUser", microsoftTeamsUserId: suffix, isAnonymous: true };
        case "8:orgid:":
            return buildMicrosoftTeamsUserIdentifier(suffix, "public", false);
        case "8:dod:":
            return buildMicrosoftTeamsUserIdentifier(suffix, "dod", false);
        case "8:gcch:":
            return buildMicrosoftTeamsUserIdentifier(suffix, "gcch", false);
        case "8:acs:":
            return buildTeamsExtensionUserOrCommunicationUserIdentifier(rawId, suffix, "public");
        case "8:dod-acs:":
            return buildTeamsExtensionUserOrCommunicationUserIdentifier(rawId, suffix, "dod");
        case "8:gcch-acs:":
            return buildTeamsExtensionUserOrCommunicationUserIdentifier(rawId, suffix, "gcch");
        case "8:spool:":
            return { kind: "communicationUser", communicationUserId: rawId };
        case "28:orgid:":
            return buildMicrosoftTeamsAppIdentifier(suffix, "public");
        case "28:gcch:":
            return buildMicrosoftTeamsAppIdentifier(suffix, "gcch");
        case "28:dod:":
            return buildMicrosoftTeamsAppIdentifier(suffix, "dod");
    }
    return { kind: "unknown", id: rawId };
};
//# sourceMappingURL=identifierModels.js.map