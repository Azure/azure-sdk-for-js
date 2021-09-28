// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { env } from "@azure/test-utils-recorder";
// import { Uuid } from "../../src/uuid"
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

        beforeEach(async function() {
            recorder = record(this, environmentSetup);
            /*Place your code here*/
          });
        
        afterEach(async () => {
        /*Place your code here*/
        await recorder.stop();
        });

        it("Run all client operations", async function() {
            this.timeout(0);
            // var groupId = Uuid.generateUuid();
            var groupId = "dcaa70b7-372d-42d2-b20d-0cddae2548f2";
            var toUser = (await communicationIdentityClient.createUser()).communicationUserId;
            var fromUser = (await communicationIdentityClient.createUser()).communicationUserId;
            var callingServer = new CallingServerClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
            var joinCallOptions = {
                    callbackUri: "https://bot.contoso.io/callback",
                    requestedMediaTypes: [MediaType.Audio],
                    requestedCallEvents: [EventSubscriptionType.ParticipantsUpdated]
                };

            var fromCallConnection = await callingServer.joinCall(groupId, {communicationUserId: fromUser}, joinCallOptions);
            var toCallConnection = await callingServer.joinCall(groupId, {communicationUserId: toUser}, joinCallOptions);
            
            var serverCall = callingServer.initializeServerCall(groupId);
            var startCallRecordingResult = await serverCall.startRecording("https://bot.contoso.io/callback");
            var recordingId = startCallRecordingResult.recordingId;
            assert.notStrictEqual(serverCall.serverCallId, undefined);
            assert.notStrictEqual(recordingId, undefined);
            await delay(10000);
            var recordingState = await serverCall.getRecordingState(recordingId!);
            assert.strictEqual(recordingState.recordingState, "active");
            
            await serverCall.pauseRecording(recordingId!);
            await delay(10000);
            var recordingState = await serverCall.getRecordingState(recordingId!);
            assert.strictEqual(recordingState.recordingState, "inactive");

            await serverCall.resumeRecording(recordingId!);
            await delay(10000);
            var recordingState = await serverCall.getRecordingState(recordingId!);
            assert.strictEqual(recordingState.recordingState, "active");

            await serverCall.stopRecording(recordingId!);
            
            await fromCallConnection.hangUp();
            await toCallConnection.hangUp();
        })
    })
})
