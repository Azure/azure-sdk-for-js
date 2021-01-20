// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Identifies a communication participant.
 */
export type CommunicationIdentifier =
  | CommunicationUserIdentifier
  | PhoneNumberIdentifier
  | CallingApplicationIdentifier
  | MicrosoftTeamsUserIdentifier
  | UnknownIdentifier;

/**
 * An Azure Communication user.
 */
export interface CommunicationUserIdentifier {
  /**
   * Id of the CommunicationUser as returned from the Communication Service.
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
   * Id of the CallingApplication.
   */
  callingApplicationId: string;
}

/**
 * A Microsoft Teams user.
 */
export interface MicrosoftTeamsUserIdentifier {
  /**
   * Id of the Microsoft Teams user. If the user isn't anonymous, the id is the AAD object id of the user.
   */
  microsoftTeamsUserId: string;

  /**
   * True if the user is anonymous, for example when joining a meeting with a share link.
   */
  isAnonymous: boolean | undefined;
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
 * Tests an Identifier to determine whether it implements CommunicationUserIdentifier.
 *
 * @param identifier The assumed CommunicationUserIdentifier to be tested.
 */
export const isCommunicationUserIdentifier = (
  identifier: CommunicationIdentifier
): identifier is CommunicationUserIdentifier => {
  return typeof (identifier as any).communicationUserId === "string";
};

/**
 * Tests an Identifier to determine whether it implements PhoneNumberIdentifier.
 *
 * @param identifier The assumed PhoneNumberIdentifier to be tested.
 */
export const isPhoneNumberIdentifier = (
  identifier: CommunicationIdentifier
): identifier is PhoneNumberIdentifier => {
  return typeof (identifier as any).phoneNumber === "string";
};

/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsUserIdentifier.
 *
 * @param identifier The assumed available to be tested.
 */
export const isMicrosoftTeamsUserIdentifier = (
  identifier: CommunicationIdentifier
): identifier is MicrosoftTeamsUserIdentifier => {
  return typeof (identifier as any).microsoftTeamsUserId === "string";
};

/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsUserIdentifier.
 *
 * @param identifier The assumed CallingApplicationIdentifier to be tested.
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
 * The CommunicationIdentifierKind is a discriminated union that adds a property `kind` to an Identifier.
 */
export type CommunicationIdentifierKind =
  | CommunicationUserKind
  | PhoneNumberKind
  | CallingApplicationKind
  | MicrosoftTeamsUserKind
  | UnknownIdentifierKind;

/**
 * IdentifierKind for a CommunicationUserIdentifier.
 */
export interface CommunicationUserKind extends CommunicationUserIdentifier {
  /**
   * The identifier kind.
   */
  kind: "CommunicationUser";
}

/**
 * IdentifierKind for a PhoneNumberIdentifier.
 */
export interface PhoneNumberKind extends PhoneNumberIdentifier {
  /**
   * The identifier kind.
   */
  kind: "PhoneNumber";
}

/**
 * IdentifierKind for a CallingApplicationIdentifier.
 */
export interface CallingApplicationKind extends CallingApplicationIdentifier {
  /**
   * The identifier kind.
   */
  kind: "CallingApplication";
}

/**
 * IdentifierKind for a MicrosoftTeamsUserIdentifier.
 */
export interface MicrosoftTeamsUserKind extends MicrosoftTeamsUserIdentifier {
  /**
   * The identifier kind.
   */
  kind: "MicrosoftTeamsUser";
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
 * Returns the CommunicationIdentifierKind for a given CommunicationIdentifier. Returns undefined if the kind couldn't be inferred.
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
  if (isMicrosoftTeamsUserIdentifier(identifier)) {
    return { ...identifier, kind: "MicrosoftTeamsUser" };
  }
  return { ...identifier, kind: "Unknown" };
};
