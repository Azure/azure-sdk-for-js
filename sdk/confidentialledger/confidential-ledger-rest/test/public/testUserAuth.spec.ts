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
    assert.isDefined(ledgerClient);

    const result = await ledgerClient.path("/app/governance/constitution").get();

    console.log(result);

    if (result.status !== "200") {
      assert.fail(
        `GET "/app/governance/constitution" failed with ${result.status} for ledger authenticated with AAD.`
      );
    }
  });

  it("should authenticate using a certificate", async function () {

    const {ledgerTlsCertificate} = await getLedgerIdentity(env.LEDGER_IDENTITY, env.IDENTITY_SERVICE_URL);
    // const cert = env.PUBLIC_KEY;
    // const key = env.PRIVATE_KEY;
    const ledgerClient = ConfidentialLedger(env.ENDPOINT, ledgerTlsCertificate, {
        tlsOptions: {
        cert,
        key,
      },
    });
    assert.isDefined(ledgerClient);
    const result = await ledgerClient.path("/app/governance/constitution").get();

    if (result.status !== "200") {
      assert.fail(
        `GET "/app/governance/constitution" failed with ${result.status} for ledger authenticated with a certificate.`
      );
    }
  });
});

// pipeline creates a ledger with an AAD user attached
// the AAD user is already there
// the AAD user adds the cert-based user as an admin

// TODO:
// create a ledger through the portal
// add an AAD user and cert-based user in a script
// then the test looks for both of these
