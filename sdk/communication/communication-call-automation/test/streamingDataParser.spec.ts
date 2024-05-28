// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TranscriptionData, TranscriptionMetadata } from "../src/models/transcription";
import { streamingData } from "../src/utli/streamingDataParser";
import { assert } from "chai";

describe("Stream data parser unit tests", function () {
  const encoder = new TextEncoder();
  const transcriptionMetaDataJson =
    '{"kind":"TranscriptionMetadata","transcriptionMetadata":{"subscriptionId":"0000a000-9999-5555-ae00-cd00e0bc0000","locale":"en-US","callConnectionId":"6d09449c-6677-4f91-8cb7-012c338e6ec1","correlationId":"6d09449c-6677-4f91-8cb7-012c338e6ec1"}}';
  const transcriptionDataJson =
    '{"kind":"TranscriptionData","transcriptionData":{"text":"Hello everyone.","format":"display","confidence":0.8249790668487549,"offset":2516933652456984600,"words":[{"text":"hello","offset":2516933652456984600},{"text":"everyone","offset":2516933652459784700}],"participantRawID":"4:+910000000000","resultStatus":"Final"}}';

  it("Successfully parse binary data to transcription meta data ", function () {
    const transcriptionMetaDataBinary = encoder.encode(transcriptionMetaDataJson);
    const parsedData = streamingData(transcriptionMetaDataBinary);
    if ("locale" in parsedData) {
      validateTranscriptionMetadata(parsedData);
    }
  });

  it("Successfully parse json data to transcription meta data ", function () {
    const parsedData = streamingData(transcriptionMetaDataJson);
    if ("locale" in parsedData) {
      validateTranscriptionMetadata(parsedData);
    }
  });

  it("Successfully parse binary data to transcription data ", function () {
    const transcriptionDataBinary = encoder.encode(transcriptionDataJson);
    const parsedData = streamingData(transcriptionDataBinary);
    if ("text" in parsedData) {
      validateTranscriptionData(parsedData);
    }
  });

  it("Successfully parse json data to transcription data ", function () {
    const parsedData = streamingData(transcriptionDataJson);
    if ("text" in parsedData) {
      validateTranscriptionData(parsedData);
    }
  });
});

function validateTranscriptionMetadata(transcriptionMetadata: TranscriptionMetadata): void {
  assert.equal(transcriptionMetadata.subscriptionId, "0000a000-9999-5555-ae00-cd00e0bc0000");
  assert.equal(transcriptionMetadata.locale, "en-US");
  assert.equal(transcriptionMetadata.correlationId, "6d09449c-6677-4f91-8cb7-012c338e6ec1");
  assert.equal(transcriptionMetadata.callConnectionId, "6d09449c-6677-4f91-8cb7-012c338e6ec1");
}

function validateTranscriptionData(transcriptionData: TranscriptionData): void {
  assert.equal(transcriptionData.text, "Hello everyone.");
  assert.equal(transcriptionData.resultState, "Final");
  assert.equal(transcriptionData.confidence, 0.8249790668487549);
  assert.equal(transcriptionData.offsetInTicks, 2516933652456984600);
  assert.equal(transcriptionData.words.length, 2);
  assert.equal(transcriptionData.words[0].text, "hello");
  assert.equal(transcriptionData.words[0].offsetInTicks, 2516933652456984600);
  assert.equal(transcriptionData.words[1].text, "everyone");
  assert.equal(transcriptionData.words[1].offsetInTicks, 2516933652459784700);
  if ("kind" in transcriptionData.participant) {
    assert.equal(transcriptionData.participant.kind, "phoneNumber");
  }
  if ("phoneNumber" in transcriptionData.participant) {
    assert.equal(transcriptionData.participant.phoneNumber, "+910000000000");
  }
}
