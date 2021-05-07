// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerClient, getLedgerIdentity } from "../../src";
import { Recorder } from "@azure/test-utils-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */
export const isNode =
  typeof process !== "undefined" && Boolean(process.version) && Boolean(process.versions?.node);

describe("List Document Formats", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    // Get cert to verify host
    const ledgerIdentity = await getLedgerIdentity("sdk-test-ledger-prod");
    client = createClient(
      "https://sdk-test-ledger-prod.eastus.cloudapp.azure.com",
      ledgerIdentity.ledgerTlsCertificate
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available document formats", async function () {
    if (!isNode) {
      // Service doesn't support CORS
      assert.ok("Skip browser");
      return;
    }

    const result = await client.path("/app/enclaveQuotes").get();

    if (result.status !== "200") {
      assert.fail(`GET "/app/enclaveQuotes" failed with ${result.status}`);
    }

    assert.equal(Object.keys(result.body.enclaveQuotes).length, 3);
  });
});
