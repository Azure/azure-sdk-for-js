import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RoomParticipant, ParticipantsListOptionalParams, ParticipantsUpdateOptionalParams, ParticipantsUpdateResponse } from "../models/index.js";
/** Interface representing a Participants. */
export interface Participants {
    /**
     * Get participants in a room.
     * @param roomId The id of the room to get participants from.
     * @param options The options parameters.
     */
    list(roomId: string, options?: ParticipantsListOptionalParams): PagedAsyncIterableIterator<RoomParticipant>;
    /**
     * Update participants in a room.
     * @param roomId The id of the room to update the participants in.
     * @param options The options parameters.
     */
    update(roomId: string, options?: ParticipantsUpdateOptionalParams): Promise<ParticipantsUpdateResponse>;
}
//# sourceMappingURL=participants.d.ts.map