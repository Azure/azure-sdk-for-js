// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  CommunicationIdentifierKind,
  getIdentifierKind
} from "./identifierModels";

/**
 * @internal
 * Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user.
 * This interface is the serialized format of a CommunicationIdentifier used in web requests and responses.
 */
export interface _SerializedCommunicationIdentifier {
  /**
   * Kind of the communication identifier.
   */
  kind: _SerializedCommunicationIdentifierKind;
  /**
   * Full Id of the identifier.
   */
  id?: string;
  /**
   * The phone number in E.164 format.
   */
  phoneNumber?: string;
  /**
   * The AAD object Id of the Microsoft Teams user.
   */
  microsoftTeamsUserId?: string;
  /**
   * True if the identifier is anonymous.
   */
  isAnonymous?: boolean;
}

/**
 * @internal
 * Defines values for CommunicationIdentifierKind.
 * This type is the serialized format of a CommunicationIdentifier kind used in web requests and responses.
 */
export type _SerializedCommunicationIdentifierKind =
  | "unknown"
  | "communicationUser"
  | "phoneNumber"
  | "callingApplication"
  | "microsoftTeamsUser";

/**
 * @internal
 * Translates a CommunicationIdentifier to its serialized format for sending a request.
 * @param identifier The CommunicationIdentifier to be serialized.
 */
export const _serializeCommunicationIdentifier = (
  identifier: CommunicationIdentifier
): _SerializedCommunicationIdentifier => {
  const identifierKind = getIdentifierKind(identifier);
  switch (identifierKind.kind) {
    case "CommunicationUser":
      return { kind: "communicationUser", id: identifierKind.communicationUserId };
    case "CallingApplication":
      return { kind: "callingApplication", id: identifierKind.callingApplicationId };
    case "PhoneNumber":
      return { kind: "phoneNumber", phoneNumber: identifierKind.phoneNumber };
    case "MicrosoftTeamsUser":
      return {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: identifierKind.microsoftTeamsUserId,
        isAnonymous: identifierKind.isAnonymous
      };
    case "Unknown":
      return { kind: "unknown", id: identifierKind.id };
  }
};

/**
 * @internal
 * Translates the serialized format of a communication identifier to CommunicationIdentifier.
 * @param serializedIdentifier The SerializedCommunicationIdentifier to be deserialized.
 */
export const _deserializeCommunicationIdentifier = (
  serializedIdentifier: _SerializedCommunicationIdentifier
): CommunicationIdentifierKind => {
  switch (serializedIdentifier.kind) {
    case "communicationUser":
      return {
        kind: "CommunicationUser",
        communicationUserId: assertNotNullOrUndefined(serializedIdentifier, "id")
      };
    case "callingApplication":
      return {
        kind: "CallingApplication",
        callingApplicationId: assertNotNullOrUndefined(serializedIdentifier, "id")
      };
    case "phoneNumber":
      return {
        kind: "PhoneNumber",
        phoneNumber: assertNotNullOrUndefined(serializedIdentifier, "phoneNumber")
      };
    case "microsoftTeamsUser":
      return {
        kind: "MicrosoftTeamsUser",
        microsoftTeamsUserId: assertNotNullOrUndefined(
          serializedIdentifier,
          "microsoftTeamsUserId"
        ),
        isAnonymous: assertNotNullOrUndefined(serializedIdentifier, "isAnonymous")
      };
    case "unknown":
      return { kind: "Unknown", id: assertNotNullOrUndefined(serializedIdentifier, "id") };
    default:
      throw new Error(`Unsupported identifier kind ${serializedIdentifier.kind}.`);
  }
};

const assertNotNullOrUndefined = <T extends _SerializedCommunicationIdentifier, P extends keyof T>(
  obj: T,
  prop: P
): Required<T>[P] => {
  if (prop in obj) {
    return obj[prop];
  }
  throw new Error(`Property ${prop} is required for identifier of kind ${obj.kind}.`);
};
