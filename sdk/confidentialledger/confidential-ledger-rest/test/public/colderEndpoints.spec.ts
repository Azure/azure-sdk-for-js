// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ConfidentialLedgerClient, isUnexpected } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

describe("Colder endpoints", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain constitution from ledger", async function () {
    const result = await client.path("/app/governance/constitution").get();

    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      // If this condition is true, TypeScript is able to infer that the type of result is
      // GetConstitutiondefaultResponse because we got an "unexpected" response. If you hover over
      // result, the right type is displayed and intellisense gives you the right options.
      assert.fail(result.status, "200", `Unexpected response status ${result.status}`);
    }

    // Outside of the if statement, TypeScript infers that the response status was "200" and gives result a type of GetConstitution200Response
    // without the need to cast
    assert.typeOf(result.body.digest, "string");
    assert.typeOf(result.body.script, "string");
  });

  it("should retrieve a list of consortium members", async function () {
    const result = await client.path("/app/governance/members").get();

    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    for (const member of result.body.members) {
      assert.typeOf(member.certificate, "string");
      assert.typeOf(member.id, "string");
    }
  });

  it("should retrieve a list of enclave quotes", async function () {
    const result = await client.path("/app/enclaveQuotes").get();

    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.typeOf(result.body.currentNodeId, "string");

    const enclaveQuotes = result.body.enclaveQuotes;
    for (const quote of Object.values(enclaveQuotes)) {
      assert.typeOf(quote.quoteVersion, "string");
      assert.typeOf(quote.nodeId, "string");
      assert.typeOf(quote.raw, "string");
    }
  });
});
