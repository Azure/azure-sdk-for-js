"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberIdentifierModelConverter = PhoneNumberIdentifierModelConverter;
exports.phoneNumberIdentifierConverter = phoneNumberIdentifierConverter;
exports.communicationIdentifierConverter = communicationIdentifierConverter;
exports.communicationIdentifierModelConverter = communicationIdentifierModelConverter;
exports.callParticipantConverter = callParticipantConverter;
exports.communicationUserIdentifierModelConverter = communicationUserIdentifierModelConverter;
exports.communicationUserIdentifierConverter = communicationUserIdentifierConverter;
exports.microsoftTeamsAppIdentifierModelConverter = microsoftTeamsAppIdentifierModelConverter;
exports.microsoftTeamsAppIdentifierConverter = microsoftTeamsAppIdentifierConverter;
const communication_common_1 = require("@azure/communication-common");
const index_js_1 = require("../generated/src/index.js");
function extractKind(identifierModel) {
    if (identifierModel.communicationUser !== undefined) {
        return index_js_1.KnownCommunicationIdentifierModelKind.CommunicationUser;
    }
    if (identifierModel.phoneNumber !== undefined) {
        return index_js_1.KnownCommunicationIdentifierModelKind.PhoneNumber;
    }
    if (identifierModel.microsoftTeamsUser !== undefined) {
        return index_js_1.KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser;
    }
    if (identifierModel.microsoftTeamsApp !== undefined) {
        return index_js_1.KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp;
    }
    return index_js_1.KnownCommunicationIdentifierModelKind.Unknown;
}
/** Convert PhoneNumberIdentifier to PhoneNumberIdentifierModel(Internal usage class) */
function PhoneNumberIdentifierModelConverter(phoneNumberIdentifier) {
    if (phoneNumberIdentifier === undefined || phoneNumberIdentifier.phoneNumber === undefined) {
        return undefined;
    }
    const phoneNumberIdentifierModel = (0, communication_common_1.serializeCommunicationIdentifier)(phoneNumberIdentifier).phoneNumber;
    return phoneNumberIdentifierModel;
}
/** Convert SerializedPhoneNumberIdentifier to PhoneNumberIdentifier(Public usage class) */
function phoneNumberIdentifierConverter(serializedPhoneNumberIdentifier) {
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
function communicationIdentifierConverter(identifierModel) {
    const rawId = identifierModel.rawId;
    const kind = identifierModel.kind !== undefined ? identifierModel.kind : extractKind(identifierModel);
    if (kind === index_js_1.KnownCommunicationIdentifierModelKind.CommunicationUser &&
        identifierModel.communicationUser !== undefined) {
        const communicationUserIdentifier = {
            communicationUserId: identifierModel.communicationUser.id,
        };
        return communicationUserIdentifier;
    }
    if (kind === index_js_1.KnownCommunicationIdentifierModelKind.PhoneNumber &&
        identifierModel.phoneNumber !== undefined) {
        const phoneNumberIdentifier = {
            phoneNumber: identifierModel.phoneNumber.value,
            rawId: rawId,
        };
        return phoneNumberIdentifier;
    }
    if (kind === index_js_1.KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser &&
        identifierModel.microsoftTeamsUser !== undefined) {
        const microsoftTeamsUserIdentifier = {
            rawId: rawId,
            microsoftTeamsUserId: identifierModel.microsoftTeamsUser.userId,
            isAnonymous: identifierModel.microsoftTeamsUser.isAnonymous,
            cloud: identifierModel.microsoftTeamsUser.cloud,
        };
        return microsoftTeamsUserIdentifier;
    }
    if (kind === index_js_1.KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp &&
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
function communicationIdentifierModelConverter(identifier) {
    const serializedIdentifier = (0, communication_common_1.serializeCommunicationIdentifier)(identifier);
    if ((0, communication_common_1.isCommunicationUserIdentifier)(identifier)) {
        const communicationUserIdentifierModel = Object.assign({ kind: index_js_1.KnownCommunicationIdentifierModelKind.CommunicationUser }, serializedIdentifier);
        return communicationUserIdentifierModel;
    }
    if ((0, communication_common_1.isPhoneNumberIdentifier)(identifier)) {
        const phoneNumberIdentifierModel = Object.assign({ kind: index_js_1.KnownCommunicationIdentifierModelKind.PhoneNumber }, serializedIdentifier);
        return phoneNumberIdentifierModel;
    }
    if ((0, communication_common_1.isMicrosoftTeamsUserIdentifier)(identifier)) {
        const microsoftTeamsUserIdentifierModel = Object.assign({ kind: index_js_1.KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser }, serializedIdentifier);
        return microsoftTeamsUserIdentifierModel;
    }
    if ((0, communication_common_1.isMicrosoftTeamsAppIdentifier)(identifier)) {
        const microsoftTeamsAppIdentifierModel = Object.assign({ kind: index_js_1.KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp }, serializedIdentifier);
        return microsoftTeamsAppIdentifierModel;
    }
    if ((0, communication_common_1.isUnknownIdentifier)(identifier)) {
        const unknownIdentifierModel = Object.assign({ kind: index_js_1.KnownCommunicationIdentifierModelKind.Unknown }, serializedIdentifier);
        return unknownIdentifierModel;
    }
    throw new Error();
}
/** Convert CallParticipantInternal to CallParticipant */
function callParticipantConverter(acsCallParticipant) {
    const callParticipant = Object.assign(Object.assign({}, acsCallParticipant), { identifier: acsCallParticipant.identifier
            ? communicationIdentifierConverter(acsCallParticipant.identifier)
            : undefined });
    return callParticipant;
}
/** Convert CommunicationUserIdentifier to CommunicationUserIdentifierModel (Internal usage class) */
function communicationUserIdentifierModelConverter(identifier) {
    if (!identifier || !identifier.communicationUserId) {
        return undefined;
    }
    return { id: identifier.communicationUserId };
}
/** Convert CommunicationUserIdentifierModel to CommunicationUserIdentifier (Public usage class) */
function communicationUserIdentifierConverter(identifier) {
    if (!identifier || !identifier.id) {
        return undefined;
    }
    return { communicationUserId: identifier.id };
}
/** Convert MicrosoftTeamsAppIdentifier to MicrosoftTeamsAppIdentifierModel (Internal usage class) */
function microsoftTeamsAppIdentifierModelConverter(identifier) {
    if (!identifier || !identifier.teamsAppId) {
        return undefined;
    }
    return { appId: identifier.teamsAppId };
}
/** Convert MicrosoftTeamsAppIdentifierModel to MicrosoftTeamsAppIdentifier (Public usage class) */
function microsoftTeamsAppIdentifierConverter(identifier) {
    if (!identifier || !identifier.appId) {
        return undefined;
    }
    return { teamsAppId: identifier.appId };
}
//# sourceMappingURL=converters.js.map