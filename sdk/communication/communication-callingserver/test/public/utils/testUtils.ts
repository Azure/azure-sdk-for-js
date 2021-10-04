// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isLiveMode, isRecordMode } from "@azure/test-utils-recorder";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { CallingServerClient, MediaType, EventSubscriptionType, CallConnection } from "../../../src";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import  * as Constants from "../utils/constants";
import { isPlaybackMode } from "@azure-tools/test-recorder";

export class TestUtils {
    private static delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    
    public static async getUserId(userName: string) {
      var communicationIdentityClient = new CommunicationIdentityClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
      if (isPlaybackMode()){
        return "8:acs:" + env.AZURE_TENANT_ID + "_" + uuidv5(userName, Constants.NAMESPACE_UUID);
      }
      
      return (await communicationIdentityClient.createUser()).communicationUserId;
    }

    public static getGroupId(testName: string) {
      if (isLiveMode()) {
        return uuidv4();
      }
      return uuidv5(testName, Constants.NAMESPACE_UUID);
    }

    public static async createCallConnections(
      callingServerClient: CallingServerClient, 
      groupId: string,
      fromUser: string,
      toUser: string) {
      
      const joinCallOptions = {
          callbackUri: Constants.CALLBACK_URI,
          requestedMediaTypes: [MediaType.Audio],
          requestedCallEvents: [EventSubscriptionType.ParticipantsUpdated]
      };
      var callConnections = [];
      callConnections.push(await callingServerClient.joinCall(groupId, {communicationUserId: fromUser}, joinCallOptions));
      callConnections.push(await callingServerClient.joinCall(groupId, {communicationUserId: toUser}, joinCallOptions));

      return callConnections;
    }

    public static async delayIfLive() {
      if (isLiveMode() || isRecordMode()) {
        await this.delay(10000);
      }
    }

    public static async cleanCallConnections(callConnections: Array<CallConnection>) {
      callConnections.forEach(async (connection) => {
        await connection.hangUp();
      });
    }
}