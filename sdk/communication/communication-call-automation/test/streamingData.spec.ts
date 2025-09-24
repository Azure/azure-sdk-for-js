// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AudioData,
  AudioMetadata,
  DtmfData,
  TranscriptionData,
  TranscriptionMetadata,
} from "../src/models/streaming.js";
import { StreamingData } from "../src/streamingData.js";
import { describe, it, assert } from "vitest";

describe("Stream data parser unit tests", function () {
  const encoder = new TextEncoder();
  const transcriptionMetaDataJson =
    '{"kind":"TranscriptionMetadata","transcriptionMetadata":{"subscriptionId":"0000a000-9999-5555-ae00-cd00e0bc0000","locale":"en-US","callConnectionId":"6d09449c-6677-4f91-8cb7-012c338e6ec1","correlationId":"6d09449c-6677-4f91-8cb7-012c338e6ec1", "speechRecognitionModelEndpointId":"0000a000-9999-5555-ae00-cd00e0bc0001"}}';
  const transcriptionDataJson =
    '{"kind":"TranscriptionData","transcriptionData":{"text":"Hello everyone.","format":"display","confidence":0.922650933265686,"offset":212483227,"duration":9600000,"words":[{"text":"hello","offset":212483227,"duration":2800000},{"text":"everyone","offset":215283227,"duration":6800000}],"participantRawID":"4:+000000000000","resultStatus":"Final"}}';

  const audioMetadataJson =
    '{"kind":"AudioMetadata","audioMetadata":{"subscriptionId":"4af370df-3868-461f-8242-91f077a6f8a6","encoding":"PCM","sampleRate":16000,"channels":1,"length":640}}';
  const audioDataJson =
    '{"kind":"AudioData","audioData":{"timestamp":"2024-05-30T06:25:02.948Z","data":"test","silent":false, "participantRawID":"28:6b45c5b6-1c34-47c0-8980-11e98d47d23f"}}';

  const dtmfDataJson = '{"kind":"DtmfData","dtmfData":{"data":"test"}}';
  it("Successfully parse binary data to transcription meta data ", function () {
    const transcriptionMetaDataBinary = encoder.encode(transcriptionMetaDataJson);
    const parsedData = StreamingData.parse(transcriptionMetaDataBinary.slice().buffer);
    if ("locale" in parsedData) {
      validateTranscriptionMetadata(parsedData);
    }
  });

  it("Successfully parse json data to transcription meta data ", function () {
    const parsedData = StreamingData.parse(transcriptionMetaDataJson);
    if ("locale" in parsedData) {
      validateTranscriptionMetadata(parsedData);
    }
  });

  it("Successfully parse binary data to transcription data ", function () {
    const transcriptionDataBinary = encoder.encode(transcriptionDataJson);
    const parsedData = StreamingData.parse(transcriptionDataBinary.slice().buffer);
    if ("text" in parsedData) {
      validateTranscriptionData(parsedData);
    }
  });

  it("Successfully parse json data to transcription data ", function () {
    const parsedData = StreamingData.parse(transcriptionDataJson);
    if ("text" in parsedData) {
      validateTranscriptionData(parsedData);
    }
  });
  it("Successfully parse binary data to audio meta data ", function () {
    const audioMetaDataBinary = encoder.encode(audioMetadataJson);
    const parsedData = StreamingData.parse(audioMetaDataBinary.slice().buffer);
    if ("encoding" in parsedData) {
      validateAudioMetadata(parsedData);
    }
  });

  it("Successfully parse json data to audio meta data ", function () {
    const parsedData = StreamingData.parse(audioMetadataJson);
    if ("encoding" in parsedData) {
      validateAudioMetadata(parsedData);
    }
  });

  it("Successfully parse binary data to audio data ", function () {
    const audioDataBinary = encoder.encode(audioDataJson);
    const parsedData = StreamingData.parse(audioDataBinary.slice().buffer);
    if ("isSilent" in parsedData) {
      validateAudioData(parsedData);
    }
  });

  it("Successfully parse json data to audio data ", function () {
    const parsedData = StreamingData.parse(audioDataJson);
    if ("isSilent" in parsedData) {
      validateAudioData(parsedData);
    }
  });

  it("Successfully parse json data to dtmf data", function () {
    const parsedData = StreamingData.parse(dtmfDataJson);
    if ("data" in parsedData) {
      validateDtmfData(parsedData);
    }
  });
});

function validateTranscriptionMetadata(transcriptionMetadata: TranscriptionMetadata): void {
  assert.equal(transcriptionMetadata.subscriptionId, "0000a000-9999-5555-ae00-cd00e0bc0000");
  assert.equal(transcriptionMetadata.locale, "en-US");
  assert.equal(transcriptionMetadata.correlationId, "6d09449c-6677-4f91-8cb7-012c338e6ec1");
  assert.equal(transcriptionMetadata.callConnectionId, "6d09449c-6677-4f91-8cb7-012c338e6ec1");
  assert.equal(
    transcriptionMetadata.speechRecognitionModelEndpointId,
    "0000a000-9999-5555-ae00-cd00e0bc0001",
  );
}

function validateTranscriptionData(transcriptionData: TranscriptionData): void {
  assert.equal(transcriptionData.text, "Hello everyone.");
  assert.equal(transcriptionData.resultState, "Final");
  assert.equal(transcriptionData.confidence, 0.922650933265686);
  assert.equal(transcriptionData.offsetInTicks, 212483227);
  assert.equal(transcriptionData.durationInTicks, 9600000);
  assert.equal(transcriptionData.words.length, 2);
  assert.equal(transcriptionData.words[0].text, "hello");
  assert.equal(transcriptionData.words[0].offsetInTicks, 212483227);
  assert.equal(transcriptionData.words[0].durationInTicks, 2800000);
  assert.equal(transcriptionData.words[1].text, "everyone");
  assert.equal(transcriptionData.words[1].offsetInTicks, 215283227);
  assert.equal(transcriptionData.words[1].durationInTicks, 6800000);
  if ("kind" in transcriptionData.participant) {
    assert.equal(transcriptionData.participant.kind, "phoneNumber");
  }
  if ("phoneNumber" in transcriptionData.participant) {
    assert.equal(transcriptionData.participant.phoneNumber, "+000000000000");
  }
}

function validateAudioMetadata(audioMetadata: AudioMetadata): void {
  assert.equal(audioMetadata.subscriptionId, "4af370df-3868-461f-8242-91f077a6f8a6");
  assert.equal(audioMetadata.encoding, "PCM");
  assert.equal(audioMetadata.sampleRate, 16000);
  assert.equal(audioMetadata.channels, 1);
}

function validateAudioData(audioData: AudioData): void {
  assert.equal(audioData.data, "test");
  assert.equal(audioData.isSilent, false);
}

function validateDtmfData(dtmfData: DtmfData): void {
  assert.equal(dtmfData.data, "test");
}
