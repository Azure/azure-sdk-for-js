// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ListLocalitiesOptions, PhoneNumbersClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - localities lists${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)!
        : await createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can list available localities", async function () {
      const responseLocalities = [];
      for await (const locality of client.listAvailableLocalities("US")) {
        responseLocalities.push(locality);
      }
      assert.isNotEmpty(responseLocalities);
    }).timeout(60000);

    it("can list available localities with administrative division", async function () {
      const availableLocalities = await client.listAvailableLocalities("US");
      const firstLocality = await availableLocalities.next();
      const request: ListLocalitiesOptions = {
        administrativeDivision: firstLocality.value.administrativeDivision.abbreviatedName,
      };

      for await (const locality of client.listAvailableLocalities("US", request)) {
        assert.equal(
          locality.administrativeDivision?.abbreviatedName,
          firstLocality.value.administrativeDivision.abbreviatedName,
        );
      }
    }).timeout(60000);
  });
});
