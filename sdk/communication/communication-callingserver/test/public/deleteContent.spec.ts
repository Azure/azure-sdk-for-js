// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
    env,
    isPlaybackMode,
    record,
    Recorder,
    RecorderEnvironmentSetup
  } from "@azure-tools/test-recorder";
  import { assert } from "chai";
  import { CallingServerClient } from "../../src";
  import { Context } from "mocha";
  import { RestError } from "@azure/core-http";
  
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
  
  describe("Delete Live Tests", function() {
    let recorder: Recorder;

    const uri =
      "https://endpoint/v1/objects/0-eus-d8-24d744599871098c7a22f28a4cb738d5";

    const callingServerServiceClient = new CallingServerClient(
        env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ||
        "endpoint=https://endpoint/;accesskey=banana"
    );
  
    beforeEach(async function(this: Context) {
      recorder = record(this, environmentSetup);
    });
  
    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });
  
    it("delete", async function(this: Context) {
      if (!isPlaybackMode()) {
        // tslint:disable-next-line:no-invalid-this
        this.skip();
      }
  
      const deleteRepsonse = await callingServerServiceClient.delete(uri);
      assert.strictEqual(200, deleteRepsonse._response.status);
    });
  
    it("unauthorized delete", async function(this: Context) {
      if (!isPlaybackMode()) {
        // tslint:disable-next-line:no-invalid-this
        this.skip();
      }
  
      try {
        const unauthorizedCallingServerServiceClient = new CallingServerClient(
            "endpoint=https://test.communication.azure.com/;accesskey=1234"
        )
        await unauthorizedCallingServerServiceClient.delete(uri);
      } catch (e) {
        assert.equal((e as RestError).statusCode, 401);
      }
    });

    it("invalid file delete", async function(this: Context) {
        if (!isPlaybackMode()) {
          // tslint:disable-next-line:no-invalid-this
          this.skip();
        }
        const invalidUri = "https://storage.asm.skype.com/v1/objects/0-eus-d3-00000000000000000000000000000000";
        try {
          await callingServerServiceClient.download(invalidUri);
        } catch (e) {
          assert.equal((e as RestError).statusCode, 404);
        }
      });
});
  
