// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";
import { CallMedia } from "./callMedia";
import { AddParticipantsRequest, RemoveParticipantsRequest, TransferToParticipantRequest } from "./generated/src";
import { CallConnectionImpl, CallMediaImpl } from "./generated/src/operations";
import { CallConnectionPropertiesDto, CallParticipant } from "./models/models";
import {
    AddParticipantsOptions,
    GetCallConnectionPropertiesOptions,
    GetParticipantOptions,
    HangUpOptions,
    RemoveParticipantsOptions,
    TransferCallToParticipantOptions
} from "./models/options";
import {
    ListParticipantsResult,
    TransferCallResult,
    AddParticipantsResult,
    RemoveParticipantsResult
} from "./models/responses";
import {
    callParticipantConverter,
    callSourceDtoConverter,
    communicationIdentifierConverter,
    communicationIdentifierModelConverter,
    PhoneNumberIdentifierModelConverter
} from "./utli/converters";

/**
* CallConnection class represents call connection based APIs.
*/
export class CallConnection {
    private readonly callConnectionId: string;
    private readonly callConnectionImpl: CallConnectionImpl;
    private readonly callMediaImpl: CallMediaImpl;

    constructor(callConnectionId: string, callConnectionImpl: CallConnectionImpl, callMediaImpl: CallMediaImpl) {
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
    * Get call connection properties
    */
    public async getCallConnectionProperties(options: GetCallConnectionPropertiesOptions = {}
    ): Promise<CallConnectionPropertiesDto> {
        const result = await this.callConnectionImpl.getCall(this.callConnectionId, options);
        const callConnectionPropertiesDto: CallConnectionPropertiesDto = {
            ...result,
            source: result.source ? callSourceDtoConverter(result.source) : undefined,
            targets: result.targets?.map(target => communicationIdentifierConverter(target))
        }
        return callConnectionPropertiesDto;
    }

    /**
    * Hang up the call for itself or terminate the whole call.
    */
    public async hangUp(
        isForEveryOne: boolean,
        options: HangUpOptions = {}
    ): Promise<void> {
        if (isForEveryOne) {
            await this.callConnectionImpl.terminateCall(this.callConnectionId, options);
        }
        else {
            await this.callConnectionImpl.hangupCall(this.callConnectionId, options);
        }
        return;
    }

    /**
    * Get a participant from the call
    */
    public async getParticipant(
        participantMri: string,
        options: GetParticipantOptions = {}
    ): Promise<CallParticipant> {
        const result = await this.callConnectionImpl.getParticipant(
            this.callConnectionId,
            participantMri,
            options
        )
        const callParticipant: CallParticipant = {
            identifier: result.identifier ? communicationIdentifierConverter(result.identifier) : undefined,
            isMuted: result.isMuted
            }
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
            values: result?.values?.map(acsCallParticipant => callParticipantConverter(acsCallParticipant))
        }
        return listParticipantResponse;
    }

    /**
    * Add participants to a call
    */
    public async addParticipants(
        participants: CommunicationIdentifier[],
        options: AddParticipantsOptions = {}
    ): Promise<AddParticipantsResult> {
        const addParticipantsRequest: AddParticipantsRequest = {
            participantsToAdd: participants.map(participant => communicationIdentifierModelConverter(participant)),
            sourceIdentifier: options.sourceIdentifier ? communicationIdentifierModelConverter(options.sourceIdentifier) : undefined,
            sourceCallerId: PhoneNumberIdentifierModelConverter(options.sourceCallerId),
            sourceDisplayName: options.sourceDisplayName,
            invitationTimeoutInSeconds: options.invitationTimeoutInSeconds,
            operationContext: options.operationContext
        }

        const result = await this.callConnectionImpl.addParticipant(
            this.callConnectionId,
            addParticipantsRequest,
            options
        )
        const addParticipantsResult: AddParticipantsResult = {
            ...result,
            participants: result.participants ? result.participants.map(participant => callParticipantConverter(participant)) : undefined
        }
        return addParticipantsResult;
    }

    /**
    * Transfer the call to a target participant
    */
    public async transferCallToParticipant(
        target: CommunicationIdentifier,
        options: TransferCallToParticipantOptions = {}
    ): Promise<TransferCallResult> {
        const transferToParticipantRequest: TransferToParticipantRequest = {
            targetParticipant: communicationIdentifierModelConverter(target),
            transfereeCallerId: PhoneNumberIdentifierModelConverter(options?.transfereeCallerId),
            operationContext: options.operationContext
        }

        const result = await this.callConnectionImpl.transferToParticipant(
            this.callConnectionId,
            transferToParticipantRequest,
            options
        )
        const transferCallResult: TransferCallResult = {...result}
        return transferCallResult;
    }

    /**
    * Remove participants from a call
    */
    public async removeParticipants(
        participants: CommunicationIdentifier[],
        options: RemoveParticipantsOptions = {}
    ): Promise<RemoveParticipantsResult> {
        const removeParticipantsRequest: RemoveParticipantsRequest = {
            participantsToRemove: participants.map(participant => communicationIdentifierModelConverter(participant)),
            operationContext: options.operationContext
        }

        const result = await this.callConnectionImpl.removeParticipants(
            this.callConnectionId,
            removeParticipantsRequest,
            options
        )
        const removeParticipantsResult: RemoveParticipantsResult = {
            ...result
        }
        return removeParticipantsResult;
    }
}