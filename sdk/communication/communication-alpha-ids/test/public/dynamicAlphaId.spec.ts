// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AlphaIdsClient } from "../../src";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient } from "./utils/recordedClient";
import { assert } from "chai";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { DynamicAlphaIdConfiguration } from "../../src";

describe(`AlphaIdsClient - manage configuration`, function () {
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

  it("can manage configuration", async function () {
    let configuration: DynamicAlphaIdConfiguration;
    let configurationResponse: FullOperationResponse | undefined;
    const getConfigurationRequest: OperationOptions = {
      onResponse: (response) => {
        configurationResponse = response;
      },
    };

    configuration = await client.upsertDynamicAlphaIdConfiguration(true, getConfigurationRequest);
    assert.isOk(configuration);
    assert.isTrue(
      configuration.enabled,
      `The expected configuration: true is different than the received configuration: false
       CV: ${configurationResponse?.headers.get("MS-CV")}`
    );

    configuration = await client.getDynamicAlphaIdConfiguration(getConfigurationRequest);
    assert.isOk(configuration);

    configuration = await client.upsertDynamicAlphaIdConfiguration(false, getConfigurationRequest);
    assert.isOk(configuration);
    assert.isFalse(
      configuration.enabled,
      `The expected configuration: false is different than the received configuration: true 
       CV: ${configurationResponse?.headers.get("MS-CV")}`
    );
  }).timeout(15000);

  it("can list all dynamic alpha ids countries", async function () {
    const countries = (await client.getDynamicAlphaIdCountries()).countries;
    countries?.forEach((countryCode) => {
      assert.isNotNull(countryCode);
    });
  }).timeout(20000);
});
