// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Extractor,
  ExtractorConfig,
  ExtractorLogLevel,
  ExtractorResult,
  IConfigApiReport,
  IConfigDocModel,
  IConfigDtsRollup,
  IConfigFile,
} from "@microsoft/api-extractor";
import { leafCommand, makeCommandInfo } from "../../framework/command";

import { createPrinter } from "../../util/printer";
import path from "path";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolveProject } from "../../util/resolveProject";

export const commandInfo = makeCommandInfo(
  "extract-api",
  "Runs api-extractor multiple times for all exports.",
);

const log = createPrinter("extract-api");

/**
 * Represents an export entry in the package.json "exports" field along with
 * customization options for API Extractor.
 */
interface ExportEntry {
  /** The path, or key for the export. */
  path: string;
  /** true for subexports such as "./models", false for top-level export such as ".". */
  isSubpath: boolean;
  /**
   * The name with leading "./" and trailing extension removed, e.g. "./models" -> "models".
   * For nested exports, "/" are replaced with hyphens since "/" is an invalid character for APIView
   */
  baseName: string;
  /**
   * Represents the updated mainEntryPointFilePath for this export to be fed into API Extractor.
   */
  mainEntryPointFilePath: string;
  /**
   * When true, suppresses forgotten export errors for this export as API Extractor is not aware of top-level exports.
   */
  suppressForgottenExportErrors?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildExportConfiguration(packageJson: any): ExportEntry[] | undefined {
  const exports = packageJson["exports"];
  if (!exports) {
    return undefined;
  }
  const isValidExport = (key: string) => key !== "./package.json";

  const exportEntries: ExportEntry[] = Object.keys(exports)
    .filter(isValidExport)
    .map<ExportEntry>((exportPath) => {
      return {
        path: exportPath,
        isSubpath: exportPath !== ".",
        baseName: exportPath
          .replace(/^\.\//, "") // remove leading "./"
          .replace(/\//g, "-"), // replace slashes with hyphens

        // Take either the top-level "types" filepath or - for packages that use tshy - the ESM "types" filepath
        mainEntryPointFilePath: exports[exportPath].types || exports[exportPath]?.import?.types,
        suppressForgottenExportErrors: exportPath !== ".",
      };
    });

  log.debug(`Detected exports: ${JSON.stringify(exportEntries, null, 2)}`);
  return exportEntries;
}

function extractApi(
  extractorConfigObject: IConfigFile,
  apiExtractorJsonPath: string,
  packageJsonPath: string,
): boolean {
  const config = ExtractorConfig.prepare({
    configObject: extractorConfigObject,
    configObjectFullPath: apiExtractorJsonPath,
    packageJsonFullPath: packageJsonPath,
  });

  const extractorResult: ExtractorResult = Extractor.invoke(config, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,
    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
  });
  if (extractorResult.succeeded) {
    log.debug(`API Extractor completed successfully`);
    return true;
  } else {
    log.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`,
    );
    return false;
  }
}

interface ApiJson {
  metadata: Record<string, unknown>;
  members: { kind: string; name: string }[];
}

async function loadApiJson(fullPath: string): Promise<ApiJson> {
  return JSON.parse(await readFile(fullPath, { encoding: "utf-8" })) as ApiJson;
}

export default leafCommand(commandInfo, async () => {
  const projectInfo = await resolveProject(process.cwd());
  const packageJsonPath = path.join(projectInfo.path, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, { encoding: "utf-8" }));

  const apiExtractorJsonPath: string = path.join(projectInfo.path, "api-extractor.json");
  const extractorConfigObject = ExtractorConfig.loadFile(apiExtractorJsonPath);
  if (
    !extractorConfigObject.mainEntryPointFilePath ||
    !extractorConfigObject?.dtsRollup?.publicTrimmedFilePath
  ) {
    log.error("Unexpected api-extractor configuration");
    return false;
  }

  log.debug(`  mainEntryPointFilePath: ${extractorConfigObject.mainEntryPointFilePath}`);
  log.debug(`  publicTrimmedFilePath: ${extractorConfigObject?.dtsRollup?.publicTrimmedFilePath}`);
  log.debug(`  apiJsonFilePath: ${extractorConfigObject.docModel?.apiJsonFilePath}`);
  log.debug(`  reportFileName: ${extractorConfigObject.apiReport?.reportFileName}`);
  log.debug(`  reportTempFolder: ${extractorConfigObject.apiReport?.reportTempFolder}`);

  let succeed = true;
  // sub path exports extraction
  const exports = buildExportConfiguration(packageJson);
  if (exports !== undefined) {
    log.info("Detected subpath exports, extracting markdown for each subpath.");
    for (const exportEntry of exports) {
      log.info(`Extracting api for export: ${exportEntry.path}`);
      // Place the subpath export rollup file in the directory from which it is exported
      const publicTrimmedFilePath = path.parse(
        extractorConfigObject.dtsRollup.publicTrimmedFilePath,
      );
      const newPublicTrimmedPath = path.join(
        publicTrimmedFilePath.dir,
        exportEntry.path,
        publicTrimmedFilePath.base,
      );

      // Leave filenames unchanged for the root export
      let newApiJsonPath = extractorConfigObject.docModel?.apiJsonFilePath;
      let newApiReportName = extractorConfigObject.apiReport?.reportFileName;

      if (exportEntry.isSubpath) {
        // Append the subpath export name to the api.json and api.md file names
        // e.g. for ./rest export: <unscopedPackageName>.api.json -> <unscopedPackageName>-rest.api.json
        // e.g. for ./rest export: <unscopedPackageName>.api.md -> <unscopedPackageName>-rest.api.md
        newApiJsonPath = extractorConfigObject.docModel?.apiJsonFilePath?.replace(
          ".api.json",
          `-${exportEntry.baseName}.api.json`,
        );
        newApiReportName = extractorConfigObject.apiReport?.reportFileName?.replace(
          ".api.md",
          `-${exportEntry.baseName}.api.md`,
        );
      }

      const newDtsRollupOptions: IConfigDtsRollup = {
        ...extractorConfigObject.dtsRollup,
        publicTrimmedFilePath: newPublicTrimmedPath,
      };
      const newDocModel: IConfigDocModel = {
        ...extractorConfigObject.docModel,
        enabled: true,
        apiJsonFilePath: newApiJsonPath,
      };

      const newApiReport: IConfigApiReport = {
        ...extractorConfigObject.apiReport,
        enabled: true,
        reportFileName: newApiReportName,
      };

      const updatedConfigObject: IConfigFile = {
        ...extractorConfigObject,
        dtsRollup: newDtsRollupOptions,
        docModel: newDocModel,
        apiReport: newApiReport,
        mainEntryPointFilePath: exportEntry.mainEntryPointFilePath,
      };

      // subpath exports often use top-level exports, but API Extractor is not aware of this and
      // flags them as forgotten exports.
      if (
        exportEntry.suppressForgottenExportErrors &&
        updatedConfigObject.messages?.extractorMessageReporting
      ) {
        updatedConfigObject.messages.extractorMessageReporting["ae-forgotten-export"] = {
          addToApiReportFile: false,
          logLevel: ExtractorLogLevel.None,
        };
      }
      succeed = extractApi(updatedConfigObject, apiExtractorJsonPath, packageJsonPath);
    }
  } else {
    log.info("No subpath exports detected, extracting api for main entry point.");
    // normal extraction
    succeed = extractApi(extractorConfigObject, apiExtractorJsonPath, packageJsonPath);
  }

  if (extractorConfigObject.docModel?.enabled) {
    const reportTempDir = path.join(projectInfo.path, "temp");
    const unscopedPackageName = projectInfo.name.split("/")[1];

    await buildMergedApiJson(
      unscopedPackageName,
      reportTempDir,
      exports,
      packageJson["dependencies"],
    );
  }

  return succeed;
});

/**
 *
 * @returns the full path of -augmented.api.json file.
 */
async function buildMergedApiJson(
  unscopedPackageName: string,
  reportTempDir: string,
  exports: ExportEntry[] | undefined,
  dependencies: Record<string, string>,
) {
  const mainApiJsonPath = path.join(reportTempDir, `${unscopedPackageName}.api.json`);

  const apiJson = await loadApiJson(mainApiJsonPath);
  apiJson.metadata.dependencies = dependencies;
  for (const subpath of exports?.filter((p) => p.isSubpath) ?? []) {
    const p = path.join(reportTempDir, `${unscopedPackageName}-${subpath.baseName}.api.json`);
    if (!existsSync(p)) {
      log.debug(`${p} not there`);
      continue;
    }

    log.debug(`loading api package for "${subpath.baseName}"`);
    const subpathApiJson = await loadApiJson(p);
    const entryPoint = subpathApiJson.members.filter((m) => m.kind === "EntryPoint")[0];
    entryPoint.name = subpath.baseName;
    apiJson.members.push(entryPoint);
    log.debug(`deleting ${p} after merging its entrypoint`);
    await unlink(p);
  }

  const augmentedApiJsonPath = mainApiJsonPath.replace(".api.json", `.augmented.json`);
  log.debug(`writing merged api to ${augmentedApiJsonPath}`);
  await writeFile(augmentedApiJsonPath, JSON.stringify(apiJson, undefined, 2));
  return augmentedApiJsonPath;
}
