// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { MetricsAdvisorKeyCredential } from "../../src";

describe("MetricsAdvisorKeyCredential", () => {
  let credential: MetricsAdvisorKeyCredential;

  beforeEach(function () {
    credential = new MetricsAdvisorKeyCredential("key1", "key2");
  });

  it("update subscriptionKey", async function () {
    const newValue = "Abc";
    credential.updateKey({ subscriptionKey: newValue });
    assert.equal(credential.subscriptionKey, newValue);
  });

  it("update apiKey", async function () {
    const newValue = "Abcdef";
    credential.updateKey({ apiKey: newValue });
    assert.equal(credential.apiKey, newValue);
  });
});
