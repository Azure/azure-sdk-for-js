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
  isUnknownIdentifier,
} from "@azure/communication-common";
import {
  CallParticipantInternal,
  CommunicationIdentifierModel,
  CommunicationIdentifierModelKind,
  CommunicationUserIdentifierModel,
  KnownCommunicationIdentifierModelKind,
  PhoneNumberIdentifierModel,
} from "../generated/src";
import { CallParticipant } from "../models/models";

function extractKind(
  identifierModel: CommunicationIdentifierModel
): CommunicationIdentifierModelKind {
  if (identifierModel.communicationUser !== undefined) {
    return KnownCommunicationIdentifierModelKind.CommunicationUser;
  }
  if (identifierModel.phoneNumber !== undefined) {
    return KnownCommunicationIdentifierModelKind.PhoneNumber;
  }
  if (identifierModel.microsoftTeamsUser !== undefined) {
    return KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser;
  }
  return KnownCommunicationIdentifierModelKind.Unknown;
}

/** Convert PhoneNumberIdentifier to PhoneNumberIdentifierModel(Internal usage class) */
export function PhoneNumberIdentifierModelConverter(
  phoneNumberIdentifier: PhoneNumberIdentifier | undefined
): PhoneNumberIdentifierModel | undefined {
  if (phoneNumberIdentifier === undefined || phoneNumberIdentifier.phoneNumber === undefined) {
    return undefined;
  }

  const phoneNumberIdentifierModel =
    serializeCommunicationIdentifier(phoneNumberIdentifier).phoneNumber;
  return phoneNumberIdentifierModel;
}

/** Convert SerializedPhoneNumberIdentifier to PhoneNumberIdentifier(Public usage class) */
export function phoneNumberIdentifierConverter(
  serializedPhoneNumberIdentifier: SerializedPhoneNumberIdentifier | undefined
): PhoneNumberIdentifier | undefined {
  if (
    serializedPhoneNumberIdentifier === undefined ||
    serializedPhoneNumberIdentifier?.value === null
  ) {
    return undefined;
  }

  const phoneNumberIdentifier: PhoneNumberIdentifier = {
    phoneNumber: serializedPhoneNumberIdentifier.value,
  };
  return phoneNumberIdentifier;
}

/** Convert CommunicationIdentifierModel to CommunicationIdentifier(Public usage class) */
export function communicationIdentifierConverter(
  identifierModel: CommunicationIdentifierModel
): CommunicationIdentifier {
  const rawId = identifierModel.rawId;
  const kind =
    identifierModel.kind !== undefined ? identifierModel.kind : extractKind(identifierModel);

  if (
    kind === KnownCommunicationIdentifierModelKind.CommunicationUser &&
    identifierModel.communicationUser !== undefined
  ) {
    const communicationUserIdentifier: CommunicationUserIdentifier = {
      communicationUserId: identifierModel.communicationUser.id,
    };
    return communicationUserIdentifier;
  }

  if (
    kind === KnownCommunicationIdentifierModelKind.PhoneNumber &&
    identifierModel.phoneNumber !== undefined
  ) {
    const phoneNumberIdentifier: PhoneNumberIdentifier = {
      phoneNumber: identifierModel.phoneNumber.value,
      rawId: rawId,
    };
    return phoneNumberIdentifier;
  }

  const unknownIdentifier: UnknownIdentifier = {
    id: rawId ? rawId : "",
  };
  return unknownIdentifier;
}

/** Convert CommunicationIdentifier to CommunicationIdentifierModel(Internal usage class) */
export function communicationIdentifierModelConverter(
  identifier: CommunicationIdentifier
): CommunicationIdentifierModel {
  if (isCommunicationUserIdentifier(identifier)) {
    const communicationUserIdentifierModel: CommunicationIdentifierModel = {
      rawId: identifier.communicationUserId,
      kind: KnownCommunicationIdentifierModelKind.CommunicationUser,
      communicationUser: {
        id: identifier.communicationUserId,
      },
    };
    return communicationUserIdentifierModel;
  }

  if (isPhoneNumberIdentifier(identifier)) {
    const phoneNumberIdentifierModel: CommunicationIdentifierModel = {
      rawId: identifier.rawId,
      kind: KnownCommunicationIdentifierModelKind.PhoneNumber,
      phoneNumber: {
        value: identifier.phoneNumber,
      },
    };
    return phoneNumberIdentifierModel;
  }

  if (isUnknownIdentifier(identifier)) {
    const unknownIdentifierModel: CommunicationIdentifierModel = {
      rawId: identifier.id,
      kind: KnownCommunicationIdentifierModelKind.Unknown,
    };
    return unknownIdentifierModel;
  }

  throw new Error();
}

/** Convert CallParticipantInternal to CallParticipant */
export function callParticipantConverter(
  acsCallParticipant: CallParticipantInternal
): CallParticipant {
  const callParticipant: CallParticipant = {
    ...acsCallParticipant,
    identifier: acsCallParticipant.identifier
      ? communicationIdentifierConverter(acsCallParticipant.identifier)
      : undefined,
  };
  return callParticipant;
}

/** Convert CommunicationUserIdentifier to CommunicationUserIdentifierModel (Internal usage class) */
export function communicationUserIdentifierModelConverter(
  identifier: CommunicationUserIdentifier | undefined
): CommunicationUserIdentifierModel | undefined {
  if (!identifier || !identifier.communicationUserId) {
    return undefined;
  }

  return { id: identifier.communicationUserId };
}

/** Convert CommunicationUserIdentifierModel to CommunicationUserIdentifier (Public usage class) */
export function communicationUserIdentifierConverter(
  identifier: CommunicationUserIdentifierModel | undefined
): CommunicationUserIdentifier | undefined {
  if (!identifier || !identifier.id) {
    return undefined;
  }

  return { communicationUserId: identifier.id };
}
