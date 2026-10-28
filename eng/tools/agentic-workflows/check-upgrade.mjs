// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import semver from "semver";
import { parse } from "yaml";

const setupPath = new URL("../../../.github/workflows/copilot-setup-steps.yml", import.meta.url);
const labels = ["agentic-workflows", "automated", "dependencies"];

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
}) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    throw new Error("Repository must have the form owner/repo");
  }
  if (!token) throw new Error("GH_TOKEN is required to access the GitHub API");
  const pinned = pinnedVersion(setup);
  const release = await requestGitHub("/repos/github/gh-aw/releases/latest", { token, fetchImpl });
  const latest = version(release.tag_name);
  if (release.draft || release.prerelease || !semver.gt(latest, pinned)) {
    log(`No upgrade needed: pinned v${pinned}, latest v${latest}.`);
    return;
  }

  const title = `[agentic-workflows] Upgrade gh-aw from v${pinned} to v${latest}`;
  let page = 1;
  while (true) {
    const issues = await requestGitHub(
      `/repos/${repo}/issues?state=open&per_page=100&page=${page}`,
      { token, fetchImpl },
    );
    if (!Array.isArray(issues)) throw new Error("GitHub API returned an invalid issues response");
    if (issues.some((issue) => !issue.pull_request && issue.title === title)) {
      log(`An open issue already exists: ${title}`);
      return;
    }
    if (issues.length < 100) break;
    page++;
  }

  const body =
    `The \`gh-aw\` CLI pinned in \`.github/workflows/copilot-setup-steps.yml\` is currently v${pinned}. ` +
    `The latest released version is [v${latest}](https://github.com/github/gh-aw/releases/tag/v${latest}).\n\n` +
    `Please use the **Agentic Workflows** custom agent to upgrade this repository to gh-aw v${latest}. ` +
    "The agent already knows how to perform this upgrade.";
  if (dryRun) {
    log(`Would create issue in ${repo}:\n${title}\n\n${body}`);
    return;
  }
  const created = await requestGitHub(`/repos/${repo}/issues`, {
    token,
    method: "POST",
    body: { title, body, labels },
    fetchImpl,
  });
  if (!created?.html_url) throw new Error("GitHub API issue response did not include html_url");
  log(created.html_url);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { values } = parseArgs({
    options: {
      repo: { type: "string", default: "Azure/azure-sdk-for-js" },
      "dry-run": { type: "boolean", default: false },
    },
  });
  await checkUpgrade({
    setup: readFileSync(setupPath, "utf8"),
    repo: values.repo,
    dryRun: values["dry-run"],
  });
}
