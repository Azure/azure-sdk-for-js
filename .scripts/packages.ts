/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fssync from "fs";
import { promises as fs } from "fs";
import * as path from "path";
import { SdkType, parseSdkType } from "./commandLine";
import { pathExists, isDirectory, arrayContains, getChildDirectories } from "./common";
import { Logger } from "./logger";
import { doesReadmeMdFileSpecifiesTypescriptSdk, findReadmeTypeScriptMdFilePaths, getOutputFolderFromReadmeTypeScriptMdFileContents, getAbsolutePackageFolderPathFromReadmeFileContents, getPackageNamesFromReadmeTypeScriptMdFileContents } from "./readme";

export type SdkInfo = { sdkName: string; sdkType: SdkType };
export type PackageInfo = {
    name?: string;
    version?: string;
    outputPath?: string,
    readmePath?: string,
    dependencies?: { [key: string]: string }
};
export type PackageFault = {
    package: PackageInfo
    message?: string;
};

const specificationsSegment = "specification";
const _logger = Logger.get();

if (!fs) {
    throw new Error("This script has to be run on Node.js 10.0+");
}

export async function findSdkDirectory(azureRestApiSpecsRepository: string, packageName: string, sdkType: SdkType): Promise<string> {
    const sdkPath = path.resolve(azureRestApiSpecsRepository, specificationsSegment, packageName, sdkType);

    if (await !pathExists(sdkPath)) {
        return Promise.reject(`${sdkPath} SDK specs don't exist`);
    }

    return sdkPath;
}

export async function findMissingSdks(azureRestApiSpecsRepository: string): Promise<SdkInfo[]> {
    _logger.logDebug(`Finding missing SDKS in ${azureRestApiSpecsRepository}`);

    const specsDirectory = path.resolve(azureRestApiSpecsRepository, specificationsSegment);
    _logger.logTrace(`Reading "${azureRestApiSpecsRepository}" directory`);

    const serviceSpecs = await fs.readdir(specsDirectory);
    _logger.logTrace(`Found ${serviceSpecs.length} specification folders`);

    const missingSdks = [];

    for (const serviceDirectory of serviceSpecs) {
        const fullServicePath = path.resolve(specsDirectory, serviceDirectory);
        _logger.logTrace(`Analyzing ${serviceDirectory} in ${fullServicePath}`);

        if (!(await isDirectory(fullServicePath))) {
            _logger.logDebug(`"${fullServicePath}" is not a directory. Skipping`);
            continue;
        }

        const sdkTypeDirectories = await findChildDirectoriesRecursively(fullServicePath);
        _logger.logTrace(`Found ${sdkTypeDirectories.length} specification type folders: [${sdkTypeDirectories}]`);

        for (const sdkTypeDirectory of sdkTypeDirectories) {
            const missingSdk = await analyzeSingleDirectory(fullServicePath, serviceDirectory, sdkTypeDirectory);
            if (missingSdk) {
                missingSdks.push(missingSdk);
            }
        }
    }

    return missingSdks;
}

async function findChildDirectoriesRecursively(directoryPath: string): Promise<string[]> {
    const _findChildDirectoriesRecursively = async (dirPath: string, paths: string[]) => {
        const children = await getChildDirectories(dirPath);
        for (const child of children) {
            const fullPath = path.resolve(dirPath, child);
            paths.push(fullPath);
            await _findChildDirectoriesRecursively(fullPath, paths);
        }
    }

    const allDirectories = [];
    await _findChildDirectoriesRecursively(directoryPath, allDirectories);
    return allDirectories;
}

async function analyzeSingleDirectory(directoryPath: string, serviceDirectory: string, sdkTypeDirectory: string): Promise<SdkInfo | undefined> {
    const fullSdkPath = path.resolve(directoryPath, sdkTypeDirectory);
    _logger.logTrace(`Analyzing ${sdkTypeDirectory} in ${fullSdkPath}`);

    if (!(await isDirectory(fullSdkPath))) {
        _logger.logWarn(`"${directoryPath}" is not a directory. Skipping`);
        return undefined;
    }

    const readmeFiles = (await fs.readdir(fullSdkPath)).filter(file => /^readme/.test(file));
    const fullSpecName = `${serviceDirectory} [${sdkTypeDirectory}]`
    const sdk = { sdkName: serviceDirectory, sdkType: parseSdkType(sdkTypeDirectory) };

    if (readmeFiles.length <= 0) {
        // No readme.md
        return undefined;
    } else if (arrayContains(readmeFiles, "readme.nodejs.md")) {
        if (!arrayContains(readmeFiles, "readme.typescript.md")) {
            _logger.logWithDebugDetails(`${fullSpecName}`.negative, "readme.nodejs.md exists but no matching readme.typescript.md");
            return sdk;
        } else {
            _logger.logDebug(fullSpecName.positive);
        }
    } else if (arrayContains(readmeFiles, "readme.md")) {
        const readmeMdPath = path.resolve(fullSdkPath, "readme.md");
        if (await doesReadmeMdFileSpecifiesTypescriptSdk(readmeMdPath)) {
            _logger.logWithDebugDetails(`${fullSpecName}`.negative, "typescript mentioned in readme.md but no readme.typescript.md exists");
            return sdk;
        } else {
            _logger.logDebug(fullSpecName.positive);
        }
    }
}

export async function saveContentToFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content);
}

