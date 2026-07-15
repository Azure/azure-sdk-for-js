import { NpmPackageInfo, ModularSDKType } from "./types.js";
import { dirname, posix } from "path";
import { getNpmPackageName, getNpmPackageSafeName } from "./npmUtils.js";
import { parse, stringify } from "yaml";
import { readFile, writeFile, readdir } from "fs/promises";

import { existsAsync } from "./utils.js";
import { logger } from "../utils/logger.js";
import { fileURLToPath } from "url";
import { getModularSDKType } from "../utils/generateInputUtils.js";

interface ArtifactInfo {
  name: string;
  safeName: string;
}

const comment =
  "# NOTE: Please refer to https://aka.ms/azsdk/engsys/ci-yaml before editing this file.\n\n";

async function createOrUpdateManagePlaneCiYaml(
  packageDirToSdkRoot: string,
  npmPackageInfo: NpmPackageInfo,
): Promise<string> {
  const serviceDirToSDKDir = posix.join(packageDirToSdkRoot, "..");
  const ciMgmtPath = posix.join(serviceDirToSDKDir, "ci.mgmt.yml");

  if (!(await existsAsync(ciMgmtPath))) {
    await createManagementPlaneCiYaml(
      packageDirToSdkRoot,
      ciMgmtPath,
      serviceDirToSDKDir,
      npmPackageInfo,
    );
    return ciMgmtPath;
  }
  await updateManagementPlaneCiYaml(packageDirToSdkRoot, ciMgmtPath, npmPackageInfo);
  return ciMgmtPath;
}

function tryAddItemInArray<TItem>(
  array: TItem[],
  item: TItem,
  include: (array: TItem[], item: TItem) => boolean = (a, i) => a.includes(i),
): boolean {
  let needUpdate = false;
  if (include(array, item) !== true) {
    needUpdate = true;
    array.push(item);
  }
  return needUpdate;
}

function makeSureArrayAvailableInCiYaml(current: any, path: string[]) {
  path.forEach((p, i) => {
    if (!current?.[p]) {
      current[p] = i === path.length - 1 ? [] : {};
    }
    current = current[p];
  });
}

async function updateManagementPlaneCiYaml(
  generatedPackageDirectory: string,
  ciMgmtPath: string,
  npmPackageInfo: NpmPackageInfo,
): Promise<void> {
  const content = await readFile(ciMgmtPath, { encoding: "utf-8" });
  let parsed = parse(content.toString());

  makeSureArrayAvailableInCiYaml(parsed, ["trigger", "branches", "exclude"]);
  makeSureArrayAvailableInCiYaml(parsed, ["pr", "branches", "exclude"]);
  makeSureArrayAvailableInCiYaml(parsed, ["trigger", "paths", "include"]);
  makeSureArrayAvailableInCiYaml(parsed, ["pr", "paths", "include"]);
  makeSureArrayAvailableInCiYaml(parsed, ["extends", "parameters", "Artifacts"]);

  var artifact: ArtifactInfo = getArtifact(npmPackageInfo);
  var artifactInclude = (array: ArtifactInfo[], item: ArtifactInfo) =>
    array.map((a) => a.name).includes(item.name);

  let needUpdate = false;
  needUpdate = tryAddItemInArray(parsed.trigger.branches.exclude, "feature/v4") || needUpdate;
  needUpdate = tryAddItemInArray(parsed.pr.branches.exclude, "feature/v4") || needUpdate;
  needUpdate =
    tryAddItemInArray(parsed.trigger.paths.include, generatedPackageDirectory) || needUpdate;
  needUpdate = tryAddItemInArray(parsed.trigger.paths.include, ciMgmtPath) || needUpdate;
  needUpdate = tryAddItemInArray(parsed.pr.paths.include, generatedPackageDirectory) || needUpdate;
  needUpdate = tryAddItemInArray(parsed.pr.paths.include, ciMgmtPath) || needUpdate;
  needUpdate =
    tryAddItemInArray(parsed.extends.parameters.Artifacts, artifact, artifactInclude) || needUpdate;

  await writeCiYaml(ciMgmtPath, parsed);
}

