// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getDataplanePackages } from "./packages.js";
import {
  getAllDevopsBuilds,
  getBuildTimeline,
  getBuild,
  githubTotalIssueLink,
  githubIssueLinkUrl,
} from "./urlHelpers.js";
import type {
  AzureDevOpsBuild,
  AzureDevOpsListResponse,
  AzureDevOpsTimeline,
  AzureDevOpsTimelineRecord,
  DevopsTaskStatus,
  PackageInfo,
  Packages,
  PackageStatus,
  PackageStatusCode,
  PackagesWithStatus,
  PipelineResult,
  PipelineResults,
  PipelineTaskKind,
  Status,
} from "./interfaces.js";

import "dotenv/config";
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { getCustomerIssues, mapCodeownersToLabel, uploadResultToGitHubJsRepo } from "./github.js";
import type { CustomerIssue } from "./github.js";

const DEVOPS_RESOURCE_UUID = "499b84ac-1321-427f-aa17-267ca6975798";

const RELEASE_BLOCKERS = ["lint", "ci"] as const;

type BuildKind = "ci" | "tests";
type BuildResultCache = Map<string, Promise<PipelineResult>>;

const SDK_OWNED = [
  "@azure/container-registry",
  // core
  "@azure/abort-controller",
  "@azure-rest/core-client",
  "@azure/core-auth",
  "@azure/core-amqp",
  "@azure/core-client",
  "@azure/core-http-compat",
  "@azure/core-lro",
  "@azure/core-paging",
  "@azure/core-process",
  "@azure/core-rest-pipeline",
  "@azure/core-sse",
  "@azure/core-tracing",
  "@azure/core-xml",
  "@azure/core-util",
  "@azure/provisioning-core",
  "@azure/logger",
  "@typespec/ts-http-runtime",

  // identity
  "@azure/identity",
  "@azure/identity-broker",
  "@azure/identity-cache-persistence",
  "@azure/identity-vscode",

  "@azure/opentelemetry-instrumentation-azure-sdk",

  "@azure/notification-hubs",

  "@azure/data-tables",

  "@azure/template-dpg",
  "@azure/template",
];

function runType() {
  if (process.env.TF_BUILD) {
    return "azure-devops";
  } else if (process.env.CI) {
    return "github-actions";
  } else {
    return "unknown";
  }
}

function recordTestResult(
  task: AzureDevOpsTimelineRecord,
  runTaskKind: PipelineTaskKind,
  pipeline: PipelineResult,
): void {
  const old = pipeline[runTaskKind] ?? { status: "UNKNOWN" };
  const taskResult = task.result ?? "UNKNOWN";
  const unsuccessful: DevopsTaskStatus[] = [
    "failed",
    "canceled",
    "abandoned",
    "skipped",
    "succeededWithIssues",
  ];
  if (taskResult === "succeeded") {
    if (!unsuccessful.includes(old.status)) {
      // None of same task from other legs has issues so far
      pipeline[runTaskKind] = { ...old, status: "succeeded" };
    }
  } else if (taskResult === "failed") {
    pipeline[runTaskKind] = { ...old, status: "failed", log: task.log?.url ?? old.log };
  } else if (
    old.status !== "failed" &&
    (taskResult !== "skipped" || task.resultCode !== "Skipping step due to condition evaluation.")
  ) {
    pipeline[runTaskKind] = { ...old, status: taskResult, log: task.log?.url ?? old.log };
  }
}

function recordAllPipeline(
  kind: BuildKind,
  pipeline: PipelineResults,
  status: "succeeded" | "UNKNOWN",
): void {
  if (kind === "ci") {
    const old = pipeline.ci;
    pipeline.ci = {
      ...old,
      result: status,
      lint: { status: status },
      ci: { status: status },
    };
  } else if (kind === "tests") {
    const old = pipeline.tests;
    pipeline.tests = {
      ...old,
      result: status,
      tests: { status: status },
      samples: { status: status },
    };
  }
}

