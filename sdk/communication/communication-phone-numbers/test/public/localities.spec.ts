// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import {
  ListLocalitiesOptions,
  PhoneNumbersClient,
} from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - localities lists${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    beforeEach(function (this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedClientWithToken(this)!
        : createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can list available localities", async function () {
      const responseLocalities = [];
      for await (var locality of client.listAvailableLocalities("US")) {
        responseLocalities.push(locality);
      }
      assert.isNotEmpty(responseLocalities);
    }).timeout(60000);

    it("can list available localities with administrative division", async function () {
      const request: ListLocalitiesOptions = {
        administrativeDivision: "WA",
      };

      for await (var locality of client.listAvailableLocalities("US", request)) {
        assert.equal(locality.administrativeDivision?.abbreviatedName, "WA");
      }
    }).timeout(60000);
  });
});