function getArtifact(npmPackageInfo: NpmPackageInfo): ArtifactInfo {
  const name = getNpmPackageName(npmPackageInfo);
  const safeName = getNpmPackageSafeName(npmPackageInfo);
  return { name, safeName };
}

async function createManagementPlaneCiYaml(
  packageDirToSdkRoot: string,
  ciMgmtPath: string,
  serviceDirToSdkRoot: string,
  npmPackageInfo: NpmPackageInfo,
): Promise<void> {
  const artifact = getArtifact(npmPackageInfo);
  // Use two ways to get the dirname to avoid failures caused by node version issues.
  const __dirname = import.meta.dirname || dirname(fileURLToPath(import.meta.url));
  const templatePath = posix.join(__dirname, "ciYamlTemplates/ci.mgmt.template.yml");
  const template = await readFile(templatePath, { encoding: "utf-8" });
  const parsed = parse(template.toString());
  parsed.trigger.paths.include = [packageDirToSdkRoot, ciMgmtPath];
  parsed.pr.paths.include = [packageDirToSdkRoot, ciMgmtPath];
  parsed.extends.parameters.ServiceDirectory = serviceDirToSdkRoot.split("/")[1];
  parsed.extends.parameters.Artifacts = [artifact];

  await writeCiYaml(ciMgmtPath, parsed);
}

async function tryAddMgmtExclusions(parsed: any, serviceDir: string): Promise<void> {
  try {
    const entries = await readdir(serviceDir, { withFileTypes: true });
    const mgmtDirs = entries.filter((e) => e.isDirectory() && e.name.startsWith("arm-"));
    const hasCiMgmt = entries.some((e) => e.isFile() && e.name === "ci.mgmt.yml");
    if (mgmtDirs.length === 0 && !hasCiMgmt) {
      return;
    }

    makeSureArrayAvailableInCiYaml(parsed, ["trigger", "paths", "exclude"]);
    makeSureArrayAvailableInCiYaml(parsed, ["pr", "paths", "exclude"]);

    for (const dir of mgmtDirs) {
      const mgmtPath = posix.join(serviceDir, dir.name);
      tryAddItemInArray(parsed.trigger.paths.exclude, mgmtPath);
      tryAddItemInArray(parsed.pr.paths.exclude, mgmtPath);
    }
    if (hasCiMgmt) {
      const ciMgmtPath = posix.join(serviceDir, "ci.mgmt.yml");
      tryAddItemInArray(parsed.trigger.paths.exclude, ciMgmtPath);
      tryAddItemInArray(parsed.pr.paths.exclude, ciMgmtPath);
    }
  } catch (e) {
    logger.warn(`Failed to scan service directory '${serviceDir}' for mgmt exclusions: ${e}`);
  }
}

async function writeCiYaml(ciPath: string, config: any) {
  const content = comment + stringify(config);
  await writeFile(ciPath, content, { encoding: "utf-8", flush: true });
  logger.info(`Created or updated CI file '${posix.resolve(ciPath)}' with content: \n${content}`);
}

