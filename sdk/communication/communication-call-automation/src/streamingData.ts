// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createIdentifierFromRawId } from "@azure/communication-common";
import type {
  AudioData,
  AudioMetadata,
  DtmfData,
  StreamingDataKind,
  StreamingDataResult,
  TranscriptionData,
  TranscriptionMetadata,
} from "./models/streaming.js";

/** Class to handle the parsing of incoming streaming data. */
export class StreamingData {
  /** Parses a encoded json string or buffer into a StreamingData object,
            which can be one of the following subtypes: AudioData, AudioMetadata, TranscriptionData, or TranscriptionMetadata. */
  static parse(data: string | ArrayBuffer): StreamingDataResult {
    return StreamingData.parseStreamingData(data);
  }

  /** Parses a encoded json string or buffer into a StreamingData object,
            which can be one of the following subtypes: AudioData, AudioMetadata, TranscriptionData, or TranscriptionMetadata. */
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
          kind: 'TranscriptionMetadata',
          subscriptionId: jsonObject.transcriptionMetadata.subscriptionId,
          locale: jsonObject.transcriptionMetadata.locale,
          callConnectionId: jsonObject.transcriptionMetadata.callConnectionId,
          correlationId: jsonObject.transcriptionMetadata.correlationId,
          speechRecognitionModelEndpointId:
            jsonObject.transcriptionMetadata.speechRecognitionModelEndpointId,
        };
        return transcriptionMetadata;
      }
      case "TranscriptionData": {
        const transcriptionData: TranscriptionData = {
          kind: 'TranscriptionData',
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
        return transcriptionData;
      }
      case "AudioMetadata": {
        const audioMetadata: AudioMetadata = {
          kind: 'AudioMetadata',
          subscriptionId: jsonObject.audioMetadata.subscriptionId,
          encoding: jsonObject.audioMetadata.encoding,
          sampleRate: jsonObject.audioMetadata.sampleRate,
          channels: jsonObject.audioMetadata.channels,
        };
        return audioMetadata;
      }
      case "AudioData": {
        const audioData: AudioData = {
          kind: 'AudioData',
          data: jsonObject.audioData.data,
          timestamp: jsonObject.audioData.timestamp,
          isSilent: jsonObject.audioData.silent,
          participant:
            jsonObject.audioData.participantRawID !== undefined
              ? createIdentifierFromRawId(jsonObject.audioData.participantRawID)
              : undefined,
        };
        return audioData;
      }
      case "DtmfData": {
        const dtmfData: DtmfData = {
          kind: 'DtmfData',
          data: jsonObject.dtmfData.data,
        };
        return dtmfData;
      }
      default:
        throw new Error("Unknown data kind: " + jsonObject.kind);
    }
  }
}
