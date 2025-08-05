// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Extractor,
  ExtractorConfig,
  ExtractorLogLevel,
  IConfigApiReport,
  IConfigDocModel,
  IConfigFile,
  ConsoleMessageId,
  ExtractorMessage,
} from "@microsoft/api-extractor";
import { createTwoFilesPatch, parsePatch } from "diff";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import path from "node:path";
import { readFile, writeFile, unlink, mkdir, rm, stat } from "node:fs/promises";
import { ProjectInfo, resolveProject } from "../../util/resolveProject";
import { existsSync } from "node:fs";

export const commandInfo = makeCommandInfo(
  "extract-api",
  "Runs api-extractor multiple times for all exports.",
);

const log = createPrinter("extract-api");

interface ExportEntry {
  path: string;
  isSubpath: boolean;
  runtime: string;
  baseName: string;
  tsconfigPath: string;
  mainEntryPointFilePath: string;
  suppressForgottenExportErrors?: boolean;
}

interface RuntimeApiFiles {
  [runtime: string]: {
    [path: string]: string;
  };
}

async function getTsconfigFile(projectPath: string, runtime: string): Promise<string> {
  const tsconfigPath = path.join(projectPath, `tsconfig.src.${runtime}.json`);
  try {
    await stat(tsconfigPath);
    return tsconfigPath;
  } catch {
    return path.join(projectPath, `tsconfig.src.json`);
  }
}

interface ApiJson {
  metadata: Record<string, unknown>;
  members: {
    kind: string;
    name: string;
    canonicalReference: string;
    members: {
      kind: string;
      name: string;
      canonicalReference: string;
      docComment: string;
      excerptTokens: { kind: string; text: string; canonicalReference?: string }[];
    }[];
  }[];
}

