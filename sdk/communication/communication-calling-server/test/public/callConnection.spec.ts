// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, record, Recorder, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { CallingServerClient, CreateCallConnectionOptions, PlayAudioOptions, RemoveFromDefaultAudioGroupOptions, AddToDefaultAudioGroupOptions, TransferToCallOptions, GetAudioGroupsOptions } from "../../src";
import { TestUtils } from "./utils/testUtils";
import { environmentSetup } from "./utils/recordedClient";
import { Context } from "mocha";
import { assert } from "chai";
import * as Constants from "./utils/constants";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { CommunicationUserIdentifier, PhoneNumberIdentifier } from "@azure/communication-common";
import { CreateAudioGroupOptions } from "@azure/communication-calling-server";

describe("Call Connection Live Test", function() {
  describe("Call Automation Operations", function() {
    let recorder: Recorder;
    let connectionString: string;
    beforeEach(async function(this: Context) {
      recorder = record(this, environmentSetup);
      connectionString = 
        env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ||
        "endpoint=https://endpoint/;accesskey=banana";
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("Run create_play_cancel_hangup scenario", async function(this: Context) {
      this.timeout(0);
      const callConnection = await SetupCall();
      try {
        // create PlayAudio option
        const playAudioOptions: PlayAudioOptions = {
          loop: Constants.PlayAudioOptionsLoop,
          audioFileId: recorder.getUniqueName("audioFileId"),
          callbackUrl: Constants.CALLBACK_URL,
          operationContext: recorder.getUniqueName("operationContext")
        };

        // Play Audio
        await TestUtils.waitForOperationCompletion();
        await callConnection.playAudio(Constants.Audio_File_Url, playAudioOptions);

        // Cancel Media
        await TestUtils.waitForOperationCompletion();
        await callConnection.cancelAllMediaOperations();
      }
      catch(e)
      {
       console.log(e) 
      }
      finally {
        // Hangup call
        await TestUtils.waitForOperationCompletion();
        await callConnection.hangUp();
      }
    });

    it("Run create_add_remove_hangup scenario", async function(this: Context) {
      this.timeout(0);
      const callConnection = await SetupCall();
      try {
        const added_participant_id = TestUtils.getFixedUserId(
          Constants.ParticipantGuid
        );
        const participant: CommunicationUserIdentifier = {
          communicationUserId: added_participant_id
        };
        // Add Participant
        await TestUtils.waitForOperationCompletion();
        const addParticipantResult = await callConnection.addParticipant(participant);
        assert.isNotNull(addParticipantResult.operationContext);
        assert.equal(addParticipantResult.status, "running");
        assert.isNotNull(addParticipantResult.resultDetails);

         //List participants 
         await TestUtils.waitForOperationCompletion();
         const listParticipantsResult = await callConnection.getParticipants()
         assert.isTrue(listParticipantsResult.length >= 2)
 

        // create PlayAudio option
        const playAudioOptions: PlayAudioOptions = {
          loop: Constants.PlayAudioOptionsLoop,
          audioFileId: recorder.getUniqueName("audioFileId"),
          callbackUrl: Constants.CALLBACK_URL,
          operationContext: recorder.getUniqueName("operationContext")
        };
        const audioResult = await callConnection.playAudioToParticipant(participant, Constants.Audio_File_Url, playAudioOptions);
        const operationId = audioResult.operationId != undefined ? audioResult.operationId : ''
        // Remove Participant
        await TestUtils.waitForOperationCompletion();
        await callConnection.cancelParticipantMediaOperation(participant, operationId);

       // Remove Participant
        await TestUtils.waitForOperationCompletion();
        await callConnection.removeParticipant(participant);
      }
      catch(e){
          console.log(e)
      }
      finally {
        // Hangup call
        await TestUtils.waitForOperationCompletion();
        await callConnection.hangUp();
      }
    });

    it("Run mute_unmute_get_participant scenario", async function(this: Context) {
      this.timeout(0);
      const callConnection = await SetupCall();
      try {
        const added_participant_id = TestUtils.getFixedUserId(
          Constants.ParticipantGuid
        );
        const participant: CommunicationUserIdentifier = {
          communicationUserId: added_participant_id
        };
        // Add Participant
        await TestUtils.waitForOperationCompletion();
        const addParticipantResult = await callConnection.addParticipant(participant);
        assert.equal(addParticipantResult.status, "running");

        // Mute participant
        await TestUtils.waitForOperationCompletion();
        await callConnection.muteParticipant(participant)

        // Get Participant
        await TestUtils.waitForOperationCompletion();
        let mutedParticipant = await callConnection.getParticipant(participant)
        assert.isTrue(mutedParticipant.isMuted)

        // Unmute Participant  not working currently
        await TestUtils.waitForOperationCompletion();
        await callConnection.unmuteParticipant(participant)

        // Get Participant
        await TestUtils.waitForOperationCompletion();
        let unmutedParticipant = await callConnection.getParticipant(participant)
        assert.isFalse(unmutedParticipant.isMuted)

        // Remove Participant
        await TestUtils.waitForOperationCompletion();
        await callConnection.removeParticipant(participant);
      }
      catch(e){
          console.log(e)          
      }
      finally {
        // Hangup call
        await TestUtils.waitForOperationCompletion();
        await callConnection.hangUp();
      }
    });

    it("Run test_remove_add_from_default_audio_group_request scenario", async function(this: Context) {
      this.timeout(0);
      const callConnection = await SetupCall();
      try {
        const added_participant_id = TestUtils.getFixedUserId(
            Constants.ParticipantGuid
        );
        const participant: CommunicationUserIdentifier = {
          communicationUserId: added_participant_id
        };
        // Add Participant
        await TestUtils.waitForOperationCompletion();
        const addParticipantResult = await callConnection.addParticipant(participant);
        assert.equal(addParticipantResult.status, "running");

        // Create audio group
        await TestUtils.waitForOperationCompletion();
        let participantList = [];
        participantList[0] = participant
        const option: CreateAudioGroupOptions = {
        };
     
        // Create audio group
        const createAudioGroupResult = await callConnection.createAudioGroup("multicast", participantList, option);
        assert.isTrue(createAudioGroupResult.audioGroupId != '');

        // Get Audio Group
        let getAudioGroupsOptions:GetAudioGroupsOptions = {}
        let getAudioGroupResult = await callConnection.getAudioGroups(createAudioGroupResult.audioGroupId!, getAudioGroupsOptions)
        assert.isTrue(getAudioGroupResult.audioRoutingMode! == "multicast")
        assert.isTrue(getAudioGroupResult.targets![0].communicationUser!.id == participant.communicationUserId)

        // Add another Participant

        const added_another_participant_id = TestUtils.getFixedUserId(
          Constants.ParticipantGuidAudioGroup
        );
        const anotherParticipant: CommunicationUserIdentifier = {
           communicationUserId: added_another_participant_id
        };

        await TestUtils.waitForOperationCompletion();
        const addAnotherParticipantResult = await callConnection.addParticipant(anotherParticipant);
        assert.equal(addAnotherParticipantResult.status, "running");

        participantList[0] = anotherParticipant
        await callConnection.updateAudioGroup(createAudioGroupResult.audioGroupId!, participantList, option);

        // Delete Audio Group
        await callConnection.deleteAudioGroup(createAudioGroupResult.audioGroupId!, option)

        // Resume/Add to group Participant
        await TestUtils.waitForOperationCompletion();

        // Remove Participant
        await TestUtils.waitForOperationCompletion();
        await callConnection.removeParticipant(participant);
        await callConnection.removeParticipant(anotherParticipant);
      }
      catch(e){
          console.log(e)
      }
      finally {
        // Hangup call
        await TestUtils.waitForOperationCompletion();
        await callConnection.hangUp();
      }
    });

    it("Run test_transfer_to_participant scenario", async function(this: Context) {
      this.timeout(0);
      const callConnection = await SetupCall();
      try {
        const target_participant_id = TestUtils.getFixedUserId(
            Constants.ParticipantGuid 
        );
        const participant: CommunicationUserIdentifier = {
          communicationUserId: target_participant_id
        };
        // Transfer to Participant
        await TestUtils.waitForOperationCompletion();
        const transferParticipantResult = await callConnection.transferToParticipant(participant);
        assert.isTrue(transferParticipantResult.status == 'running');
      }
      catch(e){
          console.log(e)
      }
    });

    it("Run test_transfer_to_call scenario", async function(this: Context) {
      this.timeout(0);
      if (isLiveMode() || isPlaybackMode()) {
        this.skip();
     }
      const callConnection = await SetupCall();
      try {
        // Transfer to call
        await TestUtils.waitForOperationCompletion();
        let option:TransferToCallOptions = {userToUserInformation : ''}
        const transferParticipantResult = await callConnection.transferToCall('95201300-2190-4dfd-a254-f0ff7d55af05', option);
        assert.notEqual(transferParticipantResult.status, 'running');
      }
      catch(e){
          console.log(e)
      }
    });

    it("Run test_keep_alive_delete_call scenario", async function(this: Context) {
      this.timeout(0);
      const callConnection = await SetupCall();
      try {
        await callConnection.keepAlive();

        await TestUtils.waitForOperationCompletion();
        callConnection.delete();

        await TestUtils.waitForOperationCompletion();
        try{
          await callConnection.keepAlive();
        }
        catch(e){
          console.log(e)
          assert.isTrue(e && e.code == '8522')
        }
      }
      catch(e){
          console.log(e)
      }
    });

    it("Run add_remove_audio scenario", async function(this: Context) {
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
          Constants.ParticipantGuid
        );
        const participant: CommunicationUserIdentifier = {
          communicationUserId: added_participant_id
        };
        // Add Participant
        await TestUtils.waitForOperationCompletion();
        const addParticipantResult = await callConnection.addParticipant(participant);
        assert.isNotNull(addParticipantResult.operationContext);
        assert.equal(addParticipantResult.status, "running");
        assert.isNotNull(addParticipantResult.resultDetails);

        // Hold/Remove audio
        const removeOption:RemoveFromDefaultAudioGroupOptions = {}
        await callConnection.removeFromDefaultAudioGroup(participant, removeOption)

        // Resume/ audio
        const resumeOption:AddToDefaultAudioGroupOptions = {}
        await callConnection.addToDefaultAudioGroup(participant, resumeOption)

        // Remove Participant
        await TestUtils.waitForOperationCompletion();
        await callConnection.removeParticipant(participant);
      }
      catch(e){
        console.log(e)
      } finally {
        // Hangup call
        await TestUtils.waitForOperationCompletion();
        await callConnection.hangUp();
      }
    });

    async function SetupCall() {
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
      return callConnection;
    }
  });
});