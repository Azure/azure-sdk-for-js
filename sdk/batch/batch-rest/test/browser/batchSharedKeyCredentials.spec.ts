// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createBatchSharedKeyCredentialsPolicy } from "../../src/credentials/batchSharedKeyCredentials.js";
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { expect, it } from "vitest";

it("should throw error in browser environment", () => {
  expect(() =>
    createBatchSharedKeyCredentialsPolicy(new AzureNamedKeyCredential("name", "key")),
  ).toThrowError("BatchSharedKeyCredentialsPolicy is not supported in browser environment");
});
