// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { env, isLiveMode, isRecordMode } from "@azure/test-utils-recorder";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { CallingServerClient, MediaType, EventSubscriptionType } from "../../src";
import assert from "assert";

const replaceableVariables: { [k: string]: string } = {
    COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
  };

const environmentSetup: RecorderEnvironmentSetup = {
    replaceableVariables,
    customizationsOnRecordings: [
      (recording: string): string => recording.replace(/"token"\s?:\s?"[^"]*"/g, `"token":"token"`),
      (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
      (recording: string): string => recording.replace("endpoint:443", "endpoint")
    ],
    queryParametersToSkip: []
  };

describe("Server Call", function() {
    let communicationIdentityClient = new CommunicationIdentityClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);

    describe("Recording Operations", function() {

        let recorder: Recorder;
        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }
        
        async function getUserId(userName: string) {
          if (isLiveMode()){
            return (await communicationIdentityClient.createUser()).communicationUserId;
          }
        
          return "8:acs:" + env.AZURE_TENANT_ID + "_" + uuidv5(userName, "6ba7b812-9dad-11d1-80b4-00c04fd430c8");
        }

        async function delayIfLive() {
          if (isLiveMode() || isRecordMode()) {
            await delay(10000);
          }
        }

        beforeEach(async function() {
            recorder = record(this, environmentSetup);
            /*Place your code here*/
          });
        
        afterEach(async () => {
        /*Place your code here*/
        await recorder.stop();
        });

        it("Run all client recording operations", async function() {
            this.timeout(0);
            var groupId;
            if (isLiveMode()) {
              groupId = uuidv4();
            } else {
              groupId = uuidv5("Run all client recording operations", "6ba7b812-9dad-11d1-80b4-00c04fd430c8");
            }
            var fromUser = await getUserId("fromUser");
            var toUser = await getUserId("toUser");
            // var fromUser = "8:acs:016a7064-0581-40b9-be73-6dde64d69d72_f30d3598-6a48-4390-9324-6f14ffbf33c8";
            // var toUser = "8:acs:016a7064-0581-40b9-be73-6dde64d69d72_b8cec067-f0b8-4ada-8987-25286a303880";
            var callingServer = new CallingServerClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
            var joinCallOptions = {
                    callbackUri: "https://bot.contoso.io/callback",
                    requestedMediaTypes: [MediaType.Audio],
                    requestedCallEvents: [EventSubscriptionType.ParticipantsUpdated]
                };

            var connections = [];
            var recordingId = "";
            var serverCall = null;

            try {
              connections.push(await callingServer.joinCall(groupId, {communicationUserId: fromUser}, joinCallOptions));
              connections.push(await callingServer.joinCall(groupId, {communicationUserId: toUser}, joinCallOptions));
              
              serverCall = callingServer.initializeServerCall(groupId);
              var startCallRecordingResult = await serverCall.startRecording("https://bot.contoso.io/callback");
              recordingId = startCallRecordingResult.recordingId!;
              assert.notStrictEqual(serverCall.serverCallId, undefined);
              await delayIfLive();
              var recordingState = await serverCall.getRecordingState(recordingId!);
              assert.strictEqual(recordingState.recordingState, "active");
              
              await serverCall.pauseRecording(recordingId!);
              await delayIfLive();
              var recordingState = await serverCall.getRecordingState(recordingId!);
              assert.strictEqual(recordingState.recordingState, "inactive");

              await serverCall.resumeRecording(recordingId!);
              await delayIfLive();
              var recordingState = await serverCall.getRecordingState(recordingId!);
              assert.strictEqual(recordingState.recordingState, "active");

              await serverCall.stopRecording(recordingId!);  
            }
            finally {
              if (serverCall != null) {
                try {
                  await serverCall.stopRecording(recordingId);
                } catch (e) {
                  console.error("Error stopping recording (" + recordingId + "): " + e);
                }
              }
            }
            
            connections.forEach(async (connection) => {
              await connection.hangUp();
            });
        })
    })
})
