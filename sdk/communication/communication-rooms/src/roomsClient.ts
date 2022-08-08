// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  CommunicationUserIdentifier,
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";

import { logger } from "./logger";
import { tracingClient } from "./tracing";
import { RoomsApiClient } from "./generated/src";
import {
  mapCommunicationIdentifierToRoomParticipantRestModel,
  mapToRoomParticipantRestModel,
  mapToRoomParticipantSdkModel,
  mapToRoomSdkModel,
} from "./models/mappers";
import { Room, RoomParticipant } from "./models/models";
import {
  AddParticipantsOptions,
  CreateRoomOptions,
  DeleteRoomOptions,
  GetParticipantsOptions,
  GetRoomOptions,
  RemoveParticipantsOptions,
  RoomsClientOptions,
  UpdateParticipantsOptions,
  UpdateRoomOptions,
} from "./models/options";
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
   * @param credential - An object that is used to authenticate requests to the service. Use the AzureCommunicationTokenCredential from `@azure/communication-common` to create a credential.
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
  public async createRoom(options: CreateRoomOptions = {}): Promise<Room> {
    const repeatabilityRequestId = generateUuid();
    const repeatabilityFirstSent = new Date();
    return tracingClient.withSpan("RoomsClient-CreateRoom", options, async (updatedOptions) => {
      const result = await this.client.rooms.createRoom(
        {
          ...options,
          participants: options.participants?.map((participant) =>
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
    });
  }

  /**
   * Updates a room asynchronously.
   * @param roomId - ID of the room.
   * @param request - Request for updating a room.
   * @param options - Operational options.
   * @returns a RoomModel object with the values of the created room.
   */
  public async updateRoom(roomId: string, options: UpdateRoomOptions = {}): Promise<Room> {
    return tracingClient.withSpan("RoomsClient-UpdateRoom", options, async (updatedOptions) => {
      const result = await this.client.rooms.updateRoom(roomId, {
        patchRoomRequest: {
          ...options,
          participants: options.participants?.map((participant) =>
            mapToRoomParticipantRestModel(participant)
          ),
        },
        ...updatedOptions,
      });
      return mapToRoomSdkModel(result);
    });
  }

  /**
   * Gets a room by id asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   * @returns a RoomModel object with the values of the created room.
   */
  public async getRoom(roomId: string, options: GetRoomOptions = {}): Promise<Room> {
    return tracingClient.withSpan("RoomsClient-GetRoom", options, async (updatedOptions) => {
      return mapToRoomSdkModel(await this.client.rooms.getRoom(roomId, updatedOptions));
    });
  }

  /**
   * Deletes a room by id asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   */
  public async deleteRoom(roomId: string, options: DeleteRoomOptions = {}): Promise<void> {
    return tracingClient.withSpan("RoomsClient-DeleteRoom", options, async (updatedOptions) => {
      await this.client.rooms.deleteRoom(roomId, updatedOptions);
    });
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
  ): Promise<RoomParticipant[]> {
    return tracingClient.withSpan(
      "RoomsClient-GetParticipants",
      options,
      async (updatedOptions) => {
        const result = await this.client.rooms.getParticipants(roomId, updatedOptions);
        return result.participants.map((participant) => mapToRoomParticipantSdkModel(participant));
      }
    );
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
    participants: RoomParticipant[],
    options: AddParticipantsOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "RoomsClient-AddParticipants",
      options,
      async (updatedOptions) => {
        await this.client.rooms.addParticipants(
          roomId,
          {
            participants: participants.map((participant) =>
              mapToRoomParticipantRestModel(participant)
            ),
          },
          updatedOptions
        );
      }
    );
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
    participants: RoomParticipant[],
    options: UpdateParticipantsOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "RoomsClient-UpdateParticipants",
      options,
      async (updatedOptions) => {
        await this.client.rooms.updateParticipants(
          roomId,
          {
            participants: participants.map((participant) =>
              mapToRoomParticipantRestModel(participant)
            ),
          },
          updatedOptions
        );
      }
    );
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
    participants: CommunicationUserIdentifier[],
    options: RemoveParticipantsOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "RoomsClient-RemoveParticipants",
      options,
      async (updatedOptions) => {
        await this.client.rooms.removeParticipants(
          roomId,
          {
            participants: participants!.map((participant) =>
              mapCommunicationIdentifierToRoomParticipantRestModel(participant)
            ),
          },
          updatedOptions
        );
      }
    );
  }
}
