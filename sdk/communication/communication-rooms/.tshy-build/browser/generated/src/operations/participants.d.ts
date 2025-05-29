import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Participants } from "../operationsInterfaces/index.js";
import { RoomsRestClient } from "../roomsRestClient.js";
import { RoomParticipant, ParticipantsListOptionalParams, ParticipantsUpdateOptionalParams, ParticipantsUpdateResponse } from "../models/index.js";
/** Class containing Participants operations. */
export declare class ParticipantsImpl implements Participants {
    private readonly client;
    /**
     * Initialize a new instance of the class Participants class.
     * @param client Reference to the service client
     */
    constructor(client: RoomsRestClient);
    /**
     * Get participants in a room.
     * @param roomId The id of the room to get participants from.
     * @param options The options parameters.
     */
    list(roomId: string, options?: ParticipantsListOptionalParams): PagedAsyncIterableIterator<RoomParticipant>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Get participants in a room.
     * @param roomId The id of the room to get participants from.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Update participants in a room.
     * @param roomId The id of the room to update the participants in.
     * @param options The options parameters.
     */
    update(roomId: string, options?: ParticipantsUpdateOptionalParams): Promise<ParticipantsUpdateResponse>;
    /**
     * ListNext
     * @param roomId The id of the room to get participants from.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=participants.d.ts.map