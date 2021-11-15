// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { CallingServerClient, GroupCallLocator, PlayAudioOptions, CallConnection } from "../../src";
import * as Constants from "./utils/constants";
import { TestUtils } from "./utils/testUtils";
import assert from "assert";
import { Context } from "mocha";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { RestError } from "@azure/core-http";

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
};

const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace("endpoint:443", "endpoint")
  ],
  queryParametersToSkip: []
};

describe("Server Call Live Test", function() {
  describe("Recording Operations", function() {
    let recorder: Recorder;
    let connectionString: string;
    let callingServerClient: CallingServerClient;
    let fromUser: string;
    let toUser: string;

    beforeEach(async function(this: Context) {
      recorder = record(this, environmentSetup);

      connectionString =
        env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ||
        "endpoint=https://endpoint/;accesskey=banana";

      callingServerClient = new CallingServerClient(connectionString);

      fromUser = await TestUtils.getUserId("fromUser", connectionString);
      toUser = await TestUtils.getUserId("toUser", connectionString);
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("Run all client recording operations", async function(this: Context) {
      this.timeout(0);
      const groupId = TestUtils.getGroupId("Run all client recording operations");
      let connections = [];
      let recordingId = "";

      try {
        connections = await TestUtils.createCallConnections(
          callingServerClient,
          groupId,
          fromUser,
          toUser
        );
        const callLocator: GroupCallLocator = { groupCallId: groupId };

        const startCallRecordingResult = await callingServerClient.startRecording(
          callLocator,
          Constants.CALLBACK_URL
        );
        recordingId = startCallRecordingResult.recordingId!;
        await TestUtils.delayIfLive();
        let recordingState = await callingServerClient.getRecordingProperties(recordingId!);
        assert.strictEqual(recordingState.recordingState, "active");

        await callingServerClient.pauseRecording(recordingId!);
        await TestUtils.delayIfLive();
        recordingState = await callingServerClient.getRecordingProperties(recordingId!);
        assert.strictEqual(recordingState.recordingState, "inactive");

        await callingServerClient.resumeRecording(recordingId!);
        await TestUtils.delayIfLive();
        recordingState = await callingServerClient.getRecordingProperties(recordingId!);
        assert.strictEqual(recordingState.recordingState, "active");
      } finally {
        if (recordingId !== "") {
          try {
            await callingServerClient.stopRecording(recordingId);
          } catch (e) {
            console.error("Error stopping recording (" + recordingId + "): " + e);
          }
        }
      }

      await TestUtils.cleanCallConnections(connections);
    });

    it("Start recording with relative url fails", async function(this: Context) {
      const groupCallId = TestUtils.getGroupId("Start recording with relative url fails");
      let connections: CallConnection[] = [];
      let recordingId: string | undefined;

      try {
        connections = await TestUtils.createCallConnections(
          callingServerClient,
          groupCallId,
          fromUser,
          toUser
        );
        const callLocator: GroupCallLocator = { groupCallId: groupCallId };

        recordingId = (await callingServerClient.startRecording(callLocator, "/not/absolute/url"))
          .recordingId;
      } catch (e) {
        assert.strictEqual((e as RestError).statusCode, 400);
      } finally {
        if (recordingId !== undefined) {
          try {
            await callingServerClient.stopRecording(recordingId);
          } catch (e) {
            console.error("Error stopping recording (" + recordingId + "): " + e);
          }
        }
      }

      await TestUtils.cleanCallConnections(connections);
    }).timeout(0);
  });

  describe("Call Automation Operations", function() {
    let recorder: Recorder;
    let connectionString: string;

    beforeEach(async function(this: Context) {
      recorder = record(this, environmentSetup);
      /* Place your code here*/
      connectionString =
        env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ||
        "endpoint=https://endpoint/;accesskey=banana";
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("Run join_play_cancel_hangup scenario", async function(this: Context) {
      this.timeout(0);
      const groupId = TestUtils.getGroupId("Run join_play_cancel_hangup scenario");
      const fromUser = await TestUtils.getUserId("fromUser", connectionString);
      const toUser = await TestUtils.getUserId("toUser", connectionString);
      let connections = [];

      const callingServer = new CallingServerClient(connectionString);
      // create GroupCalls
      connections = await TestUtils.createCallConnections(
        callingServer,
        groupId,
        fromUser,
        toUser
      );
      try {
        const callLocator: GroupCallLocator = { groupCallId: groupId };

        // create PlayAudio option
        const playAudioOptions: PlayAudioOptions = {
          loop: true,
          audioFileId: recorder.getUniqueName("audioFileId"),
          callbackUrl: Constants.CALLBACK_URL,
          operationContext: recorder.getUniqueName("operationContext")
        };

        // Play Audio
        await TestUtils.delayIfLive();
        await callingServer.playAudio(callLocator, Constants.Audio_File_Url, playAudioOptions);

        // Cancel Prompt Audio
        await TestUtils.delayIfLive();
        await TestUtils.cancelAllMediaOperationsForGroupCall(connections)

      } finally {
        // Hangup call
        await TestUtils.delayIfLive();
        await TestUtils.cleanCallConnections(connections);
      }
    });

    it("Run create_add_remove_hangup scenario", async function(this: Context) {
      this.timeout(0);
      const groupId = TestUtils.getGroupId("Run create_add_remove_hangup scenario");
      const fromUser = await TestUtils.getUserId("fromUser", connectionString);
      const toUser = await TestUtils.getUserId("toUser", connectionString);
      let connections = [];

      const callingServer = new CallingServerClient(connectionString);
      // create GroupCalls
      connections = await TestUtils.createCallConnections(
        callingServer,
        groupId,
        fromUser,
        toUser
      );
      try {
        const callLocator: GroupCallLocator = { groupCallId: groupId };
        const added_participant_id = TestUtils.getFixedUserId("0000000d-bd96-2256-02c3-593a0d00b537");
        const participant: CommunicationUserIdentifier = {
          communicationUserId: added_participant_id
        }
        // Add Participant
        await TestUtils.delayIfLive();
        await callingServer.addParticipant(callLocator, participant, Constants.CALLBACK_URL);

        // Remove Participant
        await TestUtils.delayIfLive();
        await callingServer.removeParticipant(callLocator, participant);
      } finally {
        // Hangup call
        await TestUtils.delayIfLive();
        await TestUtils.cleanCallConnections(connections);
      }
    });
  })
});
