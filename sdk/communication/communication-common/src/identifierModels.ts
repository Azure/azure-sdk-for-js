// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Identifies a communication participant.
 */
export type CommunicationIdentifier =
  | CommunicationUserIdentifier
  | PhoneNumberIdentifier
  | MicrosoftTeamsUserIdentifier
  | MicrosoftTeamsAppIdentifier
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
   * Optional raw id of the phone number.
   */
  rawId?: string;
  /**
   * The phone number in E.164 format.
   */
  phoneNumber: string;
}

/**
 * A Microsoft Teams user.
 */
export interface MicrosoftTeamsUserIdentifier {
  /**
   * Optional raw id of the Microsoft Teams user.
   */
  rawId?: string;

  /**
   * Id of the Microsoft Teams user. If the user isn't anonymous, the id is the AAD object id of the user.
   */
  microsoftTeamsUserId: string;

  /**
   * True if the user is anonymous, for example when joining a meeting with a share link. If missing, the user is not anonymous.
   */
  isAnonymous?: boolean;

  /**
   * The cloud that the Microsoft Teams user belongs to. If missing, the cloud is "public".
   */
  cloud?: "public" | "dod" | "gcch";
}

/**
 * A Microsoft Teams App.
 */
export interface MicrosoftTeamsAppIdentifier {
  /**
   * Optional raw id of the Microsoft Teams App.
   */
  rawId?: string;

  /**
   * The unique Microsoft Teams app ID.
   */
  teamsAppId: string;

