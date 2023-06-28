// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { AlphaIdsClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`AlphaIdsClient - Preregistered Alpha Ids Operations`, function () {
  let recorder: Recorder;
  let client: AlphaIdsClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all pre-registered alpha ids", async function () {
    let totalItems = 0;
    for await (const alphaId of client.getAlphaIds()) {
      totalItems++;
      assert.isNotNull(alphaId.value);
    }

    // now test using pagination
    const itemsPerPage = totalItems > 1 ? Math.floor(totalItems / 2) : 1;
    const pages = client.getAlphaIds({ top: itemsPerPage }).byPage();
    for await (const page of pages) {
      // loop over each item in the page
      for (const alphaId of page) {
        assert.isNotNull(alphaId.value);
      }
    }
  }).timeout(40000);

  it("can list all pre-registered alpha ids countries", async function () {
    const countries = (await client.getPreRegisteredAlphaIdCountries()).countries;
    countries?.forEach((countryCode) => {
      assert.isNotNull(countryCode);
    });
  }).timeout(20000);
});
