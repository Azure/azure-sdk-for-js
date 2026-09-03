import * as fs from "fs";
import * as path from "path";
import { logger } from "../../utils/logger.js";
import { extractExportAndGenerateChangelog } from "../../changelog/extractMetaData.js";
import { getLatestStableVersion } from "../../utils/version.js";
import {
  fixChangelogFormat,
  getApiReviewPath,
  getSDKType,
  tryReadNpmPackageChangelog,
} from "../../common/utils.js";
import { tryGetNpmView } from "../../common/npmUtils.js";

import shell from "shelljs";
const todayDate = new Date();
const dd = String(todayDate.getDate()).padStart(2, "0");
const mm = String(todayDate.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = todayDate.getFullYear();
const date = yyyy + "-" + mm + "-" + dd;

function generateChangelogForFirstRelease(packagePath, version) {
  const content = `## ${version} (${date})

  - Initial Release
`;
  fs.writeFileSync(path.join(packagePath, "CHANGELOG.md"), content, "utf8");
}

function appendChangelog(packagePath, version, changelog) {
  let originalChangeLogContent: string = tryReadNpmPackageChangelog(packagePath);
  originalChangeLogContent = fixChangelogFormat(originalChangeLogContent);

  const modifiedChangelogContent = `## ${version} (${date})
    
${changelog.displayChangeLog()}
    
${originalChangeLogContent}`;
  fs.writeFileSync(path.join(packagePath, "CHANGELOG.md"), modifiedChangelogContent, {
    encoding: "utf-8",
  });
}

export async function generateChangelog(packagePath) {
  const jsSdkRepoPath = String(shell.pwd());
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(packagePath, "package.json"), { encoding: "utf-8" }),
  );
  const packageName = packageJson.name;
  const version = packageJson.version;
  const npmViewResult = await tryGetNpmView(packageName);
  if (!npmViewResult) {
    logger.info(`'${packageName}' is first release, start to generate changelog.`);
    generateChangelogForFirstRelease(packagePath, version);
    logger.info(`Generated changelog successfully.`);
  } else {
    const stableVersion = npmViewResult ? getLatestStableVersion(npmViewResult) : undefined;
    if (!stableVersion) {
      logger.error(`Invalid latest version ${stableVersion}`);
      process.exit(1);
    }
    logger.info(`Package '${packageName}' released is released before.`);
    logger.info("Start to generate changelog by comparing api.md.");
    try {
      await shell.mkdir(path.join(packagePath, "changelog-temp"));
      await shell.cd(path.join(packagePath, "changelog-temp"));
      await shell.exec(`npm pack ${packageName}@${stableVersion}`);
      await shell.exec("tar -xzf *.tgz");
      await shell.cd(packagePath);
      const tempReviewFolder = path.join(packagePath, "changelog-temp", "package", "review");
      if (!fs.existsSync(tempReviewFolder)) {
        logger.warn(
          "The latest package released in NPM doesn't contain review folder, so generate changelog same as first release.",
        );
        generateChangelogForFirstRelease(packagePath, version);
      } else {
        const npmPackageRoot = path.join(packagePath, "changelog-temp", "package");
        // TODO: error out if it's comparing between RLC and HLC or Modular api layer and HLC
        const apiMdFileNPM = getApiReviewPath(npmPackageRoot);
        const apiMdFileLocal = getApiReviewPath(packagePath);
        const oldSDKType = getSDKType(npmPackageRoot);
        const newSDKType = getSDKType(packagePath);
        const changelog = await extractExportAndGenerateChangelog(
          apiMdFileNPM,
          apiMdFileLocal,
          oldSDKType,
          newSDKType,
        );
        if (!changelog.hasBreakingChange && !changelog.hasFeature) {
          logger.error(
            "Failed to generate changelog because the codes of local and npm may be the same.",
          );
        } else {
          appendChangelog(packagePath, version, changelog);
          logger.info("Generated changelog successfully.");
        }
      }
    } catch (e: any) {
      logger.error(`Failed to generate changelog: ${e.message}.`);
      throw e;
    } finally {
      fs.rmSync(path.join(packagePath, "changelog-temp"), { recursive: true, force: true });
      await shell.cd(jsSdkRepoPath);
    }
  }
}
