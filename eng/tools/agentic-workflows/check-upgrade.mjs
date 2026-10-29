// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs, promisify } from "node:util";
import semver from "semver";
import { parse } from "yaml";

const setupPath = new URL("../../../.github/workflows/copilot-setup-steps.yml", import.meta.url);
const labels = ["agentic-workflows", "automated", "dependencies"];
const execute = promisify(execFile);

async function loggedStep(name, action, log, token = process.env.GH_TOKEN) {
  log(`[START] ${name}`);
  try {
    const result = await action();
    log(`[SUCCESS] ${name}`);
    return result;
  } catch (error) {
    const details = failureDetails(error, token);
    log(`[FAILURE] ${name}: ${details}`);
    throw new Error(`${name}: ${details}`, { cause: error });
  }
}

async function runCommand(command, args, options) {
  const redact = (text) =>
    options?.env?.GH_TOKEN ? text.replaceAll(options.env.GH_TOKEN, "[REDACTED]") : text;
  try {
    const { stdout, stderr } = await execute(command, args, {
      encoding: "utf8",
      timeout: 20 * 60 * 1000,
      maxBuffer: 16 * 1024 * 1024,
      ...options,
    });
    if (stdout) console.log(redact(stdout.trimEnd()));
    if (stderr) console.error(redact(stderr.trimEnd()));
    return stdout.trim();
  } catch (error) {
    if (error.stdout) console.error(redact(error.stdout));
    if (error.stderr) console.error(redact(error.stderr));
    throw error;
  }
}

function failureDetails(error, token) {
  const details = String(error?.message ?? error);
  return (token ? details.replaceAll(token, "[REDACTED]") : details).slice(-8000);
}

// gh-aw's upgrade command treats compilation errors as warnings. Enforce this
// gate after its commit but before its push, including recompilation stability.
export async function verifyUpgrade({ cwd, latest, run = runCommand, log = console.log }) {
  return loggedStep(
    "Verify upgrade before push",
    async () => {
      if (
        pinnedVersion(
          readFileSync(join(cwd, ".github", "workflows", "copilot-setup-steps.yml"), "utf8"),
        ) !== latest
      ) {
        throw new Error(`The upgraded setup CLI pin is not v${latest}`);
      }
      await loggedStep("Compile all workflows", () => run("gh", ["aw", "compile"], { cwd }), log);
      const workflows = join(cwd, ".github", "workflows");
      const locks = readdirSync(workflows).filter((name) => name.endsWith(".lock.yml"));
      if (!locks.length) throw new Error("No compiled agentic workflow lock files found");
      for (const name of locks) {
        const text = readFileSync(join(workflows, name), "utf8");
        const metadata = text.match(/^# gh-aw-metadata: (.+)$/m);
        if (!metadata || version(JSON.parse(metadata[1]).compiler_version) !== latest) {
          throw new Error(`${name} was not generated with gh-aw v${latest}`);
        }
      }
      if (await run("git", ["status", "--porcelain", "--untracked-files=all"], { cwd })) {
        throw new Error(
          "Recompilation changed the committed upgrade; refusing to push incomplete generated changes",
        );
      }
      log(
        `Verified v${latest} metadata in ${locks.length} workflow lock files and a clean working tree.`,
      );
    },
    log,
  );
}

function upgradePRMessage(cwd, pinned, latest) {
  const candidates = [
    join(cwd, ".github", "PULL_REQUEST_TEMPLATE", "pull_request_template.md"),
    join(cwd, ".github", "pull_request_template.md"),
  ];
  const path = candidates.find(existsSync);
  if (!path) throw new Error("No repository pull request template found");
  const answers = [
    ["Packages impacted", "Repository agentic workflows; no SDK packages."],
    ["Issues associated", "N/A."],
    [
      "Describe the problem",
      `Upgrade gh-aw from v${pinned} to [v${latest}](https://github.com/github/gh-aw/releases/tag/v${latest}), including repository components and generated workflows.`,
    ],
    [
      "What are the possible designs",
      "Use the gh-aw CLI's full upgrade instead of an AI-authored version-pin-only change.",
    ],
    ["Are there test cases", "N/A: this pull request contains CLI-generated upgrade changes."],
    ["Provide a list", "N/A."],
  ];
  return readFileSync(path, "utf8").replace(/^### .+$/gm, (heading) => {
    const answer = answers.find(([prefix]) => heading.startsWith(`### ${prefix}`));
    return answer ? `${heading}\n\n${answer[1]}` : heading;
  });
}

