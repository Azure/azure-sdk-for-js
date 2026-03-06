// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  PhoneNumberIdentifier,
} from "@azure/communication-common";
import { serializeCommunicationIdentifier } from "@azure/communication-common";

// Parent directory imports
import { CallMedia } from "../../src/callMedia.js";

import type {
  FileSource,
  TextSource,
  SsmlSource,
  RecognitionChoice,
  CallParticipant,
  MediaStreamingOptions,
  TranscriptionOptions,
} from "../../src/models/models.js";
import { DtmfTone } from "../../src/models/models.js";
import type {
  CallMediaRecognizeDtmfOptions,
  CallMediaRecognizeChoiceOptions,
  CallMediaRecognizeSpeechOptions,
  CallAutomationClient,
  CallConnection,
  CallInvite,
  ContinuousDtmfRecognitionOptions,
  SendDtmfTonesOptions,
  CreateCallOptions,
  AnswerCallOptions,
  PlayOptions,
  StartTranscriptionOptions,
  StopTranscriptionOptions,
  HoldOptions,
  UnholdOptions,
  StartMediaStreamingOptions,
  StopMediaStreamingOptions,
  CallMediaRecognizeSpeechOrDtmfOptions,
  PlayToAllOptions,
} from "../../src/index.js";

// Current directory imports
import {
  createRecorder,
  createTestUser,
  dispatcherCallback,
  serviceBusWithNewCall,
  createCallAutomationClient,
  waitForIncomingCallContext,
  waitForEvent,
  events,
  serviceBusReceivers,
  incomingCallContexts,
  loadPersistedEvents,
  persistEvents,
  fileSourceUrl,
  getPhoneNumbers,
  transportUrl,
  cognitiveServiceEndpoint,
  dummyFileSource,
} from "../utils/recordedClient.js";
import { createMediaClient, generateHttpClient } from "../utils/mockClient.js";
import {
  CALL_CONNECTION_ID,
  CALL_TARGET_ID,
  MEDIA_UR_MP3,
  MEDIA_URL_WAV,
  baseUri,
  generateToken,
} from "../utils/connectionUtils.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

