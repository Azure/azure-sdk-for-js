// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  RestResponse
} from "@azure/core-http";
import { ServerCalls } from "./generated/src/operations";
import { PlayAudioOptions } from "./models";
import {
  PlayAudioResult
} from "./models";
import { createSpan } from "./tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  AddParticipantRequest,
  CallConnectionsAddParticipantResponse,
  CommunicationIdentifierModel,
  PhoneNumberIdentifierModel,
  PlayAudioRequest,
  JoinCallRequest,
  EventSubscriptionType,
  MediaType,
  ServerCallsJoinCallResponse,
  CallRecordingProperties,
  StartCallRecordingRequest,
  StartCallRecordingResult
} from "./generated/src/models";


/**
 * The client to do call connection operations
 */
export class ServerCall {
  private readonly serverCallId: string;
  private readonly serverCallRestClient: ServerCalls;

  constructor(
    serverCallId: string,
    serverCallRestClient: ServerCalls,
  ) {
    this.serverCallId = serverCallId;
    this.serverCallRestClient = serverCallRestClient;
  }

  public async playAudio(
    audioFileUri: string,
    audioFileId: string,
    callbackUri: string,
    operationContext?: string,
    options: PlayAudioOptions = {}
  ): Promise<PlayAudioResult> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-PlayAudio", options);

    const request: PlayAudioRequest = {
      audioFileUri: audioFileUri,
      audioFileId: audioFileId,
      callbackUri: callbackUri,
      operationContext: operationContext,
    };

    try {
      const result = await this.serverCallRestClient.playAudio(
        this.serverCallId,
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

  public async startRecording(
    recordingStateCallbackUri: string,
    options: OperationOptions = {}
  ): Promise<StartCallRecordingResult> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-StartRecording", options);

    const request: StartCallRecordingRequest = {
      recordingStateCallbackUri: recordingStateCallbackUri
    };

    if(recordingStateCallbackUri == null) {
      throw new Error('recordingStateCallbackUri cannot be null');
    }
    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
    if(!r.test(recordingStateCallbackUri)) {
      throw new Error('recordingStateCallbackUri has to be an absolute URI');
    }
    
    try {
      const result = await this.serverCallRestClient.startRecording(
        this.serverCallId,
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

  public async pauseRecording(
    recordingId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-PauseRecording", options);

    try {
      var res = await this.serverCallRestClient.pauseRecording(
        this.serverCallId,
        recordingId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      return res

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

  public async resumeRecording(
    recordingId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-ResumeRecording", options);

    try {
      const result = await this.serverCallRestClient.resumeRecording(
        this.serverCallId,
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
  public async stopRecording(
    recordingId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-StopRecording", options);

    try {
      const result = await this.serverCallRestClient.stopRecording(
        this.serverCallId,
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

  public async getRecordingState(
    recordingId: string,
    options: OperationOptions = {}
  ): Promise<CallRecordingProperties> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-Recording", options);

    try {
      const result = await this.serverCallRestClient.getRecordingProperties(
        this.serverCallId,
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

  public async addParticipant(alternateCallerId?: PhoneNumberIdentifierModel,
    participant?: CommunicationIdentifierModel,
    operationContext?: string,
    callbackUri?: string,
    options?: OperationOptions
  ): Promise<CallConnectionsAddParticipantResponse> {

    const { span, updatedOptions } = createSpan("CallConnectionRestClient-addParticipant", options);

    var addParticipantRequest: AddParticipantRequest = {
      alternateCallerId: alternateCallerId,
      participant: participant,
      operationContext: operationContext,
      callbackUri: callbackUri
    };

    try {
      return await this.serverCallRestClient.addParticipant(
        this.serverCallId,
        addParticipantRequest,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    }
    catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async removeParticipant(participantId: string,
    options?: OperationOptions): Promise<RestResponse> {

    const { span, updatedOptions } = createSpan("CallConnectionRestClient-removeParticipant", options);

    try {
      return await this.serverCallRestClient.removeParticipant(
        this.serverCallId,
        participantId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    }
    catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async joinCall(source: CommunicationIdentifierModel,
    callbackUri: string,
    subject?: string,
    requestedMediaTypes?: MediaType[],
    requestedCallEvents?: EventSubscriptionType[],
    options?: OperationOptions): Promise<ServerCallsJoinCallResponse> {

    const { span, updatedOptions } = createSpan("CallConnectionRestClient-joinCall", options);

    var request: JoinCallRequest = {
      source: source,
      subject: subject,
      callbackUri: callbackUri,
      requestedMediaTypes: requestedMediaTypes,
      requestedCallEvents: requestedCallEvents
    }

    try {
      return await this.serverCallRestClient.joinCall(
        this.serverCallId,
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
}
