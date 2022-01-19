// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CallConnections } from "./generated/src/operations";
import {
  PlayAudioRequest,
  PlayAudioResult,
  AddParticipantRequest,
  AddParticipantResult,
  RemoveParticipantRequest,
  MuteParticipantRequest,
  UnmuteParticipantRequest,
  GetParticipantRequest,
  PlayAudioToParticipantRequest,
  CancelParticipantMediaOperationRequest,
  TransferToParticipantRequest,
  TransferToCallRequest,
  CallParticipant,
  CallConnectionProperties,
  AudioRoutingMode,
  AudioGroupRequest,
  CreateAudioGroupResult,
  AudioGroupResult,
  UpdateAudioGroupRequest,
  RemoveFromDefaultAudioGroupRequest,
  AddToDefaultAudioGroupRequest,
  TransferCallResult
} from "./generated/src/models";
import {
  HangUpOptions,
  DeleteOptions,
  PlayAudioOptions,
  PlayAudioToParticipantOptions,
  CancelAllMediaOperationsOptions,
  AddParticipantOptions,
  RemoveParticipantOptions,
  MuteParticipantOptions,
  UnmuteParticipantOptions,
  GetParticipantOptions,
  GetParticipantsOptions,
  CancelMediaOperationOptions,
  TransferToParticipantOptions,
  TransferToCallOptions,
  KeepAliveOptions,
  GetCallOptions,
  CreateAudioGroupOptions,
  DeleteAudioGroupOptions,
  GetAudioGroupsOptions,
  UpdateAudioGroupOptions,
  RemoveFromDefaultAudioGroupOptions,
  AddToDefaultAudioGroupOptions
} from "./models";
import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier
} from "@azure/communication-common";

import { createSpan } from "./tracing";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { extractOperationOptions } from "./extractOperationOptions";

/**
 * A CallConnection interface represents call connection based APIs.
 */
export interface CallConnection {
  /**
   * Returns the call connection id.
   */
  readonly callConnectionId: string;

  /**
   * Disconnect the current caller in a group-call or end a p2p-call.
   *
   * @param options - Additional request options contains hangUp api options.
   */
  hangUp(options?: HangUpOptions): Promise<void>;

  /**
   * Terminates the conversation for all participants in the call.
   *
   * @param options - Additional request options contains delete api options.
   */
  delete(options?: DeleteOptions): Promise<void>;

  /**
   * Keep the call alive.
   *
   * @param options - Additional request options contains keepAlive api options.
   */
  keepAlive(options?: KeepAliveOptions): Promise<void>;

  /**
   * Cancel all media operations in the call.
   *
   * @param options - Additional request options contains hangUp api options.
   */
  cancelAllMediaOperations(options?: CancelAllMediaOperationsOptions): Promise<void>;

  /**
   * Play audio.
   *
   * @param audioUrl - The audio resource url.
   * @param options - Additional request options contains playAudio api options.
   */
  playAudio(audioUrl: string, options: PlayAudioOptions): Promise<PlayAudioResult>;

  /**
   * Add participant to the call.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains addParticipant api options.
   */
  addParticipant(
    participant: CommunicationIdentifier,
    options?: AddParticipantOptions
  ): Promise<AddParticipantResult>;

  /**
   * Remove participant from the call.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains removeParticipant api options.
   */
  removeParticipant(
    participant: CommunicationIdentifier,
    options?: RemoveParticipantOptions
  ): Promise<void>;

  /**
   * Mute the participant.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains muteParticipant api options.
   */
  muteParticipant(
    participant: CommunicationIdentifier,
    options?: MuteParticipantOptions
  ): Promise<void>;

  /**
   * Unmute the participant.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains unmuteParticipant api options.
   */
  unmuteParticipant(
    participant: CommunicationIdentifier,
    options?: UnmuteParticipantOptions
  ): Promise<void>;

  /**
   * Get participant from the call using identifier.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains getParticipant api options.
   */
  getParticipant(
    participant: CommunicationIdentifier,
    options?: GetParticipantOptions
  ): Promise<CallParticipant>;

  /**
   * Get participants from a call.
   *
   * @param options - Additional request options contains getParticipants api options.
   */
  getParticipants(options?: GetParticipantsOptions): Promise<CallParticipant[]>;

  /**
   * Play audio to a participant.
   *
   * @param participant - The identifier of the participant.
   * @param audioUrl - The audio resource url.
   * @param options - Additional request options contains playAudioToParticipant api options.
   */
  playAudioToParticipant(
    participant: CommunicationIdentifier,
    audioUrl: string,
    options: PlayAudioOptions
  ): Promise<PlayAudioResult>;

