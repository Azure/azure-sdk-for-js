import type { CommunicationIdentifier } from "@azure/communication-common";
import { CallMedia } from "./callMedia.js";
import type { CallAutomationApiClientOptionalParams } from "./generated/src/index.js";
import { type CallConnectionProperties, type CallInvite, type CallParticipant } from "./models/models.js";
import type { AddParticipantOptions, CancelAddParticipantOperationOptions, GetCallConnectionPropertiesOptions, GetParticipantOptions, HangUpOptions, MuteParticipantOption, RemoveParticipantsOption, TransferCallToParticipantOptions } from "./models/options.js";
import type { ListParticipantsResult, TransferCallResult, AddParticipantResult, RemoveParticipantResult, MuteParticipantResult, CancelAddParticipantOperationResult } from "./models/responses.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { CallAutomationEventProcessor } from "./eventprocessor/callAutomationEventProcessor.js";
/**
 * CallConnection class represents call connection based APIs.
 */
export declare class CallConnection {
    private readonly callConnectionId;
    private readonly callConnection;
    private readonly callAutomationApiClient;
    private readonly endpoint;
    private readonly credential;
    private readonly callAutomationApiClientOptions?;
    private readonly callAutomationEventProcessor;
    constructor(callConnectionId: string, endpoint: string, credential: KeyCredential | TokenCredential, eventProcessor: CallAutomationEventProcessor, options?: CallAutomationApiClientOptionalParams);
    /**
     * Initializes a new instance of CallMedia.
     */
    getCallMedia(): CallMedia;
    /**
     * Get call connection properties of the call
     */
    getCallConnectionProperties(options?: GetCallConnectionPropertiesOptions): Promise<CallConnectionProperties>;
    /**
     * Hang up the call for itself or terminate the whole call.
     *
     * @param isForEveryOne - Determine if every one in the call would be hung up or not.
     */
    hangUp(isForEveryone: boolean, options?: HangUpOptions): Promise<void>;
    /**
     * Get a participant from the call
     *
     * @param targetParticipant - The communication identifier of requested participant.
     */
    getParticipant(targetParticipant: CommunicationIdentifier, options?: GetParticipantOptions): Promise<CallParticipant>;
    /**
     * Get all participants from the call
     */
    listParticipants(options?: GetParticipantOptions): Promise<ListParticipantsResult>;
    private createCustomCallingContextInternal;
    /**
     * Add a participant to the call
     *
     * @param participant - The participant is going to be added.
     */
    addParticipant(targetParticipant: CallInvite, options?: AddParticipantOptions): Promise<AddParticipantResult>;
    /**
     * Transfer the call to a target participant
     *
     * @param targetParticipant - The target to be transferred to.
     */
    transferCallToParticipant(targetParticipant: CommunicationIdentifier, options?: TransferCallToParticipantOptions): Promise<TransferCallResult>;
    /**
     * Remove a participant from the call
     *
     * @param participant - The participant is going to be removed from the call.
     */
    removeParticipant(participant: CommunicationIdentifier, options?: RemoveParticipantsOption): Promise<RemoveParticipantResult>;
    /**
     * Mute participant from the call.
     *
     * @param participant - Participant to be muted from the call.
     * @param options - Additional attributes for mute participant.
     */
    muteParticipant(participant: CommunicationIdentifier, options?: MuteParticipantOption): Promise<MuteParticipantResult>;
    /** Cancel add participant request.
     *
     * @param invitationId - Invitation ID used to cancel the add participant request.
     */
    cancelAddParticipantOperation(invitationId: string, options?: CancelAddParticipantOperationOptions): Promise<CancelAddParticipantOperationResult>;
}
//# sourceMappingURL=callConnection.d.ts.map