async function fetchBuildResult(
  buildKind: BuildKind,
  pkgName: string,
  token: string,
  pipelineId: number,
): Promise<PipelineResult> {
  const pipeline: PipelineResults = {
    [buildKind]: { id: pipelineId, link: "" },
  };
  const markUnknown = (): PipelineResult => {
    recordAllPipeline(buildKind, pipeline, "UNKNOWN");
    return pipeline[buildKind]!;
  };

  let buildResponse: Response;
  try {
    buildResponse = await getBuild(pipelineId, token);
  } catch (error) {
    console.warn(`Transport error fetching ${buildKind} build for ${pkgName}:`, error);
    return markUnknown();
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("continue after 1 seconds delay");
  if (!buildResponse.ok) {
    console.warn(`No ${buildKind} build found for ${pkgName}`);
    return markUnknown();
  }
  let buildResult: AzureDevOpsListResponse<AzureDevOpsBuild>;
  try {
    buildResult = (await buildResponse.json()) as AzureDevOpsListResponse<AzureDevOpsBuild>;
  } catch (error) {
    console.warn("Error parsing build response:", error, pipelineId);
    return markUnknown();
  }
  if (!buildResult.value) {
    console.warn(`No ${buildKind} build found for ${pkgName}`);
    return markUnknown();
  }

  const result = buildResult.value[0];
  if (!result) {
    console.warn(`No ${buildKind} build result found for ${pkgName}`);
    return markUnknown();
  }

  const buildId = result.id;
  const pipelineResult: PipelineResult = {
    ...pipeline[buildKind],
    id: buildId,
    link: result._links.web.href,
    buildNumber: result.buildNumber,
  };
  pipeline[buildKind] = pipelineResult;

  pipelineResult.result = result.result;
  let timelineResponse: Response;
  try {
    timelineResponse = await getBuildTimeline(buildId, token);
  } catch (error) {
    console.warn(`Transport error fetching ${buildKind} timeline for ${pkgName}:`, error);
    return markUnknown();
  }
  if (!timelineResponse.ok) {
    return markUnknown();
  }
  let timelineResult: AzureDevOpsTimeline;
  try {
    timelineResult = (await timelineResponse.json()) as AzureDevOpsTimeline;
  } catch (error) {
    console.warn("Error parsing timeline response:", error, buildId);
    return markUnknown();
  }
  for (const task of timelineResult.records ?? []) {
    const taskName = task.name ?? "";
    if (buildKind === "ci") {
      if (
        taskName.includes("Build libraries") ||
        taskName.includes("Copy Packages") ||
        taskName.includes("Create and Validate API Review")
      ) {
        recordTestResult(task, "build", pipelineResult);
      } else if (
        taskName.includes("Build ESLint Plugin and Lint Libraries") ||
        taskName.includes("Build Lint Prerequisites and Lint Libraries")
      ) {
        recordTestResult(task, "lint", pipelineResult);
      } else if (
        taskName.includes("Test libraries") ||
        taskName.includes("Integration test libraries")
      ) {
        recordTestResult(task, "ci", pipelineResult);
      }
    } else if (buildKind === "tests") {
      if (taskName.includes("Test libraries") || taskName.includes("Integration test libraries")) {
        recordTestResult(task, "tests", pipelineResult);
      } else if (taskName.includes("Execute Samples")) {
        recordTestResult(task, "samples", pipelineResult);
      }
    }
  }
  return pipelineResult;
}

export async function getBuildResult(
  buildKind: BuildKind,
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
  cache?: BuildResultCache,
): Promise<void> {
  if (!pipelineId) {
    // No matching pipeline definition exists for this kind. Do not synthesize a
    // pipeline entry: leaving pipelines[pkgName][buildKind] undefined keeps the
    // CSV existence check emitting blank fields for the unmatched pipeline.
    // reportTestResult still marks the package's check as UNKNOWN.
    console.warn(`No ${buildKind} pipeline ID found for ${pkgName}`);
    return;
  }

  const cacheKey = `${buildKind}:${pipelineId}`;
  let result = cache?.get(cacheKey);
  if (!result) {
    result = fetchBuildResult(buildKind, pkgName, token, pipelineId);
    cache?.set(cacheKey, result);
  }
  pipelines[pkgName][buildKind] = await result;
}

async function getCiResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
  cache?: BuildResultCache,
) {
  await getBuildResult("ci", pkgName, pipelines, token, pipelineId, cache);
}

