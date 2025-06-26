// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Octokit } from "octokit";
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { PackageStatus, PackagesWithStatus } from "./interfaces.js";

// GitHub
let octokit = undefined;
function getOctokit() {
  if (octokit === undefined) {
    const gitHubToken = process.env.GITHUB_TOKEN;
    if (!gitHubToken) {
      throw new Error("GITHUB_TOKEN is not set. Please set it in your environment variables.");
    }

    octokit = new Octokit({
      auth: gitHubToken,
    });
  }

  return octokit;
}

export async function uploadResultToGitHubJsRepo(csvPath: string) {
  const octokit = getOctokit();
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  const path = `eng/tools/repo-health-status-report/health_report.csv`;
  await octokit.rest.repos.createOrUpdateFileContents({
    owner: login,
    repo: "azure-sdk-for-js",
    branch: "js-sdk-health-report",
    path,
    message: "Update health report",
    content: await readFile(csvPath, "utf-8"),
  });
  console.log(`Health report uploaded to azure-sdk-for-js ${path}`);
}

export async function getCustomerIssues() {
  const issues = [];
  const octokit = getOctokit();

  const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: "Azure",
    repo: "azure-sdk-for-js",
    state: "open",
    labels: "customer-reported,Client",
    per_page: 100,
  });
  for await (const { data } of iterator) {
    issues.push(...data);
  }
  return issues;
}

function tryGetPackageName(directory) {
  const trimmed = directory.trim();
  if (trimmed.endsWith("-rest") && trimmed !== "core-client-rest") {
    return `@azure-rest/${trimmed.slice(0, -5)}`;
  } else if (trimmed !== "" && trimmed !== "perf-tests") {
    return `@azure/${trimmed}`;
  } else {
    return "";
  }
}

/**
 * Set PR labels from CODEOWNERS to the details of their packages.
 * @param dataplane - a map of package names to their details
 * @returns The labels that we are tracking
 */
export async function mapCodeownersToLabel(dataplane: PackagesWithStatus) {
  const octokit = getOctokit();
  const { data: codeOwners } = await octokit.rest.repos.getContent({
    owner: "Azure",
    repo: "azure-sdk-for-js",
    path: ".github/CODEOWNERS",
  });

  // base64 decode the content
  const content = Buffer.from(codeOwners.content, codeOwners.encoding).toString("utf-8");
  const trackedLabels = {};
  const lines = content.split("\n");
  let label = "";
  let count = 0;
  for (const line of lines) {
    if (line.includes("/review/")) {
      continue;
    }
    if (line.startsWith("# PRLabel:")) {
      label = line.split("# PRLabel: %")[1].trim();
    }
    if (label !== "" && line.startsWith("/sdk/")) {
      const parts = line.split("@")[0].split("/").slice(2, 4);
      if (label !== "Mgmt") {
        if (parts[0]) {
          trackedLabels[label] = parts[0];
          count++;
        }
        const packageName = tryGetPackageName(parts[1]);
        if (packageName) {
          console.log(`Setting label ${label} for package ${packageName}`);
          if (dataplane[packageName]) {
            dataplane[packageName].label = label;
          }
        } else {
          // no particular package for that label then all packages under the service directory share the label
          const packageNames = Object.keys(dataplane).filter(
            (pkg) => (dataplane[pkg] as PackageStatus).serviceDir === parts[0],
          );
          for (const pkg of packageNames) {
            console.log(`Setting label ${label} under ${parts[0]} for package ${pkg}`);
            (dataplane[pkg] as PackageStatus).label = label;
          }
        }
      }
    } else if (label !== "" && (line.startsWith("/common") || line.startsWith("/eng"))) {
      // non-sdk, skipping
      label = "";
      continue;
    }
  }
  console.log(`Found ${count} tracked labels.`);
  console.dir(trackedLabels, { depth: 4 });
  console.dir(dataplane, { depth: 4 });

  return trackedLabels;
}
