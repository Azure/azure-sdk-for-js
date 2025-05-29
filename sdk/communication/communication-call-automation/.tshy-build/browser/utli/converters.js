// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { serializeCommunicationIdentifier, isCommunicationUserIdentifier, isPhoneNumberIdentifier, isUnknownIdentifier, isMicrosoftTeamsUserIdentifier, isMicrosoftTeamsAppIdentifier, } from "@azure/communication-common";
import { KnownCommunicationIdentifierModelKind } from "../generated/src/index.js";
function extractKind(identifierModel) {
    if (identifierModel.communicationUser !== undefined) {
        return KnownCommunicationIdentifierModelKind.CommunicationUser;
    }
    if (identifierModel.phoneNumber !== undefined) {
        return KnownCommunicationIdentifierModelKind.PhoneNumber;
    }
    if (identifierModel.microsoftTeamsUser !== undefined) {
        return KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser;
    }
    if (identifierModel.microsoftTeamsApp !== undefined) {
        return KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp;
    }
    return KnownCommunicationIdentifierModelKind.Unknown;
}
/** Convert PhoneNumberIdentifier to PhoneNumberIdentifierModel(Internal usage class) */
export function PhoneNumberIdentifierModelConverter(phoneNumberIdentifier) {
    if (phoneNumberIdentifier === undefined || phoneNumberIdentifier.phoneNumber === undefined) {
        return undefined;
    }
    const phoneNumberIdentifierModel = serializeCommunicationIdentifier(phoneNumberIdentifier).phoneNumber;
    return phoneNumberIdentifierModel;
}
/** Convert SerializedPhoneNumberIdentifier to PhoneNumberIdentifier(Public usage class) */
export function phoneNumberIdentifierConverter(serializedPhoneNumberIdentifier) {
    if (serializedPhoneNumberIdentifier === undefined ||
        (serializedPhoneNumberIdentifier === null || serializedPhoneNumberIdentifier === void 0 ? void 0 : serializedPhoneNumberIdentifier.value) === null) {
        return undefined;
    }
    const phoneNumberIdentifier = {
        phoneNumber: serializedPhoneNumberIdentifier.value,
    };
    return phoneNumberIdentifier;
}
/** Convert CommunicationIdentifierModel to CommunicationIdentifier(Public usage class) */
export function communicationIdentifierConverter(identifierModel) {
    const rawId = identifierModel.rawId;
    const kind = identifierModel.kind !== undefined ? identifierModel.kind : extractKind(identifierModel);
    if (kind === KnownCommunicationIdentifierModelKind.CommunicationUser &&
        identifierModel.communicationUser !== undefined) {
        const communicationUserIdentifier = {
            communicationUserId: identifierModel.communicationUser.id,
        };
        return communicationUserIdentifier;
    }
    if (kind === KnownCommunicationIdentifierModelKind.PhoneNumber &&
        identifierModel.phoneNumber !== undefined) {
        const phoneNumberIdentifier = {
            phoneNumber: identifierModel.phoneNumber.value,
            rawId: rawId,
        };
        return phoneNumberIdentifier;
    }
    if (kind === KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser &&
        identifierModel.microsoftTeamsUser !== undefined) {
        const microsoftTeamsUserIdentifier = {
            rawId: rawId,
            microsoftTeamsUserId: identifierModel.microsoftTeamsUser.userId,
            isAnonymous: identifierModel.microsoftTeamsUser.isAnonymous,
            cloud: identifierModel.microsoftTeamsUser.cloud,
        };
        return microsoftTeamsUserIdentifier;
    }
    if (kind === KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp &&
        identifierModel.microsoftTeamsApp !== undefined) {
        const microsoftTeamsAppIdentifier = {
            rawId: rawId,
            teamsAppId: identifierModel.microsoftTeamsApp.appId,
            cloud: identifierModel.microsoftTeamsApp.cloud,
        };
        return microsoftTeamsAppIdentifier;
    }
    const unknownIdentifier = {
        id: rawId ? rawId : "",
    };
    return unknownIdentifier;
}
/** Convert CommunicationIdentifier to CommunicationIdentifierModel(Internal usage class) */
export function communicationIdentifierModelConverter(identifier) {
    const serializedIdentifier = serializeCommunicationIdentifier(identifier);
    if (isCommunicationUserIdentifier(identifier)) {
        const communicationUserIdentifierModel = Object.assign({ kind: KnownCommunicationIdentifierModelKind.CommunicationUser }, serializedIdentifier);
        return communicationUserIdentifierModel;
    }
    if (isPhoneNumberIdentifier(identifier)) {
        const phoneNumberIdentifierModel = Object.assign({ kind: KnownCommunicationIdentifierModelKind.PhoneNumber }, serializedIdentifier);
        return phoneNumberIdentifierModel;
    }
    if (isMicrosoftTeamsUserIdentifier(identifier)) {
        const microsoftTeamsUserIdentifierModel = Object.assign({ kind: KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser }, serializedIdentifier);
        return microsoftTeamsUserIdentifierModel;
    }
    if (isMicrosoftTeamsAppIdentifier(identifier)) {
        const microsoftTeamsAppIdentifierModel = Object.assign({ kind: KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp }, serializedIdentifier);
        return microsoftTeamsAppIdentifierModel;
    }
    if (isUnknownIdentifier(identifier)) {
        const unknownIdentifierModel = Object.assign({ kind: KnownCommunicationIdentifierModelKind.Unknown }, serializedIdentifier);
        return unknownIdentifierModel;
    }
    throw new Error();
}
/** Convert CallParticipantInternal to CallParticipant */
export function callParticipantConverter(acsCallParticipant) {
    const callParticipant = Object.assign(Object.assign({}, acsCallParticipant), { identifier: acsCallParticipant.identifier
            ? communicationIdentifierConverter(acsCallParticipant.identifier)
            : undefined });
    return callParticipant;
}
/** Convert CommunicationUserIdentifier to CommunicationUserIdentifierModel (Internal usage class) */
export function communicationUserIdentifierModelConverter(identifier) {
    if (!identifier || !identifier.communicationUserId) {
        return undefined;
    }
    return { id: identifier.communicationUserId };
}
/** Convert CommunicationUserIdentifierModel to CommunicationUserIdentifier (Public usage class) */
export function communicationUserIdentifierConverter(identifier) {
    if (!identifier || !identifier.id) {
        return undefined;
    }
    return { communicationUserId: identifier.id };
}
/** Convert MicrosoftTeamsAppIdentifier to MicrosoftTeamsAppIdentifierModel (Internal usage class) */
export function microsoftTeamsAppIdentifierModelConverter(identifier) {
    if (!identifier || !identifier.teamsAppId) {
        return undefined;
    }
    return { appId: identifier.teamsAppId };
}
/** Convert MicrosoftTeamsAppIdentifierModel to MicrosoftTeamsAppIdentifier (Public usage class) */
export function microsoftTeamsAppIdentifierConverter(identifier) {
    if (!identifier || !identifier.appId) {
        return undefined;
    }
    return { teamsAppId: identifier.appId };
}
//# sourceMappingURL=converters.js.map