/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { SdkType } from "./commandLine";
import { findSdkDirectory, saveContentToFile, findMissingSdks } from "./generateSdks";
import { copyExistingNodeJsReadme, updateTypeScriptReadmeFile, findReadmeTypeScriptMdFilePaths, getPackageNamesFromReadmeTypeScriptMdFileContents, getAbsolutePackageFolderPathFromReadmeFileContents, updateMainReadmeFile, getSinglePackageName } from "./readme";
import * as fs from "fs";
import * as path from "path";
import { Version } from "./version";
import { contains, npmInstall } from "./common";
import { execSync } from "child_process";
import { Logger } from "./logger";
import { refreshRepository, getValidatedRepository, waitAndLockGitRepository, unlockGitRepository, ValidateFunction, ValidateEachFunction, checkoutBranch, pullBranch, mergeBranch, mergeMasterIntoBranch, commitAndPush, checkoutRemoteBranch, Branch, BranchLocation, rebaseBranch } from "./git";
import { commitAndCreatePullRequest, findPullRequest, requestPullRequestReview, forcePrDiffRefresh } from "./github";

const _logger = Logger.get();

function containsPackageName(packageNames: string[], packageName: string): boolean {
    const result = contains(packageNames, packageName) ||
      contains(packageNames, `@azure/${packageName}`) ||
      contains(packageNames, `"${packageName}"`) ||
      contains(packageNames, `"@azure/${packageName}"`) ||
      contains(packageNames, `'${packageName}'`) ||
      contains(packageNames, `'@azure/${packageName}'`);
    _logger.logTrace(`Comparing package name "${packageName}" to ${JSON.stringify(packageNames)} - Result: ${result}`);
    return result;
}

export async function generateSdk(azureRestAPISpecsRoot: string, azureSDKForJSRepoRoot: string, packageName: string, use?: boolean, useDebugger?: boolean) {
    const typeScriptReadmeFilePaths: string[] = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

    for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
        const typeScriptReadmeFilePath: string = typeScriptReadmeFilePaths[i];

        const typeScriptReadmeFileContents: string = await fs.promises.readFile(typeScriptReadmeFilePath, { encoding: 'utf8' });
        const packageNames: string[] = getPackageNamesFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);
        const packageNamesString: string = JSON.stringify(packageNames);

        if (!packageName || containsPackageName(packageNames, packageName)) {
            _logger.log(`>>>>>>>>>>>>>>>>>>> Start: "${packageNamesString}" >>>>>>>>>>>>>>>>>>>>>>>>>`);

            const readmeFilePath: string = path.resolve(path.dirname(typeScriptReadmeFilePath), 'readme.md');

            let cmd = `autorest --typescript --typescript-sdks-folder=${azureSDKForJSRepoRoot} --license-header=MICROSOFT_MIT_NO_VERSION ${readmeFilePath}`;
            if (use) {
                cmd += ` --use=${use}`;
            }
            else {
                const localAutorestTypeScriptFolderPath = path.resolve(azureSDKForJSRepoRoot, '..', 'autorest.typescript');
                if (fs.existsSync(localAutorestTypeScriptFolderPath) && fs.lstatSync(localAutorestTypeScriptFolderPath).isDirectory()) {
                    cmd += ` --use=${localAutorestTypeScriptFolderPath}`;
                }
            }

            if (useDebugger) {
                cmd += ` --typescript.debugger`;
            }

            try {
                _logger.log('Executing command:');
                _logger.log('------------------------------------------------------------');
                _logger.log(cmd);
                _logger.log('------------------------------------------------------------');

                const commandOutput = execSync(cmd, { encoding: "utf8" });
                _logger.log(commandOutput);

                _logger.log('Installing dependencies...');
                const packageFolderPath: string = getAbsolutePackageFolderPathFromReadmeFileContents(azureSDKForJSRepoRoot, typeScriptReadmeFileContents);
                npmInstall(packageFolderPath);
            } catch (err) {
                _logger.log('Error:');
                _logger.log(`An error occurred while generating client for packages: "${packageNamesString}":\nErr: ${err}\nStderr: "${err.stderr}"`);
            }

            _logger.log(`>>>>>>>>>>>>>>>>>>> End: "${packageNamesString}" >>>>>>>>>>>>>>>>>>>>>>>>>`);
            _logger.log();
        }
    }
}

