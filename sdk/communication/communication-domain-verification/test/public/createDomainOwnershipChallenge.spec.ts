// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getDomain,
  getEmptyDomain,
  getInvalidDomain,
  getVerificationValue,
} from "./utils/testDomainValidationData";
import { assert } from "chai";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { DomainVerificationClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`Domain Verification Client - Create Domain Ownership Challenge${
    useAad ? " [AAD]" : ""
  }`, () => {
    let recorder: Recorder;
    let client: DomainVerificationClient;

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
    });

    afterEach(async function () {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("Can create challenge", async function () {
      const result = await client.createDomainOwnershipChallenge(getDomain());
      assert.isNotEmpty(result.value);
      assert.equal(result.value, getVerificationValue());
    }).timeout(15000);

    it("Error if domain is empty on create challenge", async function () {
      try {
        await client.createDomainOwnershipChallenge(getEmptyDomain());
      } catch (error: any) {
        assert.strictEqual(error.code, "UnprocessableConfiguration");
        assert.strictEqual(error.message, "One or more request inputs are not valid.");
      }
    }).timeout(15000);

    it("Error if domain has invalid format create challenge", async function () {
      try {
        await client.createDomainOwnershipChallenge(getInvalidDomain());
      } catch (error: any) {
        assert.strictEqual(error.code, "UnprocessableConfiguration");
        assert.strictEqual(error.message, "One or more request inputs are not valid.");
      }
    });
  }).timeout(15000);
});

export function getErrorDescription(error: string): string {
  const innerError = JSON.parse(error);
  return innerError[0].errorDescription ? innerError[0].errorDescription : "";
}
