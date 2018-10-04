/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fssync from "fs";
import { promises as fs } from "fs";
import * as path from "path";
import * as minimist from "minimist";
import * as yaml from "js-yaml";
import { CommandLineOptions, SdkType } from "./commandLineOptions";
import { Logger } from "./logger";

interface readmeSettings {
    "nodejs": {
        "azure-arm": boolean;
        "license-header": string;
        "payload-flattening-threshold": number;
        "package-name": string;
        "output-folder": string;
        "generate-license-txt": boolean | undefined;
        "generate-package-json": boolean | undefined;
        "generate-readme-md": boolean | undefined;
        "generate-metadata": boolean | undefined;
    } | undefined;
}

const repositoryName = "azure-rest-api-specs";
const specificationsSegment = "specification";

const args = minimist(process.argv.slice(2), {
    string: ["package", "type"],
    boolean: ["debug", "verbose"],
    alias: {
        d: "debug",
        package: "packageName",
        v: "version",
    },
    default: {
        type: "arm"
    }
}) as CommandLineOptions;

const _logger = new Logger(args);

if (!fs) {
    throw new Error("This script has to be run on Node.js 10.0+");
}

function contains<T>(array: T[], el: T): boolean {
    return array.indexOf(el) != -1
}

async function isDirectory(directoryPath: string): Promise<boolean> {
    const stats = await fs.lstat(directoryPath);
    return stats.isDirectory();
}

async function exists(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fssync.exists(path, exists => {
            resolve(exists);
        })
    });
}

args.getSdkType = function () {
    const resourceManagerStrings = ["arm", "rm", "resourcemanager"]
    const dataPlaneStrings = ["dp", "data", "dataplane"]

    const type = this.type.toLowerCase().replace("-", "");
    if (contains(resourceManagerStrings, type)) {
        return SdkType.ResourceManager;
    } else if (contains(dataPlaneStrings, type)) {
        return SdkType.DataPlane;
    } else {
        throw new Error("Unknown SDK type");
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

    if (await !exists(sdkPath)) {
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
                    _logger.logRed(`${fullSpecName}`);
                } else if (args.debug) {
                    _logger.logGreen(fullSpecName);
                }
            } else if (contains(readmeFiles, "readme.nodejs.md")) {
                if (!contains(readmeFiles, "readme.typescript.md")) {
                    missingSdks.push(fullSdkPath);
                    _logger.logRed(`${fullSpecName}`);
                } else if (args.debug) {
                    _logger.logGreen(fullSpecName);
                }
            }
        }
    }

    return missingSdks;
}

async function getYamlSection(buffer: Buffer, sectionBeginning: string, sectionEnd: string): Promise<Buffer> {
    const beginningIndex = buffer.indexOf(sectionBeginning);
    const trimmedBuffer = buffer.slice(beginningIndex + (sectionBeginning.length));

    const endIndex = trimmedBuffer.indexOf(sectionEnd, 3);
    const sectionBuffer = trimmedBuffer.slice(0, endIndex);

    return sectionBuffer;
}

async function doesReadmeMdFileSpecifiesTypescriptSdk(readmeMdPath: string): Promise<boolean> {
    const readmeMdBuffer = await fs.readFile(readmeMdPath);
    const sectionBuffer = await getYamlSection(readmeMdBuffer, "``` yaml $(swagger-to-sdk)", "```");

    if (sectionBuffer.includes("azure-sdk-for-js")) {
        return true;
    }

    return false;
}

export async function copyExistingNodeJsReadme(sdkPath: string): Promise<string> {
    const nodeJsReadmePath = path.resolve(sdkPath, "readme.nodejs.md");
    const typescriptReadmePath = path.resolve(sdkPath, "readme.typescript.md");

    if (args.verbose) {
        _logger.log(`Copying ${nodeJsReadmePath} to ${typescriptReadmePath}`)
    }

    if (await exists(typescriptReadmePath)) {
        throw new Error(`${typescriptReadmePath} file already exists`)
    }

    await fs.copyFile(nodeJsReadmePath, typescriptReadmePath);
    return typescriptReadmePath;
}

async function updatePackageName(settings: readmeSettings): Promise<readmeSettings> {
    const packageName = settings.nodejs["package-name"]
    if (packageName.startsWith("arm") || !packageName.startsWith("azure-")) {
        return settings;
    }

    settings.nodejs["package-name"] = packageName.replace("azure-", "");
    return settings;
}

async function updateMetadataFields(settings: readmeSettings): Promise<readmeSettings> {
    settings.nodejs["generate-metadata"] = true;
    delete settings.nodejs["generate-license-txt"]
    delete settings.nodejs["generate-package-json"]
    delete settings.nodejs["generate-readme-md"];

    return settings;
}

async function updateOutputFolder(settings: readmeSettings): Promise<readmeSettings> {
    settings.nodejs["output-folder"] = `$(typescript-sdks-folder)/packages/${settings.nodejs["package-name"]}`;
    return settings;
}

async function updateYamlSection(sectionText: string): Promise<string> {
    const section = yaml.safeLoad(sectionText);
    await updatePackageName(section);
    await updateMetadataFields(section);
     await updateOutputFolder(section);
    section["typescript"] = section.nodejs;
    delete section.nodejs;

    return yaml.safeDump(section).trim();
}

export async function updateTypeScriptReadmeFile(typescriptReadmePath: string): Promise<string> {
    const readmeBuffer: Buffer = await fs.readFile(typescriptReadmePath);
    const readme: string = readmeBuffer.toString();
    let outputReadme = readme;

    const yamlSection = await getYamlSection(readmeBuffer, "``` yaml $(nodejs)", "```");
    const sectionText = yamlSection.toString().trim();
    const updatedYamlSection = await updateYamlSection(sectionText);

    outputReadme = outputReadme.replace(sectionText, updatedYamlSection);
    outputReadme = outputReadme.replace("azure-sdk-for-node", "azure-sdk-for-js");
    outputReadme = outputReadme.replace("Node.js", "TypeScript");
    outputReadme = outputReadme.replace("$(nodejs)", "$(typescript)");
    outputReadme = outputReadme.replace("nodejs", "typescript");
    outputReadme = outputReadme.replace("Node", "TypeScript");
    outputReadme = outputReadme.replace("node", "typescript");

    return outputReadme;
}

export async function saveContentToFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content);
}