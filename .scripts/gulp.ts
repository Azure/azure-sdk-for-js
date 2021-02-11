/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { execSync } from "child_process";
import fs from "fs";
import * as path from "path";
import { contains, npmInstall, npmRunTest } from "./common";
import { Logger } from "./logger";
import { getPackageInformationFromPackageJsons, PackageInfo } from "./packages";
import { findReadmeTypeScriptMdFilePaths, getAbsolutePackageFolderPathFromReadmeFileContents, getPackageNamesFromReadmeTypeScriptMdFileContents } from "./readme";
import { NPMViewResult, NPMScope } from "@ts-common/azure-js-dev-tools";

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

export async function generateSdk(azureRestAPISpecsRoot: string, azureSDKForJSRepoRoot: string, packageName: string, use?: string, useDebugger?: boolean) {
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
                const packageFolderPath: string | undefined = getAbsolutePackageFolderPathFromReadmeFileContents(azureSDKForJSRepoRoot, typeScriptReadmeFileContents);
                if (!packageFolderPath) {
                    _logger.log('Error:');
                    _logger.log(`Could not determine the generated package folder's path from ${typeScriptReadmeFilePath}.`);
                } else {
                    await npmInstall(packageFolderPath);
                    await npmRunTest(packageFolderPath);
                }
            } catch (err) {
                _logger.log('Error:');
                _logger.log(`An error occurred while generating client for packages: "${packageNamesString}":\nErr: ${err}\nStderr: "${err.stderr}"`);
            }

            _logger.log(`>>>>>>>>>>>>>>>>>>> End: "${packageNamesString}" >>>>>>>>>>>>>>>>>>>>>>>>>`);
            _logger.log();
        }
    }
}

function getPackageConfig(azureSdkForJsRoot: string, packageInfo: PackageInfo, include?: RegExp, exclude?: RegExp): { content: any; path: string } | undefined {
    if (!include) {
        include = /.*/;
    }

    if (!packageInfo.name || (!packageInfo.name.match(include) || (exclude && packageInfo.name.match(exclude)))) {
        _logger.log(`Skipping ${packageInfo.name} package`);
        return undefined;
    }

    if (!packageInfo.outputPath) {
        throw new Error("Output path cannot be undefined");
    }

    const packageJsonPath = path.join(azureSdkForJsRoot, packageInfo.outputPath, "package.json");
    _logger.log(`Reading "${packageJsonPath}"`);
    const configContent = fs.readFileSync(packageJsonPath);
    const config = JSON.parse(configContent.toString());

    return { content: config, path: packageJsonPath };
}

export async function setAutoPublish(azureSdkForJsRoot: string, include?: RegExp, exclude?: RegExp) {
    const jsonPackageInfos = await getPackageInformationFromPackageJsons(azureSdkForJsRoot);

    for (const packageInfo of jsonPackageInfos) {
        _logger.log(`Analyzing ${packageInfo.name} package`);
        const config = getPackageConfig(azureSdkForJsRoot, packageInfo, include, exclude);
        if (!config) {
            _logger.log(`Skipping ${packageInfo.name} package`);
            continue;
        }

        config.content["autoPublish"] = true;
        fs.writeFileSync(config.path, JSON.stringify(config.content, undefined, "  ") + "\n");
        _logger.log("Saved");
    }
}

export async function setVersion(azureSdkForJsRoot: string, include?: RegExp, exclude?: RegExp) {
    if (!include) {
        include = /.*/;
    }

    const jsonPackageInfos = await getPackageInformationFromPackageJsons(azureSdkForJsRoot);

    for (const packageInfo of jsonPackageInfos) {
        _logger.log(`Analyzing ${packageInfo.name} package`);
        const config = getPackageConfig(azureSdkForJsRoot, packageInfo, include, exclude);
        if (!config) {
            _logger.log(`Skipping ${packageInfo.name} package`);
            continue;
        }

        const nodeName = packageInfo.name!.replace("@", "").replace("/", "-");
        const npm = new NPMScope({});
        const npmViewResult: NPMViewResult = npm.view({ packageName: nodeName });

        if (!npmViewResult.version) {
            continue;
        }

        config.content["version"] = npmViewResult.version!.replace("-preview", "");
        fs.writeFileSync(config.path, JSON.stringify(config.content, undefined, "  ") + "\n");
        _logger.log("Saved");
    }
}
