"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallMedia = void 0;
const index_js_1 = require("./generated/src/index.js");
const index_js_2 = require("./generated/src/operations/index.js");
const communication_common_1 = require("@azure/communication-common");
const core_util_1 = require("@azure/core-util");
const callAutomationAuthPolicy_js_1 = require("./credential/callAutomationAuthPolicy.js");
/**
 * CallMedia class represents call media related APIs.
 */
class CallMedia {
    constructor(callConnectionId, endpoint, credential, eventProcessor, options) {
        this.callAutomationApiClient = (0, callAutomationAuthPolicy_js_1.createCustomCallAutomationApiClient)(credential, options, endpoint);
        this.callConnectionId = callConnectionId;
        this.callAutomationEventProcessor = eventProcessor;
        this.callMedia = new index_js_2.CallMediaImpl(this.callAutomationApiClient);
    }
    createPlaySourceInternal(playSource) {
        if (playSource.kind === "fileSource") {
            const fileSource = {
                uri: playSource.url,
            };
            return {
                kind: index_js_1.KnownPlaySourceType.File,
                file: fileSource,
                playSourceCacheId: playSource.playSourceCacheId
                    ? playSource.playSourceCacheId
                    : playSource.playsourcacheid,
            };
        }
        else if (playSource.kind === "textSource") {
            const textSource = {
                text: playSource.text,
                sourceLocale: playSource.sourceLocale,
                voiceKind: playSource.voiceKind,
                voiceName: playSource.voiceName,
                customVoiceEndpointId: playSource.customVoiceEndpointId,
            };
            return {
                kind: index_js_1.KnownPlaySourceType.Text,
                text: textSource,
                playSourceCacheId: playSource.playSourceCacheId
                    ? playSource.playSourceCacheId
                    : playSource.playsourcacheid,
            };
        }
        else if (playSource.kind === "ssmlSource") {
            const ssmlSource = {
                ssmlText: playSource.ssmlText,
                customVoiceEndpointId: playSource.customVoiceEndpointId,
            };
            return {
                kind: index_js_1.KnownPlaySourceType.Ssml,
                ssml: ssmlSource,
                playSourceCacheId: playSource.playSourceCacheId
                    ? playSource.playSourceCacheId
                    : playSource.playsourcacheid,
            };
        }
        throw new Error("Invalid play source");
    }
    /**
     * Play audio to a specific participant.
     *
     * @param playSources - A PlaySource representing the sources to play. Currently only single play source per request is supported.
     * @param playTo - The targets to play to.
     * @param options - Additional attributes for play.
     */
    async play(playSources, playTo, options = { loop: false }) {
        const playRequest = {
            playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
            playTo: playTo.map((identifier) => (0, communication_common_1.serializeCommunicationIdentifier)(identifier)),
            playOptions: {
                loop: false,
                interruptHoldAudio: false,
            },
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri: options.operationCallbackUrl,
        };
        if (options.loop !== undefined) {
            playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
            playRequest.playOptions.loop = options.loop;
        }
        if (options.interruptHoldAudio !== undefined) {
            playRequest.playOptions = playRequest.playOptions || {
                loop: false,
                interruptHoldAudio: false,
            }; // Ensure playOptions is defined
            playRequest.playOptions.interruptHoldAudio = options.interruptHoldAudio;
        }
        await this.callMedia.play(this.callConnectionId, playRequest, options);
        const playResult = {
            waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const playEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "PlayCompleted" &&
                        event.operationContext === playRequest.operationContext) {
                        playEventResult.isSuccess = true;
                        playEventResult.successResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "PlayFailed" &&
                        event.operationContext === playRequest.operationContext) {
                        playEventResult.isSuccess = false;
                        playEventResult.failureResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return playEventResult;
            },
        };
        return playResult;
    }
    /**
     * Play to all participants.
     *
     * @param playSources - A PlaySource representing the sources to play. Currently only single play source per request is supported.
     * @param options - Additional attributes for play.
     */
    async playToAll(playSources, options = { loop: false }) {
        const playRequest = {
            playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
            playTo: [],
            playOptions: {
                loop: false,
            },
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri: options.operationCallbackUrl,
        };
        if (options.loop !== undefined) {
            playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
            playRequest.playOptions.loop = options.loop;
        }
        if (options.interruptCallMediaOperation !== undefined) {
            playRequest.playOptions = playRequest.playOptions || {
                loop: false,
                interruptCallMediaOperation: false,
            }; // Ensure playOptions is defined
            playRequest.playOptions.interruptCallMediaOperation = options.interruptCallMediaOperation;
        }
        await this.callMedia.play(this.callConnectionId, playRequest, options);
        const playResult = {
            waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const playEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "PlayCompleted" &&
                        event.operationContext === playRequest.operationContext) {
                        playEventResult.isSuccess = true;
                        playEventResult.successResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "PlayFailed" &&
                        event.operationContext === playRequest.operationContext) {
                        playEventResult.isSuccess = false;
                        playEventResult.failureResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return playEventResult;
            },
        };
        return playResult;
    }
    createRecognizeRequest(targetParticipant, recognizeOptions) {
        if (recognizeOptions.kind === "callMediaRecognizeDtmfOptions") {
            const dtmfOptionsInternal = {
                interToneTimeoutInSeconds: recognizeOptions.interToneTimeoutInSeconds
                    ? recognizeOptions.interToneTimeoutInSeconds
                    : 2,
                maxTonesToCollect: recognizeOptions.maxTonesToCollect,
                stopTones: recognizeOptions.stopDtmfTones,
            };
            const recognizeOptionsInternal = {
                interruptPrompt: recognizeOptions.interruptPrompt,
                initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
                    ? recognizeOptions.initialSilenceTimeoutInSeconds
                    : 5,
                targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
                dtmfOptions: dtmfOptionsInternal,
            };
            return {
                recognizeInputType: index_js_1.KnownRecognizeInputType.Dtmf,
                playPrompt: recognizeOptions.playPrompt
                    ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
                    : undefined,
                playPrompts: recognizeOptions.playPrompts !== undefined
                    ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
                    : undefined,
                interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
                recognizeOptions: recognizeOptionsInternal,
                operationContext: recognizeOptions.operationContext,
                operationCallbackUri: recognizeOptions.operationCallbackUrl,
            };
        }
        else if (recognizeOptions.kind === "callMediaRecognizeChoiceOptions") {
            const recognizeOptionsInternal = {
                interruptPrompt: recognizeOptions.interruptPrompt,
                initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
                    ? recognizeOptions.initialSilenceTimeoutInSeconds
                    : 5,
                targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
                speechLanguage: recognizeOptions.speechLanguage,
                speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
                choices: recognizeOptions.choices,
            };
            return {
                recognizeInputType: index_js_1.KnownRecognizeInputType.Choices,
                playPrompt: recognizeOptions.playPrompt
                    ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
                    : undefined,
                playPrompts: recognizeOptions.playPrompts !== undefined
                    ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
                    : undefined,
                interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
                recognizeOptions: recognizeOptionsInternal,
                operationContext: recognizeOptions.operationContext,
                operationCallbackUri: recognizeOptions.operationCallbackUrl,
            };
        }
        else if (recognizeOptions.kind === "callMediaRecognizeSpeechOptions") {
            const speechOptions = {
                endSilenceTimeoutInMs: recognizeOptions.endSilenceTimeoutInSeconds
                    ? recognizeOptions.endSilenceTimeoutInSeconds * 1000
                    : 2000,
            };
            const recognizeOptionsInternal = {
                interruptPrompt: recognizeOptions.interruptPrompt,
                initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
                    ? recognizeOptions.initialSilenceTimeoutInSeconds
                    : 5,
                targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
                speechOptions: speechOptions,
                speechLanguage: recognizeOptions.speechLanguage,
                speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
            };
            return {
                recognizeInputType: index_js_1.KnownRecognizeInputType.Speech,
                playPrompt: recognizeOptions.playPrompt
                    ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
                    : undefined,
                playPrompts: recognizeOptions.playPrompts !== undefined
                    ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
                    : undefined,
                interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
                recognizeOptions: recognizeOptionsInternal,
                operationContext: recognizeOptions.operationContext,
                operationCallbackUri: recognizeOptions.operationCallbackUrl,
            };
        }
        else if (recognizeOptions.kind === "callMediaRecognizeSpeechOrDtmfOptions") {
            const dtmfOptionsInternal = {
                interToneTimeoutInSeconds: recognizeOptions.interToneTimeoutInSeconds
                    ? recognizeOptions.interToneTimeoutInSeconds
                    : 2,
                maxTonesToCollect: recognizeOptions.maxTonesToCollect,
                stopTones: recognizeOptions.stopDtmfTones,
            };
            const speechOptions = {
                endSilenceTimeoutInMs: recognizeOptions.endSilenceTimeoutInSeconds
                    ? recognizeOptions.endSilenceTimeoutInSeconds * 1000
                    : 2000,
            };
            const recognizeOptionsInternal = {
                interruptPrompt: recognizeOptions.interruptPrompt,
                initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
                    ? recognizeOptions.initialSilenceTimeoutInSeconds
                    : 5,
                targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
                speechOptions: speechOptions,
                dtmfOptions: dtmfOptionsInternal,
                speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
            };
            return {
                recognizeInputType: index_js_1.KnownRecognizeInputType.SpeechOrDtmf,
                playPrompt: recognizeOptions.playPrompt
                    ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
                    : undefined,
                playPrompts: recognizeOptions.playPrompts !== undefined
                    ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
                    : undefined,
                interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
                recognizeOptions: recognizeOptionsInternal,
                operationContext: recognizeOptions.operationContext,
                operationCallbackUri: recognizeOptions.operationCallbackUrl,
            };
        }
        throw new Error("Invalid recognizeOptions");
    }
    async startRecognizing(targetParticipant, maxTonesOrOptions, options) {
        if (typeof maxTonesOrOptions === "number" && options) {
            // Old function signature logic
            console.warn("Deprecated function signature used. Please use the new signature with targetParticipant and options params instead, and set maxTonesToCollect in options.");
            options.maxTonesToCollect = maxTonesOrOptions;
            await this.callMedia.recognize(this.callConnectionId, this.createRecognizeRequest(targetParticipant, options), {});
        }
        else if (typeof maxTonesOrOptions !== "number" && !options) {
            maxTonesOrOptions.operationContext = maxTonesOrOptions.operationContext
                ? maxTonesOrOptions.operationContext
                : (0, core_util_1.randomUUID)();
            // New function signature logic
            await this.callMedia.recognize(this.callConnectionId, this.createRecognizeRequest(targetParticipant, maxTonesOrOptions), {});
            const startRecognizingResult = {
                waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                    const startRecognizingEventResult = {
                        isSuccess: false,
                    };
                    await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                        if (event.callConnectionId === this.callConnectionId &&
                            event.kind === "RecognizeCompleted" &&
                            event.operationContext === maxTonesOrOptions.operationContext) {
                            startRecognizingEventResult.isSuccess = true;
                            startRecognizingEventResult.successResult = event;
                            return true;
                        }
                        else if (event.callConnectionId === this.callConnectionId &&
                            event.kind === "RecognizeFailed" &&
                            event.operationContext === maxTonesOrOptions.operationContext) {
                            startRecognizingEventResult.isSuccess = false;
                            startRecognizingEventResult.failureResult = event;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }, abortSignal, timeoutInMs);
                    return startRecognizingEventResult;
                },
            };
            return startRecognizingResult;
        }
        throw new Error("Invalid params");
    }
    /**
     * Cancels all the queued media operations.
     */
    async cancelAllOperations() {
        await this.callMedia.cancelAllMediaOperations(this.callConnectionId, {});
        const cancelAllMediaOperationsResult = {
            waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const cancelAllMediaOperationsEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId && event.kind === "PlayCanceled") {
                        cancelAllMediaOperationsEventResult.isSuccess = true;
                        cancelAllMediaOperationsEventResult.playCanceledSuccessResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "RecognizeCanceled") {
                        cancelAllMediaOperationsEventResult.isSuccess = false;
                        cancelAllMediaOperationsEventResult.recognizeCanceledSuccessResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return cancelAllMediaOperationsEventResult;
            },
        };
        return cancelAllMediaOperationsResult;
    }
    /**
     * Start continuous Dtmf recognition by subscribing to tones.
     * @param targetParticipant - Target participant.
     * @param options - Additional attributes for continuous Dtmf recognition.
     * */
    async startContinuousDtmfRecognition(targetParticipant, options = {}) {
        const continuousDtmfRecognitionRequest = {
            targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
        };
        return this.callMedia.startContinuousDtmfRecognition(this.callConnectionId, continuousDtmfRecognitionRequest, {});
    }
    /**
     * Stop continuous Dtmf recognition by unsubscribing to tones.
     * @param targetParticipant - Target participant.
     * @param options - Additional attributes for continuous Dtmf recognition.
     * */
    async stopContinuousDtmfRecognition(targetParticipant, options = {}) {
        const continuousDtmfRecognitionRequest = {
            targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri: options.operationCallbackUrl,
        };
        return this.callMedia.stopContinuousDtmfRecognition(this.callConnectionId, continuousDtmfRecognitionRequest, {});
    }
    /**
     * Send Dtmf tones.
     * @param tones - List of tones to be sent to target participant.
     * @param targetParticipant - Target participant.
     * @param options - Additional attributes for send Dtmf tones.
     * */
    async sendDtmfTones(tones, targetParticipant, options = {}) {
        const sendDtmfTonesRequest = {
            tones: tones,
            targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
            operationContext: options.operationContext ? options.operationContext : (0, core_util_1.randomUUID)(),
            operationCallbackUri: options.operationCallbackUrl,
        };
        await this.callMedia.sendDtmfTones(this.callConnectionId, sendDtmfTonesRequest, {});
        const sendDtmfTonesResult = {
            waitForEventProcessor: async (abortSignal, timeoutInMs) => {
                const sendDtmfEventResult = {
                    isSuccess: false,
                };
                await this.callAutomationEventProcessor.waitForEventProcessor((event) => {
                    if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "SendDtmfTonesCompleted" &&
                        event.operationContext === sendDtmfTonesResult.operationContext) {
                        sendDtmfEventResult.isSuccess = true;
                        sendDtmfEventResult.successResult = event;
                        return true;
                    }
                    else if (event.callConnectionId === this.callConnectionId &&
                        event.kind === "SendDtmfTonesFailed" &&
                        event.operationContext === sendDtmfTonesResult.operationContext) {
                        sendDtmfEventResult.isSuccess = false;
                        sendDtmfEventResult.failureResult = event;
                        return true;
                    }
                    else {
                        return false;
                    }
                }, abortSignal, timeoutInMs);
                return sendDtmfEventResult;
            },
        };
        return sendDtmfTonesResult;
    }
    /**
     * Put participant on hold while playing audio.
     *
     * @param targetParticipant - The targets to play to.
     * @param options - Additional attributes for hold participant.
     */
    async hold(targetParticipant, options = {}) {
        const holdRequest = {
            targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
            playSourceInfo: options.playSource !== undefined
                ? this.createPlaySourceInternal(options.playSource)
                : undefined,
            operationContext: options.operationContext !== undefined ? options.operationContext : undefined,
            operationCallbackUri: options.operationCallbackUri !== undefined ? options.operationCallbackUri : undefined,
        };
        return this.callMedia.hold(this.callConnectionId, holdRequest);
    }
    /**
     * Remove participant from hold.
     *
     * @param targetParticipant - The targets to play to.
     * @param options - Additional attributes for unhold participant.
     */
    async unhold(targetParticipant, options = {}) {
        const unholdRequest = {
            targetParticipant: (0, communication_common_1.serializeCommunicationIdentifier)(targetParticipant),
            operationContext: options.operationContext !== undefined ? options.operationContext : undefined,
        };
        return this.callMedia.unhold(this.callConnectionId, unholdRequest);
    }
    /**
     * Starts transcription in the call
     * @param options - Additional attributes for start transcription.
     */
    async startTranscription(options = {}) {
        const startTranscriptionRequest = {
            locale: options.locale,
            operationContext: options.operationContext,
            speechRecognitionModelEndpointId: options.speechRecognitionModelEndpointId,
            operationCallbackUri: options.operationCallbackUrl,
        };
        return this.callMedia.startTranscription(this.callConnectionId, startTranscriptionRequest, {});
    }
    /**
     * Stops transcription in the call.
     * @param options - Additional attributes for stop transcription.
     */
    async stopTranscription(options = {}) {
        const stopTranscriptionRequest = {
            operationContext: options.operationContext,
            operationCallbackUri: options.operationCallbackUrl,
        };
        return this.callMedia.stopTranscription(this.callConnectionId, stopTranscriptionRequest, {});
    }
    /**
     * Update transcription language.
     * @param locale - Defines new locale for transcription.
     */
    async updateTranscription(locale, options) {
        const updateTranscriptionRequest = {
            locale: locale,
            speechRecognitionModelEndpointId: options === null || options === void 0 ? void 0 : options.speechRecognitionModelEndpointId,
            operationContext: options === null || options === void 0 ? void 0 : options.operationContext,
            operationCallbackUri: options === null || options === void 0 ? void 0 : options.operationCallbackUrl,
        };
        return this.callMedia.updateTranscription(this.callConnectionId, updateTranscriptionRequest, {});
    }
    /**
     * Starts media streaming in the call.
     * @param options - Additional attributes for start media streaming.
     */
    async startMediaStreaming(options = {}) {
        const startMediaStreamingRequest = {
            operationContext: options.operationContext,
            operationCallbackUri: options.operationCallbackUrl,
        };
        return this.callMedia.startMediaStreaming(this.callConnectionId, startMediaStreamingRequest, options);
    }
    /**
     * Stops media streaming in the call.
     * @param options - Additional attributes for stop media streaming.
     */
    async stopMediaStreaming(options = {}) {
        const stopMediaStreamingRequest = {
            operationCallbackUri: options.operationCallbackUrl,
            operationContext: options.operationContext,
        };
        return this.callMedia.stopMediaStreaming(this.callConnectionId, stopMediaStreamingRequest, options);
    }
    /**
     * Interrupt audio and announce to specific participant.
     *
     * @param playSources - A PlaySource representing the sources to play.
     * @param playTo - The targets to play to.
     * @param options - Additional attributes for interrupt audio and announce.
     */
    async interruptAudioAndAnnounce(playSources, playTo, options = {}) {
        const interruptAudioAndAnnounceRequest = {
            playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
            playTo: (0, communication_common_1.serializeCommunicationIdentifier)(playTo),
            operationContext: options.operationContext,
        };
        return this.callMedia.interruptAudioAndAnnounce(this.callConnectionId, interruptAudioAndAnnounceRequest);
    }
}
exports.CallMedia = CallMedia;
//# sourceMappingURL=callMedia.js.map