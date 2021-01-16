// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { AzureKeyCredential } from "@azure/core-auth";
import { MixedRealityStsClient } from "../src";
import { createTokenCredentialFromMRKeyCredential } from "./utils/tokenCredentialHelper";

describe("MixedRealityStsClient", () => {
  const accountDomain = "mixedreality.azure.com";
  const accountId = "00000000-0000-0000-0000-000000000000";
  const accountKey = "00000000-0000-0000-0000-000000000000";
  const endpointUrl = "https://sts.mixedreality.azure.com";
  const keyCredential = new AzureKeyCredential(accountKey);

  it("can create with invalid arguments", () => {
    assert.throws(
      () => new MixedRealityStsClient(undefined!, endpointUrl, keyCredential),
      "Argument cannot be null or empty: 'accountId'."
    );
    assert.throws(
      () => new MixedRealityStsClient(null!, endpointUrl, keyCredential),
      "Argument cannot be null or empty: 'accountId'."
    );
    assert.throws(
      () => new MixedRealityStsClient("", endpointUrl, keyCredential),
      "Argument cannot be null or empty: 'accountId'."
    );

    assert.throws(
      () => new MixedRealityStsClient(accountId, undefined!, keyCredential),
      "Argument cannot be null or empty: 'domainOrEndpointUrl'."
    );
    assert.throws(
      () => new MixedRealityStsClient(accountId, null!, keyCredential),
      "Argument cannot be null or empty: 'domainOrEndpointUrl'."
    );
    assert.throws(
      () => new MixedRealityStsClient(accountId, "", keyCredential),
      "Argument cannot be null or empty: 'domainOrEndpointUrl'."
    );
  });

  it("can create with endpointUrl", () => {
    const client = new MixedRealityStsClient(accountId, endpointUrl, keyCredential);

    assert.isNotNull(client);
    assert.equal(client.accountId, accountId);
    assert.equal(client.endpointUrl, endpointUrl);
  });

  it("can create with domain", () => {
    const expectedEndpointUrl = endpointUrl;

    const client = new MixedRealityStsClient(accountId, accountDomain, keyCredential);

    assert.isNotNull(client);
    assert.equal(client.accountId, accountId);
    assert.equal(client.endpointUrl, expectedEndpointUrl);
  });

  it("can create with token credential", () => {
    const tokenCredential = createTokenCredentialFromMRKeyCredential(accountId, keyCredential);

    const client = new MixedRealityStsClient(accountId, endpointUrl, tokenCredential);

    assert.isNotNull(client);
    assert.equal(client.accountId, accountId);
    assert.equal(client.endpointUrl, endpointUrl);
  });
});
