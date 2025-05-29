// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CallRecordingImpl } from "./generated/src/operations/index.js";
import { communicationIdentifierModelConverter } from "./utli/converters.js";
import { ContentDownloaderImpl } from "./contentDownloader.js";
import * as fs from "node:fs";
import { randomUUID } from "@azure/core-util";
import { createCustomCallAutomationApiClient } from "./credential/callAutomationAuthPolicy.js";
/**
 * CallRecording class represents call recording related APIs.
 */
export class CallRecording {
    constructor(endpoint, credential, options) {
        this.callAutomationApiClient = createCustomCallAutomationApiClient(credential, options, endpoint);
        this.callRecordingImpl = new CallRecordingImpl(this.callAutomationApiClient);
        this.contentDownloader = new ContentDownloaderImpl(this.callAutomationApiClient);
    }
    /**
     * Starts a call recording with the specified options.
     * @param startCallRecordingRequest - options to start the call recording
     * @param options - Operation options.
     */
    async start(options) {
        const startCallRecordingRequest = {
            callLocator: options.callLocator ? options.callLocator : undefined,
        };
        startCallRecordingRequest.recordingChannelType = options.recordingChannel;
        startCallRecordingRequest.recordingContentType = options.recordingContent;
        startCallRecordingRequest.recordingFormatType = options.recordingFormat;
        startCallRecordingRequest.recordingStateCallbackUri = options.recordingStateCallbackEndpointUrl;
        startCallRecordingRequest.pauseOnStart = options.pauseOnStart;
        startCallRecordingRequest.recordingStorage = options.recordingStorage;
        startCallRecordingRequest.callConnectionId = options.callConnectionId
            ? options.callConnectionId
            : undefined;
        if (options.channelAffinity) {
            startCallRecordingRequest.channelAffinity = [];
            options.channelAffinity.forEach((identifier) => {
                var _a;
                (_a = startCallRecordingRequest.channelAffinity) === null || _a === void 0 ? void 0 : _a.push({
                    participant: communicationIdentifierModelConverter(identifier.targetParticipant),
                    channel: identifier.channel,
                });
            });
        }
        if (options.audioChannelParticipantOrdering) {
            startCallRecordingRequest.audioChannelParticipantOrdering = [];
            options.audioChannelParticipantOrdering.forEach((identifier) => {
                var _a;
                (_a = startCallRecordingRequest.audioChannelParticipantOrdering) === null || _a === void 0 ? void 0 : _a.push(communicationIdentifierModelConverter(identifier));
            });
        }
        if (options.callLocator) {
            if (options.callLocator.kind === "groupCallLocator") {
                startCallRecordingRequest.callLocator = {
                    groupCallId: options.callLocator.id,
                    kind: "groupCallLocator",
                };
            }
            else if (options.callLocator.kind === "roomCallLocator") {
                startCallRecordingRequest.callLocator = {
                    roomId: options.callLocator.id,
                    kind: "roomCallLocator",
                };
            }
            else {
                startCallRecordingRequest.callLocator = {
                    serverCallId: options.callLocator.id,
                    kind: "serverCallLocator",
                };
            }
        }
        const optionsInternal = Object.assign(Object.assign({}, options), { repeatabilityFirstSent: new Date(), repeatabilityRequestID: randomUUID() });
        const response = await this.callRecordingImpl.startRecording(startCallRecordingRequest, optionsInternal);
        const result = {
            recordingId: response.recordingId,
            recordingKind: response.recordingKind,
            recordingState: response.recordingState,
        };
        return result;
    }
    /**
     * Returns call recording properties.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains getRecordingProperties api options.
     */
    async getState(recordingId, options = {}) {
        const response = await this.callRecordingImpl.getRecordingProperties(recordingId, options);
        const result = {
            recordingId: response.recordingId,
            recordingKind: response.recordingKind,
            recordingState: response.recordingState,
        };
        return result;
    }
    /**
     * Stops a call recording.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains stopRecording api options.
     */
    async stop(recordingId, options = {}) {
        return this.callRecordingImpl.stopRecording(recordingId, options);
    }
    /**
     * Pauses a call recording.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains pauseRecording api options.
     */
    async pause(recordingId, options = {}) {
        return this.callRecordingImpl.pauseRecording(recordingId, options);
    }
    /**
     * Resumes a call recording.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains resumeRecording api options.
     */
    async resume(recordingId, options = {}) {
        return this.callRecordingImpl.resumeRecording(recordingId, options);
    }
    /**
     * Deletes a recording.
     * @param recordingLocationUrl - The recording location url. Required.
     * @param options - Additional request options contains deleteRecording api options.
     */
    async delete(recordingLocationUrl, options = {}) {
        await this.contentDownloader.deleteRecording(recordingLocationUrl, options);
    }
    /**
     * Returns a stream with a call recording.
     * @param sourceLocationUrl - The source location url. Required.
     * @param options - Additional request options contains downloadRecording api options.
     */
    async downloadStreaming(sourceLocationUrl, options = {}) {
        const result = this.contentDownloader.download(sourceLocationUrl, options);
        const recordingStream = (await result).readableStreamBody;
        if (recordingStream) {
            return recordingStream;
        }
        else {
            throw Error("failed to get stream");
        }
    }
    /**
     * Downloads a call recording file to the specified stream.
     * @param sourceLocationUrl - The source location url. Required.
     * @param destinationStream - The destination stream. Required.
     * @param options - Additional request options contains downloadRecording api options.
     */
    async downloadToStream(sourceLocationUrl, destinationStream, options = {}) {
        const result = this.contentDownloader.download(sourceLocationUrl, options);
        const recordingStream = (await result).readableStreamBody;
        if (recordingStream) {
            recordingStream.pipe(destinationStream);
            const finish = new Promise((resolve, reject) => {
                destinationStream.on("finish", resolve);
                destinationStream.on("error", reject);
            });
            await finish;
        }
        else {
            throw Error("failed to get stream");
        }
    }
    /**
     * Downloads a call recording file to the specified path.
     * @param sourceLocationUrl - The source location url. Required.
     * @param destinationPath - The destination path. Required.
     * @param options - Additional request options contains downloadRecording api options.
     */
    async downloadToPath(sourceLocationUrl, destinationPath, options = {}) {
        const result = this.contentDownloader.download(sourceLocationUrl, options);
        const recordingStream = (await result).readableStreamBody;
        if (recordingStream) {
            const writeFileStream = fs.createWriteStream(destinationPath);
            recordingStream.pipe(writeFileStream);
            const finish = new Promise((resolve, reject) => {
                writeFileStream.on("finish", resolve);
                writeFileStream.on("error", reject);
            });
            await finish;
        }
        else {
            throw Error("failed to get stream");
        }
    }
}
//# sourceMappingURL=callRecording.js.map