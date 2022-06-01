// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import ConfidentialLedger from "../../src";
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
    const credential = new DefaultAzureCredential();
    console.log(credential);
    var ledgerClient = ConfidentialLedger(env.ENDPOINT, env.LEDGER_IDENTITY, credential);
    console.log(ledgerClient);
    assert(ledgerClient);

    const result = await ledgerClient.path("/app/governance/constitution").get();

    console.log(result);

    if (result.status !== "200") {
      assert.fail(
        `GET "/app/governance/constitution" failed with ${result.status} for ledger authenticated with AAD.`
      );
    }
  });

  it("should authenticate using a certificate", async function () {
    var certificate = env.CERTIFICATE;
    var ledgerClient = ConfidentialLedger(env.ENDPOINT, certificate);
    assert(ledgerClient);

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
