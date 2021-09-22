// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CallConnections } from "./generated/src/operations";
import { HangUpOptions } from "./models";
import { createSpan } from "./tracing";
import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  RestResponse
} from "@azure/core-http";

import { SpanStatusCode } from "@azure/core-tracing";
import {
  AddParticipantRequest,
  CallConnectionsAddParticipantResponse,
  CallConnectionsCancelAllMediaOperationsResponse,
  CallConnectionsPlayAudioResponse,
  CancelAllMediaOperationsRequest,
  CommunicationIdentifierModel,
  EventSubscriptionType,
  MediaType,
  PhoneNumberIdentifierModel,
  PlayAudioRequest,
  CreateCallRequest,
  CallConnectionsCreateCallResponse
} from "./generated/src/models";

/**
 * The client to do call connection operations
 */
export class CallConnection {
  private readonly callConnectionId: string;
  private readonly callConnectionRestClient: CallConnections;

  constructor(
    callConnectionId: string,
    callConnectionRestClient: CallConnections,
  ) {
    this.callConnectionId = callConnectionId;
    this.callConnectionRestClient = callConnectionRestClient;
  }

  public getCallConnectionId(): string {
    return this.callConnectionId;
  }

  public async createCall(targets: CommunicationIdentifierModel[],
    source: CommunicationIdentifierModel,
    callbackUri: string,
    alternateCallerId?: PhoneNumberIdentifierModel,
    subject?: string,
    requestedMediaTypes?: MediaType[],
    requestedCallEvents?: EventSubscriptionType[],
    options?: OperationOptions): Promise<CallConnectionsCreateCallResponse> {

    const { span, updatedOptions } = createSpan("CallConnectionRestClient-createCall", options);

    var request: CreateCallRequest = {
      alternateCallerId: alternateCallerId,
      targets: targets,
      source: source,
      subject: subject,
      callbackUri: callbackUri,
      requestedMediaTypes: requestedMediaTypes,
      requestedCallEvents: requestedCallEvents
    }

    try {
      return await this.callConnectionRestClient.createCall(
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

  public async hangUp(options: HangUpOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-HangUp", options);

    try {
      await this.callConnectionRestClient.hangupCall(
        this.callConnectionId,
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

  public async playAudio(audioFileUri: string,
    loop: boolean,
    operationContext?: string,
    audioFileId?: string,
    callbackUri?: string,
    options?: OperationOptions): Promise<CallConnectionsPlayAudioResponse> {

    const { span, updatedOptions } = createSpan("CallConnectionRestClient-PlayAudio", options);

    var request: PlayAudioRequest = {
      audioFileUri: audioFileUri,
      loop: loop,
      operationContext: operationContext,
      audioFileId: audioFileId,
      callbackUri: callbackUri
    };

    try {
      return await this.callConnectionRestClient.playAudio(
        this.callConnectionId,
        request,
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

  public async cancelAllMediaOperations(operationContext: string,
    options?: OperationOptions): Promise<CallConnectionsCancelAllMediaOperationsResponse> {

    const { span, updatedOptions } = createSpan("CallConnectionRestClient-cancelAllMediaOperations", options);

    var cancelAllMediaOperationRequest: CancelAllMediaOperationsRequest = { operationContext: operationContext };

    try {
      return await this.callConnectionRestClient.cancelAllMediaOperations(
        this.callConnectionId,
        cancelAllMediaOperationRequest,
        operationOptionsToRequestOptionsBase(updatedOptions));
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

  public async addParticipant(alternateCallerId?: PhoneNumberIdentifierModel,
    participant?: CommunicationIdentifierModel,
    operationContext?: string,
    callbackUri?: string,
    options?: OperationOptions
  ): Promise<CallConnectionsAddParticipantResponse> {

    const { span, updatedOptions } = createSpan("CallConnectionRestClient-addParticipant", options);

    var addParticipantRequest: AddParticipantRequest = {
      alternateCallerId: alternateCallerId,
      participant: participant, operationContext: operationContext, callbackUri: callbackUri
    };

    try {
      return await this.callConnectionRestClient.addParticipant(
        this.callConnectionId,
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
      return await this.callConnectionRestClient.removeParticipant(
        this.callConnectionId,
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
}
