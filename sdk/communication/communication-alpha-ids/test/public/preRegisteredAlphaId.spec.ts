// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import type { AlphaIdsClient } from "@azure-tools/communication-alpha-ids";
import { createRecordedClient } from "./utils/recordedClient.js";
import type { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`AlphaIdsClient - Preregistered Alpha Ids Operations`, () => {
  let recorder: Recorder;
  let client: AlphaIdsClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can list all pre-registered alpha ids", { timeout: 40000 }, async () => {
    let configurationResponse: FullOperationResponse | undefined;
    const getConfigurationRequest: OperationOptions = {
      onResponse: (response) => {
        configurationResponse = response;
      },
    };
    let totalItems = 0;
    try {
      for await (const alphaId of client.getAlphaIds(getConfigurationRequest)) {
        totalItems++;
        assert.isNotNull(alphaId.value);
      }
    } catch (error) {
      assert.fail(
        `There was an error calling getAlphaIds. MS-CV: ${configurationResponse?.headers.get(
          "MS-CV",
        )}, ${JSON.stringify(error)}`,
      );
    }

    // now test using pagination
    const itemsPerPage = totalItems > 1 ? Math.floor(totalItems / 2) : 1;
    try {
      const pages = client
        .getAlphaIds({
          top: itemsPerPage,
          onResponse: (response) => {
            configurationResponse = response;
          },
        })
        .byPage();
      for await (const page of pages) {
        // loop over each item in the page
        for (const alphaId of page) {
          assert.isNotNull(alphaId.value);
        }
      }
    } catch (error) {
      assert.fail(
        `There was an error calling getAlphaIds by page. MS-CV: ${configurationResponse?.headers.get(
          "MS-CV",
        )}, ${JSON.stringify(error)}`,
      );
    }
  });

  it("can list all pre-registered alpha ids countries", { timeout: 20000 }, async () => {
    let configurationResponse: FullOperationResponse | undefined;
    const getConfigurationRequest: OperationOptions = {
      onResponse: (response) => {
        configurationResponse = response;
      },
    };
    try {
      const countries = (await client.getPreRegisteredAlphaIdCountries(getConfigurationRequest))
        .countries;
      countries?.forEach((countryCode) => {
        assert.isNotNull(countryCode);
      });
    } catch (error) {
      assert.fail(
        `There was an error calling getPreRegisteredAlphaIdCountries by page. MS-CV: ${configurationResponse?.headers.get(
          "MS-CV",
        )}, ${JSON.stringify(error)}`,
      );
    }
  });
});
