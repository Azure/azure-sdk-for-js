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
import { getCustomerIssues, mapCodeownersToLabel, uploadResultToGitHubJsRepo } from "./github.js";
import type { CustomerIssue } from "./github.js";

const DEVOPS_RESOURCE_UUID = "499b84ac-1321-427f-aa17-267ca6975798";

const RELEASE_BLOCKERS = ["lint", "ci"];

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
  "@azure/core-rest-pipeline",
  "@azure/core-sse",
  "@azure/core-tracing",
  "@azure/core-xml",
  "@azure/core-util",
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
  kind: "ci" | "tests" | "weeklyTests",
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
  } else if (kind === "weeklyTests") {
    const old = pipeline.weeklyTests;
    pipeline.weeklyTests = {
      ...old,
      result: status,
      weeklyTests: { status: status },
    };
  }
}

async function getBuildResult(
  buildKind: "ci" | "tests" | "weeklyTests",
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  if (!pipelineId) {
    console.warn(`No ${buildKind} pipeline ID found for ${pkgName}`);
    recordAllPipeline(buildKind, pipelines[pkgName], "UNKNOWN");
    return;
  }
  const buildResponse = await getBuild(pipelineId, token);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("continue after 1 seconds delay");
  const buildResult = (await buildResponse.json()) as AzureDevOpsListResponse<AzureDevOpsBuild>;
  if (!buildResponse.ok || !buildResult.value) {
    console.warn(`No ${buildKind} build found for ${pkgName}`);
    recordAllPipeline(buildKind, pipelines[pkgName], "UNKNOWN");
    return;
  }

  const result = buildResult.value[0];
  if (!result) {
    console.warn(`No ${buildKind} build result found for ${pkgName}`);
    recordAllPipeline(buildKind, pipelines[pkgName], "UNKNOWN");
    return;
  }

  const buildId = result.id;
  const pipelineResult: PipelineResult = {
    ...pipelines[pkgName][buildKind],
    id: buildId,
    link: result._links.web.href,
    buildNumber: result.buildNumber,
  };
  pipelines[pkgName][buildKind] = pipelineResult;

  if (result.result === "succeeded") {
    recordAllPipeline(buildKind, pipelines[pkgName], "succeeded");
    return;
  }

  pipelineResult.result = result.result;
  const timelineResponse = await getBuildTimeline(buildId, token);
  if (!timelineResponse.ok) {
    recordAllPipeline("tests", pipelines[pkgName], "UNKNOWN");
    return;
  }
  let timelineResult: AzureDevOpsTimeline;
  try {
    timelineResult = (await timelineResponse.json()) as AzureDevOpsTimeline;
  } catch (error) {
    console.warn("Error parsing timeline response:", error, buildId);
    recordAllPipeline("tests", pipelines[pkgName], "UNKNOWN");
    return;
  }
  for (const task of timelineResult.records ?? []) {
    const taskName = task.name ?? "";
    if (buildKind === "ci") {
      if (taskName.includes("Build libraries")) {
        recordTestResult(task, "build", pipelineResult);
      } else if (taskName.includes("Build ESLint Plugin and Lint Libraries")) {
        recordTestResult(task, "lint", pipelineResult);
      } else if (taskName.includes("Test libraries")) {
        recordTestResult(task, "ci", pipelineResult);
      }
    } else if (buildKind === "tests") {
      if (taskName.includes("Test libraries")) {
        recordTestResult(task, "tests", pipelineResult);
      } else if (taskName.includes("Execute Samples")) {
        recordTestResult(task, "samples", pipelineResult);
      }
    } else if (buildKind === "weeklyTests") {
      if (taskName.includes("Integration test libraries")) {
        recordTestResult(task, "weeklyTests", pipelineResult);
      }
    }
  }
}

async function getCiResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  await getBuildResult("ci", pkgName, pipelines, token, pipelineId);
}

async function getTestsResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  await getBuildResult("tests", pkgName, pipelines, token, pipelineId);
}

async function getWeeklyTestsResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  await getBuildResult("weeklyTests", pkgName, pipelines, token, pipelineId);
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
      } else if (`${packageDir} - tests-weekly` === pipelineNameWithoutJsPrefix) {
        pipelines[pkgName] = { ...original, weeklyTests: { id: p.id, link: "" } };
        recordAllPipeline("weeklyTests", pipelines[pkgName], "UNKNOWN");
      }
    }
  }
  return pipelines;
}