async function getTestsResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
  cache?: BuildResultCache,
) {
  await getBuildResult("tests", pkgName, pipelines, token, pipelineId, cache);
}

/**
 * Retrieves the "js - ..." pipelines from Azure DevOps.
 */
async function getPipelines(
  dataplane: Packages,
  authToken: string,
): Promise<Record<string, PipelineResults>> {
  const responseJson = await getAllDevopsBuilds(authToken);

  // const responseJson = JSON.parse(readFileSync("./pipelines-static.json", "utf-8"));

  const jsPipelines = responseJson.value.filter((p) => p.name.startsWith("js -"));
  const pipelines: Record<string, PipelineResults> = {};
  for (const p of jsPipelines) {
    if (!p.name.includes("js - ") || p.name.includes(" - mgmt")) {
      continue;
    }
    const pipelineNameWithoutJsPrefix = p.name.split("js - ")[1];
    for (const [pkgName, pkgMetadata] of Object.entries(dataplane)) {
      const { serviceDir, packageDir } = pkgMetadata;
      const original = pipelines[pkgName];
      if (serviceDir === pipelineNameWithoutJsPrefix) {
        pipelines[pkgName] = { ...original, ci: { id: p.id, link: "" } };
        recordAllPipeline("ci", pipelines[pkgName], "UNKNOWN");
      } else if (`${packageDir} - tests` === pipelineNameWithoutJsPrefix) {
        pipelines[pkgName] = { ...original, tests: { id: p.id, link: "" } };
        recordAllPipeline("tests", pipelines[pkgName], "UNKNOWN");
      }
    }
  }
  return pipelines;
}

function reportOverallStatus(packageDetails: PackageStatus): PackageStatusCode {
  const blockerStatuses = RELEASE_BLOCKERS.map((check) => packageDetails[check].status);
  return blockerStatuses.some((status) => status === "FAIL")
    ? "BLOCKED"
    : blockerStatuses.some((status) => status === "WARNING" || status === "UNKNOWN")
      ? "NEEDS_ACTION"
      : "GOOD";
}

function getReportedCheck(
  testKind: "ci" | "lint" | "samples" | "tests",
  pipeline: PipelineResults | undefined,
  packageDetails: PackageStatus,
): Status {
  const pipelineKind = testKind === "lint" ? "ci" : testKind === "samples" ? "tests" : testKind;
  if (!pipeline) {
    console.warn(`No ${testKind} pipeline found for ${packageDetails.serviceDir}`);
    return { status: "UNKNOWN" };
  }
  const pipelineResult = pipeline[pipelineKind];
  if (!pipelineResult) {
    console.warn(`No ${testKind} pipeline found for ${packageDetails.serviceDir}`);
    return { status: "UNKNOWN" };
  }
  let testStatus = pipelineResult[testKind]?.status;
  if (testKind === "ci") {
    if (pipelineResult.build?.status === "failed" || testStatus === "failed") {
      testStatus = "failed";
    } else if (
      pipelineResult.result === "partiallySucceeded" ||
      pipelineResult.build?.status === "succeededWithIssues" ||
      testStatus === "succeededWithIssues"
    ) {
      testStatus = "succeededWithIssues";
    } else if (
      pipelineResult.result === "failed" &&
      (pipelineResult.build?.status !== "succeeded" || testStatus !== "succeeded")
    ) {
      testStatus = "UNKNOWN";
    } else if (
      pipelineResult.result &&
      pipelineResult.result !== "succeeded" &&
      pipelineResult.result !== "failed"
    ) {
      testStatus = "UNKNOWN";
    } else if (testStatus === undefined && pipelineResult.result === "succeeded") {
      return { status: "DISABLED", link: pipelineResult.link };
    }
  }
  if (testStatus === "succeeded") {
    return { status: "PASS", link: pipelineResult.link };
  } else if (testStatus === "failed") {
    return { status: "FAIL", link: pipelineResult.link };
  } else if (testStatus === "succeededWithIssues") {
    return { status: "WARNING", link: pipelineResult.link };
  } else {
    return { status: "UNKNOWN", link: pipelineResult.link };
  }
}

