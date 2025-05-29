/**
 * Identifies a communication participant.
 */
export type CommunicationIdentifier = CommunicationUserIdentifier | PhoneNumberIdentifier | MicrosoftTeamsUserIdentifier | MicrosoftTeamsAppIdentifier | TeamsExtensionUserIdentifier | UnknownIdentifier;
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
    /**
     * The asserted Id is set on a phone number that is already in the same call to distinguish from other connections made through the same number.
     */
    assertedId?: string;
    /**
     * True if the phone number is anonymous.
     */
    isAnonymous?: boolean;
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
     * Id of the Microsoft Teams user. If the user isn't anonymous, the id is the Entra ID object id of the user.
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
     * The cloud that the Microsoft Teams App belongs to. If missing, the cloud is "public".
     */
    cloud?: "public" | "dod" | "gcch";
}
/**
 * A Microsoft Teams Phone user who is using the Azure Communication Services resource to extend their Teams Phone set up.
 */
export interface TeamsExtensionUserIdentifier {
    /**
     * Optional raw id of the Microsoft Teams Extension user.
     */
    rawId?: string;
    /**
     * The Id of the Microsoft Teams Extension user, i.e. the Entra ID object Id of the user.
     */
    userId: string;
    /**
     * The tenant Id of the Microsoft Teams Extension user.
     */
    tenantId: string;
    /**
     * The Azure Communication Services resource Id.
     */
    resourceId: string;
    /**
     * The cloud that the Microsoft Teams Extension user belongs to. If missing, the cloud is "public".
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
export declare const isCommunicationUserIdentifier: (identifier: CommunicationIdentifier) => identifier is CommunicationUserIdentifier;
/**
 * Tests an Identifier to determine whether it implements PhoneNumberIdentifier.
 *
 * @param identifier - The assumed PhoneNumberIdentifier to be tested.
 */
export declare const isPhoneNumberIdentifier: (identifier: CommunicationIdentifier) => identifier is PhoneNumberIdentifier;
/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsUserIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export declare const isMicrosoftTeamsUserIdentifier: (identifier: CommunicationIdentifier) => identifier is MicrosoftTeamsUserIdentifier;
/**
 * Tests an Identifier to determine whether it implements MicrosoftTeamsAppIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export declare const isMicrosoftTeamsAppIdentifier: (identifier: CommunicationIdentifier) => identifier is MicrosoftTeamsAppIdentifier;
/**
 * Tests an Identifier to determine whether it implements TeamsExtensionUserIdentifier.
 *
 * @param identifier - The assumed available to be tested.
 */
export declare const isTeamsExtensionUserIdentifier: (identifier: CommunicationIdentifier) => identifier is TeamsExtensionUserIdentifier;
/**
 * Tests an Identifier to determine whether it implements UnknownIdentifier.
 *
 * @param identifier - The assumed UnknownIdentifier to be tested.
 */
export declare const isUnknownIdentifier: (identifier: CommunicationIdentifier) => identifier is UnknownIdentifier;
/**
 * The CommunicationIdentifierKind is a discriminated union that adds a property `kind` to an Identifier.
 */
export type CommunicationIdentifierKind = CommunicationUserKind | PhoneNumberKind | MicrosoftTeamsUserKind | MicrosoftTeamsAppKind | TeamsExtensionUserKind | UnknownIdentifierKind;
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
 * IdentifierKind for a TeamsExtensionUserIdentifier.
 */
export interface TeamsExtensionUserKind extends TeamsExtensionUserIdentifier {
    /**
     * The identifier kind.
     */
    kind: "teamsExtensionUser";
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
export declare const getIdentifierKind: (identifier: CommunicationIdentifier) => CommunicationIdentifierKind;
/**
 * Returns the rawId for a given CommunicationIdentifier. You can use the rawId for encoding the identifier and then use it as a key in a database.
 *
 * @param identifier - The identifier to be translated to its rawId.
 */
export declare const getIdentifierRawId: (identifier: CommunicationIdentifier) => string;
/**
 * Creates a CommunicationIdentifierKind from a given rawId. When storing rawIds use this function to restore the identifier that was encoded in the rawId.
 *
 * @param rawId - The rawId to be translated to its identifier representation.
 */
export declare const createIdentifierFromRawId: (rawId: string) => CommunicationIdentifierKind;
//# sourceMappingURL=identifierModels.d.ts.map