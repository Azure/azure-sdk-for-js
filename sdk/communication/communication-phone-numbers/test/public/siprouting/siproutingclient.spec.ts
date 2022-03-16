// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { env, record, Recorder } from "@azure-tools/test-recorder";
import { SipTrunk, SipTrunkRoute } from "../../../src/models";

const replaceableVariables: Record<string, string> = {
  // This must at least look like connection string to pass the validation.
  CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=YQ==",
  APPCONFIG_TEST_SETTING_KEY: "test-key",
  APPCONFIG_TEST_SETTING_EXPECTED_VALUE: "test-value",
  AZURE_TENANT_ID: "azure_tenant_id",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

function createSipRoutingClient(): SipRoutingClient {
  const connectionString = env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING || replaceableVariables.CONNECTION_STRING;
  return new SipRoutingClient(connectionString);
}

describe("[ACS] SipRoutingClient functional tests", function () {
  let client: SipRoutingClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, {
      replaceableVariables,
      queryParametersToSkip: [],
      customizationsOnRecordings: [
        (recording: any): any =>
          recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      ],
    });

    client = createSipRoutingClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  xit("cannot retrieve a not existing trunk and fail with 404", async () => {
    // todo exception
    assert.isNull(await client.getTrunk("not.existing.fqdn"));
  });

  xit("can retrieve an existing trunk", async () => {
    await client.setTrunk({fqdn: '44.fqdn.com', sipSignalingPort: 4567} as SipTrunk);

    const trunk = await client.getTrunk("44.fqdn.com");

    assert.isNotNull(trunk);
    assert.equal(trunk?.sipSignalingPort, 4567);
  });

  xit("can retrieve trunks", async () => {
    assert.isArray(await client.getTrunks());
  });

  xit("can retrieve empty trunks", async () => {
    await client.setTrunks([]);

    const trunks = await client.getTrunks();
    
    assert.isNotNull(trunks);
    assert.isArray(trunks);
    assert.isEmpty(trunks);
  });

  xit("can retrieve not empty trunks", async () => {
    const expectedTrunks = [
      {fqdn: '11.fqdn.com', sipSignalingPort: 1239},
      {fqdn: '22.fqdn.com', sipSignalingPort: 2348},
      {fqdn: '33.fqdn.com', sipSignalingPort: 3457},
    ];
    await client.setTrunks(expectedTrunks);

    const trunks = await client.getTrunks();
    
    assert.isNotNull(trunks);
    assert.isArray(trunks);
    assert.deepEqual(trunks, expectedTrunks);
  });

  xit("can retrieve routes", async () => {
    assert.isArray(await client.getRoutes());
  });

  xit("can retrieve empty routes", async () => {
    await client.setRoutes([]);

    const routes = await client.getRoutes();
    
    assert.isNotNull(routes);
    assert.isArray(routes);
    assert.isEmpty(routes);
  });

  xit("can retrieve not empty routes", async () => {
    const expectedRoutes = [
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
    await client.setRoutes(expectedRoutes);

    const routes = await client.getRoutes();

    assert.isNotNull(routes);
    assert.isArray(routes);
    assert.deepEqual(routes, expectedRoutes);
  });

  xit("can set a new trunk", async () => {
    const trunk: SipTrunk = {fqdn: '111.fqdn.com', sipSignalingPort: 1231};

    const setTrunk = await client.setTrunk(trunk);
    assert.deepEqual(setTrunk, trunk);

    const getTrunk = await client.getTrunk('111.fqdn.com');
    assert.deepEqual(getTrunk, trunk);
  });

  xit("can set an existing trunk", async () => {
    const trunk: SipTrunk = {fqdn: '111.fqdn.com', sipSignalingPort: 1231};
    await client.setTrunk(trunk);

    trunk.sipSignalingPort = 6789;

    const setTrunk = await client.setTrunk(trunk);
    assert.deepEqual(setTrunk, trunk);

    const getTrunk = await client.getTrunk('111.fqdn.com');
    assert.deepEqual(getTrunk, trunk);
  });

  xit("can set multiple new trunks when empty before", async () => {
    await client.setTrunks([]);

    const trunks: SipTrunk[] = [
      {fqdn: '111.fqdn.com', sipSignalingPort: 8239},
      {fqdn: '222.fqdn.com', sipSignalingPort: 7348},
    ];

    const setTrunks = await client.setTrunks(trunks);
    assert.deepEqual(setTrunks, trunks);

    const getTrunks = await client.getTrunks();
    assert.deepEqual(getTrunks, trunks);
  });

  xit("can set multiple existing trunks", async () => {
    const trunks: SipTrunk[] = [
      {fqdn: '111.fqdn.com', sipSignalingPort: 8239},
      {fqdn: '222.fqdn.com', sipSignalingPort: 7348},
    ];
    await client.setTrunks(trunks);

    trunks[0].sipSignalingPort = 6789;
    trunks[1].sipSignalingPort = 9876;

    const setTrunks = await client.setTrunks(trunks);
    assert.deepEqual(setTrunks, trunks);

    const getTrunks = await client.getTrunks();
    assert.deepEqual(getTrunks, trunks);
  });

  xit("can set empty trunks when empty before", async () => {
    await client.setTrunks([]);
    
    await client.setTrunks([]);

    const getTrunks = await client.getTrunks();
    assert.isNotNull(getTrunks);
    assert.isArray(getTrunks);
    assert.isEmpty(getTrunks);
  });

  xit("can set empty trunks when not empty before", async () => {
    const trunks: SipTrunk[] = [
      {fqdn: '111.fqdn.com', sipSignalingPort: 8239},
      {fqdn: '222.fqdn.com', sipSignalingPort: 7348},
    ];
    await client.setTrunks(trunks);

    await client.setTrunks([]);
    
    const getTrunks = await client.getTrunks();
    assert.isNotNull(getTrunks);
    assert.isArray(getTrunks);
    assert.isEmpty(getTrunks);
  });

  xit("cannot set invalid fqdn trunk", async () => {
    const invalidTrunk: SipTrunk = {fqdn: '-1', sipSignalingPort: 8239};
    await client.setTrunk(invalidTrunk);
    console.log(JSON.stringify(await client.setTrunks([invalidTrunk])));
    
    assert.isNull(await client.getTrunk("-1"));
  });

  xit("cannot set invalid port trunk", async () => {
    await client.setTrunks([]);

    const invalidTrunk: SipTrunk = {fqdn: '111.fqdn.com', sipSignalingPort: 0};
    assert.Throw(async () => await client.setTrunk(invalidTrunk), "One or more request inputs are not valid.");

    // console.log("setInvalidTrunkResponse: " + JSON.stringify(await client.setTrunk(invalidTrunk)));
    // assert.isNull(await client.setTrunk(invalidTrunk));
    // await client.setTrunks([invalidTrunk]);
    
    assert.isNull(await client.getTrunk("111.fqdn.com"));
  });

  xit("cannot set trunks without trunk used in route", async () => {
    const expectedTrunks: SipTrunk[] = [
      {fqdn: '111.fqdn.com', sipSignalingPort: 8239},
      {fqdn: '222.fqdn.com', sipSignalingPort: 7348},
    ];
    await client.setTrunks(expectedTrunks);

    const expectedRoutes = [
      {
        name: "myFirstRoute",
        description: "myFirstRoute's description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ['111.fqdn.com', '222.fqdn.com'],
      },
      {
        name: "mySecondRoute",
        description: "mySecondRoute's description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ['111.fqdn.com'],
      },
    ];
    await client.setRoutes(expectedRoutes);

    await client.setTrunks([
      {fqdn: '111.fqdn.com', sipSignalingPort: 8239},
    ]);

    const getTrunks = await client.getTrunks();
    assert.isNotNull(getTrunks);
    assert.isArray(getTrunks);
    assert.deepEqual(getTrunks, expectedTrunks);
  });

  xit("can set multiple new routes when empty before", async () => {
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

    const getRoutes = await client.getRoutes();
    assert.deepEqual(getRoutes, routes);
  });

  xit("can set multiple new and existing routes", async () => {
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
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: [],
    });

    const setRoutes = await client.setRoutes(expectedRoutes);
    assert.deepEqual(setRoutes, expectedRoutes);

    const getRoutes = await client.getRoutes();
    assert.deepEqual(getRoutes, expectedRoutes);
  });

  xit("can set a new route with trunk", async () => {
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

  xit("can set empty routes when empty before", async () => {
    await client.setRoutes([]);

    await client.setRoutes([]);

    const getRoutes = await client.getRoutes();
    assert.isNotNull(getRoutes);
    assert.isArray(getRoutes);
    assert.isEmpty(getRoutes);
  });

  xit("can set empty routes when not empty before", async () => {
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

    const getRoutes = await client.getRoutes();
    assert.isNotNull(getRoutes);
    assert.isArray(getRoutes);
    assert.isEmpty(getRoutes);
  });

  it("cannot set invalid name route", async () => {
    const invalidRoute: SipTrunkRoute = {
        name: "",
        description: "description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
    };
    assert.throws(async () => {
      await client.setRoutes([invalidRoute]);
    });
    // await client.setRoutes([invalidRoute]);
    // const setRoutes = await client.setRoutes([invalidRoute]);
    // assert.deepEqual(setRoutes, expectedRoutes);

    assert.isUndefined((await client.getRoutes()).find(item => item.name === ""));
  });

  xit("cannot set invalid number pattern route", async () => {
    const invalidRoute: SipTrunkRoute = {
        name: "invalidNumberPatternRoute",
        numberPattern: "",
    };
    await client.setRoutes([invalidRoute]);
    // const setRoutes = await client.setRoutes([invalidRoute]);
    // assert.deepEqual(setRoutes, expectedRoutes);

    assert.isUndefined((await client.getRoutes()).find(item => item.name === "invalidNumberPatternRoute"));
  });

  xit("cannot set duplicated routes", async () => {
    
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
    await client.setRoutes(invalidRoutes);
    // const setRoutes = await client.setRoutes([invalidRoute]);
    // assert.deepEqual(setRoutes, expectedRoutes);

    assert.isUndefined((await client.getRoutes()).find(item => item.name === "sameNameRoute"));
  });

  xit("cannot set a route with duplicated routing trunks", async () => {
    const trunks: SipTrunk[] = [
      {fqdn: '111.fqdn.com', sipSignalingPort: 8239},
      {fqdn: '222.fqdn.com', sipSignalingPort: 7348},
    ];
    await client.setTrunks(trunks);

    const invalidRoute: SipTrunkRoute = {
        name: "invalidDuplicatedRoutingTrunksRoute",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ['111.fqdn.com', '111.fqdn.com'],
    };
    await client.setRoutes([invalidRoute]);
    // const setRoutes = await client.setRoutes([invalidRoute]);
    // assert.deepEqual(setRoutes, expectedRoutes);

    assert.isUndefined((await client.getRoutes()).find(item => item.name === "invalidDuplicatedRoutingTrunksRoute"));
  });

  xit("cannot set a route without referenced trunk", async () => {
    const invalidRoute: SipTrunkRoute = {
        name: "invalidRoutingTrunkRoute",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ['notExisting.fqdn.com'],
    };
    await client.setRoutes([invalidRoute]);
    // const setRoutes = await client.setRoutes([invalidRoute]);
    // assert.deepEqual(setRoutes, expectedRoutes);

    assert.isUndefined((await client.getRoutes()).find(item => item.name === "invalidRoutingTrunkRoute"));
  });

  xit("can delete an existing trunk", async () => {
    const trunk: SipTrunk = {
      fqdn: "111.fqdn.com",
      sipSignalingPort: 5678,
    };
    const storedTrunk = await client.setTrunk(trunk);
    assert.deepEqual(storedTrunk, trunk);
    assert.exists((await client.getTrunks()).find((value) => value.fqdn === trunk.fqdn));

    await client.deleteTrunk("111.fqdn.com");

    assert.notExists((await client.getTrunks()).find((value) => value.fqdn === trunk.fqdn));
  });

  xit("cannot delete a not existing trunk", async () => {
    await client.setTrunks([]);

    await client.deleteTrunk("111.fqdn.com");

    const getTrunks = await client.getTrunks();
    assert.isNotNull(getTrunks);
    assert.isArray(getTrunks);
    assert.isEmpty(getTrunks);
  });

  xit("can set multiple new trunks without affecting routes via PATCH", async () => {
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

  xit("can set multiple new routes without affecting trunks via PATCH", async () => {
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
