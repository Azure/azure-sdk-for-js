// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { SipTrunk, SipTrunkRoute } from "../../../src/models";
import { clearSipConfiguration, createRecordedClient, createRecordedClientWithToken, getFqdn } from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - set trunks${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;

    const firstFqdn = getFqdn("first");
    const secondFqdn = getFqdn("second");

    before(async function (this: Context) {
      !isPlaybackMode() && clearSipConfiguration();
    })

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

    it("can set a new trunk", async function (this: Context) {
      if (isPlaybackMode()) {
        this.skip();
      }
      const trunk: SipTrunk = { fqdn: firstFqdn, sipSignalingPort: 1231 };

      const setTrunk = await client.setTrunk(trunk);
      assert.deepEqual(setTrunk, trunk);

      const getTrunk = await client.getTrunk(firstFqdn);
      assert.deepEqual(getTrunk, trunk);
    });

    it("can set an existing trunk", async function (this: Context) {
      if (isPlaybackMode()) {
        this.skip();
      }
      const trunk: SipTrunk = { fqdn: firstFqdn, sipSignalingPort: 1231 };
      await client.setTrunk(trunk);

      trunk.sipSignalingPort = 6789;

      const setTrunk = await client.setTrunk(trunk);
      assert.deepEqual(setTrunk, trunk);

      const getTrunk = await client.getTrunk(firstFqdn);
      assert.deepEqual(getTrunk, trunk);
    });

    it("can set multiple new trunks when empty before", async () => {
      await client.setTrunks([]);

      const trunks: SipTrunk[] = [
        { fqdn: firstFqdn, sipSignalingPort: 8239 },
        { fqdn: secondFqdn, sipSignalingPort: 7348 },
      ];

      const setTrunks = await client.setTrunks(trunks);
      const storedTrunks = await client.getTrunks();

      assert.isNotNull(setTrunks);
      assert.isNotNull(storedTrunks);
      if (!isPlaybackMode()) {
        assert.deepEqual(setTrunks, trunks);
        assert.deepEqual(storedTrunks, trunks);
      }
    });

    it("can set multiple existing trunks", async () => {
      const trunks: SipTrunk[] = [
        { fqdn: firstFqdn, sipSignalingPort: 8239 },
        { fqdn: secondFqdn, sipSignalingPort: 7348 },
      ];
      await client.setTrunks(trunks);

      trunks[0].sipSignalingPort = 6789;
      trunks[1].sipSignalingPort = 9876;

      const setTrunks = await client.setTrunks(trunks);
      const storedTrunks = await client.getTrunks();

      assert.isNotNull(setTrunks);
      assert.isNotNull(storedTrunks);
      if (!isPlaybackMode()) {
        assert.deepEqual(setTrunks, trunks);
        assert.deepEqual(storedTrunks, trunks);
      }
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
        { fqdn: firstFqdn, sipSignalingPort: 8239 },
        { fqdn: secondFqdn, sipSignalingPort: 7348 },
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

      const invalidTrunk: SipTrunk = { fqdn: firstFqdn, sipSignalingPort: 0 };

      try {
        await client.setTrunk(invalidTrunk);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");

        try {
          await client.getTrunk(firstFqdn);
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
        { fqdn: firstFqdn, sipSignalingPort: 8239 },
        { fqdn: secondFqdn, sipSignalingPort: 7348 },
      ];
      await client.setTrunks(expectedTrunks);

      const expectedRoutes = [
        {
          name: "myFirstRoute",
          description: "myFirstRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [firstFqdn, secondFqdn],
        },
        {
          name: "mySecondRoute",
          description: "mySecondRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [firstFqdn],
        },
      ];
      await client.setRoutes(expectedRoutes);

      try {
        await client.setTrunks([{ fqdn: firstFqdn, sipSignalingPort: 1234 }]);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedTrunks = await client.getTrunks();
        assert.isNotNull(storedTrunks);
        assert.isArray(storedTrunks);
        assert.equal(storedTrunks.length, expectedTrunks.length);
        if (!isPlaybackMode()) {
          assert.deepEqual(storedTrunks, expectedTrunks);
        }

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
          fqdn: getFqdn("random3"),
          sipSignalingPort: 5678,
        },
        {
          fqdn: getFqdn("random4"),
          sipSignalingPort: 5678,
        },
      ];
      await client.setTrunks(trunks);

      const getTrunks = await client.getTrunks();
      const getRoutes = await client.getRoutes();

      assert.isArray(getTrunks);
      assert.isArray(getRoutes);
      assert.equal(getTrunks.length, trunks.length);
      assert.equal(getRoutes.length, routes.length);
      if (!isPlaybackMode()) {
        assert.deepEqual(getTrunks, trunks);
        assert.deepEqual(getRoutes, routes);
      }
    });
  });
});
