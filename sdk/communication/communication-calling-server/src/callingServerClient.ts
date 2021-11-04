// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CallConnection, ContentDownloadResponse } from ".";
import { CallConnectionImpl } from "./callConnection";
import {
  CreateCallConnectionOptions,
  DownloadOptions,
  JoinCallOptions,
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
  DeleteOptions
} from "./models";
import { CallConnections, ServerCalls } from "./generated/src/operations";
import {
  CreateCallRequest,
  JoinCallRequest,
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
  CallRecordingProperties
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
import { RepeatableContentDownloadResponse } from "./RepeatableContentDownloadResponse";
import { extractOperationOptions } from "./extractOperationOptions";
import { CallingServerUtils } from "./utils/utils";
import { serializeCallLocator } from "./callLocatorModelSerializer";

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

    const request: CreateCallRequest = {
      source: serializeCommunicationIdentifier(source),
      targets: targets.map((m) => serializeCommunicationIdentifier(m)),
      callbackUri: restOptions.callbackUri,
      requestedMediaTypes: restOptions.requestedMediaTypes,
      requestedCallEvents: restOptions.requestedCallEvents,
      alternateCallerId:
        restOptions.alternateCallerId == null
          ? undefined
          : { value: restOptions.alternateCallerId.phoneNumber },
      subject: restOptions.subject
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
      callbackUri: restOptions.callbackUri,
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
    const { span, updatedOptions } = createSpan("ServerCallRestClient-playAudio", operationOptions);

    const request: PlayAudioWithCallLocatorRequest = {
      callLocator: callLocator,
      audioFileUri: audioUrl,
      loop: restOptions.loop,
      operationContext: restOptions.operationContext,
      audioFileId: restOptions.audioFileId,
      callbackUri: restOptions.callbackUri
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
    const { span, updatedOptions } = createSpan("ServerCallRestClient-playAudio", operationOptions);

    const request: PlayAudioToParticipantWithCallLocatorRequest = {
      callLocator: callLocator,
      identifier: serializeCommunicationIdentifier(participant),
      audioFileUri: audioUrl,
      loop: restOptions.loop,
      operationContext: restOptions.operationContext,
      audioFileId: restOptions.audioFileId,
      callbackUri: restOptions.callbackUri
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
   * @param callbackUri - The callback uri to receive the notification.
   * @param options - Additional request options contains addParticipant api options.
   */
  public async addParticipant(
    callLocator: CallLocator,
    participant: CommunicationIdentifier,
    callbackUri: string,
    options: AddParticipantOptions = {}
  ): Promise<AddParticipantResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("ServerCallRestClient-playAudio", operationOptions);
    const alternate_caller_id =
      typeof restOptions?.alternateCallerId === "undefined"
        ? restOptions?.alternateCallerId
        : serializeCommunicationIdentifier({ phoneNumber: restOptions.alternateCallerId })
            .phoneNumber;

    const request: AddParticipantWithCallLocatorRequest = {
      callLocator: callLocator,
      participant: serializeCommunicationIdentifier(participant),
      alternateCallerId: alternate_caller_id,
      operationContext: restOptions?.operationContext,
      callbackUri: callbackUri
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
    const { span, updatedOptions } = createSpan("ServerCallRestClient-removeParticipant", options);

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
      "ServerCallRestClient-cancelMediaOperation",
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
      "ServerCallRestClient-cancelParticipantMediaOperation",
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
   * @param recordingStateCallbackUri - The call back uri for recording state.
   * @param options - Additional request options contains StartRecording api options.
   */
  public async startRecording(
    callLocator: CallLocator,
    recordingStateCallbackUri: string,
    options: StartRecordingOptions = {}
  ): Promise<StartCallRecordingResult> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-StartRecording", options);

    if (typeof callLocator === "undefined" || !callLocator) {
      throw new Error("callLocator is invalid.");
    }

    if (
      typeof recordingStateCallbackUri === "undefined" ||
      !recordingStateCallbackUri ||
      !CallingServerUtils.isValidUrl(recordingStateCallbackUri)
    ) {
      throw new Error("recordingStateCallbackUri is invalid.");
    }

    const startCallRecordingWithCallLocatorRequest: StartCallRecordingWithCallLocatorRequest = {
      callLocator: serializeCallLocator(callLocator),
      recordingStateCallbackUri: recordingStateCallbackUri,
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

    if (typeof recordingId === "undefined" || !recordingId || !recordingId.trim()) {
      throw new Error("recordingId is invalid.");
    }

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

    if (typeof recordingId === "undefined" || !recordingId || !recordingId.trim()) {
      throw new Error("recordingId is invalid.");
    }

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
    if (typeof recordingId === "undefined" || !recordingId || !recordingId.trim()) {
      throw new Error("recordingId is invalid.");
    }

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
    const { span, updatedOptions } = createSpan("ServerCallRestClient-Recording", options);

    if (typeof recordingId === "undefined" || !recordingId || !recordingId.trim()) {
      throw new Error("recordingId is invalid.");
    }

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
   * Downloads the content pointed to the uri passed as a parameter.
   *
   * * In Node.js, data returns in a Readable stream readableStreamBody
   * * In browsers, data returns in a promise blobBody
   *
   * @param uri - Endpoint where the content exists.
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
    uri: string,
    offset: number = 0,
    options: DownloadOptions = {}
  ): Promise<ContentDownloadResponse> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-download", options);
    const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS = 3;
    const contentDownloader = this.initializeContentDownloader();
    try {
      const count = updatedOptions.count;
      const res = await contentDownloader.downloadContent(uri, {
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
      return new RepeatableContentDownloadResponse(
        res,
        async (start: number): Promise<NodeJS.ReadableStream> => {
          // Debug purpose only
          // console.log(
          //   `Read from internal stream, range: ${
          //     updatedOptions.range
          //   }, options: ${JSON.stringify(updatedOptions)}`
          // );

          return (
            await contentDownloader.downloadContent(uri, {
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
   * Deletes the content pointed to the uri passed as a parameter.
   *
   * * Returns a RestResponse indicating the result of the delete operation.
   *
   * @param deleteUri - Endpoint where the content exists.
   *
   * Example usage:
   *
   * ```js
   * // Delete content
   * const deleteUri = "https://deleteUri.com";
   * const deleteResponse = await callingServerClient.delete(deleteUri);
   *
   * ```
   */
  public async delete(deleteUri: string, options: DeleteOptions = {}): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-delete", options);

    const operationArguments: OperationArguments = {
      options: operationOptionsToRequestOptionsBase(updatedOptions)
    };

    try {
      const stringToSign = CallingServerUtils.getStringToSign(
        this.storageApiClient.endpoint,
        deleteUri
      );
      return this.storageApiClient.sendOperationRequest(
        operationArguments,
        getDeleteOperationSpec(deleteUri, stringToSign)
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
