// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Sinon, { SinonStubbedInstance } from "sinon";
import { assert } from "chai";
import { CallRecordingImpl } from "../src/generated/src/operations";
import { CallRecording, StartRecordingOptions } from "../src";
import { ContentDownloaderImpl } from "../src/contentDownloader";
import { RecordingStateResponse } from "../src/generated/src";

describe("CallRecording Unit Tests", () => {
  let callRecordingImpl: SinonStubbedInstance<CallRecordingImpl>;
  let contentDownloaderImpl: SinonStubbedInstance<ContentDownloaderImpl>;
  let callRecording: CallRecording;

  beforeEach(() => {
    callRecordingImpl = Sinon.createStubInstance(CallRecordingImpl);
    callRecording = new CallRecording(callRecordingImpl as any, contentDownloaderImpl as any);
  });

  it("Sends correct args to start a recording", async () => {
    // mocks
    const startRecordingResultMock: RecordingStateResponse = {
      recordingId: "testId",
      recordingState: "testState",
    };

    callRecordingImpl.startRecording.returns(
      new Promise((resolve) => {
        resolve(startRecordingResultMock);
      })
    );

    const recOptions: StartRecordingOptions = {
      recordingStateCallbackEndpoint: "https://contoso.com/download",
      callLocator: { id: "testCallId", kind: "serverCallLocator" },
      recordingChannel: "unmixed",
      recordingFormat: "wav",
      recordingContent: "audio",
    };

    await callRecording.startRecording(recOptions);

    // Check if the callRecordingImpl.startRecording was called with the correct arguments
    assert.isTrue(
      callRecordingImpl.startRecording.calledWithMatch({
        callLocator: {
          kind: "serverCallLocator",
          serverCallId: "testCallId",
        },
        recordingChannelType: "unmixed",
        recordingStateCallbackUri: "https://contoso.com/download",
        recordingContentType: "audio",
        recordingFormatType: "wav",
      })
    );
  });

  it("Sends correct args to stop a recording", async () => {
    const testRecordingID = "testRecordingId";

    await callRecording.stopRecording(testRecordingID);

    // Check if the callRecordingImpl.stopRecording was called with the correct arguments
    assert.isTrue(callRecordingImpl.stopRecording.calledWith(testRecordingID));
  });

  it("Sends correct args to pause a recording", async () => {
    const testRecordingID = "testRecordingId";

    await callRecording.pauseRecording(testRecordingID);

    // Check if the callRecordingImpl.pauseRecording was called with the correct arguments
    assert.isTrue(callRecordingImpl.pauseRecording.calledWith(testRecordingID));
  });

  it("Sends correct args to resume a recording", async () => {
    const testRecordingID = "testRecordingId";

    await callRecording.resumeRecording(testRecordingID);

    // Check if the callRecordingImpl.resumeRecording was called with the correct arguments
    assert.isTrue(callRecordingImpl.resumeRecording.calledWith(testRecordingID));
  });

  it("Sends correct args to get a get recording state", async () => {
    // mocks
    const getRecordingPropertiesMock: RecordingStateResponse = {
      recordingId: "testID",
      recordingState: "testState",
    };

    callRecordingImpl.getRecordingProperties.returns(
      new Promise((resolve) => {
        resolve(getRecordingPropertiesMock);
      })
    );

    const testRecordingID = "testRecordingId";

    await callRecording.getRecordingState(testRecordingID);

    // Check if the callRecordingImpl.getRecordingProperties was called with the correct arguments
    assert.isTrue(callRecordingImpl.getRecordingProperties.calledWith(testRecordingID));
  });
});
