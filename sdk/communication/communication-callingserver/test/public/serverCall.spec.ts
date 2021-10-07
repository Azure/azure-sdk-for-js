// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { CallConnection, CallingServerClient, CreateCallOptions, EventSubscriptionType, MediaType } from "../../src";
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

describe("Server Call Live tests", function() {

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

        it.skip("Run all client recording operations", async function() {
            this.timeout(0);
            
            const fromUser = await TestUtils.getUser();
            const toUser = await TestUtils.getUser();

            // var connections = [];
            var callConnection : CallConnection;
            var recordingId = "";

            let callingServer = new CallingServerClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
            try {
              var callOptions : CreateCallOptions = {
                callbackUri: CALLBACK_URI,
                requestedMediaTypes: [MediaType.Audio],
                requestedCallEvents: [EventSubscriptionType.ParticipantsUpdated],
              }
              var callConnection = await callingServer.createCallConnection(fromUser, [toUser], callOptions);
              console.log("Waiting");
              await TestUtils.delayIfLive();
              var call = await callConnection.getCall();
              console.log("Call: " + JSON.stringify(call, null, 4));
              let callLocator = call.callLocator;
              console.log("Call Locator: " + JSON.stringify(callLocator, null, 4));
              var startCallRecordingResult = await callingServer.startRecording(callLocator!, CALLBACK_URI);
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
              if (callingServer != null) {
                try {
                  await callingServer.stopRecording(recordingId);
                } catch (e) {
                  console.error("Error stopping recording (" + recordingId + "): " + e);
                }
              }
            }
            
            //TestUtils.cleanCallConnections(connections);
            callConnection.hangUp();
        })
    })
})
