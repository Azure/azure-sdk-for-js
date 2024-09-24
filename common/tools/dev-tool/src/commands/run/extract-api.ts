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
import { createReadStream, createWriteStream } from "node:fs";
import { leafCommand, makeCommandInfo } from "../../framework/command";

import archiver from "archiver";
import { createPrinter } from "../../util/printer";
import path from "path";
import { readFile } from "fs-extra";
import { readdir } from "node:fs/promises";
import { resolveProject } from "../../util/resolveProject";

export const commandInfo = makeCommandInfo(
  "extract-api",
  "Runs api-extractor multiple times for all exports.",
  {
    "subpath-doc-model": {
      shortName: "sdc",
      kind: "boolean",
      default: false,
      description:
        "When true, generates api.json docModel files for each subpath export. Otherwise only generates for the main entry point. Markdown files are always generated for each subpath export.",
    },
  },
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
   * When true, generates an api.json docModel file for this export.
   */
  generateDocModel: boolean;
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
function buildExportConfiguration(packageJson: any, options: any): ExportEntry[] | undefined {
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

        generateDocModel: exportPath === "." || options["subpath-doc-model"],
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

export default leafCommand(commandInfo, async (options) => {
  const projectInfo = await resolveProject(process.cwd());
  const packageJsonPath = path.join(projectInfo.path, "package.json");
  const packageJson = JSON.parse((await readFile(packageJsonPath)).toString("utf-8"));

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
  const exports = buildExportConfiguration(packageJson, options);
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
        enabled: exportEntry.generateDocModel,
        apiJsonFilePath: newApiJsonPath,
      };

      const newApiReport: IConfigApiReport = {
        ...extractorConfigObject.apiReport,
        enabled: true, // or should we disable? not sure if we need look at multiple api.md
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

  // Add api.json files to zip archive
  const unscopedPackageName = projectInfo.name.split("/")[1];
  const reportTempDir = path.join(projectInfo.path, "temp");
  const files = (await readdir(reportTempDir)).filter((f) => f.endsWith("api.json"));
  const output = createWriteStream(path.join(reportTempDir, `${unscopedPackageName}.zip`));
  const zip = archiver("zip");

  zip.on("warning", function (err) {
    throw err;
  });
  zip.on("error", function (err) {
    throw err;
  });

  zip.pipe(output);

  for (const file of files) {
    log.debug(`adding ${file} to zip archive`);
    zip.append(createReadStream(path.join(reportTempDir, file)), { name: file });
  }
  zip.finalize();

  return succeed;
});
