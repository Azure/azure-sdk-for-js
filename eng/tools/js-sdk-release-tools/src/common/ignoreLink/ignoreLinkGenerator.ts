import fs from "fs";
import path from "path";
import shell from "shelljs";
import { logger } from "../../utils/logger.js";
import { getPackageNameFromTspConfig } from "../utils.js";
import { tryGetNpmView } from "../npmUtils.js";
import { EmitterName } from "../types.js";

export const ignoreLinkGenerator = async (
  typeSpecDirectory: string,
  emitterName?: EmitterName,
): Promise<void> => {
  logger.info(`Generating ignore links for package`);
  const packageName = await getPackageNameFromTspConfig(typeSpecDirectory, emitterName);
  if (!packageName) {
    logger.warn("Failed to get package name");
    return;
  }
  await tryGenerateIgnoreLinkForPackage(packageName);
};

export async function tryGenerateIgnoreLinkForPackage(packageName: string) {
  logger.info(`Start to generate ignore links for ${packageName}`);

  const npmViewResult = await tryGetNpmView(packageName);
  const isFirstPackageToNpm = npmViewResult === undefined;

  if (isFirstPackageToNpm) {
    logger.info(
      `Package ${packageName} is first beta release, start to generate ignore links for first beta release.`,
    );
    updateIgnoreLink(packageName);
    logger.info(`Generated ignore link updates successfully`);
  } else {
    logger.info(
      `Package ${packageName} is not first beta release, skipping ignore link generation.`,
    );
  }
}

function updateIgnoreLink(packageName: string) {
  const jsSdkRepoPath = String(shell.pwd());
  const ignoreLinksPath = path.join(jsSdkRepoPath, "eng", "ignore-links.txt");
  let content = fs.readFileSync(ignoreLinksPath, "utf8");
  const learnLink = `https://learn.microsoft.com/javascript/api/${packageName}?view=azure-node-preview`;
  const npmLink = `https://www.npmjs.com/package/${packageName}`;

  if (!content.endsWith("\n")) {
    content += "\n";
  }

  let linksAdded = 0;

  if (!content.includes(learnLink)) {
    content += learnLink + "\n";
    linksAdded++;
  } else {
    logger.warn(`Link ${learnLink} already exists in ignore-links.txt, skipping.`);
  }

  if (!content.includes(npmLink)) {
    content += npmLink + "\n";
    linksAdded++;
  } else {
    logger.warn(`Link ${npmLink} already exists in ignore-links.txt, skipping.`);
  }

  if (linksAdded > 0) {
    fs.writeFileSync(ignoreLinksPath, content);
    logger.info(`Added ${linksAdded} link(s) for ${packageName} to ignore-links.txt`);
  } else {
    logger.warn(`All links for ${packageName} already exist in ignore-links.txt, no changes made.`);
  }
}
