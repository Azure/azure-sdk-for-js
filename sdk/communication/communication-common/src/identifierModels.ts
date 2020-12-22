// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Identifies a communication user.
 */
export type CommunicationIdentifier =
  | CommunicationUserIdentifier
  | PhoneNumberIdentifier
  | CallingApplicationIdentifier
  | UnknownIdentifier;

/**
 * An Azure Communication user.
 */
export interface CommunicationUserIdentifier {
  /**
   * Id of the CommunicationUserIdentifier as returned from the Communication Service.
   */
  communicationUserId: string;
}

/**
 * A phone number.
 */
export interface PhoneNumberIdentifier {
  /**
   * The phone number in E.164 format.
   */
  phoneNumber: string;
}

/**
 * A calling application, i.e. a non-human participant in communication.
 */
export interface CallingApplicationIdentifier {
  /**
   * Id of the CallingApplicationIdentifier.
   */
  callingApplicationId: string;
}

/**
 * An unknown identifier that doesn't fit any of the other identifier types.
 */
export interface UnknownIdentifier {
  /**
   * Id of the UnknownIdentifier.
   */
  id: string;
}

/**
 * Tests an Identifier to determine whether it implements CommunicationUser.
 *
 * @param identifier The assumed CommunicationUser to be tested.
 */
export const isCommunicationUserIdentifier = (
  identifier: CommunicationIdentifier
): identifier is CommunicationUserIdentifier => {
  return typeof (identifier as any).communicationUserId === "string";
};

/**
 * Tests an Identifier to determine whether it implements PhoneNumber.
 *
 * @param identifier The assumed PhoneNumber to be tested.
 */
export const isPhoneNumberIdentifier = (
  identifier: CommunicationIdentifier
): identifier is PhoneNumberIdentifier => {
  return typeof (identifier as any).phoneNumber === "string";
};

/**
 * Tests an Identifier to determine whether it implements CallingApplication.
 *
 * @param identifier The assumed CallingApplication to be tested.
 */
export const isCallingApplicationIdentifier = (
  identifier: CommunicationIdentifier
): identifier is CallingApplicationIdentifier => {
  return typeof (identifier as any).callingApplicationId === "string";
};

/**
 * Tests an Identifier to determine whether it implements UnknownIdentifier.
 *
 * @param identifier The assumed UnknownIdentifier to be tested.
 */
export const isUnknownIdentifier = (
  identifier: CommunicationIdentifier
): identifier is UnknownIdentifier => {
  return typeof (identifier as any).id === "string";
};

/**
 * The IdentifierKind is a discriminated union that adds a property `kind` to an Identifier.
 */
export type CommunicationIdentifierKind =
  | CommunicationUserIdentifierKind
  | PhoneNumberIdentifierKind
  | CallingApplicationIdentifierKind
  | UnknownIdentifierKind;

/**
 * IdentifierKind for a CommunicationUser identifier.
 */
export interface CommunicationUserIdentifierKind extends CommunicationUserIdentifier {
  /**
   * The identifier kind.
   */
  kind: "CommunicationUser";
}

/**
 * IdentifierKind for a PhoneNumber identifier.
 */
export interface PhoneNumberIdentifierKind extends PhoneNumberIdentifier {
  /**
   * The identifier kind.
   */
  kind: "PhoneNumber";
}

/**
 * IdentifierKind for a CallingApplication identifier.
 */
export interface CallingApplicationIdentifierKind extends CallingApplicationIdentifier {
  /**
   * The identifier kind.
   */
  kind: "CallingApplication";
}

/**
 * IdentifierKind for UnkownIdentifer.
 */
export interface UnknownIdentifierKind extends UnknownIdentifier {
  /**
   * The identifier kind.
   */
  kind: "Unknown";
}

/**
 * Returns the IdentifierKind for a given Identifier. Returns undefined if the kind couldn't be inferred.
 *
 * @param identifier The identifier whose kind is to be inferred.
 */
export const getIdentifierKind = (
  identifier: CommunicationIdentifier
): CommunicationIdentifierKind => {
  if (isCommunicationUserIdentifier(identifier)) {
    return { ...identifier, kind: "CommunicationUser" };
  }
  if (isPhoneNumberIdentifier(identifier)) {
    return { ...identifier, kind: "PhoneNumber" };
  }
  if (isCallingApplicationIdentifier(identifier)) {
    return { ...identifier, kind: "CallingApplication" };
  }
  return { ...identifier, kind: "Unknown" };
};
