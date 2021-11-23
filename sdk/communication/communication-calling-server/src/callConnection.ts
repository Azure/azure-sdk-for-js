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
  TransferCallRequest,
  CallParticipant,
  CallConnectionProperties,
  AudioRoutingMode,
  AudioRoutingGroupRequest,
  CreateAudioRoutingGroupResult,
  AudioRoutingGroupResult,
  UpdateAudioRoutingGroupRequest,
  HoldMeetingAudioRequest,
  ResumeMeetingAudioRequest,
  TransferCallResult
} from "./generated/src/models";
import {
  HangUpOptions,
  DeleteOptions,
  PlayAudioOptions,
  CancelAllMediaOperationsOptions,
  AddParticipantOptions,
  RemoveParticipantOptions,
  MuteParticipantOptions,
  UnmuteParticipantOptions,
  GetParticipantOptions,
  GetParticipantsOptions,
  CancelMediaOperationOptions,
  TransferCallOptions,
  KeepAliveOptions,
  GetCallOptions,
  CreateAudioRoutingGroupOptions,
  DeleteAudioRoutingGroupOptions,
  GetAudioRoutingGroupsOptions,
  UpdateAudioRoutingGroupOptions,
  HoldParticipantMeetingAudioOptions,
  ResumeParticipantMeetingAudioOptions
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
  getParticipants(
    options?: GetParticipantsOptions
  ): Promise<CallParticipant[]>;

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
   * Transfer a call.
   *
   * @param targetParticipant - The identity of the target where call should be transfer to.
   * @param userToUserInformation - The user to user information.
   * @param options - Additional request options contains transferCall api options.
   */
  transfer(
    targetParticipant: CommunicationIdentifier,
    userToUserInformation: string,
    options?: TransferCallOptions
  ): Promise<TransferCallResult>;

  /**
   * Get CallConnectionProperties of this CallConnection.
   *
   * @param options - Additional request options contains getCall api options.
   */
  getCall(
    options?: GetCallOptions
  ): Promise<CallConnectionProperties>;

  /**
   * Create audio routing group in a call.
   *
   * @param audioRoutingMode - The audio routing mode.
   * @param target - The target identities that would be receivers in the audio routing group.
   * @param options - Additional request options contains createAudioRoutingGroup api options.
   */
  createAudioRoutingGroup(
    audioRoutingMode: AudioRoutingMode,
    targets: CommunicationIdentifier[],
    options: CreateAudioRoutingGroupOptions
  ): Promise<CreateAudioRoutingGroupResult>;

  /**
   * Delete audio routing group from a call.
   *
   * @param audioRoutingGroupId - The audio routing group id.
   * @param options - Additional request options contains deleteAudioRoutingGroup api options.
   */
  deleteAudioRoutingGroup(
    audioRoutingGroupId: string,
    options: DeleteAudioRoutingGroupOptions
  ): Promise<void>;

  /**
   * List audio routing groups in a call.
   *
   * @param audioRoutingGroupId - The audio routing group id.
   * @param options - Additional request options contains getAudioRoutingGroups api options.
   */
  getAudioRoutingGroups(
    audioRoutingGroupId: string,
    options: GetAudioRoutingGroupsOptions
  ): Promise<AudioRoutingGroupResult>;

  /**
   * Update audio routing group.
   *
   * @param audioRoutingGroupId - The audio routing group id.
   * @param targets - The target identities that would be receivers in the audio routing group.
   * @param options - Additional request options contains updateAudioRoutingGroup api options.
   */
  updateAudioRoutingGroup(
    audioRoutingGroupId: string,
    targets: CommunicationIdentifier[],
    options: UpdateAudioRoutingGroupOptions
  ): Promise<void>;

  /**
   * Removes the participant from the meeting's default audio mix
   * so the participant does not hear anything from the meeting and cannot add audio into the meeting.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains holdParticipantMeetingAudio api options.
   */
  holdParticipantMeetingAudio(
    participant: CommunicationIdentifier,
    options: HoldParticipantMeetingAudioOptions
  ): Promise<void>;

  /**
   * Adds the participant back into the meeting's default audio mix
   * so the participant begins to hear everything from the meeting and can add audio into the meeting.
   *
   * @param participant - The identifier of the participant.
   * @param options - Additional request options contains resumeParticipantMeetingAudio api options.
   */
  resumeParticipantMeetingAudio(
    participant: CommunicationIdentifier,
    options: ResumeParticipantMeetingAudioOptions
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
    const alternate_caller_id =
      typeof restOptions?.alternateCallerId === "undefined"
        ? restOptions?.alternateCallerId
        : serializeCommunicationIdentifier({ phoneNumber: restOptions.alternateCallerId })
            .phoneNumber;

    const request: AddParticipantRequest = {
      participant: serializeCommunicationIdentifier(participant),
      alternateCallerId: alternate_caller_id,
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
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-GetParticipant",
      options
    );

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
  public async getParticipants(
    options: GetParticipantsOptions = {}
  ): Promise<CallParticipant[]> {
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-GetParticipants",
      options
    );

    try {
      const { _response, ...result } = await this.callConnectionRestClient.getParticipants(
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
   * Play audio to a participant.
   *
   * @param participant - The identifier of the participant.
   * @param audioUrl - The audio resource url.
   * @param options - Additional request options contains playAudioToParticipant api options.
   */
  public async playAudioToParticipant(
    participant: CommunicationIdentifier,
    audioUrl: string,
    options: PlayAudioOptions
  ): Promise<PlayAudioResult> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan(
      "CallConnectionRestClient-PlayAudio",
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
   * Transfer a call.
   *
   * @param targetParticipant - The identity of the target where call should be transfer to.
   * @param userToUserInformation - The user to user information.
   * @param options - Additional request options contains transfer api options.
   */
  public async transfer(
    targetParticipant: CommunicationIdentifier,
    userToUserInformation: string,
    options: TransferCallOptions = {}
  ): Promise<TransferCallResult> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-TransferCall", options);

    const request: TransferCallRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      userToUserInformation: userToUserInformation
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.transfer(
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
  public async getCall(
    options: GetCallOptions = {}
  ): Promise<CallConnectionProperties> {
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
   * Create audio routing group in a call.
   *
   * @param audioRoutingMode - The audio routing mode.
   * @param target - The target identities that would be receivers in the audio routing group.
   * @param options - Additional request options contains createAudioRoutingGroup api options.
   */
  public async createAudioRoutingGroup(
    audioRoutingMode: AudioRoutingMode,
    targets: CommunicationIdentifier[],
    options: CreateAudioRoutingGroupOptions = {}
  ): Promise<CreateAudioRoutingGroupResult> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-CreateAudioRoutingGroup", options);

    const request: AudioRoutingGroupRequest = {
      audioRoutingMode: audioRoutingMode,
      targets: targets.map((m) => serializeCommunicationIdentifier(m))
    };

    try {
      const { _response, ...result } = await this.callConnectionRestClient.createAudioRoutingGroup(
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
   * Delete audio routing group from a call.
   *
   * @param audioRoutingGroupId - The audio routing group id.
   * @param options - Additional request options contains deleteAudioRoutingGroup api options.
   */
  public async deleteAudioRoutingGroup(
    audioRoutingGroupId: string,
    options: DeleteAudioRoutingGroupOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-DeleteAudioRoutingGroup", options);

    try {
      await this.callConnectionRestClient.deleteAudioRoutingGroup(
        this.callConnectionId,
        audioRoutingGroupId,
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
   * List audio routing groups in a call.
   *
   * @param audioRoutingGroupId - The audio routing group id.
   * @param options - Additional request options contains getAudioRoutingGroups api options.
   */
  public async getAudioRoutingGroups(
    audioRoutingGroupId: string,
    options: GetAudioRoutingGroupsOptions = {}
  ): Promise<AudioRoutingGroupResult> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-GetAudioRoutingGroups", options);

    try {
      const { _response, ...result } = await this.callConnectionRestClient.getAudioRoutingGroups(
        this.callConnectionId,
        audioRoutingGroupId,
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
   * Update audio routing group.
   *
   * @param audioRoutingGroupId - The audio routing group id.
   * @param targets - The target identities that would be receivers in the audio routing group.
   * @param options - Additional request options contains updateAudioRoutingGroup api options.
   */
  public async updateAudioRoutingGroup(
    audioRoutingGroupId: string,
    targets: CommunicationIdentifier[],
    options: UpdateAudioRoutingGroupOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-UpdateAudioRoutingGroup", options);

    const request: UpdateAudioRoutingGroupRequest = {
      targets: targets.map((m) => serializeCommunicationIdentifier(m))
    };

    try {
      await this.callConnectionRestClient.updateAudioRoutingGroup(
        this.callConnectionId,
        audioRoutingGroupId,
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
   * @param options - Additional request options contains holdParticipantMeetingAudio api options.
   */
  public async holdParticipantMeetingAudio(
    participant: CommunicationIdentifier,
    options: HoldParticipantMeetingAudioOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-UpdateAudioRoutingGroup", options);

    const request: HoldMeetingAudioRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.callConnectionRestClient.holdParticipantMeetingAudio(
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
   * @param options - Additional request options contains resumeParticipantMeetingAudio api options.
   */
  public async resumeParticipantMeetingAudio(
    participant: CommunicationIdentifier,
    options: ResumeParticipantMeetingAudioOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-ResumeParticipantMeetingAudio", options);

    const request: ResumeMeetingAudioRequest = {
      identifier: serializeCommunicationIdentifier(participant)
    };

    try {
      await this.callConnectionRestClient.resumeParticipantMeetingAudio(
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