describe("CallMedia Unit Tests", async function () {
  let callMedia: CallMedia;

  afterEach(function () {
    vi.restoreAllMocks();
  });

  it("can instantiate", async function () {
    new CallMedia(CALL_CONNECTION_ID, baseUri, { key: generateToken() });
  });

  it("makes successful Play file request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: FileSource[] = [
      {
        url: MEDIA_UR_MP3,
        kind: "fileSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSources[0].kind, "file");
    assert.equal(data.playSources[0].file.uri, playSource[0].url);
    assert.equal(request.method, "POST");
  });

  it("makes successful Play TTS request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: TextSource[] = [
      {
        text: "test test test",
        customVoiceEndpointId: "customVoiceEndpointId",
        kind: "textSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSources[0].kind, "text");
    assert.equal(data.playSources[0].text.text, playSource[0].text);
    assert.equal(request.method, "POST");
  });

  it("makes successful Play SSML request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: SsmlSource[] = [
      {
        ssmlText:
          '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">Recognize Choice Completed, played through SSML source.</voice></speak>',
        customVoiceEndpointId: "customVoiceEndpointId",
        kind: "ssmlSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSources[0].kind, "ssml");
    assert.equal(data.playSources[0].ssml.ssmlText, playSource[0].ssmlText);
    assert.equal(request.method, "POST");
  });

  it("makes successful PlayToAll request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: FileSource[] = [
      {
        url: MEDIA_URL_WAV,
        kind: "fileSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playSources[0].kind, "file");
    assert.equal(data.playSources[0].file.uri, playSource[0].url);
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing DTMF request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      kind: "callMediaRecognizeDtmfOptions",
      maxTonesToCollect: 5,
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "dtmf");
    assert.equal(data.recognizeOptions.dtmfOptions.maxTonesToCollect, 5);
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing Choices request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const choice: RecognitionChoice = {
      label: "choice",
      phrases: ["test"],
    };
    const recognizeOptions: CallMediaRecognizeChoiceOptions = {
      choices: [choice],
      kind: "callMediaRecognizeChoiceOptions",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "choices");
    assert.equal(data.recognizeOptions.choices[0].phrases[0], "test");
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing Speech request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const recognizeOptions: CallMediaRecognizeSpeechOptions = {
      kind: "callMediaRecognizeSpeechOptions",
      speechRecognitionModelEndpointId: "customModelEndpointId",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "speech");
    assert.equal(data.recognizeOptions.speechOptions.endSilenceTimeoutInMs, 2000);
    assert.equal(request.method, "POST");
  });

  it("makes successful CancelAllMediaOperations request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    await callMedia.cancelAllOperations();

    const request = spy.mock.calls[0][0];

    assert.equal(request.method, "POST");
  });

  it("makes successful StartContinuousDtmfRecognition request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.startContinuousDtmfRecognition(
      targetParticipant,
      continuousDtmfRecognitionOptions,
    );
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.equal(data.operationContext, continuousDtmfRecognitionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful StopContinuousDtmfRecognition request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.stopContinuousDtmfRecognition(
      targetParticipant,
      continuousDtmfRecognitionOptions,
    );
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.equal(data.operationContext, continuousDtmfRecognitionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful SendDtmf request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const sendDtmfOptions: SendDtmfTonesOptions = {
      operationContext: "test_operation_context",
    };
    const tones = ["one", "two", "three", "pound"];

    await callMedia.sendDtmfTones(tones, targetParticipant, sendDtmfOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.deepEqual(data.tones, tones);
    assert.equal(data.operationContext, sendDtmfOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful hold request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: TextSource = {
      text: "test test test",
      customVoiceEndpointId: "customVoiceEndpointId",
      kind: "textSource",
    };

    const participantToHold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const options: HoldOptions = {
      playSource: playSource,
      operationContext: "withPlaySource",
      operationCallbackUrl: "https://localhost",
    };
    await callMedia.hold(participantToHold, options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(data.playSourceInfo.kind, "text");
    assert.equal(data.playSourceInfo.text.text, playSource.text);
    assert.equal(data.operationContext, "withPlaySource");
    assert.equal(data.operationCallbackUri, "https://localhost");
    assert.equal(request.method, "POST");
  });

  it("makes successful Hold request with no playSource", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const participantToHold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    await callMedia.hold(participantToHold);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(request.method, "POST");
    assert.isUndefined(data.playSourceInfo);
  });

  it("makes successful unhold request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const participantToUnhold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const options: UnholdOptions = {
      operationContext: "unholdContext",
    };
    await callMedia.unhold(participantToUnhold, options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(request.method, "POST");
    assert.equal(data.operationContext, options.operationContext);
  });

  it("makes successful Start Transcription request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const startTranscriptionOptions: StartTranscriptionOptions = {
      locale: "en-US",
      operationContext: "test_operation_context",
    };

    await callMedia.startTranscription(startTranscriptionOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.locale, startTranscriptionOptions.locale);
    assert.equal(data.operationContext, startTranscriptionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful Stop TranscriptionOptions request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const stopTranscriptionOptions: StopTranscriptionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.stopTranscription(stopTranscriptionOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.operationContext, stopTranscriptionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful Update Transcription request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const locale = "en-US";

    await callMedia.updateTranscription(locale);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.locale, locale);
    assert.equal(request.method, "POST");
  });

  it("makes successful start media streaming request with options", async function () {
    const mockHttpClient = generateHttpClient(202);
    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const options: StartMediaStreamingOptions = {
      operationContext: "startMediaStreamContext",
      operationCallbackUrl: "https://localhost",
    };
    await callMedia.startMediaStreaming(options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.operationContext, options.operationContext);
    assert.equal(data.operationCallbackUri, options.operationCallbackUrl);
    assert.equal(request.method, "POST");
  });

  it("makes successful start media streaming request without options", async function () {
    const mockHttpClient = generateHttpClient(202);
    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    await callMedia.startMediaStreaming();
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.isUndefined(data.operationContext);
    assert.isUndefined(data.operationCallbackUri);
    assert.equal(request.method, "POST");
  });

  it("makes successful stop media streaming request with options", async function () {
    const mockHttpClient = generateHttpClient(202);
    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const options: StopMediaStreamingOptions = {
      operationCallbackUrl: "https://localhost",
    };
    await callMedia.stopMediaStreaming(options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.operationCallbackUri, options.operationCallbackUrl);
    assert.equal(request.method, "POST");
  });

  it("makes successful stop media streaming request without options", async function () {
    const mockHttpClient = generateHttpClient(202);
    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    await callMedia.stopMediaStreaming();
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.isUndefined(data.operationCallbackUri);
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing DTMF Prompts request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    const prompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test" },
      { kind: "ssmlSource", ssmlText: "test" },
    ];
    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      playPrompts: prompts,
      kind: "callMediaRecognizeDtmfOptions",
      maxTonesToCollect: 5,
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "dtmf");
    assert.equal(data.recognizeOptions.dtmfOptions.maxTonesToCollect, 5);
    assert.equal(data.playPrompts.length, 3);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");
    assert.equal(data.playPrompts[2].kind, "ssml");
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing Choices Prompts request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const choice: RecognitionChoice = {
      label: "choice",
      phrases: ["test"],
    };

    const prompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test" },
      { kind: "ssmlSource", ssmlText: "test" },
    ];

    const recognizeOptions: CallMediaRecognizeChoiceOptions = {
      playPrompts: prompts,
      choices: [choice],
      kind: "callMediaRecognizeChoiceOptions",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "choices");
    assert.equal(data.recognizeOptions.choices[0].phrases[0], "test");
    assert.equal(data.playPrompts.length, 3);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");
    assert.equal(data.playPrompts[2].kind, "ssml");
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing Speech Prompts request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    const prompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test" },
      { kind: "ssmlSource", ssmlText: "test" },
    ];

    const recognizeOptions: CallMediaRecognizeSpeechOptions = {
      playPrompts: prompts,
      kind: "callMediaRecognizeSpeechOptions",
      speechRecognitionModelEndpointId: "customModelEndpointId",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "speech");
    assert.equal(data.recognizeOptions.speechOptions.endSilenceTimeoutInMs, 2000);
    assert.equal(data.playPrompts.length, 3);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");
    assert.equal(data.playPrompts[2].kind, "ssml");
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing SpeechOrDTMF With DTMF Prompts request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    const prompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test" },
      { kind: "ssmlSource", ssmlText: "test" },
    ];

    const recognizeOptions: CallMediaRecognizeSpeechOrDtmfOptions = {
      playPrompts: prompts,
      maxTonesToCollect: 5,
      kind: "callMediaRecognizeSpeechOrDtmfOptions",
      speechRecognitionModelEndpointId: "customModelEndpointId",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "speechOrDtmf");
    assert.equal(data.recognizeOptions.dtmfOptions.maxTonesToCollect, 5);
    assert.equal(data.playPrompts.length, 3);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");
    assert.equal(data.playPrompts[2].kind, "ssml");
    assert.equal(request.method, "POST");
  });

  it("validates all properties are populated for CallMediaRecognizeDtmfOptions", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    const playPrompt: FileSource = { kind: "fileSource", url: MEDIA_URL_WAV };
    const playPrompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test text" },
    ];

    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      kind: "callMediaRecognizeDtmfOptions",
      // DTMF specific properties
      interToneTimeoutInSeconds: 3,
      stopDtmfTones: [DtmfTone.Pound, DtmfTone.Asterisk],
      maxTonesToCollect: 10,
      // Base CallMediaRecognizeOptions properties
      playPrompt: playPrompt,
      playPrompts: playPrompts,
      interruptCallMediaOperation: true,
      operationContext: "testOperationContext",
      interruptPrompt: true,
      initialSilenceTimeoutInSeconds: 10,
      operationCallbackUrl: "https://localhost/callback",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    // Validate request method
    assert.equal(request.method, "POST");

    // Validate recognizeInputType
    assert.equal(data.recognizeInputType, "dtmf");

    // Validate DTMF options
    assert.isDefined(data.recognizeOptions.dtmfOptions);
    assert.equal(data.recognizeOptions.dtmfOptions.interToneTimeoutInSeconds, 3);
    assert.equal(data.recognizeOptions.dtmfOptions.maxTonesToCollect, 10);
    assert.deepEqual(data.recognizeOptions.dtmfOptions.stopTones, [
      DtmfTone.Pound,
      DtmfTone.Asterisk,
    ]);

    // Validate base recognize options
    assert.equal(data.recognizeOptions.interruptPrompt, true);
    assert.equal(data.recognizeOptions.initialSilenceTimeoutInSeconds, 10);
    assert.isDefined(data.recognizeOptions.targetParticipant);

    // Validate play prompt (single)
    assert.isDefined(data.playPrompt);
    assert.equal(data.playPrompt.kind, "file");
    assert.equal(data.playPrompt.file.uri, MEDIA_URL_WAV);

    // Validate play prompts (multiple)
    assert.isDefined(data.playPrompts);
    assert.equal(data.playPrompts.length, 2);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");

    // Validate other request properties
    assert.equal(data.interruptCallMediaOperation, true);
    assert.equal(data.operationContext, "testOperationContext");
    assert.equal(data.operationCallbackUri, "https://localhost/callback");
  });

  it("validates all properties are populated for CallMediaRecognizeChoiceOptions", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    const playPrompt: FileSource = { kind: "fileSource", url: MEDIA_URL_WAV };
    const playPrompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test text" },
    ];

    const choices: RecognitionChoice[] = [
      { label: "option1", phrases: ["yes", "confirm"] },
      { label: "option2", phrases: ["no", "cancel"] },
    ];

    const recognizeOptions: CallMediaRecognizeChoiceOptions = {
      kind: "callMediaRecognizeChoiceOptions",
      // Choice specific properties
      choices: choices,
      speechLanguage: "en-US",
      speechRecognitionModelEndpointId: "customModelEndpointId",
      // Base CallMediaRecognizeOptions properties
      playPrompt: playPrompt,
      playPrompts: playPrompts,
      interruptCallMediaOperation: true,
      operationContext: "testOperationContext",
      interruptPrompt: true,
      initialSilenceTimeoutInSeconds: 10,
      operationCallbackUrl: "https://localhost/callback",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    // Validate request method
    assert.equal(request.method, "POST");

    // Validate recognizeInputType
    assert.equal(data.recognizeInputType, "choices");

    // Validate choice options
    assert.isDefined(data.recognizeOptions.choices);
    assert.equal(data.recognizeOptions.choices.length, 2);
    assert.equal(data.recognizeOptions.choices[0].label, "option1");
    assert.deepEqual(data.recognizeOptions.choices[0].phrases, ["yes", "confirm"]);
    assert.equal(data.recognizeOptions.choices[1].label, "option2");
    assert.deepEqual(data.recognizeOptions.choices[1].phrases, ["no", "cancel"]);

    // Validate speech language and model endpoint
    assert.equal(data.recognizeOptions.speechLanguage, "en-US");
    assert.equal(data.recognizeOptions.speechRecognitionModelEndpointId, "customModelEndpointId");

    // Validate base recognize options
    assert.equal(data.recognizeOptions.interruptPrompt, true);
    assert.equal(data.recognizeOptions.initialSilenceTimeoutInSeconds, 10);
    assert.isDefined(data.recognizeOptions.targetParticipant);

    // Validate play prompt (single)
    assert.isDefined(data.playPrompt);
    assert.equal(data.playPrompt.kind, "file");
    assert.equal(data.playPrompt.file.uri, MEDIA_URL_WAV);

    // Validate play prompts (multiple)
    assert.isDefined(data.playPrompts);
    assert.equal(data.playPrompts.length, 2);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");

    // Validate other request properties
    assert.equal(data.interruptCallMediaOperation, true);
    assert.equal(data.operationContext, "testOperationContext");
    assert.equal(data.operationCallbackUri, "https://localhost/callback");
  });

  it("validates all properties are populated for CallMediaRecognizeSpeechOptions", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    const playPrompt: FileSource = { kind: "fileSource", url: MEDIA_URL_WAV };
    const playPrompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test text" },
    ];

    const recognizeOptions: CallMediaRecognizeSpeechOptions = {
      kind: "callMediaRecognizeSpeechOptions",
      // Speech specific properties
      endSilenceTimeoutInSeconds: 5,
      speechLanguage: "en-US",
      speechRecognitionModelEndpointId: "customModelEndpointId",
      // Base CallMediaRecognizeOptions properties
      playPrompt: playPrompt,
      playPrompts: playPrompts,
      interruptCallMediaOperation: true,
      operationContext: "testOperationContext",
      interruptPrompt: true,
      initialSilenceTimeoutInSeconds: 10,
      operationCallbackUrl: "https://localhost/callback",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    // Validate request method
    assert.equal(request.method, "POST");

    // Validate recognizeInputType
    assert.equal(data.recognizeInputType, "speech");

    // Validate Speech options
    assert.isDefined(data.recognizeOptions.speechOptions);
    assert.equal(data.recognizeOptions.speechOptions.endSilenceTimeoutInMs, 5000); // 5 seconds * 1000

    // Validate speech language and model endpoint
    assert.equal(data.recognizeOptions.speechLanguage, "en-US");
    assert.equal(data.recognizeOptions.speechRecognitionModelEndpointId, "customModelEndpointId");

    // Validate base recognize options
    assert.equal(data.recognizeOptions.interruptPrompt, true);
    assert.equal(data.recognizeOptions.initialSilenceTimeoutInSeconds, 10);
    assert.isDefined(data.recognizeOptions.targetParticipant);

    // Validate play prompt (single)
    assert.isDefined(data.playPrompt);
    assert.equal(data.playPrompt.kind, "file");
    assert.equal(data.playPrompt.file.uri, MEDIA_URL_WAV);

    // Validate play prompts (multiple)
    assert.isDefined(data.playPrompts);
    assert.equal(data.playPrompts.length, 2);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");

    // Validate other request properties
    assert.equal(data.interruptCallMediaOperation, true);
    assert.equal(data.operationContext, "testOperationContext");
    assert.equal(data.operationCallbackUri, "https://localhost/callback");
  });

  it("validates all properties are populated for CallMediaRecognizeSpeechOrDtmfOptions", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    const playPrompt: FileSource = { kind: "fileSource", url: MEDIA_URL_WAV };
    const playPrompts: (FileSource | TextSource | SsmlSource)[] = [
      { kind: "fileSource", url: MEDIA_URL_WAV },
      { kind: "textSource", text: "test text" },
    ];

    const recognizeOptions: CallMediaRecognizeSpeechOrDtmfOptions = {
      kind: "callMediaRecognizeSpeechOrDtmfOptions",
      // SpeechOrDtmf specific properties
      endSilenceTimeoutInSeconds: 5,
      interToneTimeoutInSeconds: 3,
      stopDtmfTones: [DtmfTone.Pound, DtmfTone.Asterisk],
      maxTonesToCollect: 10,
      speechLanguage: "en-US",
      speechRecognitionModelEndpointId: "customModelEndpointId",
      // Base CallMediaRecognizeOptions properties
      playPrompt: playPrompt,
      playPrompts: playPrompts,
      interruptCallMediaOperation: true,
      operationContext: "testOperationContext",
      interruptPrompt: true,
      initialSilenceTimeoutInSeconds: 10,
      operationCallbackUrl: "https://localhost/callback",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    // Validate request method
    assert.equal(request.method, "POST");

    // Validate recognizeInputType
    assert.equal(data.recognizeInputType, "speechOrDtmf");

    // Validate DTMF options
    assert.isDefined(data.recognizeOptions.dtmfOptions);
    assert.equal(data.recognizeOptions.dtmfOptions.interToneTimeoutInSeconds, 3);
    assert.equal(data.recognizeOptions.dtmfOptions.maxTonesToCollect, 10);
    assert.deepEqual(data.recognizeOptions.dtmfOptions.stopTones, [
      DtmfTone.Pound,
      DtmfTone.Asterisk,
    ]);

    // Validate Speech options
    assert.isDefined(data.recognizeOptions.speechOptions);
    assert.equal(data.recognizeOptions.speechOptions.endSilenceTimeoutInMs, 5000); // 5 seconds * 1000

    // Validate speech language and model endpoint
    assert.equal(data.recognizeOptions.speechLanguage, "en-US");
    assert.equal(data.recognizeOptions.speechRecognitionModelEndpointId, "customModelEndpointId");

    // Validate base recognize options
    assert.equal(data.recognizeOptions.interruptPrompt, true);
    assert.equal(data.recognizeOptions.initialSilenceTimeoutInSeconds, 10);
    assert.isDefined(data.recognizeOptions.targetParticipant);

    // Validate play prompt (single)
    assert.isDefined(data.playPrompt);
    assert.equal(data.playPrompt.kind, "file");
    assert.equal(data.playPrompt.file.uri, MEDIA_URL_WAV);

    // Validate play prompts (multiple)
    assert.isDefined(data.playPrompts);
    assert.equal(data.playPrompts.length, 2);
    assert.equal(data.playPrompts[0].kind, "file");
    assert.equal(data.playPrompts[1].kind, "text");

    // Validate other request properties
    assert.equal(data.interruptCallMediaOperation, true);
    assert.equal(data.operationContext, "testOperationContext");
    assert.equal(data.operationCallbackUri, "https://localhost/callback");
  });

  it("makes successful PlayToAll barge in request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: FileSource[] = [
      {
        url: MEDIA_URL_WAV,
        kind: "fileSource",
      },
    ];

    const options: PlayToAllOptions = {
      interruptCallMediaOperation: true,
      operationContext: "interruptMediaContext",
    };

    await callMedia.playToAll(playSource, options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playSources[0].kind, "file");
    assert.equal(data.playSources[0].file.uri, playSource[0].url);
    assert.equal(request.method, "POST");
    assert.equal(data.operationContext, options.operationContext);
    assert.equal(data.interruptCallMediaOperation, options.interruptCallMediaOperation);
  });

  it("makes successful PlayToAll barge in request with PlayOptions instead of PlayToAllOptions", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: FileSource[] = [
      {
        url: MEDIA_URL_WAV,
        kind: "fileSource",
      },
    ];

    const options: PlayOptions = {
      operationContext: "interruptMediaContext",
    };

    await callMedia.playToAll(playSource, options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playSources[0].kind, "file");
    assert.equal(data.playSources[0].file.uri, playSource[0].url);
    assert.equal(request.method, "POST");
    assert.equal(data.operationContext, options.operationContext);
    assert.equal(data.interruptCallMediaOperation, undefined);
  });
});

