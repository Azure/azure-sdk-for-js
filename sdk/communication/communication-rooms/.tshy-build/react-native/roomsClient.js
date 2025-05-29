// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { createCommunicationAuthPolicy, isKeyCredential, parseClientArguments, } from "@azure/communication-common";
import { logger } from "./logger.js";
import { tracingClient } from "./tracing.js";
import { RoomsRestClient } from "./generated/src/index.js";
import { mapCommunicationRoomToSDKModel, mapRoomParticipantForRemoval, mapRoomParticipantToRawId, mapToRoomParticipantSDKModel, } from "./models/mappers.js";
import { randomUUID } from "@azure/core-util";
/**
 * @internal
 * Checks whether the type of a value is RoomsClientOptions or not.
 * @param options - The value being checked.
 */
const isRoomsClientOptions = (options) => !!options && !isKeyCredential(options);
/**
 * The Rooms service client.
 */
export class RoomsClient {
    constructor(connectionStringOrUrl, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
        const options = isRoomsClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger.info,
            },
        });
        this.client = new RoomsRestClient(url, Object.assign({ endpoint: url }, internalPipelineOptions));
        const authPolicy = createCommunicationAuthPolicy(credential);
        this.client.pipeline.addPolicy(authPolicy);
    }
    /**
     * Creates a new room asynchronously.
     * @param request - Request for creating a room.
     * @param options - Operation options.
     * @returns a RoomModel object with the values of the created room.
     */
    async createRoom(options = {}) {
        const repeatabilityRequestId = randomUUID();
        const repeatabilityFirstSent = new Date();
        return tracingClient.withSpan("RoomsClient-CreateRoom", options, async () => {
            const room = await this.client.rooms.create(Object.assign(Object.assign({}, options), { repeatabilityFirstSent: repeatabilityFirstSent, repeatabilityRequestID: repeatabilityRequestId, participants: mapRoomParticipantToRawId(options.participants) }));
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
    async updateRoom(roomId, options = {}) {
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
    async getRoom(roomId, options = {}) {
        return tracingClient.withSpan("RoomsClient-GetRoom", options, async (updatedOptions) => {
            const room = await this.client.rooms.get(roomId, updatedOptions);
            return mapCommunicationRoomToSDKModel(room);
        });
    }
    listRoomsPage(pageSettings_1) {
        return __asyncGenerator(this, arguments, function* listRoomsPage_1(pageSettings, options = {}) {
            var _a, e_1, _b, _c;
            const currentSetResponse = yield __await(this.client.rooms.list(options));
            const paged = currentSetResponse.byPage(pageSettings);
            try {
                for (var _d = true, paged_1 = __asyncValues(paged), paged_1_1; paged_1_1 = yield __await(paged_1.next()), _a = paged_1_1.done, !_a; _d = true) {
                    _c = paged_1_1.value;
                    _d = false;
                    const page = _c;
                    yield yield __await(page.map((room) => mapCommunicationRoomToSDKModel(room)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = paged_1.return)) yield __await(_b.call(paged_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    listRoomsAll() {
        return __asyncGenerator(this, arguments, function* listRoomsAll_1(options = {}) {
            var _a, e_2, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(this.listRoomsPage({}, options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield __await(yield* __asyncDelegator(__asyncValues(page)));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    /**
     * Gets the list of rooms
     * @param options - Operational options
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    listRooms(options = {}) {
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
                byPage: (settings = {}) => {
                    return this.listRoomsPage(settings, updatedOptions);
                },
            };
        }
        catch (e) {
            span.setStatus({
                error: e,
                status: "error",
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    /**
     * Deletes a room by id asynchronously.
     * @param roomId - ID of the room.
     * @param options - Operational options.
     */
    async deleteRoom(roomId, options = {}) {
        return tracingClient.withSpan("RoomsClient-DeleteRoom", options, async (updatedOptions) => {
            await this.client.rooms.delete(roomId, updatedOptions);
        });
    }
    listParticipantsPage(roomId_1, pageSettings_1) {
        return __asyncGenerator(this, arguments, function* listParticipantsPage_1(roomId, pageSettings, options = {}) {
            var _a, e_3, _b, _c;
            const currentSetResponse = yield __await(this.client.participants.list(roomId, options));
            const paged = currentSetResponse.byPage(pageSettings);
            try {
                for (var _d = true, paged_2 = __asyncValues(paged), paged_2_1; paged_2_1 = yield __await(paged_2.next()), _a = paged_2_1.done, !_a; _d = true) {
                    _c = paged_2_1.value;
                    _d = false;
                    const page = _c;
                    yield yield __await(page.map(mapToRoomParticipantSDKModel, this));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = paged_2.return)) yield __await(_b.call(paged_2));
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    }
    listParticipantsAll(roomId_1) {
        return __asyncGenerator(this, arguments, function* listParticipantsAll_1(roomId, options = {}) {
            var _a, e_4, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(this.listParticipantsPage(roomId, {}, options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield __await(yield* __asyncDelegator(__asyncValues(page)));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_4) throw e_4.error; }
            }
        });
    }
    /**
     * Gets the participants of a room asynchronously.
     * @param roomId - ID of the room.
     * @param options - Operational options.
     * @returns a list of all the participants in the room.
     */
    listParticipants(roomId, options = {}) {
        const { span, updatedOptions } = tracingClient.startSpan("RoomsClient-GetParticipants", options);
        try {
            const iter = this.listParticipantsAll(roomId, updatedOptions);
            return {
                next() {
                    return iter.next();
                },
                [Symbol.asyncIterator]() {
                    return this;
                },
                byPage: (settings = {}) => {
                    return this.listParticipantsPage(roomId, settings, updatedOptions);
                },
            };
        }
        catch (e) {
            span.setStatus({
                error: e,
                status: "error",
            });
            throw e;
        }
        finally {
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
    async addOrUpdateParticipants(roomId, participants, options = {}) {
        return tracingClient.withSpan("RoomsClient-AddOrUpdateParticipants", options, async (updatedOptions) => {
            await this.client.participants.update(roomId, Object.assign(Object.assign({}, updatedOptions), { participants: mapRoomParticipantToRawId(participants) }));
        });
    }
    /**
     * Removes Participants from a Room asynchronously.
     * @param roomId - ID of the room.
     * @param participantIdentifiers - List of participants' communication identifiers to remove from room.
     * @param options - Operational options.
     * @returns a list of all the participants in the room.
     */
    async removeParticipants(roomId, participantIdentifiers, options = {}) {
        return tracingClient.withSpan("RoomsClient-RemoveParticipants", options, async (updatedOptions) => {
            await this.client.participants.update(roomId, Object.assign(Object.assign({}, updatedOptions), { participants: mapRoomParticipantForRemoval(participantIdentifiers) }));
        });
    }
}
//# sourceMappingURL=roomsClient.js.map