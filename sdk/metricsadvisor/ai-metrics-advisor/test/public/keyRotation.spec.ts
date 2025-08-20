// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MetricsAdvisorKeyCredential } from "@azure/ai-metrics-advisor";
import { describe, it, assert, beforeEach } from "vitest";

describe("MetricsAdvisorKeyCredential", () => {
  let credential: MetricsAdvisorKeyCredential;

  beforeEach(() => {
    credential = new MetricsAdvisorKeyCredential("key1", "key2");
  });

  it("update subscriptionKey", async () => {
    const newValue = "Abc";
    credential.updateKey({ subscriptionKey: newValue });
    assert.equal(credential.subscriptionKey, newValue);
  });

  it("update apiKey", async () => {
    const newValue = "Abcdef";
    credential.updateKey({ apiKey: newValue });
    assert.equal(credential.apiKey, newValue);
  });
});
