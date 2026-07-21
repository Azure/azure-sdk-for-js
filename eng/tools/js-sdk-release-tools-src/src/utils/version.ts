import { logger } from "./logger.js";
import { inc as semverInc } from "semver";
import { ApiVersionType } from "../common/types.js";

function getDistTags(npmViewResult: Record<string, unknown>): Record<string, string> | undefined {
  const distTags = npmViewResult["dist-tags"];
  if (!isStringStringRecord(distTags)) {
    logger.warn(`Failed to get expected dist-tags record.`);
    return undefined;
  }
  return distTags;
}

function isStringStringRecord(record: unknown): record is Record<string, string> {
  return (
    record !== undefined &&
    record !== null &&
    typeof record === "object" &&
    !Array.isArray(record) &&
    Object.entries(record).every(([k, v]) => typeof k === "string" && typeof v === "string")
  );
}

export function getUsedVersions(npmViewResult: Record<string, unknown>): string[] {
  const versions = npmViewResult["versions"];
  if (typeof versions !== "object" || versions === null) return [];
  return Object.keys(versions);
}

export function getVersion(
  npmViewResult: Record<string, unknown>,
  tag: string,
): string | undefined {
  const distTags = getDistTags(npmViewResult);
  return distTags ? distTags[tag] : undefined;
}

export function getversionDate(npmViewResult: Record<string, unknown>, version: string) {
  const time = npmViewResult["time"];
  if (!isStringStringRecord(time)) {
    logger.error(`Failed to get expected time record.`);
    return undefined;
  }
  return time[version];
}

/**
 * Get the latest preview version from both "beta" and "next" distribution tags
 * @param npmViewResult The result from npm view command
 * @returns The latest preview version or undefined if no preview version exists
 */
export function getNextBetaVersion(
  npmViewResult: Record<string, unknown> | undefined,
): string | undefined {
  if (!npmViewResult) {
    return undefined;
  }

  const betaVersion = getVersion(npmViewResult, "beta");
  const nextVersion = getVersion(npmViewResult, "next");

  // If only one version exists, return it
  if (!betaVersion) return nextVersion;
  if (!nextVersion) return betaVersion;

  // If both versions exist, compare their dates and return the more recent one
  const betaDate = getversionDate(npmViewResult, betaVersion);
  const nextDate = getversionDate(npmViewResult, nextVersion);

  if (betaDate && nextDate) {
    return betaDate > nextDate ? betaVersion : nextVersion;
  }

  // If dates can't be compared, prefer betaVersion as default
  return betaVersion;
}

// NOTE: The latest tag used to contains beta version when there's the sdk is not GA.
//       The latest tag will only contains stable version in the future.
//       So if the package is not GA, we need to get latest version from beta tag.
export function getLatestStableVersion(npmViewResult: Record<string, unknown>) {
  const distTags = getDistTags(npmViewResult);
  if (!distTags) return undefined;
  const latestVersion = distTags["latest"];
  const betaVersion = distTags["beta"];
  // A latestVersion with a non-beta prerelease identifier (e.g. alpha) is not
  // suitable as a comparison baseline.  Prefer a published beta in that case.
  const isLatestComparable =
    latestVersion && (!latestVersion.includes("-") || latestVersion.includes("beta"));
  if (isLatestComparable) return latestVersion;
  if (betaVersion) return betaVersion;
  if (latestVersion) return latestVersion;
  logger.warn(`Failed to find latest or beta version found in dist-tags.`);
  return undefined;
}

export function isBetaVersion(stableVersion: string) {
  return stableVersion.includes("beta");
}

export function shouldTreatAsFirstRelease(
  npmViewResult: Record<string, unknown> | undefined,
  stableVersion: string | undefined,
  isStableRelease: boolean,
): boolean {
  // Brand-new package: no npm registry entry at all → initial first release
  if (!npmViewResult) return true;

  // Package exists on npm but has never had a stable/beta version (only e.g. next tags)
  if (!stableVersion) return true;

  // The published version uses a non-standard prerelease identifier (e.g. alpha, rc).
  // Only pure stable ("1.0.0") and beta ("1.0.0-beta.1") can be diffed for changelog generation.
  // Covers scenarios: alpha → beta, alpha → stable.
  const isComparable = !stableVersion.includes("-") || stableVersion.includes("beta");
  if (!isComparable) return true;

  // The latest published version is a beta and the current release targets stable →
  // package has never GA'd, so treat this as the first true stable release.
  if (isBetaVersion(stableVersion) && isStableRelease) return true;

  return false;
}

export function bumpMajorVersion(version: string, usedVersions: string[] | undefined) {
  let newVersion = semverInc(version, "major", "beta");
  while (usedVersions && usedVersions.includes(newVersion)) {
    newVersion = semverInc(newVersion, "major", "beta");
  }
  return newVersion;
}

export function bumpMinorVersion(version: string, usedVersions: string[] | undefined) {
  let newVersion = semverInc(version, "minor", "beta");
  while (usedVersions && usedVersions.includes(newVersion)) {
    newVersion = semverInc(newVersion, "minor", "beta");
  }
  return newVersion;
}

export function bumpPatchVersion(version: string, usedVersions: string[] | undefined) {
  let newVersion = semverInc(version, "patch", "beta");
  while (usedVersions && usedVersions.includes(newVersion)) {
    newVersion = semverInc(newVersion, "patch", "beta");
  }
  return newVersion;
}

export function bumpPreviewVersion(version: string, usedVersions: string[] | undefined) {
  let newVersion = semverInc(version, "pre", "beta");
  if (newVersion.endsWith("beta.0")) {
    // we should start from beta.1
    return bumpPreviewVersion(newVersion, usedVersions);
  }
  while (usedVersions && usedVersions.includes(newVersion)) {
    newVersion = semverInc(newVersion, "pre", "beta");
  }
  return newVersion;
}

export function getNewVersion(
  stableVersion: string | undefined,
  usedVersions: string[] | undefined,
  hasBreakingChange,
  isStableRelease: boolean,
): string {
  if (!stableVersion) {
    logger.error(`Invalid stableVersion '${stableVersion}'.`);
    process.exit(1);
  }
  if (isStableRelease) {
    if (hasBreakingChange) {
      return bumpMajorVersion(stableVersion, usedVersions);
    } else {
      return bumpMinorVersion(stableVersion, usedVersions);
    }
  } else {
    if (isBetaVersion(stableVersion)) {
      return bumpPreviewVersion(stableVersion, usedVersions);
    } else {
      if (hasBreakingChange) {
        return bumpPreviewVersion(bumpMajorVersion(stableVersion, usedVersions), usedVersions);
      } else {
        return bumpPreviewVersion(bumpMinorVersion(stableVersion, usedVersions), usedVersions);
      }
    }
  }
}

export async function isStableSDKReleaseType(
  apiVersionType: string,
  options: { apiVersion: string | undefined; sdkReleaseType: string | undefined },
) {
  let isStableRelease = apiVersionType != ApiVersionType.Preview;
  if (options.sdkReleaseType) {
    logger.info(
      `Detected appVersion is ${options.apiVersion}, sdkReleaseType is ${options.sdkReleaseType}`,
    );
    isStableRelease = options.sdkReleaseType == "stable";
  }
  return isStableRelease;
}