function reportOverallStatus(packageDetails: PackageStatus): void {
  let overallStatus: PackageStatusCode = "GOOD";
  for (const [check, status] of Object.entries(packageDetails)) {
    if (!RELEASE_BLOCKERS.includes(check)) {
      continue;
    }
    if (
      ["lint", "tests", "samples", "ci"].includes(check) &&
      (status as unknown as Status).status === "FAIL"
    ) {
      overallStatus = "BLOCKED";
      break;
    }
    if (
      ["lint", "tests", "samples", "ci"].includes(check) &&
      ["DISABLED", "WARNING", "UNKNOWN"].includes((status as unknown as Status).status)
    ) {
      overallStatus = "NEEDS_ACTION";
      break;
    }
  }
  packageDetails.status = overallStatus;
}

function reportTestResult(
  testKind: "ci" | "tests",
  pipeline: PipelineResults | undefined,
  packageDetails: PackageStatus,
): void {
  if (!pipeline) {
    console.warn(`No ${testKind} pipeline found for ${packageDetails.serviceDir}`);
    packageDetails[testKind] = { status: "UNKNOWN" };
    return;
  }
  const pipelineResult = pipeline[testKind];
  if (!pipelineResult) {
    console.warn(`No ${testKind} pipeline found for ${packageDetails.serviceDir}`);
    packageDetails[testKind] = { status: "UNKNOWN" };
    return;
  }
  const testStatus = pipelineResult[testKind]?.status;
  const old = packageDetails[testKind];
  if (testStatus === "succeeded") {
    packageDetails[testKind] = { ...old, status: "PASS", link: pipelineResult.link };
  } else if (testStatus === "failed") {
    packageDetails[testKind] = { ...old, status: "FAIL", link: pipelineResult.link };
  } else {
    packageDetails[testKind] = { ...old, status: "UNKNOWN", link: pipelineResult.link };
  }
}

function recordTotalCustomerIssues(
  dataplane: PackagesWithStatus,
  githubIssues: CustomerIssue[],
  trackedLabels: Record<string, string>,
): void {
  for (const issue of githubIssues) {
    for (const label of issue.labels) {
      const labelName = typeof label === "string" ? label : label.name;
      if (labelName && trackedLabels[labelName]) {
        const serviceDir = trackedLabels[labelName];
        const packages = Object.keys(dataplane).filter(
          (pkgName) => (dataplane[pkgName] as PackageStatus).serviceDir === serviceDir,
        );
        for (const pkgName of packages) {
          const packageDetails = dataplane[pkgName] as PackageStatus;
          if (labelName === packageDetails.label) {
            const customerIssues = (packageDetails.customerIssues ??= { num: 0, link: "" });
            customerIssues.num++;
            customerIssues.link = githubTotalIssueLink(labelName);
          }
        }
      }
    }
  }
}

function recordSlaStatus(
  dataplane: PackagesWithStatus,
  githubIssue: CustomerIssue,
  trackedLabels: Record<string, string>,
  timePeriod: number,
  kind: "question" | "bug",
): void {
  for (const label of githubIssue.labels) {
    const labelName = typeof label === "string" ? label : label.name;
    if (labelName && trackedLabels[labelName]) {
      const serviceDir = trackedLabels[labelName];
      const packages = Object.keys(dataplane).filter(
        (pkgName) => (dataplane[pkgName] as PackageStatus).serviceDir === serviceDir,
      );
      for (const pkgName of packages) {
        const packageDetails = dataplane[pkgName] as PackageStatus;
        if (labelName === packageDetails.label) {
          const sla = (packageDetails.sla ??= {
            question: {
              num: 0,
              link: githubIssueLinkUrl(
                labelName,
                "question",
                new Date(timePeriod).toISOString().split("T")[0],
              ),
            },
            bug: {
              num: 0,
              link: githubIssueLinkUrl(
                labelName,
                "bug",
                new Date(timePeriod).toISOString().split("T")[0],
              ),
            },
          });
          sla[kind].num++;
        }
      }
    }
  }
}