describe("Call Media Client Live Tests", function () {
  let recorder: Recorder;
  let callerCallAutomationClient: CallAutomationClient;
  let receiverCallAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let callerPhoneUser: PhoneNumberIdentifier;
  let receiverPhoneUser: PhoneNumberIdentifier;
  let testName: string;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    testUser = await createTestUser(recorder);
    testUser2 = await createTestUser(recorder);
    callerCallAutomationClient = createCallAutomationClient(recorder, testUser);
    receiverCallAutomationClient = createCallAutomationClient(recorder, testUser2);
  });

  afterEach(async function () {
    persistEvents(testName);
    serviceBusReceivers.forEach((receiver) => {
      receiver.close();
    });
    events.forEach((callConnectionEvents) => {
      callConnectionEvents.clear();
    });
    events.clear();
    serviceBusReceivers.clear();
    incomingCallContexts.clear();
    await recorder.stop();
    if (callConnection) {
      try {
        await callConnection.hangUp(true);
      } catch {
        return;
      }
    }
  });

  it("Play audio to target participant", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "playAudioCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "playAudioAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 10000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource[] = [
      {
        url: fileSourceUrl,
        kind: "fileSource",
      },
    ];

    const playOption: PlayOptions = { operationContext: "playAudio" };
    await callConnection.getCallMedia().play(playSource, [testUser2], playOption);
    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 20000);
    assert.isDefined(playCompletedEvent);
    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Play audio to all participants", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "playToAllCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "playToAllAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource[] = [
      {
        url: fileSourceUrl,
        kind: "fileSource",
      },
    ];

    const playOption: PlayOptions = { operationContext: "playToAllAudio" };
    await callConnection.getCallMedia().playToAll(playSource, playOption);

    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 20000);
    assert.isDefined(playCompletedEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Cancel all media operations", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "CancelMediaCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "CancelMediaAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource[] = [
      {
        url: fileSourceUrl,
        kind: "fileSource",
      },
    ];

    const playOption: PlayOptions = { operationContext: "CancelplayToAllAudio" };
    await callConnection.getCallMedia().playToAll(playSource, playOption);
    await callConnection.getCallMedia().cancelAllOperations();

    const playCanceledEvent = await waitForEvent("PlayCanceled", callConnectionId, 20000);
    assert.isDefined(playCanceledEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Trigger DTMF actions", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "create_call_and_trigger_dtmf_actions_then_hang_up";
    await loadPersistedEvents(testName);

    const phoneNumbers = await getPhoneNumbers(recorder);
    assert.isAtLeast(
      phoneNumbers.length,
      2,
      "Invalid PSTN setup, test needs at least 2 phone numbers",
    );

    // Pick the first random index
    const firstIndex = Math.floor(Math.random() * phoneNumbers.length);

    // Pick the second random index, ensuring it's different from the first
    let secondIndex;
    do {
      secondIndex = Math.floor(Math.random() * phoneNumbers.length);
    } while (secondIndex === firstIndex);

    // Assign the randomly chosen phone numbers
    callerPhoneUser = { phoneNumber: phoneNumbers[firstIndex] };
    receiverPhoneUser = { phoneNumber: phoneNumbers[secondIndex] };

    const callInvite: CallInvite = {
      targetParticipant: receiverPhoneUser,
      sourceCallIdNumber: callerPhoneUser,
    };
    const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const continuousDtmfRecognitionOptions1: ContinuousDtmfRecognitionOptions = {
      operationContext: "ContinuousDtmfRecognitionStart",
    };
    await callConnection
      .getCallMedia()
      .startContinuousDtmfRecognition(receiverPhoneUser, continuousDtmfRecognitionOptions1);

    const continuousDtmfRecognitionOptions2: ContinuousDtmfRecognitionOptions = {
      operationContext: "ContinuousDtmfRecognitionSend",
    };
    await callConnection
      .getCallMedia()
      .sendDtmfTones([DtmfTone.Pound], receiverPhoneUser, continuousDtmfRecognitionOptions2);
    const sendDtmfCompleted = await waitForEvent("SendDtmfTonesCompleted", callConnectionId, 8000);
    assert.isDefined(sendDtmfCompleted);

    const continuousDtmfRecognitionOptions3: ContinuousDtmfRecognitionOptions = {
      operationContext: "ContinuousDtmfRecognitionStop",
    };
    await callConnection
      .getCallMedia()
      .stopContinuousDtmfRecognition(receiverPhoneUser, continuousDtmfRecognitionOptions3);
    const continuousDtmfRecognitionStopped = await waitForEvent(
      "ContinuousDtmfRecognitionStopped",
      callConnectionId,
      8000,
    );
    assert.isDefined(continuousDtmfRecognitionStopped);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it(
    "Creates a call, start media streaming, and hangs up.",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
        : "create_call_start_media_streaming_and_hang_up";
      await loadPersistedEvents(testName);

      const phoneNumbers = await getPhoneNumbers(recorder);
      assert.isAtLeast(
        phoneNumbers.length,
        2,
        "Invalid PSTN setup, test needs at least 2 phone numbers",
      );
      callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
      receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

      const callInvite: CallInvite = {
        targetParticipant: receiverPhoneUser,
        sourceCallIdNumber: callerPhoneUser,
      };
      const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
      const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

      const mediaStreamingOptions: MediaStreamingOptions = {
        transportUrl: transportUrl,
        transportType: "websocket",
        contentType: "audio",
        audioChannelType: "mixed",
        startMediaStreaming: false,
      };

      const createCallOptions: CreateCallOptions = {
        mediaStreamingOptions: mediaStreamingOptions,
      };

      const result = await callerCallAutomationClient.createCall(
        callInvite,
        callBackUrl,
        createCallOptions,
      );
      const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
      const callConnectionId: string = result.callConnectionProperties.callConnectionId
        ? result.callConnectionProperties.callConnectionId
        : "";
      assert.isDefined(incomingCallContext);

      if (incomingCallContext) {
        await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
      }
      const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
      assert.isDefined(callConnectedEvent);
      callConnection = result.callConnection;

      await callConnection.getCallMedia().startMediaStreaming();
      const mediaStreamingStarted = await waitForEvent(
        "MediaStreamingStarted",
        callConnectionId,
        8000,
      );
      assert.isDefined(mediaStreamingStarted);

      await callConnection.getCallMedia().stopMediaStreaming();
      const mediaStreamingStopped = await waitForEvent(
        "MediaStreamingStopped",
        callConnectionId,
        8000,
      );
      assert.isDefined(mediaStreamingStopped);

      await callConnection.hangUp(true);
      const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
      assert.isDefined(callDisconnectedEvent);
    },
  );

  it(
    "Answers a call, start media streaming, and hangs up",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
        : "answer_call_start_media_streaming_and_hang_up";
      await loadPersistedEvents(testName);

      const callInvite: CallInvite = { targetParticipant: testUser2 };
      const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
      const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

      const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
      const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
      const callConnectionId: string = result.callConnectionProperties.callConnectionId
        ? result.callConnectionProperties.callConnectionId
        : "";
      assert.isDefined(incomingCallContext);
      if (incomingCallContext) {
        const mediaStreamingOptions: MediaStreamingOptions = {
          transportUrl: transportUrl,
          transportType: "websocket",
          contentType: "audio",
          audioChannelType: "mixed",
          startMediaStreaming: false,
        };
        const answerCallOptions: AnswerCallOptions = {
          mediaStreamingOptions: mediaStreamingOptions,
        };

        const answerCallResult = await receiverCallAutomationClient.answerCall(
          incomingCallContext,
          callBackUrl,
          answerCallOptions,
        );

        const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
        assert.isDefined(callConnectedEvent);

        const answerCallConnection = answerCallResult.callConnection;
        const answerCallConnectionId: string = answerCallResult.callConnectionProperties
          .callConnectionId
          ? answerCallResult.callConnectionProperties.callConnectionId
          : "";
        await answerCallConnection.getCallMedia().startMediaStreaming();
        const mediaStreamingStarted = await waitForEvent(
          "MediaStreamingStarted",
          answerCallConnectionId,
          8000,
        );
        assert.isDefined(mediaStreamingStarted);

        await answerCallConnection.getCallMedia().stopMediaStreaming();
        const mediaStreamingStopped = await waitForEvent(
          "MediaStreamingStopped",
          answerCallConnectionId,
          8000,
        );
        assert.isDefined(mediaStreamingStopped);

        await answerCallConnection.hangUp(true);
        const callDisconnectedEvent = await waitForEvent(
          "CallDisconnected",
          answerCallConnectionId,
          8000,
        );
        assert.isDefined(callDisconnectedEvent);
      }
    },
  );

  it("Play multiple file sources with play and playall", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "play_multiple_file_sources_with_play_and_playall";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = {
      operationContext: "playMultipleSourcesCreateCall",
    };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = {
        operationContext: "playMultipleSourcesAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playMultipleFileSources: FileSource[] = [
      { kind: "fileSource", url: fileSourceUrl },
      { kind: "fileSource", url: fileSourceUrl },
      { kind: "fileSource", url: fileSourceUrl },
    ];

    // play to all
    await callConnection
      .getCallMedia()
      .playToAll(playMultipleFileSources, { operationContext: "multipleFileSourceContext" });

    const playCompletedEventToFileSources = await waitForEvent(
      "PlayCompleted",
      callConnectionId,
      20000,
    );
    assert.isDefined(playCompletedEventToFileSources);

    // play to target
    await callConnection.getCallMedia().play(playMultipleFileSources, [testUser2], {
      operationContext: "multipleFileSourceToTargetContext",
    });
    const playCompletedEventToTargetFileSources = await waitForEvent(
      "PlayCompleted",
      callConnectionId,
      20000,
    );
    assert.isDefined(playCompletedEventToTargetFileSources);
  });

  it("Play multiple text sources with playall", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "play_multiple_text_sources_with_play_and_playall";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = {
      operationContext: "playMultipleSourcesCreateCall",
      callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
    };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = {
        operationContext: "playMultipleSourcesAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playMultipleTextSources: TextSource[] = [
      { kind: "textSource", text: "this is test one", voiceName: "en-US-NancyNeural" },
      { kind: "textSource", text: "this is test two", voiceName: "en-US-NancyNeural" },
      { kind: "textSource", text: "this is test three", voiceName: "en-US-NancyNeural" },
    ];

    await callConnection
      .getCallMedia()
      .playToAll(playMultipleTextSources, { operationContext: "multipleTextSourceContext" });

    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 20000);
    assert.isDefined(playCompletedEvent);
  });

  it("Play multiple text sources with play", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "play_multiple_text_sources_with_play_and_playall";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = {
      operationContext: "playMultipleSourcesCreateCall",
      callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
    };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = {
        operationContext: "playMultipleSourcesAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    console.log(cognitiveServiceEndpoint);
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playMultipleTextSources: TextSource[] = [
      { kind: "textSource", text: "this is test one", voiceName: "en-US-NancyNeural" },
      { kind: "textSource", text: "this is test two", voiceName: "en-US-NancyNeural" },
      { kind: "textSource", text: "this is test three", voiceName: "en-US-NancyNeural" },
    ];

    await callConnection.getCallMedia().play(playMultipleTextSources, [testUser2], {
      operationContext: "multipleTextSourceToTargetContext",
    });
    const playCompletedEventToTargetTextSources = await waitForEvent(
      "PlayCompleted",
      callConnectionId,
      20000,
    );
    assert.isDefined(playCompletedEventToTargetTextSources);
  });

  it("Play combined text and file sources with playall", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "play_combined_text_and_file_sources_with_play_and_playall";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = {
      operationContext: "playMultipleSourcesCreateCall",
      callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
    };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = {
        operationContext: "playMultipleSourcesAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const multiplePlaySources: (FileSource | TextSource)[] = [
      { kind: "fileSource", url: fileSourceUrl },
      { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
    ];

    await callConnection
      .getCallMedia()
      .playToAll(multiplePlaySources, { operationContext: "multipleSourceContext" });

    const playCompletedEventMultipleSource = await waitForEvent(
      "PlayCompleted",
      callConnectionId,
      20000,
    );
    assert.isDefined(playCompletedEventMultipleSource);
  });

  it("Play combined text and file sources with play", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "play_combined_text_and_file_sources_with_play";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = {
      operationContext: "playMultipleSourcesCreateCall",
      callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
    };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = {
        operationContext: "playMultipleSourcesAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const multiplePlaySources: (FileSource | TextSource)[] = [
      { kind: "fileSource", url: fileSourceUrl },
      { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
    ];

    await callConnection.getCallMedia().play(multiplePlaySources, [testUser2], {
      operationContext: "multipleSourceToTargetContext",
    });
    const playCompletedEventToTargetMultipleSource = await waitForEvent(
      "PlayCompleted",
      callConnectionId,
      20000,
    );
    assert.isDefined(playCompletedEventToTargetMultipleSource);
  });

  it("Play wrong source with play", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "play_wrong_source_with_play_and_playall";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = {
      operationContext: "playMultipleSourcesCreateCall",
    };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = {
        operationContext: "playMultipleSourcesAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const filePrompt: FileSource = { kind: "fileSource", url: dummyFileSource };

    await callConnection
      .getCallMedia()
      .play([filePrompt], [testUser2], { operationContext: "playFailContext" });
    const playFailedEventWithTargetParticipant = await waitForEvent(
      "PlayFailed",
      callConnectionId,
      20000,
    );
    assert.isDefined(playFailedEventWithTargetParticipant);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Play wrong source with playall", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "play_wrong_source_with_playall";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = {
      operationContext: "playMultipleSourcesCreateCall",
    };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = {
        operationContext: "playMultipleSourcesAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const filePrompt: FileSource = { kind: "fileSource", url: dummyFileSource };

    await callConnection
      .getCallMedia()
      .playToAll([filePrompt], { operationContext: "playFailContext" });
    const playFailedEvent = await waitForEvent("PlayFailed", callConnectionId, 20000);
    assert.isDefined(playFailedEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it.skip(
    "DTMF recognize with multiple play sources test",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
        : "dtmf_recognize_with_multiple_play_source";
      await loadPersistedEvents(testName);

      const phoneNumbers = await getPhoneNumbers(recorder);
      assert.isAtLeast(
        phoneNumbers.length,
        2,
        "Invalid PSTN setup, test needs at least 2 phone numbers",
      );
      callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
      receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

      const callInvite: CallInvite = {
        targetParticipant: receiverPhoneUser,
        sourceCallIdNumber: callerPhoneUser,
      };
      const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
      const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
      const createCallOption: CreateCallOptions = {
        callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
      };
      const result = await callerCallAutomationClient.createCall(
        callInvite,
        callBackUrl,
        createCallOption,
      );
      const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
      const callConnectionId: string = result.callConnectionProperties.callConnectionId
        ? result.callConnectionProperties.callConnectionId
        : "";
      assert.isDefined(incomingCallContext);

      if (incomingCallContext) {
        await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
      }
      const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
      assert.isDefined(callConnectedEvent);
      callConnection = result.callConnection;

      const playMultipleTextSources: TextSource[] = [
        { kind: "textSource", text: "this is test one", voiceName: "en-US-NancyNeural" },
        { kind: "textSource", text: "this is test two", voiceName: "en-US-NancyNeural" },
      ];
      const recognizeDtmfOptionsToTextSource: CallMediaRecognizeDtmfOptions = {
        maxTonesToCollect: 1,
        initialSilenceTimeoutInSeconds: 5,
        playPrompts: playMultipleTextSources,
        interToneTimeoutInSeconds: 5,
        interruptPrompt: true,
        stopDtmfTones: [DtmfTone.Pound],
        kind: "callMediaRecognizeDtmfOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeDtmfOptionsToTextSource);
      const recognizeFailedEventToTextSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToTextSource);

      const multiplePlaySources: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: fileSourceUrl },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeDtmfOptionsToMultipleSource: CallMediaRecognizeDtmfOptions = {
        maxTonesToCollect: 1,
        initialSilenceTimeoutInSeconds: 5,
        playPrompts: multiplePlaySources,
        interToneTimeoutInSeconds: 5,
        interruptPrompt: true,
        stopDtmfTones: [DtmfTone.Pound],
        kind: "callMediaRecognizeDtmfOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeDtmfOptionsToMultipleSource);
      const recognizeFailedEventToMultipleSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToMultipleSource);

      const multiplePrompts: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: dummyFileSource },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeDtmfOptionsToMultiplePrompts: CallMediaRecognizeDtmfOptions = {
        maxTonesToCollect: 1,
        initialSilenceTimeoutInSeconds: 5,
        playPrompts: multiplePrompts,
        interToneTimeoutInSeconds: 5,
        interruptPrompt: true,
        stopDtmfTones: [DtmfTone.Pound],
        kind: "callMediaRecognizeDtmfOptions",
      };
      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeDtmfOptionsToMultiplePrompts);
      const recognizeFailedEvent = await waitForEvent("RecognizeFailed", callConnectionId, 8000);
      assert.isDefined(recognizeFailedEvent);

      await callConnection.hangUp(true);
      const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
      assert.isDefined(callDisconnectedEvent);
    },
  );

  it.skip(
    "Speech recognize with multiple play sources test",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
        : "speech_recognize_with_multiple_play_source";
      await loadPersistedEvents(testName);

      const phoneNumbers = await getPhoneNumbers(recorder);
      assert.isAtLeast(
        phoneNumbers.length,
        2,
        "Invalid PSTN setup, test needs at least 2 phone numbers",
      );
      callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
      receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

      const callInvite: CallInvite = {
        targetParticipant: receiverPhoneUser,
        sourceCallIdNumber: callerPhoneUser,
      };
      const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
      const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
      const createCallOption: CreateCallOptions = {
        callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
      };
      const result = await callerCallAutomationClient.createCall(
        callInvite,
        callBackUrl,
        createCallOption,
      );
      const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
      const callConnectionId: string = result.callConnectionProperties.callConnectionId
        ? result.callConnectionProperties.callConnectionId
        : "";
      assert.isDefined(incomingCallContext);

      if (incomingCallContext) {
        await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
      }
      const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
      assert.isDefined(callConnectedEvent);
      callConnection = result.callConnection;

      const playMultipleTextSources: TextSource[] = [
        { kind: "textSource", text: "this is test one", voiceName: "en-US-NancyNeural" },
        { kind: "textSource", text: "this is test two", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeSpeechOptionsToTextSource: CallMediaRecognizeSpeechOptions = {
        endSilenceTimeoutInSeconds: 1,
        playPrompts: playMultipleTextSources,
        kind: "callMediaRecognizeSpeechOptions",
        initialSilenceTimeoutInSeconds: 5,
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeSpeechOptionsToTextSource);
      const recognizeFailedEventToTextSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToTextSource);

      const multiplePlaySources: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: fileSourceUrl },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeSpeechOptionsMultipleSource: CallMediaRecognizeSpeechOptions = {
        endSilenceTimeoutInSeconds: 1,
        playPrompts: multiplePlaySources,
        kind: "callMediaRecognizeSpeechOptions",
        initialSilenceTimeoutInSeconds: 5,
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeSpeechOptionsMultipleSource);
      const recognizeFailedEventToMultipleSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToMultipleSource);

      const multiplePrompts: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: dummyFileSource },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeSpeechOptionsMultiPrompts: CallMediaRecognizeSpeechOptions = {
        endSilenceTimeoutInSeconds: 1,
        playPrompts: multiplePrompts,
        kind: "callMediaRecognizeSpeechOptions",
        initialSilenceTimeoutInSeconds: 5,
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeSpeechOptionsMultiPrompts);
      const recognizeFailedEvent = await waitForEvent("RecognizeFailed", callConnectionId, 8000);
      assert.isDefined(recognizeFailedEvent);

      await callConnection.hangUp(true);
      const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
      assert.isDefined(callDisconnectedEvent);
    },
  );

  it.skip(
    "Choice recognize with multiple play sources test",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
        : "choice_recognize_with_multiple_play_source";
      await loadPersistedEvents(testName);

      const phoneNumbers = await getPhoneNumbers(recorder);
      assert.isAtLeast(
        phoneNumbers.length,
        2,
        "Invalid PSTN setup, test needs at least 2 phone numbers",
      );
      callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
      receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

      const callInvite: CallInvite = {
        targetParticipant: receiverPhoneUser,
        sourceCallIdNumber: callerPhoneUser,
      };
      const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
      const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
      const createCallOption: CreateCallOptions = {
        callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
      };
      const result = await callerCallAutomationClient.createCall(
        callInvite,
        callBackUrl,
        createCallOption,
      );
      const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
      const callConnectionId: string = result.callConnectionProperties.callConnectionId
        ? result.callConnectionProperties.callConnectionId
        : "";
      assert.isDefined(incomingCallContext);

      if (incomingCallContext) {
        await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
      }
      const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
      assert.isDefined(callConnectedEvent);
      callConnection = result.callConnection;

      const choices = [
        {
          label: "Confirm",
          phrases: ["Confirm", "First", "One"],
          tone: DtmfTone.One,
        },
        {
          label: "Cancel",
          phrases: ["Cancel", "Second", "Two"],
          tone: DtmfTone.Two,
        },
      ];

      const playMultipleTextSources: TextSource[] = [
        { kind: "textSource", text: "this is test one", voiceName: "en-US-NancyNeural" },
        { kind: "textSource", text: "this is test two", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeChoiceOptionsToTextSource: CallMediaRecognizeChoiceOptions = {
        choices: choices,
        interruptPrompt: true,
        initialSilenceTimeoutInSeconds: 5,
        playPrompts: playMultipleTextSources,
        kind: "callMediaRecognizeChoiceOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeChoiceOptionsToTextSource);
      const recognizeFailedEventToTextSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToTextSource);

      const multiplePlaySources: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: fileSourceUrl },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeChoiceOptionsToMultipleSource: CallMediaRecognizeChoiceOptions = {
        choices: choices,
        interruptPrompt: true,
        initialSilenceTimeoutInSeconds: 10,
        playPrompts: multiplePlaySources,
        kind: "callMediaRecognizeChoiceOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeChoiceOptionsToMultipleSource);
      const recognizeFailedEventToMultipleSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToMultipleSource);

      const multiplePrompts: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: dummyFileSource },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeChoiceOptionsMultiplePrompts: CallMediaRecognizeChoiceOptions = {
        choices: choices,
        interruptPrompt: true,
        initialSilenceTimeoutInSeconds: 5,
        playPrompts: multiplePrompts,
        kind: "callMediaRecognizeChoiceOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeChoiceOptionsMultiplePrompts);
      const recognizeFailedEvent = await waitForEvent("RecognizeFailed", callConnectionId, 8000);
      assert.isDefined(recognizeFailedEvent);

      await callConnection.hangUp(true);
      const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
      assert.isDefined(callDisconnectedEvent);
    },
  );

  it.skip(
    "SpeechOrDtmf recognize with multiple play sources test",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
        : "speechOrDtmf_recognize_with_multiple_play_source";
      await loadPersistedEvents(testName);

      const phoneNumbers = await getPhoneNumbers(recorder);
      assert.isAtLeast(
        phoneNumbers.length,
        2,
        "Invalid PSTN setup, test needs at least 2 phone numbers",
      );
      callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
      receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

      const callInvite: CallInvite = {
        targetParticipant: receiverPhoneUser,
        sourceCallIdNumber: callerPhoneUser,
      };
      const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
      const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
      const createCallOption: CreateCallOptions = {
        callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
      };
      const result = await callerCallAutomationClient.createCall(
        callInvite,
        callBackUrl,
        createCallOption,
      );
      const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
      const callConnectionId: string = result.callConnectionProperties.callConnectionId
        ? result.callConnectionProperties.callConnectionId
        : "";
      assert.isDefined(incomingCallContext);

      if (incomingCallContext) {
        await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
      }
      const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
      assert.isDefined(callConnectedEvent);
      callConnection = result.callConnection;

      const playMultipleTextSources: TextSource[] = [
        { kind: "textSource", text: "this is test one", voiceName: "en-US-NancyNeural" },
        { kind: "textSource", text: "this is test two", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeSpeechOrDtmfOptionsTextSource: CallMediaRecognizeSpeechOrDtmfOptions = {
        maxTonesToCollect: 1,
        endSilenceTimeoutInSeconds: 1,
        playPrompts: playMultipleTextSources,
        initialSilenceTimeoutInSeconds: 5,
        interruptPrompt: true,
        kind: "callMediaRecognizeSpeechOrDtmfOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeSpeechOrDtmfOptionsTextSource);
      console.log("callMediaRecognizeSpeechOrDtmfOptions");
      const recognizeFailedEventToTextSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToTextSource);

      const multiplePlaySources: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: fileSourceUrl },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeSpeechOrDtmfOptionsMultipleSource: CallMediaRecognizeSpeechOrDtmfOptions = {
        maxTonesToCollect: 1,
        endSilenceTimeoutInSeconds: 1,
        playPrompts: multiplePlaySources,
        initialSilenceTimeoutInSeconds: 5,
        interruptPrompt: true,
        kind: "callMediaRecognizeSpeechOrDtmfOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeSpeechOrDtmfOptionsMultipleSource);
      const recognizeFailedEventToMultipleSource = await waitForEvent(
        "RecognizeFailed",
        callConnectionId,
        8000,
      );
      assert.isDefined(recognizeFailedEventToMultipleSource);

      const multiplePrompts: (FileSource | TextSource)[] = [
        { kind: "fileSource", url: dummyFileSource },
        { kind: "textSource", text: "this is test", voiceName: "en-US-NancyNeural" },
      ];

      const recognizeSpeechOrDtmfOptionsMultiplePropmt: CallMediaRecognizeSpeechOrDtmfOptions = {
        maxTonesToCollect: 1,
        endSilenceTimeoutInSeconds: 1,
        playPrompts: multiplePrompts,
        initialSilenceTimeoutInSeconds: 5,
        interruptPrompt: true,
        kind: "callMediaRecognizeSpeechOrDtmfOptions",
      };

      await callConnection
        .getCallMedia()
        .startRecognizing(receiverPhoneUser, recognizeSpeechOrDtmfOptionsMultiplePropmt);

      const recognizeFailedEvent = await waitForEvent("RecognizeFailed", callConnectionId, 8000);
      assert.isDefined(recognizeFailedEvent);

      await callConnection.hangUp(true);
      const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
      assert.isDefined(callDisconnectedEvent);
    },
  );

  it("Hold Unhold participant in a call", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "hold_unhold_participant_in_a_call";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);
    if (incomingCallContext) {
      await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    await callConnection.getCallMedia().hold(testUser2);
    await ((ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)))(3000);
    const participantHold: CallParticipant = await callConnection.getParticipant(testUser2);
    assert.isDefined(participantHold);
    assert.isTrue(participantHold.isOnHold);

    await callConnection.getCallMedia().unhold(testUser2);
    await ((ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)))(3000);
    const participantUnhold = await callConnection.getParticipant(testUser2);
    assert.isDefined(participantUnhold);
    assert.isFalse(participantUnhold.isOnHold);

    const playSource: FileSource = {
      url: dummyFileSource,
      kind: "fileSource",
    };

    const holdOptions: HoldOptions = {
      playSource: playSource,
      operationContext: "holdFailedContext",
    };
    await callConnection.getCallMedia().hold(testUser2, holdOptions);
    const holdFailedEvent = await waitForEvent("HoldFailed", callConnectionId, 8000);
    assert.isDefined(holdFailedEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it.skip(
    "Creates a call, start transcription, and hangs up.",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
        : "create_call_start_transcription_and_hang_up";
      await loadPersistedEvents(testName);

      const phoneNumbers = await getPhoneNumbers(recorder);
      assert.isAtLeast(
        phoneNumbers.length,
        2,
        "Invalid PSTN setup, test needs at least 2 phone numbers",
      );
      callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
      receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

      const callInvite: CallInvite = {
        targetParticipant: receiverPhoneUser,
        sourceCallIdNumber: callerPhoneUser,
      };
      const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
      const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

      const transcriptionOptions: TranscriptionOptions = {
        transportUrl: transportUrl,
        transportType: "websocket",
        locale: "en-US",
        startTranscription: false,
        enableIntermediateResults: false,
      };

      const createCallOptions: CreateCallOptions = {
        transcriptionOptions: transcriptionOptions,
        callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
      };

      const result = await callerCallAutomationClient.createCall(
        callInvite,
        callBackUrl,
        createCallOptions,
      );
      const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
      const callConnectionId: string = result.callConnectionProperties.callConnectionId
        ? result.callConnectionProperties.callConnectionId
        : "";
      assert.isDefined(incomingCallContext);

      if (incomingCallContext) {
        await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
      }
      const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
      assert.isDefined(callConnectedEvent);
      callConnection = result.callConnection;

      await callConnection.getCallMedia().startTranscription();
      const transcriptionStarted = await waitForEvent(
        "TranscriptionStarted",
        callConnectionId,
        8000,
      );
      assert.isDefined(transcriptionStarted);

      await callConnection.getCallMedia().stopTranscription();
      const transcriptionStopped = waitForEvent("TranscriptionStopped", callConnectionId, 8000);
      assert.isDefined(transcriptionStopped);

      await callConnection.hangUp(true);
      const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
      assert.isDefined(callDisconnectedEvent);
    },
  );

  it("Answers a call, start transcription, and hangs up", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "answer_call_start_transcription_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const transcriptionOptions: TranscriptionOptions = {
        transportUrl: transportUrl,
        transportType: "websocket",
        locale: "en-US",
        startTranscription: false,
        enableIntermediateResults: false,
      };
      const answerCallOptions: AnswerCallOptions = {
        transcriptionOptions: transcriptionOptions,
        callIntelligenceOptions: { cognitiveServicesEndpoint: cognitiveServiceEndpoint },
      };
      const answerCallResult = await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOptions,
      );

      const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
      assert.isDefined(callConnectedEvent);

      const answerCallConnection = answerCallResult.callConnection;
      const answerCallConnectionId: string = answerCallResult.callConnectionProperties
        .callConnectionId
        ? answerCallResult.callConnectionProperties.callConnectionId
        : "";

      await answerCallConnection.getCallMedia().startTranscription();
      const transcriptionStarted = await waitForEvent(
        "TranscriptionStarted",
        answerCallConnectionId,
        8000,
      );
      assert.isDefined(transcriptionStarted);

      await answerCallConnection.getCallMedia().stopTranscription();
      const transcriptionStopped = waitForEvent(
        "TranscriptionStopped",
        answerCallConnectionId,
        8000,
      );
      assert.isDefined(transcriptionStopped);

      await answerCallConnection.hangUp(true);
      const callDisconnectedEvent = await waitForEvent(
        "CallDisconnected",
        answerCallConnectionId,
        8000,
      );
      assert.isDefined(callDisconnectedEvent);
    }
  });
});
