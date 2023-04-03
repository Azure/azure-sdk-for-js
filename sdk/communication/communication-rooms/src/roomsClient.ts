// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  CommunicationIdentifier,
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";

import { logger } from "./logger";
import { tracingClient } from "./tracing";
import { RoomsRestClient } from "./generated/src";
import { mapCommunicationIdentifierForRemoval, mapRoomParticipantToRawId } from "./models/mappers";
import { CommunicationRoom, InvitedRoomParticipant, RoomParticipant } from "./models/models";
import {
  CreateRoomOptions,
  DeleteRoomOptions,
  GetParticipantsOptions,
  GetRoomOptions,
  ListRoomOptions,
  RemoveParticipantsOptions,
  RemoveParticipantsResult,
  RoomsClientOptions,
  UpdateRoomOptions,
  UpsertParticipantsOptions,
  UpsertParticipantsResult,
} from "./models/options";
import { generateUuid } from "./models/uuid";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * @internal
 * Checks whether the type of a value is RoomsClientOptions or not.
 * @param options - The value being checked.
 */
const isRoomsClientOptions = (options: any): options is RoomsClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * @internal
 * Empty response object
 */
const EmptyResponse = {};

/**
 * The Rooms service client.
 */
export class RoomsClient {
  private readonly client: RoomsRestClient;

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

    this.client = new RoomsRestClient(url, { endpoint: url, ...internalPipelineOptions });

    const authPolicy = createCommunicationAuthPolicy(credential);

    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Creates a new room asynchronously.
   * @param request - Request for creating a room.
   * @param options - Operation options.
   * @returns a RoomModel object with the values of the created room.
   */
  public async createRoom(options: CreateRoomOptions = {}): Promise<CommunicationRoom> {
    const repeatabilityRequestId = generateUuid();
    const repeatabilityFirstSent = new Date();
    return tracingClient.withSpan("RoomsClient-CreateRoom", options, async () => {
      return this.client.rooms.create({
        ...options,
        repeatabilityFirstSent: repeatabilityFirstSent,
        repeatabilityRequestID: repeatabilityRequestId,
        participants: mapRoomParticipantToRawId(options.participants),
      });
    });
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
    options: UpdateRoomOptions = {}
  ): Promise<CommunicationRoom> {
    return tracingClient.withSpan("RoomsClient-UpdateRoom", options, async () => {
      return this.client.rooms.update(roomId, options);
    });
  }

  /**
   * Gets a room by id asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   * @returns a RoomModel object with the values of the created room.
   */
  public async getRoom(roomId: string, options: GetRoomOptions = {}): Promise<CommunicationRoom> {
    return tracingClient.withSpan("RoomsClient-GetRoom", options, async (updatedOptions) => {
      return this.client.rooms.get(roomId, updatedOptions);
    });
  }

  /**
   * Gets the list of rooms
   * @param options - Operational options
   */
  public async listRooms(
    options: ListRoomOptions = {}
  ): Promise<PagedAsyncIterableIterator<CommunicationRoom>> {
    return tracingClient.withSpan("RoomsClient-ListRooms", options, async (updatedOptions) => {
      return this.client.rooms.list(updatedOptions);
    });
  }

  /**
   * Deletes a room by id asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   */
  public async deleteRoom(roomId: string, options: DeleteRoomOptions = {}): Promise<void> {
    return tracingClient.withSpan("RoomsClient-DeleteRoom", options, async (updatedOptions) => {
      await this.client.rooms.delete(roomId, updatedOptions);
    });
  }

  /**
   * Gets the participants of a room asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async listParticipants(
    roomId: string,
    options: GetParticipantsOptions = {}
  ): Promise<PagedAsyncIterableIterator<Partial<RoomParticipant>>> {
    return tracingClient.withSpan(
      "RoomsClient-GetParticipants",
      options,
      async (updatedOptions) => {
        return this.client.participants.list(roomId, updatedOptions);
      }
    );
  }

  /**
   * Updates the Participants in a Room asynchronously.
   * Participant is added to room if they did not exist and updated if already in room.
   * @param roomId - ID of the room.
   * @param participants - List of participants to upsert.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async upsertParticipants(
    roomId: string,
    participants: InvitedRoomParticipant[],
    options: UpsertParticipantsOptions = {}
  ): Promise<UpsertParticipantsResult> {
    return tracingClient.withSpan(
      "RoomsClient-UpsertParticipants",
      options,
      async (updatedOptions) => {
        await this.client.participants.update(roomId, {
          ...updatedOptions,
          participants: mapRoomParticipantToRawId(participants),
        });
        return EmptyResponse;
      }
    );
  }

  /**
   * Removes Participants from a Room asynchronously.
   * @param roomId - ID of the room.
   * @param participants - List of participants to remove from room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async removeParticipants(
    roomId: string,
    participants: CommunicationIdentifier[],
    options: RemoveParticipantsOptions = {}
  ): Promise<RemoveParticipantsResult> {
    return tracingClient.withSpan(
      "RoomsClient-RemoveParticipants",
      options,
      async (updatedOptions) => {
        await this.client.participants.update(roomId, {
          ...updatedOptions,
          participants: mapCommunicationIdentifierForRemoval(participants),
        });
        return EmptyResponse;
      }
    );
  }
}
