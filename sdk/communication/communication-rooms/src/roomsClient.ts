// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./logger";
import { createSpan } from "./tracing";
import { RoomsApiClient } from "./generated/src";
import { 
  mapToRoomParticipantRestModel, 
  mapToRoomParticipantSdkModel, 
  mapToRoomSdkModel 
} from "./models/mappers";
import { ParticipantsCollection, RoomModel } from "./models/models";
import { 
  AddParticipantsOptions, 
  CreateRoomOptions, 
  DeleteRoomOptions, 
  GetParticipantsOptions, 
  GetRoomOptions, 
  RemoveParticipantsOptions, 
  RoomsClientOptions, 
  UpdateParticipantsOptions, 
  UpdateRoomOptions 
} from "./models/options";
import {
  InternalClientPipelineOptions
} from "@azure/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { 
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments
} from "@azure/communication-common";
import { SpanStatusCode } from "@azure/core-tracing";
import { generateUuid } from "./models/uuid";

const isRoomClientOptions = (options: any): options is RoomsClientOptions =>
  !!options && !isKeyCredential(options);

export class RoomsClient {
  private readonly client: RoomsApiClient;

  constructor(connectionString: string, options?: RoomsClientOptions);

  constructor(endpoint: string, credential: KeyCredential | TokenCredential, options?: RoomsClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: RoomsClientOptions | KeyCredential | TokenCredential,
    maybeOptions: RoomsClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isRoomClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new RoomsApiClient(url, {endpoint: url, ...internalPipelineOptions});

    const authPolicy = createCommunicationAuthPolicy(credential);

    this.client.pipeline.addPolicy(authPolicy);
  }

  public async createRoom(
    options: CreateRoomOptions = {}
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const repeatabilityRequestId = generateUuid();
      const repeatabilityFirstSent = new Date();
      const result = await this.client.rooms.createRoom(
        {
          validFrom: options.validFrom,
          validUntil: options.validUntil,
          roomJoinPolicy: options.roomJoinPolicy,
          participants: options.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)
          ),
        },
        {
          ...updatedOptions,
          repeatabilityFirstSent: repeatabilityFirstSent,
          repeatabilityRequestID: repeatabilityRequestId
        },
      );
      return mapToRoomSdkModel(result);
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async updateRoom(
    roomId: string,
    options: UpdateRoomOptions
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const result = await this.client.rooms.updateRoom(
        roomId,
        {
          patchRoomRequest: {
            validFrom: options.validFrom,
            validUntil: options.validUntil,
            roomJoinPolicy: options.roomJoinPolicy,
            participants: options.participants?.map((participant) =>
              mapToRoomParticipantRestModel(participant)
            ),
          },
          ...updatedOptions,
        },
      );
      return mapToRoomSdkModel(result);
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getRoom(
    roomId: string,
    options: GetRoomOptions = {}
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const result = await this.client.rooms.getRoom(roomId, updatedOptions);
      return mapToRoomSdkModel(result);
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async deleteRoom(
    roomId: string,
    options: DeleteRoomOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      await this.client.rooms.deleteRoom(roomId, updatedOptions);
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getParticipants(
    roomId: string,
    options: GetParticipantsOptions = {}
  ): Promise<ParticipantsCollection> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const result = await this.client.rooms.getParticipants(roomId, updatedOptions);
      return {
        participants: result.participants.map((participant) => mapToRoomParticipantSdkModel(participant)),
      };
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async addParticipants(
    roomId: string,
    options: AddParticipantsOptions
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const result = await this.client.rooms.addParticipants(
        roomId,
        {
          participants: options.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)),
        },
        updatedOptions
      );
      return mapToRoomSdkModel(result);
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async updateParticipants(
    roomId: string,
    options: UpdateParticipantsOptions
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const result = await this.client.rooms.updateParticipants(
        roomId,
        {
          participants: options.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)),
        },
        updatedOptions
      );
      return mapToRoomSdkModel(result);
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async removeParticipants(
    roomId: string,
    options: RemoveParticipantsOptions
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const result = await this.client.rooms.removeParticipants(
        roomId,
        {
          participants: options.participants?.map((participant: any) =>
            mapToRoomParticipantRestModel(participant)),
        },
        updatedOptions
      );
      return mapToRoomSdkModel(result);
    }
    catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
} 
