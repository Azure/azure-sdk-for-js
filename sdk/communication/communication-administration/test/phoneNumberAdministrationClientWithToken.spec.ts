// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { env, isPlaybackMode, record, Recorder, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumberAdministrationClient } from "../src";

const recorderConfiguration: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
      AZURE_PHONE_NUMBER: "+18005551234",
      COMMUNICATION_ENDPOINT: "https://endpoint/",
      AZURE_CLIENT_ID: "SomeClientId",
      AZURE_CLIENT_SECRET: "SomeClientSecret",
      AZURE_TENANT_ID: "SomeTenantId"
    },
    customizationsOnRecordings: [
      (recording: string): string => recording.replace(/(https:\/\/)([^\/',]*)/, "$1endpoint"),
      (recording: string): string =>
        recording.replace(/"messageId"\s?:\s?"[^"]*"/g, `"messageId":"Sanitized"`)
    ],
    queryParametersToSkip: []
};

function createCredential(): TokenCredential {
    if (isPlaybackMode()) {
        return {
            getToken: async (_scopes) => {
                return { token: "testToken", expiresOnTimestamp: 11111 };
            }
        };
    } else {
        return new DefaultAzureCredential();
    }
}

describe("phoneNumberAdministrationClientWithToken [Playback/Live]", function() {
    let recorder: Recorder;
    const countryCode = "US";

    beforeEach(async function () {
        recorder = record(this, recorderConfiguration);
    });

    afterEach(async function () {
       if (!this.currentTest?.isPending()) {
           await recorder.stop();
       } 
    });

    it("successfully issues a token for a client [single scope]", async function() {
        const credential = createCredential();
        const endpoint = "";
        const shouldSkip = (env.INCLUDE_PHONENUMBER_LIVE_TESTS == "false" || !isPlaybackMode())

        if (shouldSkip) {
            this.skip();
        }

        const phoneNumberAdminClient = new PhoneNumberAdministrationClient(endpoint, credential);
        
        for await (const phonePlanGroup of phoneNumberAdminClient.listPhonePlanGroups(countryCode)) {
            assert.isString(phonePlanGroup.phonePlanGroupId);
            break;
          }
    });
});