// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import {
  parseClientArguments,
  isKeyCredential,
  CommunicationIdentifier,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import { logger } from "./models/logger";
import {
  AnswerCallRequest,
  CallAutomationApiClient,
  CommunicationUserIdentifierModel,
  CreateCallRequest,
  RedirectCallRequest,
  RejectCallRequest,
  CustomCallingContextInternal,
} from "./generated/src";
import { CallConnection } from "./callConnection";
import { CallRecording } from "./callRecording";
import {
  AnswerCallOptions,
  CreateCallOptions,
  RedirectCallOptions,
  RejectCallOptions,
} from "./models/options";
import { AnswerCallResult, CreateCallResult } from "./models/responses";
import { CallConnectionProperties, CallInvite, CustomCallingContext } from "./models/models";
import {
  communicationIdentifierConverter,
  communicationIdentifierModelConverter,
  communicationUserIdentifierConverter,
  communicationUserIdentifierModelConverter,
  phoneNumberIdentifierConverter,
  PhoneNumberIdentifierModelConverter,
} from "./utli/converters";
import { randomUUID } from "@azure/core-util";
import { createCustomCallAutomationApiClient } from "./credential/callAutomationAuthPolicy";
import { CallAutomationEventProcessor } from "./eventprocessor/callAutomationEventProcessor";
import { AnswerCallEventResult, CreateCallEventResult } from "./eventprocessor/eventResponses";
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
  private readonly sourceIdentity?: CommunicationUserIdentifierModel;
  private readonly credential: TokenCredential | KeyCredential;
  private readonly internalPipelineOptions: InternalPipelineOptions;
  private readonly callAutomationEventProcessor: CallAutomationEventProcessor;
  private readonly endpoint: string;
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
  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options?: CallAutomationClientOptions,
  );

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | CallAutomationClientOptions,
    maybeOptions: CallAutomationClientOptions = {},
  ) {
    const options = isCallAutomationClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    if (!options?.userAgentOptions) {
      options.userAgentOptions = {};
    }

    this.internalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    this.endpoint = url;

    this.credential = credential;

    // create event processor
    this.callAutomationEventProcessor = new CallAutomationEventProcessor();

    // create api client (using custom api endpoint if available)
    this.callAutomationApiClient = createCustomCallAutomationApiClient(
      credential,
      this.internalPipelineOptions,
      this.endpoint,
    );

    this.sourceIdentity = communicationUserIdentifierModelConverter(options.sourceIdentity);
  }

  /**
   * Initializes a new instance of CallConnection.
   * @param callConnectionId - The CallConnection id for the CallConnection instance. (ex: 421CONTOSO-cRD6-4RDc-a078-99dRANDOMf).
   */
  public getCallConnection(callConnectionId: string): CallConnection {
    return new CallConnection(
      callConnectionId,
      this.endpoint,
      this.credential,
      this.callAutomationEventProcessor,
      this.internalPipelineOptions,
    );
  }

  /**
   * Initializes a new instance of CallRecording.
   */
  public getCallRecording(): CallRecording {
    return new CallRecording(this.endpoint, this.credential, this.internalPipelineOptions);
  }

  /**
   * Get Source Identity that is used for create and answer call
   */
  public getSourceIdentity(): CommunicationUserIdentifier | undefined {
    return communicationUserIdentifierConverter(this.sourceIdentity);
  }

  /**
   * Get event processor to work with call automation events
   */
  public getEventProcessor(): CallAutomationEventProcessor {
    return this.callAutomationEventProcessor;
  }

  private async createCallInternal(
    request: CreateCallRequest,
    options?: CreateCallOptions,
  ): Promise<CreateCallResult> {
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };
    const { callConnectionId, answeredBy, targets, sourceCallerIdNumber, source, ...result } =
      await this.callAutomationApiClient.createCall(request, optionsInternal);

    if (callConnectionId) {
      const callConnectionPropertiesDto: CallConnectionProperties = {
        ...result,
        callConnectionId: callConnectionId,
        source: source ? communicationIdentifierConverter(source) : undefined,
        answeredby: communicationUserIdentifierConverter(answeredBy),
        targetParticipants: targets?.map((returnedTarget) =>
          communicationIdentifierConverter(returnedTarget),
        ),
        sourceCallerIdNumber: sourceCallerIdNumber
          ? phoneNumberIdentifierConverter(sourceCallerIdNumber)
          : undefined,
      };
      const callConnection = new CallConnection(
        callConnectionId,
        this.endpoint,
        this.credential,
        this.callAutomationEventProcessor,
        this.internalPipelineOptions,
      );
      const createCallResult: CreateCallResult = {
        callConnectionProperties: callConnectionPropertiesDto,
        callConnection: callConnection,
        waitForEventProcessor: async (abortSignal, timeoutInMs) => {
          const createCallEventResult: CreateCallEventResult = {
            isSuccess: false,
          };
          await this.callAutomationEventProcessor.waitForEventProcessor(
            (event) => {
              if (event.callConnectionId === callConnectionId && event.kind === "CallConnected") {
                createCallEventResult.isSuccess = true;
                createCallEventResult.successResult = event;
                return true;
              } else if (
                event.callConnectionId === callConnectionId &&
                event.kind === "CreateCallFailed"
              ) {
                createCallEventResult.isSuccess = false;
                createCallEventResult.failureResult = event;
                return true;
              } else {
                return false;
              }
            },
            abortSignal,
            timeoutInMs,
          );

          return createCallEventResult;
        },
      };
      return createCallResult;
    }
    throw "callConnectionProperties / callConnectionId is missing in createCall result";
  }

  /**
   * Create an outgoing call from source to a target identity.
   * @param targetParticipant - A single target.
   * @param callbackUrl - The callback url.
   * @param options - Additional request options contains createCallConnection api options.
   */
  public async createCall(
    targetParticipant: CallInvite,
    callbackUrl: string,
    options: CreateCallOptions = {},
  ): Promise<CreateCallResult> {
    const request: CreateCallRequest = {
      source: this.sourceIdentity,
      targets: [communicationIdentifierModelConverter(targetParticipant.targetParticipant)],
      callbackUri: callbackUrl,
      operationContext: options.operationContext,
      callIntelligenceOptions: options.callIntelligenceOptions,
      mediaStreamingConfiguration: options.mediaStreamingConfiguration,
      transcriptionConfiguration: options.transcriptionConfiguration,
      customCallingContext: this.createCustomCallingContextInternal(
        targetParticipant.customCallingContext!,
      ),
      sourceCallerIdNumber: PhoneNumberIdentifierModelConverter(
        targetParticipant.sourceCallIdNumber,
      ),
      sourceDisplayName: targetParticipant.sourceDisplayName,
    };

    return this.createCallInternal(request, options);
  }

  /**
   * Create an outgoing call from source to a group of targets identities.
   * @param targetParticipants - A group of targets identities.
   * @param callbackUrl - The callback url.
   * @param options - Additional request options contains createCallConnection api options.
   */
  public async createGroupCall(
    targetParticipants: CommunicationIdentifier[],
    callbackUrl: string,
    options: CreateCallOptions = {},
  ): Promise<CreateCallResult> {
    const request: CreateCallRequest = {
      source: this.sourceIdentity,
      targets: targetParticipants.map((target) => communicationIdentifierModelConverter(target)),
      callbackUri: callbackUrl,
      operationContext: options.operationContext,
      callIntelligenceOptions: options.callIntelligenceOptions,
      transcriptionConfiguration: options.transcriptionConfiguration,
      sourceCallerIdNumber: PhoneNumberIdentifierModelConverter(options.sourceCallIdNumber),
      sourceDisplayName: options.sourceDisplayName,
    };

    return this.createCallInternal(request, options);
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
    options: AnswerCallOptions = {},
  ): Promise<AnswerCallResult> {
    const {
      callIntelligenceOptions,
      mediaStreamingConfiguration,
      transcriptionConfiguration,
      operationContext,
      ...operationOptions
    } = options;
    const request: AnswerCallRequest = {
      incomingCallContext: incomingCallContext,
      mediaStreamingConfiguration: mediaStreamingConfiguration,
      transcriptionConfiguration: transcriptionConfiguration,
      callIntelligenceOptions: callIntelligenceOptions,
      operationContext: operationContext,
      callbackUri: callbackUrl,
      answeredBy: this.sourceIdentity,
    };
    const optionsInternal = {
      ...operationOptions,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };
    const { callConnectionId, targets, sourceCallerIdNumber, answeredBy, source, ...result } =
      await this.callAutomationApiClient.answerCall(request, optionsInternal);

    if (callConnectionId) {
      const callConnectionProperties: CallConnectionProperties = {
        ...result,
        callConnectionId: callConnectionId,
        source: source ? communicationIdentifierConverter(source) : undefined,
        answeredby: communicationUserIdentifierConverter(answeredBy),
        targetParticipants: targets?.map((target) => communicationIdentifierConverter(target)),
        sourceCallerIdNumber: sourceCallerIdNumber
          ? phoneNumberIdentifierConverter(sourceCallerIdNumber)
          : undefined,
      };
      const callConnection = new CallConnection(
        callConnectionId,
        this.endpoint,
        this.credential,
        this.callAutomationEventProcessor,
        this.internalPipelineOptions,
      );
      const answerCallResult: AnswerCallResult = {
        callConnectionProperties: callConnectionProperties,
        callConnection: callConnection,
        waitForEventProcessor: async (abortSignal, timeoutInMs) => {
          const answerCallEventResult: AnswerCallEventResult = {
            isSuccess: false,
          };
          await this.callAutomationEventProcessor.waitForEventProcessor(
            (event) => {
              if (event.callConnectionId === callConnectionId && event.kind === "CallConnected") {
                answerCallEventResult.isSuccess = true;
                answerCallEventResult.successResult = event;
                return true;
              }
              if (event.callConnectionId === callConnectionId && event.kind === "AnswerFailed") {
                answerCallEventResult.isSuccess = false;
                answerCallEventResult.failureResult = event;
                return true;
              } else {
                return false;
              }
            },
            abortSignal,
            timeoutInMs,
          );
          return answerCallEventResult;
        },
      };
      return answerCallResult;
    }
    throw "callConnectionProperties / callConnectionId is missing in createCall result";
  }

  /**
   * Redirect the call.
   *
   * @param incomingCallContext - The context associated with the call.
   * @param targetParticipant - The target identity to redirect the call to.
   * @param options - Additional request options contains redirectCall api options.
   */
  public async redirectCall(
    incomingCallContext: string,
    targetParticipant: CallInvite,
    options: RedirectCallOptions = {},
  ): Promise<void> {
    const request: RedirectCallRequest = {
      incomingCallContext: incomingCallContext,
      target: communicationIdentifierModelConverter(targetParticipant.targetParticipant),
      customCallingContext: this.createCustomCallingContextInternal(
        targetParticipant.customCallingContext!,
      ),
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };

    return this.callAutomationApiClient.redirectCall(request, optionsInternal);
  }

  /**
   * Reject the call.
   *
   * @param incomingCallContext - The context associated with the call.
   * @param options - Additional request options contains rejectCall api options.
   */
  public async rejectCall(
    incomingCallContext: string,
    options: RejectCallOptions = {},
  ): Promise<void> {
    const request: RejectCallRequest = {
      incomingCallContext: incomingCallContext,
      callRejectReason: options.callRejectReason,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };

    return this.callAutomationApiClient.rejectCall(request, optionsInternal);
  }

  private createCustomCallingContextInternal(
    customCallingContext: CustomCallingContext,
  ): CustomCallingContextInternal {
    const sipHeaders: { [key: string]: string } = {};
    const voipHeaders: { [key: string]: string } = {};
    if (customCallingContext) {
      for (const header of customCallingContext) {
        if (header.kind === "sipuui") {
          sipHeaders[`User-To-User`] = header.value;
        } else if (header.kind === "sipx") {
          sipHeaders[`X-MS-Custom-${header.key}`] = header.value;
        } else if (header.kind === "voip") {
          voipHeaders[`${header.key}`] = header.value;
        }
      }
    }
    return { sipHeaders: sipHeaders, voipHeaders: voipHeaders };
  }
}