async function updateDataPlaneCiYaml(
  generatedPackageDirectory: string,
  ciPath: string,
  npmPackageInfo: NpmPackageInfo,
): Promise<void> {
  const content = await readFile(ciPath, { encoding: "utf-8" });
  let parsed = parse(content.toString());

  const artifact: ArtifactInfo = getArtifact(npmPackageInfo);
  const artifactInclude = (array: ArtifactInfo[], item: ArtifactInfo) =>
    array.map((a) => a.name).includes(item.name);
  const artifacts: ArtifactInfo[] = parsed?.extends?.parameters?.Artifacts ?? [];
  if (artifactInclude(artifacts, artifact)) {
    logger.warn(
      `CI file '${ciPath}' already contains artifact '${artifact.name}', skipping update.`,
    );
    return;
  }

  makeSureArrayAvailableInCiYaml(parsed, ["trigger", "paths", "include"]);
  makeSureArrayAvailableInCiYaml(parsed, ["pr", "paths", "include"]);
  makeSureArrayAvailableInCiYaml(parsed, ["extends", "parameters", "Artifacts"]);

  const pathInclude = (array: string[], item: string) =>
    array.some((existing) => {
      const normalized = existing.endsWith("/") ? existing.slice(0, -1) : existing;
      return item === existing || item.startsWith(normalized + "/");
    });

  let needUpdate = false;
  needUpdate =
    tryAddItemInArray(parsed.trigger.paths.include, generatedPackageDirectory, pathInclude) ||
    needUpdate;
  needUpdate = tryAddItemInArray(parsed.trigger.paths.include, ciPath) || needUpdate;
  needUpdate =
    tryAddItemInArray(parsed.pr.paths.include, generatedPackageDirectory, pathInclude) ||
    needUpdate;
  needUpdate = tryAddItemInArray(parsed.pr.paths.include, ciPath) || needUpdate;

  // Scan the service directory for mgmt package directories and ci.mgmt.yml, add them to paths.exclude
  await tryAddMgmtExclusions(parsed, posix.dirname(ciPath));

  needUpdate =
    tryAddItemInArray(parsed.extends.parameters.Artifacts, artifact, artifactInclude) || needUpdate;

  await writeCiYaml(ciPath, parsed);
}

async function createDataPlaneCiYaml(
  packageDirToSdkRoot: string,
  ciPath: string,
  serviceDirToSdkRoot: string,
  npmPackageInfo: NpmPackageInfo,
): Promise<void> {
  const artifact = getArtifact(npmPackageInfo);
  const __dirname = import.meta.dirname || dirname(fileURLToPath(import.meta.url));
  const templatePath = posix.join(__dirname, "ciYamlTemplates/ci.template.yml");
  const template = await readFile(templatePath, { encoding: "utf-8" });
  const parsed = parse(template.toString());

  parsed.trigger.paths.include = [packageDirToSdkRoot, ciPath];
  parsed.pr.paths.include = [packageDirToSdkRoot, ciPath];
  parsed.extends.parameters.ServiceDirectory = serviceDirToSdkRoot.split("/")[1];
  parsed.extends.parameters.Artifacts = [artifact];

  // Scan for mgmt package directories and ci.mgmt.yml, add them to paths.exclude
  await tryAddMgmtExclusions(parsed, serviceDirToSdkRoot);

  await writeCiYaml(ciPath, parsed);
}

async function createOrUpdateDataPlaneCiYaml(
  packageDirToSdkRoot: string,
  npmPackageInfo: NpmPackageInfo,
): Promise<string> {
  const serviceDirToSDKDir = posix.join(packageDirToSdkRoot, "..");
  const ciPath = posix.join(serviceDirToSDKDir, "ci.yml");

  if (!(await existsAsync(ciPath))) {
    await createDataPlaneCiYaml(packageDirToSdkRoot, ciPath, serviceDirToSDKDir, npmPackageInfo);
  }
  await updateDataPlaneCiYaml(packageDirToSdkRoot, ciPath, npmPackageInfo);
  return ciPath;
}

export async function createOrUpdateCiYaml(
  relativeGeneratedPackageDirectoryToSdkRoot: string,
  npmPackageInfo: NpmPackageInfo,
): Promise<string> {
  logger.info("Start to create or update CI files");
  const modularSDKType = getModularSDKType(relativeGeneratedPackageDirectoryToSdkRoot);
  try {
    if (modularSDKType === ModularSDKType.ManagementPlane) {
      const ciPath = await createOrUpdateManagePlaneCiYaml(
        relativeGeneratedPackageDirectoryToSdkRoot,
        npmPackageInfo,
      );
      logger.info("Created or updated MPG CI files successfully.");
      return ciPath;
    } else {
      const ciPath = await createOrUpdateDataPlaneCiYaml(
        relativeGeneratedPackageDirectoryToSdkRoot,
        npmPackageInfo,
      );
      logger.info("Created or updated DPG CI files successfully.");
      return ciPath;
    }
  } catch (e) {
    logger.warn(`Failed to create or update CI files: ${e}`);
    return "";
  }
}