export async function findWrongPackages(azureRestApiSpecsRoot: string, azureSdkForJsRoot: string): Promise<PackageFault[]> {
    _logger.logDebug(`Finding wrong packages using "${azureRestApiSpecsRoot}" and "${azureSdkForJsRoot}" repositories`);
    const readmePackageInfos = await getPackageInformationFromReadmeFiles(azureRestApiSpecsRoot, azureSdkForJsRoot);
    const jsonPackageInfos = await getPackageInformationFromPackageJsons(azureSdkForJsRoot);

    const noOutputPackages = await findPackagesWithIncorrectOutput(readmePackageInfos);
    const noMatchingReadmes = await findPackagesWithoutMatchingReadmes(readmePackageInfos, jsonPackageInfos);
    const noMatchingPackageJsons = await findPackagesWithoutMatchingPackageJson(readmePackageInfos, jsonPackageInfos);

    return noOutputPackages
        .concat(noMatchingReadmes)
        .concat(noMatchingPackageJsons);
}

async function findPackagesWithIncorrectOutput(packageInfos: PackageInfo[]): Promise<PackageFault[]> {
    const incorrectPackages: PackageFault[] = [];

    for (const packageInfo of packageInfos) {
        if (!fssync.existsSync(packageInfo.outputPath)) {
            incorrectPackages.push({
                package: packageInfo,
                message: "Output path in azure-sdk-for-js repository doesn't exists. Hint: try regenerating the package."
            });
        }
    }

    return incorrectPackages;
}

async function findPackagesWithoutMatchingReadmes(readmePackageInfos: PackageInfo[], jsonPackageInfo: PackageInfo[]): Promise<PackageFault[]> {
    const faultyPackages = jsonPackageInfo.filter(json => readmePackageInfos.every(readme => readme.name !== json.name));

    return faultyPackages.map(pkg => {
        return {
            package: pkg,
            message: "Package exists in packages folder but no matching readme.typescript.md found. Hint: add readme.typescript.md based on existing readme.nodejs.md."
        }
    });
}

async function findPackagesWithoutMatchingPackageJson(readmePackageInfos: PackageInfo[], jsonPackageInfo: PackageInfo[]): Promise<PackageFault[]> {
    const faultyPackages = readmePackageInfos.filter(readme => jsonPackageInfo.every(json => json.name !== readme.name));

    return faultyPackages.map(pkg => {
        return {
            package: pkg,
            message: "Readme file with the name exists, but no matching package.json exists. Hint: try regenerating the package."
        }
    });
}

async function getPackageInformationFromPackageJsons(azureSdkForJsRoot: string): Promise<PackageInfo[]> {
    const packageJsonPaths = await getPackageJsons(azureSdkForJsRoot);
    const packageInfos = [];
    for (const packageJsonPath of packageJsonPaths) {
        const packageInfo = await getPackageInfoFromPackageJson(packageJsonPath, azureSdkForJsRoot);
        packageInfos.push(packageInfo);
    }

    return packageInfos;
}

async function getPackageJsons(azureSdkForJsRoot: string): Promise<string[]> {
    const packagesPath = path.resolve(azureSdkForJsRoot, "packages");
    const allChildDirectories = await findChildDirectoriesRecursively(packagesPath);
    const packagesJsonPaths = allChildDirectories
        .map(dir => path.resolve(dir, "package.json"))
        .filter(path => !path.includes("node_modules") && fssync.existsSync(path));

    _logger.logTrace(`Found ${packagesJsonPaths.length} package.json files`);
    return packagesJsonPaths;
}

async function getPackageInfoFromPackageJson(packageJsonPath: string, azureSdkForJsRoot: string): Promise<PackageInfo> {
    const packageJsonContent = await fs.readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonContent.toString());

    return {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: packageJson.dependencies,
        outputPath: packageJsonPath.replace("/package.json", "").replace(azureSdkForJsRoot, "")
    };
}

async function getPackageInformationFromReadmeFiles(azureRestApiSpecsRoot: string, azureSdkForJsRoot: string): Promise<PackageInfo[]> {
    const typescriptReadmePaths = findReadmeTypeScriptMdFilePaths(azureRestApiSpecsRoot);
    _logger.logTrace(`Found ${typescriptReadmePaths.length} readme files: ${typescriptReadmePaths}`);

    const packageInfos = [];

    for (const typescriptReadmePath of typescriptReadmePaths) {
        const packageInfo = await getPackageMetadataFromReadmeFile(azureSdkForJsRoot, azureRestApiSpecsRoot, typescriptReadmePath);
        _logger.logTrace(`Extracted ${JSON.stringify(packageInfo)} info from ${typescriptReadmePath}`);
        packageInfos.push(...packageInfo);
    }

    return packageInfos;
}

async function getPackageMetadataFromReadmeFile(azureSdkForJsRoot: string, azureRestApiSpecsRoot: string, tsReadmePath: string): Promise<PackageInfo[]> {
    const readmeBuffer = await fs.readFile(tsReadmePath);
    const readmeContent = readmeBuffer.toString()
    const absoluteOutputPath = getAbsolutePackageFolderPathFromReadmeFileContents(azureSdkForJsRoot, readmeContent);
    const packageNames = getPackageNamesFromReadmeTypeScriptMdFileContents(readmeContent);
    const packageName = packageNames.length == 1 ? packageNames[0] : JSON.stringify(packageNames);

    const packageInfos = packageNames.map(name => {
        return {
            name: name,
            outputPath: absoluteOutputPath,
            readmePath: tsReadmePath.replace(azureRestApiSpecsRoot, "")
        }
    });

    return packageInfos;
}
