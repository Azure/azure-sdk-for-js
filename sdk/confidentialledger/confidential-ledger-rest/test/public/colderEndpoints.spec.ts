// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerRestClient,
  GetConsortiumMembers200Response,
  GetConstitution200Response,
  GetEnclaveQuotes200Response,
} from "../../src";
import { EnclaveQuote, EnclaveQuotesDictionary } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("Colder endpoints", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerRestClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain constitution from ledger", async function () {
    const result = await client.path("/app/governance/constitution").get();

    assert.equal(result.status, "200");

    const constResponse = result as GetConstitution200Response;

    assert.typeOf(constResponse.body.digest, "string");
    assert.typeOf(constResponse.body.script, "string");
  });

  it("should retrieve a list of consortium members", async function () {
    const result = await client.path("/app/governance/members").get();

    assert.equal(result.status, "200");

    const memberResponse = result as GetConsortiumMembers200Response;

    memberResponse.body.members.forEach((member) => {
      assert.typeOf(member.certificate, "string");
      assert.typeOf(member.id, "string");
    });
  });

  it("should retrieve a list of cenclve quotes", async function () {
    const result = await client.path("/app/enclaveQuotes").get();

    assert.equal(result.status, "200");

    const memberResponse = result as GetEnclaveQuotes200Response;

    assert.typeOf(memberResponse.body.currentNodeId, "string");

    const enclaveQuotes: EnclaveQuotesDictionary = memberResponse.body.enclaveQuotes;
    for (const key in enclaveQuotes) {
      const quote: EnclaveQuote = enclaveQuotes[key];
      assert.typeOf(quote.quoteVersion, "string");
      assert.typeOf(quote.nodeId, "string");
      assert.typeOf(quote.raw, "string");
    }
  });
});
