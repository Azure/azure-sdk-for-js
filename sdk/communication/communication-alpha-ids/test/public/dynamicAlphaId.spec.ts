// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AlphaIdsClient,
  DynamicAlphaIdConfiguration,
} from "@azure-tools/communication-alpha-ids";
import type { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient } from "./utils/recordedClient.js";
import type { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`AlphaIdsClient - manage configuration`, () => {
  let recorder: Recorder;
  let client: AlphaIdsClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
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

  it("can manage configuration", { timeout: 30000 }, async () => {
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
  });

  it("can list all dynamic alpha ids countries", { timeout: 20000 }, async () => {
    const countries = await _getDynamicCountries();
    countries?.forEach((countryCode) => {
      assert.isNotNull(countryCode);
    });
  });
});
