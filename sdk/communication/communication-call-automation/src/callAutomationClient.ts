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
    serializeCommunicationIdentifier,
    parseConnectionString,
    EndpointCredential
} from "@azure/communication-common";
import { logger } from "./models/logger";
import { SDK_VERSION } from "./models/constants";
import { AnswerCallRequest, CallAutomationApiClient, CreateCallRequest, RedirectCallRequest, RejectCallRequest } from "./generated/src";
import { CallConnectionImpl, CallMediaImpl, CallRecordingImpl } from "./generated/src/operations";
import { CallConnection } from "./callConnection";
import { CallRecording } from "./callRecording";
import { AnswerCallOptions, CreateCallOptions, RedirectCallOptions, RejectCallOptions } from "./models/options";
import { AnswerCallResult, CreateCallResult } from "./models/responses";
import { CallConnectionPropertiesDto, CallSourceDto } from "./models/models";
import { callSourceConverter, callSourceDtoConverter, communicationIdentifierConverter } from "./utli/converters";
import { start } from "repl";
import { endpoint } from "./generated/src/models/parameters";

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
    * Initializes a new instance of the CallAutomationClient class with custom PMA endpoint.
    * @param connectionString - Connection string to connect to an Azure Communication Service resource.
    *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
    * @param options - Optional. Options to configure the HTTP pipeline.
    */
    constructor(connectionString: string, endpoint: string, options?: CallAutomationClientOptions);

    /**
    * Initializes a new instance of the CallAutomationClient class using an Azure KeyCredential.
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
            credentialOrOptionsOrEndpoint?: string | KeyCredential | TokenCredential | CallAutomationClientOptions,
            maybeOptions: CallAutomationClientOptions = {}
    ) {
        const options = isCallAutomationClientOptions(credentialOrOptionsOrEndpoint)
            ? credentialOrOptionsOrEndpoint
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

        if (typeof (credentialOrOptionsOrEndpoint) == 'string') {
            const result = parseConnectionString(connectionStringOrUrl);
            const endPointWithCred: EndpointCredential = {
                ...result,
                endpoint: credentialOrOptionsOrEndpoint
            }
            const authPolicy = createCommunicationAuthPolicy(endPointWithCred.credential);
            this.callAutomationApiClient = new CallAutomationApiClient(endPointWithCred.endpoint, internalPipelineOptions);
            this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
        }
        else {
            const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptionsOrEndpoint);
            const authPolicy = createCommunicationAuthPolicy(credential);
            this.callAutomationApiClient = new CallAutomationApiClient(url, internalPipelineOptions);
            this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
        }

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
    public async createCall(
        source: CallSourceDto,
        targets: CommunicationIdentifier[],
        callbackUrl: string,
        options: CreateCallOptions = {}
    ): Promise<CreateCallResult> {
        const request: CreateCallRequest = {
            source: callSourceConverter(source),
            targets: targets.map((m) => serializeCommunicationIdentifier(m)),
            callbackUri: callbackUrl,
            operationContext: options.operationContext,
            azureCognitiveServicesEndpointUrl: options.azureCognitiveServicesEndpointUrl,
            mediaStreamingConfiguration: options.mediaStreamingConfiguration
        };

        const result = await this.callAutomationApiClient.createCall(
            request,
            options
        );

        if (result?.callConnectionId) {
            const callConnectionPropertiesDto: CallConnectionPropertiesDto = {
                ...result,
                source: result.source? callSourceDtoConverter(result.source) : undefined,
                targets: result.targets?.map(target => communicationIdentifierConverter(target))
            }
            const callConnection = new CallConnection(result.callConnectionId, this.callConnectionImpl, this.callMediaImpl);
            const createCallResult: CreateCallResult = {
                callConnectionProperties: callConnectionPropertiesDto,
                callConnection: callConnection
            }
            return createCallResult;
        }
        throw "callConnectionProperties / callConnectionId is missing in createCall result";
    }

    /**
    * Answer the call.
    * @param incomingCallContext - The context associated with the call.
    * @param callbackUrl - The callback url.
    * @param options - Additional request options contains answerCall api options.
    */
    public async answerCall(
        incomingCallContext: string,
        callbackUrl: string,
        options: AnswerCallOptions = {}
    ): Promise<AnswerCallResult> {
        const request: AnswerCallRequest = {
            incomingCallContext: incomingCallContext,
            callbackUri: callbackUrl,
            mediaStreamingConfiguration: options.mediaStreamingConfiguration,
            azureCognitiveServicesEndpointUrl: options.azureCognitiveServicesEndpointUrl
        };

        const result = await this.callAutomationApiClient.answerCall(
            request,
            options
        );

        if (result?.callConnectionId) {
            const callConnectionPropertiesDto: CallConnectionPropertiesDto = {
                ...result,
                source: result.source ? callSourceDtoConverter(result.source) : undefined,
                targets: result.targets?.map(target => communicationIdentifierConverter(target))
            }
            const callConnection = new CallConnection(result.callConnectionId, this.callConnectionImpl, this.callMediaImpl);
            const answerCallResult: AnswerCallResult = {
                callConnectionProperties: callConnectionPropertiesDto,
                callConnection: callConnection
            }
            return answerCallResult;
        }
        throw "callConnectionProperties / callConnectionId is missing in createCall result";
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