export function recordTotalCustomerIssues(
  dataplane: PackagesWithStatus,
  githubIssues: Pick<CustomerIssue, "labels">[],
  trackedLabels: Record<string, string[]>,
): PackagesWithStatus {
  const updatedDataplane = Object.fromEntries(
    Object.entries(dataplane).map(([packageName, details]) => [
      packageName,
      {
        ...details,
        customerIssues: details.customerIssues ? { ...details.customerIssues } : undefined,
      },
    ]),
  );
  for (const issue of githubIssues) {
    for (const label of issue.labels) {
      const labelName = typeof label === "string" ? label : label.name;
      if (labelName && trackedLabels[labelName]) {
        const serviceDirs = trackedLabels[labelName];
        const packages = Object.keys(updatedDataplane).filter((pkgName) =>
          serviceDirs.includes(updatedDataplane[pkgName].serviceDir),
        );
        for (const pkgName of packages) {
          const packageDetails = updatedDataplane[pkgName];
          if (labelName === packageDetails.label) {
            updatedDataplane[pkgName] = {
              ...packageDetails,
              customerIssues: {
                num: (packageDetails.customerIssues?.num ?? 0) + 1,
                link: githubTotalIssueLink(labelName),
              },
            };
          }
        }
      }
    }
  }
  return updatedDataplane;
}

function recordSlaStatus(
  dataplane: PackagesWithStatus,
  githubIssue: Pick<CustomerIssue, "labels">,
  trackedLabels: Record<string, string[]>,
  timePeriod: number,
  kind: "question" | "bug",
): void {
  for (const label of githubIssue.labels) {
    const labelName = typeof label === "string" ? label : label.name;
    if (labelName && trackedLabels[labelName]) {
      const serviceDirs = trackedLabels[labelName];
      const packages = Object.keys(dataplane).filter((pkgName) =>
        serviceDirs.includes(dataplane[pkgName].serviceDir),
      );
      for (const pkgName of packages) {
        const packageDetails = dataplane[pkgName];
        if (labelName === packageDetails.label) {
          const sla = packageDetails.sla ?? {
            question: { num: 0, link: "" },
            bug: { num: 0, link: "" },
          };
          dataplane[pkgName] = {
            ...packageDetails,
            sla: {
              ...sla,
              [kind]: {
                num: sla[kind].num + 1,
                // Derive each kind's link from that kind's own threshold so the CSV
                // link reproduces the same count window it is reported against.
                link: githubIssueLinkUrl(
                  labelName,
                  kind,
                  new Date(timePeriod).toISOString().split("T")[0],
                ),
              },
            },
          };
        }
      }
    }
  }
}

