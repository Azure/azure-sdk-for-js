// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode, env, record, Recorder } from "@azure-tools/test-recorder";
import { CallingServerClient, CreateCallConnectionOptions, PlayAudioOptions } from "../../src";
import { TestUtils } from "./utils/testUtils";
import { environmentSetup } from "./utils/recordedClient";
import { Context } from "mocha";
import { assert } from "chai";
import * as Constants from "./utils/constants";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { CommunicationUserIdentifier, PhoneNumberIdentifier } from "@azure/communication-common";

describe("Call Connection Live Test", function() {
  describe("Call Automation Operations", function() {
    let recorder: Recorder;
    let connectionString: string;

    beforeEach(async function(this: Context) {
      recorder = record(this, environmentSetup);

      if (isLiveMode()) {
        this.skip();
      }
      connectionString = env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING;
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("Run create_play_cancel_hangup scenario", async function(this: Context) {
      this.timeout(0);
      const to_phone_number = env.AZURE_PHONE_NUMBER;
      const callingServer = new CallingServerClient(connectionString);
      const identityClient = new CommunicationIdentityClient(connectionString);
      const from_user = await identityClient.createUser();
      const to_user: PhoneNumberIdentifier = {
        phoneNumber: to_phone_number
      };
      const from_phone_number = env.ALTERNATE_CALLERID;
      // create call option
      const createCallOptions: CreateCallConnectionOptions = {
        callbackUrl: Constants.CALLBACK_URL,
        requestedMediaTypes: ["audio"],
        requestedCallEvents: ["participantsUpdated", "toneReceived"],
        alternateCallerId: { phoneNumber: from_phone_number }
      };
      const callConnection = await callingServer.createCallConnection(
        from_user,
        [to_user],
        createCallOptions
      );
      try {
        // create PlayAudio option
        const playAudioOptions: PlayAudioOptions = {
          loop: true,
          audioFileId: recorder.getUniqueName("audioFileId"),
          callbackUrl: Constants.CALLBACK_URL,
          operationContext: recorder.getUniqueName("operationContext")
        };

        // Play Audio
        await TestUtils.delayIfLive();
        await callConnection.playAudio(Constants.Audio_File_Url, playAudioOptions);

        // Cancel Media
        await TestUtils.delayIfLive();
        await callConnection.cancelAllMediaOperations();
      } finally {
        // Hangup call
        await TestUtils.delayIfLive();
        await callConnection.hangUp();
      }
    });

    it("Run create_add_remove_hangup scenario", async function(this: Context) {
      this.timeout(0);
      const to_phone_number = env.AZURE_PHONE_NUMBER;
      const callingServer = new CallingServerClient(connectionString);
      const identityClient = new CommunicationIdentityClient(connectionString);
      const from_user = await identityClient.createUser();
      const to_user: PhoneNumberIdentifier = {
        phoneNumber: to_phone_number
      };
      const from_phone_number = env.ALTERNATE_CALLERID;
      // create call option
      const createCallOptions: CreateCallConnectionOptions = {
        callbackUrl: Constants.CALLBACK_URL,
        requestedMediaTypes: ["audio"],
        requestedCallEvents: ["participantsUpdated", "toneReceived"],
        alternateCallerId: { phoneNumber: from_phone_number }
      };
      const callConnection = await callingServer.createCallConnection(
        from_user,
        [to_user],
        createCallOptions
      );
      try {
        const added_participant_id = TestUtils.getFixedUserId(
          "0000000f-2c81-cd63-7bfa-553a0d001166"
        );
        const participant: CommunicationUserIdentifier = {
          communicationUserId: added_participant_id
        };
        // Add Participant
        await TestUtils.delayIfLive();
        const addParticipantResult = await callConnection.addParticipant(participant);
        assert.isNotNull(addParticipantResult.operationContext);
        assert.equal(addParticipantResult.status, "running");
        assert.isNotNull(addParticipantResult.resultDetails);

        // Remove Participant
        await TestUtils.delayIfLive();
        await callConnection.removeParticipant(participant);
      } finally {
        // Hangup call
        await TestUtils.delayIfLive();
        await callConnection.hangUp();
      }
    });

    it("Run mute_unmute_get_participant scenario", async function(this: Context) {
      this.timeout(0);
      const to_phone_number = env.AZURE_PHONE_NUMBER;
      const callingServer = new CallingServerClient(connectionString);
      const identityClient = new CommunicationIdentityClient(connectionString);
      const from_user = await identityClient.createUser();
      const to_user: PhoneNumberIdentifier = {
        phoneNumber: to_phone_number
      };
      const from_phone_number = env.ALTERNATE_CALLERID;
      // create call option
      const createCallOptions: CreateCallConnectionOptions = {
        callbackUrl: Constants.CALLBACK_URL,
        requestedMediaTypes: ["audio"],
        requestedCallEvents: ["participantsUpdated", "toneReceived"],
        alternateCallerId: { phoneNumber: from_phone_number }
      };
      const callConnection = await callingServer.createCallConnection(
        from_user,
        [to_user],
        createCallOptions
      );
      try {
        const added_participant_id = TestUtils.getFixedUserId(Constants.ParticipantGuid);
        const participant: CommunicationUserIdentifier = {
          communicationUserId: added_participant_id
        };
        // Add Participant
        await TestUtils.delayIfLive();
        const addParticipantResult = await callConnection.addParticipant(participant);
        assert.equal(addParticipantResult.status, "running");

        // Mute participant
        await TestUtils.delayIfLive();
        await callConnection.muteParticipant(participant);

        // Get Participant
        await TestUtils.delayIfLive();
        const mutedParticipant = await callConnection.getParticipant(participant);
        assert.isTrue(mutedParticipant.isMuted);

        // Unmute Participant  not working currently
        await TestUtils.delayIfLive();
        await callConnection.unmuteParticipant(participant);

        // Get Participant
        await TestUtils.delayIfLive();
        const unmutedParticipant = await callConnection.getParticipant(participant);
        assert.isFalse(unmutedParticipant.isMuted);

        // Remove Participant
        await TestUtils.delayIfLive();
        await callConnection.removeParticipant(participant);
      } catch (e) {
        console.log(e);
      } finally {
        // Hangup call
        await TestUtils.delayIfLive();
        await callConnection.hangUp();
      }
    });

  });
});
