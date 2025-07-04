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
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import path from "path";
import { readFile, writeFile, unlink, mkdir, rm } from "node:fs/promises";
import { ProjectInfo, resolveProject } from "../../util/resolveProject";

export const commandInfo = makeCommandInfo(
  "extract-api",
  "Runs api-extractor multiple times for all exports.",
  {
    "merge-subpath-exports": {
      shortName: "mse",
      kind: "boolean",
      default: true,
      description: "whether to include subpath export APIs.",
    },
  },
);

const log = createPrinter("extract-api");

interface ExportEntry {
  path: string;
  isSubpath: boolean;
  runtime: string;
  baseName: string;
  mainEntryPointFilePath: string;
  suppressForgottenExportErrors?: boolean;
}

interface RuntimeApiFiles {
  [runtime: string]: {
    [path: string]: string;
  };
}

function buildExportConfiguration(
  packageJson: { exports: Record<string, Record<string, { types: string }>> },
  projectRoot: string,
): ExportEntry[] | undefined {
  const exports = packageJson.exports;
  if (!exports) return undefined;

  const exportEntries: ExportEntry[] = [];
  for (const [pathKey, entry] of Object.entries(exports)) {
    if (pathKey === "./package.json") continue;
    const baseName = pathKey === "." ? "" : pathKey.replace(/^\.\//, "").replace(/\//g, "-") + "-";
    const common = {
      path: pathKey,
      isSubpath: pathKey !== ".",
      suppressForgottenExportErrors: pathKey !== ".",
    };
    for (const [key, value] of Object.entries(entry)) {
      if (key === "require") continue;
      const runtime = key === "import" ? "node" : key;
      exportEntries.push({
        ...common,
        runtime,
        baseName: baseName + runtime,
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

// TODO: explore better diff algorithms that consider changes at the definition level instead of the line level
function createApiDiff(
  nodeContent: string,
  runtimeContent: string,
  runtime: string,
): string | undefined {
  const nodeLines = nodeContent.split("\n");
  const runtimeLines = runtimeContent.split("\n");
  const diff: string[] = [];
  const maxLength = Math.max(nodeLines.length, runtimeLines.length);
  let hasChanges = false;
  for (let i = 0; i < maxLength; i++) {
    const nodeLine = nodeLines[i] || "";
    const runtimeLine = runtimeLines[i] || "";
    if (nodeLine !== runtimeLine) {
      hasChanges = true;
      diff.push(`- ${nodeLine}`);
      diff.push(`+ ${runtimeLine}`);
    }
  }
  if (!hasChanges) {
    return undefined;
  }
  const preamble = [
    `# API Report Diff for ${runtime} runtime`,
    ``,
    `This file contains only the differences from the Node.js API.`,
    `For the complete API surface, see the corresponding -node.api.md file.`,
    ``,
  ];
  return [...preamble, `\`\`\``, ...diff, `\`\`\``].join("\n");
}

async function extractApiForEntry(
  entry: ExportEntry,
  baseConfig: IConfigFile,
  configPath: string,
  pkgPath: string,
  projectInfo: ProjectInfo,
): Promise<string> {
  const reportFolder = baseConfig.apiReport?.reportFolder?.replace(
    /<projectFolder>/g,
    projectInfo.path,
  );
  if (!reportFolder) {
    log.error("API report folder is not configured in api-extractor.json");
    throw new Error("API report folder is not configured");
  }
  const reportFile = baseConfig.apiReport?.reportFileName?.replace(
    /<unscopedPackageName>/g,
    projectInfo.name.split("/")[1],
  );
  if (!reportFile) {
    log.error("API report file name is not configured in api-extractor.json");
    throw new Error("API report file name is not configured");
  }
  const reportDir = path.resolve(reportFolder);
  const tempReportFileName = `${path.basename(reportFile, ".api.md")}-${entry.baseName}.api.md`;
  const tempReportPath = path.join(reportDir, tempReportFileName);

  const docModel: IConfigDocModel = {
    ...baseConfig.docModel,
    enabled: true,
    apiJsonFilePath: baseConfig.docModel?.apiJsonFilePath?.replace(
      ".api.json",
      `-${entry.baseName}.api.json`,
    ),
  };

  const apiReport: IConfigApiReport = {
    ...baseConfig.apiReport,
    enabled: true,
    reportFileName: tempReportFileName,
  };

  const newConfig: IConfigFile = {
    ...baseConfig,
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
      const prefix = `${packageName}${pathSuffix}-${runtime}`;
      const filename = runtime === "node" ? `${prefix}.api.md` : `${prefix}.api.diff.md`;
      const filePath = path.join(reviewDirPath, filename);
      await writeFile(filePath, content);
      log.info(`Written ${runtime} API ${runtime === "node" ? "file" : "diff"} to ${filename}`);
    }
  }
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

  const exports = buildExportConfiguration(pkgJson, projectInfo.path);
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

      if (!runtimeApiFiles["node"]) runtimeApiFiles["node"] = {};
      runtimeApiFiles["node"][exportPath] = nodeContent;

      for (const e of entries) {
        const runtime = e.runtime;
        if (runtime === "node") continue;
        const content = await extractApiForEntry(e, baseConfig, configPath, pkgPath, projectInfo);
        const diff = createApiDiff(nodeContent, content, runtime);
        if (!diff) continue;
        if (!runtimeApiFiles[runtime]) runtimeApiFiles[runtime] = {};
        runtimeApiFiles[runtime][exportPath] = diff;
      }
    }
    const unscoped = projectInfo.name.includes("/")
      ? projectInfo.name.split("/")[1]
      : projectInfo.name;
    await writeRuntimeApiFiles(runtimeApiFiles, reviewDir, unscoped);
  } else {
    success = extractApi(baseConfig, configPath, pkgPath);
  }

  return success;
});
