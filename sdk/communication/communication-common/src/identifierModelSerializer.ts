// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  CommunicationIdentifierKind,
  getIdentifierKind,
} from "./identifierModels";

/**
 * @hidden
 * Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set.
 */
export interface SerializedCommunicationIdentifier {
  /**
   * Raw Id of the identifier. Optional in requests, required in responses.
   */
  rawId?: string;
  /**
   * The communication user.
   */
  communicationUser?: SerializedCommunicationUserIdentifier;
  /**
   * The phone number.
   */
  phoneNumber?: SerializedPhoneNumberIdentifier;
  /**
   * The Microsoft Teams user.
   */
  microsoftTeamsUser?: SerializedMicrosoftTeamsUserIdentifier;
}

/**
 * @hidden
 * A user that got created with an Azure Communication Services resource.
 */
export interface SerializedCommunicationUserIdentifier {
  /**
   * The Id of the communication user.
   */
  id: string;
}

/**
 * @hidden
 * A phone number.
 */
export interface SerializedPhoneNumberIdentifier {
  /**
   * The phone number in E.164 format.
   */
  value: string;
}

/**
 * @hidden
 * A Microsoft Teams user.
 */
export interface SerializedMicrosoftTeamsUserIdentifier {
  /**
   * The Id of the Microsoft Teams user. If not anonymous, this is the AAD object Id of the user.
   */
  userId: string;
  /**
   * True if the Microsoft Teams user is anonymous. By default false if missing.
   */
  isAnonymous?: boolean;
  /**
   * The cloud that the Microsoft Teams user belongs to. By default 'public' if missing.
   */
  cloud?: SerializedCommunicationCloudEnvironment;
}

/**
 * @hidden
 * Defines values for CommunicationCloudEnvironmentModel.
 */
export type SerializedCommunicationCloudEnvironment = "public" | "dod" | "gcch";

const addRawIdIfExisting = <T>(
  identifier: T,
  rawId: string | undefined
): T & { rawId?: string } => {
  return rawId === undefined ? identifier : { ...identifier, rawId: rawId };
};

const assertNotNullOrUndefined = <
  T extends Record<string, unknown>,
  P extends keyof T,
  Q extends keyof T[P]
>(
  obj: T,
  prop: Q
): Required<Required<T>[P]>[Q] => {
  const subObjName = Object.keys(obj)[0];
  const subObj = (obj as any)[subObjName];
  if (prop in subObj) {
    return subObj[prop];
  }
  throw new Error(`Property ${prop} is required for identifier of type ${subObjName}.`);
};

const assertMaximumOneNestedModel = (identifier: SerializedCommunicationIdentifier): void => {
  const { rawId: _rawId, ...props } = identifier;
  const keys = Object.keys(props);
  if (keys.length > 1) {
    throw new Error(`Only one of the properties in ${JSON.stringify(keys)} should be present.`);
  }
};

/**
 * @hidden
 * Translates a CommunicationIdentifier to its serialized format for sending a request.
 * @param identifier - The CommunicationIdentifier to be serialized.
 */
export const serializeCommunicationIdentifier = (
  identifier: CommunicationIdentifier
): SerializedCommunicationIdentifier => {
  const identifierKind = getIdentifierKind(identifier);
  switch (identifierKind.kind) {
    case "communicationUser":
      return { communicationUser: { id: identifierKind.communicationUserId } };
    case "phoneNumber":
      return addRawIdIfExisting(
        { phoneNumber: { value: identifierKind.phoneNumber } },
        identifierKind.rawId
      );
    case "microsoftTeamsUser":
      return addRawIdIfExisting(
        {
          microsoftTeamsUser: {
            userId: identifierKind.microsoftTeamsUserId,
            isAnonymous: identifierKind.isAnonymous ?? false,
            cloud: identifierKind.cloud ?? "public",
          },
        },
        identifierKind.rawId
      );
    case "unknown":
      return { rawId: identifierKind.id };
    default:
      throw new Error(`Can't serialize an identifier with kind ${(identifierKind as any).kind}`);
  }
};

/**
 * @hidden
 * Translates the serialized format of a communication identifier to CommunicationIdentifier.
 * @param serializedIdentifier - The SerializedCommunicationIdentifier to be deserialized.
 */
export const deserializeCommunicationIdentifier = (
  serializedIdentifier: SerializedCommunicationIdentifier
): CommunicationIdentifierKind => {
  assertMaximumOneNestedModel(serializedIdentifier);

  const { communicationUser, microsoftTeamsUser, phoneNumber } = serializedIdentifier;
  if (communicationUser) {
    return {
      kind: "communicationUser",
      communicationUserId: assertNotNullOrUndefined({ communicationUser }, "id"),
    };
  }
  if (phoneNumber) {
    return {
      kind: "phoneNumber",
      phoneNumber: assertNotNullOrUndefined({ phoneNumber }, "value"),
      rawId: assertNotNullOrUndefined({ phoneNumber: serializedIdentifier }, "rawId"),
    };
  }
  if (microsoftTeamsUser) {
    return {
      kind: "microsoftTeamsUser",
      microsoftTeamsUserId: assertNotNullOrUndefined({ microsoftTeamsUser }, "userId"),
      isAnonymous: assertNotNullOrUndefined({ microsoftTeamsUser }, "isAnonymous"),
      cloud: assertNotNullOrUndefined({ microsoftTeamsUser }, "cloud"),
      rawId: assertNotNullOrUndefined({ microsoftTeamsUser: serializedIdentifier }, "rawId"),
    };
  }
  return {
    kind: "unknown",
    id: assertNotNullOrUndefined({ unknown: serializedIdentifier }, "rawId"),
  };
};
