// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";
import { CallMedia } from "./callMedia";
import {
  AddParticipantRequest,
  RemoveParticipantRequest,
  TransferToParticipantRequest,
} from "./generated/src";
import { CallConnectionImpl, CallMediaImpl } from "./generated/src/operations";
import { CallConnectionProperties, CallInvite, CallParticipant } from "./models/models";
import {
  AddParticipantOptions,
  GetCallConnectionPropertiesOptions,
  GetParticipantOptions,
  HangUpOptions,
  RemoveParticipantsOptions,
  TransferCallToParticipantOptions,
} from "./models/options";
import {
  ListParticipantsResult,
  TransferCallResult,
  AddParticipantResult,
  RemoveParticipantsResult,
} from "./models/responses";
import {
  callParticipantConverter,
  communicationIdentifierConverter,
  communicationIdentifierModelConverter,
  phoneNumberIdentifierConverter,
  PhoneNumberIdentifierModelConverter,
} from "./utli/converters";
import { v4 as uuidv4 } from "uuid";

/**
 * CallConnection class represents call connection based APIs.
 */
export class CallConnection {
  private readonly callConnectionId: string;
  private readonly callConnection: CallConnectionImpl;
  private readonly callMedia: CallMediaImpl;

  constructor(
    callConnectionId: string,
    callConnection: CallConnectionImpl,
    callMedia: CallMediaImpl
  ) {
    this.callConnectionId = callConnectionId;
    this.callConnection = callConnection;
    this.callMedia = callMedia;
  }

  /**
   * Initializes a new instance of CallMedia.
   */
  public getCallMedia(): CallMedia {
    return new CallMedia(this.callConnectionId, this.callMedia);
  }

  /**
   * Get call connection properties of the call
   */
  public async getCallConnectionProperties(
    options: GetCallConnectionPropertiesOptions = {}
  ): Promise<CallConnectionProperties> {
    const result = await this.callConnection.getCall(this.callConnectionId, options);
    const callConnectionProperties: CallConnectionProperties = {
      ...result,
      sourceIdentity: result.sourceIdentity
        ? communicationIdentifierConverter(result.sourceIdentity)
        : undefined,
      targetParticipants: result.targets?.map((target) => communicationIdentifierConverter(target)),
      sourceCallerIdNumber: result.sourceCallerIdNumber
        ? phoneNumberIdentifierConverter(result.sourceCallerIdNumber)
        : undefined,
    };
    return callConnectionProperties;
  }

  /**
   * Hang up the call for itself or terminate the whole call.
   *
   * @param isForEveryOne - Determine if every one in the call would be hung up or not.
   */
  public async hangUp(isForEveryone: boolean, options: HangUpOptions = {}): Promise<void> {
    if (isForEveryone) {
      const optionsInternal = {
        ...options,
        repeatabilityFirstSent: new Date().toUTCString(),
        repeatabilityRequestID: uuidv4(),
      };
      await this.callConnection.terminateCall(this.callConnectionId, optionsInternal);
    } else {
      await this.callConnection.hangupCall(this.callConnectionId, options);
    }
    return;
  }

  /**
   * Get a participant from the call
   *
   * @param targetParticipant - The communication identifier of requested participant.
   */
  public async getParticipant(
    targetParticipant: CommunicationIdentifier,
    options: GetParticipantOptions = {}
  ): Promise<CallParticipant> {
    const rawId: string = communicationIdentifierModelConverter(targetParticipant).rawId || "";
    if (!rawId) throw Error("Invalid targetParticipant");

    const result = await this.callConnection.getParticipant(this.callConnectionId, rawId, options);
    const callParticipant: CallParticipant = {
      identifier: result.identifier
        ? communicationIdentifierConverter(result.identifier)
        : undefined,
      isMuted: result.isMuted,
    };
    return callParticipant;
  }

  /**
   * Get all participants from the call
   */
  public async listParticipants(
    options: GetParticipantOptions = {}
  ): Promise<ListParticipantsResult> {
    const result = await this.callConnection.getParticipants(this.callConnectionId, options);
    const listParticipantResponse: ListParticipantsResult = {
      ...result,
      values: result?.values?.map((acsCallParticipant) =>
        callParticipantConverter(acsCallParticipant)
      ),
    };
    return listParticipantResponse;
  }

  /**
   * Add a participant to the call
   *
   * @param participant - The participant is going to be added.
   */
  public async addParticipant(
    targetParticipant: CallInvite,
    options: AddParticipantOptions = {}
  ): Promise<AddParticipantResult> {
    const addParticipantRequest: AddParticipantRequest = {
      participantToAdd: communicationIdentifierModelConverter(targetParticipant.targetParticipant),
      sourceCallerIdNumber: PhoneNumberIdentifierModelConverter(
        targetParticipant.sourceCallIdNumber
      ),
      sourceDisplayName: targetParticipant.sourceDisplayName,
      invitationTimeoutInSeconds: options.invitationTimeoutInSeconds,
      operationContext: options.operationContext,
      customContext: {
        sipHeaders: targetParticipant.sipHeaders,
        voipHeaders: targetParticipant.voipHeaders,
      },
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date().toUTCString(),
      repeatabilityRequestID: uuidv4(),
    };
    const result = await this.callConnection.addParticipant(
      this.callConnectionId,
      addParticipantRequest,
      optionsInternal
    );
    const addParticipantsResult: AddParticipantResult = {
      ...result,
      participant: {
        ...result.participant,
        identifier: result.participant?.identifier
          ? communicationIdentifierConverter(result.participant?.identifier)
          : undefined,
      },
    };
    return addParticipantsResult;
  }

  /**
   * Transfer the call to a target participant
   *
   * @param targetParticipant - The target to be transferred to.
   */
  public async transferCallToParticipant(
    targetParticipant: CallInvite,
    options: TransferCallToParticipantOptions = {}
  ): Promise<TransferCallResult> {
    const transferToParticipantRequest: TransferToParticipantRequest = {
      targetParticipant: communicationIdentifierModelConverter(targetParticipant.targetParticipant),
      operationContext: options.operationContext,
      customContext: {
        sipHeaders: targetParticipant.sipHeaders,
        voipHeaders: targetParticipant.voipHeaders,
      },
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date().toUTCString(),
      repeatabilityRequestID: uuidv4(),
    };
    const result = await this.callConnection.transferToParticipant(
      this.callConnectionId,
      transferToParticipantRequest,
      optionsInternal
    );
    const transferCallResult: TransferCallResult = { ...result };
    return transferCallResult;
  }

  /**
   * Remove a participant from the call
   *
   * @param participant - The participant is going to be removed from the call.
   */
  public async removeParticipant(
    participant: CommunicationIdentifier,
    options: RemoveParticipantsOptions = {}
  ): Promise<RemoveParticipantsResult> {
    const removeParticipantRequest: RemoveParticipantRequest = {
      participantToRemove: communicationIdentifierModelConverter(participant),
      operationContext: options.operationContext,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date().toUTCString(),
      repeatabilityRequestID: uuidv4(),
    };
    const result = await this.callConnection.removeParticipant(
      this.callConnectionId,
      removeParticipantRequest,
      optionsInternal
    );
    const removeParticipantsResult: RemoveParticipantsResult = {
      ...result,
    };
    return removeParticipantsResult;
  }
}
