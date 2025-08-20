// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createBatchSharedKeyCredentialsPolicy } from "$internal/credentials/batchSharedKeyCredentials.js";
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { describe, expect, it } from "vitest";

describe("createBatchSharedKeyCredentialsPolicy", () => {
  it("should throw error in browser environment", () => {
    expect(() =>
      createBatchSharedKeyCredentialsPolicy(new AzureNamedKeyCredential("name", "key")),
    ).toThrowError("BatchSharedKeyCredentialsPolicy is not supported in browser environment");
  });
});
