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
  /**
   * The cloud that the identifier belongs to.
   */
  cloud?: _SerializedCommunicationCloud;
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
 * Defines values for CommunicationCloud.
 * This type is the serialized format of the CommunicationCloud used in web requests and responses.
 */
export type _SerializedCommunicationCloud = "public" | "dod" | "gcch";

const addIdIfExisting = <T>(identifier: T, id: string | undefined): T & { id?: string } => {
  return id === undefined ? identifier : { ...identifier, id };
};

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
    case "communicationUser":
      return { kind: "communicationUser", id: identifierKind.communicationUserId };
    case "callingApplication":
      return { kind: "callingApplication", id: identifierKind.callingApplicationId };
    case "phoneNumber":
      return addIdIfExisting(
        { kind: "phoneNumber", phoneNumber: identifierKind.phoneNumber },
        identifierKind.id
      );
    case "microsoftTeamsUser":
      return addIdIfExisting(
        {
          kind: "microsoftTeamsUser",
          microsoftTeamsUserId: identifierKind.microsoftTeamsUserId,
          isAnonymous: identifierKind.isAnonymous,
          cloud: identifierKind.cloud ?? "public"
        },
        identifierKind.id
      );
    case "unknown":
      return { kind: "unknown", id: identifierKind.id };
    default:
      throw new Error(`Can't serialize an identifier with kind ${(identifierKind as any).kind}`);
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
        kind: "communicationUser",
        communicationUserId: assertNotNullOrUndefined(serializedIdentifier, "id"),
        id: assertNotNullOrUndefined(serializedIdentifier, "id")
      };
    case "callingApplication":
      return {
        kind: "callingApplication",
        callingApplicationId: assertNotNullOrUndefined(serializedIdentifier, "id"),
        id: assertNotNullOrUndefined(serializedIdentifier, "id")
      };
    case "phoneNumber":
      return {
        kind: "phoneNumber",
        phoneNumber: assertNotNullOrUndefined(serializedIdentifier, "phoneNumber"),
        id: assertNotNullOrUndefined(serializedIdentifier, "id")
      };
    case "microsoftTeamsUser":
      return {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: assertNotNullOrUndefined(
          serializedIdentifier,
          "microsoftTeamsUserId"
        ),
        isAnonymous: assertNotNullOrUndefined(serializedIdentifier, "isAnonymous"),
        cloud: assertNotNullOrUndefined(serializedIdentifier, "cloud"),
        id: assertNotNullOrUndefined(serializedIdentifier, "id")
      };
    case "unknown":
      return { kind: "unknown", id: assertNotNullOrUndefined(serializedIdentifier, "id") };
    default:
      return { kind: "unknown", id: assertNotNullOrUndefined(serializedIdentifier, "id") };
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
