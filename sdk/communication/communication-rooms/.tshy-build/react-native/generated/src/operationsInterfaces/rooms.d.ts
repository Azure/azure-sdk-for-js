import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RoomModel, RoomsListOptionalParams, RoomsCreateOptionalParams, RoomsCreateResponse, RoomsGetOptionalParams, RoomsGetResponse, RoomsUpdateOptionalParams, RoomsUpdateResponse, RoomsDeleteOptionalParams } from "../models/index.js";
/** Interface representing a Rooms. */
export interface Rooms {
    /**
     * Retrieves all created rooms.
     * @param options The options parameters.
     */
    list(options?: RoomsListOptionalParams): PagedAsyncIterableIterator<RoomModel>;
    /**
     * Creates a new room.
     * @param options The options parameters.
     */
    create(options?: RoomsCreateOptionalParams): Promise<RoomsCreateResponse>;
    /**
     * Retrieves an existing room by id.
     * @param roomId The id of the room requested.
     * @param options The options parameters.
     */
    get(roomId: string, options?: RoomsGetOptionalParams): Promise<RoomsGetResponse>;
    /**
     * Update a room with given changes.
     * @param roomId The id of the room requested.
     * @param options The options parameters.
     */
    update(roomId: string, options?: RoomsUpdateOptionalParams): Promise<RoomsUpdateResponse>;
    /**
     * Delete a room.
     * @param roomId The id of the room to be deleted.
     * @param options The options parameters.
     */
    delete(roomId: string, options?: RoomsDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=rooms.d.ts.map