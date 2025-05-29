import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { CommunicationIdentifier } from "@azure/communication-common";
import type { CommunicationRoom, RoomParticipantPatch, RoomParticipant } from "./models/models.js";
import type { CreateRoomOptions, DeleteRoomOptions, GetRoomOptions, ListParticipantsOptions, ListRoomOptions, RemoveParticipantsOptions, RoomsClientOptions, UpdateRoomOptions, AddOrUpdateParticipantsOptions } from "./models/options.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
/**
 * The Rooms service client.
 */
export declare class RoomsClient {
    private readonly client;
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
    constructor(endpoint: string, credential: KeyCredential | TokenCredential, options?: RoomsClientOptions);
    /**
     * Creates a new room asynchronously.
     * @param request - Request for creating a room.
     * @param options - Operation options.
     * @returns a RoomModel object with the values of the created room.
     */
    createRoom(options?: CreateRoomOptions): Promise<CommunicationRoom>;
    /**
     * Updates a room asynchronously.
     * @param roomId - ID of the room.
     * @param request - Request for updating a room.
     * @param options - Operational options.
     * @returns a RoomModel object with the values of the created room.
     */
    updateRoom(roomId: string, options?: UpdateRoomOptions): Promise<CommunicationRoom>;
    /**
     * Gets a room by id asynchronously.
     * @param roomId - ID of the room.
     * @param options - Operational options.
     * @returns a RoomModel object with the values of the created room.
     */
    getRoom(roomId: string, options?: GetRoomOptions): Promise<CommunicationRoom>;
    private listRoomsPage;
    private listRoomsAll;
    /**
     * Gets the list of rooms
     * @param options - Operational options
     */
    listRooms(options?: ListRoomOptions): PagedAsyncIterableIterator<CommunicationRoom>;
    /**
     * Deletes a room by id asynchronously.
     * @param roomId - ID of the room.
     * @param options - Operational options.
     */
    deleteRoom(roomId: string, options?: DeleteRoomOptions): Promise<void>;
    private listParticipantsPage;
    private listParticipantsAll;
    /**
     * Gets the participants of a room asynchronously.
     * @param roomId - ID of the room.
     * @param options - Operational options.
     * @returns a list of all the participants in the room.
     */
    listParticipants(roomId: string, options?: ListParticipantsOptions): PagedAsyncIterableIterator<RoomParticipant>;
    /**
     * Updates the Participants in a Room asynchronously.
     * Participant is added to room if they did not exist and updated if already in room.
     * @param roomId - ID of the room.
     * @param participants - List of participants to add or update.
     * @param options - Operational options.
     * @returns a list of all the participants in the room.
     */
    addOrUpdateParticipants(roomId: string, participants: RoomParticipantPatch[], options?: AddOrUpdateParticipantsOptions): Promise<void>;
    /**
     * Removes Participants from a Room asynchronously.
     * @param roomId - ID of the room.
     * @param participantIdentifiers - List of participants' communication identifiers to remove from room.
     * @param options - Operational options.
     * @returns a list of all the participants in the room.
     */
    removeParticipants(roomId: string, participantIdentifiers: CommunicationIdentifier[], options?: RemoveParticipantsOptions): Promise<void>;
}
//# sourceMappingURL=roomsClient.d.ts.map