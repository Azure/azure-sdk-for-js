// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder } from "@azure-tools/test-recorder";
import { SipTrunk } from "../../../src/models";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get trunks${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;

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

    it("can retrieve an existing trunk", async () => {
      await client.setTrunk({ fqdn: "44.fqdn.com", sipSignalingPort: 4567 } as SipTrunk);

      const trunk = await client.getTrunk("44.fqdn.com");

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
        { fqdn: "11.fqdn.com", sipSignalingPort: 1239 },
        { fqdn: "22.fqdn.com", sipSignalingPort: 2348 },
        { fqdn: "33.fqdn.com", sipSignalingPort: 3457 },
      ];
      await client.setTrunks(expectedTrunks);

      const trunks = await client.getTrunks();

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.deepEqual(trunks, expectedTrunks);
    });
  });
});
