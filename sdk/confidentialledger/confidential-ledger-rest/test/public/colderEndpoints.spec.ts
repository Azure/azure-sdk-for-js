// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfidentialLedgerClient } from "@azure-rest/confidential-ledger";
import { isUnexpected } from "@azure-rest/confidential-ledger";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Colder endpoints", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should obtain constitution from ledger", async () => {
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

  it("should retrieve a list of consortium members", async () => {
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

  it("should retrieve a list of enclave quotes", async () => {
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
