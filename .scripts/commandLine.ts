/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as minimist from "minimist";
import * as path from "path";
import { arrayContains, findAzureRestApiSpecsRepositoryPathSync } from "./common";
import { Options } from "yargs";
import * as yargs from "yargs";

export type YargsMapping = { [key: string]: Options };

export enum SdkType {
    ResourceManager = "resource-manager",
    DataPlane = "data-plane",
    ControlPlane = "control-plane",
    Unknown = "unknown"
}

export module Argv {
    export const Options: { [key: string]: YargsMapping } = {
        Common: {
            "logging-level": {
                alias: "l",
                default: "info",
                choices: ["all", "trace", "debug", "info", "warn", "error"],
                global: true,
                description: "Defines how detailed logging statements are"
            }
        },
        Generate: {
            "skip-spec": {
                boolean: true,
                description: "Whether to skip generating readme.typescript.md file"
            },
            "skip-sdk": {
                boolean: true,
                description: "Whether to skip SDK generation"
            }
        },
        Package: {
            "package": {
                alias: ["p", "package-name"],
                string: true,
                description: "Name of the manipulated package e.g. @azure/arm-servicebus"
            },
            "type": {
                alias: "sdk-type",
                string: true,
                coerce: parseSdkType,
                choices: ["rm", "data", "control"],
                description: "Type of SDK to manipulate."
            }
        },
        Repository: {
            "azure-sdk-for-js-root": {
                alias: ["sdk", "azureSDKForJSRepoRoot"],
                string: true,
                default: path.resolve(__dirname, ".."),
                description: "Path to the azure-sdk-for-js repository"
            },
            "azure-rest-api-specs-root": {
                alias: ["specs", "azureRestAPISpecsRoot"],
                string: true,
                default: findAzureRestApiSpecsRepositoryPathSync(),
                description: "Path to the azure-rest-api-specs repository"
            }
        }
    }

    export const Global = {
        loggingLevel: yargs.options(Argv.Options.Common).argv["logging-level"],
    }

    const combine = (...configs: YargsMapping[]): YargsMapping => {
        let result = Options.Common;
        for (const config of configs) {
            result = { ...result, ...config };
        }
        return result;
    }

    export const construct = (...configs: YargsMapping[]) => {
        const mergedOption = combine(...configs);
        const args = yargs.options(mergedOption)
            .strict()
            .help("?")
            .showHelpOnFail(true, "Invalid usage. Run with -? to see help.")
            .wrap(Math.min(yargs.terminalWidth(), 150));

        (args as any).toPrettyString = function (): string {
            return JSON.stringify(this, undefined, "  ");
        }

        return args;
    }

    export const print = () => {
        return process.argv.slice(2).join(", ");
    }
}

export interface CommandLineOptions extends minimist.ParsedArgs {
    "azure-sdk-for-js-repo-root": string;
    "azure-rest-api-specs-root": string;
    debugger: boolean;
    "logging-level": string;
    package: string;
    "skip-sdk": boolean;
    "skip-spec": boolean;
    type: string;
    use: boolean;
    verbose: boolean;
    whatif: boolean;
    getSdkType(): SdkType;
}

export const commandLineConfiguration = {
    string: ["azure-sdk-for-js-repo-root", "azure-rest-api-specs-root", "logging-level", "package", "type"],
    boolean: ["debugger", "use", "skip-sdk", "skip-spec", "verbose", "whatif"],
    alias: {
        l: "logging-level",
        log: "logging-level",
        package: "packageName",
        u: "use",
        v: "version",
    },
    default: {
        "logging-level": "info",
        type: "arm"
    }
};

let _options: CommandLineOptions;
export function getCommandLineOptions() {
    if (!_options) {
        _options = createCommandLineParameters();
    }

    return _options;
}

function createCommandLineParameters() {
    const args = minimist(process.argv.slice(2), commandLineConfiguration) as CommandLineOptions;
    args.getSdkType = getSdkType;
    return args;
}

export function parseSdkType(str: string) {
    const resourceManagerStrings = ["arm", "rm", "resourcemanager"]
    const dataPlaneStrings = ["dp", "data", "dataplane"]
    const controlPlaneStrings = ["control"]

    const type = str.toLowerCase().replace("-", "");
    if (arrayContains(resourceManagerStrings, type)) {
        return SdkType.ResourceManager;
    } else if (arrayContains(dataPlaneStrings, type)) {
        return SdkType.DataPlane;
    } else if (arrayContains(controlPlaneStrings, type)) {
        return SdkType.ControlPlane;
    } else {
        return SdkType.Unknown;
    }
}

function getSdkType() {
    return parseSdkType(this.type);
}