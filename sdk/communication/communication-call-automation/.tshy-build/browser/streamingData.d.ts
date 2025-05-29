import type { StreamingDataKind, StreamingDataResult } from "./models/streaming.js";
/** Class to handle the parsing of incoming streaming data. */
export declare class StreamingData {
    private static streamingKind;
    /** Parses a encoded json string or buffer into a StreamingData object,
              which can be one of the following subtypes: AudioData, AudioMetadata, TranscriptionData, or TranscriptionMetadata. */
    static parse(data: string | ArrayBuffer): StreamingDataResult;
    static getStreamingKind(): StreamingDataKind;
    /** Parses a encoded json string or buffer into a StreamingData object,
              which can be one of the following subtypes: AudioData, AudioMetadata, TranscriptionData, or TranscriptionMetadata. */
    private static parseStreamingData;
}
//# sourceMappingURL=streamingData.d.ts.map