export async function generateTsReadme(packageName: string, sdkType: SdkType, azureRestApiSpecsRepositoryPath: string, specDirectory?: string, skipSpecificationGeneration?: boolean): Promise<{ pullRequestUrl?: string, typescriptReadmePath?: string }> {
    if (skipSpecificationGeneration) {
        _logger.log(`Skipping spec generation`);
        return { };
    }

    const azureRestApiSpecRepository = await getValidatedRepository(azureRestApiSpecsRepositoryPath);
    _logger.log(`Found azure-rest-api-specs repository in ${azureRestApiSpecsRepositoryPath}`);

    await refreshRepository(azureRestApiSpecRepository);
    _logger.log(`Refreshed ${azureRestApiSpecsRepositoryPath} repository successfully`);

    const sdkPath: string = specDirectory || await findSdkDirectory(azureRestApiSpecsRepositoryPath, packageName, sdkType);
    _logger.log(`Found specification in ${sdkPath}`);

    await waitAndLockGitRepository(azureRestApiSpecRepository);
    const typescriptReadmePath: string = await copyExistingNodeJsReadme(sdkPath);
    _logger.log(`Copied readme file successfully`);

    const newContent: string = await updateTypeScriptReadmeFile(typescriptReadmePath, sdkType);
    _logger.log(`Generated content of the new TypeScript readme file successfully`);

    await saveContentToFile(typescriptReadmePath, newContent);
    _logger.log(`Content saved successfully to ${typescriptReadmePath}`);

    const readmeFilePath = path.resolve(sdkPath, "readme.md");
    const updatedReadmeContent: string = await updateMainReadmeFile(readmeFilePath);
    _logger.log(`Updated content of the readme file successfully`);

    await saveContentToFile(readmeFilePath, updatedReadmeContent);
    _logger.log(`Content saved successfully to ${readmeFilePath}`);

    const relativeReadmePath = typescriptReadmePath.replace(`${azureRestApiSpecsRepositoryPath}${path.sep}specification${path.sep}`, "");
    const pullRequestTitle = `Add ${relativeReadmePath}`
    const pullRequestDescription = "Auto generated";
    const validate: ValidateFunction = statuses => statuses.length == 2;

    const pullRequestUrl = await commitAndCreatePullRequest(azureRestApiSpecRepository, packageName, pullRequestTitle, "azure-rest-api-specs", pullRequestTitle, pullRequestDescription, validate, `specification/${packageName}`);
    await unlockGitRepository(azureRestApiSpecRepository);

    return { pullRequestUrl: pullRequestUrl, typescriptReadmePath: typescriptReadmePath };
}

export async function generateMissingSdk(azureSdkForJsRepoPath: string, packageName: string, sdkType: SdkType, azureRestApiSpecsRepositoryPath: string, skipSpecGeneration?: boolean, skipSdkGeneration?: boolean): Promise<string> {
    const readmeGenerationResult = await generateTsReadme(packageName, sdkType, azureRestApiSpecsRepositoryPath, undefined, skipSpecGeneration);
    if (skipSdkGeneration) {
        _logger.log(`Skipping sdk generation`);
        return "";
    }

    if (readmeGenerationResult.typescriptReadmePath) {
        const generatedPackageName = await getSinglePackageName(readmeGenerationResult.typescriptReadmePath);
        packageName = generatedPackageName;
    }

    const azureSdkForJsRepository = await getValidatedRepository(azureSdkForJsRepoPath);
    await refreshRepository(azureSdkForJsRepository);
    _logger.log(`Refreshed ${azureSdkForJsRepoPath} repository successfully`);

    await waitAndLockGitRepository(azureSdkForJsRepository);
    await generateSdk(azureRestApiSpecsRepositoryPath, azureSdkForJsRepoPath, packageName);
    _logger.log(`Generated ${packageName} SDK successfully`);

    const pullRequestTitle = `Generate ${packageName} package`;
    const pullRequestDescription =
    `Auto generated. Matching specification pull request - ${readmeGenerationResult.pullRequestUrl}\n\n\n
\`\`\`
${_logger.getCapturedText()}
\`\`\``

    const validate: ValidateFunction = changes => changes.length > 0;

    const pullRequestUrl = await commitAndCreatePullRequest(azureSdkForJsRepository, packageName, pullRequestTitle, "azure-sdk-for-js", pullRequestTitle, pullRequestDescription, validate, `packages/${packageName}`);
    await unlockGitRepository(azureSdkForJsRepository);

    return pullRequestUrl;
}