async function buildExportConfiguration(
  packageJson: { exports: Record<string, Record<string, { types: string }>> },
  projectRoot: string,
): Promise<ExportEntry[] | undefined> {
  const exports = packageJson.exports;
  if (!exports) return undefined;

  const exportEntries: ExportEntry[] = [];
  for (const [pathKey, entry] of Object.entries(exports)) {
    if (pathKey === "./package.json") continue;
    const isMainExport = pathKey === ".";
    const baseName = isMainExport ? "" : pathKey.replace(/^\.\//, "").replace(/\//g, "-");
    const common = {
      path: pathKey,
      isSubpath: !isMainExport,
      suppressForgottenExportErrors: !isMainExport,
    };
    for (const [key, value] of Object.entries(entry)) {
      if (key === "require") continue;
      const runtime = key === "import" ? "node" : key;
      exportEntries.push({
        ...common,
        runtime,
        tsconfigPath: await getTsconfigFile(projectRoot, runtime),
        baseName,
        mainEntryPointFilePath: path.resolve(projectRoot, value.types),
      });
    }
  }
  return exportEntries;
}

function customMessageCallback(message: ExtractorMessage): void {
  message.handled = true;
  if (message.messageId === ConsoleMessageId.ApiReportCreated) {
    // Suppress this message
    return;
  }

  const text = message.text;
  switch (message.logLevel) {
    case "none":
      break;
    case "error":
      log.error(text);
      break;
    case "warning":
      log.warn(text);
      break;
    case "info":
    case "verbose":
    default:
      log.info(text);
      break;
  }
}

function extractApi(
  configObject: IConfigFile,
  configObjectFullPath: string,
  packageJsonFullPath: string,
): boolean {
  const config = ExtractorConfig.prepare({
    configObject,
    configObjectFullPath,
    packageJsonFullPath,
  });
  const result = Extractor.invoke(config, {
    localBuild: true,
    messageCallback: customMessageCallback,
  });
  if (result.succeeded) {
    log.debug("API Extractor completed successfully");
  } else {
    log.error(
      `API Extractor completed with ${result.errorCount} errors and ${result.warningCount} warnings`,
    );
  }
  return result.succeeded;
}

function createApiDiff(
  nodeContent: string,
  runtimeContent: string,
  runtime: string,
): string | undefined {
  const diff = createTwoFilesPatch(
    "NodeJS",
    runtime,
    nodeContent,
    runtimeContent,
    undefined,
    undefined,
    { stripTrailingCr: true, ignoreWhitespace: true },
  );
  const parsed = parsePatch(diff);
  const hasRealChanges = parsed.some((file) =>
    file.hunks.some((hunk) =>
      hunk.lines.some((line) => line.startsWith("+") || line.startsWith("-")),
    ),
  );

  if (!hasRealChanges) return undefined;
  const preamble = `# API Report Diff for ${runtime} runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.
`;

  return [preamble, "```diff", diff, "```"].join("\n");
}

function resolveTemplate(template: string, projectInfo: ProjectInfo): string {
  return template
    .replace(/<projectFolder>/g, projectInfo.path)
    .replace(/<unscopedPackageName>/g, getUnscopedPackageName(projectInfo.name));
}

function createNameWithRuntime(entry: ExportEntry): string {
  const baseName = entry.baseName ? `${entry.baseName}-` : "";
  return `${baseName}${entry.runtime}`;
}

async function extractApiForEntry(
  entry: ExportEntry,
  baseConfig: IConfigFile,
  configPath: string,
  pkgPath: string,
  projectInfo: ProjectInfo,
): Promise<string> {
  const baseReportFolder = baseConfig.apiReport?.reportFolder || `<projectFolder>/review`;
  const reportFolder = resolveTemplate(baseReportFolder, projectInfo);
  if (!reportFolder) {
    log.error("API report folder is not configured in api-extractor.json");
    throw new Error("API report folder is not configured");
  }
  const baseReportFileName = baseConfig.apiReport?.reportFileName || `<unscopedPackageName>.api.md`;
  const reportFile = resolveTemplate(baseReportFileName, projectInfo);
  if (!reportFile) {
    log.error("API report file name is not configured in api-extractor.json");
    throw new Error("API report file name is not configured");
  }
  const reportDir = path.resolve(reportFolder);
  const tempReportFileName = `${path.basename(reportFile, ".api.md")}-${createNameWithRuntime(entry)}.api.md`;
  const tempReportPath = path.join(reportDir, tempReportFileName);

  const baseApiJsonPath =
    baseConfig.docModel?.apiJsonFilePath || `<projectFolder>/temp/<unscopedPackageName>.api.json`;
  const apiJsonFilePath = resolveTemplate(baseApiJsonPath, projectInfo).replace(
    ".api.json",
    `-${createNameWithRuntime(entry)}.api.json`,
  );

  const docModel: IConfigDocModel = {
    ...baseConfig.docModel,
    enabled: true,
    apiJsonFilePath,
  };

  const apiReport: IConfigApiReport = {
    ...baseConfig.apiReport,
    enabled: true,
    reportFileName: tempReportFileName,
  };

  const newConfig: IConfigFile = {
    ...baseConfig,
    compiler: {
      tsconfigFilePath: entry.tsconfigPath,
    },
    dtsRollup: { enabled: false },
    docModel,
    apiReport,
    mainEntryPointFilePath: entry.mainEntryPointFilePath,
  };

  if (entry.suppressForgottenExportErrors && newConfig.messages?.extractorMessageReporting) {
    newConfig.messages.extractorMessageReporting["ae-forgotten-export"] = {
      addToApiReportFile: false,
      logLevel: ExtractorLogLevel.None,
    };
  }

  extractApi(newConfig, configPath, pkgPath);

  const content = await readFile(tempReportPath, "utf-8");
  await unlink(tempReportPath);
  return content;
}

async function writeRuntimeApiFiles(
  runtimeApiFiles: RuntimeApiFiles,
  reviewDirPath: string,
  packageName: string,
) {
  for (const [runtime, pathFiles] of Object.entries(runtimeApiFiles)) {
    for (const [exportPath, content] of Object.entries(pathFiles)) {
      const pathSuffix =
        exportPath === "." ? "" : `-${exportPath.replace(/^\.\//, "").replace(/\//g, "-")}`;
      const isNodeRuntime = runtime === "node";
      const filename = `${packageName}${pathSuffix}-${runtime}${isNodeRuntime ? ".api.md" : ".api.diff.md"}`;
      const filePath = path.join(reviewDirPath, filename);
      await writeFile(filePath, content);
      log.info(`Written ${runtime} API ${isNodeRuntime ? "file" : "diff"} to ${filename}`);
    }
  }
}

function getUnscopedPackageName(packageName: string): string {
  return packageName.includes("/") ? packageName.split("/")[1] : packageName;
}

async function loadApiJsonForSubPath(fullPath: string): Promise<ApiJson> {
  const content = await readFile(fullPath, { encoding: "utf-8" });
  return JSON.parse(content) as ApiJson;
}

async function buildMergedApiJson(
  unscopedPackageName: string,
  reportTempDir: string,
  exports: ExportEntry[],
  dependencies: Record<string, string>,
  useMerged: boolean = false,
): Promise<string | undefined> {
  const mainNodeExport = exports?.find((e) => !e.isSubpath && e.runtime === "node");
  if (!mainNodeExport) {
    log.debug("No main node export found, skipping API JSON merge");
    return;
  }
  const mainApiJsonPath = path.join(
    reportTempDir,
    `${unscopedPackageName}-${createNameWithRuntime(mainNodeExport)}.api.json`,
  );

  if (!existsSync(mainApiJsonPath)) {
    log.debug(`Main API JSON file ${mainApiJsonPath} not found, skipping merge`);
    return;
  }

  const apiJson = await loadApiJsonForSubPath(mainApiJsonPath);
  apiJson.metadata.dependencies = dependencies;

  for (const subpath of exports) {
    if (!subpath.isSubpath || subpath.runtime !== mainNodeExport.runtime) continue;
    const nameWithRuntime = createNameWithRuntime(subpath);
    const p = path.join(reportTempDir, `${unscopedPackageName}-${nameWithRuntime}.api.json`);
    if (!existsSync(p)) {
      log.debug(`${p} not there`);
      continue;
    }

    log.debug(`loading api package for "${nameWithRuntime}"`);
    const subpathApiJson = await loadApiJsonForSubPath(p);
    const entryPoint = subpathApiJson.members.filter((m) => m.kind === "EntryPoint")[0];
    if (!entryPoint) {
      log.debug(`No EntryPoint found in ${p}`);
      continue;
    }
    entryPoint.name = subpath.baseName;
    entryPoint.canonicalReference = `${entryPoint.canonicalReference}/${subpath.baseName}`;
    apiJson.members.push(entryPoint);
    log.debug(`deleting ${p} after merging its entrypoint`);
    await unlink(p);
  }

  const augmentedApiJsonPath = useMerged
    ? mainApiJsonPath
    : mainApiJsonPath.replace(".api.json", `.augmented.json`);
  log.info(`writing merged api to ${augmentedApiJsonPath}`);
  await writeFile(augmentedApiJsonPath, JSON.stringify(apiJson, undefined, 2));
  return augmentedApiJsonPath;
}

export default leafCommand(commandInfo, async () => {
  const projectInfo = await resolveProject(process.cwd());
  const pkgPath = path.join(projectInfo.path, "package.json");
  const pkgJson = JSON.parse(await readFile(pkgPath, "utf-8"));

  const reviewDir = path.join(projectInfo.path, "review");
  await rm(reviewDir, { recursive: true, force: true });
  await mkdir(reviewDir);

  const configPath = path.join(projectInfo.path, "api-extractor.json");
  const baseConfig = ExtractorConfig.loadFile(configPath);

  const exports = await buildExportConfiguration(pkgJson, projectInfo.path);
  if (
    !baseConfig.mainEntryPointFilePath ||
    (!exports && !baseConfig?.dtsRollup?.publicTrimmedFilePath)
  ) {
    log.error("Unexpected api-extractor configuration");
    return false;
  }

  let success = true;
  const runtimeApiFiles: RuntimeApiFiles = {};

  if (exports) {
    const exportsByPath = new Map<string, ExportEntry[]>();
    for (const e of exports) {
      if (!exportsByPath.has(e.path)) exportsByPath.set(e.path, []);
      exportsByPath.get(e.path)!.push(e);
    }

    for (const [exportPath, entries] of exportsByPath) {
      const nodeEntry = entries.find((e) => e.runtime === "node") || entries[0];
      const nodeContent = await extractApiForEntry(
        nodeEntry,
        baseConfig,
        configPath,
        pkgPath,
        projectInfo,
      );

      runtimeApiFiles.node ??= {};
      runtimeApiFiles.node[exportPath] = nodeContent;

      for (const e of entries) {
        const runtime = e.runtime;
        if (runtime === "node") continue;
        const content = await extractApiForEntry(e, baseConfig, configPath, pkgPath, projectInfo);
        const diff = createApiDiff(nodeContent, content, runtime);
        if (!diff) continue;
        runtimeApiFiles[runtime] ??= {};
        runtimeApiFiles[runtime][exportPath] = diff;
      }
    }
    const unscoped = getUnscopedPackageName(projectInfo.name);
    await writeRuntimeApiFiles(runtimeApiFiles, reviewDir, unscoped);

    if (baseConfig.docModel?.enabled) {
      const reportTempDir = path.join(projectInfo.path, "temp");
      const nodeExports = exports.filter((e) => e.runtime === "node");
      await buildMergedApiJson(
        unscoped,
        reportTempDir,
        nodeExports,
        pkgJson["dependencies"] || {},
        true,
      );
    }
  } else {
    success = extractApi(baseConfig, configPath, pkgPath);
  }

  return success;
});
