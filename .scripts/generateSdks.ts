/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { promises as fs } from "fs";
import * as path from "path";
import { SdkType } from "./commandLine";
import { pathExists, isDirectory, arrayContains } from "./common";
import { Logger } from "./logger";
import { doesReadmeMdFileSpecifiesTypescriptSdk } from "./readme";

const repositoryName = "azure-rest-api-specs";
const specificationsSegment = "specification";

const _logger = Logger.get();

if (!fs) {
    throw new Error("This script has to be run on Node.js 10.0+");
}

export async function findAzureRestApiSpecsRepositoryPath(): Promise<string> {
    let currentDirectory = __dirname;
    const pathData = path.parse(currentDirectory);
    const rootDirectory = pathData.root;

    do {
        currentDirectory = path.resolve(currentDirectory, "..");

        if (await containsDirectory(repositoryName, currentDirectory)) {
            return path.resolve(currentDirectory, repositoryName);
        }

    } while (currentDirectory != rootDirectory);

    return Promise.reject(`${repositoryName} not found!`)
}

async function containsDirectory(directoryName: string, parentPath: string): Promise<boolean> {
    return await pathExists(path.resolve(parentPath, directoryName));
}

export async function findSdkDirectory(azureRestApiSpecsRepository: string, packageName: string, sdkType: SdkType): Promise<string> {
    const sdkPath = path.resolve(azureRestApiSpecsRepository, specificationsSegment, packageName, sdkType);

    if (await !pathExists(sdkPath)) {
        return Promise.reject(`${sdkPath} SDK specs don't exist`);
    }

    return sdkPath;
}

export async function findMissingSdks(azureRestApiSpecsRepository: string): Promise<{ sdkName: string; sdkType: SdkType }[]> {
    _logger.logTrace(`Finding missing SDKS in ${azureRestApiSpecsRepository}`);

    const specsDirectory = path.resolve(azureRestApiSpecsRepository, specificationsSegment);
    _logger.logTrace(`Reading "${azureRestApiSpecsRepository}" directory`);

    const serviceSpecs = await fs.readdir(specsDirectory);
    _logger.logTrace(`Found ${serviceSpecs.length} specification folders`);

    const missingSdks = [];

    for (const serviceDirectory of serviceSpecs) {
        const fullServicePath = path.resolve(specsDirectory, serviceDirectory);
        _logger.logTrace(`Analyzing ${serviceDirectory} in ${fullServicePath}`);

        if (!(await isDirectory(fullServicePath))) {
            _logger.logWarn(`"${fullServicePath}" is not a directory. Skipping`);
            continue;
        }

        const sdkTypeDirectories = await fs.readdir(fullServicePath);
        _logger.logTrace(`Found ${sdkTypeDirectories.length} specification type folders: [${sdkTypeDirectories}]`);

        for (const sdkTypeDirectory of sdkTypeDirectories) {
            const fullSdkPath = path.resolve(fullServicePath, sdkTypeDirectory);
            _logger.logTrace(`Analyzing ${sdkTypeDirectory} in ${fullSdkPath}`);

            if (!(await isDirectory(fullSdkPath))) {
                _logger.logWarn(`"${fullServicePath}" is not a directory. Skipping`);
                continue;
            }

            const readmeFiles = (await fs.readdir(fullSdkPath)).filter(file => /^readme/.test(file));
            const fullSpecName = `${serviceDirectory} [${sdkTypeDirectory}]`
            const sdk = { sdkName: serviceDirectory, sdkType: sdkTypeDirectory };

            if (readmeFiles.length <= 0) {
                // No readme.md
                continue;
            } else if (arrayContains(readmeFiles, "readme.nodejs.md")) {
                if (!arrayContains(readmeFiles, "readme.typescript.md")) {
                    missingSdks.push(sdk);
                    _logger.logWithDebugDetails(`${fullSpecName}`.negative, "readme.nodejs.md exists but no matching readme.typescript.md");
                } else {
                    _logger.logDebug(fullSpecName.positive);
                }
            } else if (arrayContains(readmeFiles, "readme.md")) {
                const readmeMdPath = path.resolve(fullSdkPath, "readme.md");
                if (await doesReadmeMdFileSpecifiesTypescriptSdk(readmeMdPath)) {
                    missingSdks.push(sdk);
                    _logger.logWithDebugDetails(`${fullSpecName}`.negative, "typescript mentioned in readme.md but no readme.typescript.md exists");
                } else {
                    _logger.logDebug(fullSpecName.positive);
                }
            }
        }
    }

    return missingSdks;
}

export async function saveContentToFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content);
}

