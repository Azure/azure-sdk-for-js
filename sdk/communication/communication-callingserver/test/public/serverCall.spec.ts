// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { env } from "@azure/test-utils-recorder";
import { CallingServerClient, GroupCallLocator } from "../../src";
import { CALLBACK_URI  } from "./utils/constants";
import { TestUtils } from "./utils/testUtils";
import assert from "assert";

const replaceableVariables: { [k: string]: string } = {
    COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
  };

const environmentSetup: RecorderEnvironmentSetup = {
    replaceableVariables,
    customizationsOnRecordings: [],
    queryParametersToSkip: []
  };

describe("Server Call", function() {

    describe("Recording Operations", function() {

        let recorder: Recorder;

        beforeEach(async function() {
            recorder = record(this, environmentSetup);
            /*Place your code here*/
          });
        
        afterEach(async () => {
        /*Place your code here*/
        await recorder.stop();
        });

        it.only("Run all client recording operations", async function() {
            this.timeout(0);
            var groupId = TestUtils.getGroupId("Run all client recording operations");
            
            var fromUser = await TestUtils.getUserId("fromUser");
            var toUser = await TestUtils.getUserId("toUser");

            var connections = [];
            var recordingId = "";
            var serverCall = null;

            var callingServer = new CallingServerClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);

            try {
              connections = await TestUtils.createCallConnections(callingServer, groupId, fromUser, toUser);
              let callLocator : GroupCallLocator = { groupCallId: groupId};
              
              var startCallRecordingResult = await callingServer.startRecording(callLocator, CALLBACK_URI);
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

              await callingServer.stopRecording(recordingId!);  
            }
            finally {
              if (serverCall != null) {
                try {
                  await callingServer.stopRecording(recordingId);
                } catch (e) {
                  console.error("Error stopping recording (" + recordingId + "): " + e);
                }
              }
            }
            
            TestUtils.cleanCallConnections(connections);
        })
    })
})
