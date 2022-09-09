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
  describe(`SipRoutingClient - set routes${useAad ? " [AAD]" : ""}`, function () {
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

    it("can set multiple new routes when empty before", async () => {
      await client.setRoutes([]);

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

      const setRoutes = await client.setRoutes(routes);
      assert.deepEqual(setRoutes, routes);

      const storedRoutes = await client.getRoutes();
      assert.deepEqual(storedRoutes, routes);
    });

    it("can set multiple new and existing routes", async () => {
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
      const expectedRoutes = [...routes];
      expectedRoutes[0].numberPattern = "^.*$";
      expectedRoutes[1].description = "ALTERED mySecondRoute's description";
      expectedRoutes.push({
        name: "myThirdRoute",
        description: "desc",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: [],
      });

      const setRoutes = await client.setRoutes(expectedRoutes);
      assert.deepEqual(setRoutes, expectedRoutes);

      const storedRoutes = await client.getRoutes();
      assert.deepEqual(storedRoutes, expectedRoutes);
    });

    it("can set a new route with trunk", async () => {
      const trunk: SipTrunk = {
        fqdn: "111.fqdn.com",
        sipSignalingPort: 5678,
      };
      await client.setTrunk(trunk);

      const route: SipTrunkRoute = {
        name: "myFirstRoute",
        description: "myFirstRoute's description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ["111.fqdn.com"],
      };
      assert.deepEqual(await client.setRoutes([route]), [route]);
      assert.deepEqual(await client.getRoutes(), [route]);
    });

    it("can set empty routes when empty before", async () => {
      await client.setRoutes([]);

      await client.setRoutes([]);

      const storedRoutes = await client.getRoutes();
      assert.isNotNull(storedRoutes);
      assert.isArray(storedRoutes);
      assert.isEmpty(storedRoutes);
    });

    it("can set empty routes when not empty before", async () => {
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

      await client.setRoutes([]);

      const storedRoutes = await client.getRoutes();
      assert.isNotNull(storedRoutes);
      assert.isArray(storedRoutes);
      assert.isEmpty(storedRoutes);
    });

    it("cannot set invalid name route", async () => {
      const invalidRoute: SipTrunkRoute = {
        name: "",
        description: "description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
      };

      try {
        await client.setRoutes([invalidRoute]);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedRoutes = await client.getRoutes();
        assert.isUndefined(storedRoutes.find((item) => item.name === ""));
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set invalid number pattern route", async () => {
      const invalidRoute: SipTrunkRoute = {
        name: "invalidNumberPatternRoute",
        numberPattern: "",
      };

      try {
        await client.setRoutes([invalidRoute]);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedRoutes = await client.getRoutes();
        assert.isUndefined(storedRoutes.find((item) => item.name === "invalidNumberPatternRoute"));
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set duplicated routes", async () => {
      const invalidRoutes: SipTrunkRoute[] = [
        {
          name: "sameNameRoute",
          numberPattern: "^+[1-9][0-9]{3,23}$",
        },
        {
          name: "sameNameRoute",
          numberPattern: "^+[1-9][0-9]{3,23}$",
        },
      ];

      try {
        await client.setRoutes(invalidRoutes);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedRoutes = await client.getRoutes();
        assert.isUndefined(storedRoutes.find((item) => item.name === "sameNameRoute"));
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set a route with duplicated routing trunks", async () => {
      const trunks: SipTrunk[] = [
        { fqdn: "111.fqdn.com", sipSignalingPort: 8239 },
        { fqdn: "222.fqdn.com", sipSignalingPort: 7348 },
      ];
      await client.setTrunks(trunks);

      const invalidRoute: SipTrunkRoute = {
        name: "invalidDuplicatedRoutingTrunksRoute",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ["111.fqdn.com", "111.fqdn.com"],
      };

      try {
        await client.setRoutes([invalidRoute]);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedRoutes = await client.getRoutes();
        assert.isUndefined(
          storedRoutes.find((item) => item.name === "invalidDuplicatedRoutingTrunksRoute")
        );
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set a route without referenced trunk", async () => {
      const invalidRoute: SipTrunkRoute = {
        name: "invalidRoutingTrunkRoute",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ["notExisting.fqdn.com"],
      };

      try {
        await client.setRoutes([invalidRoute]);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedRoutes = await client.getRoutes();
        assert.isUndefined(storedRoutes.find((item) => item.name === "invalidRoutingTrunkRoute"));
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("can set multiple new routes without affecting trunks via PATCH", async () => {
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

      assert.deepEqual(await client.getTrunks(), trunks);
      assert.deepEqual(await client.getRoutes(), routes);
    });
  });
});
