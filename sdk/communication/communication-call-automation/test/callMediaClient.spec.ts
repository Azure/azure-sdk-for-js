// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";
import Sinon, { SinonStubbedInstance } from "sinon";
import { CallMedia } from "../src/callMedia";
import { FileSource } from "../src/models/models";
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
      url: "https://example.com/audio.mp3",
    };
    const playTo: CommunicationIdentifier[] = [{ communicationUserId: "user1" }];
    // Call the play function
    await callMedia.play(playSource, playTo);

    // Check if the callMediaImpl.play was called with the correct arguments
    assert.isTrue(
      callMediaImpl.play.calledWith(callConnectionId, {
        playSourceInfo: {
          sourceType: "file",
          fileSource: { uri: playSource.url },
          playSourceId: playSource.playSourceId,
        },
        playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      })
    );
  });

  it("PlayToAll", async () => {
    const playSource: FileSource = {
      url: "https://example.com/audio/test.wav",
    };
    const playTo: CommunicationIdentifier[] = [];

    // Call the play function
    await callMedia.playToAll(playSource);

    // Check if the callMediaImpl.play was called with the correct arguments
    assert.isTrue(
      callMediaImpl.play.calledWith(callConnectionId, {
        playSourceInfo: {
          sourceType: "file",
          fileSource: { uri: playSource.url },
          playSourceId: playSource.playSourceId,
        },
        playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      })
    );
  });

  it("StartRecognizing", async () => {
    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
    };

    const targetParticipant: CommunicationIdentifier = { communicationUserId: "user1" }
    const maxTonesToCollect = 5

    // Call the startRecognizing function
    await callMedia.startRecognizing(targetParticipant, maxTonesToCollect, recognizeOptions);

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
            targetParticipant: serializeCommunicationIdentifier(targetParticipant),
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
    await callMedia.cancelAllOperations();

    assert.isTrue(callMediaImpl.cancelAllMediaOperations.calledOnceWith(callConnectionId, {}));
  });
});
