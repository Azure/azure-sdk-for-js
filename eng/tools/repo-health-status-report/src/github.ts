// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Octokit } from "octokit";
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getBaseDir } from "./env.js";
import type { PackagesWithStatus } from "./interfaces.js";

export type CustomerIssue = Awaited<
  ReturnType<Octokit["rest"]["issues"]["listForRepo"]>
>["data"][number];

// GitHub
let octokit: Octokit | undefined;
function getOctokit(): Octokit {
  if (octokit === undefined) {
    const gitHubToken = process.env.GH_TOKEN;
    if (!gitHubToken) {
      throw new Error("GH_TOKEN is not set. Please set it in your environment variables.");
    }

    octokit = new Octokit({
      auth: gitHubToken,
    });
  }

  return octokit;
}

export async function uploadResultToGitHubJsRepo(csvPath: string) {
  const octokit = getOctokit();

  const owner = "Azure";
  const repo = "azure-sdk-for-js";
  const branch = "js-sdk-health-report";
  const path = `eng/tools/repo-health-status-report/health_report.csv`;
  let sha: string | undefined;
  try {
    const file = await octokit.rest.repos.getContent({ owner, repo, path, ref: branch });
    if (Array.isArray(file.data)) {
      throw new Error(`Expected ${path} to be a file, but it is a directory.`);
    }
    sha = file.data.sha;
  } catch (error) {
    if (
      typeof error !== "object" ||
      error === null ||
      !("status" in error) ||
      error.status !== 404
    ) {
      throw error;
    }
  }
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    branch,
    path,
    sha,
    message: "Update health report",
    content: Buffer.from(await readFile(csvPath, "utf-8")).toString("base64"),
  });
  console.log(`Health report uploaded to azure-sdk-for-js ${path}`);
}

export async function getCustomerIssues(): Promise<CustomerIssue[]> {
  const issues: CustomerIssue[] = [];
  const octokit = getOctokit();

  const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: "Azure",
    repo: "azure-sdk-for-js",
    state: "open",
    labels: "customer-reported,Client",
    per_page: 100,
  });
  for await (const { data } of iterator) {
    issues.push(...data.filter((issue) => !issue.pull_request));
  }
  return issues;
}

export interface CodeownersMapping {
  dataplane: PackagesWithStatus;
  trackedLabels: Record<string, string[]>;
}

/**
 * Set PR labels from CODEOWNERS to the details of their packages.
 * @param dataplane - a map of package names to their details
 * @param content - the CODEOWNERS file content
 * @returns The labels that we are tracking
 */
export function mapCodeownersContentToLabels(
  dataplane: PackagesWithStatus,
  content: string,
): CodeownersMapping {
  const mappedDataplane = Object.fromEntries(
    Object.entries(dataplane).map(([packageName, details]) => [packageName, { ...details }]),
  );
  const trackedLabels: Record<string, string[]> = {};
  const lines = content.split("\n");
  let label = "";
  let count = 0;
  for (const line of lines) {
    if (line.includes("/review/")) {
      continue;
    }
    if (line.startsWith("# PRLabel:")) {
      label = line.slice("# PRLabel: %".length).trim();
    } else if (label !== "" && line.startsWith("/sdk/")) {
      const [serviceDir, packageDir] = line
        .split("@")[0]
        .split("/")
        .slice(2, 4)
        .map((part) => part.trim());
      if (label !== "Mgmt" && serviceDir && !serviceDir.includes("*")) {
        const serviceDirs = (trackedLabels[label] ??= []);
        if (!serviceDirs.includes(serviceDir)) {
          serviceDirs.push(serviceDir);
          count++;
        }
        for (const [packageName, details] of Object.entries(mappedDataplane)) {
          if (
            details.serviceDir === serviceDir &&
            (!packageDir || details.packageDir === packageDir)
          ) {
            console.log(`Setting label ${label} for package ${packageName}`);
            mappedDataplane[packageName] = { ...details, label };
          }
        }
      }
    } else if (line.startsWith("/")) {
      label = "";
    }
  }
  console.log(`Found ${count} tracked labels.`);
  console.dir(trackedLabels, { depth: 4 });
  console.dir(mappedDataplane, { depth: 4 });

  // Surface packages that never received a PRLabel from CODEOWNERS.
  const unlabeled = Object.keys(mappedDataplane).filter((pkg) => !mappedDataplane[pkg].label);
  if (unlabeled.length > 0) {
    console.warn(
      `Warning: ${unlabeled.length} package(s) have no matching PRLabel in CODEOWNERS and will leave SLA/customer issue fields blank: ${unlabeled.join(", ")}`,
    );
  }

  return { dataplane: mappedDataplane, trackedLabels };
}

export async function mapCodeownersToLabel(
  dataplane: PackagesWithStatus,
): Promise<CodeownersMapping> {
  const codeownersPath = join(getBaseDir(), ".github", "CODEOWNERS");
  const content = await readFile(codeownersPath, "utf-8");
  return mapCodeownersContentToLabels(dataplane, content);
}
