// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { authorizeRequestOnTenantChallenge as pipelineAuthorizeRequestOnTenantChallenge } from "@azure/core-rest-pipeline";
import { authorizeRequestOnTenantChallenge } from "../../src/index.js";

describe("authorizeRequestOnTenantChallenge compatibility export", () => {
  it("re-exports the pipeline implementation", () => {
    expect(authorizeRequestOnTenantChallenge).toBe(pipelineAuthorizeRequestOnTenantChallenge);
  });
});
