// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export var MediaKind;
(function (MediaKind) {
    /** Audio data.*/
    MediaKind["AudioData"] = "audioData";
    /** stop audio data*/
    MediaKind["StopAudio"] = "stopAudio";
})(MediaKind || (MediaKind = {}));
/**
 * The format of transcription text.
 */
export var TextFormat;
(function (TextFormat) {
    /** Formatted recognize text with punctuations.*/
    TextFormat["Display"] = "display";
})(TextFormat || (TextFormat = {}));
// Enum for different kinds of streaming data in a call automation system
export var StreamingDataKind;
(function (StreamingDataKind) {
    // Audio data type
    StreamingDataKind["AudioData"] = "AudioData";
    // Audio metadata type
    StreamingDataKind["AudioMetadata"] = "AudioMetadata";
    // Transcription data type
    StreamingDataKind["TranscriptionData"] = "TranscriptionData";
    // Transcription metadata type
    StreamingDataKind["TranscriptionMetadata"] = "TranscriptionMetadata";
})(StreamingDataKind || (StreamingDataKind = {}));
// Enum for channel.
export var Channel;
(function (Channel) {
    Channel[Channel["Unknown"] = 0] = "Unknown";
    Channel[Channel["Mono"] = 1] = "Mono";
})(Channel || (Channel = {}));
// Base class for Out Streaming Data
export class OutStreamingData {
    constructor(kind) {
        this.kind = kind;
    }
    /** Public static method to stringify the outbound audio data. */
    static getStreamingDataForOutbound(data) {
        const outStreamingData = {
            kind: MediaKind.AudioData,
            audioData: {
                data: data,
                timestamp: undefined,
                participant: undefined,
                isSilent: false,
            },
            stopAudio: {},
        };
        const json = JSON.stringify(outStreamingData);
        return json;
    }
    /** Public static method to stringify the stop audio data. */
    static getStopAudioForOutbound() {
        const outStreamingData = {
            kind: MediaKind.StopAudio,
            audioData: undefined,
            stopAudio: {},
        };
        const json = JSON.stringify(outStreamingData);
        return json;
    }
}
//# sourceMappingURL=streaming.js.map