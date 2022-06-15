// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import ConfidentialLedger, { getLedgerIdentity } from "../../src";
import { env } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { DefaultAzureCredential } from "@azure/identity";

describe("Test user authentications", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should authenticate using AAD", async function () {
    /* in the future, let's change this to the following:
  const credential = new ClientSecretCredential(
    env["AZURE_TENANT_ID"],
    env["AZURE_CLIENT_ID"],
    env["AZURE_CLIENT_SECRET"],
    { httpClient }
  );
  */
    const {ledgerTlsCertificate} = await getLedgerIdentity(env.LEDGER_IDENTITY, env.IDENTITY_SERVICE_URL);
    const credential = new DefaultAzureCredential();
    // use let instead of var
    const ledgerClient = ConfidentialLedger(env.ENDPOINT, ledgerTlsCertificate, credential);
    assert(ledgerClient);

    const result = await ledgerClient.path("/app/governance/constitution").get();

    if (result.status !== "200") {
      assert.fail(
        `GET "/app/governance/constitution" failed with ${result.status} for ledger authenticated with AAD.`
      );
    }
  });

  it("should authenticate using a certificate", async function () {
    // need to pass another certificate in
    // other certificate is a string
    const ledgerClient = ConfidentialLedger(env.ENDPOINT, env.TLS_CERTIFICATE);
    // assert(ledgerClient);

    console.log("Ledger client:");
    console.log(ledgerClient);
    console.log(ledgerClient.path);
    console.log(ledgerClient.pathUnchecked);

    const result = await ledgerClient.path("/app/governance/constitution").get();

    console.log(result);

    if (result.status !== "200") {
      assert.fail(
        `GET "/app/governance/constitution" failed with ${result.status} for ledger authenticated with a certificate.`
      );
    }
  });
});
