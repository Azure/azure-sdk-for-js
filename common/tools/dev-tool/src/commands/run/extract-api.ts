// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
import { readdir, writeFile } from "node:fs/promises";

import archiver from "archiver";
import { createPrinter } from "../../util/printer";
import path from "path";
import { readFile } from "fs-extra";
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
  const exports = packageJson["exports"];
  const reExports: string[] = [];
  let generatedIndexFile = Object.keys(exports).map((exportName) => {
    if (exportName === ".") {
      return 'export * from "./index.js"';
    }
    const exportEntry = exportName.replace("./", "");
    const exportPath = `${exportName}/index.js`;
    reExports.push(exportEntry);
    return `import * as ${exportEntry} from "${exportPath}"`;
  });
  generatedIndexFile.push(`export { ${reExports.join(", ")}}`);

  // Generated file will look like:

  /**
   * import * as api from "./api/index.js"
   * import * as rest from "./rest/index.js"
   *
   * export * from "./index.js"
   * export { api, rest }
   */

  await writeFile(
    path.join(projectInfo.path, "src", "index.docs.ts"),
    generatedIndexFile.join("\n"),
  );

  const updatedConfigObject: IConfigFile = {
    ...extractorConfigObject,
    mainEntryPointFilePath: "types/src/index.docs.d.ts", //
  };
  succeed = extractApi(updatedConfigObject, apiExtractorJsonPath, packageJsonPath);
  return succeed;
});
