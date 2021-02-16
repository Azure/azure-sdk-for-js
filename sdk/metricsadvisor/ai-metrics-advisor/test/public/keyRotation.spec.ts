// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { MetricsAdvisorKeyCredential } from "../../src";
import { testEnv } from "./util/recordedClients";

describe("MetricsAdvisorKeyCredential", () => {
  let credential: MetricsAdvisorKeyCredential;

  beforeEach(function() {
    credential = new MetricsAdvisorKeyCredential(
      testEnv.METRICS_ADVISOR_SUBSCRIPTION_KEY,
      testEnv.METRICS_ADVISOR_API_KEY
    );
  });

  it("update subscriptionKey", async function() {
    const newSubscriptionKey = "Abc";
    credential.updateSubscriptionKey(newSubscriptionKey);
    assert.equal(credential.subscriptionKey, newSubscriptionKey);
  });

  it("update apiKey", async function() {
    const newApiKey = "Abcdef";
    credential.updateApiKey(newApiKey);
    assert.equal(credential.apiKey, newApiKey);
  });
});
