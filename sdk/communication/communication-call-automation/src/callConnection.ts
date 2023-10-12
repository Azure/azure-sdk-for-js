// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  createCommunicationAuthPolicy,
} from "@azure/communication-common";
import { CallMedia } from "./callMedia";
import {
  AddParticipantRequest,
  CallAutomationApiClient,
  CallAutomationApiClientOptionalParams,
  MuteParticipantsRequest,
  RemoveParticipantRequest,
  TransferToParticipantRequest,
} from "./generated/src";
import { CallConnectionImpl } from "./generated/src/operations";
import { CallConnectionProperties, CallInvite, CallParticipant } from "./models/models";
import {
  AddParticipantOptions,
  CancelAddParticipantOptions,
  GetCallConnectionPropertiesOptions,
  GetParticipantOptions,
  HangUpOptions,
  MuteParticipantOption,
  RemoveParticipantsOption,
  TransferCallToParticipantOptions,
} from "./models/options";
import {
  ListParticipantsResult,
  TransferCallResult,
  AddParticipantResult,
  RemoveParticipantResult,
  MuteParticipantResult,
  CancelAddParticipantResult,
} from "./models/responses";
import {
  callParticipantConverter,
  communicationIdentifierConverter,
  communicationIdentifierModelConverter,
  communicationUserIdentifierConverter,
  phoneNumberIdentifierConverter,
  PhoneNumberIdentifierModelConverter,
} from "./utli/converters";
import { v4 as uuidv4 } from "uuid";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

/**
 * CallConnection class represents call connection based APIs.
 */
export class CallConnection {
  private readonly callConnectionId: string;
  private readonly callConnection: CallConnectionImpl;
  private readonly callAutomationApiClient: CallAutomationApiClient;
  private readonly endpoint: string;
  private readonly credential: TokenCredential | KeyCredential;
  private readonly callAutomationApiClientOptions?: CallAutomationApiClientOptionalParams;
  constructor(
    callConnectionId: string,
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: CallAutomationApiClientOptionalParams
  ) {
    this.callAutomationApiClient = new CallAutomationApiClient(endpoint, options);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
    this.callConnectionId = callConnectionId;
    this.callConnection = new CallConnectionImpl(this.callAutomationApiClient);
    this.endpoint = endpoint;
    this.credential = credential;
    this.callAutomationApiClientOptions = options;
  }

  /**
   * Initializes a new instance of CallMedia.
   */
  public getCallMedia(): CallMedia {
    return new CallMedia(
      this.callConnectionId,
      this.endpoint,
      this.credential,
      this.callAutomationApiClientOptions
    );
  }

  /**
   * Get call connection properties of the call
   */
  public async getCallConnectionProperties(
    options: GetCallConnectionPropertiesOptions = {}
  ): Promise<CallConnectionProperties> {
    const { targets, sourceCallerIdNumber, answeredBy, source, ...result } =
      await this.callConnection.getCall(this.callConnectionId, options);
    const callConnectionProperties: CallConnectionProperties = {
      ...result,
      source: source ? communicationIdentifierConverter(source) : undefined,
      answeredby: communicationUserIdentifierConverter(answeredBy),
      targetParticipants: targets?.map((target) => communicationIdentifierConverter(target)),
      sourceCallerIdNumber: sourceCallerIdNumber
        ? phoneNumberIdentifierConverter(sourceCallerIdNumber)
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
        repeatabilityFirstSent: new Date(),
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
    let rawId: string | undefined = communicationIdentifierModelConverter(targetParticipant).rawId;
    rawId = rawId === undefined ? "" : rawId;

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
    const result = this.callConnection.listParticipants(this.callConnectionId, options);
    const participants = [];
    const pages = result?.byPage();

    for await (const page of pages) {
      for (const participant of page) {
        participants.push(callParticipantConverter(participant));
      }
    }

    const listParticipantResponse: ListParticipantsResult = {
      ...result,
      values: participants,
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
      overrideCallbackUri: options.overrideCallbackUrl,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
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
    targetParticipant: CommunicationIdentifier,
    options: TransferCallToParticipantOptions = {}
  ): Promise<TransferCallResult> {
    const transferToParticipantRequest: TransferToParticipantRequest = {
      targetParticipant: communicationIdentifierModelConverter(targetParticipant),
      operationContext: options.operationContext,
      overrideCallbackUri: options.overrideCallbackUrl,
      transferee: options.transferee && communicationIdentifierModelConverter(options.transferee),
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
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
    options: RemoveParticipantsOption = {}
  ): Promise<RemoveParticipantResult> {
    const removeParticipantRequest: RemoveParticipantRequest = {
      participantToRemove: communicationIdentifierModelConverter(participant),
      operationContext: options.operationContext,
      overrideCallbackUri: options.overrideCallbackUrl,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: uuidv4(),
    };
    const result = await this.callConnection.removeParticipant(
      this.callConnectionId,
      removeParticipantRequest,
      optionsInternal
    );
    const removeParticipantsResult: RemoveParticipantResult = {
      ...result,
    };
    return removeParticipantsResult;
  }

  /**
   * Mute participant from the call.
   *
   * @param participant - Participant to be muted from the call.
   * @param options - Additional attributes for mute participant.
   */
  public async muteParticipant(
    participant: CommunicationIdentifier,
    options: MuteParticipantOption = {}
  ): Promise<MuteParticipantResult> {
    const muteParticipantsRequest: MuteParticipantsRequest = {
      targetParticipants: [communicationIdentifierModelConverter(participant)],
      operationContext: options.operationContext,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: uuidv4(),
    };
    const result = await this.callConnection.mute(
      this.callConnectionId,
      muteParticipantsRequest,
      optionsInternal
    );
    const muteParticipantResult: MuteParticipantResult = {
      ...result,
    };
    return muteParticipantResult;
  }

  /** Cancel add participant request.
   *
   * @param invitationId - Invitation ID used to cancel the add participant request.
   */
  public async cancelAddParticipant(
    invitationId: string,
    options: CancelAddParticipantOptions = {}
  ): Promise<CancelAddParticipantResult> {
    const {
      operationContext,
      overrideCallbackUrl: overrideCallbackUri,
      ...operationOptions
    } = options;
    const cancelAddParticipantRequest = {
      invitationId,
      operationContext: options.operationContext ? options.operationContext : uuidv4(),
      overrideCallbackUri,
    };
    const optionsInternal = {
      ...operationOptions,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: uuidv4(),
    };

    return this.callConnection.cancelAddParticipant(
      this.callConnectionId,
      cancelAddParticipantRequest,
      optionsInternal
    ) as Promise<CancelAddParticipantResult>;
  }
}
