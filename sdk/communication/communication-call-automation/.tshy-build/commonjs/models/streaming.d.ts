import type { CommunicationIdentifier } from "@azure/communication-common";
import type { TranscriptionResultState } from "../generated/src/index.js";
/**
 * Audio streaming data.
 */
export interface AudioData {
    /** A unique identifier for the media subscription.*/
    data: string;
    /** The timestamp indicating when the media content was received by the bot,
            or if the bot is sending media, the timestamp of when the media was sourced.
            The format is ISO 8601 (yyyy-mm-ddThh:mm).*/
    timestamp?: Date;
    /** Indicates whether the received audio buffer contains only silence..*/
    isSilent?: boolean;
    /** The identified speaker based on participant raw ID. */
    participant?: CommunicationIdentifier | undefined;
}
/**
 * Audio streaming metadata.
 */
export interface AudioMetadata {
    /** Audio streaming subscription id.*/
    subscriptionId: string;
    /** The format used to encode the audio. Currently, only "pcm" (Pulse Code Modulation) is supported.*/
    encoding: string;
    /** The number of samples per second in the audio. Supported values are 16kHz or 24kHz.*/
    sampleRate: number;
    /** Specifies the number of audio channels in the audio configuration.
            Currently, only "mono" (single channel) is supported.*/
    channels: Channel;
    /** The size of the audio data being sent, based on the sample rate and duration.*/
    length: number;
}
export declare enum MediaKind {
    /** Audio data.*/
    AudioData = "audioData",
    /** stop audio data*/
    StopAudio = "stopAudio"
}
export interface StopAudio {
}
/**
 * The format of transcription text.
 */
export declare enum TextFormat {
    /** Formatted recognize text with punctuations.*/
    Display = "display"
}
/**
 * Text in the phrase.
 */
export interface WordData {
    /** Text in the phrase.*/
    text: string;
    /** The word's position within the phrase.*/
    offsetInTicks: number;
    /** Duration in ticks. 1 tick = 100 nanoseconds.*/
    durationInTicks: number;
}
/**
 * Metadata for Transcription Streaming.
 */
export interface TranscriptionMetadata {
    /** Transcription Subscription Id.*/
    subscriptionId: string;
    /** The target locale in which the translated text needs to be.*/
    locale: string;
    /** call connection Id.*/
    callConnectionId: string;
    /** correlation Id.*/
    correlationId: string;
}
/**
 * Streaming Transcription.
 */
export interface TranscriptionData {
    /** The display form of the recognized word.*/
    text: string;
    /** The format of text.*/
    format: TextFormat;
    /** Confidence of recognition of the whole phrase, from 0.0 (no confidence) to 1.0 (full confidence). */
    confidence: number;
    /** The position of this payload. 1 tick = 100 nanoseconds. */
    offsetInTicks: number;
    /** Duration in ticks. 1 tick = 100 nanoseconds. */
    durationInTicks: number;
    /** The result for each word of the phrase. */
    words: WordData[];
    /** The identified speaker based on participant raw ID. */
    participant: CommunicationIdentifier;
    /** State of the result of transcription. */
    resultState: TranscriptionResultState;
}
export type StreamingDataResult = TranscriptionMetadata | TranscriptionData | AudioData | AudioMetadata;
export declare enum StreamingDataKind {
    AudioData = "AudioData",
    AudioMetadata = "AudioMetadata",
    TranscriptionData = "TranscriptionData",
    TranscriptionMetadata = "TranscriptionMetadata"
}
export declare enum Channel {
    Unknown = 0,
    Mono = 1
}
export declare class OutStreamingData {
    /** Out streaming data kind ex. StopAudio, AudioData*/
    kind: MediaKind;
    /** Out streaming Audio Data */
    audioData?: AudioData;
    /** Out streaming Stop Audio Data */
    stopAudio?: StopAudio;
    constructor(kind: MediaKind);
    /** Public static method to stringify the outbound audio data. */
    static getStreamingDataForOutbound(data: string): string;
    /** Public static method to stringify the stop audio data. */
    static getStopAudioForOutbound(): string;
}
//# sourceMappingURL=streaming.d.ts.map