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
    vi.stubEnv("GITHUB_TOKEN", "token");
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
});
