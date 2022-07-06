// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecordedRoomsClient } from "./utils/recordedClient";
import { assert } from "chai";
import { Context } from "mocha";
import sinon from "sinon";
import { RoomsClient } from "../../src/roomsClient";

describe("RoomsClient", function () {
  let recorder: Recorder;
  let client: RoomsClient;

  describe("Room Operations", function () {
    beforeEach(async function (this: Context) {
      ({ client, recorder } = await createRecordedRoomsClient(this));
    });

    afterEach(async function () {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      if (isPlaybackMode()) {
        sinon.restore();
      }
    });

    it("successfully creates a room", async function () {
      const request = {
        //validUntil : new Date(),
      };
      await client
        .createRoom(request)
        .then((result) => {
          console.log("pass");
          assert.isUndefined(result);
          console.log("why");
        })
        .catch((error) => {
          console.log("fail");
          console.error(error);
          assert.isUndefined(error);
        });
    });
  });
});
