import * as path from "path";
import { logger } from "../../utils/logger.js";
import { execSync } from "child_process";
import { generateChangelog } from "../utils/generateChangelog.js";
import {
  changeConfigOfTestAndSample,
  ChangeModel,
  SdkType,
} from "../../utils/changeConfigOfTestAndSample.js";
import { generateExtraFiles } from "../utils/generateExtraFiles.js";
import { defaultChildProcessTimeout } from "../../common/utils.js";
import { ensurePnpmInstalled } from "../../common/rushUtils.js";

import shell from "shelljs";

export async function generateCodes(sdkRepo: string, packagePath: string, packageName: string) {
  let cmd = `autorest  --typescript README.md`;
  shell.cd(path.join(packagePath, "swagger"));
  logger.info(`Start to run command: ${cmd}.`);
  execSync(cmd, { stdio: "inherit", timeout: defaultChildProcessTimeout });
  logger.info(`Start to generate config files.`);
  shell.cd(packagePath);
  await generateExtraFiles(packagePath, packageName, sdkRepo);
}

export async function buildGeneratedCodes(
  sdkrepo: string,
  packagePath: string,
  packageName: string,
) {
  shell.cd(sdkrepo);
  logger.info(`Start to update.`);
  await ensurePnpmInstalled();
  execSync("pnpm install", { stdio: "inherit" });
  logger.info(
    `Start to build '${packageName}', except for tests and samples, which may be written manually`,
  );
  // To build generated codes except test and sample, we need to change tsconfig.json.
  changeConfigOfTestAndSample(packagePath, ChangeModel.Change, SdkType.Rlc);
  execSync(`pnpm build --filter ${packageName}...`, { stdio: "inherit" });
  changeConfigOfTestAndSample(packagePath, ChangeModel.Revert, SdkType.Rlc);
  shell.cd(packagePath);
  logger.info(`Start to Generate changelog.`);
  await generateChangelog(packagePath);
  logger.info(`Start to clean compiled outputs.`);
  execSync("pnpm clean", { stdio: "inherit" });
}
