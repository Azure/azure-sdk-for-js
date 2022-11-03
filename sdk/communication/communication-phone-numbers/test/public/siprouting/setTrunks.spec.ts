// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder } from "@azure-tools/test-recorder";
import { SipTrunk, SipTrunkRoute } from "../../../src/models";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - set trunks${useAad ? " [AAD]" : ""}`, function () {
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

    it("can set a new trunk", async () => {
      let trunkFqdn = useAad ? "211.fqdn.com" : "212.fqdn.com";
      const trunk: SipTrunk = { fqdn: trunkFqdn, sipSignalingPort: 1231 };

      const setTrunk = await client.setTrunk(trunk);
      assert.deepEqual(setTrunk, trunk);

      const getTrunk = await client.getTrunk(trunkFqdn);
      assert.deepEqual(getTrunk, trunk);
    });

    it("can set an existing trunk", async () => {
      let trunkFqdn = useAad ? "213.fqdn.com" : "214.fqdn.com";
      const trunk: SipTrunk = { fqdn: trunkFqdn, sipSignalingPort: 1231 };
      await client.setTrunk(trunk);

      trunk.sipSignalingPort = 6789;

      const setTrunk = await client.setTrunk(trunk);
      assert.deepEqual(setTrunk, trunk);

      const getTrunk = await client.getTrunk(trunkFqdn);
      assert.deepEqual(getTrunk, trunk);
    });

    it("can set multiple new trunks when empty before", async () => {
      await client.setTrunks([]);

      const trunks: SipTrunk[] = [
        { fqdn: useAad ? "215.fqdn.com" : "216.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: useAad ? "217.fqdn.com" : "218.fqdn.com", sipSignalingPort: 7348 },
      ];

      const setTrunks = await client.setTrunks(trunks);
      assert.deepEqual(setTrunks, trunks);

      const storedTrunks = await client.getTrunks();
      assert.deepEqual(storedTrunks, trunks);
    });

    it("can set multiple existing trunks", async () => {
      const trunks: SipTrunk[] = [
        { fqdn: useAad ? "219.fqdn.com" : "221.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: useAad ? "222.fqdn.com" : "223.fqdn.com", sipSignalingPort: 7348 },
      ];
      await client.setTrunks(trunks);

      trunks[0].sipSignalingPort = 6789;
      trunks[1].sipSignalingPort = 9876;

      const setTrunks = await client.setTrunks(trunks);
      assert.deepEqual(setTrunks, trunks);

      const storedTrunks = await client.getTrunks();
      assert.deepEqual(storedTrunks, trunks);
    });

    it("can set empty trunks when empty before", async () => {
      await client.setTrunks([]);

      await client.setTrunks([]);

      const storedTrunks = await client.getTrunks();
      assert.isNotNull(storedTrunks);
      assert.isArray(storedTrunks);
      assert.isEmpty(storedTrunks);
    });

    it("can set empty trunks when not empty before", async () => {
      const trunks: SipTrunk[] = [
        { fqdn: useAad ? "224.fqdn.com" : "225.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: useAad ? "226.fqdn.com" : "227.fqdn.com", sipSignalingPort: 7348 },
      ];
      await client.setTrunks(trunks);

      await client.setTrunks([]);

      const storedTrunks = await client.getTrunks();
      assert.isNotNull(storedTrunks);
      assert.isArray(storedTrunks);
      assert.isEmpty(storedTrunks);
    });

    it("cannot set invalid fqdn trunk", async () => {
      const invalidTrunk: SipTrunk = { fqdn: "-1", sipSignalingPort: 8239 };
      try {
        await client.setTrunk(invalidTrunk);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");

        try {
          await client.getTrunk("-1");
        } catch (getError: any) {
          assert.equal(getError.code, "NotFound");
          return;
        }
        assert.fail("NotFound expected.");
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set invalid port trunk", async () => {
      await client.setTrunks([]);
      let trunkFqdn = useAad ? "228.fqdn.com" : "229.fqdn.com";
      const invalidTrunk: SipTrunk = { fqdn: trunkFqdn, sipSignalingPort: 0 };

      try {
        await client.setTrunk(invalidTrunk);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");

        try {
          await client.getTrunk(trunkFqdn);
        } catch (getError: any) {
          assert.equal(getError.code, "NotFound");
          return;
        }
        assert.fail("NotFound expected.");
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set trunks without trunk used in route", async () => {
      const expectedTrunks: SipTrunk[] = [
        { fqdn: useAad ? "231.fqdn.com" : "232.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: useAad ? "233.fqdn.com" : "234.fqdn.com", sipSignalingPort: 7348 },
      ];
      await client.setTrunks(expectedTrunks);

      const expectedRoutes = [
        {
          name: "myFirstRoute",
          description: "myFirstRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: ["231.fqdn.com", "232.fqdn.com"],
        },
        {
          name: "mySecondRoute",
          description: "mySecondRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: ["233.fqdn.com"],
        },
      ];
      await client.setRoutes(expectedRoutes);

      try {
        await client.setTrunks([{ fqdn: useAad ? "235.fqdn.com" : "236.fqdn.com", sipSignalingPort: 1234 }]);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedTrunks = await client.getTrunks();
        assert.isNotNull(storedTrunks);
        assert.isArray(storedTrunks);
        assert.deepEqual(storedTrunks, expectedTrunks);
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("can set multiple new trunks without affecting routes via PATCH", async () => {
      const routes: SipTrunkRoute[] = [
        {
          name: "myFirstRoute",
          description: "myFirstRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [],
        },
        {
          name: "mySecondRoute",
          description: "mySecondRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [],
        },
      ];
      await client.setRoutes(routes);

      const trunks: SipTrunk[] = [
        {
          fqdn: useAad ? "237.fqdn.com" : "238.fqdn.com",
          sipSignalingPort: 5678,
        },
        {
          fqdn: useAad ? "239.fqdn.com" : "241.fqdn.com",
          sipSignalingPort: 5678,
        },
      ];
      await client.setTrunks(trunks);

      assert.deepEqual(await client.getTrunks(), trunks);
      assert.deepEqual(await client.getRoutes(), routes);
    });
  });
});
