// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach } from "vitest";

describe("Azure Kubernetes Integration test", function () {
  let podOutput: string;
  beforeEach(async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    // Read the pod output from the environment variable set by test-resources-post.ps1
    podOutput = process.env.IDENTITY_AKS_POD_OUTPUT || "";
    if (!podOutput) {
      console.error("IDENTITY_AKS_POD_OUTPUT environment variable is not set");
      throw new Error(
        "Missing pod output in IDENTITY_AKS_POD_OUTPUT environment variable. Make sure test-resources-post.ps1 has been run successfully."
      );
    }
    console.log("Successfully read pod output from environment variable");
  });

  it("can authenticate using managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    assert.include(
      podOutput,
      "ManagedIdentity: Successfully authenticated with storage",
      `Expected ${podOutput} to include a ManagedIdentity success message`,
    );
  });

  it("can authenticate using workload identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    assert.include(
      podOutput,
      "WorkloadIdentity: Successfully authenticated with storage",
      `Expected ${podOutput} to include a WorkloadIdentity success message`,
    );
  });
});
