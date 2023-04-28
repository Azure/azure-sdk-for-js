// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";
import Sinon, { SinonStubbedInstance } from "sinon";
import { CallMedia } from "../src/callMedia";
import { FileSource, RecognizeInputType } from "../src/models/models";
import { assert } from "chai";
import { CallMediaImpl } from "../src/generated/src/operations";
import { CallMediaRecognizeDtmfOptions } from "../src";

describe("CallMedia Unit Tests", () => {
  let callConnectionId: string;
  let callMediaImpl: SinonStubbedInstance<CallMediaImpl>;
  let callMedia: CallMedia;

  beforeEach(() => {
    callConnectionId = "test-connection-id";
    callMediaImpl = Sinon.createStubInstance(CallMediaImpl);
    callMedia = new CallMedia(callConnectionId, callMediaImpl as any);
  });

  it("Play", async () => {
    const playSource: FileSource = {
      uri: "https://example.com/audio.mp3",
    };
    const playTo: CommunicationIdentifier[] = [{ communicationUserId: "user1" }];
    // Call the play function
    await callMedia.play(playSource, playTo);

    // Check if the callMediaImpl.play was called with the correct arguments
    assert.isTrue(
      callMediaImpl.play.calledWith(callConnectionId, {
        playSourceInfo: {
          sourceType: "file",
          fileSource: { uri: playSource.uri },
          playSourceId: playSource.playSourceId,
        },
        playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      })
    );
  });

  it("PlayToAll", async () => {
    const playSource: FileSource = {
      uri: "https://example.com/audio/test.wav",
    };
    const playTo: CommunicationIdentifier[] = [];

    // Call the play function
    await callMedia.playToAll(playSource);

    // Check if the callMediaImpl.play was called with the correct arguments
    assert.isTrue(
      callMediaImpl.play.calledWith(callConnectionId, {
        playSourceInfo: {
          sourceType: "file",
          fileSource: { uri: playSource.uri },
          playSourceId: playSource.playSourceId,
        },
        playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      })
    );
  });

  it("StartRecognizing", async () => {
    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      maxTonesToCollect: 5,
      targetParticipant: { communicationUserId: "user1" },
      recognizeInputType: RecognizeInputType.Dtmf,
    };

    // Call the startRecognizing function
    await callMedia.startRecognizing(recognizeOptions);

    // Check if the callMediaImpl.recognize was called with the correct arguments
    assert.isTrue(
      callMediaImpl.recognize.calledWith(
        callConnectionId,
        {
          recognizeInputType: "dtmf",
          playPrompt: undefined,
          interruptCallMediaOperation: undefined,
          recognizeOptions: {
            interruptPrompt: undefined,
            initialSilenceTimeoutInSeconds: 5, // Set default value here
            targetParticipant: serializeCommunicationIdentifier(recognizeOptions.targetParticipant),
            dtmfOptions: {
              interToneTimeoutInSeconds: 2, // Set default value here
              maxTonesToCollect: 5,
              stopTones: undefined,
            },
          },
          operationContext: undefined,
        },
        {}
      )
    );
  });

  it("CancelAllMediaOperations", async () => {
    await callMedia.cancelAllMediaOperations();

    assert.isTrue(callMediaImpl.cancelAllMediaOperations.calledOnceWith(callConnectionId, {}));
  });

  it("StartContinuousDtmfRecognition", async () => {
    const targetParticipant = { communicationUserId: "user1" };
    const operationContext = "testoperationcontext";

    // Call the startContinuousDtmfRecognition function
    await callMedia.startContinuousDtmfRecognition(targetParticipant, operationContext);

    // Check if the callMediaImpl.startContinuousDtmfRecognition was called with the correct arguments
    assert.isTrue(
      callMediaImpl.startContinuousDtmfRecognition.calledWith(
        callConnectionId,
        {
          targetParticipant: serializeCommunicationIdentifier(targetParticipant),
          operationContext: operationContext,
        },
        {}
      )
    );
  });

  it("StopContinuousDtmfRecognition", async () => {
    const targetParticipant = { communicationUserId: "user1" };
    const operationContext = "test_operation_context";

    // Call the stopContinuousDtmfRecognition function
    await callMedia.stopContinuousDtmfRecognition(targetParticipant, operationContext);

    // Check if the callMediaImpl.stopContinuousDtmfRecognition was called with the correct arguments
    assert.isTrue(
      callMediaImpl.stopContinuousDtmfRecognition.calledWith(
        callConnectionId,
        {
          targetParticipant: serializeCommunicationIdentifier(targetParticipant),
          operationContext: operationContext,
        },
        {}
      )
    );
  });

  it("SendDtmf", async () => {
    const targetParticipant = { communicationUserId: "user1" };
    const tones = ["one", "two", "three", "pound"];
    const operationContext = "test_operation_context";

    // Call the sendDtmf function
    await callMedia.sendDtmf(targetParticipant, tones, operationContext);

    // Check if the callMediaImpl.sendDtmf was called with the correct arguments
    assert.isTrue(
      callMediaImpl.sendDtmf.calledWith(
        callConnectionId,
        {
          targetParticipant: serializeCommunicationIdentifier(targetParticipant),
          tones: tones,
          operationContext: operationContext,
        },
        {}
      )
    );
  });
});