async function reportSlaAndTotalIssues(dataplane: PackagesWithStatus) {
  const trackedLabels = await mapCodeownersToLabel(dataplane);
  const issues = await getCustomerIssues();
  recordTotalCustomerIssues(dataplane, issues, trackedLabels);
  const filtered = issues.filter(
    (issue) =>
      !issue.labels.some((label) =>
        ["issue-addressed", "needs-author-feedback", "feature-request"].includes(
          typeof label === "string" ? label : (label.name ?? ""),
        ),
      ),
  );
  const today = Date.now();
  const thirtyDaysAgo = today - 30 * 24 * 60 * 60 * 1000;
  const ninetyDaysAgo = today - 90 * 24 * 60 * 60 * 1000;

  for (const issue of filtered) {
    const createdDate = new Date(issue.created_at);
    if (
      issue.labels.some((label) =>
        typeof label === "string" ? label === "question" : label.name === "question",
      ) &&
      createdDate.getTime() < thirtyDaysAgo
    ) {
      recordSlaStatus(dataplane, issue, trackedLabels, thirtyDaysAgo, "question");
    }
    if (
      issue.labels.some((label) =>
        typeof label === "string" ? label === "bug" : label.name === "bug",
      ) &&
      createdDate.getTime() < ninetyDaysAgo
    ) {
      recordSlaStatus(dataplane, issue, trackedLabels, ninetyDaysAgo, "bug");
    }
  }
}

function reportStatus(dataplane: PackagesWithStatus, pipelines: Record<string, PipelineResults>) {
  for (const [packageName, packageDetails] of Object.entries(dataplane)) {
    reportTestResult("tests", pipelines[packageName], packageDetails);
    reportTestResult("ci", pipelines[packageName], packageDetails);
    reportOverallStatus(packageDetails);
  }
}

const CSV_REPORT_FILE_NAME = "health_report.csv";

async function writeToCsv(
  dataplane: PackagesWithStatus,
  pipelines: Record<string, PipelineResults>,
): Promise<void> {
  // our weekly runs aren't too different from nightly runs for now so skipping them
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
    // "Tests - Live Weekly",
    // "Tests - Live Weekly Link",
    // "Weekly Build Number",
    "SLA - Questions",
    "SLA - Bugs",
    "Total Customer-reported Issues",
    "SLA - Questions Link",
    "SLA - Bugs Link",
    "Total Customer-reported Issues Link",
  ];
  const csvData = Object.entries(dataplane).map(([pkgName, pkgDetails]) => {
    const status = pkgDetails.status;
    return [
      pkgDetails.serviceDir,
      pkgName,
      status,
      SDK_OWNED.includes(pkgName) ? "YES" : "NO",
      pipelines[pkgName].ci?.ci?.status ?? "",
      pipelines[pkgName].ci?.link ?? "",
      pipelines[pkgName].ci?.buildNumber ?? "",
      pipelines[pkgName].tests?.tests?.status ?? "",
      pipelines[pkgName].tests?.link ?? "",
      pipelines[pkgName].tests?.buildNumber ?? "",
      // pipelines[pkgName].weeklyTests?.weeklyTests?.status ?? "",
      // pipelines[pkgName].weeklyTests?.link ?? "",
      // pipelines[pkgName].weeklyTests?.buildNumber ?? "",
      pkgDetails.sla?.question?.num ?? 0,
      pkgDetails.sla?.bug?.num ?? 0,
      pkgDetails.customerIssues?.num ?? 0,
      pkgDetails.sla?.question?.link ?? "",
      pkgDetails.sla?.bug?.link ?? "",
      pkgDetails.customerIssues?.link ?? "",
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

async function main() {
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

  const dataplane = await getDataplanePackages();
  const pipelines = await getPipelines(dataplane, token);

  for (const [pkgName, pipelineIds] of Object.entries(pipelines)) {
    await getCiResult(pkgName, pipelines, token, pipelineIds.ci?.id);
    await getTestsResult(pkgName, pipelines, token, pipelineIds.tests?.id);
    await getWeeklyTestsResult(pkgName, pipelines, token, pipelineIds.weeklyTests?.id);
  }

  reportStatus(dataplane as unknown as PackagesWithStatus, pipelines);

  await reportSlaAndTotalIssues(dataplane as unknown as PackagesWithStatus);

  await writeToCsv(dataplane as unknown as PackagesWithStatus, pipelines);

  if (runType() !== "unknown") {
    await uploadResultToGitHubJsRepo(CSV_REPORT_FILE_NAME);
  }
}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exit(1);
});