export async function createUpgradePullRequest({
  repo,
  pinned,
  latest,
  token,
  run = runCommand,
  log = console.log,
}) {
  const directory = mkdtempSync(join(tmpdir(), "gh-aw-upgrade-"));
  const cwd = join(directory, "repository");
  const gateLog = join(directory, "gate-error.txt");
  const env = {
    ...process.env,
    GH_TOKEN: token,
    GH_HOST: "github.com",
    GH_REPO: repo,
    GH_PROMPT_DISABLED: "1",
    GIT_TERMINAL_PROMPT: "0",
    GH_CONFIG_DIR: join(directory, "gh-config"),
    XDG_DATA_HOME: join(directory, "data"),
    GH_AW_UPGRADE_GATE_LOG: gateLog,
  };
  const command = (executable, args, name = `${executable} ${args.join(" ")}`) =>
    loggedStep(name, () => run(executable, args, { cwd, env }), log, token);
  try {
    await loggedStep(
      "Clone target repository default branch",
      () =>
        run(
          "git",
          [
            "clone",
            "--depth=1",
            "--single-branch",
            "--config",
            "credential.helper=",
            "--config",
            "credential.helper=!gh auth git-credential",
            `https://github.com/${repo}.git`,
            cwd,
          ],
          { env },
        ),
      log,
      token,
    );
    await loggedStep(
      "Verify default branch version pin",
      () => {
        const actualPin = pinnedVersion(
          readFileSync(join(cwd, ".github", "workflows", "copilot-setup-steps.yml"), "utf8"),
        );
        if (actualPin !== pinned)
          throw new Error(`Default branch pin changed to v${actualPin}; rerun the checker`);
      },
      log,
      token,
    );
    await command("git", ["config", "user.name", "azure-sdk"]);
    await command("git", ["config", "user.email", "azuresdk@microsoft.com"]);
    const hooks = join(directory, "hooks");
    mkdirSync(hooks);
    // Keep the gate outside the checkout so an upgrade cannot replace it.
    const quote = (value) => `'${value.replaceAll("\\", "/").replaceAll("'", "'\\''")}'`;
    writeFileSync(
      join(hooks, "pre-push"),
      `#!/bin/sh\nexec ${quote(process.execPath)} ${quote(fileURLToPath(import.meta.url))} --verify-upgrade ${quote(latest)}\n`,
      { mode: 0o755 },
    );
    await command("git", ["config", "core.hooksPath", hooks]);
    // Isolate the extension installation from the invoking user's gh environment.
    await command("gh", ["extension", "install", "github/gh-aw", "--pin", `v${latest}`]);
    await loggedStep(
      `Verify installed gh-aw v${latest}`,
      async () => {
        const installed = await command("gh", ["aw", "--version"]);
        if (!new RegExp(`(?:^|\\s)v?${latest.replaceAll(".", "\\.")}(?:\\s|$)`).test(installed)) {
          throw new Error(`Unexpected gh-aw CLI version: ${installed}`);
        }
      },
      log,
      token,
    );
    await command(
      "gh",
      [
        "aw",
        "upgrade",
        "--create-pull-request",
        "--skip-extension-upgrade",
        "--pr-message",
        upgradePRMessage(cwd, pinned, latest),
      ],
      "Run gh aw upgrade --create-pull-request (includes commit, pre-push gate, push, and PR creation)",
    );
  } catch (error) {
    const gateError = existsSync(gateLog)
      ? `\nPublication gate: ${readFileSync(gateLog, "utf8")}`
      : "";
    throw new Error(`${failureDetails(error, token)}${gateError}`);
  } finally {
    await loggedStep(
      "Clean up temporary checkout and CLI installation",
      () => rmSync(directory, { recursive: true, force: true }),
      log,
      token,
    );
  }
}

function version(value) {
  const normalized = typeof value === "string" && semver.valid(value);
  if (!normalized) throw new Error(`Invalid gh-aw semantic version: ${value}`);
  return normalized;
}