  /**
   * The cloud that the Microsoft Temas App belongs to. If missing, the cloud is "public".
   */
  cloud?: "public" | "dod" | "gcch";
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
 * @param identifier - The assumed CommunicationUserIdentifier to be tested.
 */
export const isCommunicationUserIdentifier = (
  identifier: CommunicationIdentifier,
): identifier is CommunicationUserIdentifier => {
  return typeof (identifier as any).communicationUserId === "string";
};

/**
 * Tests an Identifier to determine whether it implements PhoneNumberIdentifier.
 *
 * @param identifier - The assumed PhoneNumberIdentifier to be tested.
 */
export const isPhoneNumberIdentifier = (
  identifier: CommunicationIdentifier,
): identifier is PhoneNumberIdentifier => {
  return typeof (identifier as any).phoneNumber === "string";
};

/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsUserIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export const isMicrosoftTeamsUserIdentifier = (
  identifier: CommunicationIdentifier,
): identifier is MicrosoftTeamsUserIdentifier => {
  return typeof (identifier as any).microsoftTeamsUserId === "string";
};

/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsAppIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export const isMicrosoftTeamsAppIdentifier = (
  identifier: CommunicationIdentifier,
): identifier is MicrosoftTeamsAppIdentifier => {
  return typeof (identifier as any).teamsAppId === "string";
};

/**
 * Tests an Identifier to determine whether it implements UnknownIdentifier.
 *
 * @param identifier - The assumed UnknownIdentifier to be tested.
 */
export const isUnknownIdentifier = (
  identifier: CommunicationIdentifier,
): identifier is UnknownIdentifier => {
  return typeof (identifier as any).id === "string";
};

/**
 * The CommunicationIdentifierKind is a discriminated union that adds a property `kind` to an Identifier.
 */
export type CommunicationIdentifierKind =
  | CommunicationUserKind
  | PhoneNumberKind
  | MicrosoftTeamsUserKind
  | MicrosoftTeamsAppKind
  | UnknownIdentifierKind;

/**
 * IdentifierKind for a CommunicationUserIdentifier.
 */
export interface CommunicationUserKind extends CommunicationUserIdentifier {
  /**
   * The identifier kind.
   */
  kind: "communicationUser";
}

/**
 * IdentifierKind for a PhoneNumberIdentifier.
 */
export interface PhoneNumberKind extends PhoneNumberIdentifier {
  /**
   * The identifier kind.
   */
  kind: "phoneNumber";
}

/**
 * IdentifierKind for a MicrosoftTeamsUserIdentifier.
 */
export interface MicrosoftTeamsUserKind extends MicrosoftTeamsUserIdentifier {
  /**
   * The identifier kind.
   */
  kind: "microsoftTeamsUser";
}

/**
 * IdentifierKind for a MicrosoftTeamsAppIdentifier.
 */
export interface MicrosoftTeamsAppKind extends MicrosoftTeamsAppIdentifier {
  /**
   * The identifier kind.
   */
  kind: "microsoftTeamsApp";
}

/**
 * IdentifierKind for UnknownIdentifier.
 */
export interface UnknownIdentifierKind extends UnknownIdentifier {
  /**
   * The identifier kind.
   */
  kind: "unknown";
}

/**
 * Returns the CommunicationIdentifierKind for a given CommunicationIdentifier. Returns undefined if the kind couldn't be inferred.
 *
 * @param identifier - The identifier whose kind is to be inferred.
 */
export const getIdentifierKind = (
  identifier: CommunicationIdentifier,
): CommunicationIdentifierKind => {
  if (isCommunicationUserIdentifier(identifier)) {
    return { ...identifier, kind: "communicationUser" };
  }
  if (isPhoneNumberIdentifier(identifier)) {
    return { ...identifier, kind: "phoneNumber" };
  }
  if (isMicrosoftTeamsUserIdentifier(identifier)) {
    return { ...identifier, kind: "microsoftTeamsUser" };
  }
  if (isMicrosoftTeamsAppIdentifier(identifier)) {
    return { ...identifier, kind: "microsoftTeamsApp" };
  }
  return { ...identifier, kind: "unknown" };
};

/**
 * Returns the rawId for a given CommunicationIdentifier. You can use the rawId for encoding the identifier and then use it as a key in a database.
 *
 * @param identifier - The identifier to be translated to its rawId.
 */
export const getIdentifierRawId = (identifier: CommunicationIdentifier): string => {
  const identifierKind = getIdentifierKind(identifier);
  switch (identifierKind.kind) {
    case "communicationUser":
      return identifierKind.communicationUserId;
    case "microsoftTeamsUser": {
      const { microsoftTeamsUserId, rawId, cloud, isAnonymous } = identifierKind;
      if (rawId) return rawId;
      if (isAnonymous) return `8:teamsvisitor:${microsoftTeamsUserId}`;
      switch (cloud) {
        case "dod":
          return `8:dod:${microsoftTeamsUserId}`;
        case "gcch":
          return `8:gcch:${microsoftTeamsUserId}`;
        case "public":
          return `8:orgid:${microsoftTeamsUserId}`;
      }
      return `8:orgid:${microsoftTeamsUserId}`;
    }
    case "microsoftTeamsApp": {
      const { teamsAppId, rawId, cloud } = identifierKind;
      if (rawId) return rawId;
      switch (cloud) {
        case "dod":
          return `28:dod:${teamsAppId}`;
        case "gcch":
          return `28:gcch:${teamsAppId}`;
      }
      return `28:orgid:${teamsAppId}`;
    }
    case "phoneNumber": {
      const { phoneNumber, rawId } = identifierKind;
      if (rawId) return rawId;
      return `4:${phoneNumber}`;
    }
    case "unknown": {
      return identifierKind.id;
    }
  }
};

const buildMicrosoftTeamsAppIdentifier = (
  teamsAppId: string,
  cloud: "public" | "dod" | "gcch",
): CommunicationIdentifierKind => {
  return {
    kind: "microsoftTeamsApp",
    teamsAppId: teamsAppId,
    cloud: cloud,
  };
};

const buildMicrosoftTeamsUserIdentifier = (
  id: string,
  cloud: "public" | "dod" | "gcch",
  isAnonymous: boolean,
): CommunicationIdentifierKind => {
  return {
    kind: "microsoftTeamsUser",
    microsoftTeamsUserId: id,
    isAnonymous: isAnonymous,
    cloud: cloud,
  };
};

/**
 * Creates a CommunicationIdentifierKind from a given rawId. When storing rawIds use this function to restore the identifier that was encoded in the rawId.
 *
 * @param rawId - The rawId to be translated to its identifier representation.
 */
export const createIdentifierFromRawId = (rawId: string): CommunicationIdentifierKind => {
  if (rawId.startsWith("4:")) {
    return { kind: "phoneNumber", phoneNumber: `${rawId.substring("4:".length)}` };
  }

  const segments = rawId.split(":");
  if (segments.length !== 3) {
    return { kind: "unknown", id: rawId };
  }

  const prefix = `${segments[0]}:${segments[1]}:`;
  const suffix = segments[2];

  switch (prefix) {
    case "8:teamsvisitor:":
      return { kind: "microsoftTeamsUser", microsoftTeamsUserId: suffix, isAnonymous: true };
    case "8:orgid:":
      return buildMicrosoftTeamsUserIdentifier(suffix, "public", false);
    case "8:dod:":
      return buildMicrosoftTeamsUserIdentifier(suffix, "dod", false);
    case "8:gcch:":
      return buildMicrosoftTeamsUserIdentifier(suffix, "gcch", false);
    case "8:acs:":
    case "8:spool:":
    case "8:dod-acs:":
    case "8:gcch-acs:":
      return { kind: "communicationUser", communicationUserId: rawId };
    case "28:orgid:":
      return buildMicrosoftTeamsAppIdentifier(suffix, "public");
    case "28:gcch:":
      return buildMicrosoftTeamsAppIdentifier(suffix, "gcch");
    case "28:dod:":
      return buildMicrosoftTeamsAppIdentifier(suffix, "dod");
  }
  return { kind: "unknown", id: rawId };
};
