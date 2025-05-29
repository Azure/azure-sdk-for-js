import type { PhoneNumberIdentifier, CommunicationUserIdentifier, SerializedPhoneNumberIdentifier, CommunicationIdentifier, MicrosoftTeamsAppIdentifier } from "@azure/communication-common";
import type { CallParticipantInternal, CommunicationIdentifierModel, PhoneNumberIdentifierModel, CommunicationUserIdentifierModel, MicrosoftTeamsAppIdentifierModel } from "../generated/src/index.js";
import type { CallParticipant } from "../models/models.js";
/** Convert PhoneNumberIdentifier to PhoneNumberIdentifierModel(Internal usage class) */
export declare function PhoneNumberIdentifierModelConverter(phoneNumberIdentifier: PhoneNumberIdentifier | undefined): PhoneNumberIdentifierModel | undefined;
/** Convert SerializedPhoneNumberIdentifier to PhoneNumberIdentifier(Public usage class) */
export declare function phoneNumberIdentifierConverter(serializedPhoneNumberIdentifier: SerializedPhoneNumberIdentifier | undefined): PhoneNumberIdentifier | undefined;
/** Convert CommunicationIdentifierModel to CommunicationIdentifier(Public usage class) */
export declare function communicationIdentifierConverter(identifierModel: CommunicationIdentifierModel): CommunicationIdentifier;
/** Convert CommunicationIdentifier to CommunicationIdentifierModel(Internal usage class) */
export declare function communicationIdentifierModelConverter(identifier: CommunicationIdentifier): CommunicationIdentifierModel;
/** Convert CallParticipantInternal to CallParticipant */
export declare function callParticipantConverter(acsCallParticipant: CallParticipantInternal): CallParticipant;
/** Convert CommunicationUserIdentifier to CommunicationUserIdentifierModel (Internal usage class) */
export declare function communicationUserIdentifierModelConverter(identifier: CommunicationUserIdentifier | undefined): CommunicationUserIdentifierModel | undefined;
/** Convert CommunicationUserIdentifierModel to CommunicationUserIdentifier (Public usage class) */
export declare function communicationUserIdentifierConverter(identifier: CommunicationUserIdentifierModel | undefined): CommunicationUserIdentifier | undefined;
/** Convert MicrosoftTeamsAppIdentifier to MicrosoftTeamsAppIdentifierModel (Internal usage class) */
export declare function microsoftTeamsAppIdentifierModelConverter(identifier: MicrosoftTeamsAppIdentifier | undefined): MicrosoftTeamsAppIdentifierModel | undefined;
/** Convert MicrosoftTeamsAppIdentifierModel to MicrosoftTeamsAppIdentifier (Public usage class) */
export declare function microsoftTeamsAppIdentifierConverter(identifier: MicrosoftTeamsAppIdentifierModel | undefined): MicrosoftTeamsAppIdentifier | undefined;
//# sourceMappingURL=converters.d.ts.map