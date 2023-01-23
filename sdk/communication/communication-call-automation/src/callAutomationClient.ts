// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import {
    parseClientArguments,
    isKeyCredential,
    createCommunicationAuthPolicy,
    CommunicationIdentifier,
    serializeCommunicationIdentifier
} from "@azure/communication-common";
import { logger } from "./models/logger";
import { SDK_VERSION } from "./models/constants";
import { AnswerCallRequest, CallAutomationApiClient, CallSource, CreateCallRequest, RedirectCallRequest, RejectCallRequest } from "./generated/src";
import { CallConnectionImpl, CallMediaImpl, CallRecordingImpl } from "./generated/src/operations";
import { CallConnection } from "./callConnection";
import { CallRecording } from "./callRecording";
import { AnswerCallOptions, CreateCallOptions, RedirectCallOptions, RejectCallOptions } from "./models/options";

/**
* Client options used to configure CallingServer Client API requests.
*/
export interface CallAutomationClientOptions extends CommonClientOptions {}

/**
* Checks whether the type of a value is CallingServerClientOptions or not.
*
* @param options - The value being checked.
*/
const isCallAutomationClientOptions = (options: any): options is CallAutomationClientOptions =>
    !!options && !isTokenCredential(options) && !isKeyCredential(options);

/**
* A CallingServerClient represents a Client to the Azure Communication CallingServer service.
*/
export class CallAutomationClient {
    private readonly callAutomationApiClient: CallAutomationApiClient;
    private readonly callConnectionImpl: CallConnectionImpl;
    private readonly callRecordingImpl: CallRecordingImpl;
    private readonly callMediaImpl: CallMediaImpl;

    /**
    * Initializes a new instance of the CallAutomationClient class.
    * @param connectionString - Connection string to connect to an Azure Communication Service resource.
    *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
    * @param options - Optional. Options to configure the HTTP pipeline.
    */
    constructor(connectionString: string, options?: CallAutomationClientOptions);

    /**
    * Initializes a new instance of the SmsClient class using an Azure KeyCredential.
    * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
    * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
    * @param options - Optional. Options to configure the HTTP pipeline.
    */
    constructor(endpoint: string, credential: KeyCredential, options?: CallAutomationClientOptions);

    /**
    * Initializes a new instance of the CallAutomationClient class using a TokenCredential.
    * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
    * @param credential - TokenCredential that is used to authenticate requests to the service.
    * @param options - Optional. Options to configure the HTTP pipeline.
    */
    constructor(endpoint: string, credential: TokenCredential, options?: CallAutomationClientOptions);

    constructor(
            connectionStringOrUrl: string,
            credentialOrOptions?: KeyCredential | TokenCredential | CallAutomationClientOptions,
            maybeOptions: CallAutomationClientOptions = {}
    ){
        const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
        const options = isCallAutomationClientOptions(credentialOrOptions)
        ? credentialOrOptions
        : maybeOptions;
        const libInfo = `azsdk-js-communication-call-automation/${SDK_VERSION}`;

        if (!options?.userAgentOptions) {
        options.userAgentOptions = {};
        }

        if (options?.userAgentOptions?.userAgentPrefix) {
        options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
        } else {
        options.userAgentOptions.userAgentPrefix = libInfo;
        }

        const internalPipelineOptions: InternalPipelineOptions = {
            ...options,
            ...{
                loggingOptions: {
                    logger: logger.info
                }
            }
        };

        const authPolicy = createCommunicationAuthPolicy(credential);
        this.callAutomationApiClient = new CallAutomationApiClient(url, internalPipelineOptions);
        this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
        this.callConnectionImpl = new CallConnectionImpl(this.callAutomationApiClient);
        this.callMediaImpl = new CallMediaImpl(this.callAutomationApiClient);
        this.callRecordingImpl = new CallRecordingImpl(this.callAutomationApiClient);
    }

    /**
    * Initializes a new instance of CallConnection.
    * @param callConnectionId - The CallConnection id for the CallConnection instance. (ex: 421CONTOSO-cRD6-4RDc-a078-99dRANDOMf).
    */
    public getCallConnection(callConnectionId: string): CallConnection {
        return new CallConnection(callConnectionId, this.callConnectionImpl, this.callMediaImpl);
    }

    /**
    * Initializes a new instance of CallRecording.
    */
    public getCallRecording(): CallRecording {
        return new CallRecording(this.callRecordingImpl);
    }

    /**
    * Create an outgoing call from source to target identities.
    * @param source - The source of caller.
    * @param targets - The target identities.
    * @param callbackUrl - The callback url.
    * @param options - Additional request options contains createCallConnection api options.
    */
    // TODO: missing mediaStreamingConfig and proper return type
    public async createCall(
        source: CallSource,
        targets: CommunicationIdentifier[],
        callbackUrl: string,
        options: CreateCallOptions = {}
    ): Promise<CallConnection> {
        const request: CreateCallRequest = {
            source: source,
            targets: targets.map((m) => serializeCommunicationIdentifier(m)),
            callbackUri: callbackUrl,
            operationContext: options.operationContext,
            azureCognitiveServicesEndpointUrl: options.azureCognitiveServicesEndpointUrl,
            mediaStreamingConfiguration: undefined
        };

        const result = await this.callAutomationApiClient.createCall(
            request,
            options
        );

        if (result.callConnectionId) {
            return new CallConnection(result.callConnectionId, this.callConnectionImpl, this.callMediaImpl);
        }
        throw "callConnectionId is missing in createCall result";
    }

    /**
    * Answer the call.
    * @param incomingCallContext - The context associated with the call.
    * @param callbackUrl - The callback url.
    * @param options - Additional request options contains answerCall api options.
    */
    //TODO: missing mediaStreamingOptions in options and proper return type.
    public async answerCall(
        incomingCallContext: string,
        callbackUrl: string,
        options: AnswerCallOptions = {}
    ): Promise<CallConnection> {
        const request: AnswerCallRequest = {
            incomingCallContext: incomingCallContext,
            callbackUri: callbackUrl,
            mediaStreamingConfiguration: undefined,
            azureCognitiveServicesEndpointUrl: options.azureCognitiveServicesEndpointUrl
        };

        const result = await this.callAutomationApiClient.answerCall(
            request,
            options
        );
        if (result.callConnectionId) {
            return new CallConnection(result.callConnectionId, this.callConnectionImpl, this.callMediaImpl);
        }
        throw "callConnectionId is missing in createCall result";
    }

    /**
    * Redirect the call.
    *
    * @param incomingCallContext - The context associated with the call.
    * @param target - The target identity to redirect the call to.
    * @param options - Additional request options contains redirectCall api options.
    */
    public async redirectCall(
        incomingCallContext: string,
        target: CommunicationIdentifier,
        options: RedirectCallOptions = {}
    ): Promise<void> {
        const request: RedirectCallRequest = {
            incomingCallContext: incomingCallContext,
            target: serializeCommunicationIdentifier(target)
        };

        return await this.callAutomationApiClient.redirectCall(
            request,
            options
        );
    }


    /**
    * Reject the call.
    *
    * @param incomingCallContext - The context associated with the call.
    * @param options - Additional request options contains rejectCall api options.
    */
    public async rejectCall(
        incomingCallContext: string,
        options: RejectCallOptions = {}
    ): Promise<void> {
        const request: RejectCallRequest = {
            incomingCallContext: incomingCallContext,
            callRejectReason: options.callRejectReason
        };

        return await this.callAutomationApiClient.rejectCall(
            request,
            options
        );
    }
}
