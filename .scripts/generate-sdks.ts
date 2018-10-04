/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as colors from "colors";
import { promises as fs } from "fs";
import * as fssync from "fs";
import * as path from "path";
import * as minimist from "minimist";

const repositoryName = "azure-rest-api-specs";
const specificationsSegment = "specification";

interface CommandLineOptions extends minimist.ParsedArgs {
    package: string,
    type: string,
    debug: boolean,
    d: boolean,
    verbose: boolean,
    b: boolean,
    getSdkType(): SdkType;
}

enum SdkType {
    ResourceManager,
    DataPlane
}

const args = minimist(process.argv.slice(2), {
    string: [ "package", "type" ],
    boolean: ["debug", "verbose"],
    alias: {
        d: "debug",
        package: "packageName",
        v: "version",
    }
}) as CommandLineOptions;

function contains<T>(array: T[], el: T): boolean {
    return array.indexOf(el) != -1
}

async function exists(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fssync.exists(path, exists => {
            resolve(exists);
        })
    });
}

args.getSdkType = function() {
    const resourceManagerStrings = [ "arm", "rm", "resourcemanager" ]
    const dataPlaneStrings = [ "dp", "data", "dataplane" ]

    const type = this.type.toLowerCase().replace("-", "");
    if (contains(resourceManagerStrings, type)) {
        return SdkType.ResourceManager;
    } else if (contains(dataPlaneStrings, type)) {
        return SdkType.DataPlane;
    } else {
        throw new Error("Uknown SDK type");
    }
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
    return await exists(path.resolve(parentPath, directoryName));
}

export async function findSdkDirectory(azureRestApiSpecsRepository: string): Promise<string> {
    const sdkSegment = args.getSdkType() === SdkType.ResourceManager ? "resource-manager" : "data-plane";
    const sdkPath = path.resolve(azureRestApiSpecsRepository, specificationsSegment, args.packageName, sdkSegment);

    if (await exists(sdkPath)) {
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

        for (const sdkTypeDirectory of await fs.readdir(fullServicePath)) {
            const fullSdkPath = path.resolve(fullServicePath, sdkTypeDirectory);
            const readmeFiles = (await fs.readdir(fullSdkPath)).filter(file => /^readme/.test(file));
            const fullSpecName = `${serviceDirectory} [${sdkTypeDirectory}]`

            if (readmeFiles.length <= 1) {
                // Only "readme.md" so we don't expect readme.nodejs.md to exist
                continue;
            }

            if (contains(readmeFiles, "readme.nodejs.md")) {
                if (!contains(readmeFiles, "readme.typescript.md")) {
                    missingSdks.push(fullSdkPath);

                    console.log(colors.red(fullSpecName))
                } else if (args.debug) {
                    console.log(colors.green(fullSpecName))
                }
            }
        }
    }

    return missingSdks;
}

async function doesReadmeMdFileSpecifiesTypescriptSdk(readmeMdPath: string) {
    const readmeMdBuffer = await fs.readFile(readmeMdPath);
    const sectionBeginning = "``` yaml $(swagger-to-sdk)"
    const sectionEnd = "```"

    const beginningIndex = readmeMdBuffer.indexOf(sectionBeginning);
    const trimmedBuffer = readmeMdBuffer.slice(beginningIndex);

    const endIndex = trimmedBuffer.indexOf(sectionEnd);
    const sectionBuffer = trimmedBuffer.slice(0, endIndex);

    console.log(sectionBuffer.toString());
}

export async function copyExistingNodeJsReadme(sdkPath: string) {
    const nodeJsReadmePath = path.resolve(sdkPath, "readme.nodejs.md");
    const typescriptReadmePath = path.resolve(sdkPath, "readme.typescript.md");

    if (args.verbose) {
        console.log(`Copying ${nodeJsReadmePath} to ${typescriptReadmePath}`)
    }

    if (exists(typescriptReadmePath)) {
        throw new Error(`Typescript readme file already exists in ${sdkPath}`)
    }

    await fs.copyFile(nodeJsReadmePath, typescriptReadmePath);
}