async function reportSlaAndTotalIssues(dataplane: PackagesWithStatus): Promise<PackagesWithStatus> {
  const { dataplane: labeledDataplane, trackedLabels } = await mapCodeownersToLabel(dataplane);
  const issues = await getCustomerIssues();
  const dataplaneWithIssueTotals = recordTotalCustomerIssues(
    labeledDataplane,
    issues,
    trackedLabels,
  );
  return recordSlaForIssues(dataplaneWithIssueTotals, issues, trackedLabels);
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Normalizes a timestamp to the start (midnight) of its UTC day.
 *
 * The GitHub issue link truncates the cutoff to a `YYYY-MM-DD` date, which
 * GitHub interprets as UTC midnight. Flooring the counting cutoff to the same
 * UTC day boundary keeps the reported count and its linked query in sync.
 */
export function toUtcDayStart(timestamp: number): number {
  const date = new Date(timestamp);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/**
 * Counts open customer issues that have breached their SLA window and records
 * both the count and the matching GitHub query link per package.
 *
 * @param now - reference time used to derive the SLA cutoffs; defaults to the
 * current time and is injectable for deterministic tests.
 */
export function recordSlaForIssues(
  dataplane: PackagesWithStatus,
  issues: Pick<CustomerIssue, "labels" | "created_at">[],
  trackedLabels: Record<string, string[]>,
  now: number = Date.now(),
): PackagesWithStatus {
  const updatedDataplane = Object.fromEntries(
    Object.entries(dataplane).map(([packageName, details]) => [
      packageName,
      {
        ...details,
        sla: details.sla
          ? {
              question: { ...details.sla.question },
              bug: { ...details.sla.bug },
            }
          : undefined,
      },
    ]),
  );
  const filtered = issues.filter(
    (issue) =>
      !issue.labels.some((label) =>
        ["issue-addressed", "needs-author-feedback", "feature-request"].includes(
          typeof label === "string" ? label : (label.name ?? ""),
        ),
      ),
  );
  // Floor each cutoff to UTC midnight so the counting window matches the
  // truncated YYYY-MM-DD date used by the GitHub query link.
  const thirtyDaysAgo = toUtcDayStart(now - 30 * DAY_IN_MS);
  const ninetyDaysAgo = toUtcDayStart(now - 90 * DAY_IN_MS);

  for (const issue of filtered) {
    const createdDate = new Date(issue.created_at);
    if (
      issue.labels.some((label) =>
        typeof label === "string" ? label === "question" : label.name === "question",
      ) &&
      createdDate.getTime() < thirtyDaysAgo
    ) {
      recordSlaStatus(updatedDataplane, issue, trackedLabels, thirtyDaysAgo, "question");
    }
    if (
      issue.labels.some((label) =>
        typeof label === "string" ? label === "bug" : label.name === "bug",
      ) &&
      createdDate.getTime() < ninetyDaysAgo
    ) {
      recordSlaStatus(updatedDataplane, issue, trackedLabels, ninetyDaysAgo, "bug");
    }
  }
  return updatedDataplane;
}

export function reportStatus(
  dataplane: PackagesWithStatus,
  pipelines: Record<string, PipelineResults>,
): PackagesWithStatus {
  return Object.fromEntries(
    Object.entries(dataplane).map(([packageName, packageDetails]) => {
      const updatedPackage: PackageStatus = {
        ...packageDetails,
        tests: getReportedCheck("tests", pipelines[packageName], packageDetails),
        samples: getReportedCheck("samples", pipelines[packageName], packageDetails),
        ci: getReportedCheck("ci", pipelines[packageName], packageDetails),
        lint: getReportedCheck("lint", pipelines[packageName], packageDetails),
      };
      return [
        packageName,
        {
          ...updatedPackage,
          status: reportOverallStatus(updatedPackage),
        },
      ];
    }),
  );
}

const CSV_REPORT_FILE_NAME = "health_report.csv";

export async function writeToCsv(
  dataplane: PackagesWithStatus,
  pipelines: Record<string, PipelineResults>,
): Promise<void> {
  const columnNames = [
    "Service Directory",
    "Package",
    "Status",
    "Owned by SDK team",
    "CI",
    "CI Link",
    "CI Build Number",
    "Live Tests",
    "Live Tests Link",
    "Live Tests Build Number",
    "SLA - Questions",
    "SLA - Bugs",
    "Total Customer-reported Issues",
    "SLA - Questions Link",
    "SLA - Bugs Link",
    "Total Customer-reported Issues Link",
    // Append new columns so existing tools that consume earlier fields by
    // position are not broken.
    "Lint",
    "Lint Link",
    "Samples",
    "Samples Link",
  ];
  const csvData = Object.entries(dataplane).map(([pkgName, pkgDetails]) => {
    const status = pkgDetails.status;
    return [
      pkgDetails.serviceDir,
      pkgName,
      status,
      pkgDetails.sdkOwned ? "YES" : "NO",
      // Use the normalized CI status from reportStatus rather than the raw
      // Azure DevOps value, keeping the blank for packages with no CI pipeline.
      pipelines[pkgName]?.ci ? (pkgDetails.ci?.status ?? "") : "",
      pipelines[pkgName]?.ci?.link ?? "",
      pipelines[pkgName]?.ci?.buildNumber ?? "",
      // Same for live tests: emit the normalized status for matched pipelines.
      pipelines[pkgName]?.tests ? (pkgDetails.tests?.status ?? "") : "",
      pipelines[pkgName]?.tests?.link ?? "",
      pipelines[pkgName]?.tests?.buildNumber ?? "",
      pkgDetails.label ? (pkgDetails.sla?.question?.num ?? 0) : "",
      pkgDetails.label ? (pkgDetails.sla?.bug?.num ?? 0) : "",
      pkgDetails.label ? (pkgDetails.customerIssues?.num ?? 0) : "",
      pkgDetails.label ? (pkgDetails.sla?.question?.link ?? "") : "",
      pkgDetails.label ? (pkgDetails.sla?.bug?.link ?? "") : "",
      pkgDetails.label ? (pkgDetails.customerIssues?.link ?? "") : "",
      // Lint is a release blocker sourced from the CI pipeline. Preserve a
      // blank for unmatched pipelines; otherwise emit the normalized status.
      pipelines[pkgName]?.ci ? (pkgDetails.lint?.status ?? "") : "",
      pipelines[pkgName]?.ci ? (pkgDetails.lint?.link ?? "") : "",
      pipelines[pkgName]?.tests ? (pkgDetails.samples?.status ?? "") : "",
      pipelines[pkgName]?.tests ? (pkgDetails.samples?.link ?? "") : "",
    ].join(",");
  });
  await writeFile(
    CSV_REPORT_FILE_NAME,
    `${columnNames.join(",")}
${csvData.join("\n")}
`,
    "utf-8",
  );
  console.log(`CSV report written to ${CSV_REPORT_FILE_NAME}`);
}

export function createPackageStatuses(packages: Packages): PackagesWithStatus {
  return Object.fromEntries(
    Object.entries(packages).map(([packageName, packageInfo]: [string, PackageInfo]) => [
      packageName,
      {
        ...packageInfo,
        status: "GOOD",
        path: packageInfo.projectPath.replace(/\/package\.json$/, ""),
        sdkOwned: SDK_OWNED.includes(packageName),
        lint: { status: "UNKNOWN" },
        tests: { status: "UNKNOWN" },
        samples: { status: "UNKNOWN" },
        ci: { status: "UNKNOWN" },
      },
    ]),
  );
}

export function shouldUpload(args: string[]): boolean {
  return args.includes("--upload");
}

async function main(args: string[] = process.argv.slice(2)) {
  let token;
  if (runType() !== "unknown") {
    token = process.env["SYSTEM_ACCESSTOKEN"];
    if (!token) {
      throw new Error(`using SYSTEM_ACCESSTOKEN but it is not available`);
    }
  } else {
    const { DefaultAzureCredential } = await import("@azure/identity");
    const credential = new DefaultAzureCredential();
    token = (await credential.getToken(`${DEVOPS_RESOURCE_UUID}/.default`)).token;
  }

  let dataplane = createPackageStatuses(await getDataplanePackages());
  const pipelines = await getPipelines(dataplane, token);
  const buildResultCache: BuildResultCache = new Map();

  for (const [pkgName, pipelineIds] of Object.entries(pipelines)) {
    await getCiResult(pkgName, pipelines, token, pipelineIds.ci?.id, buildResultCache);
    await getTestsResult(pkgName, pipelines, token, pipelineIds.tests?.id, buildResultCache);
  }

  dataplane = reportStatus(dataplane, pipelines);

  dataplane = await reportSlaAndTotalIssues(dataplane);

  await writeToCsv(dataplane, pipelines);

  if (shouldUpload(args)) {
    await uploadResultToGitHubJsRepo(CSV_REPORT_FILE_NAME);
  }
}

const entryPoint = process.argv[1];
if (entryPoint && import.meta.url === pathToFileURL(entryPoint).href) {
  main().catch((err) => {
    console.error("Error in main:", err);
    process.exit(1);
  });
}
