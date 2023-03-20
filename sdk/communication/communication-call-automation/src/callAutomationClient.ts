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
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import { logger } from "./models/logger";
import { SDK_VERSION } from "./models/constants";
import {
  AnswerCallRequest,
  CallAutomationApiClient,
  CommunicationIdentifierModel,
  CreateCallRequest,
  RedirectCallRequest,
  RejectCallRequest,
} from "./generated/src";
import { CallConnectionImpl, CallMediaImpl, CallRecordingImpl } from "./generated/src/operations";
import { CallConnection } from "./callConnection";
import { CallRecording } from "./callRecording";
import {
  AnswerCallOptions,
  CreateCallOptions,
  RedirectCallOptions,
  RejectCallOptions,
} from "./models/options";
import { AnswerCallResult, CreateCallResult } from "./models/responses";
import { CallConnectionProperties, CallInvite } from "./models/models";
import {
  communicationIdentifierConverter,
  communicationIdentifierModelConverter,
  phoneNumberIdentifierConverter,
  PhoneNumberIdentifierModelConverter,
} from "./utli/converters";

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
 * Checks whether the type of a value is CallAutomationClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isCallAutomationClientOptions = (options: any): options is CallAutomationClientOptions =>
  !!options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 * A CallAutomationClient represents a Client to the Azure Communication CallAutomation service.
 */
export class CallAutomationClient {
  private readonly callAutomationApiClient: CallAutomationApiClient;
  private readonly callConnectionImpl: CallConnectionImpl;
  private readonly callRecordingImpl: CallRecordingImpl;
  private readonly callMediaImpl: CallMediaImpl;
  private readonly sourceIdentity?: CommunicationIdentifierModel;

  /**
   * Initializes a new instance of the CallAutomationClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: CallAutomationClientOptions);

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
    credentialOrOptions?: KeyCredential | TokenCredential | CallAutomationClientOptions,
    maybeOptions: CallAutomationClientOptions = {}
  ) {
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
          logger: logger.info,
        },
      },
    };

    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);

    this.callAutomationApiClient = new CallAutomationApiClient(url, internalPipelineOptions);
    this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
    this.callConnectionImpl = new CallConnectionImpl(this.callAutomationApiClient);
    this.callMediaImpl = new CallMediaImpl(this.callAutomationApiClient);
    this.callRecordingImpl = new CallRecordingImpl(this.callAutomationApiClient);
    this.sourceIdentity = options.sourceIdentity
      ? communicationIdentifierModelConverter(options.sourceIdentity)
      : undefined;
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
   * Get Source Identity that is used for create and answer call
   */
  public getSourceIdentity(): CommunicationUserIdentifier | undefined {
    return this.sourceIdentity
      ? (communicationIdentifierConverter(this.sourceIdentity) as CommunicationUserIdentifier)
      : undefined;
  }

  /**
   * Create an outgoing call from source to target identities.
   * @param target - Either a single target or a group of target identities.
   * @param callbackUri - The callback url.
   * @param options - Additional request options contains createCallConnection api options.
   */
  public async createCall(
    target: CallInvite | CommunicationIdentifier[],
    callbackUri: string,
    options: CreateCallOptions = {}
  ): Promise<CreateCallResult> {
    const request: CreateCallRequest = {
      sourceIdentity: this.sourceIdentity,
      targets:
        target instanceof CallInvite
          ? [communicationIdentifierModelConverter(target.target)]
          : target.map((m) => communicationIdentifierModelConverter(m)),
      callbackUri: callbackUri,
      operationContext: options.operationContext,
      azureCognitiveServicesEndpointUrl: options.azureCognitiveServicesEndpointUrl,
      mediaStreamingConfiguration: options.mediaStreamingConfiguration,
      sourceCallerIdNumber:
        target instanceof CallInvite
          ? PhoneNumberIdentifierModelConverter(target.sourceCallIdNumber)
          : options.sourceCallIdNumber
          ? PhoneNumberIdentifierModelConverter(options.sourceCallIdNumber)
          : undefined,
      sourceDisplayName:
        target instanceof CallInvite
          ? target.sourceDisplayName
          : options.sourceDisplayName
          ? options.sourceDisplayName
          : undefined,
    };

    const result = await this.callAutomationApiClient.createCall(request, options);

    if (result?.callConnectionId) {
      const callConnectionPropertiesDto: CallConnectionProperties = {
        ...result,
        sourceIdentity: result.sourceIdentity
          ? communicationIdentifierConverter(result.sourceIdentity)
          : undefined,
        targets: result.targets?.map((returnedTarget) =>
          communicationIdentifierConverter(returnedTarget)
        ),
        sourceCallerIdNumber: result.sourceCallerIdNumber
          ? phoneNumberIdentifierConverter(result.sourceCallerIdNumber)
          : undefined,
      };
      const callConnection = new CallConnection(
        result.callConnectionId,
        this.callConnectionImpl,
        this.callMediaImpl
      );
      const createCallResult: CreateCallResult = {
        callConnectionProperties: callConnectionPropertiesDto,
        callConnection: callConnection,
      };
      return createCallResult;
    }
    throw "callConnectionProperties / callConnectionId is missing in createCall result";
  }

  /**
   * Answer the call.
   * @param incomingCallContext - The context associated with the call.
   * @param callbackUri - The callback url.
   * @param options - Additional request options contains answerCall api options.
   */
  public async answerCall(
    incomingCallContext: string,
    callbackUri: string,
    options: AnswerCallOptions = {}
  ): Promise<AnswerCallResult> {
    const request: AnswerCallRequest = {
      incomingCallContext: incomingCallContext,
      callbackUri: callbackUri,
      mediaStreamingConfiguration: options.mediaStreamingConfiguration,
      azureCognitiveServicesEndpointUrl: options.azureCognitiveServicesEndpointUrl,
    };

    const result = await this.callAutomationApiClient.answerCall(request, options);

    if (result?.callConnectionId) {
      const callConnectionProperties: CallConnectionProperties = {
        ...result,
        sourceIdentity: result.sourceIdentity
          ? communicationIdentifierConverter(result.sourceIdentity)
          : undefined,
        targets: result.targets?.map((target) => communicationIdentifierConverter(target)),
        sourceCallerIdNumber: result.sourceCallerIdNumber
          ? phoneNumberIdentifierConverter(result.sourceCallerIdNumber)
          : undefined,
      };
      const callConnection = new CallConnection(
        result.callConnectionId,
        this.callConnectionImpl,
        this.callMediaImpl
      );
      const answerCallResult: AnswerCallResult = {
        callConnectionProperties: callConnectionProperties,
        callConnection: callConnection,
      };
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
    target: CallInvite,
    options: RedirectCallOptions = {}
  ): Promise<void> {
    const request: RedirectCallRequest = {
      incomingCallContext: incomingCallContext,
      target: communicationIdentifierModelConverter(target.target),
    };

    return this.callAutomationApiClient.redirectCall(request, options);
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
      callRejectReason: options.callRejectReason,
    };

    return this.callAutomationApiClient.rejectCall(request, options);
  }
}
