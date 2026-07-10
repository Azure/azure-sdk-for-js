import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import { logger } from '../../utils/logger.js';
import { getPackageNameFromTspConfig } from '../utils.js';
import { tryGetNpmView } from '../npmUtils.js';
import { RunMode, ModularSDKType } from '../types.js';
import { getModularSDKType } from '../../utils/generateInputUtils.js';

export const codeOwnersAndIgnoreLinkGenerator = async (
  packageDirectory: string,
  typeSpecDirectory: string,
  runMode?: RunMode
): Promise<void> => {
  // Only proceed for management + Modular clients
  logger.info(`Generating CODEOWNERS and ignore link for packages`);
  if (!packageDirectory) {
    logger.warn('Failed to get package directory');
    return;
  }
  const packageName = await getPackageNameFromTspConfig(typeSpecDirectory);
  if (!packageName) {
    logger.warn('Failed to get package name');
    return;
  }
  await tryGenerateCodeOwnersAndIgnoreLinkForPackage(packageDirectory, packageName, runMode);
};

export async function tryGenerateCodeOwnersAndIgnoreLinkForPackage(
  packageFolderPath: string,
  packageName: string,
  runMode?: RunMode
) {
  logger.info(`Start to generate CODEOWNERS and ignore link for ${packageFolderPath}`);

  const modularSDKType = getModularSDKType(packageFolderPath);
  const isMgmtRelease = runMode === RunMode.Release && modularSDKType === ModularSDKType.ManagementPlane;
  logger.info(`runMode=${runMode}, modularSDKType=${modularSDKType}, isMgmtRelease=${isMgmtRelease}`);

  const npmViewResult = await tryGetNpmView(packageName);
  const isFirstPackageToNpm = npmViewResult === undefined;

  if (isFirstPackageToNpm) {
    logger.info(
      `Package ${packageName} is first beta release, start to generate CODEOWNERS and ignore link for first beta release.`
    );
    updateCODEOWNERS(packageFolderPath, isMgmtRelease);
    updateIgnoreLink(packageName);
    logger.info(`Generated updates for CODEOWNERS and ignore link successfully`);
  } else {
    if (isMgmtRelease) {
      ensureMgmtReviewLabelInCODEOWNERS(packageFolderPath);
    }
    logger.info(`Package ${packageName} is not first beta release, skipping CODEOWNERS and ignore link generation.`);
  }
}

function updateCODEOWNERS(packagePath: string, addMgmtReviewLabel: boolean) {
  const jsSdkRepoPath = String(shell.pwd());
  const codeownersPath = path.join(jsSdkRepoPath, '.github', 'CODEOWNERS');
  let content = fs.readFileSync(codeownersPath, 'utf8');

  // Insert content before Config section
  const configSectionIndex = content.indexOf('###########\n# Config\n###########');
  if (configSectionIndex !== -1) {
    const prLabels = addMgmtReviewLabel ? '%Mgmt %mgmt-review-needed' : '%Mgmt';
    const newContentBeforeConfig = `# PRLabel: ${prLabels}\n${packagePath}/ @qiaozha @MaryGao @JialinHuang803\n`;
    if (!content.includes(newContentBeforeConfig)) {
      content =
        content.slice(0, configSectionIndex) + newContentBeforeConfig + '\n' + content.slice(configSectionIndex);
    }
  }
  fs.writeFileSync(codeownersPath, content);
  logger.info(`Updated CODEOWNERS for package: ${packagePath}`);
}

function ensureMgmtReviewLabelInCODEOWNERS(packagePath: string) {
  const jsSdkRepoPath = String(shell.pwd());
  const codeownersPath = path.join(jsSdkRepoPath, '.github', 'CODEOWNERS');
  let content = fs.readFileSync(codeownersPath, 'utf8');

  // CODEOWNERS paths have a leading slash; packagePath may or may not
  const normalizedPath = packagePath.startsWith('/') ? packagePath : `/${packagePath}`;
  const existingEntry = `# PRLabel: %Mgmt\n${normalizedPath}/`;
  const updatedEntry = `# PRLabel: %Mgmt %mgmt-review-needed\n${normalizedPath}/`;

  logger.info(`ensureMgmtReviewLabelInCODEOWNERS: looking for entry "${existingEntry.replace(/\n/g, '\\n')}"`);
  logger.info(
    `ensureMgmtReviewLabelInCODEOWNERS: entry found=${content.includes(existingEntry)}, already updated=${content.includes(updatedEntry)}`
  );

  if (content.includes(existingEntry) && !content.includes(updatedEntry)) {
    content = content.replace(existingEntry, updatedEntry);
    fs.writeFileSync(codeownersPath, content);
    logger.info(`Updated CODEOWNERS to add mgmt-review-needed label for: ${packagePath}`);
  }
}

function updateIgnoreLink(packageName: string) {
  const jsSdkRepoPath = String(shell.pwd());
  const ignoreLinksPath = path.join(jsSdkRepoPath, 'eng', 'ignore-links.txt');
  let content = fs.readFileSync(ignoreLinksPath, 'utf8');
  const learnLink = `https://learn.microsoft.com/javascript/api/${packageName}?view=azure-node-preview`;
  const npmLink = `https://www.npmjs.com/package/${packageName}`;

  // Ensure the content ends with a newline
  if (!content.endsWith('\n')) {
    content += '\n';
  }

  let linksAdded = 0;

  // Add learn.microsoft.com link if it doesn't exist
  if (!content.includes(learnLink)) {
    content += learnLink + '\n';
    linksAdded++;
  } else {
    logger.warn(`Link ${learnLink} already exists in ignore-links.txt, skipping.`);
  }

  // Add npmjs.com link if it doesn't exist
  if (!content.includes(npmLink)) {
    content += npmLink + '\n';
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
