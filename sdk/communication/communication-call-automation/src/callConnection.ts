// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";
import { CallMedia } from "./callMedia";
import {
  AddParticipantRequest,
  CallAutomationApiClient,
  CallAutomationApiClientOptionalParams,
  CustomCallingContextInternal,
  MuteParticipantsRequest,
  RemoveParticipantRequest,
  TransferToParticipantRequest,
} from "./generated/src";
import { CallConnectionImpl } from "./generated/src/operations";
import {
  CallConnectionProperties,
  CallInvite,
  CallParticipant,
  CustomCallingContext,
} from "./models/models";
import {
  AddParticipantOptions,
  CancelAddParticipantOperationOptions,
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
  CancelAddParticipantOperationResult,
} from "./models/responses";
import {
  callParticipantConverter,
  communicationIdentifierConverter,
  communicationIdentifierModelConverter,
  communicationUserIdentifierConverter,
  phoneNumberIdentifierConverter,
  PhoneNumberIdentifierModelConverter,
} from "./utli/converters";
import { randomUUID } from "@azure/core-util";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createCustomCallAutomationApiClient } from "./credential/callAutomationAuthPolicy";

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
    options?: CallAutomationApiClientOptionalParams,
  ) {
    this.callAutomationApiClient = createCustomCallAutomationApiClient(
      credential,
      options,
      endpoint,
    );
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
      this.callAutomationApiClientOptions,
    );
  }

  /**
   * Get call connection properties of the call
   */
  public async getCallConnectionProperties(
    options: GetCallConnectionPropertiesOptions = {},
  ): Promise<CallConnectionProperties> {
    const { targets, sourceCallerIdNumber, answeredBy, source, answeredFor, ...result } =
      await this.callConnection.getCall(this.callConnectionId, options);
    const callConnectionProperties: CallConnectionProperties = {
      ...result,
      source: source ? communicationIdentifierConverter(source) : undefined,
      answeredby: communicationUserIdentifierConverter(answeredBy),
      answeredFor: answeredFor ? phoneNumberIdentifierConverter(answeredFor) : undefined,
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
        repeatabilityRequestID: randomUUID(),
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
    options: GetParticipantOptions = {},
  ): Promise<CallParticipant> {
    let rawId: string | undefined = communicationIdentifierModelConverter(targetParticipant).rawId;
    rawId = rawId === undefined ? "" : rawId;

    const result = await this.callConnection.getParticipant(this.callConnectionId, rawId, options);
    const callParticipant: CallParticipant = {
      identifier: result.identifier
        ? communicationIdentifierConverter(result.identifier)
        : undefined,
      isMuted: result.isMuted,
      isOnHold: result.isOnHold,
    };
    return callParticipant;
  }

  /**
   * Get all participants from the call
   */
  public async listParticipants(
    options: GetParticipantOptions = {},
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

  /**
   * Add a participant to the call
   *
   * @param participant - The participant is going to be added.
   */
  public async addParticipant(
    targetParticipant: CallInvite,
    options: AddParticipantOptions = {},
  ): Promise<AddParticipantResult> {
    const addParticipantRequest: AddParticipantRequest = {
      participantToAdd: communicationIdentifierModelConverter(targetParticipant.targetParticipant),
      sourceCallerIdNumber: PhoneNumberIdentifierModelConverter(
        targetParticipant.sourceCallIdNumber,
      ),
      sourceDisplayName: targetParticipant.sourceDisplayName,
      invitationTimeoutInSeconds: options.invitationTimeoutInSeconds,
      operationContext: options.operationContext,
      operationCallbackUri: options.operationCallbackUrl,
      customCallingContext: this.createCustomCallingContextInternal(
        targetParticipant.customCallingContext!,
      ),
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };
    const result = await this.callConnection.addParticipant(
      this.callConnectionId,
      addParticipantRequest,
      optionsInternal,
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
    options: TransferCallToParticipantOptions = {},
  ): Promise<TransferCallResult> {
    const transferToParticipantRequest: TransferToParticipantRequest = {
      targetParticipant: communicationIdentifierModelConverter(targetParticipant),
      operationContext: options.operationContext,
      operationCallbackUri: options.operationCallbackUrl,
      transferee: options.transferee && communicationIdentifierModelConverter(options.transferee),
      customCallingContext: this.createCustomCallingContextInternal(options.customCallingContext!),
      sourceCallerIdNumber: PhoneNumberIdentifierModelConverter(options.sourceCallIdNumber),
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };
    const result = await this.callConnection.transferToParticipant(
      this.callConnectionId,
      transferToParticipantRequest,
      optionsInternal,
    );
    const transferCallResult: TransferCallResult = {
      ...result,
    };
    return transferCallResult;
  }

  /**
   * Remove a participant from the call
   *
   * @param participant - The participant is going to be removed from the call.
   */
  public async removeParticipant(
    participant: CommunicationIdentifier,
    options: RemoveParticipantsOption = {},
  ): Promise<RemoveParticipantResult> {
    const removeParticipantRequest: RemoveParticipantRequest = {
      participantToRemove: communicationIdentifierModelConverter(participant),
      operationContext: options.operationContext,
      operationCallbackUri: options.operationCallbackUrl,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };
    const result = await this.callConnection.removeParticipant(
      this.callConnectionId,
      removeParticipantRequest,
      optionsInternal,
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
    options: MuteParticipantOption = {},
  ): Promise<MuteParticipantResult> {
    const muteParticipantsRequest: MuteParticipantsRequest = {
      targetParticipants: [communicationIdentifierModelConverter(participant)],
      operationContext: options.operationContext,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };
    const result = await this.callConnection.mute(
      this.callConnectionId,
      muteParticipantsRequest,
      optionsInternal,
    );
    const muteParticipantResult: MuteParticipantResult = {
      ...result,
    };
    return muteParticipantResult;
  }

  /** Cancel add participant operation.
   *
   * @param invitationId - Invitation ID used to cancel the add participant request.
   * @param options - Additional attributes for cancel add participant operation.
   */
  public async cancelAddParticipantOperation(
    invitationId: string,
    options: CancelAddParticipantOperationOptions = {},
  ): Promise<CancelAddParticipantOperationResult> {
    const {
      operationContext,
      operationCallbackUrl: operationCallbackUri,
      ...operationOptions
    } = options;
    const cancelAddParticipantRequest = {
      invitationId,
      operationContext: options.operationContext,
      operationCallbackUri,
    };
    const optionsInternal = {
      ...operationOptions,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };

    const result = await this.callConnection.cancelAddParticipant(
      this.callConnectionId,
      cancelAddParticipantRequest,
      optionsInternal,
    );

    const cancelAddParticipantResult: CancelAddParticipantOperationResult = {
      ...result,
    };

    return cancelAddParticipantResult;
  }
}
