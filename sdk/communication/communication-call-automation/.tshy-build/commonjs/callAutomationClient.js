"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallAutomationClient = void 0;
const tslib_1 = require("tslib");
const core_auth_1 = require("@azure/core-auth");
const communication_common_1 = require("@azure/communication-common");
const logger_js_1 = require("./models/logger.js");
const callConnection_js_1 = require("./callConnection.js");
const callRecording_js_1 = require("./callRecording.js");
const converters_js_1 = require("./utli/converters.js");
const core_util_1 = require("@azure/core-util");
const callAutomationAuthPolicy_js_1 = require("./credential/callAutomationAuthPolicy.js");
const callAutomationEventProcessor_js_1 = require("./eventprocessor/callAutomationEventProcessor.js");
/**
 * Checks whether the type of a value is CallAutomationClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isCallAutomationClientOptions = (options) => !!options && !(0, core_auth_1.isTokenCredential)(options) && !(0, communication_common_1.isKeyCredential)(options);
/**
 * A CallAutomationClient represents a Client to the Azure Communication CallAutomation service.
 */
class CallAutomationClient {
    constructor(connectionStringOrUrl, credentialOrOptions, maybeOptions = {}) {
        const options = isCallAutomationClientOptions(credentialOrOptions)
            ? credentialOrOptions
            : maybeOptions;
        if (!(options === null || options === void 0 ? void 0 : options.userAgentOptions)) {
            options.userAgentOptions = {};
        }
        this.internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger_js_1.logger.info,
            },
        });
        const { url, credential } = (0, communication_common_1.parseClientArguments)(connectionStringOrUrl, credentialOrOptions);
        this.endpoint = url;
        this.credential = credential;
        // create event processor
        this.callAutomationEventProcessor = new callAutomationEventProcessor_js_1.CallAutomationEventProcessor();
        // create api client (using custom api endpoint if available)
        this.callAutomationApiClient = (0, callAutomationAuthPolicy_js_1.createCustomCallAutomationApiClient)(credential, this.internalPipelineOptions, this.endpoint);
        this.sourceIdentity = (0, converters_js_1.communicationUserIdentifierModelConverter)(options.sourceIdentity);
    }
    /**
     * Initializes a new instance of CallConnection.
     * @param callConnectionId - The CallConnection id for the CallConnection instance. (ex: 421CONTOSO-cRD6-4RDc-a078-99dRANDOMf).
     */
    getCallConnection(callConnectionId) {
        return new callConnection_js_1.CallConnection(callConnectionId, this.endpoint, this.credential, this.callAutomationEventProcessor, this.internalPipelineOptions);
    }
    /**
     * Initializes a new instance of CallRecording.
     */
    getCallRecording() {
        return new callRecording_js_1.CallRecording(this.endpoint, this.credential, this.internalPipelineOptions);
    }
    /**
     * Get Source Identity that is used for create and answer call
     */
    getSourceIdentity() {
        return (0, converters_js_1.communicationUserIdentifierConverter)(this.sourceIdentity);
    }
    /**
     * Get event processor to work with call automation events
     */
    getEventProcessor() {
        return this.callAutomationEventProcessor;
    }
    async createCallInternal(request, options) {
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const _a = await this.callAutomationApiClient.createCall(request, optionsInternal), { callConnectionId, answeredBy, targets, sourceCallerIdNumber, source, answeredFor } = _a, result = tslib_1.__rest(_a, ["callConnectionId", "answeredBy", "targets", "sourceCallerIdNumber", "source", "answeredFor"]);
        if (callConnectionId) {
            const callConnectionPropertiesDto = Object.assign(Object.assign({}, result), { callConnectionId: callConnectionId, source: source ? (0, converters_js_1.communicationIdentifierConverter)(source) : undefined, answeredby: (0, converters_js_1.communicationUserIdentifierConverter)(answeredBy), answeredFor: answeredFor ? (0, converters_js_1.phoneNumberIdentifierConverter)(answeredFor) : undefined, targetParticipants: targets === null || targets === void 0 ? void 0 : targets.map((returnedTarget) => (0, converters_js_1.communicationIdentifierConverter)(returnedTarget)), sourceCallerIdNumber: sourceCallerIdNumber
                    ? (0, converters_js_1.phoneNumberIdentifierConverter)(sourceCallerIdNumber)
                    : undefined });
            const callConnection = new callConnection_js_1.CallConnection(callConnectionId, this.endpoint, this.credential, this.callAutomationEventProcessor, this.internalPipelineOptions);
            const createCallResult = {
                callConnectionProperties: callConnectionPropertiesDto,
                callConnection: callConnection,
                waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                    const createCallEventResult = {
                        isSuccess: false,
                    };
                    await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                        if (event.callConnectionId === callConnectionId && event.kind === "CallConnected") {
                            createCallEventResult.isSuccess = true;
                            createCallEventResult.successResult = event;
                            return true;
                        }
                        else if (event.callConnectionId === callConnectionId &&
                            event.kind === "CreateCallFailed") {
                            createCallEventResult.isSuccess = false;
                            createCallEventResult.failureResult = event;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }, abortSignal, timeoutInMs);
                    return createCallEventResult;
                },
            };
            return createCallResult;
        }
        throw "callConnectionProperties / callConnectionId is missing in createCall result";
    }
    /**
     * Create an outgoing call from source to a target identity.
     * @param targetParticipant - A single target.
     * @param callbackUrl - The callback url.
     * @param options - Additional request options contains createCallConnection api options.
     */
    async createCall(targetParticipant, callbackUrl, options = {}) {
        const request = {
            source: this.sourceIdentity,
            teamsAppSource: (0, converters_js_1.microsoftTeamsAppIdentifierModelConverter)(options.teamsAppSource),
            targets: [(0, converters_js_1.communicationIdentifierModelConverter)(targetParticipant.targetParticipant)],
            callbackUri: callbackUrl,
            operationContext: options.operationContext,
            callIntelligenceOptions: options.callIntelligenceOptions,
            mediaStreamingOptions: options.mediaStreamingOptions,
            transcriptionOptions: options.transcriptionOptions,
            customCallingContext: this.createCustomCallingContextInternal(targetParticipant.customCallingContext),
            sourceCallerIdNumber: (0, converters_js_1.PhoneNumberIdentifierModelConverter)(targetParticipant.sourceCallIdNumber),
            sourceDisplayName: targetParticipant.sourceDisplayName,
        };
        return this.createCallInternal(request, options);
    }
    /**
     * Create an outgoing call from source to a group of targets identities.
     * @param targetParticipants - A group of targets identities.
     * @param callbackUrl - The callback url.
     * @param options - Additional request options contains createCallConnection api options.
     */
    async createGroupCall(targetParticipants, callbackUrl, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        const request = {
            source: this.sourceIdentity,
            teamsAppSource: (0, converters_js_1.microsoftTeamsAppIdentifierModelConverter)(options.teamsAppSource),
            targets: targetParticipants.map((target) => (0, converters_js_1.communicationIdentifierModelConverter)(target)),
            callbackUri: callbackUrl,
            operationContext: options.operationContext,
            callIntelligenceOptions: options.callIntelligenceOptions,
            mediaStreamingOptions: options.mediaStreamingOptions,
            transcriptionOptions: options.transcriptionOptions,
            sourceCallerIdNumber: (0, converters_js_1.PhoneNumberIdentifierModelConverter)(options.sourceCallIdNumber),
            sourceDisplayName: options.sourceDisplayName,
        };
        return this.createCallInternal(request, options);
    }
    /**
     * Answer the call.
     * @param incomingCallContext - The context associated with the call.
     * @param callbackUrl - The callback url.
     * @param options - Additional request options contains answerCall api options.
     */
    async answerCall(incomingCallContext, callbackUrl, options = {}) {
        const { callIntelligenceOptions, mediaStreamingOptions, transcriptionOptions, operationContext } = options, operationOptions = tslib_1.__rest(options, ["callIntelligenceOptions", "mediaStreamingOptions", "transcriptionOptions", "operationContext"]);
        const request = {
            incomingCallContext: incomingCallContext,
            mediaStreamingOptions: mediaStreamingOptions,
            transcriptionOptions: transcriptionOptions,
            callIntelligenceOptions: callIntelligenceOptions,
            customCallingContext: this.createCustomCallingContextInternal(options.customCallingContext),
            operationContext: operationContext,
            callbackUri: callbackUrl,
            answeredBy: this.sourceIdentity,
        };
        const optionsInternal = Object.assign(Object.assign({}, operationOptions), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const _a = await this.callAutomationApiClient.answerCall(request, optionsInternal), { callConnectionId, targets, sourceCallerIdNumber, answeredBy, source, answeredFor } = _a, result = tslib_1.__rest(_a, ["callConnectionId", "targets", "sourceCallerIdNumber", "answeredBy", "source", "answeredFor"]);
        if (callConnectionId) {
            const callConnectionProperties = Object.assign(Object.assign({}, result), { callConnectionId: callConnectionId, source: source ? (0, converters_js_1.communicationIdentifierConverter)(source) : undefined, answeredby: (0, converters_js_1.communicationUserIdentifierConverter)(answeredBy), answeredFor: answeredFor ? (0, converters_js_1.phoneNumberIdentifierConverter)(answeredFor) : undefined, targetParticipants: targets === null || targets === void 0 ? void 0 : targets.map((target) => (0, converters_js_1.communicationIdentifierConverter)(target)), sourceCallerIdNumber: sourceCallerIdNumber
                    ? (0, converters_js_1.phoneNumberIdentifierConverter)(sourceCallerIdNumber)
                    : undefined });
            const callConnection = new callConnection_js_1.CallConnection(callConnectionId, this.endpoint, this.credential, this.callAutomationEventProcessor, this.internalPipelineOptions);
            const answerCallResult = {
                callConnectionProperties: callConnectionProperties,
                callConnection: callConnection,
                waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                    const answerCallEventResult = {
                        isSuccess: false,
                    };
                    await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                        if (event.callConnectionId === callConnectionId && event.kind === "CallConnected") {
                            answerCallEventResult.isSuccess = true;
                            answerCallEventResult.successResult = event;
                            return true;
                        }
                        if (event.callConnectionId === callConnectionId && event.kind === "AnswerFailed") {
                            answerCallEventResult.isSuccess = false;
                            answerCallEventResult.failureResult = event;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }, abortSignal, timeoutInMs);
                    return answerCallEventResult;
                },
            };
            return answerCallResult;
        }
        throw "callConnectionProperties / callConnectionId is missing in createCall result";
    }
    /**
     * Redirect the call.
     *
     * @param incomingCallContext - The context associated with the call.
     * @param targetParticipant - The target identity to redirect the call to.
     * @param options - Additional request options contains redirectCall api options.
     */
    async redirectCall(incomingCallContext, targetParticipant, options = {}) {
        const request = {
            incomingCallContext: incomingCallContext,
            target: (0, converters_js_1.communicationIdentifierModelConverter)(targetParticipant.targetParticipant),
            customCallingContext: this.createCustomCallingContextInternal(targetParticipant.customCallingContext),
        };
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        return this.callAutomationApiClient.redirectCall(request, optionsInternal);
    }
    /**
     * Reject the call.
     *
     * @param incomingCallContext - The context associated with the call.
     * @param options - Additional request options contains rejectCall api options.
     */
    async rejectCall(incomingCallContext, options = {}) {
        const request = {
            incomingCallContext: incomingCallContext,
            callRejectReason: options.callRejectReason,
        };
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        return this.callAutomationApiClient.rejectCall(request, optionsInternal);
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
     * Create connection to room call.
     * @param callLocator - Call locator to create connection.
     * @param callbackUrl - The callback url
     * @param options - Additional request options contains connect api options.
     */
    async connectCall(callLocator, callbackUrl, options = {}) {
        const connectRequest = {
            callLocator: callLocator,
            callbackUri: callbackUrl,
            operationContext: options.operationContext,
            callIntelligenceOptions: options.callIntelligenceOptions,
            mediaStreamingOptions: options.mediaStreamingOptions,
            transcriptionOptions: options.transcriptionOptions,
        };
        if (callLocator.kind === "groupCallLocator") {
            connectRequest.callLocator.kind = "groupCallLocator";
            connectRequest.callLocator.groupCallId = callLocator.id;
        }
        else if (callLocator.kind === "roomCallLocator") {
            connectRequest.callLocator.kind = "roomCallLocator";
            connectRequest.callLocator.roomId = callLocator.id;
        }
        else {
            connectRequest.callLocator.kind = "serverCallLocator";
            connectRequest.callLocator.serverCallId = callLocator.id;
        }
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: (0, core_util_1.randomUUID)() });
        const _a = await this.callAutomationApiClient.connect(connectRequest, optionsInternal), { callConnectionId, targets, sourceCallerIdNumber, answeredBy, source, answeredFor } = _a, result = tslib_1.__rest(_a, ["callConnectionId", "targets", "sourceCallerIdNumber", "answeredBy", "source", "answeredFor"]);
        if (callConnectionId) {
            const callConnectionProperties = Object.assign(Object.assign({}, result), { callConnectionId: callConnectionId, source: source ? (0, converters_js_1.communicationIdentifierConverter)(source) : undefined, answeredby: answeredBy ? (0, converters_js_1.communicationUserIdentifierConverter)(answeredBy) : undefined, targetParticipants: targets === null || targets === void 0 ? void 0 : targets.map((target) => (0, converters_js_1.communicationIdentifierConverter)(target)), answeredFor: answeredFor ? (0, converters_js_1.phoneNumberIdentifierConverter)(answeredFor) : undefined, sourceCallerIdNumber: sourceCallerIdNumber
                    ? (0, converters_js_1.phoneNumberIdentifierConverter)(sourceCallerIdNumber)
                    : undefined });
            const callConnection = new callConnection_js_1.CallConnection(callConnectionId, this.callAutomationApiClient.endpoint, this.credential, this.callAutomationEventProcessor, this.internalPipelineOptions);
            const connectResult = {
                callConnectionProperties: callConnectionProperties,
                callConnection: callConnection,
                waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                    const connectCallEventResult = {
                        isSuccess: false,
                    };
                    await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                        if (event.callConnectionId === callConnectionId && event.kind === "CallConnected") {
                            connectCallEventResult.isSuccess = true;
                            connectCallEventResult.successResult = event;
                            return true;
                        }
                        if (event.callConnectionId === callConnectionId && event.kind === "ConnectFailed") {
                            connectCallEventResult.isSuccess = false;
                            connectCallEventResult.failureResult = event;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }, abortSignal, timeoutInMs);
                    return connectCallEventResult;
                },
            };
            return connectResult;
        }
        throw "callConnectionProperties / callConnectionId is missing in connect result";
    }
}
exports.CallAutomationClient = CallAutomationClient;
//# sourceMappingURL=callAutomationClient.js.map