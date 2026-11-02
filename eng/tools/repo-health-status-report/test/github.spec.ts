// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";

const iterator = vi.fn();

vi.mock("octokit", () => ({
  Octokit: class {
    paginate = { iterator };
    rest = { issues: { listForRepo: vi.fn() } };
  },
}));

describe("getCustomerIssues", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    iterator.mockReset();
  });

  it("excludes pull requests returned by the issues endpoint", async () => {
    vi.stubEnv("GH_TOKEN", "token");
    iterator.mockReturnValue(
      (async function* () {
        yield {
          data: [
            { id: 1, labels: ["customer-reported"] },
            {
              id: 2,
              labels: ["customer-reported"],
              pull_request: { url: "https://api.github.com/repos/Azure/azure-sdk-for-js/pulls/2" },
            },
          ],
        };
      })(),
    );
    const { getCustomerIssues } = await import("../src/github.js");

    const issues = await getCustomerIssues();

    expect(issues.map((issue) => issue.id)).toEqual([1]);
  });

  it("maps local CODEOWNERS entries by service and package directory", async () => {
    const { mapCodeownersContentToLabels } = await import("../src/github.js");
    const dataplane = {
      "@azure/storage-blob": {
        projectPath: "sdk/storage/storage-blob/package.json",
        serviceDir: "storage",
        packageDir: "storage-blob",
        status: "GOOD" as const,
        path: "sdk/storage/storage-blob",
        sdkOwned: false,
        lint: { status: "UNKNOWN" as const },
        tests: { status: "UNKNOWN" as const },
        samples: { status: "UNKNOWN" as const },
        ci: { status: "UNKNOWN" as const },
      },
      "@azure/keyvault-keys": {
        projectPath: "sdk/keyvault/keyvault-keys/package.json",
        serviceDir: "keyvault",
        packageDir: "keyvault-keys",
        status: "GOOD" as const,
        path: "sdk/keyvault/keyvault-keys",
        sdkOwned: false,
        lint: { status: "UNKNOWN" as const },
        tests: { status: "UNKNOWN" as const },
        samples: { status: "UNKNOWN" as const },
        ci: { status: "UNKNOWN" as const },
      },
    };
    const content = [
      "# PRLabel: %Storage",
      "/sdk/storage/storage-blob/ @azure/azure-sdk-write",
      "/eng/ @azure/azure-sdk-write",
      "/sdk/keyvault/keyvault-keys/ @azure/azure-sdk-write",
    ].join("\n");

    const result = mapCodeownersContentToLabels(dataplane, content);

    expect(result.trackedLabels).toEqual({ Storage: ["storage"] });
    expect(result.dataplane["@azure/storage-blob"].label).toBe("Storage");
    expect(result.dataplane["@azure/keyvault-keys"].label).toBeUndefined();
    expect(dataplane["@azure/storage-blob"]).not.toHaveProperty("label");
  });
});
