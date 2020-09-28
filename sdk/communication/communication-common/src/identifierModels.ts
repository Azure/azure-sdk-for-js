// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Identifies a communication user.
 */
export type Identifier = CommunicationUser | PhoneNumber | CallingApplication | UnknownIdentifier;

/**
 * An Azure Communication user.
 */
export interface CommunicationUser {
  /**
   * Id of the CommunicationUser as returned from the Communication Service.
   */
  communicationUserId: string;
}

/**
 * A phone number.
 */
export interface PhoneNumber {
  /**
   * The phone number in E.164 format.
   */
  phoneNumber: string;
}

/**
 * A calling application, i.e. a non-human participant in communication.
 */
export interface CallingApplication {
  /**
   * Id of the CallingApplication.
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
export const isCommunicationUser = (identifier: Identifier): identifier is CommunicationUser => {
  return typeof (identifier as any).communicationUserId === "string";
};

/**
 * Tests an Identifier to determine whether it implements PhoneNumber.
 *
 * @param identifier The assumed PhoneNumber to be tested.
 */
export const isPhoneNumber = (identifier: Identifier): identifier is PhoneNumber => {
  return typeof (identifier as any).phoneNumber === "string";
};

/**
 * Tests an Identifier to determine whether it implements CallingApplication.
 *
 * @param identifier The assumed CallingApplication to be tested.
 */
export const isCallingApplication = (identifier: Identifier): identifier is CallingApplication => {
  return typeof (identifier as any).callingApplicationId === "string";
};

/**
 * Tests an Identifier to determine whether it implements UnknownIdentifier.
 *
 * @param identifier The assumed UnknownIdentifier to be tested.
 */
export const isUnknownIdentifier = (identifier: Identifier): identifier is UnknownIdentifier => {
  return typeof (identifier as any).id === "string";
};

/**
 * The IdentifierKind is a discriminated union that adds a property `kind` to an Identifier.
 */
export type IdentifierKind =
  | CommunicationUserKind
  | PhoneNumberKind
  | CallingApplicationKind
  | UnknownIdentifierKind;

/**
 * IdentifierKind for a CommunicationUser identifier.
 */
export interface CommunicationUserKind extends CommunicationUser {
  /**
   * The identifier kind.
   */
  kind: "CommunicationUser";
}

/**
 * IdentifierKind for a PhoneNumber identifier.
 */
export interface PhoneNumberKind extends PhoneNumber {
  /**
   * The identifier kind.
   */
  kind: "PhoneNumber";
}

/**
 * IdentifierKind for a CallingApplication identifier.
 */
export interface CallingApplicationKind extends CallingApplication {
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
export const getIdentifierKind = (identifier: Identifier): IdentifierKind => {
  if (isCommunicationUser(identifier)) {
    return { ...identifier, kind: "CommunicationUser" };
  }
  if (isPhoneNumber(identifier)) {
    return { ...identifier, kind: "PhoneNumber" };
  }
  if (isCallingApplication(identifier)) {
    return { ...identifier, kind: "CallingApplication" };
  }
  return { ...identifier, kind: "Unknown" };
};
