/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { promises as fs } from "fs";
import * as path from "path";
import { SdkType } from "./commandLine";
import { pathExists, isDirectory, arrayContains } from "./common";
import { getLogger } from "./logger";
import { doesReadmeMdFileSpecifiesTypescriptSdk } from "./readme";

const repositoryName = "azure-rest-api-specs";
const specificationsSegment = "specification";
const logger = getLogger();

if (!fs) {
    throw new Error("This script has to be run on Node.js 10.0+");
}

export async function findAzureRestApiSpecsRepository(): Promise<string> {
    let currentDirectory = __dirname;
    const pathData = path.parse(currentDirectory);
    const rootDirectory = pathData.root;

    do {
        currentDirectory = path.resolve(currentDirectory, "..");

        if (await containsDirectory(repositoryName, currentDirectory)) {
            return path.resolve(currentDirectory, repositoryName);
        }

    } while (currentDirectory != rootDirectory);

    throw new Error(`${repositoryName} not found!`)
}

async function containsDirectory(directoryName: string, parentPath: string): Promise<boolean> {
    return await pathExists(path.resolve(parentPath, directoryName));
}

export async function findSdkDirectory(azureRestApiSpecsRepository: string, packageName: string, sdkType: SdkType): Promise<string> {
    const sdkSegment = sdkType === SdkType.ResourceManager ? "resource-manager" : "data-plane";
    const sdkPath = path.resolve(azureRestApiSpecsRepository, specificationsSegment, packageName, sdkSegment);

    if (await !pathExists(sdkPath)) {
        throw new Error(`${sdkPath} SDK specs don't exist`);
    }

    return sdkPath;
}

export async function findMissingSdks(azureRestApiSpecsRepository: string): Promise<string[]> {
    const specsDirectory = path.resolve(azureRestApiSpecsRepository, specificationsSegment);
    const serviceSpecs = await fs.readdir(specsDirectory);

    const missingSdks = [];

    for (const serviceDirectory of serviceSpecs) {
        const fullServicePath = path.resolve(specsDirectory, serviceDirectory);
        if (!(await isDirectory(fullServicePath))) {
            continue;
        }

        const sdkTypeDirectories = await fs.readdir(fullServicePath);

        for (const sdkTypeDirectory of sdkTypeDirectories) {
            const fullSdkPath = path.resolve(fullServicePath, sdkTypeDirectory);
            if (!(await isDirectory(fullSdkPath))) {
                continue;
            }

            const readmeFiles = (await fs.readdir(fullSdkPath)).filter(file => /^readme/.test(file));
            const fullSpecName = `${serviceDirectory} [${sdkTypeDirectory}]`

            if (readmeFiles.length <= 0) {
                // No readme.md
                continue;
            } else if (readmeFiles.length == 1) {
                const readmeMdPath = readmeFiles[0];
                if (await doesReadmeMdFileSpecifiesTypescriptSdk(readmeMdPath)) {
                    missingSdks.push(fullSdkPath);
                    logger.log(`${fullSpecName}`.negative);
                } else {
                    logger.logVerbose(fullSpecName.positive);
                }
            } else if (arrayContains(readmeFiles, "readme.nodejs.md")) {
                if (!arrayContains(readmeFiles, "readme.typescript.md")) {
                    missingSdks.push(fullSdkPath);
                    logger.log(`${fullSpecName}`.negative);
                } else {
                    logger.logVerbose(fullSpecName.positive);
                }
            }
        }
    }

    return missingSdks;
}

export async function saveContentToFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content);
}

