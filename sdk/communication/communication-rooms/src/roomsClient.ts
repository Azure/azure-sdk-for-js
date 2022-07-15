// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./logger";
import { createSpan } from "./tracing";
import { RoomsApiClient } from "./generated/src";
import {
  mapToRoomParticipantRestModel,
  mapToRoomParticipantSdkModel,
  mapToRoomSdkModel,
} from "./models/mappers";
import { ParticipantsCollection, RoomModel } from "./models/models";
import {
  AddParticipantsOptions,
  CreateRoomOptions,
  DeleteRoomOptions,
  GetParticipantsOptions,
  GetRoomOptions,
  RemoveAllParticipantsOptions,
  RemoveParticipantsOptions,
  RoomsClientOptions,
  UpdateParticipantsOptions,
  UpdateRoomOptions,
} from "./models/options";
import {
  CreateRoomRequest,
  PatchRoomRequest,
  AddParticipantsRequest,
  UpdateParticipantsRequest,
  RemoveParticipantsRequest,
} from "./models/requests";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { SpanStatusCode } from "@azure/core-tracing";
import { generateUuid } from "./models/uuid";

/**
 * @internal
 * Checks whether the type of a value is RoomsClientOptions or not.
 * @param options - The value being checked.
 */
const isRoomsClientOptions = (options: any): options is RoomsClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * The Rooms service client.
 */
export class RoomsClient {
  private readonly client: RoomsApiClient;

  /**
   * Initializes a new instance of the RoomsClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: RoomsClientOptions);

  /**
   * Initializes a new instance of the RoomsClient using an Azure KeyCredential
   * @param endpoint - The url of the Communication Services resource
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: RoomsClientOptions);

  /**
   * Initializes a new instance of the RoomsClient using a TokenCredential
   * @param endpoint - The url of the Communication Services resource
   * @param credential - An object that is used to authenticate requests to the service. Use the AzureCommunicationTokenCredential from @azure/communication-common to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: RoomsClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: RoomsClientOptions | KeyCredential | TokenCredential,
    maybeOptions: RoomsClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isRoomsClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new RoomsApiClient(url, { endpoint: url, ...internalPipelineOptions });

    const authPolicy = createCommunicationAuthPolicy(credential);

    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Creates a new room asynchronously.
   * @param request - Request for creating a room.
   * @param options - Operation options.
   * @returns a RoomModel object with the values of the created room.
   */
  public async createRoom(
    request: CreateRoomRequest,
    options: CreateRoomOptions = {}
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-CreateRoom", options);
    try {
      const repeatabilityRequestId = generateUuid();
      const repeatabilityFirstSent = new Date();
      const { participants, ...rest } = request;
      const result = await this.client.rooms.createRoom(
        {
          ...rest,
          participants: request.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)
          ),
        },
        {
          ...updatedOptions,
          repeatabilityFirstSent: repeatabilityFirstSent,
          repeatabilityRequestID: repeatabilityRequestId,
        }
      );
      return mapToRoomSdkModel(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates a room asynchronously.
   * @param roomId - ID of the room.
   * @param request - Request for updating a room.
   * @param options - Operational options.
   * @returns a RoomModel object with the values of the created room.
   */
  public async updateRoom(
    roomId: string,
    request: PatchRoomRequest,
    options: UpdateRoomOptions = {}
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-UpdateRoom", options);
    try {
      const result = await this.client.rooms.updateRoom(roomId, {
        patchRoomRequest: {
          ...request,
          participants: request.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)
          ),
        },
        ...updatedOptions,
      });
      return mapToRoomSdkModel(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a room by id asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   * @returns a RoomModel object with the values of the created room.
   */
  public async getRoom(roomId: string, options: GetRoomOptions = {}): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-GetRoom", options);
    try {
      const result = await this.client.rooms.getRoom(roomId, updatedOptions);
      return mapToRoomSdkModel(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a room by id asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   */
  public async deleteRoom(roomId: string, options: DeleteRoomOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("RoomsClient-DeleteRoom", options);
    try {
      await this.client.rooms.deleteRoom(roomId, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the participants of a room asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async getParticipants(
    roomId: string,
    options: GetParticipantsOptions = {}
  ): Promise<ParticipantsCollection> {
    const { span, updatedOptions } = createSpan("RoomsClient-GetParticipants", options);
    try {
      const result = await this.client.rooms.getParticipants(roomId, updatedOptions);
      return {
        participants: result.participants.map((participant) =>
          mapToRoomParticipantSdkModel(participant)
        ),
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Adds Participants to a room asynchronously
   * @param roomId - ID of the room.
   * @param request - Request for adding participants to a room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async addParticipants(
    roomId: string,
    request: AddParticipantsRequest,
    options: AddParticipantsOptions = {}
  ): Promise<ParticipantsCollection> {
    const { span, updatedOptions } = createSpan("RoomsClient-AddParticipants", options);
    try {
      const result = await this.client.rooms.addParticipants(
        roomId,
        {
          participants: request.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)
          ),
        },
        updatedOptions
      );
      return {
        participants: result.participants!.map((participant) =>
          mapToRoomParticipantSdkModel(participant)
        ),
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates the Participants in a Room asynchronously.
   * @param roomId - ID of the room.
   * @param request - Request for updating participants in a room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async updateParticipants(
    roomId: string,
    request: UpdateParticipantsRequest,
    options: UpdateParticipantsOptions = {}
  ): Promise<ParticipantsCollection> {
    const { span, updatedOptions } = createSpan("RoomsClient-UpdateParticipants", options);
    try {
      const result = await this.client.rooms.updateParticipants(
        roomId,
        {
          participants: request.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)
          ),
        },
        updatedOptions
      );
      return {
        participants: result.participants!.map((participant) =>
          mapToRoomParticipantSdkModel(participant)
        ),
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Removes Participants from a Room asynchronously.
   * @param roomId - ID of the room.
   * @param request - Request for deleting participants in a room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async removeParticipants(
    roomId: string,
    request: RemoveParticipantsRequest,
    options: RemoveParticipantsOptions = {}
  ): Promise<ParticipantsCollection> {
    const { span, updatedOptions } = createSpan("RoomsClient-RemoveParticipants", options);
    try {
      const result = await this.client.rooms.removeParticipants(
        roomId,
        {
          participants: request.participants!.map((participant: any) =>
            mapToRoomParticipantRestModel(participant)
          ),
        },
        updatedOptions
      );
      return {
        participants: result.participants!.map((participant) =>
          mapToRoomParticipantSdkModel(participant)
        ),
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Removes all Participants from a Room asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async removeAllParticipants(
    roomId: string,
    options: RemoveAllParticipantsOptions = {}
  ): Promise<RoomModel> {
    const { span, updatedOptions } = createSpan("RoomsClient-RemoveAllParticipants", options);
    try {
      const result = await this.client.rooms.updateRoom(roomId, {
        patchRoomRequest: {
          participants: [],
        },
        ...updatedOptions,
      });
      return mapToRoomSdkModel(result);
    } catch (e: any) {
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
