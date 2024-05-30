// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createIdentifierFromRawId } from "@azure/communication-common";
import { TranscriptionMetadata, TranscriptionData } from "../models/transcription";
import { AudioData, AudioMetadata } from "../models/audio";

/** Parse the incoming package. */
export function streamingData(
  packetData: string | ArrayBuffer,
): TranscriptionMetadata | TranscriptionData | AudioData | AudioMetadata {
  let stringJson: string;
  if (typeof packetData === "string") {
    stringJson = packetData;
  } else {
    const decoder = new TextDecoder();
    stringJson = decoder.decode(packetData);
  }

  const jsonObject = JSON.parse(stringJson);
  const kind: string = jsonObject.kind;

  switch (kind) {
    case "TranscriptionMetadata": {
      const transcriptionMetadata: TranscriptionMetadata = {
        subscriptionId: jsonObject.transcriptionMetadata.subscriptionId,
        locale: jsonObject.transcriptionMetadata.locale,
        callConnectionId: jsonObject.transcriptionMetadata.callConnectionId,
        correlationId: jsonObject.transcriptionMetadata.correlationId,
      };
      return transcriptionMetadata;
    }
    case "TranscriptionData": {
      const transcriptionData: TranscriptionData = {
        text: jsonObject.transcriptionData.text,
        format: jsonObject.transcriptionData.format,
        confidence: jsonObject.transcriptionData.confidence,
        offsetInTicks: jsonObject.transcriptionData.offsetInTicks,
        durationInTicks: jsonObject.transcriptionData.durationInTicks,
        words: jsonObject.transcriptionData.words,
        participant: createIdentifierFromRawId(jsonObject.transcriptionData.participantRawID),
        resultState: jsonObject.transcriptionData.resultState,
      };
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
      return audioMetadata;
    }
    case "AudioData": {
      const audioData: AudioData = {
        data: jsonObject.audioData.data,
        timestamp: jsonObject.audioData.timestamp,
        isSilent: jsonObject.audioData.silent,
      };
      return audioData;
    }
    default:
      throw new Error(stringJson);
  }
}
