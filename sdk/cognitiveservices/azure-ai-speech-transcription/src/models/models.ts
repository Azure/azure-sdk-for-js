// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FileContents} from "../static-helpers/multipartHelpers.js";
import { createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";

/** Request model for transcription operation. */
export interface TranscribeRequestContent {
  /** Metadata for a transcription request. This field contains a JSON-serialized object of type `TranscriptionOptions`. */
  options?: TranscriptionOptions;
  /** The content of the audio file to be transcribed. The audio file must be shorter than 2 hours in audio duration and smaller than 250 MB in size. Optional if audioUrl is provided in the definition. */
  audio?: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function transcribeRequestContentSerializer(item: TranscribeRequestContent): any {
  return [
    ...(item["options"] === undefined
      ? []
      : [
          {
            name: "definition",
            body: !item["options"]
              ? item["options"]
              : transcriptionOptionsSerializer(item["options"]),
          },
        ]),
    ...(item["audio"] === undefined
      ? []
      : [createFilePartDescriptor("audio", item["audio"], "application/octet-stream")]),
  ];
}

/** Metadata for a transcription request. */
export interface TranscriptionOptions {
  /** The URL of the audio to be transcribed. The audio must be shorter than 2 hours in audio duration and smaller than 250 MB in size. If both Audio and AudioUrl are provided, Audio is used. */
  audioUrl?: string;
  /** A list of possible locales for the transcription. If not specified, the locale of the speech in the audio is detected automatically from all supported locales. */
  locales?: string[];
  /** Maps some or all candidate locales to a model URI to be used for transcription. If no mapping is given, the default model for the locale is used. */
  models?: Record<string, string>;
  /** Mode of profanity filtering. */
  profanityFilterMode?: ProfanityFilterMode;
  /** Mode of diarization. */
  diarizationOptions?: TranscriptionDiarizationOptions;
  /** The 0-based indices of the channels to be transcribed separately. If not specified, multiple channels are merged and transcribed jointly. Only up to two channels are supported. */
  activeChannels?: number[];
  /** Enhanced mode properties. */
  enhancedMode?: EnhancedModeProperties;
  /** Phrase list properties. */
  phraseList?: PhraseListProperties;
}

export function transcriptionOptionsSerializer(item: TranscriptionOptions): any {
  return {
    audioUrl: item["audioUrl"],
    locales: !item["locales"]
      ? item["locales"]
      : item["locales"].map((p: any) => {
          return p;
        }),
    models: item["models"],
    profanityFilterMode: item["profanityFilterMode"],
    diarization: !item["diarizationOptions"]
      ? item["diarizationOptions"]
      : transcriptionDiarizationOptionsSerializer(item["diarizationOptions"]),
    channels: !item["activeChannels"]
      ? item["activeChannels"]
      : item["activeChannels"].map((p: any) => {
          return p;
        }),
    enhancedMode: !item["enhancedMode"]
      ? item["enhancedMode"]
      : enhancedModePropertiesSerializer(item["enhancedMode"]),
    phraseList: !item["phraseList"]
      ? item["phraseList"]
      : phraseListPropertiesSerializer(item["phraseList"]),
  };
}

/** Mode of profanity filtering. */
export type ProfanityFilterMode = "None" | "Removed" | "Tags" | "Masked";

/** The Speaker Diarization settings. Diarization settings must be specified to enable speaker diarization. */
export interface TranscriptionDiarizationOptions {
  /** Gets or sets a value indicating whether speaker diarization is enabled. */
  enabled?: boolean;
  /** Gets or sets a hint for the maximum number of speakers for diarization. Must be greater than 1 and less than 36. */
  maxSpeakers?: number;
}

export function transcriptionDiarizationOptionsSerializer(
  item: TranscriptionDiarizationOptions,
): any {
  return { enabled: item["enabled"], maxSpeakers: item["maxSpeakers"] };
}

/** Enhanced mode properties for transcription. */
export interface EnhancedModeProperties {
  /** Enable enhanced mode for transcription. */
  enabled?: boolean;
  /** Task type for enhanced mode. */
  task?: string;
  /** Target language for enhanced mode. */
  targetLanguage?: string;
  /** A list of user prompts. */
  prompt?: string[];
}

export function enhancedModePropertiesSerializer(item: EnhancedModeProperties): any {
  return {
    enabled: item["enabled"],
    task: item["task"],
    targetLanguage: item["targetLanguage"],
    prompt: !item["prompt"]
      ? item["prompt"]
      : item["prompt"].map((p: any) => {
          return p;
        }),
  };
}

/** Phrase list properties for transcription. */
export interface PhraseListProperties {
  /** List of phrases for recognition. */
  phrases?: string[];
  /** Biasing weight for phrase list (1.0 to 20.0). */
  biasingWeight?: number;
}

export function phraseListPropertiesSerializer(item: PhraseListProperties): any {
  return {
    phrases: !item["phrases"]
      ? item["phrases"]
      : item["phrases"].map((p: any) => {
          return p;
        }),
    biasingWeight: item["biasingWeight"],
  };
}

/** The result of the transcribe operation. */
export interface TranscriptionResult {
  /** The duration of the audio in milliseconds. */
  durationMilliseconds: number;
  /** The full transcript for each channel. */
  combinedPhrases: ChannelCombinedPhrases[];
  /** The transcription results segmented into phrases. */
  phrases: TranscribedPhrase[];
}

/** Deserializer for TranscriptionResult */
export function transcriptionResultDeserializer(item: Record<string, any>): TranscriptionResult {
  return {
    durationMilliseconds: item["durationMilliseconds"],
    combinedPhrases: channelCombinedPhrasesArrayDeserializer(item["combinedPhrases"]),
    phrases: transcribedPhraseArrayDeserializer(item["phrases"]),
  };
}

export function channelCombinedPhrasesArrayDeserializer(
  result: Array<ChannelCombinedPhrases>,
): any[] {
  return result.map((item) => {
    return channelCombinedPhrasesDeserializer(item);
  });
}

/** The full transcript per channel. */
export interface ChannelCombinedPhrases {
  /** The 0-based channel index. Only present if channel separation is enabled. */
  channel?: number;
  /** The complete transcribed text for the channel. */
  text: string;
}

/** Deserializer for ChannelCombinedPhrases */
export function channelCombinedPhrasesDeserializer(item: Record<string, any>): ChannelCombinedPhrases {
  return {
    channel: item["channel"],
    text: item["text"],
  };
}

export function transcribedPhraseArrayDeserializer(result: Array<TranscribedPhrase>): any[] {
  return result.map((item) => {
    return transcribedPhraseDeserializer(item);
  });
}

/** A transcribed phrase. */
export interface TranscribedPhrase {
  /** The 0-based channel index. Only present if channel separation is enabled. */
  channel?: number;
  /** A unique integer number that is assigned to each speaker detected in the audio without particular order. Only present if speaker diarization is enabled. */
  speaker?: number;
  /** The start offset of the phrase in milliseconds. */
  offsetMilliseconds: number;
  /** The duration of the phrase in milliseconds. */
  durationMilliseconds: number;
  /** The transcribed text of the phrase. */
  text: string;
  /** The words that make up the phrase. Only present if word-level timestamps are enabled. */
  words?: TranscribedWord[];
  /** The locale of the phrase. */
  locale?: string;
  /** The confidence value for the phrase. */
  confidence: number;
}

/** Deserializer for TranscribedPhrase */
export function transcribedPhraseDeserializer(item: Record<string, any>): TranscribedPhrase {
  return {
    channel: item["channel"],
    speaker: item["speaker"],
    offsetMilliseconds: item["offsetMilliseconds"],
    durationMilliseconds: item["durationMilliseconds"],
    text: item["text"],
    words: !item["words"] ? item["words"] : transcribedWordArrayDeserializer(item["words"]),
    locale: item["locale"],
    confidence: item["confidence"],
  };
}

export function transcribedWordArrayDeserializer(result: Array<TranscribedWord>): any[] {
  return result.map((item) => {
    return transcribedWordDeserializer(item);
  });
}

/** Time-stamped word in the display form. */
export interface TranscribedWord {
  /** The recognized word, including punctuation. */
  text: string;
  /** The start offset of the word in milliseconds. */
  offsetMilliseconds: number;
  /** The duration of the word in milliseconds. */
  durationMilliseconds: number;
}

/** Deserializer for TranscribedWord */
export function transcribedWordDeserializer(item: Record<string, any>): TranscribedWord {
  return {
    text: item["text"],
    offsetMilliseconds: item["offsetMilliseconds"],
    durationMilliseconds: item["durationMilliseconds"],
  };
}

/** Service API versions. */
export enum KnownServiceApiVersions {
  /** 2025-10-15 */
  V20251015 = "2025-10-15",
}
