"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallConnection = void 0;
const tslib_1 = require("tslib");
const callMedia_js_1 = require("./callMedia.js");
const index_js_1 = require("./generated/src/operations/index.js");
const converters_js_1 = require("./utli/converters.js");
const core_util_1 = require("@azure/core-util");
const callAutomationAuthPolicy_js_1 = require("./credential/callAutomationAuthPolicy.js");
/**
 * CallConnection class represents call connection based APIs.
 */
class CallConnection {
    constructor(callConnectionId, endpoint, credential, eventProcessor, options) {
        this.callAutomationApiClient = (0, callAutomationAuthPolicy_js_1.createCustomCallAutomationApiClient)(credential, options, endpoint);
        this.callConnectionId = callConnectionId;
        this.callConnection = new index_js_1.CallConnectionImpl(this.callAutomationApiClient);
        this.endpoint = endpoint;
        this.credential = credential;
        this.callAutomationEventProcessor = eventProcessor;
        this.callAutomationApiClientOptions = options;
    }
    /**
     * Initializes a new instance of CallMedia.
     */
    getCallMedia() {
        return new callMedia_js_1.CallMedia(this.callConnectionId, this.endpoint, this.credential, this.callAutomationEventProcessor, this.callAutomationApiClientOptions);
    }
    /**
     * Get call connection properties of the call
     */
    async getCallConnectionProperties(options = {}) {
        const _a = await this.callConnection.getCall(this.callConnectionId, options), { targets, sourceCallerIdNumber, answeredBy, source, answeredFor } = _a, result = tslib_1.__rest(_a, ["targets", "sourceCallerIdNumber", "answeredBy", "source", "answeredFor"]);
        const callConnectionProperties = Object.assign(Object.assign({}, result), { source: source ? (0, converters_js_1.communicationIdentifierConverter)(source) : undefined, answeredby: (0, converters_js_1.communicationUserIdentifierConverter)(answeredBy), answeredFor: answeredFor ? (0, converters_js_1.phoneNumberIdentifierConverter)(answeredFor) : undefined, targetParticipants: targets === null || targets === void 0 ? void 0 : targets.map((target) => (0, converters_js_1.communicationIdentifierConverter)(target)), sourceCallerIdNumber: sourceCallerIdNumber
                ? (0, converters_js_1.phoneNumberIdentifierConverter)(sourceCallerIdNumber)
                : undefined });
        return callConnectionProperties;
    }
    /**
     * Hang up the call for itself or terminate the whole call.
     *
     * @param isForEveryOne - Determine if every one in the call would be hung up or not.
     */
    async hangUp(isForEveryone, options = {}) {
        if (isForEveryone) {
            const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
            await this.callConnection.terminateCall(this.callConnectionId, optionsInternal);
        }
        else {
            await this.callConnection.hangupCall(this.callConnectionId, options);
        }
        return;
    }
    /**
     * Get a participant from the call
     *
     * @param targetParticipant - The communication identifier of requested participant.
     */
    async getParticipant(targetParticipant, options = {}) {
        let rawId = (0, converters_js_1.communicationIdentifierModelConverter)(targetParticipant).rawId;
        rawId = rawId === undefined ? "" : rawId;
        const result = await this.callConnection.getParticipant(this.callConnectionId, rawId, options);
        const callParticipant = {
            identifier: result.identifier
                ? (0, converters_js_1.communicationIdentifierConverter)(result.identifier)
                : undefined,
            isMuted: result.isMuted,
            isOnHold: result.isOnHold,
        };
        return callParticipant;
    }
    /**
     * Get all participants from the call
     */
    async listParticipants(options = {}) {
        var _a, e_1, _b, _c;
        const result = this.callConnection.listParticipants(this.callConnectionId, options);
        const participants = [];
        const pages = result === null || result === void 0 ? void 0 : result.byPage();
        try {
            for (var _d = true, pages_1 = tslib_1.__asyncValues(pages), pages_1_1; pages_1_1 = await pages_1.next(), _a = pages_1_1.done, !_a; _d = true) {
                _c = pages_1_1.value;
                _d = false;
                const page = _c;
                for (const participant of page) {
                    participants.push((0, converters_js_1.callParticipantConverter)(participant));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = pages_1.return)) await _b.call(pages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const listParticipantResponse = Object.assign(Object.assign({}, result), { values: participants });
        return listParticipantResponse;
    }
    createCustomCallingContextInternal(customCallingContext) {
        const sipHeaders = {};
        const voipHeaders = {};
        if (customCallingContext) {
            for (const header of customCallingContext) {
                if (header.kind === "sipuui") {
                    sipHeaders[`User-To-User`] = header.value;
                }
                else if (header.kind === "sipx") {
                    if (header.sipHeaderPrefix === "X-") {
                        sipHeaders[`X-${header.key}`] = header.value;
                    }
                    else {
                        sipHeaders[`X-MS-Custom-${header.key}`] = header.value;
                    }
                }
                else if (header.kind === "voip") {
                    voipHeaders[`${header.key}`] = header.value;
                }
            }
        }
        return { sipHeaders: sipHeaders, voipHeaders: voipHeaders };
    }
    /**
     * Add a participant to the call
     *
     * @param participant - The participant is going to be added.
     */
    async addParticipant(targetParticipant, options = {}) {
        var _a, _b;
        const addParticipantRequest = {
            participantToAdd: (0, converters_js_1.communicationIdentifierModelConverter)(targetParticipant.targetParticipant),
            sourceCallerIdNumber: (0, converters_js_1.PhoneNumberIdentifierModelConverter)(targetParticipant.sourceCallIdNumber),
            sourceDisplayName: targetParticipant.sourceDisplayName,
            invitationTimeoutInSeconds: options.invitationTimeoutInSeconds,
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri: options.operationCallbackUrl,
            customCallingContext: this.createCustomCallingContextInternal(targetParticipant.customCallingContext),
        };
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const result = await this.callConnection.addParticipant(this.callConnectionId, addParticipantRequest, optionsInternal);
        const addParticipantsResult = Object.assign(Object.assign({}, result), { participant: Object.assign(Object.assign({}, result.participant), { identifier: ((_a = result.participant) === null || _a === void 0 ? void 0 : _a.identifier)
                    ? (0, converters_js_1.communicationIdentifierConverter)((_b = result.participant) === null || _b === void 0 ? void 0 : _b.identifier)
                    : undefined }), waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const addParticipantEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "AddParticipantSucceeded" &&
                        event.operationContext === addParticipantRequest.operationContext) {
                        addParticipantEventResult.isSuccess = true;
                        addParticipantEventResult.successResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "AddParticipantFailed" &&
                        event.operationContext === addParticipantRequest.operationContext) {
                        addParticipantEventResult.isSuccess = false;
                        addParticipantEventResult.failureResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return addParticipantEventResult;
            } });
        return addParticipantsResult;
    }
    /**
     * Transfer the call to a target participant
     *
     * @param targetParticipant - The target to be transferred to.
     */
    async transferCallToParticipant(targetParticipant, options = {}) {
        const transferToParticipantRequest = {
            targetParticipant: (0, converters_js_1.communicationIdentifierModelConverter)(targetParticipant),
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri: options.operationCallbackUrl,
            transferee: options.transferee && (0, converters_js_1.communicationIdentifierModelConverter)(options.transferee),
            customCallingContext: this.createCustomCallingContextInternal(options.customCallingContext),
            sourceCallerIdNumber: (0, converters_js_1.PhoneNumberIdentifierModelConverter)(options.sourceCallIdNumber),
        };
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const result = await this.callConnection.transferToParticipant(this.callConnectionId, transferToParticipantRequest, optionsInternal);
        const transferCallResult = Object.assign(Object.assign({}, result), { waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const transferCallToParticipantEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "CallTransferAccepted" &&
                        event.operationContext === transferToParticipantRequest.operationContext) {
                        transferCallToParticipantEventResult.isSuccess = true;
                        transferCallToParticipantEventResult.successResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "CallTransferFailed" &&
                        event.operationContext === transferToParticipantRequest.operationContext) {
                        transferCallToParticipantEventResult.isSuccess = false;
                        transferCallToParticipantEventResult.failureResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return transferCallToParticipantEventResult;
            } });
        return transferCallResult;
    }
    /**
     * Remove a participant from the call
     *
     * @param participant - The participant is going to be removed from the call.
     */
    async removeParticipant(participant, options = {}) {
        const removeParticipantRequest = {
            participantToRemove: (0, converters_js_1.communicationIdentifierModelConverter)(participant),
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri: options.operationCallbackUrl,
        };
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const result = await this.callConnection.removeParticipant(this.callConnectionId, removeParticipantRequest, optionsInternal);
        const removeParticipantsResult = Object.assign(Object.assign({}, result), { waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const removeParticipantEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "RemoveParticipantSucceeded" &&
                        event.operationContext === removeParticipantRequest.operationContext) {
                        removeParticipantEventResult.isSuccess = true;
                        removeParticipantEventResult.successResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "RemoveParticipantFailed" &&
                        event.operationContext === removeParticipantRequest.operationContext) {
                        removeParticipantEventResult.isSuccess = false;
                        removeParticipantEventResult.failureResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return removeParticipantEventResult;
            } });
        return removeParticipantsResult;
    }
    /**
     * Mute participant from the call.
     *
     * @param participant - Participant to be muted from the call.
     * @param options - Additional attributes for mute participant.
     */
    async muteParticipant(participant, options = {}) {
        const muteParticipantsRequest = {
            targetParticipants: [(0, converters_js_1.communicationIdentifierModelConverter)(participant)],
            operationContext: options.operationContext,
        };
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const result = await this.callConnection.mute(this.callConnectionId, muteParticipantsRequest, optionsInternal);
        const muteParticipantResult = Object.assign({}, result);
        return muteParticipantResult;
    }
    /** Cancel add participant request.
     *
     * @param invitationId - Invitation ID used to cancel the add participant request.
     */
    async cancelAddParticipantOperation(invitationId, options = {}) {
        const { operationContext, operationCallbackUrl: operationCallbackUri } = options, operationOptions = tslib_1.__rest(options, ["operationContext", "operationCallbackUrl"]);
        const cancelAddParticipantRequest = {
            invitationId,
            operationContext: operationContext ? operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri,
        };
        const optionsInternal = Object.assign(Object.assign({}, operationOptions), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const result = await this.callConnection.cancelAddParticipant(this.callConnectionId, cancelAddParticipantRequest, optionsInternal);
        const cancelAddParticipantResult = Object.assign(Object.assign({}, result), { waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const cancelAddParticipantEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "CancelAddParticipantSucceeded" &&
                        event.operationContext === cancelAddParticipantRequest.operationContext) {
                        cancelAddParticipantEventResult.isSuccess = true;
                        cancelAddParticipantEventResult.successResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "CancelAddParticipantFailed" &&
                        event.operationContext === cancelAddParticipantRequest.operationContext) {
                        cancelAddParticipantEventResult.isSuccess = false;
                        cancelAddParticipantEventResult.failureResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return cancelAddParticipantEventResult;
            } });
        return cancelAddParticipantResult;
    }
}
exports.CallConnection = CallConnection;
//# sourceMappingURL=callConnection.js.map