  /**
   * Cancel media operation of a participant.
   *
   * @param participant - The identifier of the participant.
   * @param mediaOperationId - The operationId of the media operation to cancel.
   * @param options - Additional request options contains cancelMediaOperation api options.
   */
  cancelParticipantMediaOperation(
    participant: CommunicationIdentifier,
    mediaOperationId: string,
    options?: CancelMediaOperationOptions
  ): Promise<void>;

  /**
   * Transfer the call to a participant.
   *
   * @param targetParticipant - The target participant.
   * @param options - Additional request options contains transferToParticipant api options.
   */
  transferToParticipant(
    targetParticipant: CommunicationIdentifier,
    options?: TransferToParticipantOptions
  ): Promise<TransferCallResult>;

  /**
   * Transfer the current call to another call.
   *
   * @param targetCallConnectionId - The target call connection id to transfer to.
   * @param options - Additional request options contains transferToCall api options.
   */
  transferToCall(
    targetCallConnectionId: string,
    options?: TransferToCallOptions
  ): Promise<TransferCallResult>;

  /**
   * Get CallConnectionProperties of this CallConnection.
   *
   * @param options - Additional request options contains getCall api options.
   */
  getCall(options?: GetCallOptions): Promise<CallConnectionProperties>;

  /**
   * Create audio group in a call.
   *
   * @param audioRoutingMode - The audio routing mode.
   * @param target - The target identities that would be receivers in the audio group.
   * @param options - Additional request options contains createAudioGroup api options.
   */
  createAudioGroup(
    audioRoutingMode: AudioRoutingMode,
    targets: CommunicationIdentifier[],
    options: CreateAudioGroupOptions
  ): Promise<CreateAudioGroupResult>;

  /**
   * Delete audio group from a call.
   *
   * @param audioGroupId - The audio group id.
   * @param options - Additional request options contains deleteAudioGroup api options.
   */
  deleteAudioGroup(
    audioGroupId: string,
    options: DeleteAudioGroupOptions
  ): Promise<void>;

  /**
   * List audio groups in a call.
   *
   * @param audioGroupId - The audio group id.
   * @param options - Additional request options contains getAudioGroups api options.
   */
  getAudioGroups(
    audioGroupId: string,
    options: GetAudioGroupsOptions
  ): Promise<AudioGroupResult>;

  /**
   * Update audio group.
   *
   * @param audioGroupId - The audio group id.
   * @param targets - The target identities that would be receivers in the audio group.
   * @param options - Additional request options contains updateAudioGroup api options.
   */
  updateAudioGroup(
    audioGroupId: string,
    targets: CommunicationIdentifier[],
    options: UpdateAudioGroupOptions
  ): Promise<void>;

  /**
   * Removes the participant from the meeting's default audio mix
   * so the participant does not hear anything from the meeting and cannot add audio into the meeting.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains removeFromDefaultAudioGroupAudio api options.
   */
   removeFromDefaultAudioGroup(
    participant: CommunicationIdentifier,
    options: RemoveFromDefaultAudioGroupOptions
  ): Promise<void>;

  /**
   * Adds the participant back into the meeting's default audio mix
   * so the participant begins to hear everything from the meeting and can add audio into the meeting.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains addToDefaultAudioGroupAudio api options.
   */
   addToDefaultAudioGroup(
    participant: CommunicationIdentifier,
    options: AddToDefaultAudioGroupOptions
  ): Promise<void>;
}

/**
 * The client to do call connection operations
 */
export class CallConnectionImpl implements CallConnection {
  public readonly callConnectionId: string;
  private readonly callConnectionRestClient: CallConnections;

  constructor(callConnectionId: string, callConnectionRestClient: CallConnections) {
    this.callConnectionId = callConnectionId;
    this.callConnectionRestClient = callConnectionRestClient;
  }

  /**
   * Disconnect the current caller in a group-call or end a p2p-call.
   *
   * @param options - Additional request options contains hangUp api options.
   */
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

