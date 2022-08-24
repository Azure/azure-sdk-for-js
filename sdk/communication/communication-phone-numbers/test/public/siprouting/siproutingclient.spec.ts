// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {assert} from "chai";
import {Context} from "mocha";

import {SipRoutingClient} from "../../../src";

import {env, record, Recorder} from "@azure/test-utils-recorder";
import {SipTrunk, SipTrunkRoute} from "../../../src/models";

const replaceableVariables: Record<string, string> = {
  // This must at least look like connection string to pass the validation.
  CONNECTION_STRING: "endpoint=https://dummy-connection-string/;accesskey=YQ==",
  APPCONFIG_TEST_SETTING_KEY: "test-key",
  APPCONFIG_TEST_SETTING_EXPECTED_VALUE: "test-value",
  AZURE_TENANT_ID: "azure_tenant_id",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret"
};

function createSipRoutingClient(): SipRoutingClient {
  const connectionString = env.CONNECTION_STRING;
  return new SipRoutingClient(connectionString);
}

describe("[ACS] SipRoutingClient functional tests", function() {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let client: SipRoutingClient;
  let recorder: Recorder;

  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(async function(this: Context) {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = record(this, {
      // == Recorder Environment Setup == Add the replaceable variables from
      // above
      replaceableVariables,

      // We don't use this in the template, but if we had any query parameters
      // we wished to discard, we could add them here
      queryParametersToSkip: [],

      // Finally, we need to remove the AAD `access_token` from any requests.
      // This is very important, as it cannot be removed using environment
      // variable or query parameter replacement.  The
      // `customizationsOnRecordings` field allows us to make arbitrary
      // replacements within recordings.
      customizationsOnRecordings: [
        (recording: any): any =>
          recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
      ]
    });

    // We'll be able to refer to the instantiated `client` in tests, since we
    // initialize it before each test
    client = createSipRoutingClient();

    await client.setRoutes([]);
    await client.setTrunks([]);
  });

  // After each test, we need to stop the recording.
  afterEach(async function() {
    await recorder.stop();
  });

  it("can retrieve empty trunks", async () => {
    const trunks = await client.getTrunks();
    assert.isArray(trunks);
    assert.isEmpty(trunks);
  });

  it("can set a new trunk", async () => {
    const trunk: SipTrunk = {
      fqdn: 'test-sbc.foo.bar',
      sipSignalingPort: 5678
    };

    const setTrunk = await client.setTrunk(trunk);
    assert.deepEqual(setTrunk, trunk);

    const getTrunks = await client.getTrunks();
    assert.deepEqual(getTrunks, [trunk]);
  });

  it("can set an existing trunk", async () => {
    const trunk: SipTrunk = {
      fqdn: 'test-sbc.foo.bar',
      sipSignalingPort: 5678
    };
    await client.setTrunk(trunk);

    trunk.sipSignalingPort = 6789;

    const setTrunk = await client.setTrunk(trunk);
    assert.deepEqual(setTrunk, trunk);

    const getTrunks = await client.getTrunks();
    assert.deepEqual(getTrunks, [trunk]);
  });

  it("can set multiple new trunks", async () => {
    const trunks: SipTrunk[] = [{
      fqdn: 'test-one-sbc.foo.bar',
      sipSignalingPort: 5678
    },{
      fqdn: 'test-two-sbc.foo.bar',
      sipSignalingPort: 5678
    }];

    const setTrunks = await client.setTrunks(trunks);
    assert.deepEqual(setTrunks, trunks);

    const getTrunks = await client.getTrunks();
    assert.deepEqual(getTrunks, trunks);
  });

  it("can set multiple existing trunks", async () => {
    const trunks: SipTrunk[] = [{
      fqdn: 'test-one-sbc.foo.bar',
      sipSignalingPort: 5678
    },{
      fqdn: 'test-two-sbc.foo.bar',
      sipSignalingPort: 5678
    }];
    await client.setTrunks(trunks);

    trunks[0].sipSignalingPort = 6789;
    trunks[1].sipSignalingPort = 9876;

    const setTrunks = await client.setTrunks(trunks);
    assert.deepEqual(setTrunks, trunks);

    const getTrunks = await client.getTrunks();
    assert.deepEqual(getTrunks, trunks);
  });

  it("can delete an existing trunk", async () => {
    const trunk: SipTrunk = {
      fqdn: 'test-sbc.foo.bar',
      sipSignalingPort: 5678
    };
    const storedTrunk = await client.setTrunk(trunk);
    assert.deepEqual(storedTrunk, trunk);
    assert.exists((await client.getTrunks()).find(value => value.fqdn === trunk.fqdn));

    await client.deleteTrunk("test-sbc.foo.bar");

    assert.notExists((await client.getTrunks()).find(value => value.fqdn === trunk.fqdn));  
  });

  it("can retrieve empty routes", async () => {
    const routes = await client.getRoutes();
    assert.isArray(routes);
    assert.isEmpty(routes);
  });

  it("can set multiple new routes", async () => {
    const routes: SipTrunkRoute[] = [{
      name: "myFirstRoute",
      description: "myFirstRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    },{
      name: "mySecondRoute",
      description: "mySecondRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    }];

    const setRoutes = await client.setRoutes(routes);
    assert.deepEqual(setRoutes, routes);

    const getRoutes = await client.getRoutes();
    assert.deepEqual(getRoutes, routes);
  });

  it("can set multiple existing routes", async () => {
    const routes: SipTrunkRoute[] = [{
      name: "myFirstRoute",
      description: "myFirstRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    },{
      name: "mySecondRoute",
      description: "mySecondRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    }];
    await client.setRoutes(routes);

    routes[0].numberPattern = "^.*$";
    routes[1].description = "ALTERED mySecondRoute's description";

    const setRoutes = await client.setRoutes(routes);
    assert.deepEqual(setRoutes, routes);

    const getRoutes = await client.getRoutes();
    assert.deepEqual(getRoutes, routes);
  });

  it("can set a new route with trunk", async () => {
    const trunk: SipTrunk = {
      fqdn: 'test-sbc.foo.bar',
      sipSignalingPort: 5678
    };
    await client.setTrunk(trunk);

    const route: SipTrunkRoute = {
      name: "myFirstRoute",
      description: "myFirstRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: [
        "test-sbc.foo.bar"
      ]
    };
    assert.deepEqual(await client.setRoutes([route]), [route]);
    assert.deepEqual(await client.getRoutes(), [route]);
  });

  it("can set multiple new trunks without affecting routes via PATCH", async () => {
    const routes: SipTrunkRoute[] = [{
      name: "myFirstRoute",
      description: "myFirstRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    },{
      name: "mySecondRoute",
      description: "mySecondRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    }];
    await client.setRoutes(routes);

    const trunks: SipTrunk[] = [{
      fqdn: 'test-one-sbc.foo.bar',
      sipSignalingPort: 5678
    },{
      fqdn: 'test-two-sbc.foo.bar',
      sipSignalingPort: 5678
    }];
    await client.setTrunks(trunks);

    assert.deepEqual(await client.getTrunks(), trunks);
    assert.deepEqual(await client.getRoutes(), routes);
  });

  it("can set multiple new routes without affecting trunks via PATCH", async () => {
    const trunks: SipTrunk[] = [{
      fqdn: 'test-one-sbc.foo.bar',
      sipSignalingPort: 5678
    },{
      fqdn: 'test-two-sbc.foo.bar',
      sipSignalingPort: 5678
    }];
    await client.setTrunks(trunks);

    const routes: SipTrunkRoute[] = [{
      name: "myFirstRoute",
      description: "myFirstRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    },{
      name: "mySecondRoute",
      description: "mySecondRoute's description",
      numberPattern: "^\+[1-9][0-9]{3,23}$",
      trunks: []
    }];
    await client.setRoutes(routes);

    assert.deepEqual(await client.getTrunks(), trunks);
    assert.deepEqual(await client.getRoutes(), routes);
  });
});
