// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
    PhoneNumberIdentifier,
    CommunicationUserIdentifier,
    UnknownIdentifier,
    serializeCommunicationIdentifier,
    SerializedPhoneNumberIdentifier,
    CommunicationIdentifier,
    isCommunicationUserIdentifier,
    isPhoneNumberIdentifier,
    isUnknownIdentifier
} from "@azure/communication-common";
import { CallSource, CommunicationIdentifierModel, CommunicationIdentifierModelKind, KnownCommunicationIdentifierModelKind, PhoneNumberIdentifierModel } from "../generated/src";
import { CallSourceDto } from "../models/models";

function extractKind(identifierModel: CommunicationIdentifierModel): CommunicationIdentifierModelKind {
    if (identifierModel.communicationUser != undefined) {
        return KnownCommunicationIdentifierModelKind.CommunicationUser;
    }
    if (identifierModel.phoneNumber != undefined) {
        return KnownCommunicationIdentifierModelKind.PhoneNumber;
    }
    if (identifierModel.microsoftTeamsUser != undefined) {
        return KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser;
    }
    return KnownCommunicationIdentifierModelKind.Unknown;
}

export function SerializedPhoneNumberIdentifierConverter(phoneNumberIdentifier: PhoneNumberIdentifier | undefined
): SerializedPhoneNumberIdentifier | undefined {
    if (phoneNumberIdentifier == undefined || phoneNumberIdentifier.phoneNumber == undefined) {
        return undefined;
    }

    const phoneNumberIdentifierModel = serializeCommunicationIdentifier(phoneNumberIdentifier).phoneNumber;
    return phoneNumberIdentifierModel;
}

export function PhoneNumberIdentifierConverter(serializedPhoneNumberIdentifier: SerializedPhoneNumberIdentifier | undefined
): PhoneNumberIdentifier | undefined {
    if (serializedPhoneNumberIdentifier == undefined || serializedPhoneNumberIdentifier?.value == null) {
        return undefined;
    }

    const phoneNumberIdentifier: PhoneNumberIdentifier = {
        phoneNumber: serializedPhoneNumberIdentifier.value
    }
    return phoneNumberIdentifier;
}

export function CommunicationIdentifierConverter(identifierModel: CommunicationIdentifierModel
): CommunicationIdentifier {
    const rawId = identifierModel.rawId;
    const kind = (identifierModel.kind != undefined) ? identifierModel.kind : extractKind(identifierModel);

    if (kind == KnownCommunicationIdentifierModelKind.CommunicationUser
        && identifierModel.communicationUser != undefined) {
        const communicationUserIdentifier: CommunicationUserIdentifier = {
            communicationUserId: identifierModel.communicationUser.id
        }
        return communicationUserIdentifier;
    }

    if (kind == KnownCommunicationIdentifierModelKind.PhoneNumber
        && identifierModel.phoneNumber != undefined) {
        const phoneNumberIdentifier: PhoneNumberIdentifier = {
            phoneNumber: identifierModel.phoneNumber.value,
            rawId: rawId
        }
        return phoneNumberIdentifier;
    }

    const unknownIdentifier: UnknownIdentifier = {
        id: rawId ? rawId : ""
    }
    return unknownIdentifier;
}

export function CommunicationIdentifierModelConverter(identifier: CommunicationIdentifier
): CommunicationIdentifierModel {
    if (isCommunicationUserIdentifier(identifier)) {
        const communicationUserIdentifierModel: CommunicationIdentifierModel = {
            rawId: identifier.communicationUserId,
            kind: KnownCommunicationIdentifierModelKind.CommunicationUser,
            communicationUser: {
                id: identifier.communicationUserId
                }
        }
        return communicationUserIdentifierModel;
    }

    if (isPhoneNumberIdentifier(identifier)) {
        const phoneNumberIdentifierModel: CommunicationIdentifierModel = {
            rawId: identifier.rawId,
            kind: KnownCommunicationIdentifierModelKind.PhoneNumber,
            phoneNumber: {
                value: identifier.phoneNumber
            }
        }
        return phoneNumberIdentifierModel;
    }

    if (isUnknownIdentifier(identifier)) {
        const unknownIdentifierModel: CommunicationIdentifierModel = {
            rawId: identifier.id,
            kind: KnownCommunicationIdentifierModelKind.Unknown,
        }
        return unknownIdentifierModel;
    }

    throw new Error();
}

export function CallSourceConverter(callSourceDto: CallSourceDto): CallSource {
    const callSource: CallSource = {
        ...callSourceDto,
        identifier: CommunicationIdentifierModelConverter(callSourceDto.identifier),
        callerId: SerializedPhoneNumberIdentifierConverter(callSourceDto.callerId)
    }
    return callSource;
}

export function CallSourceDtoConverter(callSource: CallSource): CallSourceDto {
    const callSourceDto: CallSourceDto = {
        ...callSource,
        identifier: CommunicationIdentifierConverter(callSource.identifier),
        callerId: PhoneNumberIdentifierConverter(callSource.callerId)
    }
    return callSourceDto;
}