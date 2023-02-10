// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WorkloadIdentityCredential } from "../../../src/credentials/workloadIdentityCredential";
import { assert } from "chai";
import { env } from "@azure-tools/test-recorder";

describe("WorkloadIdentityCredential (internal)", () => {
  it("Should throw if the parameteres are not correctly specified", async function () {
    const errors: Error[] = [];
    try {
      new WorkloadIdentityCredential(undefined as any, env.AZURE_CLIENT_ID ?? "client", "file.txt");
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new WorkloadIdentityCredential(env.AZURE_TENANT_ID ?? "tenant", undefined as any, "file.txt");
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new WorkloadIdentityCredential(
        env.AZURE_TENANT_ID ?? "tenant",
        env.AZURE_CLIENT_ID ?? "client",
        undefined as any
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new WorkloadIdentityCredential(undefined as any, undefined as any, undefined as any);
    } catch (e: any) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "WorkloadIdentityCredential: tenantId, clientId, and federatedTokenFilePath are required parameters."
      );
    });
  });
});