export async function generateAllMissingSdks(azureSdkForJsRepoPath: string, azureRestApiSpecsRepository: string, skipSpecGeneration: boolean, skipSdkGeneration: boolean) {
    const missingSdks = await findMissingSdks(azureRestApiSpecsRepository);
    _logger.log(`Found ${missingSdks.length} missing specifications`);

    for (const missingSdk of missingSdks) {
        try {
            await generateMissingSdk(azureSdkForJsRepoPath, missingSdk.sdkName, missingSdk.sdkType, azureRestApiSpecsRepository, skipSpecGeneration, skipSdkGeneration);
        } catch (error) {
            _logger.logError(error);
            continue;
        }
    }
}

export async function regenerate(branchName: string, packageName: string, azureSdkForJsRepoPath: string, azureRestAPISpecsPath: string, pullRequestId?: number, skipVersionBump?: boolean, requestReview?: boolean) {
    const azureSdkForJsRepository = await getValidatedRepository(azureSdkForJsRepoPath);
    await refreshRepository(azureSdkForJsRepository);
    _logger.log(`Refreshed ${azureSdkForJsRepository.path()} repository successfully`);

    const remoteBranch = new Branch(branchName, BranchLocation.Remote);
    await checkoutRemoteBranch(azureSdkForJsRepository, remoteBranch);
    _logger.log(`Checked out ${branchName} branch`);

    const localBranch = remoteBranch.convertTo(BranchLocation.Local);
    await rebaseBranch(azureSdkForJsRepository, localBranch);
    _logger.log(`Merged master into ${localBranch.shorthand()} successfully`);

    if (skipVersionBump) {
        _logger.log("Skipping version bump");
    } else {
        await bumpMinorVersion(azureSdkForJsRepoPath, packageName);
        _logger.log(`Successfully updated version in package.json`);
    }

    await generateSdk(azureRestAPISpecsPath, azureSdkForJsRepoPath, packageName)
    _logger.log(`Generated sdk successfully`);

    await commitAndPush(azureSdkForJsRepository, localBranch, `Regenerated "${packageName}" SDK.`, undefined, `packages/${packageName}`);
    _logger.log(`Committed and pushed the changes successfully`);

    await forcePrDiffRefresh("azure-sdk-for-js", pullRequestId);
    _logger.logDebug(`Force refreshed pull request successfully`);

    if (requestReview) {
        if (!pullRequestId) {
            const pullRequest = await findPullRequest("azure-sdk-for-js", branchName, "open");
            pullRequestId = pullRequest.id;
        }
        await requestPullRequestReview("azure-sdk-for-js", pullRequestId);
        _logger.log(`Requested review on PR ${pullRequestId} successfully`);
    } else {
        _logger.log("Skipping review requesting");
    }
}

async function bumpMinorVersion(azureSdkForJsRepoPath: string, packageName: string) {
    const pathToPackageJson = path.resolve(azureSdkForJsRepoPath, "packages", packageName, "package.json");
    const packageJsonContent = await fs.promises.readFile(pathToPackageJson);
    const packageJson = JSON.parse(packageJsonContent.toString());
    const versionString = packageJson.version;
    const version = Version.parse(versionString);
    version.bumpMinor();
    _logger.log(`Updating package.json version from ${versionString} to ${version.toString()}`);

    packageJson.version = version.toString();
    await saveContentToFile(pathToPackageJson, JSON.stringify(packageJson, undefined, "  "));
}
