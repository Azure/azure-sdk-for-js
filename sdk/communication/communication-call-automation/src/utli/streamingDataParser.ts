// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createIdentifierFromRawId } from "@azure/communication-common";
import { TranscriptionMetadata, TranscriptionData } from "../models/transcription";

/** Parse the incoming package. */
export function streamingData(
  packetData: string | ArrayBuffer,
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
    default:
      throw new Error(stringJson);
  }
}
