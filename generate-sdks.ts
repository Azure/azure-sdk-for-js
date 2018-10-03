/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as colors from "colors";
import * as fs from "fs";
import * as path from "path";
import * as minimist from "minimist";

const repositoryName = "azure-rest-api-specs";
const specificationsSegment = "specification";

const contains = function (array, el) {
    return array.indexOf(el) != -1
}

const args = minimist(process.argv.slice(2), {
    boolean: ["debug", "verbose"],
    alias: {
        d: "debug",
        v: "version"
    }
})

export function findAzureRestApiSpecsRepository(): string {
    let currentDirectory = __dirname;
    const pathData = path.parse(currentDirectory);
    const rootDirectory = pathData.root;

    do {
        currentDirectory = path.resolve(currentDirectory, "..");

        if (containsDirectory(repositoryName, currentDirectory)) {
            return path.resolve(currentDirectory, repositoryName);
        }

    } while (currentDirectory != rootDirectory);

    throw `${repositoryName} not found!`
}

function containsDirectory(directoryName: string, parentPath: string): boolean {
    return fs.existsSync(path.resolve(parentPath, directoryName));
}

export function getCommandLineParameterValue(parameterName: string, args: string[]): string {
    const parameterIndex = args.indexOf(`--${parameterName}`);
    if (parameterIndex < 0) {
        throw `Parameter ${parameterName} not found`;
    }

    return args[parameterIndex + 1];
}

export function findSdkDirectory(azureRestApiSpecsRepository: string, packageName: string, sdkType: string): string {
    const sdkSegment = sdkType === "arm" ? "resource-manager" : "data-plane";
    const sdkPath = path.resolve(azureRestApiSpecsRepository, specificationsSegment, packageName, sdkSegment);

    if (!fs.existsSync(sdkPath)) {
        throw `SDK specs don't exist`;
    }

    return sdkPath;
}

export function findMissingSdks(azureRestApiSpecsRepository: string) {
    const specsDirectory = path.resolve(azureRestApiSpecsRepository, specificationsSegment);
    const serviceSpecs = fs.readdirSync(specsDirectory);

    const missingSdks = [];

    for (const serviceDirectory of serviceSpecs) {
        const fullServicePath = path.resolve(specsDirectory, serviceDirectory);

        for (const sdkTypeDirectory of fs.readdirSync(fullServicePath)) {
            const fullSdkPath = path.resolve(fullServicePath, sdkTypeDirectory);
            const readmeFiles = fs.readdirSync(fullSdkPath).filter(file => /^readme/.test(file));
            const fullSpecName = `${serviceDirectory} [${sdkTypeDirectory}]`

            if (readmeFiles.length <= 1) {
                // Only "readme.md" so we don't expect readme.nodejs.md to exist
                continue;
            }

            if (contains(readmeFiles, "readme.nodejs.md")) {
                if (!contains(readmeFiles, "readme.typescript.md")) {
                    missingSdks.push(fullSdkPath);

                    if (args.verbose) {
                        console.log(colors.red(fullSpecName))
                    }
                } else if (args.debug) {
                    console.log(colors.green(fullSpecName))
                }
            }
        }
    }

    return missingSdks;
}
