// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { checkUpgrade, pinnedVersion } from "./check-upgrade.mjs";

function setup(pin, ref = "a".repeat(40)) {
  return `
jobs:
  copilot-setup-steps:
    steps:
      - uses: github/gh-aw-actions/setup-cli@${ref}
        with:
          version: "${pin}"
`;
}

function response(data, { status = 200, statusText = "OK" } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    json: async () => data,
    text: async () => String(data),
  };
}

function run({
  pin = "v0.89.21",
  latest = "v0.92.0",
  issuePages = [[]],
  dryRun = false,
  release = {},
  failAt,
} = {}) {
  const calls = [];
  const logs = [];
  const invoke = () =>
    checkUpgrade({
      setup: setup(pin),
      repo: "Azure/azure-sdk-for-js",
      dryRun,
      token: "test-token",
      log: (message) => logs.push(message),
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        if (calls.length === failAt) throw new Error("GitHub request failed");
        if (calls.length === 1) return response({ tag_name: latest, ...release });
        if (options.method === "POST") {
          return response({ html_url: "https://github.com/Azure/azure-sdk-for-js/issues/123" });
        }
        const page = Number(new URL(url).searchParams.get("page"));
        return response(issuePages[page - 1] ?? []);
      },
    });
  return { calls, logs, invoke };
}

test("reads SHA-pinned and version-tagged setup steps", () => {
  assert.equal(pinnedVersion(setup("v0.93.5")), "0.93.5");
  assert.equal(pinnedVersion(setup("v0.93.5", "v0.93.5")), "0.93.5");
});

test("rejects missing, invalid, ambiguous, and inconsistent pins", () => {
  for (const source of [
    "{}",
    setup("latest"),
    setup("v0.93.5", "main"),
    setup("v0.93.5", "v0.92.0"),
    setup("v0.93.5") + "      - uses: github/gh-aw-actions/setup-cli@v0.93.5\n",
  ]) {
    assert.throws(() => pinnedVersion(source));
  }
});

test("compares versions using SemVer precedence", async () => {
  for (const [pin, latest, upgrade] of [
    ["v0.9.0", "v0.10.0", true],
    ["v1.0.0-rc.2", "v1.0.0-rc.10", true],
    ["v1.0.0-rc.1", "v1.0.0", true],
    ["v1.0.0", "v1.0.0", false],
    ["v1.0.0+build.1", "v1.0.0+build.2", false],
    ["v1.0.1-rc.1", "v1.0.0", false],
    ["v1.0.0", "v0.99.0", false],
  ]) {
    const check = run({ pin, latest });
    await check.invoke();
    assert.equal(check.calls.length, upgrade ? 3 : 1, `${pin} -> ${latest}`);
  }
});

test("does not file draft or prerelease releases", async () => {
  for (const release of [{ draft: true }, { prerelease: true }]) {
    const check = run({ release });
    await check.invoke();
    assert.equal(check.calls.length, 1);
  }
});

test("skips an exact existing open upgrade issue and checks subsequent pages", async () => {
  const check = run({
    issuePages: [
      Array.from({ length: 100 }, (_, index) => ({ title: `Unrelated issue ${index}` })),
      [
        { title: "Issue title", pull_request: {} },
        { title: "[agentic-workflows] Upgrade gh-aw from v0.89.21 to v0.92.0" },
      ],
    ],
  });
  await check.invoke();
  assert.equal(check.calls.length, 3);
  assert.match(check.calls[1].url, /state=open&per_page=100&page=1/);
  assert.match(check.calls[2].url, /state=open&per_page=100&page=2/);
});

test("creates the expected title, labels, release link, and agent request", async () => {
  const check = run();
  await check.invoke();
  const { url, options } = check.calls[2];
  assert.equal(url, "https://api.github.com/repos/Azure/azure-sdk-for-js/issues");
  assert.equal(options.method, "POST");
  assert.deepEqual(JSON.parse(options.body), {
    title: "[agentic-workflows] Upgrade gh-aw from v0.89.21 to v0.92.0",
    body:
      "The `gh-aw` CLI pinned in `.github/workflows/copilot-setup-steps.yml` is currently v0.89.21. " +
      "The latest released version is [v0.92.0](https://github.com/github/gh-aw/releases/tag/v0.92.0).\n\n" +
      "Please use the **Agentic Workflows** custom agent to upgrade this repository to gh-aw v0.92.0. " +
      "The agent already knows how to perform this upgrade.",
    labels: ["agentic-workflows", "automated", "dependencies"],
  });
  assert.equal(options.headers.Authorization, "Bearer test-token");
  assert.equal(options.headers["X-GitHub-Api-Version"], "2022-11-28");
  assert.deepEqual(check.logs, [
    "Created gh-aw upgrade issue from v0.89.21 to v0.92.0: https://github.com/Azure/azure-sdk-for-js/issues/123",
  ]);
});

test("dry run performs reads but never creates an issue", async () => {
  const check = run({ dryRun: true });
  await check.invoke();
  assert.equal(check.calls.length, 2);
  assert.match(check.logs[0], /Would create issue/);
});

test("requires a token and surfaces API, transport, and version failures", async () => {
  await assert.rejects(checkUpgrade({ setup: setup("v0.89.21"), repo: "Azure/repo", token: "" }), {
    message: "GH_TOKEN is required to access the GitHub API",
  });
  for (const failAt of [1, 2, 3]) {
    await assert.rejects(run({ failAt }).invoke, /GitHub request failed/);
  }
  const fetchImpl = async () =>
    response("permission denied", { status: 403, statusText: "Forbidden" });
  await assert.rejects(
    checkUpgrade({
      setup: setup("v0.89.21"),
      repo: "Azure/azure-sdk-for-js",
      token: "test-token",
      fetchImpl,
    }),
    /GitHub API GET .* failed \(403 Forbidden\): permission denied/,
  );
  await assert.rejects(run({ latest: "not-a-version" }).invoke, /Invalid gh-aw semantic version/);
});
