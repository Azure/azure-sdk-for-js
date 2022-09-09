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
      const trunk: SipTrunk = { fqdn: "111.fqdn.com", sipSignalingPort: 1231 };

      const setTrunk = await client.setTrunk(trunk);
      assert.deepEqual(setTrunk, trunk);

      const getTrunk = await client.getTrunk("111.fqdn.com");
      assert.deepEqual(getTrunk, trunk);
    });

    it("can set an existing trunk", async () => {
      const trunk: SipTrunk = { fqdn: "111.fqdn.com", sipSignalingPort: 1231 };
      await client.setTrunk(trunk);

      trunk.sipSignalingPort = 6789;

      const setTrunk = await client.setTrunk(trunk);
      assert.deepEqual(setTrunk, trunk);

      const getTrunk = await client.getTrunk("111.fqdn.com");
      assert.deepEqual(getTrunk, trunk);
    });

    it("can set multiple new trunks when empty before", async () => {
      await client.setTrunks([]);

      const trunks: SipTrunk[] = [
        { fqdn: "111.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: "222.fqdn.com", sipSignalingPort: 7348 },
      ];

      const setTrunks = await client.setTrunks(trunks);
      assert.deepEqual(setTrunks, trunks);

      const storedTrunks = await client.getTrunks();
      assert.deepEqual(storedTrunks, trunks);
    });

    it("can set multiple existing trunks", async () => {
      const trunks: SipTrunk[] = [
        { fqdn: "111.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: "222.fqdn.com", sipSignalingPort: 7348 },
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
        { fqdn: "111.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: "222.fqdn.com", sipSignalingPort: 7348 },
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

      const invalidTrunk: SipTrunk = { fqdn: "111.fqdn.com", sipSignalingPort: 0 };

      try {
        await client.setTrunk(invalidTrunk);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");

        try {
          await client.getTrunk("111.fqdn.com");
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
        { fqdn: "111.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: "222.fqdn.com", sipSignalingPort: 7348 },
      ];
      await client.setTrunks(expectedTrunks);

      const expectedRoutes = [
        {
          name: "myFirstRoute",
          description: "myFirstRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: ["111.fqdn.com", "222.fqdn.com"],
        },
        {
          name: "mySecondRoute",
          description: "mySecondRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: ["111.fqdn.com"],
        },
      ];
      await client.setRoutes(expectedRoutes);

      try {
        await client.setTrunks([{ fqdn: "111.fqdn.com", sipSignalingPort: 1234 }]);
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
          fqdn: "777.fqdn.com",
          sipSignalingPort: 5678,
        },
        {
          fqdn: "888.fqdn.com",
          sipSignalingPort: 5678,
        },
      ];
      await client.setTrunks(trunks);

      assert.deepEqual(await client.getTrunks(), trunks);
      assert.deepEqual(await client.getRoutes(), routes);
    });
  });
});
