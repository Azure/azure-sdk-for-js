// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getDomain,
  getDomainStatus,
  getEmptyDomain,
  getInvalidDomain,
} from "./utils/testDomainValidationData";
import { assert } from "chai";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { DomainVerificationClient } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";

describe("Domain Verification - Verify Domain Ownership", () => {
  let recorder: Recorder;
  let client: DomainVerificationClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function () {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("Can verify domain ownership", async function () {
    const domain = getDomain();
    const result = await client.verifyDomainOwnership(domain);
    assert.isNotEmpty(result.status);
    assert.equal(result.status, getDomainStatus());
  }).timeout(15000);

  it("Error if domain is empty on verify domain ownership", async function () {
    try {
      const domain = getEmptyDomain();
      await client.verifyDomainOwnership(domain);
    } catch (error: any) {
      assert.equal(error.statusCode, 400);
      assert.strictEqual(error.message, '"Domain is not provided"');
    }
  }).timeout(15000);

  it("Error if domain has invalid format on verify domain ownership", async function () {
    try {
      const domain = getInvalidDomain();
      await client.verifyDomainOwnership(domain);
    } catch (error: any) {
      assert.equal(error.statusCode, 422);
      assert.strictEqual(error.code, "UnprocessableConfiguration");
      assert.strictEqual(error.message, "One or more request inputs are not valid.");
    }
  }).timeout(15000);
});
