// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createIdentifierFromRawId } from "@azure/communication-common";
/** Class to handle the parsing of incoming streaming data. */
export class StreamingData {
    /** Parses a encoded json string or buffer into a StreamingData object,
              which can be one of the following subtypes: AudioData, AudioMetadata, TranscriptionData, or TranscriptionMetadata. */
    static parse(data) {
        return StreamingData.parseStreamingData(data);
    }
    // Get Streaming data Kind.
    static getStreamingKind() {
        return StreamingData.streamingKind;
    }
    /** Parses a encoded json string or buffer into a StreamingData object,
              which can be one of the following subtypes: AudioData, AudioMetadata, TranscriptionData, or TranscriptionMetadata. */
    static parseStreamingData(data) {
        let stringJson;
        if (typeof data === "string") {
            stringJson = data;
        }
        else {
            const decoder = new TextDecoder();
            stringJson = decoder.decode(data);
        }
        const jsonObject = JSON.parse(stringJson);
        const kind = jsonObject.kind;
        switch (kind) {
            case "TranscriptionMetadata": {
                const transcriptionMetadata = {
                    subscriptionId: jsonObject.transcriptionMetadata.subscriptionId,
                    locale: jsonObject.transcriptionMetadata.locale,
                    callConnectionId: jsonObject.transcriptionMetadata.callConnectionId,
                    correlationId: jsonObject.transcriptionMetadata.correlationId,
                };
                StreamingData.streamingKind = kind;
                return transcriptionMetadata;
            }
            case "TranscriptionData": {
                const transcriptionData = {
                    text: jsonObject.transcriptionData.text,
                    format: jsonObject.transcriptionData.format,
                    confidence: jsonObject.transcriptionData.confidence,
                    offsetInTicks: jsonObject.transcriptionData.offset,
                    durationInTicks: jsonObject.transcriptionData.duration,
                    words: jsonObject.transcriptionData.words.map((word) => ({
                        text: word.text,
                        offsetInTicks: word.offset,
                        durationInTicks: word.duration,
                    })),
                    participant: createIdentifierFromRawId(jsonObject.transcriptionData.participantRawID),
                    resultState: jsonObject.transcriptionData.resultStatus,
                };
                StreamingData.streamingKind = kind;
                return transcriptionData;
            }
            case "AudioMetadata": {
                const audioMetadata = {
                    subscriptionId: jsonObject.audioMetadata.subscriptionId,
                    encoding: jsonObject.audioMetadata.encoding,
                    sampleRate: jsonObject.audioMetadata.sampleRate,
                    channels: jsonObject.audioMetadata.channels,
                    length: jsonObject.audioMetadata.length,
                };
                StreamingData.streamingKind = kind;
                return audioMetadata;
            }
            case "AudioData": {
                const audioData = {
                    data: jsonObject.audioData.data,
                    timestamp: jsonObject.audioData.timestamp,
                    isSilent: jsonObject.audioData.silent,
                    participant: jsonObject.audioData.participantRawID !== undefined
                        ? createIdentifierFromRawId(jsonObject.audioData.participantRawID)
                        : undefined,
                };
                StreamingData.streamingKind = kind;
                return audioData;
            }
            default:
                throw new Error("Unknown data kind: " + jsonObject.kind);
        }
    }
}
//# sourceMappingURL=streamingData.js.map