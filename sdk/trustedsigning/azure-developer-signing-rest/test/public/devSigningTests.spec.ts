// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { DefaultAzureCredential } from "@azure/identity";
import { Context } from "mocha";

import { isUnexpected, SigningClient, paginate } from "../../src/index";
import createClient from "../../src/signingClient";

describe("Signing Project Operation Tests", () => {
  let recorder: Recorder;
  let client: SigningClient;
  let endpoint: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    endpoint = env["ENDPOINT"] || "";

    client = createClient(endpoint, new DefaultAzureCredential());
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Get certificate profiles extended key usage", async function () {
    const account = env["SIGNING_ACCOUNT_NAME"] || "";
    const profile = env["SIGNING_CERTIFICATE_PROFILE"] || "";
    const listEkus = await client.path("/codesigningaccounts/{accountName}/certificateprofiles/{certificateProfile}/sign/eku", account, profile).get();

    if (isUnexpected(listEkus)) {
      throw new listEkus.body.console.error();
    }

    assert.con(listEkus.body.value);
  });
});
