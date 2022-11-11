// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { SipTrunk } from "../../../src/models";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueFqdn,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get trunks${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;

    const firstFqdn = getUniqueFqdn("first");
    const secondFqdn = getUniqueFqdn("second");
    const thirdFqdn = getUniqueFqdn("third");
    const fourthFqdn = getUniqueFqdn("fourth");

    before(async function (this: Context) {
      if (!isPlaybackMode()) {
        clearSipConfiguration();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("cannot retrieve a not existing trunk", async () => {
      try {
        await client.getTrunk("not.existing.fqdn");
      } catch (error: any) {
        assert.equal(error.code, "NotFound");
        return;
      }
      assert.fail("NotFound expected.");
    });

    it("can retrieve an existing trunk", async function (this: Context) {
      if (isPlaybackMode()) {
        this.skip();
      }
      await client.setTrunk({ fqdn: fourthFqdn, sipSignalingPort: 4567 } as SipTrunk);

      const trunk = await client.getTrunk(fourthFqdn);

      assert.isNotNull(trunk);
      assert.equal(trunk?.sipSignalingPort, 4567);
    });

    it("can retrieve trunks", async () => {
      assert.isArray(await client.getTrunks());
    });

    it("can retrieve empty trunks", async () => {
      await client.setTrunks([]);

      const trunks = await client.getTrunks();

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.isEmpty(trunks);
    });

    it("can retrieve not empty trunks", async () => {
      const expectedTrunks = [
        { fqdn: firstFqdn, sipSignalingPort: 1239 },
        { fqdn: secondFqdn, sipSignalingPort: 2348 },
        { fqdn: thirdFqdn, sipSignalingPort: 3457 },
      ];
      await client.setTrunks(expectedTrunks);

      const trunks = await client.getTrunks();

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.equal(expectedTrunks.length, trunks.length);
      if (!isPlaybackMode()) {
        assert.deepEqual(trunks, expectedTrunks);
      }
    });
  });
});
