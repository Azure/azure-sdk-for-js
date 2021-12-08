// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CallConnection, ContentDownloadResult } from ".";
import { CallConnectionImpl } from "./callConnection";
import {
  CreateCallConnectionOptions,
  DownloadOptions,
  JoinCallOptions,
  AnswerCallOptions,
  RejectCallOptions,
  RedirectCallOptions,
  CallLocator,
  PlayAudioOptions,
  PlayAudioToParticipantOptions,
  AddParticipantOptions,
  RemoveParticipantOptions,
  CancelMediaOperationOptions,
  StartRecordingOptions,
  PauseRecordingOptions,
  ResumeRecordingOptions,
  StopRecordingOptions,
  GetRecordingPropertiesOptions,
  DeleteRecordingOptions,
  GetParticipantOptions,
  GetParticipantsOptions
} from "./models";
import { CallConnections, ServerCalls } from "./generated/src/operations";
import {
  CreateCallRequest,
  JoinCallRequest,
  AnswerCallRequest,
  AnswerCallResult,
  RejectCallRequest,
  RedirectCallRequest,
  PlayAudioWithCallLocatorRequest,
  PlayAudioResult,
  PlayAudioToParticipantWithCallLocatorRequest,
  AddParticipantResult,
  AddParticipantWithCallLocatorRequest,
  RemoveParticipantWithCallLocatorRequest,
  CancelMediaOperationWithCallLocatorRequest,
  CancelParticipantMediaOperationWithCallLocatorRequest,
  StartCallRecordingResult,
  StartCallRecordingWithCallLocatorRequest,
  CallRecordingProperties,
  CallParticipant,
  GetParticipantWithCallLocatorRequest,
  GetAllParticipantsWithCallLocatorRequest
} from "./generated/src/models";
import * as Mappers from "./generated/src/models/mappers";
import { TokenCredential } from "@azure/core-auth";

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy,
  CommunicationIdentifier,
  serializeCommunicationIdentifier
} from "@azure/communication-common";
import {
  isNode,
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase,
  RestResponse,
  OperationArguments,
  OperationSpec,
  Serializer
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { CallingServerApiClient } from "./generated/src/callingServerApiClient";
import { CallingServerApiClientContext } from "./generated/src/callingServerApiClientContext";
import { SDK_VERSION } from "./constants";
import { convertTracingToRequestOptionsBase, createSpan } from "./tracing";
import { logger } from "./logger";
import { ContentDownloader, ContentDownloaderImpl } from "./ContentDownloader";
import { rangeToString } from "./Range";
import { RepeatableContentDownloadResult } from "./RepeatableContentDownloadResult";
import { extractOperationOptions } from "./extractOperationOptions";
import { CallingServerUtils } from "./utils/utils.common";
import { serializeCallLocator } from "./callLocatorModelSerializer";
import { readStreamToLocalFile } from "./utils/utils.node";

/**
 * Client options used to configure CallingServer Client API requests.
 */
export interface CallingServerClientOptions extends PipelineOptions {}

/**
 * Checks whether the type of a value is CallingServerClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isCallingServerClientOptions = (options: any): options is CallingServerClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * A CallingServerClient represents a Client to the Azure Communication CallingServer service.
 */
export class CallingServerClient {
  private readonly callingServerServiceClient: CallingServerApiClient;
  private readonly callConnectionRestClient: CallConnections;
  private readonly serverCallRestClient: ServerCalls;
  private readonly storageApiClient: CallingServerApiClientContext;

  /**
   * Initializes a new instance of the CallingServerClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: CallingServerClientOptions);

  /**
   * Initializes a new instance of the SmsClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: CallingServerClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: TokenCredential | CallingServerClientOptions,
    maybeOptions: CallingServerClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isCallingServerClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;
    const libInfo = `azsdk-js-communication-calling-server/${SDK_VERSION}`;

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
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.callingServerServiceClient = new CallingServerApiClient(url, pipeline);
    this.callConnectionRestClient = this.callingServerServiceClient.callConnections;
    this.serverCallRestClient = this.callingServerServiceClient.serverCalls;
    this.storageApiClient = new CallingServerApiClientContext(url, pipeline);
  }

  /**
   * Initializes a new instance of CallConnection using a callConnectionId.
   * @param callConnectionId - The CallConnection id for the CallConnection instance. (ex: endpoint=https://REDACTED.communication.azure.com/;accesskey=eyJhbG==).
   */
  public getCallConnection(callConnectionId: string): CallConnection {
    return new CallConnectionImpl(callConnectionId, this.callConnectionRestClient);
  }

  /**
   * Initializes a new instance of ContentDownloader.
   */
  public initializeContentDownloader(): ContentDownloader {
    return new ContentDownloaderImpl(this.storageApiClient);
  }

  /**
   * Create an outgoing call from source to target identities.
   * @param source - The source identity.
   * @param targets - The target identities.
   * @param options - Additional request options contains createCallConnection api options.
   */
  public async createCallConnection(
    source: CommunicationIdentifier,
    targets: CommunicationIdentifier[],
    options: CreateCallConnectionOptions
  ): Promise<CallConnection> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-CreateCallOptions",
      operationOptions
    );

    const alternateCallerId =
      restOptions.alternateCallerId == null
        ? undefined
        : serializeCommunicationIdentifier({
            phoneNumber: restOptions.alternateCallerId.phoneNumber
          }).phoneNumber;

    const request: CreateCallRequest = {
      source: serializeCommunicationIdentifier(source),
      targets: targets.map((m) => serializeCommunicationIdentifier(m)),
      callbackUri: restOptions.callbackUrl,
      requestedMediaTypes: restOptions.requestedMediaTypes,
      requestedCallEvents: restOptions.requestedCallEvents,
      alternateCallerId: alternateCallerId
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.createCall(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      if (result.callConnectionId) {
        return new CallConnectionImpl(result.callConnectionId, this.callConnectionRestClient);
      }
      throw "callConnectionId is missing in createCall result";
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Join the call using callLocator.
   *
   * @param callLocator - The callLocator contains call id.
   * @param source - The source identity.
   * @param options - Additional request options contains joinCall api options.
   */
  public async joinCall(
    callLocator: CallLocator,
    source: CommunicationIdentifier,
    options: JoinCallOptions
  ): Promise<CallConnection> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("ServerCallRestClient-JoinCall", operationOptions);

    const request: JoinCallRequest = {
      callLocator: serializeCallLocator(callLocator),
      source: serializeCommunicationIdentifier(source),
      callbackUri: restOptions.callbackUrl,
      requestedMediaTypes: restOptions.requestedMediaTypes,
      requestedCallEvents: restOptions.requestedCallEvents,
      subject: undefined
    };

    try {
      const { _response, ...result } = await this.serverCallRestClient.joinCall(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      if (result.callConnectionId) {
        return new CallConnectionImpl(result.callConnectionId, this.callConnectionRestClient);
      } else {
        throw "callConnectionId is missing in joinCall result";
      }
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Play audio using callLocator.
   *
   * @param callLocator - The callLocator contains call id.
   * @param audioUrl - The audio resource url.
   * @param options - Additional request options contains playAudio api options.
   */
  public async playAudio(
    callLocator: CallLocator,
    audioUrl: string,
    options: PlayAudioOptions
  ): Promise<PlayAudioResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("ServerCallRestClient-PlayAudio", operationOptions);

    const request: PlayAudioWithCallLocatorRequest = {
      callLocator: callLocator,
      audioFileUri: audioUrl,
      loop: restOptions.loop,
      operationContext: restOptions.operationContext,
      audioFileId: restOptions.audioFileId,
      callbackUri: restOptions.callbackUrl
    };

    try {
      const { _response, ...result } = await this.serverCallRestClient.playAudio(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Play audio to a participant using callLocator.
   *
   * @param callLocator - The callLocator contains call id.
   * @param participant - The identifier of the participant.
   * @param audioUrl - The audio resource url.
   * @param options - Additional request options contains playAudioToParticipant api options.
   */
  public async playAudioToParticipant(
    callLocator: CallLocator,
    participant: CommunicationIdentifier,
    audioUrl: string,
    options: PlayAudioToParticipantOptions
  ): Promise<PlayAudioResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "ServerCallRestClient-PlayAudioToParticipant",
      operationOptions
    );

    const request: PlayAudioToParticipantWithCallLocatorRequest = {
      callLocator: callLocator,
      identifier: serializeCommunicationIdentifier(participant),
      audioFileUri: audioUrl,
      loop: restOptions.loop,
      operationContext: restOptions.operationContext,
      audioFileId: restOptions.audioFileId,
      callbackUri: restOptions.callbackUrl
    };

    try {
      const { _response, ...result } = await this.serverCallRestClient.participantPlayAudio(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Add participant to the call using call_locator.
   *
   * @param callLocator - The callLocator contains call id.
   * @param participant - The identifier of the participant.
   * @param callbackUrl - The callback url to receive the notification.
   * @param options - Additional request options contains addParticipant api options.
   */
  public async addParticipant(
    callLocator: CallLocator,
    participant: CommunicationIdentifier,
    callbackUrl: string,
    options: AddParticipantOptions = {}
  ): Promise<AddParticipantResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "ServerCallRestClient-AddParticipant",
      operationOptions
    );
    const alternateCallerId =
      restOptions.alternateCallerId == null
        ? undefined
        : serializeCommunicationIdentifier({
            phoneNumber: restOptions.alternateCallerId.phoneNumber
          }).phoneNumber;

    const request: AddParticipantWithCallLocatorRequest = {
      callLocator: callLocator,
      participant: serializeCommunicationIdentifier(participant),
      alternateCallerId: alternateCallerId,
      operationContext: restOptions?.operationContext,
      callbackUri: callbackUrl
    };

    try {
      const { _response, ...result } = await this.serverCallRestClient.addParticipant(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Remove participant from the call using call_locator.
   *
   * @param callLocator - The callLocator contains call id.
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains removeParticipant api options.
   */
  public async removeParticipant(
    callLocator: CallLocator,
    participant: CommunicationIdentifier,
    options: RemoveParticipantOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-RemoveParticipant", options);

    const request: RemoveParticipantWithCallLocatorRequest = {
      callLocator: callLocator,
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.serverCallRestClient.removeParticipant(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get participants from a server call.
   *
   * @param callLocator - The callLocator contains call id.
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains getParticipant api options.
   */
  public async getParticipant(
    callLocator: CallLocator,
    participant: CommunicationIdentifier,
    options: GetParticipantOptions = {}
  ): Promise<CallParticipant> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-GetParticipant", options);

    const request: GetParticipantWithCallLocatorRequest = {
      callLocator: callLocator,
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      const { _response, ...result } = await this.serverCallRestClient.getParticipant(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get participant from the call using identifier.
   *
   * @param callLocator - The callLocator contains call id.
   * @param options - Additional request options contains getParticipants api options.
   */
  public async getParticipants(
    callLocator: CallLocator,
    options: GetParticipantsOptions = {}
  ): Promise<CallParticipant[]> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-GetParticipants", options);

    const request: GetAllParticipantsWithCallLocatorRequest = {
      callLocator: callLocator
    };

    try {
      const { _response } = await this.serverCallRestClient.getParticipants(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return _response.parsedBody;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancel media operation in the call using call_locator.
   *
   * @param callLocator - The callLocator contains call id.
   * @param mediaOperationId - The operationId of the media operation to cancel.
   * @param options - Additional request options contains cancelMediaOperation api options.
   */
  public async cancelMediaOperation(
    callLocator: CallLocator,
    mediaOperationId: string,
    options: CancelMediaOperationOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "ServerCallRestClient-CancelMediaOperation",
      options
    );

    const request: CancelMediaOperationWithCallLocatorRequest = {
      callLocator: callLocator,
      mediaOperationId: mediaOperationId
    };

    try {
      await this.serverCallRestClient.cancelMediaOperation(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Answer the call.
   *
   * @param incomingCallContext - The context associated with the call.
   * @param options - Additional request options contains answerCall api options.
   */
  public async answerCall(
    incomingCallContext: string,
    options: AnswerCallOptions = {}
  ): Promise<AnswerCallResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "ServerCallRestClient-AnswerCall",
      operationOptions
    );

    const request: AnswerCallRequest = {
      incomingCallContext: incomingCallContext,
      callbackUri: restOptions.callbackUrl,
      requestedCallEvents: restOptions.requestedCallEvents,
      requestedMediaTypes: restOptions.requestedMediaTypes
    };

    try {
      const { _response, ...result } = await this.serverCallRestClient.answerCall(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "ServerCallRestClient-RejectCall",
      operationOptions
    );

    const request: RejectCallRequest = {
      incomingCallContext: incomingCallContext,
      callRejectReason: restOptions.callRejectReason
    };

    try {
      await this.serverCallRestClient.rejectCall(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Reject the call.
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
    const { span, updatedOptions } = createSpan("ServerCallRestClient-RedirectCall", options);

    const request: RedirectCallRequest = {
      incomingCallContext: incomingCallContext,
      target: serializeCommunicationIdentifier(target)
    };

    try {
      await this.serverCallRestClient.redirectCall(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancel media operation of a participant using call_locator.
   *
   * @param callLocator - The callLocator contains call id.
   * @param participant - The identifier of the participant.
   * @param mediaOperationId - The operationId of the media operation to cancel.
   * @param options - Additional request options contains cancelMediaOperation api options.
   */
  public async cancelParticipantMediaOperation(
    callLocator: CallLocator,
    participant: CommunicationIdentifier,
    mediaOperationId: string,
    options: CancelMediaOperationOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "ServerCallRestClient-CancelParticipantMediaOperation",
      options
    );

    const request: CancelParticipantMediaOperationWithCallLocatorRequest = {
      callLocator: callLocator,
      identifier: serializeCommunicationIdentifier(participant),
      mediaOperationId: mediaOperationId
    };

    try {
      await this.serverCallRestClient.cancelParticipantMediaOperation(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Start recording operation using call locator.
   *
   * @param callLocator - The callLocator contains server call id.
   * @param recordingStateCallbackUrl - The call back url for recording state.
   * @param options - Additional request options contains StartRecording api options.
   */
  public async startRecording(
    callLocator: CallLocator,
    recordingStateCallbackUrl: string,
    options: StartRecordingOptions = {}
  ): Promise<StartCallRecordingResult> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-StartRecording", options);

    const startCallRecordingWithCallLocatorRequest: StartCallRecordingWithCallLocatorRequest = {
      callLocator: serializeCallLocator(callLocator),
      recordingStateCallbackUri: recordingStateCallbackUrl,
      ...updatedOptions
    };

    try {
      const { _response, ...result } = await this.serverCallRestClient.startRecording(
        startCallRecordingWithCallLocatorRequest,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Pause recording operation using recording id.
   *
   * @param recordingId - The recording id of the ongoing recording.
   * @param options - Additional request options contains PauseRecording api options.
   */
  public async pauseRecording(
    recordingId: string,
    options: PauseRecordingOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-PauseRecording", options);

    try {
      await this.serverCallRestClient.pauseRecording(
        recordingId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Resume recording operation using recording id.
   *
   * @param recordingId - The recording id of the ongoing recording.
   * @param options - Additional request options contains ResumeRecording api options.
   */
  public async resumeRecording(
    recordingId: string,
    options: ResumeRecordingOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-ResumeRecording", options);

    try {
      await this.serverCallRestClient.resumeRecording(
        recordingId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Stop recording operation using recording id.
   *
   * @param recordingId - The recording id of the ongoing recording.
   * @param options - Additional request options contains StopRecording api options.
   */
  public async stopRecording(
    recordingId: string,
    options: StopRecordingOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-StopRecording", options);

    try {
      await this.serverCallRestClient.stopRecording(
        recordingId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get recording properties using recording id.
   *
   * @param recordingId - The recording id of the ongoing recording.
   * @param options - Additional request options contains GetRecordingState api options.
   */
  public async getRecordingProperties(
    recordingId: string,
    options: GetRecordingPropertiesOptions = {}
  ): Promise<CallRecordingProperties> {
    const { span, updatedOptions } = createSpan(
      "ServerCallRestClient-GetRecordingProperties",
      options
    );

    try {
      const { _response, ...result } = await this.serverCallRestClient.getRecordingProperties(
        recordingId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Downloads the content pointed to the url passed as a parameter.
   *
   * * In Node.js, data returns in a Readable stream readableStreamBody
   * * In browsers, data returns in a promise blobBody
   *
   * @param url - Endpoint where the content exists.
   * @param offset - From which position of the blob to download, greater than or equal to 0.
   * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
   * @param options - Optional options to Download operation.
   *
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Download and convert a blob to a string
   * const downloadResponse = await callingServerClient.download();
   * const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
   * console.log("Downloaded content:", downloaded.toString());
   *
   * async function streamToBuffer(readableStream) {
   * return new Promise((resolve, reject) => {
   * const chunks = [];
   * readableStream.on("data", (data) => {
   * chunks.push(data instanceof Buffer ? data : Buffer.from(data));
   * });
   * readableStream.on("end", () => {
   * resolve(Buffer.concat(chunks));
   * });
   * readableStream.on("error", reject);
   * });
   * }
   * ```
   *
   * Example usage (browser):
   *
   * ```js
   * // Download and convert a content blob to a string
   * const downloadResponse = await callingServerClient.download();
   * const downloaded = await blobToString(await downloadResponse.blobBody);
   * console.log(
   *   "Downloaded blob content",
   *   downloaded
   * );
   *
   * async function blobToString(blob: Blob): Promise<string> {
   *   const fileReader = new FileReader();
   *   return new Promise<string>((resolve, reject) => {
   *     fileReader.onloadend = (ev: any) => {
   *       resolve(ev.target!.result);
   *     };
   *     fileReader.onerror = reject;
   *     fileReader.readAsText(blob);
   *   });
   * }
   * ```
   */
  public async download(
    url: string,
    offset: number = 0,
    options: DownloadOptions = {}
  ): Promise<ContentDownloadResult> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-download", options);
    const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS = 3;
    const contentDownloader = this.initializeContentDownloader();
    try {
      const count = updatedOptions.count;
      const res = await contentDownloader.downloadContent(url, {
        abortSignal: options.abortSignal,
        requestOptions: {
          onDownloadProgress: isNode ? undefined : options.onProgress // for Node.js, progress is reported by RetriableReadableStream
        },
        range: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });

      // Return browser response immediately
      if (!isNode) {
        return res;
      }

      // We support retrying when download stream unexpected ends in Node.js runtime
      if (options.maxRetryRequests === undefined || options.maxRetryRequests < 0) {
        options.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
      }

      if (res.contentLength === undefined) {
        throw new RangeError(`File download response doesn't contain valid content length header`);
      }
      return new RepeatableContentDownloadResult(
        res,
        async (start: number): Promise<NodeJS.ReadableStream> => {
          // Debug purpose only
          // console.log(
          //   `Read from internal stream, range: ${
          //     updatedOptions.range
          //   }, options: ${JSON.stringify(updatedOptions)}`
          // );

          return (
            await contentDownloader.downloadContent(url, {
              abortSignal: options.abortSignal,
              range: rangeToString({
                count: offset + res.contentLength! - start,
                offset: start
              }),
              ...convertTracingToRequestOptionsBase(updatedOptions)
            })
          ).readableStreamBody!;
        },
        offset,
        res.contentLength!,
        {
          maxRetryRequests: options.maxRetryRequests,
          onProgress: options.onProgress
        }
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads a recording content to a local file.
   * Fails if the the given file path already exits.
   * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
   *
   * @param filePath -
   * @param contentUrl - Endpoint where the content exists.
   * @param offset - From which position of the block blob to download.
   * @param options - Options to content download.
   * @returns The response data for content download operation,
   *                                                 but with readableStreamBody set to undefined since its
   *                                                 content is already read and written into a local file
   *                                                 at the specified path.
   */

  public async downloadToFile(
    filePath: string,
    contentUrl: string,
    offset: number = 0,
    options: DownloadOptions = {}
  ): Promise<ContentDownloadResult> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-DownloadToFile", options);
    try {
      const response = await this.download(contentUrl, offset, {
        ...options,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
      if (response.readableStreamBody) {
        await readStreamToLocalFile(response.readableStreamBody, filePath);
      }

      (response as any).blobDownloadStream = undefined;
      return response;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes the content pointed to the url passed as a parameter.
   *
   * * Returns a RestResponse indicating the result of the delete operation.
   *
   * @param deleteUrl - Endpoint where the content exists.
   *
   * Example usage:
   *
   * ```js
   * // Delete content
   * const deleteUrl = "https://deleteUrl.com";
   * const deleteResponse = await callingServerClient.delete(deleteUrl);
   *
   * ```
   */
  public async deleteRecording(
    deleteUrl: string,
    options: DeleteRecordingOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-DeleteRecording", options);

    const operationArguments: OperationArguments = {
      options: operationOptionsToRequestOptionsBase(updatedOptions)
    };

    try {
      const stringToSign = CallingServerUtils.getStringToSign(
        this.storageApiClient.endpoint,
        deleteUrl
      );
      return this.storageApiClient.sendOperationRequest(
        operationArguments,
        getDeleteOperationSpec(deleteUrl, stringToSign)
      ) as Promise<RestResponse>;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

function getDeleteOperationSpec(url: string, stringToSign: string): OperationSpec {
  // Operation Specifications
  const serializer = new Serializer(Mappers, /* isXml */ false);
  const stringToSignHeader = CallingServerUtils.getStringToSignHeader(stringToSign);
  const hostHeader = CallingServerUtils.getMsHostHeaders(stringToSign);

  const deleteOperationSpec: OperationSpec = {
    path: "",
    baseUrl: url,
    httpMethod: "DELETE",
    responses: {
      200: {},
      default: {
        bodyMapper: Mappers.CommunicationErrorResponse
      }
    },
    requestBody: undefined,
    queryParameters: [],
    urlParameters: [],
    headerParameters: [stringToSignHeader, hostHeader],
    serializer
  };

  return deleteOperationSpec;
}
