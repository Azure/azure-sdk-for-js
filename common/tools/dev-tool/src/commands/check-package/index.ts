// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import * as path from "node:path";
import { makeCommandInfo, leafCommand } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { ProjectInfo, resolveProject } from "../../util/resolveProject";

import { checkExperimentalApiUsage } from "./experimentalUsage";

const log = createPrinter("check");

export const commandInfo = makeCommandInfo(
  "check-package",
  "check an SDK package for a list of rules",
);

export default leafCommand(commandInfo, async () => {
  const packageInfo = await resolveProject(process.cwd());
  let hasError = false;
  for (const result of checkForAll(packageInfo)) {
    if (result.level === "error") {
      log.error(`[error] - ${result.message} - ${result.filepath}`);
      hasError = true;
    }
  }
  if (hasError) {
    log.error("failed checking the package. See above for issues.");
    return false;
  }

  log.info("all package checks passed.");
  return true;
});

function* checkForAll(packageInfo: ProjectInfo): Generator<Issue> {
  // package.json fields
  yield* checkPackageJsonAuthor(packageInfo);
  yield* checkPackageJsonBugs(packageInfo);
  yield* checkPackageJsonSideEffects(packageInfo);
  yield* checkPackageJsonSdkType(packageInfo);
  yield* checkPackageJsonRepo(packageInfo);
  yield* checkPackageJsonLicense(packageInfo);
  yield* checkPackageJsonKeywords(packageInfo);
  yield* checkPackageJsonHomepage(packageInfo);

  yield* checkExperimentalApiUsage(packageInfo, log);
}

/**
 * Checks a package.json field value
 * @param packageInfo
 * @param fieldGetter
 * @param expectedPredicate
 * @param issueLevel
 * @param fieldDescription
 * @returns
 */
function checkPackageJsonValue<TFieldValue>(
  packageInfo: ProjectInfo,
  fieldGetter: (packageInfo: ProjectInfo) => TFieldValue,
  expectedPredicate: (actual: TFieldValue) => boolean,
  issueLevel: IssueLevel,
  fieldDescription: string,
  expectedDescription: string,
): Issue | undefined {
  const actual = fieldGetter(packageInfo);
  if (!expectedPredicate(actual)) {
    return {
      level: issueLevel,
      message: `package.json's ${fieldDescription} should have value of ${expectedDescription}. The actual value is ${actual}`,
      filepath: path.join(packageInfo.path, "package.json"),
    };
  }
  return undefined;
}

function* checkPackageJsonAuthor(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson.author,
    (actual) => actual === "Microsoft Corporation",
    "error",
    "author",
    `"Microsoft Corporation"`,
  );
  if (r) {
    yield r;
  }
}

function* checkPackageJsonBugs(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson.bugs.url,
    (actual) => actual === "https://github.com/Azure/azure-sdk-for-js/issues",
    "error",
    "bugs url",
    `"https://github.com/Azure/azure-sdk-for-js/issues"`,
  );
  if (r) {
    yield r;
  }
}

function* checkPackageJsonRepo(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson.repository,
    (actual) => actual === "github:Azure/azure-sdk-for-js",
    "error",
    "repository",
    `"github:Azure/azure-sdk-for-js"`,
  );
  if (r) {
    yield r;
  }
}

function* checkPackageJsonLicense(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson.license,
    (actual) => actual === "MIT",
    "error",
    "license",
    `"MIT"`,
  );
  if (r) {
    yield r;
  }
}

function* checkPackageJsonSideEffects(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson.sideEffects,
    (actual) => actual === false,
    "warn",
    `"sideEffects"`,
    "false",
  );
  if (r) {
    yield r;
  }
}

function* checkPackageJsonSdkType(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson["sdk-type"],
    (actual) => ["client", "mgmt", "utility"].includes(actual ?? ""),
    "error",
    `"sdk-type"`,
    `one of "client", "mgmt", or "utility"`,
  );
  if (r) {
    yield r;
  }
}

function* checkPackageJsonKeywords(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson.keywords,
    (actual) => actual !== undefined && actual.includes("azure") && actual.includes("cloud"),
    "error",
    `"keywords"`,
    `"azure" and "cloud"`,
  );
  if (r) {
    yield r;
  }
}

function* checkPackageJsonHomepage(packageInfo: ProjectInfo): Generator<Issue> {
  const r = checkPackageJsonValue(
    packageInfo,
    (p) => p.packageJson.homepage,
    (actual) =>
      /^https:\/\/github.com\/Azure\/azure-sdk-for-js\/(blob|tree)\/main\/sdk\/(([a-z]+-)*[a-z]+\/)+(README\.md)?$/.test(
        actual,
      ),
    "warn",
    `"homepage"`,
    `matching the pattern "https:\\/\\/github.com\\/Azure\\/azure-sdk-for-js\\/(blob|tree)\\/main\\/sdk\\/(([a-z]+-)*[a-z]+\\/)+(README\\.md)?$/"`,
  );
  if (r) {
    yield r;
  }
}