export function pinnedVersion(setup) {
  const steps = parse(setup)?.jobs?.["copilot-setup-steps"]?.steps;
  const installs = steps?.filter((step) =>
    step.uses?.startsWith("github/gh-aw-actions/setup-cli@"),
  );
  if (installs?.length !== 1) {
    throw new Error("Expected exactly one gh-aw setup-cli step in copilot-setup-steps.yml");
  }
  const install = installs[0];
  const pinned = version(install.with?.version);
  const ref = install.uses.split("@")[1];
  // setup-cli may be SHA-pinned; a version-tagged action must agree with the CLI pin.
  if (!/^[a-f0-9]{40}$/i.test(ref) && version(ref) !== pinned) {
    throw new Error("gh-aw setup-cli action ref and with.version disagree");
  }
  return pinned;
}

async function requestGitHub(path, { token, method = "GET", body, fetchImpl = fetch }) {
  const response = await fetchImpl(`https://api.github.com${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "azure-sdk-for-js-agentic-workflows-upgrade-check",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `GitHub API ${method} ${path} failed (${response.status} ${response.statusText}): ${details}`,
    );
  }
  return response.status === 204 ? undefined : response.json();
}

export async function checkUpgrade({
  setup,
  repo,
  dryRun = false,
  token = process.env.GH_TOKEN,
  fetchImpl = fetch,
  log = console.log,
  upgrade = createUpgradePullRequest,
}) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    throw new Error("Repository must have the form owner/repo");
  }
  if (!token) throw new Error("GH_TOKEN is required to access the GitHub API");
  const step = (name, action) => loggedStep(name, action, log, token);
  const pinned = await step("Read pinned gh-aw version", () => pinnedVersion(setup));
  const release = await step("Fetch latest gh-aw release", () =>
    requestGitHub("/repos/github/gh-aw/releases/latest", { token, fetchImpl }),
  );
  const latest = await step("Validate latest release version", () => version(release.tag_name));
  log(`Version comparison: pinned v${pinned}, latest v${latest}.`);
  if (release.draft || release.prerelease || !semver.gt(latest, pinned)) {
    log(`No upgrade needed: pinned v${pinned}, latest v${latest}.`);
    log("[SKIP] Upgrade and fallback issue creation: no eligible newer release.");
    return;
  }

  const title = `[agentic-workflows] Upgrade gh-aw from v${pinned} to v${latest}`;
  const findPullRequest = async () => {
    for (let page = 1; ; page++) {
      const pulls = await step(`List open upgrade PRs (page ${page})`, () =>
        requestGitHub(`/repos/${repo}/pulls?state=open&per_page=100&page=${page}`, {
          token,
          fetchImpl,
        }),
      );
      if (!Array.isArray(pulls))
        throw new Error("GitHub API returned an invalid pull requests response");
      const found = pulls.find(
        (pr) =>
          pr.head?.repo?.full_name?.toLowerCase() === repo.toLowerCase() &&
          (pr.head?.ref?.startsWith("upgrade-agentic-workflows-") ||
            /upgrade.*gh-aw/i.test(pr.title) ||
            pr.title === "Upgrade agentic workflows"),
      );
      if (found) return found;
      if (pulls.length < 100) return undefined;
    }
  };
  const existingPR = await findPullRequest();
  if (existingPR) {
    log(
      `An upgrade pull request is already open (pinned v${pinned}, latest v${latest}): ${existingPR.html_url}`,
    );
    log("[SKIP] Upgrade and fallback issue creation: an upgrade PR is already open.");
    return;
  }
  let page = 1;
  while (true) {
    const issues = await step(`List open upgrade issues (page ${page})`, () =>
      requestGitHub(`/repos/${repo}/issues?state=open&per_page=100&page=${page}`, {
        token,
        fetchImpl,
      }),
    );
    if (!Array.isArray(issues)) throw new Error("GitHub API returned an invalid issues response");
    const existingIssue = issues.find((issue) => !issue.pull_request && issue.title === title);
    if (existingIssue) {
      log(`An open issue already exists: ${title}: ${existingIssue.html_url}`);
      log(
        "[SKIP] Upgrade and fallback issue creation: matching issue already open; no upgrade attempted and no new issue created.",
      );
      return;
    }
    if (issues.length < 100) break;
    page++;
  }

  if (dryRun) {
    log("[SKIP] Upgrade and fallback issue creation: dry run.");
    log(
      `Would upgrade gh-aw from v${pinned} to v${latest} in ${repo} using gh aw upgrade --create-pull-request; create an issue if that fails.`,
    );
    return;
  }
  let upgradeError;
  try {
    log(`Upgrading gh-aw from v${pinned} to v${latest} in ${repo}.`);
    await step("Upgrade gh-aw and publish pull request", () =>
      upgrade({ repo, pinned, latest, token, log }),
    );
  } catch (error) {
    upgradeError = failureDetails(error, token);
    log(`Automatic gh-aw upgrade from v${pinned} to v${latest} failed:\n${upgradeError}`);
  }
  // A command may fail after GitHub accepted PR creation. Recover before filing
  // an issue rather than creating duplicate work after an ambiguous response.
  const createdPR = await step("Confirm upgrade PR publication", findPullRequest);
  if (createdPR) {
    log(
      `${upgradeError ? "Recovered" : "Created"} gh-aw upgrade pull request from v${pinned} to v${latest}: ${createdPR.html_url}`,
    );
    return;
  }
  upgradeError ??= "gh aw upgrade completed without an open upgrade pull request.";
  log(`Filing a fallback issue: ${upgradeError}`);
  const body =
    `The \`gh-aw\` CLI pinned in \`.github/workflows/copilot-setup-steps.yml\` is currently v${pinned}. ` +
    `The latest released version is [v${latest}](https://github.com/github/gh-aw/releases/tag/v${latest}).\n\n` +
    `Upgrade this repository to gh-aw v${latest}, not just the CLI version pin.\n\n` +
    "## Instructions\n\n" +
    "When assigning this issue to Copilot, select the **Agentic Workflows** custom agent. " +
    "Mentioning the agent here does not select it automatically.\n\n" +
    "Before making changes, read the repository's `.github/skills/agentic-workflows/SKILL.md` " +
    "and fetch and read the complete " +
    "[upgrade instructions](https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/upgrade-agentic-workflows.md). " +
    "Follow those instructions even if you are running as the default agent. " +
    "If the instructions cannot be retrieved, report that blocker instead of proceeding with only a pin update.\n\n" +
    "## Completion criteria\n\n" +
    `- Install and verify gh-aw v${latest}; use that version for the full repository upgrade, ` +
    "including `gh aw upgrade` (or the equivalent upgrade tool described in the instructions).\n" +
    "- Update the setup CLI version and action ref, refresh repository components, and apply required migrations.\n" +
    "- Recompile every agentic workflow with the target version and resolve compilation errors.\n" +
    "- Commit all resulting source, configuration, and generated `.lock.yml` changes; " +
    "do not edit generated lock files by hand.\n" +
    "- Report the compiler version, compilation outcome, and any blockers in the pull request. " +
    "If compilation produces no changes, explain why. " +
    "Do not treat a version-pin-only change as a completed upgrade.\n\n" +
    "## Automatic upgrade failure\n\n" +
    "The weekly automation attempted `gh aw upgrade --create-pull-request` but could not publish an upgrade PR. " +
    "Check the pipeline logs for the complete command output. A branch may have been pushed before PR creation failed.\n\n" +
    `<details><summary>Failure details</summary>\n\n<pre>${upgradeError.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</pre>\n\n</details>`;
  const created = await step("Create fallback upgrade issue", async () => {
    const issue = await requestGitHub(`/repos/${repo}/issues`, {
      token,
      method: "POST",
      body: { title, body, labels },
      fetchImpl,
    });
    if (!issue?.html_url) throw new Error("GitHub API issue response did not include html_url");
    return issue;
  });
  log(`Created gh-aw upgrade issue from v${pinned} to v${latest}: ${created.html_url}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { values } = parseArgs({
    options: {
      repo: { type: "string", default: "Azure/azure-sdk-for-js" },
      "dry-run": { type: "boolean", default: false },
      "verify-upgrade": { type: "string" },
    },
  });
  if (values["verify-upgrade"]) {
    try {
      await verifyUpgrade({ cwd: process.cwd(), latest: version(values["verify-upgrade"]) });
    } catch (error) {
      if (process.env.GH_AW_UPGRADE_GATE_LOG) {
        writeFileSync(process.env.GH_AW_UPGRADE_GATE_LOG, String(error?.message ?? error));
      }
      throw error;
    }
  } else {
    await checkUpgrade({
      setup: readFileSync(setupPath, "utf8"),
      repo: values.repo,
      dryRun: values["dry-run"],
    });
  }
}
