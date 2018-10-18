/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as minimist from "minimist";
import * as path from "path";
import { arrayContains } from "./common";
import { Options } from "yargs";
import yargs = require("yargs");

export type YargsMapping = { [key: string]: Options };

export enum SdkType {
    ResourceManager = "resource-manager",
    DataPlane = "data-plane",
    ControlPlane = "control-plane"
}

export module Argv {
    export const Options: { [key: string]: YargsMapping } = {
        Common: {
            "logging-level": {
                alias: ["l", "loggingLevel"],
                default: "info",
                choices: ["all", "trace", "debug", "info", "warn", "error"],
                global: true
            }
        },
        Repository: {
            "azure-sdk-for-js-root": {
                alias: "sdk",
                string: true,
                default: __dirname,
                description: "Path to the azure-sdk-for-js repository"
            },
            "azure-rest-api-specs-root": {
                alias: "specs",
                string: true,
                default: path.resolve(__dirname, '..', 'azure-rest-api-specs'),
                description: "Path to the azure-rest-api-specs repository"
            }
        }
    }

    export const Global = {
        loggingLevel: (): string => yargs.options(Argv.Options.Common).argv.loggingLevel,
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
            .help("?")
            .showHelpOnFail(true, "Invalid usage. Run with -? to see help.");
        return args;
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

export function getSdkType() {
    const resourceManagerStrings = ["arm", "rm", "resourcemanager"]
    const dataPlaneStrings = ["dp", "data", "dataplane"]

    const type = this.type.toLowerCase().replace("-", "");
    if (arrayContains(resourceManagerStrings, type)) {
        return SdkType.ResourceManager;
    } else if (arrayContains(dataPlaneStrings, type)) {
        return SdkType.DataPlane;
    } else {
        throw new Error("Unknown SDK type");
    }
}