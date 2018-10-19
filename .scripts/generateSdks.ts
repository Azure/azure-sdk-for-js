/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { promises as fs } from "fs";
import * as path from "path";
import { SdkType, parseSdkType } from "./commandLine";
import { pathExists, isDirectory, arrayContains, getChildDirectories } from "./common";
import { Logger } from "./logger";
import { doesReadmeMdFileSpecifiesTypescriptSdk } from "./readme";

export type SdkInfo = { sdkName: string; sdkType: SdkType }

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
            _findChildDirectoriesRecursively(fullPath, paths);
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

