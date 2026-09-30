import { vi } from "vitest";

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const generateTestNpmView = (
  latestVersion?: string,
  betaVersion?: string,
  latestVersionDate?: string,
  betaVersionDate?: string,
  nextVersion?: string,
  nextVersionDate?: string,
) => {
  const tags: Record<string, string> = {};
  if (latestVersion) tags.latest = latestVersion;
  if (betaVersion) tags.beta = betaVersion;
  if (nextVersion) tags.next = nextVersion;
  const npmView =
    !latestVersion && !betaVersion && !nextVersion
      ? undefined
      : {
          "dist-tags": tags,
          time: {
            [latestVersion ?? ""]: latestVersionDate ?? "",
            [betaVersion ?? ""]: betaVersionDate ?? "",
            [nextVersion ?? ""]: nextVersionDate ?? "",
          },
        };
  return npmView;
};
