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

  const _upsertConfiguration = async (config: boolean): Promise<DynamicAlphaIdConfiguration> => {
    let configurationResponse: FullOperationResponse | undefined;
    const getConfigurationRequest: OperationOptions = {
      onResponse: (response) => {
        configurationResponse = response;
      },
    };
    try {
      const newConfig = await client.upsertDynamicAlphaIdConfiguration(
        config,
        getConfigurationRequest,
      );
      return newConfig;
    } catch (error) {
      assert.fail(
        `There was an error calling upsertDynamicAlphaIdConfiguration. MS-CV: ${configurationResponse?.headers.get(
          "MS-CV",
        )}, ${JSON.stringify(error)} `,
      );
    }
  };

  const _getConfiguration = async (): Promise<DynamicAlphaIdConfiguration> => {
    let configurationResponse: FullOperationResponse | undefined;
    const getConfigurationRequest: OperationOptions = {
      onResponse: (response) => {
        configurationResponse = response;
      },
    };
    try {
      const newConfig = await client.getDynamicAlphaIdConfiguration(getConfigurationRequest);
      return newConfig;
    } catch (error) {
      assert.fail(
        `There was an error calling getDynamicAlphaIdConfiguration. MS-CV: ${configurationResponse?.headers.get(
          "MS-CV",
        )}, ${JSON.stringify(error)}`,
      );
    }
  };

  const _getDynamicCountries = async (): Promise<string[] | undefined> => {
    let configurationResponse: FullOperationResponse | undefined;
    const getConfigurationRequest: OperationOptions = {
      onResponse: (response) => {
        configurationResponse = response;
      },
    };
    try {
      const countries = (await client.getDynamicAlphaIdCountries(getConfigurationRequest))
        .countries;
      return countries;
    } catch (error) {
      assert.fail(
        `There was an error calling getDynamicAlphaIdCountries. MS-CV: ${configurationResponse?.headers.get(
          "MS-CV",
        )}, ${JSON.stringify(error)}`,
      );
    }
  };

  it("can manage configuration", async function () {
    let configuration: DynamicAlphaIdConfiguration;
    let configurationResponse: FullOperationResponse | undefined;

    configuration = await _upsertConfiguration(true);

    assert.isOk(configuration);
    assert.isTrue(
      configuration.enabled,
      `The expected configuration: true is different than the received configuration: false
       CV: ${configurationResponse?.headers.get("MS-CV")}`,
    );

    configuration = await _getConfiguration();
    assert.isOk(configuration);

    configuration = await _upsertConfiguration(false);
    assert.isOk(configuration);
    assert.isFalse(
      configuration.enabled,
      `The expected configuration: false is different than the received configuration: true 
       CV: ${configurationResponse?.headers.get("MS-CV")}`,
    );
  }).timeout(30000);

  it("can list all dynamic alpha ids countries", async function () {
    const countries = await _getDynamicCountries();
    countries?.forEach((countryCode) => {
      assert.isNotNull(countryCode);
    });
  }).timeout(20000);
});
