import { leafCommand, makeCommandInfo } from "../../framework/command";
import {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
  IConfigApiReport,
  IConfigDocModel,
  IConfigDtsRollup,
  IConfigFile,
} from "@microsoft/api-extractor";

import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import path from "path";
import { readFile } from "fs-extra";
import { readdir } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import archiver from "archiver";

export const commandInfo = makeCommandInfo(
  "extract-api",
  "Runs api-extractor multiple times for all exports.",
  {},
);

const log = createPrinter("extract-api");

function getSuffix(exportPath: string): string {
  return exportPath.replaceAll("/", "\u2215"); // replace with division slash to avoid file system issue
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

export default leafCommand(commandInfo, async () => {
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
  const exports = packageJson["exports"];
  if (exports) {
    for (const exprt of Object.keys(exports)) {
      log.debug(`extracting Api for "${exprt}"`);
      const suffix = getSuffix(exprt);
      const newPublicTrimmedPath = extractorConfigObject.dtsRollup.publicTrimmedFilePath.replace(
        ".d.ts",
        `-${suffix}.d.ts`,
      );
      const newApiJsonPath = extractorConfigObject.docModel?.apiJsonFilePath?.replace(
        ".api.json",
        `-${suffix}.api.json`,
      );
      const newApiReportName = extractorConfigObject.apiReport?.reportFileName?.replace(
        ".api.md",
        `-${suffix}.api.md`,
      );
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
        enabled: true, // or should we disable? not sure if we need look at multiple api.md
        reportFileName: newApiReportName,
      };
      const updatedConfigObject: IConfigFile = {
        ...extractorConfigObject,
        dtsRollup: newDtsRollupOptions,
        docModel: newDocModel,
        apiReport: newApiReport,
        mainEntryPointFilePath: exports[exprt].types,
      };

      succeed = extractApi(updatedConfigObject, apiExtractorJsonPath, packageJsonPath);
    }
  } else {
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
