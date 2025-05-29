import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Rooms } from "../operationsInterfaces/index.js";
import { RoomsRestClient } from "../roomsRestClient.js";
import { RoomModel, RoomsListOptionalParams, RoomsCreateOptionalParams, RoomsCreateResponse, RoomsGetOptionalParams, RoomsGetResponse, RoomsUpdateOptionalParams, RoomsUpdateResponse, RoomsDeleteOptionalParams } from "../models/index.js";
/** Class containing Rooms operations. */
export declare class RoomsImpl implements Rooms {
    private readonly client;
    /**
     * Initialize a new instance of the class Rooms class.
     * @param client Reference to the service client
     */
    constructor(client: RoomsRestClient);
    /**
     * Retrieves all created rooms.
     * @param options The options parameters.
     */
    list(options?: RoomsListOptionalParams): PagedAsyncIterableIterator<RoomModel>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Creates a new room.
     * @param options The options parameters.
     */
    create(options?: RoomsCreateOptionalParams): Promise<RoomsCreateResponse>;
    /**
     * Retrieves all created rooms.
     * @param options The options parameters.
     */
    private _list;
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
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=rooms.d.ts.map