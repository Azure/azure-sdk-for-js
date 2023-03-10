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

/**
 * CallConnection class represents call connection based APIs.
 */
export class CallConnection {
  private readonly callConnectionId: string;
  private readonly callConnectionImpl: CallConnectionImpl;
  private readonly callMediaImpl: CallMediaImpl;

  constructor(
    callConnectionId: string,
    callConnectionImpl: CallConnectionImpl,
    callMediaImpl: CallMediaImpl
  ) {
    this.callConnectionId = callConnectionId;
    this.callConnectionImpl = callConnectionImpl;
    this.callMediaImpl = callMediaImpl;
  }

  /**
   * Initializes a new instance of CallMedia.
   */
  public getCallMedia(): CallMedia {
    return new CallMedia(this.callConnectionId, this.callMediaImpl);
  }

  /**
   * Get call connection properties of the call
   */
  public async getCallConnectionProperties(
    options: GetCallConnectionPropertiesOptions = {}
  ): Promise<CallConnectionProperties> {
    const result = await this.callConnectionImpl.getCall(this.callConnectionId, options);
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
    return callConnectionProperties;
  }

  /**
   * Hang up the call for itself or terminate the whole call.
   *
   * @param isForEveryOne - Determine if every one in the call would be hung up or not.
   */
  public async hangUp(isForEveryOne: boolean, options: HangUpOptions = {}): Promise<void> {
    if (isForEveryOne) {
      await this.callConnectionImpl.terminateCall(this.callConnectionId, options);
    } else {
      await this.callConnectionImpl.hangupCall(this.callConnectionId, options);
    }
    return;
  }

  /**
   * Get a participant from the call
   *
   * @param participantMri - The MRI of requested participant.
   */
  public async getParticipant(
    participantMri: string,
    options: GetParticipantOptions = {}
  ): Promise<CallParticipant> {
    const result = await this.callConnectionImpl.getParticipant(
      this.callConnectionId,
      participantMri,
      options
    );
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
    const result = await this.callConnectionImpl.getParticipants(this.callConnectionId, options);
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
    participant: CallInvite,
    options: AddParticipantOptions = {}
  ): Promise<AddParticipantResult> {
    const addParticipantRequest: AddParticipantRequest = {
      participantToAdd: communicationIdentifierModelConverter(participant.target),
      sourceCallerIdNumber: PhoneNumberIdentifierModelConverter(participant.sourceCallIdNumber),
      sourceDisplayName: participant.sourceDisplayName,
      invitationTimeoutInSeconds: options.invitationTimeoutInSeconds,
      operationContext: options.operationContext,
      customContext: {
        sipHeaders: participant.sipHeaders,
        voipHeaders: participant.voipHeaders,
      },
    };

    const result = await this.callConnectionImpl.addParticipant(
      this.callConnectionId,
      addParticipantRequest,
      options
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
   * @param target - The target is going to be transferred to.
   */
  public async transferCallToParticipant(
    target: CallInvite,
    options: TransferCallToParticipantOptions = {}
  ): Promise<TransferCallResult> {
    const transferToParticipantRequest: TransferToParticipantRequest = {
      targetParticipant: communicationIdentifierModelConverter(target.target),
      transfereeCallerId: PhoneNumberIdentifierModelConverter(target.sourceCallIdNumber),
      operationContext: options.operationContext,
      customContext: {
        sipHeaders: target.sipHeaders,
        voipHeaders: target.voipHeaders,
      },
    };

    const result = await this.callConnectionImpl.transferToParticipant(
      this.callConnectionId,
      transferToParticipantRequest,
      options
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

    const result = await this.callConnectionImpl.removeParticipant(
      this.callConnectionId,
      removeParticipantRequest,
      options
    );
    const removeParticipantsResult: RemoveParticipantsResult = {
      ...result,
    };
    return removeParticipantsResult;
  }
}
