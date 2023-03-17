// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import ConfidentialLedger, { getLedgerIdentity } from "../../src";
import { env } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { DefaultAzureCredential } from "@azure/identity";

describe("Test user authentications", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skip("should authenticate using AAD", async function () {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      env.LEDGER_IDENTITY,
      env.IDENTITY_SERVICE_URL
    );
    const credential = new DefaultAzureCredential();
    const ledgerClient = ConfidentialLedger(env.ENDPOINT, ledgerIdentityCertificate, credential);
    assert.isDefined(ledgerClient);

    const result = await ledgerClient.path("/app/governance/constitution").get();

    assert.equal(result.status, "200");
  });

  it("should authenticate using a certificate", async function () {
    const ledgerClient = await createClient();
    assert.isDefined(ledgerClient);
    const result = await ledgerClient.path("/app/governance/constitution").get();

    assert.equal(result.status, "200");
  });
});
