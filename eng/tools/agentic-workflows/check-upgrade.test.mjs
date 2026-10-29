// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
  checkUpgrade,
  createUpgradePullRequest,
  pinnedVersion,
  verifyUpgrade,
} from "./check-upgrade.mjs";

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
  pullPages = [[]],
  createdPR,
  upgradeError = new Error("Simulated upgrade failure"),
} = {}) {
  const calls = [];
  const logs = [];
  const upgrades = [];
  const invoke = () =>
    checkUpgrade({
      setup: setup(pin),
      repo: "Azure/azure-sdk-for-js",
      dryRun,
      token: "test-token",
      log: (message) => logs.push(message),
      upgrade: async (options) => {
        upgrades.push(options);
        if (upgradeError) throw upgradeError;
      },
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        if (calls.length === failAt) throw new Error("GitHub request failed");
        if (url.endsWith("/releases/latest")) return response({ tag_name: latest, ...release });
        if (options.method === "POST") {
          return response({ html_url: "https://github.com/Azure/azure-sdk-for-js/issues/123" });
        }
        const page = Number(new URL(url).searchParams.get("page"));
        if (new URL(url).pathname.endsWith("/pulls")) {
          return response(upgrades.length && createdPR ? [createdPR] : (pullPages[page - 1] ?? []));
        }
        return response(issuePages[page - 1] ?? []);
      },
    });
  return { calls, logs, upgrades, invoke };
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
    assert.equal(check.calls.length, upgrade ? 5 : 1, `${pin} -> ${latest}`);
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
        {
          title: "[agentic-workflows] Upgrade gh-aw from v0.89.21 to v0.92.0",
          html_url: "https://github.com/Azure/azure-sdk-for-js/issues/123",
        },
      ],
    ],
  });
  await check.invoke();
  assert.equal(check.calls.length, 4);
  assert.equal(check.upgrades.length, 0);
  assert.ok(check.logs.some((message) => /v0.89.21 to v0.92.0.*\/issues\/123/.test(message)));
  assert.match(check.logs.at(-1), /\[SKIP\].*no upgrade attempted and no new issue created/);
  assert.ok(!check.logs.some((message) => message.includes("[START] Upgrade gh-aw and publish")));
  assert.match(check.calls[2].url, /state=open&per_page=100&page=1/);
  assert.match(check.calls[3].url, /state=open&per_page=100&page=2/);
});

test("creates the expected title, labels, release link, and agent request", async () => {
  const check = run();
  await check.invoke();
  const { url, options } = check.calls[4];
  assert.equal(url, "https://api.github.com/repos/Azure/azure-sdk-for-js/issues");
  assert.equal(options.method, "POST");
  const { body, ...issueMetadata } = JSON.parse(options.body);
  assert.deepEqual(issueMetadata, {
    title: "[agentic-workflows] Upgrade gh-aw from v0.89.21 to v0.92.0",
    labels: ["agentic-workflows", "automated", "dependencies"],
  });
  for (const required of [
    "is currently v0.89.21",
    "[v0.92.0](https://github.com/github/gh-aw/releases/tag/v0.92.0)",
    "select the **Agentic Workflows** custom agent",
    "Before making changes, read",
    ".github/skills/agentic-workflows/SKILL.md",
    "https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/upgrade-agentic-workflows.md",
    "Follow those instructions even if you are running as the default agent",
    "If the instructions cannot be retrieved, report that blocker",
    "Install and verify gh-aw v0.92.0",
    "gh aw upgrade",
    "Recompile every agentic workflow with the target version",
    "generated `.lock.yml` changes",
    "do not edit generated lock files by hand",
    "Report the compiler version, compilation outcome, and any blockers",
    "If compilation produces no changes, explain why",
    "Do not treat a version-pin-only change as a completed upgrade",
    "Automatic upgrade failure",
    "Simulated upgrade failure",
  ]) {
    assert.ok(body.includes(required), `Missing issue instruction: ${required}`);
  }
  assert.ok(body.startsWith("The `gh-aw` CLI pinned in"));
  assert.equal(options.headers.Authorization, "Bearer test-token");
  assert.equal(options.headers["X-GitHub-Api-Version"], "2022-11-28");
  assert.equal(
    check.logs.at(-1),
    "Created gh-aw upgrade issue from v0.89.21 to v0.92.0: https://github.com/Azure/azure-sdk-for-js/issues/123",
  );
  assert.ok(check.logs.some((message) => message.includes("Simulated upgrade failure")));
});

