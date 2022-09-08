// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder } from "@azure-tools/test-recorder";
import { SipTrunk, SipTrunkRoute } from "../../../src/models";
import { createRecordedClient } from "./utils/recordedClient";

describe("SipRoutingClient - set routes", function () {
  let client: SipRoutingClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
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

    const listRoutes = await client.listRoutes();
    assert.deepEqual(listRoutes, routes);
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

    const listRoutes = await client.listRoutes();
    assert.deepEqual(listRoutes, expectedRoutes);
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
    assert.deepEqual(await client.listRoutes(), [route]);
  });

  it("can set empty routes when empty before", async () => {
    await client.setRoutes([]);

    await client.setRoutes([]);

    const listRoutes = await client.listRoutes();
    assert.isNotNull(listRoutes);
    assert.isArray(listRoutes);
    assert.isEmpty(listRoutes);
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

    const listRoutes = await client.listRoutes();
    assert.isNotNull(listRoutes);
    assert.isArray(listRoutes);
    assert.isEmpty(listRoutes);
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
      const storedRoutes = await client.listRoutes();
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
      const storedRoutes = await client.listRoutes();
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
      const storedRoutes = await client.listRoutes();
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
      const storedRoutes = await client.listRoutes();
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
      const storedRoutes = await client.listRoutes();
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

    assert.deepEqual(await client.listTrunks(), trunks);
    assert.deepEqual(await client.listRoutes(), routes);
  });
});
