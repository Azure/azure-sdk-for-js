// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createIdentifierFromRawId } from "@azure/communication-common";
import {
  TranscriptionDataInternal,
  TranscriptionMetadata,
  TranscriptionData,
} from "../models/transcription";

/** Parse the incoming package. */
export function streamingDataParser(
  packetData: string | BinaryData,
): TranscriptionMetadata | TranscriptionData {
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
      const transcriptionMetadata: TranscriptionMetadata = jsonObject.transcriptionMetadata;
      return transcriptionMetadata;
    }
    case "TranscriptionData": {
      const transcriptionDataInternal: TranscriptionDataInternal = jsonObject.transcriptionData;
      const transcriptionData: TranscriptionData = {
        text: transcriptionDataInternal.text,
        format: transcriptionDataInternal.format,
        confidence: transcriptionDataInternal.confidence,
        offset: transcriptionDataInternal.offset,
        duration: transcriptionDataInternal.duration,
        words: transcriptionDataInternal.words,
        participant: createIdentifierFromRawId(transcriptionDataInternal.participantRawID),
        resultStatus: transcriptionDataInternal.resultStatus,
      };
      return transcriptionData;
    }
    default:
      throw new Error(stringJson);
  }
}