test("dry run performs reads but never runs commands or creates issues or PRs", async () => {
  const check = run({ dryRun: true });
  await check.invoke();
  assert.equal(check.calls.length, 3);
  assert.equal(check.upgrades.length, 0);
  assert.match(check.logs.at(-1), /Would upgrade gh-aw from v0.89.21 to v0.92.0/);
});

test("requires a token and surfaces API, transport, and version failures", async () => {
  await assert.rejects(checkUpgrade({ setup: setup("v0.89.21"), repo: "Azure/repo", token: "" }), {
    message: "GH_TOKEN is required to access the GitHub API",
  });
  for (const failAt of [1, 2, 3, 4, 5]) {
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

const pull = {
  html_url: "https://github.com/Azure/azure-sdk-for-js/pull/456",
  title: "Upgrade agentic workflows",
  head: { ref: "upgrade-agentic-workflows-1234", repo: { full_name: "Azure/azure-sdk-for-js" } },
};

test("logs versions and PR URL without creating an issue on successful upgrades", async () => {
  const success = run({ createdPR: pull, upgradeError: null });
  await success.invoke();
  assert.equal(success.upgrades.length, 1);
  assert.equal(success.upgrades[0].latest, "0.92.0");
  assert.ok(success.calls.every(({ options }) => options.method === "GET"));
  assert.match(
    success.logs.at(-1),
    /Created gh-aw upgrade pull request from v0.89.21 to v0.92.0: .*\/pull\/456/,
  );
  const recovered = run({
    createdPR: pull,
    upgradeError: new Error("CLI failed after publication"),
  });
  await recovered.invoke();
  assert.match(recovered.logs.at(-1), /Recovered gh-aw upgrade pull request/);
});

test("deduplicates native CLI upgrade PRs across pages, ignoring unrelated PRs", async () => {
  const check = run({
    pullPages: [
      Array.from({ length: 100 }, () => ({ ...pull, title: "Unrelated", head: { ref: "other" } })),
      [pull],
    ],
  });
  await check.invoke();
  assert.equal(check.upgrades.length, 0);
  assert.equal(check.calls.length, 3);
  assert.ok(check.logs.some((message) => /already open.*\/pull\/456/.test(message)));
  assert.match(check.logs.at(-1), /\[SKIP\].*PR is already open/);
});

test("falls back when the CLI reports success without publishing a PR", async () => {
  const check = run({ upgradeError: null });
  await check.invoke();
  assert.match(check.calls.at(-1).options.body, /completed without an open upgrade pull request/);
});

test("redacts tokens and escapes failure details in fallback issues", async () => {
  const check = run({ upgradeError: new Error("failed test-token <secret>") });
  await check.invoke();
  assert.ok(check.logs.every((message) => !message.includes("test-token")));
  const { body } = JSON.parse(check.calls.at(-1).options.body);
  assert.ok(body.includes("[REDACTED] &lt;secret&gt;"));
  assert.ok(!body.includes("test-token"));
});

test("logs discovery, upgrade failure, publication check, and fallback outcomes in order", async () => {
  const check = run();
  await check.invoke();
  const steps = check.logs.filter((message) => /^\[(START|SUCCESS|FAILURE)\]/.test(message));
  assert.ok(steps.includes("[START] Read pinned gh-aw version"));
  assert.ok(steps.includes("[SUCCESS] Read pinned gh-aw version"));
  const failed = steps.findIndex((message) =>
    message.startsWith("[FAILURE] Upgrade gh-aw and publish pull request:"),
  );
  const confirm = steps.indexOf("[START] Confirm upgrade PR publication");
  const fallback = steps.indexOf("[START] Create fallback upgrade issue");
  assert.ok(failed >= 0 && confirm > failed && fallback > confirm);
  assert.equal(steps.at(-1), "[SUCCESS] Create fallback upgrade issue");
  const broken = run({ failAt: 1 });
  await assert.rejects(broken.invoke, /Fetch latest gh-aw release: GitHub request failed/);
  assert.equal(broken.logs.at(-1), "[FAILURE] Fetch latest gh-aw release: GitHub request failed");
});

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), "gh-aw-check-test-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const workflows = join(cwd, ".github", "workflows");
  mkdirSync(workflows, { recursive: true });
  writeFileSync(join(workflows, "copilot-setup-steps.yml"), setup("v1.0.1"));
  writeFileSync(
    join(workflows, "test.lock.yml"),
    '# gh-aw-metadata: {"compiler_version":"v1.0.1"}\n',
  );
  return { cwd, workflows };
}

test("publication gate requires the target pin, lock metadata, and stable compilation", async (t) => {
  const { cwd, workflows } = fixture(t);
  const calls = [];
  const run = async (command, args) => {
    calls.push([command, args]);
    return "";
  };
  await verifyUpgrade({ cwd, latest: "1.0.1", run });
  assert.deepEqual(calls, [
    ["gh", ["aw", "compile"]],
    ["git", ["status", "--porcelain", "--untracked-files=all"]],
  ]);
  await assert.rejects(verifyUpgrade({ cwd, latest: "1.0.2", run }), /setup CLI pin/);
  await assert.rejects(
    verifyUpgrade({
      cwd,
      latest: "1.0.1",
      run: async () => {
        throw new Error("compile failed");
      },
    }),
    /compile failed/,
  );
  await assert.rejects(
    verifyUpgrade({
      cwd,
      latest: "1.0.1",
      run: async (command) => (command === "git" ? " M test.lock.yml" : ""),
    }),
    /refusing to push/,
  );
  writeFileSync(
    join(workflows, "test.lock.yml"),
    '# gh-aw-metadata: {"compiler_version":"v0.93.5"}\n',
  );
  await assert.rejects(verifyUpgrade({ cwd, latest: "1.0.1", run }), /not generated/);
  rmSync(join(workflows, "test.lock.yml"));
  await assert.rejects(verifyUpgrade({ cwd, latest: "1.0.1", run }), /No compiled/);
});

test("installs an isolated target CLI and invokes native PR creation with an external gate", async () => {
  const calls = [];
  let temporary;
  await createUpgradePullRequest({
    repo: "Azure/azure-sdk-for-js",
    pinned: "0.93.5",
    latest: "1.0.1",
    token: "test-token",
    run: async (command, args, options) => {
      calls.push({ command, args, options });
      if (args[0] === "clone") {
        const cwd = args.at(-1);
        temporary = options.env.GH_CONFIG_DIR;
        mkdirSync(join(cwd, ".github", "workflows"), { recursive: true });
        writeFileSync(
          join(cwd, ".github", "workflows", "copilot-setup-steps.yml"),
          setup("v0.93.5"),
        );
        writeFileSync(
          join(cwd, ".github", "pull_request_template.md"),
          "### Packages impacted by this PR\n\n### Checklists\n- [ ] Existing item\n",
        );
      }
      if (args.includes("core.hooksPath")) {
        const hook = readFileSync(join(args.at(-1), "pre-push"), "utf8");
        assert.match(hook, /--verify-upgrade '1.0.1'/);
      }
      return args.includes("--version") ? "gh aw version v1.0.1" : "";
    },
  });
  assert.equal(existsSync(temporary), false);
  const install = calls.find(({ args }) => args[0] === "extension");
  assert.deepEqual(install.args, ["extension", "install", "github/gh-aw", "--pin", "v1.0.1"]);
  const upgrade = calls.at(-1);
  assert.ok(upgrade.args.includes("--create-pull-request"));
  assert.ok(upgrade.args.includes("--skip-extension-upgrade"));
  assert.ok(!upgrade.args.includes("--auto-merge"));
  assert.ok(!upgrade.args.includes("--approve"));
  assert.ok(upgrade.args.at(-1).includes("- [ ] Existing item"));
  assert.ok(upgrade.args.at(-1).includes("Repository agentic workflows"));
  assert.equal(upgrade.options.env.GH_TOKEN, "test-token");
});

test("cleans up the isolated checkout after command failures", async () => {
  let directory;
  await assert.rejects(
    createUpgradePullRequest({
      repo: "Azure/azure-sdk-for-js",
      pinned: "0.93.5",
      latest: "1.0.1",
      token: "test-token",
      run: async (_command, args) => {
        directory = args.at(-1);
        throw new Error("clone failed test-token");
      },
    }),
    /clone failed \[REDACTED\]/,
  );
  assert.equal(existsSync(directory), false);
});

test("publication gate detects actual git changes from recompilation", async (t) => {
  const { cwd, workflows } = fixture(t);
  const git = (args) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
  git(["init", "--quiet"]);
  git(["add", "."]);
  git([
    "-c",
    "user.name=Test",
    "-c",
    "user.email=test@example.com",
    "-c",
    "commit.gpgsign=false",
    "-c",
    "core.hooksPath=",
    "commit",
    "--quiet",
    "-m",
    "fixture",
  ]);
  await assert.rejects(
    verifyUpgrade({
      cwd,
      latest: "1.0.1",
      run: async (command, args) => {
        if (command === "gh") {
          writeFileSync(
            join(workflows, "test.lock.yml"),
            '# gh-aw-metadata: {"compiler_version":"v1.0.1"}\nchanged\n',
          );
          return "";
        }
        return git(args);
      },
    }),
    /refusing to push/,
  );
});

test("the installed pre-push hook actually blocks publication and preserves failure details", async (t) => {
  const parent = mkdtempSync(join(tmpdir(), "gh-aw-push-test-"));
  t.after(() => rmSync(parent, { recursive: true, force: true }));
  const remote = join(parent, "remote.git");
  execFileSync("git", ["init", "--bare", "--quiet", remote]);
  await assert.rejects(
    createUpgradePullRequest({
      repo: "Azure/azure-sdk-for-js",
      pinned: "0.93.5",
      latest: "1.0.1",
      token: "test-token",
      run: async (command, args, options) => {
        if (command === "git" && args[0] === "clone") {
          const cwd = args.at(-1);
          mkdirSync(join(cwd, ".github", "workflows"), { recursive: true });
          writeFileSync(
            join(cwd, ".github", "workflows", "copilot-setup-steps.yml"),
            setup("v0.93.5"),
          );
          writeFileSync(
            join(cwd, ".github", "pull_request_template.md"),
            "### Packages impacted\n",
          );
          execFileSync("git", ["init", "--quiet", cwd]);
          execFileSync("git", ["remote", "add", "origin", remote], { cwd });
        } else if (command === "git") {
          execFileSync(command, args, { cwd: options.cwd });
        } else if (args.includes("--version")) {
          return "gh aw version v1.0.1";
        } else if (args.includes("upgrade")) {
          // Simulate a pin-only/failed migration that the CLI would otherwise push.
          const git = (gitArgs) =>
            execFileSync("git", gitArgs, { cwd: options.cwd, env: options.env, stdio: "pipe" });
          git(["add", "."]);
          git(["-c", "commit.gpgsign=false", "commit", "--quiet", "-m", "upgrade fixture"]);
          git(["push", "origin", "HEAD:refs/heads/upgrade-agentic-workflows-test"]);
          assert.fail("Invalid upgrade must not be published");
        }
        return "";
      },
    }),
    /Publication gate: Verify upgrade before push: The upgraded setup CLI pin is not v1.0.1/,
  );
  assert.equal(
    execFileSync("git", ["--git-dir", remote, "for-each-ref"], { encoding: "utf8" }).trim(),
    "",
  );
});