  /**
   * Terminates the conversation for all participants in the call.
   *
   * @param options - Additional request options contains delete api options.
   */
  public async delete(options: DeleteOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-Delete", options);

    try {
      await this.callConnectionRestClient.deleteCall(
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

  /**
   * Keep the call alive.
   *
   * @param options - Additional request options contains keepAlive api options.
   */
  public async keepAlive(options: KeepAliveOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-KeepAlive", options);

    try {
      await this.callConnectionRestClient.keepAlive(
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

  /**
   * Cancel all media operations in the call.
   *
   * @param options - Additional request options contains cancelAllMediaOperations api options.
   */
  public async cancelAllMediaOperations(
    options: CancelAllMediaOperationsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-CancelAllMediaOperations",
      options
    );

    try {
      await this.callConnectionRestClient.cancelAllMediaOperations(
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

  /**
   * Play audio.
   *
   * @param audioUrl - The audio resource url.
   * @param options - Additional request options contains playAudio api options.
   */
  public async playAudio(audioUrl: string, options: PlayAudioOptions): Promise<PlayAudioResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-PlayAudio",
      operationOptions
    );

    const request: PlayAudioRequest = {
      audioFileUri: audioUrl,
      loop: restOptions.loop,
      operationContext: restOptions.operationContext,
      audioFileId: restOptions.audioFileId
    };
    try {
      const { _response, ...result } = await this.callConnectionRestClient.playAudio(
        this.callConnectionId,
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
   * Add participant to the call.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains addParticipant api options.
   */
  public async addParticipant(
    participant: CommunicationIdentifier,
    options: AddParticipantOptions = {}
  ): Promise<AddParticipantResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-AddParticipant",
      operationOptions
    );
    const alternateCallerId =
      restOptions.alternateCallerId == null
        ? undefined
        : serializeCommunicationIdentifier({
            phoneNumber: restOptions.alternateCallerId.phoneNumber
          }).phoneNumber;

    const request: AddParticipantRequest = {
      participant: serializeCommunicationIdentifier(participant),
      alternateCallerId: alternateCallerId,
      operationContext: restOptions?.operationContext
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.addParticipant(
        this.callConnectionId,
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
   * Remove participant from the call.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains removeParticipant api options.
   */
  public async removeParticipant(
    participant: CommunicationIdentifier,
    options: RemoveParticipantOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-RemoveParticipant",
      options
    );

    const request: RemoveParticipantRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.callConnectionRestClient.removeParticipant(
        this.callConnectionId,
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
   * Mute the participant.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains muteParticipant api options.
   */
  public async muteParticipant(
    participant: CommunicationIdentifier,
    options: MuteParticipantOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-MuteParticipant",
      options
    );

    const request: MuteParticipantRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.callConnectionRestClient.muteParticipant(
        this.callConnectionId,
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
   * Unmute the participant.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains unmuteParticipant api options.
   */
  public async unmuteParticipant(
    participant: CommunicationIdentifier,
    options: UnmuteParticipantOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-UnmuteParticipant",
      options
    );

    const request: UnmuteParticipantRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.callConnectionRestClient.unmuteParticipant(
        this.callConnectionId,
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
   * Get participant from the call using identifier.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains getParticipant api options.
   */
  public async getParticipant(
    participant: CommunicationIdentifier,
    options: GetParticipantOptions = {}
  ): Promise<CallParticipant> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-GetParticipant", options);

    const request: GetParticipantRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.getParticipant(
        this.callConnectionId,
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
   * Get participants from a call.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains getParticipants api options.
   */
  public async getParticipants(options: GetParticipantsOptions = {}): Promise<CallParticipant[]> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-GetParticipants",
      options
    );

    try {
      const { _response } = await this.callConnectionRestClient.getParticipants(
        this.callConnectionId,
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
   * Play audio to a participant.
   *
   * @param participant - The identifier of the participant.
   * @param audioUrl - The audio resource url.
   * @param options - Additional request options contains playAudioToParticipant api options.
   */
  public async playAudioToParticipant(
    participant: CommunicationIdentifier,
    audioUrl: string,
    options: PlayAudioToParticipantOptions
  ): Promise<PlayAudioResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-PlayAudioToParticipant",
      operationOptions
    );

    const request: PlayAudioToParticipantRequest = {
      identifier: serializeCommunicationIdentifier(participant),
      audioFileUri: audioUrl,
      loop: restOptions.loop,
      operationContext: restOptions.operationContext,
      audioFileId: restOptions.audioFileId
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.participantPlayAudio(
        this.callConnectionId,
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
   * Cancel media operation of a participant.
   *
   * @param participant - The identifier of the participant.
   * @param mediaOperationId - The operationId of the media operation to cancel.
   * @param options - Additional request options contains cancelParticipantMediaOperation api options.
   */
  public async cancelParticipantMediaOperation(
    participant: CommunicationIdentifier,
    mediaOperationId: string,
    options: CancelMediaOperationOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-CancelParticipantMediaOperation",
      options
    );

    const request: CancelParticipantMediaOperationRequest = {
      identifier: serializeCommunicationIdentifier(participant),
      mediaOperationId: mediaOperationId
    };

    try {
      await this.callConnectionRestClient.cancelParticipantMediaOperation(
        this.callConnectionId,
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
   * Transfer the call to a participant.
   *
   * @param targetParticipant - The target participant.
   * @param options - Additional request options contains transferToParticipant api options.
   */
  public async transferToParticipant(
    targetParticipant: CommunicationIdentifier,
    options: TransferToParticipantOptions = {}
  ): Promise<TransferCallResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-TransferToParticipant",
      operationOptions
    );

    const alternateCallerId =
      restOptions.alternateCallerId == null
        ? undefined
        : serializeCommunicationIdentifier({
            phoneNumber: restOptions.alternateCallerId.phoneNumber
          }).phoneNumber;

    const request: TransferToParticipantRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      alternateCallerId: alternateCallerId,
      userToUserInformation: restOptions.userToUserInformation,
      operationContext: restOptions.operationContext
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.transferToParticipant(
        this.callConnectionId,
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
   * Transfer the current call to another call.
   *
   * @param targetCallConnectionId - The target call connection id to transfer to.
   * @param options - Additional request options contains transferToCall api options.
   */
  public async transferToCall(
    targetCallConnectionId: string,
    options: TransferToCallOptions = {}
  ): Promise<TransferCallResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-TransferToCall",
      operationOptions
    );

    const request: TransferToCallRequest = {
      targetCallConnectionId: targetCallConnectionId,
      userToUserInformation: restOptions.userToUserInformation,
      operationContext: restOptions.operationContext
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.transferToCall(
        this.callConnectionId,
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
   * Get CallConnectionProperties of this CallConnection.
   *
   * @param options - Additional request options contains getCall api options.
   */
  public async getCall(options: GetCallOptions = {}): Promise<CallConnectionProperties> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-GetCall", options);

    try {
      const { _response, ...result } = await this.callConnectionRestClient.getCall(
        this.callConnectionId,
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
   * Create audio group in a call.
   *
   * @param audioRoutingMode - The audio routing mode.
   * @param target - The target identities that would be receivers in the audio group.
   * @param options - Additional request options contains createAudioGroup api options.
   */
  public async createAudioGroup(
    audioRoutingMode: AudioRoutingMode,
    targets: CommunicationIdentifier[],
    options: CreateAudioGroupOptions = {}
  ): Promise<CreateAudioGroupResult> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-CreateAudioGroup",
      options
    );

    const request: AudioGroupRequest = {
      audioRoutingMode: audioRoutingMode,
      targets: targets.map((m) => serializeCommunicationIdentifier(m))
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.createAudioGroup(
        this.callConnectionId,
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
   * Delete audio group from a call.
   *
   * @param audioGroupId - The audio group id.
   * @param options - Additional request options contains deleteAudioGroup api options.
   */
  public async deleteAudioGroup(
    audioGroupId: string,
    options: DeleteAudioGroupOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-DeleteAudioGroup",
      options
    );

    try {
      await this.callConnectionRestClient.deleteAudioGroup(
        this.callConnectionId,
        audioGroupId,
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
   * List audio groups in a call.
   *
   * @param audioGroupId - The audio group id.
   * @param options - Additional request options contains getAudioGroups api options.
   */
  public async getAudioGroups(
    audioGroupId: string,
    options: GetAudioGroupsOptions = {}
  ): Promise<AudioGroupResult> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-GetAudioGroups",
      options
    );

    try {
      const { _response, ...result } = await this.callConnectionRestClient.getAudioGroups(
        this.callConnectionId,
        audioGroupId,
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
   * Update audio group.
   *
   * @param audioGroupId - The audio group id.
   * @param targets - The target identities that would be receivers in the audio group.
   * @param options - Additional request options contains updateAudioGroup api options.
   */
  public async updateAudioGroup(
    audioGroupId: string,
    targets: CommunicationIdentifier[],
    options: UpdateAudioGroupOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-UpdateAudioGroup",
      options
    );

    const request: UpdateAudioGroupRequest = {
      targets: targets.map((m) => serializeCommunicationIdentifier(m))
    };

    try {
      await this.callConnectionRestClient.updateAudioGroup(
        this.callConnectionId,
        audioGroupId,
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
   * Removes the participant from the meeting's default audio mix
   * so the participant does not hear anything from the meeting and cannot add audio into the meeting.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains removeFromDefaultAudioGroupAudio api options.
   */
  public async removeFromDefaultAudioGroup(
    participant: CommunicationIdentifier,
    options: RemoveFromDefaultAudioGroupOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-UpdateAudioGroup",
      options
    );

    const request: RemoveFromDefaultAudioGroupRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.callConnectionRestClient.removeParticipantFromDefaultAudioGroup(
        this.callConnectionId,
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
   * Adds the participant back into the meeting's default audio mix
   * so the participant begins to hear everything from the meeting and can add audio into the meeting.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains addToDefaultAudioGroupAudio api options.
   */
  public async addToDefaultAudioGroup(
    participant: CommunicationIdentifier,
    options: AddToDefaultAudioGroupOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-AddToDefaultAudioGroupAudio",
      options
    );

    const request: AddToDefaultAudioGroupRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.callConnectionRestClient.addParticipantToDefaultAudioGroup(
        this.callConnectionId,
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
