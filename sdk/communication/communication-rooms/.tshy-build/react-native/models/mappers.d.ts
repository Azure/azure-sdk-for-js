import type * as RestModel from "../generated/src/models/index.js";
import type { CommunicationRoom, RoomParticipant, RoomParticipantPatch } from "./models.js";
import type { CommunicationIdentifier } from "@azure/communication-common";
import type { ParticipantProperties, RoomParticipant as RESTRoomParticipant } from "../generated/src/models/index.js";
/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
export declare const mapToRoomParticipantRestModel: (roomParticipant: RoomParticipantPatch) => RESTRoomParticipant;
/**
 * @internal
 * Mapping room participant REST model to room participant customer model
 */
export declare const mapToRoomParticipantSDKModel: (roomParticipant: RESTRoomParticipant) => RoomParticipant;
/**
 * @internal
 * Mapping room participant role to participants rawId.
 */
export declare const mapRoomParticipantToRawId: (participants?: RoomParticipantPatch[]) => Record<string, ParticipantProperties>;
/**
 * @internal
 * Mapping communication identifier for removal.
 */
export declare const mapRoomParticipantForRemoval: (ids: CommunicationIdentifier[]) => Record<string, ParticipantProperties>;
/**
 * @internal
 * Mapping room rest model to room customer model.
 */
export declare const mapCommunicationRoomToSDKModel: (room: RestModel.RoomModel) => CommunicationRoom;
//# sourceMappingURL=mappers.d.ts.map