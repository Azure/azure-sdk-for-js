// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createIdentifierFromRawId } from "@azure/communication-common";
import {
  AudioData,
  AudioMetadata,
  MediaKind,
  OutStreamingData,
  StreamingDataKind,
  StreamingDataResult,
  TranscriptionData,
  TranscriptionMetadata,
} from "./models/streaming";

/** Class to handle the parsing of incoming streaming data. */
export class StreamingData {
  private static streamingKind: StreamingDataKind;

  /** Public static method to parse the incoming package. */
  static parse(data: string | ArrayBuffer): StreamingDataResult {
    return StreamingData.parseStreamingData(data);
  }

  /** Public static method to stringify the outbound audio data. */
  static getStreamingDataForOutbound(data: string): string {
    const outStreamingData: OutStreamingData = {
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
  static getStopAudioForOutbound(): string {
    const outStreamingData: OutStreamingData = {
      kind: MediaKind.StopAudio,
      audioData: undefined,
      stopAudio: {},
    };
    const json = JSON.stringify(outStreamingData);
    return json;
  }

  // Get Streaming data Kind.
  static getStreamingKind() {
    return StreamingData.streamingKind;
  }

  /** Private static method to handle the specific parsing based on the data. */
  private static parseStreamingData(data: string | ArrayBuffer): StreamingDataResult {
    let stringJson: string;

    if (typeof data === "string") {
      stringJson = data;
    } else {
      const decoder = new TextDecoder();
      stringJson = decoder.decode(data);
    }

    const jsonObject = JSON.parse(stringJson);
    const kind: StreamingDataKind = jsonObject.kind;

    switch (kind) {
      case "TranscriptionMetadata": {
        const transcriptionMetadata: TranscriptionMetadata = {
          subscriptionId: jsonObject.transcriptionMetadata.subscriptionId,
          locale: jsonObject.transcriptionMetadata.locale,
          callConnectionId: jsonObject.transcriptionMetadata.callConnectionId,
          correlationId: jsonObject.transcriptionMetadata.correlationId,
        };
        StreamingData.streamingKind = kind;
        return transcriptionMetadata;
      }
      case "TranscriptionData": {
        const transcriptionData: TranscriptionData = {
          text: jsonObject.transcriptionData.text,
          format: jsonObject.transcriptionData.format,
          confidence: jsonObject.transcriptionData.confidence,
          offsetInTicks: jsonObject.transcriptionData.offset,
          durationInTicks: jsonObject.transcriptionData.duration,
          words: jsonObject.transcriptionData.words.map(
            (word: { text: string; offset: number; duration: number }) => ({
              text: word.text,
              offsetInTicks: word.offset,
              durationInTicks: word.duration,
            }),
          ),
          participant: createIdentifierFromRawId(jsonObject.transcriptionData.participantRawID),
          resultState: jsonObject.transcriptionData.resultStatus,
        };
        StreamingData.streamingKind = kind;
        return transcriptionData;
      }
      case "AudioMetadata": {
        const audioMetadata: AudioMetadata = {
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
        const audioData: AudioData = {
          data: jsonObject.audioData.data,
          timestamp: jsonObject.audioData.timestamp,
          isSilent: jsonObject.audioData.silent,
          participant:
            jsonObject.audioData.participantRawID !== undefined
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
