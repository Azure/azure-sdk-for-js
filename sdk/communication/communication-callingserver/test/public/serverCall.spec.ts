// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { CallingServerClient, GroupCallLocator } from "../../src";
import { CALLBACK_URI  } from "./utils/constants";
import { TestUtils } from "./utils/testUtils";
import assert from "assert";
import { Context } from "mocha";

const replaceableVariables: { [k: string]: string } = {
    COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
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
    const connectionString = env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING || "endpoint=https://endpoint/;accesskey=banana";

    describe("Recording Operations", function() {

        let recorder: Recorder;

        beforeEach(async function(this: Context) {
            recorder = record(this, environmentSetup);
            /* Place your code here*/
          });
        
        afterEach(async function(this: Context) {
          if (!this.currentTest?.isPending()) {
            await recorder.stop();
          }
        });

        it("Run all client recording operations", async function() {
            this.timeout(0);
            const groupId = TestUtils.getGroupId("Run all client recording operations");
            const fromUser = await TestUtils.getUserId("fromUser", connectionString);
            const toUser = await TestUtils.getUserId("toUser", connectionString);
            let connections = [];
            let recordingId = "";

            const callingServer = new CallingServerClient(connectionString);

            try {
              connections = await TestUtils.createCallConnections(callingServer, groupId, fromUser, toUser);
              const callLocator : GroupCallLocator = { groupCallId: groupId};
              
              const startCallRecordingResult = await callingServer.startRecording(callLocator, CALLBACK_URI);
              recordingId = startCallRecordingResult.recordingId!;
              await TestUtils.delayIfLive();
              var recordingState = await callingServer.getRecordingProperties(recordingId!);
              assert.strictEqual(recordingState.recordingState, "active");
              
              await callingServer.pauseRecording(recordingId!);
              await TestUtils.delayIfLive();
              var recordingState = await callingServer.getRecordingProperties(recordingId!);
              assert.strictEqual(recordingState.recordingState, "inactive");

              await callingServer.resumeRecording(recordingId!);
              await TestUtils.delayIfLive();
              var recordingState = await callingServer.getRecordingProperties(recordingId!);
              assert.strictEqual(recordingState.recordingState, "active");
            }
            finally {
              if (recordingId != "") {
                try {
                  await callingServer.stopRecording(recordingId);
                } catch (e) {
                  console.error("Error stopping recording (" + recordingId + "): " + e);
                }
              }
            }
            
            await TestUtils.cleanCallConnections(connections);
        })
    })
})
