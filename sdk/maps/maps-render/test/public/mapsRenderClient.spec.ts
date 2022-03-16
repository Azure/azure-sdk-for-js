// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { MapsRenderClient } from "src/mapsRenderClient";
import { assert, use as chaiUse } from "chai";
import { matrix } from "@azure/test-utils";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

matrix([["SubscriptionKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] MapsRenderClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: MapsRenderClient;
    const fastTimeout = 10000;

    beforeEach(function (this: Context) {
      recorder = createRecorder(this);
      client = createClient(authMethod);
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("fast tests", function () {
      before(function (this: Context) {
        this.timeout(fastTimeout);
      });

      xdescribe("#method", function () {
        it("test", async function () {
          await client.getCopyrightForWorld();
          assert.ok({});
        });
      });
    });
  });
});
