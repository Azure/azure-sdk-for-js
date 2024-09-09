// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { AlphaIdsClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";

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
  }).timeout(40000);

  it("can list all pre-registered alpha ids countries", async function () {
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
  }).timeout(20000);
});
