import { type CommunicationIdentifier, type CommunicationIdentifierKind } from "./identifierModels.js";
/**
 * @hidden
 * Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set.
 */
export interface SerializedCommunicationIdentifier {
    /**
     * Kind of the identifier, optional.
     */
    kind?: string;
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
    /**
     * The Microsoft Teams App.
     */
    microsoftTeamsApp?: SerializedMicrosoftTeamsAppIdentifier;
    /**
     * The Microsoft Teams Extension user.
     */
    teamsExtensionUser?: SerializedTeamsExtensionUserIdentifier;
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
 * @hidden
 * A Microsoft Teams user.
 */
export interface SerializedMicrosoftTeamsUserIdentifier {
    /**
     * The Id of the Microsoft Teams user. If not anonymous, this is the Entra ID object Id of the user.
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
 * A Microsoft Teams App.
 */
export interface SerializedMicrosoftTeamsAppIdentifier {
    /**
     * Id of the Microsoft Teams App.
     */
    appId: string;
    /**
     * The cloud that the Microsoft Teams App belongs to. By default 'public' if missing.
     */
    cloud?: SerializedCommunicationCloudEnvironment;
}
/**
 * @hidden
 * A Microsoft Teams Phone user who is using the Azure Communication Services resource to extend their Teams Phone set up.
 */
export interface SerializedTeamsExtensionUserIdentifier {
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
    cloud?: SerializedCommunicationCloudEnvironment;
}
/**
 * @hidden
 * Defines values for CommunicationCloudEnvironmentModel.
 */
export type SerializedCommunicationCloudEnvironment = "public" | "dod" | "gcch";
/**
 * @hidden
 * Translates a CommunicationIdentifier to its serialized format for sending a request.
 * @param identifier - The CommunicationIdentifier to be serialized.
 */
export declare const serializeCommunicationIdentifier: (identifier: CommunicationIdentifier) => SerializedCommunicationIdentifier;
/**
 * @hidden
 * Translates the serialized format of a communication identifier to CommunicationIdentifier.
 * @param serializedIdentifier - The SerializedCommunicationIdentifier to be deserialized.
 */
export declare const deserializeCommunicationIdentifier: (serializedIdentifier: SerializedCommunicationIdentifier) => CommunicationIdentifierKind;
//# sourceMappingURL=identifierModelSerializer.d.ts.map