// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
import {
  mapCommunicationRoomToSDKModel,
  mapRoomParticipantForRemoval,
  mapRoomParticipantToRawId,
  mapToRoomParticipantSDKModel,
} from "./models/mappers";
import { CommunicationRoom, RoomParticipantPatch, RoomParticipant } from "./models/models";
import {
  CreateRoomOptions,
  DeleteRoomOptions,
  GetRoomOptions,
  ListParticipantsOptions,
  ListRoomOptions,
  RemoveParticipantsOptions,
  RoomsClientOptions,
  UpdateRoomOptions,
  AddOrUpdateParticipantsOptions,
} from "./models/options";
import { randomUUID } from "@azure/core-util";
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
 * Arguments for retrieving the next page of search results.
 */
interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

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
   * Initializes a new instance of the RoomsClient using a TokenCredential
   * @param endpoint - The url of the Communication Services resource
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential from `@azure/identity` or AzureCommunicationTokenCredential from `@azure/communication-common` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: RoomsClientOptions,
  );

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: RoomsClientOptions | KeyCredential | TokenCredential,
    maybeOptions: RoomsClientOptions = {},
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
    const repeatabilityRequestId = randomUUID();
    const repeatabilityFirstSent = new Date();
    return tracingClient.withSpan("RoomsClient-CreateRoom", options, async () => {
      const room = await this.client.rooms.create({
        ...options,
        repeatabilityFirstSent: repeatabilityFirstSent,
        repeatabilityRequestID: repeatabilityRequestId,
        participants: mapRoomParticipantToRawId(options.participants),
      });
      return mapCommunicationRoomToSDKModel(room);
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
    options: UpdateRoomOptions = {},
  ): Promise<CommunicationRoom> {
    return tracingClient.withSpan("RoomsClient-UpdateRoom", options, async () => {
      const room = await this.client.rooms.update(roomId, options);
      return mapCommunicationRoomToSDKModel(room);
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
      const room = await this.client.rooms.get(roomId, updatedOptions);
      return mapCommunicationRoomToSDKModel(room);
    });
  }

  private async *listRoomsPage(
    pageSettings: ListPageSettings,
    options: ListRoomOptions = {},
  ): AsyncIterableIterator<CommunicationRoom[]> {
    if (!pageSettings.continuationToken) {
      const currentSetResponse = await this.client.rooms.list(options);
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map((room) => mapCommunicationRoomToSDKModel(room));
      }
    }

    while (pageSettings.continuationToken) {
      const currentSetResponse = await this.client.rooms.listNext(
        pageSettings.continuationToken,
        options,
      );
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map((room) => mapCommunicationRoomToSDKModel(room));
      } else {
        break;
      }
    }
  }

  private async *listRoomsAll(
    options: ListRoomOptions = {},
  ): AsyncIterableIterator<CommunicationRoom> {
    for await (const page of this.listRoomsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets the list of rooms
   * @param options - Operational options
   */
  public listRooms(options: ListRoomOptions = {}): PagedAsyncIterableIterator<CommunicationRoom> {
    const { span, updatedOptions } = tracingClient.startSpan("RoomsClient-ListRooms", options);
    try {
      const iter = this.listRoomsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listRoomsPage(settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        error: e,
        status: "error",
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
    return tracingClient.withSpan("RoomsClient-DeleteRoom", options, async (updatedOptions) => {
      await this.client.rooms.delete(roomId, updatedOptions);
    });
  }

  private async *listParticipantsPage(
    roomId: string,
    pageSettings: ListPageSettings,
    options: ListParticipantsOptions = {},
  ): AsyncIterableIterator<RoomParticipant[]> {
    if (!pageSettings.continuationToken) {
      const currentSetResponse = await this.client.participants.list(roomId, options);
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToRoomParticipantSDKModel, this);
      }
    }

    while (pageSettings.continuationToken) {
      const currentSetResponse = await this.client.participants.listNext(
        roomId,
        pageSettings.continuationToken,
        options,
      );
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToRoomParticipantSDKModel, this);
      } else {
        break;
      }
    }
  }

  private async *listParticipantsAll(
    roomId: string,
    options: ListParticipantsOptions = {},
  ): AsyncIterableIterator<RoomParticipant> {
    for await (const page of this.listParticipantsPage(roomId, {}, options)) {
      yield* page;
    }
  }

  /**
   * Gets the participants of a room asynchronously.
   * @param roomId - ID of the room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public listParticipants(
    roomId: string,
    options: ListParticipantsOptions = {},
  ): PagedAsyncIterableIterator<RoomParticipant> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "RoomsClient-GetParticipants",
      options,
    );
    try {
      const iter = this.listParticipantsAll(roomId, updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listParticipantsPage(roomId, settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        error: e,
        status: "error",
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates the Participants in a Room asynchronously.
   * Participant is added to room if they did not exist and updated if already in room.
   * @param roomId - ID of the room.
   * @param participants - List of participants to add or update.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async addOrUpdateParticipants(
    roomId: string,
    participants: RoomParticipantPatch[],
    options: AddOrUpdateParticipantsOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "RoomsClient-AddOrUpdateParticipants",
      options,
      (updatedOptions) => {
        this.client.participants.update(roomId, {
          ...updatedOptions,
          participants: mapRoomParticipantToRawId(participants),
        });
      },
    );
  }

  /**
   * Removes Participants from a Room asynchronously.
   * @param roomId - ID of the room.
   * @param participantIdentifiers - List of participants' communication identifiers to remove from room.
   * @param options - Operational options.
   * @returns a list of all the participants in the room.
   */
  public async removeParticipants(
    roomId: string,
    participantIdentifiers: CommunicationIdentifier[],
    options: RemoveParticipantsOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan("RoomsClient-RemoveParticipants", options, (updatedOptions) => {
      this.client.participants.update(roomId, {
        ...updatedOptions,
        participants: mapRoomParticipantForRemoval(participantIdentifiers),
      });
    });
  }
}
