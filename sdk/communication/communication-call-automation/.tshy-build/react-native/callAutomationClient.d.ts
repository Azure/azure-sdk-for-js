import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { CommonClientOptions } from "@azure/core-client";
import type { CommunicationIdentifier, CommunicationUserIdentifier } from "@azure/communication-common";
import { CallConnection } from "./callConnection.js";
import { CallRecording } from "./callRecording.js";
import type { AnswerCallOptions, ConnectCallOptions, CreateCallOptions, RedirectCallOptions, RejectCallOptions } from "./models/options.js";
import type { AnswerCallResult, ConnectCallResult, CreateCallResult } from "./models/responses.js";
import { type CallInvite, type CallLocator } from "./models/models.js";
import { CallAutomationEventProcessor } from "./eventprocessor/callAutomationEventProcessor.js";
/**
 * Client options used to configure CallAutomation Client API requests.
 */
export interface CallAutomationClientOptions extends CommonClientOptions {
    /**
     * The identifier of the source of the call for call creating/answering/inviting operation.
     */
    sourceIdentity?: CommunicationUserIdentifier;
}
/**
 * A CallAutomationClient represents a Client to the Azure Communication CallAutomation service.
 */
export declare class CallAutomationClient {
    private readonly callAutomationApiClient;
    private readonly sourceIdentity?;
    private readonly credential;
    private readonly internalPipelineOptions;
    private readonly callAutomationEventProcessor;
    private readonly endpoint;
    /**
     * Initializes a new instance of the CallAutomationClient class.
     * @param connectionString - Connection string to connect to an Azure Communication Service resource.
     *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, options?: CallAutomationClientOptions);
    /**
     * Initializes a new instance of the CallAutomationClient class using a TokenCredential or KeyCredential.
     * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
     * @param credential - TokenCredential or KeyCredential that is used to authenticate requests to the service.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(endpoint: string, credential: TokenCredential | KeyCredential, options?: CallAutomationClientOptions);
    /**
     * Initializes a new instance of CallConnection.
     * @param callConnectionId - The CallConnection id for the CallConnection instance. (ex: 421CONTOSO-cRD6-4RDc-a078-99dRANDOMf).
     */
    getCallConnection(callConnectionId: string): CallConnection;
    /**
     * Initializes a new instance of CallRecording.
     */
    getCallRecording(): CallRecording;
    /**
     * Get Source Identity that is used for create and answer call
     */
    getSourceIdentity(): CommunicationUserIdentifier | undefined;
    /**
     * Get event processor to work with call automation events
     */
    getEventProcessor(): CallAutomationEventProcessor;
    private createCallInternal;
    /**
     * Create an outgoing call from source to a target identity.
     * @param targetParticipant - A single target.
     * @param callbackUrl - The callback url.
     * @param options - Additional request options contains createCallConnection api options.
     */
    createCall(targetParticipant: CallInvite, callbackUrl: string, options?: CreateCallOptions): Promise<CreateCallResult>;
    /**
     * Create an outgoing call from source to a group of targets identities.
     * @param targetParticipants - A group of targets identities.
     * @param callbackUrl - The callback url.
     * @param options - Additional request options contains createCallConnection api options.
     */
    createGroupCall(targetParticipants: CommunicationIdentifier[], callbackUrl: string, options?: CreateCallOptions): Promise<CreateCallResult>;
    /**
     * Answer the call.
     * @param incomingCallContext - The context associated with the call.
     * @param callbackUrl - The callback url.
     * @param options - Additional request options contains answerCall api options.
     */
    answerCall(incomingCallContext: string, callbackUrl: string, options?: AnswerCallOptions): Promise<AnswerCallResult>;
    /**
     * Redirect the call.
     *
     * @param incomingCallContext - The context associated with the call.
     * @param targetParticipant - The target identity to redirect the call to.
     * @param options - Additional request options contains redirectCall api options.
     */
    redirectCall(incomingCallContext: string, targetParticipant: CallInvite, options?: RedirectCallOptions): Promise<void>;
    /**
     * Reject the call.
     *
     * @param incomingCallContext - The context associated with the call.
     * @param options - Additional request options contains rejectCall api options.
     */
    rejectCall(incomingCallContext: string, options?: RejectCallOptions): Promise<void>;
    private createCustomCallingContextInternal;
    /**
     * Create connection to room call.
     * @param callLocator - Call locator to create connection.
     * @param callbackUrl - The callback url
     * @param options - Additional request options contains connect api options.
     */
    connectCall(callLocator: CallLocator, callbackUrl: string, options?: ConnectCallOptions): Promise<ConnectCallResult>;
}
//# sourceMappingURL=callAutomationClient.d.ts.map